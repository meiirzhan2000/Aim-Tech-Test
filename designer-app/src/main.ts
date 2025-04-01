import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import global styles
import './assets/styles/main.css'

// Create application
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)

// Mount application
app.mount('#app')