from fastapi import FastAPI
from app.api.user import router as user_router

app = FastAPI(title = "UP_Scholorship_INFO")

@app.get("/")
def root():
    return {
        "message ": "project started "
    }

app.include_router(user_router)
