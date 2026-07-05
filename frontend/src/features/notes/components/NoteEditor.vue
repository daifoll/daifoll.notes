<script setup lang="ts">
const title = defineModel<string>('title', { required: true })
const content = defineModel<string>('content', { required: true })

defineProps<{
  saveLabel: string
  hasSelection: boolean
}>()

const emit = defineEmits<{
  delete: []
}>()
</script>

<template>
  <main class="editor">
    <template v-if="hasSelection">
      <div class="editor__header">
        <input
          v-model="title"
          class="editor__title"
          type="text"
          placeholder="Заголовок"
        />
        <span v-if="saveLabel" class="editor__status">{{ saveLabel }}</span>
      </div>

      <textarea
        v-model="content"
        class="editor__content"
        placeholder="Начните писать…"
      />

      <footer class="editor__footer">
        <button class="editor__delete" @click="emit('delete')">
          Удалить
        </button>
      </footer>
    </template>

    <div v-else class="editor__placeholder">
      <p>Выберите заметку или создайте новую</p>
    </div>
  </main>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px 40px;
}

.editor__header {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 24px;
}

.editor__title {
  flex: 1;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
}

.editor__status {
  font-size: 13px;
  color: var(--muted);
  flex-shrink: 0;
}

.editor__content {
  flex: 1;
  font-size: 15px;
  line-height: 1.7;
  width: 100%;
}

.editor__footer {
  padding-top: 24px;
}

.editor__delete {
  font-size: 13px;
  color: var(--muted);
}

.editor__delete:hover {
  color: #c0392b;
}

.editor__placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  font-size: 15px;
}
</style>
