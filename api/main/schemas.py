# schema.py

from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    username: str
    identity_color: str

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    identity_color: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserListResponse(BaseModel):
    users: List[User]

class ChatRoomBase(BaseModel):
    name: str

class ChatRoomCreate(ChatRoomBase):
    pass

class ChatRoom(ChatRoomBase):
    id: int

    class Config:
        orm_mode = True

class MessageBase(BaseModel):
    content: str
    timestamp: str
    user_id: int
    chat_room_id: int

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: int

    class Config:
        orm_mode = True
