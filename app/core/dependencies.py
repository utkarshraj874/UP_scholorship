from app.core.database import SessionLocal
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.core.security import  oauth2_scheme
from app.core.security import verify_acess_token

from app.models.user import User

def get_db():

    db = SessionLocal() # session open 

    try:
        yield db # return karne ke bad return ke niche wala code runn nhi hot jabki ,
        #agar hum yeild akarte haia to uske bad wala bhi code runn hota hai 

    finally: # except bas erroe ke case me runn hota hai jabki , finaaly har cae me runn hota 
        db.close()

def get_current_user(
        token :str = Depends(oauth2_scheme),
        db: Session = Depends(get_db)

):
    payload = verify_acess_token(token)

    email = payload.get("sub")

    # user = db.query(User).filter(
    #   User.email == email
    # ).first()

    if email is None:

        raise HTTPException(
            status_code=401,
            detail="user not found "
        )
    user = db.query(User).filter(
      User.email == email
    ).first()
    if user is None:
        raise HTTPException(
            status_code=401,
            detail = "user not found"

        )
    return user