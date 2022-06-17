from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from fastapi import Query, APIRouter
from src.dependencies import *


#APIRouter creates path operations for user module
router = APIRouter() 

@router.post("/token/", response_model=Token)
async def login_for_access_token(form_data: AuthIn, db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.email, form_data.password, form_data.platform)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.Email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/current/", status_code = status.HTTP_200_OK)
async def user_get(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user = await get_current_user(token, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user

@router.get("/test/")
async def read_own_items(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    return db.query(DbUsers).all()