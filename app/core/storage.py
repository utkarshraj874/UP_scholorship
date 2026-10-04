import os

from dotenv import load_dotenv
from supabase import create_client, Client


load_dotenv()


SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
SUPABASE_BUCKET = os.getenv("SUPABASE_BUCKET", "documents")


if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL is not configured")


if not SUPABASE_SERVICE_KEY:
    raise ValueError("SUPABASE_SERVICE_KEY is not configured")


supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY
)


def upload_file(
    file_content: bytes,
    storage_path: str,
    content_type: str,
):
    return (
        supabase.storage
        .from_(SUPABASE_BUCKET)
        .upload(
            path=storage_path,
            file=file_content,
            file_options={
                "content-type": content_type,
                "upsert": "true",
            },
        )
    )


def delete_file(storage_path: str):
    try:
        return (
            supabase.storage
            .from_(SUPABASE_BUCKET)
            .remove([
                storage_path
            ])
        )
    except Exception as e:
        print("Warning: failed to delete file from storage:", str(e))
        return None


def create_file_url(
    storage_path: str,
    expires_in: int = 3600,
):
    try:
        res = (
            supabase.storage
            .from_(SUPABASE_BUCKET)
            .create_signed_url(
                storage_path,
                expires_in,
            )
        )
        if isinstance(res, dict):
            return res.get("signedURL") or res.get("signedUrl")
        return str(res)
    except Exception:
        try:
            return supabase.storage.from_(SUPABASE_BUCKET).get_public_url(storage_path)
        except Exception:
            return None