#ChatGPT - main.py
#Effectively a router
from fastapi import FastAPI, WebSocket, Depends
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import User, Player
from auth import *
from websocket import manager, handle_message
from jose import jwt

app = FastAPI()
Base.metadata.create_all(bind=engine)

@app.post("/register")
def register(email: str, password: str, db: Session = Depends(get_db)):
    user = User(email=email, password_hash=hash_password(password))
    db.add(user)
    db.commit()
    db.refresh(user)

    db.add(Player(user_id=user.id))
    db.commit()

    return {"token": create_token(user.id)}


@app.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(email=email).first()
    if not user or not verify_password(password, user.password_hash):
        return {"error": "Invalid credentials"}

    return {"token": create_token(user.id)}


@app.websocket("/ws/{token}")
async def ws_endpoint(websocket: WebSocket, token: str, db: Session = Depends(get_db)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    user_id = payload["user_id"]

    await manager.connect(user_id, websocket)

    try:
        while True:
            data = await websocket.receive_json()
            await handle_message(user_id, data, db)
    except:
        manager.disconnect(user_id)