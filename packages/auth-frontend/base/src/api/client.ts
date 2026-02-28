/**
 * Universo Platformo | Auth API Client
 *
 * Axios client with CSRF protection, 401 redirect, and retry logic.
 * Mirrors the React implementation for use with Django backend.
 */

import axios, { type AxiosInstance } from 'axios'

export const AUTH_CSRF_STORAGE_KEY = 'up.auth.csrf'
const CSRF_STORAGE_SYMBOL = Symbol.for('universo.auth.csrfStorageKey')

const CSRF_REQUIRED_METHODS = new Set(['post', 'put', 'patch', 'delete'])
const RETRYABLE_METHODS = new Set(['get', 'head', 'options'])
const RETRYABLE_STATUSES = new Set([503, 504])
const BASE_BACKOFF_MS = 300

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const resolveBackoffDelay = (attempt: number): number => {
    const expo = BASE_BACKOFF_MS * Math.pow(2, attempt)
    const jitter = Math.random() * 100
    return expo + jitter
}

export interface AuthClientOptions {
    /** Base URL for the API (e.g. `/api/v1`) */
    baseURL: string
    /** Path that returns `{ csrfToken: string }`. Defaults to `auth/csrf`. */
    csrfPath?: string
    /** Storage key used to persist CSRF token. */
    csrfStorageKey?: string
    /**
     * Configure 401 redirect behavior.
     * - 'auto': Redirect to /auth except on public routes (default)
     * - true: Always redirect on 401
     * - false: Never redirect on 401
     */
    redirectOn401?: 'auto' | boolean
    /** Custom redirect path. Defaults to '/auth'. */
    authRedirectPath?: string
    /** Retry attempts for transient 503/504 errors. Defaults to 0. */
    transientRetryAttempts?: number
}

const PUBLIC_ROUTES = ['/', '/auth', '/terms', '/privacy']

const isPublicRoute = (pathname: string): boolean => {
    return PUBLIC_ROUTES.some((route) => (route === '/' ? pathname === '/' : pathname.startsWith(route)))
}

const getSessionStorage = () => {
    try {
        return window.sessionStorage
    } catch {
        return undefined
    }
}

export const createAuthClient = (options: AuthClientOptions): AxiosInstance => {
    const opts = {
        csrfPath: 'auth/csrf',
        csrfStorageKey: AUTH_CSRF_STORAGE_KEY,
        redirectOn401: 'auto' as const,
        authRedirectPath: '/auth',
        transientRetryAttempts: 0,
        ...options
    }

    const instance = axios.create({
        baseURL: opts.baseURL,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
    })

    ;(instance as any)[CSRF_STORAGE_SYMBOL] = opts.csrfStorageKey

    const csrfFetcher = axios.create({
        baseURL: opts.baseURL,
        withCredentials: true
    })

    let csrfPromise: Promise<string> | null = null

    const resolveCsrfToken = async (): Promise<string> => {
        const storage = getSessionStorage()
        const cached = storage?.getItem(opts.csrfStorageKey)
        if (cached) return cached

        if (!csrfPromise) {
            csrfPromise = csrfFetcher
                .get<{ csrfToken: string }>(opts.csrfPath)
                .then(({ data }) => {
                    if (typeof data?.csrfToken !== 'string') throw new Error('Invalid CSRF response')
                    storage?.setItem(opts.csrfStorageKey, data.csrfToken)
                    return data.csrfToken
                })
                .finally(() => {
                    csrfPromise = null
                })
        }
        return csrfPromise
    }

    // Request interceptor: attach CSRF token for mutating requests
    instance.interceptors.request.use(async (config) => {
        const method = (config.method ?? 'get').toLowerCase()
        if (CSRF_REQUIRED_METHODS.has(method)) {
            const token = await resolveCsrfToken()
            config.headers = config.headers ?? {}
            config.headers['X-CSRF-Token'] = token
        }
        config.withCredentials = true
        return config
    })

    // Response interceptor: handle CSRF expiry, 401, and retries
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const status: number | undefined = error?.response?.status
            const config: Record<string, any> = error?.config ?? {}

            if (status === 419) {
                const storage = getSessionStorage()
                storage?.removeItem(opts.csrfStorageKey)
            }

            if (status === 401 && opts.redirectOn401 !== false) {
                const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
                let shouldRedirect = false

                if (opts.redirectOn401 === true) {
                    shouldRedirect = true
                } else {
                    // 'auto': redirect unless on a public route
                    shouldRedirect = !isPublicRoute(pathname)
                }

                if (shouldRedirect && typeof window !== 'undefined') {
                    window.location.href = opts.authRedirectPath
                }
            }

            const method = (config?.method ?? '').toLowerCase()
            const shouldRetry = RETRYABLE_METHODS.has(method) && typeof status === 'number' && RETRYABLE_STATUSES.has(status)

            if (shouldRetry && opts.transientRetryAttempts > 0) {
                const currentAttempt = config.__retryCount ?? 0
                if (currentAttempt < opts.transientRetryAttempts) {
                    const delayMs = resolveBackoffDelay(currentAttempt)
                    config.__retryCount = currentAttempt + 1
                    await delay(delayMs)
                    return instance(config)
                }
            }

            return Promise.reject(error)
        }
    )

    return instance
}

export type AuthClient = ReturnType<typeof createAuthClient>

export const getStoredCsrfToken = (client?: AuthClient, storageKey?: string): string | null => {
    const storage = getSessionStorage()
    if (!storage) return null
    const resolvedKey = storageKey ?? ((client as any)?.[CSRF_STORAGE_SYMBOL] as string | undefined) ?? AUTH_CSRF_STORAGE_KEY
    return storage.getItem(resolvedKey) ?? null
}

export const clearStoredCsrfToken = (client?: AuthClient, storageKey?: string): void => {
    const storage = getSessionStorage()
    if (!storage) return
    const resolvedKey = storageKey ?? ((client as any)?.[CSRF_STORAGE_SYMBOL] as string | undefined) ?? AUTH_CSRF_STORAGE_KEY
    storage.removeItem(resolvedKey)
}
