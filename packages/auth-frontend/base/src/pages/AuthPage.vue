<script setup lang="ts">
/**
 * AuthPage - Full-page authentication view (login/register).
 *
 * Shows the LoginForm centered in the page.
 * After successful login the user is redirected to '/' via vue-router.
 */
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LoginForm from '../components/LoginForm.vue'

const router = useRouter()
const { t } = useI18n()

const onSuccess = () => {
    router.push('/')
}
</script>

<template>
    <div class="auth-page">
        <div class="auth-card">
            <h1 class="auth-title">Universo Platformo</h1>
            <p class="auth-subtitle">{{ t('auth.subtitle') }}</p>
            <LoginForm @success="onSuccess" />
        </div>
    </div>
</template>

<style scoped>
.auth-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%);
}

.auth-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 2.5rem 2rem;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.auth-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    text-align: center;
}

.auth-subtitle {
    font-size: 0.95rem;
    color: #6b7280;
    margin: 0 0 1rem 0;
    text-align: center;
}
</style>
