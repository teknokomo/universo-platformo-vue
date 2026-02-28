/**
 * Universo Platformo - Vue Application Entry Point
 *
 * Sets up:
 * - Vue 3 app
 * - Vue Router
 * - vue-i18n
 * - Auth provider (AuthProvider) wrapping the entire app
 */
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createI18n } from 'vue-i18n'
import en from './i18n/en.json'
import ru from './i18n/ru.json'

const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'en',
    messages: { en, ru }
})

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
