<script setup lang="ts">
/**
 * StartPage - Conditional start page based on authentication status.
 *
 * Shows:
 * - GuestStartPage for non-authenticated users (landing with testimonials)
 * - AuthenticatedStartPage for authenticated users (onboarding wizard)
 */
import { useAuth } from '@universo/auth-frontend'
import GuestStartPage from './GuestStartPage.vue'
import AuthenticatedStartPage from './AuthenticatedStartPage.vue'

const { isAuthenticated, loading } = useAuth()
</script>

<template>
    <!-- Loading state while checking auth -->
    <div v-if="loading" class="loading-full">
        <div class="spinner" />
    </div>

    <!-- Authenticated users get the onboarding wizard -->
    <AuthenticatedStartPage v-else-if="isAuthenticated" />

    <!-- Guests get the landing page -->
    <GuestStartPage v-else />
</template>

<style scoped>
.loading-full {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

.spinner {
    width: 2.5rem;
    height: 2.5rem;
    border: 3px solid #e5e7eb;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
