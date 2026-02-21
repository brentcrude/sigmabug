# !ChatGPT - models.py
# Defines persistent schema for world state [memory]

from sqlalchemy import Column, Integer, String, JSON, ForeignKey, DateTime
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)


class Player(Base):
    __tablename__ = "players"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    x = Column(Integer, default=100)
    y = Column(Integer, default=100)
    channel = Column(String, default="general")


class WorldObject(Base):
    __tablename__ = "objects"
    id = Column(Integer, primary_key=True)
    type = Column(String)
    x = Column(Integer)
    y = Column(Integer)

    # Rich text stored as ProseMirror JSON
    content = Column(JSON)

    owner_id = Column(Integer, ForeignKey("users.id"))
    visibility = Column(String, default="global")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)


class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(Integer, primary_key=True)
    channel = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)