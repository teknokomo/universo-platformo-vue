<script setup lang="ts">
/**
 * AuthProvider - Provides authentication state to child components.
 *
 * Usage:
 * ```vue
 * <AuthProvider :client="authClient">
 *   <App />
 * </AuthProvider>
 * ```
 */
import { computed, provide, ref } from 'vue'
import { clearStoredCsrfToken, type AuthClient } from '../api/client'
import { useSession } from '../composables/useSession'
import { AUTH_INJECTION_KEY, type AuthContextValue } from '../composables/useAuth'

const props = defineProps<{ client: AuthClient }>()

const session = useSession({ client: props.client })
const logoutInProgress = ref(false)

const isAuthenticated = computed(() => !!session.user.value)

const login = async (email: string, password: string, captchaToken?: string): Promise<void> => {
    const doLogin = async () => {
        await props.client.post('/auth/login', { email, password, captchaToken })
    }

    try {
        await doLogin()
    } catch (err: any) {
        if (err?.response?.status === 419) {
            clearStoredCsrfToken(props.client)
            await doLogin()
        } else {
            throw err
        }
    }

    clearStoredCsrfToken(props.client)
    const refreshedUser = await session.refresh()
    if (!refreshedUser) {
        throw new Error('Failed to refresh session after login')
    }
}

const logout = async (): Promise<void> => {
    if (logoutInProgress.value) return
    logoutInProgress.value = true
    try {
        if (session.user.value) {
            await session.logout()
        }
    } catch (error) {
        console.error('[auth] logout failed', error)
    } finally {
        logoutInProgress.value = false
    }
}

const authContext: AuthContextValue = {
    user: session.user,
    loading: session.loading,
    error: session.error,
    isAuthenticated,
    login,
    logout,
    refresh: session.refresh,
    client: props.client
}

provide(AUTH_INJECTION_KEY, authContext)
</script>

<template>
    <slot />
</template>
