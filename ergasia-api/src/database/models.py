from datetime import datetime
from src.database.connection import Base
from pydantic import BaseModel, UUID4
from typing import List, Optional, Any, Dict

class AuthIn(BaseModel):
    Username: str
    password: str

class UserRegister(BaseModel):
    Username: str
    Name: str
    Surname: str
    Password: str
    Afm: str
    Email: str
    Address: str
    Phone: str
    Role: Optional[str]

class AuctionsCRUD(BaseModel):
    itemName: str
    itemCategories: Optional[list]
    buyPrice: Optional[str]
    firstBid: str
    itemDescription: str
    auctionEndDate: str

class BidsCRUD(BaseModel):
    itemPrice:str
    itemLocation: str
    itemCountry: str

Users = Base.classes.Users
Roles = Base.classes.UserRoles
Auctions = Base.classes.Auctions
Bids = Base.classes.Bids