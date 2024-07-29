from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    identity_color = Column(String)

    messages = relationship("Message", back_populates="user")


class ChatRoom(Base):
    __tablename__ = "chatrooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    messages = relationship("Message", back_populates="chat_room")


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    chat_room_id = Column(Integer, ForeignKey("chatrooms.id"))

    user = relationship("User", back_populates="messages")
    chat_room = relationship("ChatRoom", back_populates="messages")
