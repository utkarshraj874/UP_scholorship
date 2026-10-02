from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.schema.user import Usercreate
from app.schema.user import UserResponse

from app.models.user import User

from app.core.dependencies import get_db
from app.core.security import hash_password
from app.core.security import verify_password

from app.core.security import pwd_context
from fastapi.security import OAuth2PasswordRequestForm
from email_validator import validate_email, EmailNotValidError

from app.core.security import create_acess_token, verify_acess_token

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(
    user: Usercreate,
    db: Session = Depends(get_db)
    #  depends(get_db)
    # FastAPI bhai,
    # register function chalane se pehle
    # get_db() execute kar do,
    # aur jo return/yield kare
    # wo db me daal do
):
    # ✅ Email validation
    try:
        validate_email(user.email)  # throws EmailNotValidError if invalid
    except EmailNotValidError as e:
        print("❌ Invalid email:", str(e))
        raise HTTPException(status_code=400, detail="Invalid email address")

    # check if user already exists
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()  # .first() give first matching row or None if not found

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered "
        )

    # create new user object
    db_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)  # make sure column name matches your model
    )

    db.add(db_user) 
    db.commit()  # id is generated here
    db.refresh(db_user)  # it is similar to SQL (SELECT * FROM users WHERE id=?)

    return db_user

# class LoginRequest(BaseModel):
#     email: str
#     password: str

# @router.post("/login")
# def login(request: LoginRequest, db: Session = Depends(get_db)):


@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),# it is special class provided by  fastapi,
    db: Session = Depends(get_db)                    # it expect data like username and password in form data not json 
):                                                   # we call also wirte directly username: str, password: str

    db_user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        form_data.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_acess_token(
        data={
            "sub": db_user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/me")
async def read_me(
    current_user:User = Depends(
        get_current_user
        )
):
    return {
        "id":current_user.id,
        "email":current_user.email
    }


