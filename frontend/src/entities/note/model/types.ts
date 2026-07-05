export interface Note {
  id: number
  title: string
  author: string
  content: string
  created_at: string
  updated_at: string | null
}

export interface NotePayload {
  title: string
  author: string
  content: string
}
