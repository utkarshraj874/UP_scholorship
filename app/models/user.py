from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

# Base class for all models
class Base(DeclarativeBase):
    pass

from sqlalchemy import String

# User model
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(150), unique=True, nullable=False)
    password:Mapped[str] = mapped_column(String(200),nullable=False)