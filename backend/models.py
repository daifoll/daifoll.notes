from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func


Base = declarative_base()

class Note(Base):
    __tablename__ = 'daifollnotes'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, onupdate=func.now())
    author = Column(String(255))
    content = Column(Text)