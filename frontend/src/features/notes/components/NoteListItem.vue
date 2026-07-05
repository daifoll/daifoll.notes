<script setup lang="ts">
import type { Note } from '@/entities/note'

defineProps<{
  note: Note
  active: boolean
}>()

const emit = defineEmits<{
  select: [id: number]
}>()
</script>

<template>
  <button
    class="item"
    :class="{ 'item--active': active }"
    @click="emit('select', note.id)"
  >
    {{ note.title || 'Без названия' }}
  </button>
</template>

<style scoped>
.item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 16px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 4px;
  color: var(--text);
}

.item:hover {
  background: var(--bg-active);
}

.item--active {
  background: var(--bg-active);
  font-weight: 500;
}
</style>
