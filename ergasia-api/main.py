from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, FastAPI, status, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
from src.routers import users as user_main
from src.dependencies import *

def get_application(api_router):
    app = FastAPI(title = "ΔΗΜΟΠΡΑΣΙΕΣ REST API")
    app.add_middleware(
        CORSMiddleware,
        # allow_origins=["https://ΔΗΜΟΠΡΑΣΙΕΣ-temp-front.evolution-isa.gr/, http://207.154.231.205:3000/, http://207.154.231.205:3001/, http://172.26.224.1:3001", "http://localhost:3001", "http://192.168.1.11:3001", "http://172.26.224.1:3000", "http://localhost:3000", "http://192.168.1.11:3000"],
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix="/api")

    return app

api_router = APIRouter()
api_router.include_router(user_main.router,  prefix="/users", tags=["users"], responses={404: {"description": "Not found"}})

app = get_application(api_router)






