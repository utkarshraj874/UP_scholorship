from dotenv import load_dotenv
import os

# agar env variable set hai to use karo, warna default Postgres URL
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = os.getenv("ALGORITHM")

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
)


print("CONFIG LOADED:", DATABASE_URL)