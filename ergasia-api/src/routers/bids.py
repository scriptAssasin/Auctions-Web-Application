from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from fastapi import Query, APIRouter
from src.dependencies import *
import uuid
from random import seed
from random import randint
from datetime import datetime

# seed random number generator
seed(1)
#APIRouter creates path operations for user module
router = APIRouter() 

@router.get("/all/")
async def get_all_bids(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    return db.query(Bids).all()
