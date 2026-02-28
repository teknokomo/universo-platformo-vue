<script setup lang="ts">
/**
 * LoginForm - Email/password login form with error display.
 */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../composables/useAuth'

const emit = defineEmits<{
    success: []
    error: [message: string]
}>()

const { login } = useAuth()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
    if (!email.value || !password.value) {
        errorMessage.value = t('auth.validation.required')
        return
    }

    isSubmitting.value = true
    errorMessage.value = ''

    try {
        await login(email.value, password.value)
        emit('success')
    } catch (err: any) {
        const msg = err?.response?.data?.message ?? err?.message ?? t('auth.validation.loginFailed')
        errorMessage.value = msg
        emit('error', msg)
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <form class="login-form" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="email">{{ t('auth.emailLabel') }}</label>
            <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                required
                :placeholder="t('auth.emailPlaceholder')"
            />
        </div>

        <div class="form-group">
            <label for="password">{{ t('auth.passwordLabel') }}</label>
            <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="current-password"
                required
                :placeholder="t('auth.passwordPlaceholder')"
            />
        </div>

        <p v-if="errorMessage" class="error-msg" role="alert">
            {{ errorMessage }}
        </p>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting">{{ t('auth.submitting') }}</span>
            <span v-else>{{ t('auth.submit') }}</span>
        </button>
    </form>
</template>

<style scoped>
.login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 380px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
}

input {
    padding: 0.6rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.15s;
}

input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.error-msg {
    color: #dc2626;
    font-size: 0.875rem;
    margin: 0;
}

.submit-btn {
    padding: 0.65rem 1.25rem;
    background: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
}

.submit-btn:hover:not(:disabled) {
    background: #2563eb;
}

.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
