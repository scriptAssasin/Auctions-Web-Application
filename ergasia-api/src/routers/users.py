from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from fastapi import Query, APIRouter
from src.dependencies import *
import uuid

#APIRouter creates path operations for user module
router = APIRouter() 

@router.get("/all/")
async def get_all_users(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    return db.query(Users).all()

@router.post("/token/", response_model=Token)
async def login_for_access_token(form_data: AuthIn, db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.Username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.Username}, expires_delta=access_token_expires
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

@router.get("/current_details/{user_id}/", status_code = status.HTTP_200_OK)
async def user_get(user_id:str, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user = await get_current_user(token, db)

    temp = (
        db.query(Users)
        .join(Roles, Roles.Id == Users.UserRole)
        .filter(Users.Id == user_id)
        .values(Users.Name.label('Όνομα'), Users.Surname.label('Επώνυμο'), Users.Username.label('Όνομα Χρήστη'), Users.Address.label('Διεύθυνση'), Users.Email.label('Email'), Users.Pending.label('Εκκρεμεί'), Users.Phone.label('Τηλέφωνο'), Users.Afm.label('ΑΦΜ'), Roles.Role.label('Ρόλος') )
    )
    temp = [x._asdict() for x in temp]

    return temp[0]

@router.get("/roles/")
async def get_user_roles(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    return db.query(Roles).all()

@router.post("/register/")
async def register_user(UserData: UserRegister, db: Session = Depends(get_db)):
    print(UserData)

    roles = db.query(Roles).values(Roles.Id, Roles.Role)

    roles = [x._asdict() for x in roles]
    role_dict = {}
    
    for role in roles:
        role_dict[role['Role']] = role['Id']

    existing = db.query(Users).filter(Users.Username == UserData.Username).first()

    if not existing:
        new_uuid = str(uuid.uuid4())

        new_user = Users(
            Id=new_uuid, 
            Username=UserData.Username,
            Password=get_password_hash(UserData.Password),
            Pending=True,
            Name=UserData.Name,
            Surname=UserData.Surname,
            Phone=UserData.Phone,
            Address=UserData.Address,
            Afm=UserData.Afm,
            Email=UserData.Email,
            UserRole=role_dict[UserData.Role] if UserData.Role else role_dict['Client']
        )
        db.add(new_user)
        db.commit()

        return {}
    else:
        return -1

@router.post("/approve/{user_id}/")
async def approve_user(user_id: str, db: Session = Depends(get_db)):

    try:
        user = db.query(Users).filter(Users.Id == user_id).first()
        user.Pending = False

        db.commit()

        return 1
    except:
        return -1