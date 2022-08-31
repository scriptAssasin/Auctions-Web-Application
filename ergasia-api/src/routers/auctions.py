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
    return db.query(Auctions).filter(Auctions.hasStarted == True, Auctions.hasEnded == False, Auctions.UserId != current_user.Id).all()

@router.get("/allspecificuser/")
async def get_all_auctions(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    return db.query(Auctions).filter(Auctions.UserId == current_user.Id).all()

@router.get("/byid/{auction_id}/")
async def get_auction_by_id(auction_id: str,current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    return db.query(Auctions).filter(Auctions.Id == auction_id).first()

@router.get("/byid_details/{auction_id}/")
async def get_auction_by_id_details(auction_id: str,current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    temp = (
        db.query(Auctions)
        .filter(Auctions.Id == auction_id)
        .values(Auctions.Name.label('Όνομα'), Auctions.Currently.label('Υψηλότερη Τιμή'), Auctions.Categories.label('Κατηγορίες'), Auctions.Location.label('Διεύθυνση'), Auctions.Description.label('Περιγραφή') )
    )
    temp = [x._asdict() for x in temp]

    return temp[0]

@router.get("/export/")
async def export_all_auctions(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    
    from xml.dom import minidom
    import os 
    root = minidom.Document()
  
    xml = root.createElement('root') 
    root.appendChild(xml)
    
    productChild = root.createElement('Item')
    productChild.setAttribute('ItemId', '45345')
    
    xml.appendChild(productChild)
    
    xml_str = root.toprettyxml(indent ="\t") 
    
    return xml_str

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
        # Ends=datetime.strptime(body.auctionEndDate, '%Y/%m/%d') if body.auctionEndDate != '' else None,
        Ends=None,
        UserId=current_user.Id,
        hasStarted=False,
        hasEnded=False
    )
    db.add(new_auction)
    db.commit()
    return {}

@router.post("/start/{auction_id}/")
async def start_auction(auction_id: str, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    auction = db.query(Auctions).filter(Auctions.Id == auction_id).first()

    if auction:
        auction.hasStarted = True
        db.commit()
        
    return {}

@router.post("/end/{auction_id}/")
async def end_auction(auction_id: str, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    auction = db.query(Auctions).filter(Auctions.Id == auction_id).first()

    if auction:
        auction.hasEnded = True
        db.commit()
        
    return {}

@router.put("/update/{auction_id}/")
async def update_auction(body: AuctionsCRUD, auction_id: str, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    auction = db.query(Auctions).filter(Auctions.Id == auction_id).first()

    auction.Name=body.itemName
    auction.Categories=body.itemCategories
    auction.BuyPrice=body.buyPrice
    auction.FirstBid=body.firstBid
    auction.Description=body.itemDescription
    auction.Ends=datetime.strptime(body.auctionEndDate, '%d/%m/%y') if body.auctionEndDate != '' else None

    db.commit()

    return {}

@router.delete("/delete/{auction_id}/")
async def delete_auction(auction_id: str, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    db.query(Auctions).filter(Auctions.Id == auction_id).delete()

    db.commit()

    return {}
