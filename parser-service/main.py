from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import boto3
import os
import tempfile
import mailbox
import email
from email import policy
from supabase import create_client
import re
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://www.inboxyl.com", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
R2_ACCOUNT_ID = os.environ["R2_ACCOUNT_ID"]
R2_ACCESS_KEY = os.environ["R2_ACCESS_KEY_ID"]
R2_SECRET = os.environ["R2_SECRET_ACCESS_KEY"]
R2_BUCKET = os.environ["R2_BUCKET_NAME"]

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

s3 = boto3.client(
    "s3",
    endpoint_url=f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com",
    aws_access_key_id=R2_ACCESS_KEY,
    aws_secret_access_key=R2_SECRET,
    region_name="auto",
)

def get_domain(email_addr: str) -> str:
    match = re.search(r"@([\w.-]+)", email_addr or "")
    return match.group(1).lower() if match else "unknown"

def generate_attachment_code(index: int) -> str:
    import random, string
    return f"{index:03d}{random.choice(string.ascii_uppercase)}{random.randint(10,99)}"

def ensure_company(user_id: str, domain: str) -> str:
    existing = supabase.table("companies").select("id").eq("user_id", user_id).eq("domain", domain).execute()
    if existing.data:
        return existing.data[0]["id"]
    result = supabase.table("companies").insert({"user_id": user_id, "domain": domain, "name": domain}).execute()
    return result.data[0]["id"]

def parse_mbox(filepath: str, user_id: str, archive_id: str):
    mbox = mailbox.mbox(filepath)
    attachment_index = 1
    for msg in mbox:
        process_message(msg, user_id, archive_id, attachment_index)
        attachment_index += 10

def process_message(msg, user_id: str, archive_id: str, att_index: int):
    sender = msg.get("From", "")
    recipients = [msg.get("To", "")]
    subject = msg.get("Subject", "")
    domain = get_domain(sender)
    company_id = ensure_company(user_id, domain)

    date_str = msg.get("Date", "")
    try:
        sent_at = email.utils.parsedate_to_datetime(date_str).isoformat()
    except:
        sent_at = datetime.utcnow().isoformat()

    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                body = part.get_payload(decode=True).decode("utf-8", errors="ignore")
                break
    else:
        body = msg.get_payload(decode=True).decode("utf-8", errors="ignore") if msg.get_payload(decode=True) else ""

    email_result = supabase.table("emails").insert({
        "user_id": user_id,
        "archive_id": archive_id,
        "company_id": company_id,
        "sender": sender,
        "recipients": recipients,
        "subject": subject,
        "body": body[:10000],
        "sent_at": sent_at,
    }).execute()

    email_id = email_result.data[0]["id"]

    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_disposition() == "attachment":
                filename = part.get_filename() or "attachment"
                data = part.get_payload(decode=True)
                if not data:
                    continue
                code = generate_attachment_code(att_index)
                r2_key = f"{user_id}/{archive_id}/{code}_{filename}"
                s3.put_object(Bucket=R2_BUCKET, Key=r2_key, Body=data)
                supabase.table("attachments").insert({
                    "email_id": email_id,
                    "user_id": user_id,
                    "filename": filename,
                    "attachment_code": code,
                    "r2_key": r2_key,
                    "file_size": len(data),
                }).execute()
                att_index += 1

class ParseRequest(BaseModel):
    user_id: str
    archive_id: str
    r2_key: str
    file_type: str  # "mbox" or "pst"

@app.get("/")
def health():
    return {"status": "ok"}

@app.post("/parse")
def parse(req: ParseRequest):
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{req.file_type}") as tmp:
        obj = s3.get_object(Bucket=R2_BUCKET, Key=req.r2_key)
        tmp.write(obj["Body"].read())
        tmp_path = tmp.name

    supabase.table("archives").update({"status": "processing"}).eq("id", req.archive_id).execute()

    try:
        if req.file_type == "mbox":
            parse_mbox(tmp_path, req.user_id, req.archive_id)
        else:
            raise HTTPException(status_code=400, detail="PST support coming soon")

        supabase.table("archives").update({"status": "done"}).eq("id", req.archive_id).execute()
        return {"status": "done"}
    except Exception as e:
        supabase.table("archives").update({"status": "error"}).eq("id", req.archive_id).execute()
        raise HTTPException(status_code=500, detail=str(e))
