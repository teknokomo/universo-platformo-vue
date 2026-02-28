<script setup lang="ts">
/**
 * App.vue - Root application component.
 *
 * Wraps the entire application in AuthProvider to provide auth state
 * to all child components via provide/inject.
 */
import { AuthProvider, createAuthClient } from '@universo/auth-frontend'
import { RouterView } from 'vue-router'

const authClient = createAuthClient({
    baseURL: '/api/v1',
    redirectOn401: 'auto'
})
authClient.defaults.headers.common['x-request-from'] = 'internal'
</script>

<template>
    <AuthProvider :client="authClient">
        <RouterView />
    </AuthProvider>
</template>

<style>
/* Global reset */
*,
*::before,
*::after {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    font-family:
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        'Helvetica Neue',
        Arial,
        sans-serif;
    -webkit-font-smoothing: antialiased;
}

#app {
    width: 100%;
    min-height: 100vh;
}
</style>
