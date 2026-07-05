import { request } from '@/shared/api/http'
import type { Note, NotePayload } from '../model/types'

export function getNotes(): Promise<Note[]> {
  return request<Note[]>('/notes')
}

export function createNote(payload: NotePayload): Promise<Note> {
  return request<Note>('/notes', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateNote(id: number, payload: NotePayload): Promise<Note> {
  return request<Note>(`/notes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function deleteNote(id: number): Promise<void> {
  return request<void>(`/notes/${id}`, {
    method: 'DELETE',
  })
}
