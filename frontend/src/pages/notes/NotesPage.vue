<script setup lang="ts">
import { onMounted } from 'vue'
import {
  NoteList,
  NoteEditor,
  AuthorPrompt,
  useNotesStore,
  useNoteEditor,
} from '@/features/notes'

const store = useNotesStore()
const {
  title,
  content,
  saveLabel,
  hasSelection,
  startNewDraft,
  deleteCurrent,
} = useNoteEditor()

onMounted(() => {
  startNewDraft()
  void store.fetchNotes()
})

async function handleDelete() {
  if (!hasSelection.value) return

  const isDraftOnly = !store.selectedNote
  if (!isDraftOnly && !confirm('Удалить заметку?')) return

  await deleteCurrent()
}
</script>

<template>
  <div class="notes-layout">
    <div class="notes-sidebar">
      <NoteList @new-note="startNewDraft" />
    </div>

    <div class="notes-editor">
      <NoteEditor
        v-model:title="title"
        v-model:content="content"
        :save-label="saveLabel"
        :has-selection="hasSelection"
        @delete="handleDelete"
      />
    </div>

    <AuthorPrompt />
  </div>
</template>
