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
async def get_all_auctions(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    return db.query(Auctions).all()

@router.get("/allspecificuser/")
async def get_all_auctions(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    return db.query(Auctions).filter(Auctions.UserId == current_user.Id).all()

@router.post("/create/")
async def create_auction(body: AuctionsCRUD, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    new_uuid = str(uuid.uuid4())

    new_auction = Auctions(
        Id=new_uuid, 
        ItemId=randint(1000000000, 9999999999),
        Name=body.itemName,
        Categories=body.itemCategories,
        BuyPrice=body.buyPrice,
        FirstBid=body.firstBid,
        Description=body.itemDescription,
        Ends=datetime.strptime(body.auctionEndDate, '%d/%m/%y') if body.auctionEndDate != '' else None,
        UserId=current_user.Id
    )
    db.add(new_auction)
    db.commit()
    return {}
