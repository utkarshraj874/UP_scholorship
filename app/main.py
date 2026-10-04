import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.api.user import router as user_router
from app.api.profile import router as profile_router
from app.api.documents import router as documents_router

app = FastAPI(
    title="UP Scholarship Portal - IIIT Ranchi",
    description="Backend API for UP Scholarship (IIIT Ranchi)",
    version="1.0.0"
)

# Enable CORS for local React development and external access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers (completed modules: user, profile, documents)
app.include_router(user_router)
app.include_router(profile_router)
app.include_router(documents_router)


# Serve frontend build if exists
frontend_dist = Path(__file__).resolve().parent.parent / "frontend" / "dist"

if frontend_dist.exists() and (frontend_dist / "index.html").exists():
    if (frontend_dist / "assets").exists():
        app.mount("/assets", StaticFiles(directory=str(frontend_dist / "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Don't hijack docs or openapi
        if full_path in ["docs", "redoc", "openapi.json"]:
            return None
        file_path = frontend_dist / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(frontend_dist / "index.html")
else:
    @app.get("/")
    def root():
        return {
            "message": "UP Scholarship Backend API is running",
            "portal": "UP Scholarship Copilot - IIIT Ranchi",
            "docs": "/docs"
        }
