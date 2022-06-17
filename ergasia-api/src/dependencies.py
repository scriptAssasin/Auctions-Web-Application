from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from src.database.connection import *
from src.database.models import *
import hashlib
import base64

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1000


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    Username: Optional[str] = None


class User(BaseModel):
    username: str
    Username: Optional[str] = None
    full_name: Optional[str] = None
    # disabled: Optional[bool] = None


class UserInDB(User):
    hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    pwd = get_password_hash(plain_password)

    if pwd == hashed_password:
        return True
    return False


def get_password_hash(password):
    hash_object = hashlib.md5(password.encode())
    md5_hash = hash_object.hexdigest()
    md5_bytes = md5_hash.encode('ascii')
    base64_bytes = base64.b64encode(md5_bytes)
    base64_hash = base64_bytes.decode('ascii')

    return base64_hash


# def get_user(db, username: str):
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)


def authenticate_user(db, Username: str, password: str):
    user = db.query(Users).filter(Users.Username == Username).first()
    if not user:
        return False
    else:
        if not verify_password(password, user.Password):
            return False
        return user



def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        Username: str = payload.get("sub")
        if Username is None:
            raise credentials_exception
        token_data = TokenData(Username=Username)
    except JWTError:
        raise credentials_exception
    user = db.query(Users).filter(Users.Username == token_data.Username).first()
    
    if user is None: 
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    # if current_user.disabled:
    #     raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


