import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { debounce } from '@/shared/lib/debounce'
import { useNotesStore } from '../store/notesStore'

const AUTHOR_KEY = 'author'
const SAVE_DELAY = 800

export type SaveStatus = 'idle' | 'saving' | 'saved'

export function useNoteEditor() {
  const store = useNotesStore()
  const { selectedNote } = storeToRefs(store)

  const title = ref('')
  const content = ref('')
  const saveStatus = ref<SaveStatus>('idle')
  const isDirty = ref(false)
  const isNewDraft = ref(false)

  let skipWatch = false

  function getAuthor(): string {
    return localStorage.getItem(AUTHOR_KEY) ?? ''
  }

  function resetFields(note: typeof selectedNote.value) {
    skipWatch = true
    title.value = note?.title ?? ''
    content.value = note?.content ?? ''
    isDirty.value = false
    isNewDraft.value = false
    saveStatus.value = 'idle'
    skipWatch = false
  }

  watch(selectedNote, (note) => {
    resetFields(note)
  }, { immediate: true })

  async function persist() {
    const author = getAuthor()
    if (!author) return

    const payload = {
      title: title.value || 'Без названия',
      author,
      content: content.value,
    }

    saveStatus.value = 'saving'

    if (isNewDraft.value || !selectedNote.value) {
      const note = await store.addNote(payload)
      if (note) {
        isNewDraft.value = false
        isDirty.value = false
        saveStatus.value = 'saved'
      } else {
        saveStatus.value = 'idle'
      }
      return
    }

    const ok = await store.saveNote(selectedNote.value.id, payload)
    if (ok) {
      isDirty.value = false
      saveStatus.value = 'saved'
    } else {
      saveStatus.value = 'idle'
    }
  }

  const debouncedSave = debounce(() => {
    if (isDirty.value) {
      void persist()
    }
  }, SAVE_DELAY)

  watch([title, content], () => {
    if (skipWatch) return

    isDirty.value = true
    saveStatus.value = 'idle'
    debouncedSave()
  })

  function startNewDraft() {
    store.selectNote(null)
    skipWatch = true
    title.value = ''
    content.value = ''
    isDirty.value = false
    isNewDraft.value = true
    saveStatus.value = 'idle'
    skipWatch = false
  }

  function cancelDraft() {
    isNewDraft.value = false
    store.selectNote(null)
    resetFields(null)
  }

  async function deleteCurrent() {
    if (isNewDraft.value && !selectedNote.value) {
      cancelDraft()
      return true
    }

    if (!selectedNote.value) return false
    return store.removeNote(selectedNote.value.id)
  }

  const saveLabel = computed(() => {
    if (saveStatus.value === 'saving') return 'Сохранение…'
    if (saveStatus.value === 'saved') return 'Сохранено'
    return ''
  })

  const hasSelection = computed(() => selectedNote.value !== null || isNewDraft.value)

  return {
    title,
    content,
    saveLabel,
    hasSelection,
    isNewDraft,
    startNewDraft,
    deleteCurrent,
  }
}
