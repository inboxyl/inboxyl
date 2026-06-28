from fastapi import FastAPI
from pydantic import BaseModel
import os

app = FastAPI()

@app.get("/")
def health():
    return {"status": "ok"}
