from sqlalchemy import create_engine,select, func, Integer, Table, Column, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session,sessionmaker
from sqlalchemy.ext.automap import automap_base
import databases
from decouple import config
from sqlalchemy import Column, ForeignKey, Integer, String, create_engine, MetaData, select, insert, update, or_
import time

host_server = config('HOST')
db_server_port = config('PORT')
database_name = config('DB_NAME')
db_username = config('DB_USERNAME')
db_password = config('DB_PASSWORD')
ssl_mode = 'require'
DATABASE_URL = 'postgresql://{}:{}@{}:{}/{}'.format(db_username, db_password, host_server, db_server_port, database_name)

def wait_for_db(db_uri):
    """checks if database connection is established"""

    _local_engine = create_engine(db_uri)

    _LocalSessionLocal = sessionmaker(
        autocommit=False, autoflush=False, bind=_local_engine
    )

    up = False
    while not up:
        try:
            # Try to create session to check if DB is awake
            db_session = _LocalSessionLocal()
            # try some basic query
            db_session.execute("SELECT 1")
            db_session.commit()
        except Exception as err:
            print(f"Connection error: {err}")
            up = False
        else:
            up = True
        
        time.sleep(2)

wait_for_db(DATABASE_URL)

# //////////// DB, ENGINE AND SESSION INIT  //////////////

database = databases.Database(DATABASE_URL)
engine = create_engine(DATABASE_URL, pool_size=3, max_overflow=0)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# //////////// SQLALCHEMY MODELS //////////////

metadata = MetaData()
metadata.reflect(engine)
Base = automap_base(metadata=metadata)
Base.prepare()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
