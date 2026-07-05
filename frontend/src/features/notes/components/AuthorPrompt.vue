<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@/shared/composables/useLocalStorage'

const AUTHOR_KEY = 'author'
const author = useLocalStorage(AUTHOR_KEY)
const input = ref('')

function submit() {
  const trimmed = input.value.trim()
  if (!trimmed) return
  author.value = trimmed
}
</script>

<template>
  <div v-if="!author" class="overlay">
    <form class="dialog" @submit.prevent="submit">
      <p class="dialog__title">Как вас зовут?</p>
      <input
        v-model="input"
        class="dialog__input"
        type="text"
        placeholder="Ваше имя"
        autofocus
      />
      <button class="dialog__btn" type="submit" :disabled="!input.trim()">
        Продолжить
      </button>
    </form>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.dialog {
  background: var(--bg);
  padding: 32px;
  border-radius: 8px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dialog__title {
  font-size: 16px;
  font-weight: 500;
}

.dialog__input {
  border-bottom: 1px solid var(--border);
  padding: 8px 0;
  width: 100%;
}

.dialog__btn {
  align-self: flex-end;
  padding: 8px 16px;
  background: var(--accent);
  color: var(--bg);
  border-radius: 4px;
  font-size: 14px;
}

.dialog__btn:disabled {
  opacity: 0.4;
  cursor: default;
}
</style>
