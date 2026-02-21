# !ChatGPT - websocket.py
# Real-time world engine [multiplayer functionality]

from fastapi import WebSocket
from sqlalchemy.orm import Session
from models import Player, WorldObject, ChatMessage
from security import check_rate
from datetime import datetime

class WorldManager:
    def __init__(self):
        self.connections = {}

    async def connect(self, user_id, websocket):
        await websocket.accept()
        self.connections[user_id] = websocket

    def disconnect(self, user_id):
        self.connections.pop(user_id, None)

    async def broadcast(self, message):
        for ws in self.connections.values():
            await ws.send_json(message)

manager = WorldManager()

async def handle_message(user_id, data, db: Session):

    if not check_rate(user_id):
        return

    if data["action"] == "move":
        player = db.query(Player).filter_by(user_id=user_id).first()
        player.x += data["dx"]
        player.y += data["dy"]
        db.commit()

        await manager.broadcast({
            "type": "player_update",
            "user_id": user_id,
            "x": player.x,
            "y": player.y
        })

    elif data["action"] == "create_object":
        obj = WorldObject(
            type=data["type"],
            x=data["x"],
            y=data["y"],
            content=data["content"],
            owner_id=user_id
        )
        db.add(obj)
        db.commit()

        await manager.broadcast({
            "type": "object_created",
            "object": {
                "id": obj.id,
                "x": obj.x,
                "y": obj.y,
                "content": obj.content
            }
        })

    elif data["action"] == "chat":
        msg = ChatMessage(
            channel=data["channel"],
            user_id=user_id,
            message=data["message"]
        )
        db.add(msg)
        db.commit()

        await manager.broadcast({
            "type": "chat",
            "channel": data["channel"],
            "user_id": user_id,
            "message": data["message"]
        })