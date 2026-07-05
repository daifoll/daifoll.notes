from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from db import engine, get_db
from models import Base, Note
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
    "https://daifoll-notes-ul32.onrender.com",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

class NoteReq(BaseModel):
    title: str
    author: str
    content: str


@app.get("/api/notes")
async def get_notes(db: Session = Depends(get_db)):
    return db.query(Note).all()

@app.post("/api/notes")
async def create_note(note: NoteReq, db: Session = Depends(get_db)):
    db_note = Note(
        title=note.title,
        author=note.author,
        content=note.content
    )

    db.add(db_note)
    db.commit()
    db.refresh(db_note)

    return db_note

@app.patch("/api/notes/{note_id}")
async def update_note(note_id: int, note: NoteReq, db: Session = Depends(get_db)):
    db_note = db.query(Note).filter(Note.id == note_id).first()

    if not db_note:
        raise HTTPException(status_code=404, detail="Заметка не найдена")

    db_note.title = note.title
    db_note.author = note.author
    db_note.content = note.content

    db.commit()

    db.refresh(db_note)

    return db_note

@app.delete("/api/notes/{note_id}")
async def delete_note(note_id: int, db: Session = Depends(get_db)):
    db_note = db.query(Note).filter(Note.id == note_id).first()

    if not db_note:
        raise HTTPException(status_code=404, detail="Заметка не найдена")

    db.delete(db_note)

    db.commit()

    return {"message": "Заметка успешно удалена"}


