import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  type Note,
  type NotePayload,
} from '@/entities/note'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const selectedId = ref<number | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const selectedNote = computed(() =>
    notes.value.find((n) => n.id === selectedId.value) ?? null,
  )

  async function fetchNotes() {
    loading.value = true
    error.value = null

    try {
      notes.value = await getNotes()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка загрузки'
    } finally {
      loading.value = false
    }
  }

  function selectNote(id: number | null) {
    selectedId.value = id
  }

  async function addNote(payload: NotePayload): Promise<Note | null> {
    error.value = null

    try {
      const note = await createNote(payload)
      notes.value.unshift(note)
      selectedId.value = note.id
      return note
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка создания'
      return null
    }
  }

  async function saveNote(id: number, payload: NotePayload): Promise<boolean> {
    error.value = null

    try {
      const updated = await updateNote(id, payload)
      const index = notes.value.findIndex((n) => n.id === id)

      if (index !== -1) {
        notes.value[index] = updated
      }

      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка сохранения'
      return false
    }
  }

  async function removeNote(id: number): Promise<boolean> {
    error.value = null

    try {
      await deleteNote(id)

      const index = notes.value.findIndex((n) => n.id === id)
      notes.value = notes.value.filter((n) => n.id !== id)

      if (selectedId.value === id) {
        const next = notes.value[index] ?? notes.value[index - 1] ?? null
        selectedId.value = next?.id ?? null
      }

      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка удаления'
      return false
    }
  }

  return {
    notes,
    selectedId,
    selectedNote,
    loading,
    error,
    fetchNotes,
    selectNote,
    addNote,
    saveNote,
    removeNote,
  }
})
