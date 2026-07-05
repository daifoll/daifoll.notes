<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotesStore } from '../store/notesStore'
import NoteListItem from './NoteListItem.vue'

const emit = defineEmits<{
  newNote: []
}>()

const store = useNotesStore()
const { notes, selectedId, loading } = storeToRefs(store)

function select(id: number) {
  store.selectNote(id)
}
</script>

<template>
  <aside class="sidebar">
    <button class="sidebar__new" @click="emit('newNote')">
      + Новая
    </button>

    <div v-if="loading" class="sidebar__empty">Загрузка…</div>

    <div v-else-if="notes.length === 0" class="sidebar__empty">
      Нет заметок
    </div>

    <nav v-else class="sidebar__list">
      <NoteListItem
        v-for="note in notes"
        :key="note.id"
        :note="note"
        :active="note.id === selectedId"
        @select="select"
      />
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px 8px;
  gap: 8px;
}

.sidebar__new {
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  border-radius: 4px;
}

.sidebar__new:hover {
  background: var(--bg-active);
}

.sidebar__list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar__empty {
  padding: 16px;
  font-size: 14px;
  color: var(--muted);
}
</style>
