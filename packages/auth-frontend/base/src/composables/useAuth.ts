/**
 * Universo Platformo | Auth Provider & useAuth composable
 *
 * Provides authentication state to the entire Vue application via
 * Vue's provide/inject mechanism.
 */

import { inject, type InjectionKey } from 'vue'
import type { Ref } from 'vue'
import type { AuthUser } from './useSession'
import type { AuthClient } from '../api/client'

export interface AuthContextValue {
    user: Readonly<Ref<AuthUser | null>>
    loading: Readonly<Ref<boolean>>
    error: Readonly<Ref<string | null>>
    isAuthenticated: Readonly<Ref<boolean>>
    login: (email: string, password: string, captchaToken?: string) => Promise<void>
    logout: () => Promise<void>
    refresh: () => Promise<AuthUser | null>
    client: AuthClient
}

export const AUTH_INJECTION_KEY: InjectionKey<AuthContextValue> = Symbol('universo.auth')

/**
 * Composable to consume the auth context.
 * Must be used inside a component tree wrapped by <AuthProvider>.
 */
export function useAuth(): AuthContextValue {
    const context = inject(AUTH_INJECTION_KEY)
    if (!context) {
        throw new Error('useAuth must be used within <AuthProvider>')
    }
    return context
}
