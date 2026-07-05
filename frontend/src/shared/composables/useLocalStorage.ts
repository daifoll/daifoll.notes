import { ref, watch, type Ref } from 'vue'

export function useLocalStorage(key: string): Ref<string | null> {
  const stored = localStorage.getItem(key)
  const value = ref<string | null>(stored)

  watch(value, (next) => {
    if (next === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, next)
    }
  })

  return value
}
