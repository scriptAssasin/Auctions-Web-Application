from datetime import datetime
from src.database.connection import Base
from pydantic import BaseModel, UUID4
from typing import List, Optional, Any, Dict

class AuthIn(BaseModel):
    Username: str
    password: str

Users = Base.classes.Users
