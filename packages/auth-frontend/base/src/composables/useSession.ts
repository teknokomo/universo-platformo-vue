/**
 * Universo Platformo | useSession composable
 *
 * Manages authentication session state by communicating with /auth/me,
 * /auth/login, and /auth/logout endpoints on the Django backend.
 */

import { ref, readonly, type Ref } from 'vue'
import { clearStoredCsrfToken, type AuthClient } from '../api/client'

export interface AuthUser {
    id: string
    email: string
}

export interface UseSessionResult {
    user: Readonly<Ref<AuthUser | null>>
    loading: Readonly<Ref<boolean>>
    error: Readonly<Ref<string | null>>
    refresh: () => Promise<AuthUser | null>
    logout: () => Promise<void>
}

export interface UseSessionOptions {
    client: AuthClient
    fetchOnMount?: boolean
}

/**
 * Composable for session management.
 * Fetches the current user from /auth/me and exposes login/logout helpers.
 */
export function useSession({ client, fetchOnMount = true }: UseSessionOptions): UseSessionResult {
    const user = ref<AuthUser | null>(null)
    const loading = ref<boolean>(true)
    const error = ref<string | null>(null)

    const refresh = async (): Promise<AuthUser | null> => {
        try {
            loading.value = true
            error.value = null
            const response = await client.get<AuthUser>('/auth/me')
            user.value = response.data
            return response.data
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch user'
            error.value = message
            user.value = null
            return null
        } finally {
            loading.value = false
        }
    }

    const logout = async (): Promise<void> => {
        try {
            await client.post('/auth/logout', {})
        } catch (err: any) {
            if (err?.response?.status === 419) {
                clearStoredCsrfToken(client)
                await client.post('/auth/logout', {})
            } else {
                throw err
            }
        } finally {
            user.value = null
        }
    }

    if (fetchOnMount) {
        refresh().catch((err) => {
            console.error('[auth] Failed to fetch session on mount', err)
        })
    }

    return {
        user: readonly(user),
        loading: readonly(loading),
        error: readonly(error),
        refresh,
        logout
    }
}
