from pydantic import BaseModel , constr

class Usercreate(BaseModel):
    name:str
    email:str
    password:str
   

class UserResponse(BaseModel):
    id: int
    email: str
    name:str
    # password field hatao, kyunki hum kabhi password expose nahi karte
    class config:
        orm_mode = True
        
class Userlogin(BaseModel):
    email:str
    password:str

