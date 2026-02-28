/**
 * Universo Platformo | auth-frontend
 *
 * Vue authentication module - exports all public API.
 */

// API client
export { createAuthClient, clearStoredCsrfToken, getStoredCsrfToken, AUTH_CSRF_STORAGE_KEY } from './api/client'
export type { AuthClient, AuthClientOptions } from './api/client'

// Composables
export { useSession } from './composables/useSession'
export type { AuthUser, UseSessionResult, UseSessionOptions } from './composables/useSession'

export { useAuth, AUTH_INJECTION_KEY } from './composables/useAuth'
export type { AuthContextValue } from './composables/useAuth'

// Components
export { default as AuthProvider } from './components/AuthProvider.vue'
export { default as LoginForm } from './components/LoginForm.vue'

// Pages
export { default as AuthPage } from './pages/AuthPage.vue'
