from sqlalchemy.orm import Session

from models import User
from schemas import *

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_users(db: Session):
    return db.query(User).all()

def create_user(db: Session, user: UserCreate):
    db_user = User(username=user.username, identity_color=user.identity_color)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_chatroom(db: Session, chatroom_id: int):
    return db.query(ChatRoom).filter(ChatRoom.id == chatroom_id).first()

def get_chatrooms(db: Session):
    return db.query(ChatRoom).all()

def create_chatroom(db: Session, chatroom: ChatRoomCreate):
    db_chatroom = ChatRoom(name=chatroom.name)
    db.add(db_chatroom)
    db.commit()
    db.refresh(db_chatroom)
    return db_chatroom

def get_message(db: Session, message_id: int):
    return db.query(Message).filter(Message.id == message_id).first()

def get_messages(db: Session):
    return db.query(Message).all()

def create_message(db: Session, message: MessageCreate):
    db_message = Message(
        content=message.content, 
        user_id=message.user_id, 
        chat_room_id=message.chat_room_id
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
