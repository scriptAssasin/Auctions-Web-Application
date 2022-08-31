from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from fastapi import Query, APIRouter
from src.dependencies import *
import uuid
from random import seed
from random import randint
from datetime import datetime

#APIRouter creates path operations for user module
router = APIRouter() 

@router.get("/all/")
async def get_all_bids(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    return db.query(Bids).all()

@router.get("/allbyuserid/")
async def get_all_bids_by_userid(current_user: User = Depends(get_current_active_user), token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user = await get_current_user(token, db)
    query = (
        db.query(Bids)
        .join(Auctions, Auctions.Id == Bids.AuctionId)
        .filter(Bids.UserId == user.Id)
        .values(Auctions.Name, Bids.Amount, Bids.Location, Bids.Country, Bids.Time)
    )

    return [x._asdict() for x in query]

@router.get("/allbyauctionid/{auction_id}/")
async def get_all_bids_by_auctionid(auction_id: str, current_user: User = Depends(get_current_active_user), token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user = await get_current_user(token, db)
    query = (
        db.query(Bids)
        .join(Auctions, Auctions.Id == Bids.AuctionId)
        .join(Users, Users.Id == Bids.UserId)
        .filter(Bids.AuctionId == auction_id)
        .values(Users.Name.label('User_Name'),Users.Surname,Users.Phone, Auctions.Name, Bids.Amount, Bids.Location, Bids.Country, Bids.Time)
    )

    return [x._asdict() for x in query]


@router.post("/create/{auction_id}/")
async def create_bid(body: BidsCRUD, auction_id: str, current_user: User = Depends(get_current_active_user), token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user = await get_current_user(token, db)

    auction = db.query(Auctions).filter(Auctions.Id == auction_id).first()

    if auction.Currently:
        if auction.Currently < body.itemPrice:
            auction.Currently = body.itemPrice
    else:
        auction.Currently = body.itemPrice

    new_uuid = str(uuid.uuid4())

    new_bid = Bids(
        Id=new_uuid, 
        AuctionId=auction_id,
        Amount=body.itemPrice,
        Location=body.itemLocation,
        Country=body.itemCountry,
        Time=datetime.now(),
        UserId=user.Id,
    )
    db.add(new_bid)
    db.commit()

    return {}