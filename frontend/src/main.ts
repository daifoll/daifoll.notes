import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/app/App.vue'
import router from '@/app/router'
import '@/app/styles/base.css'
import '@/app/styles/layout.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
