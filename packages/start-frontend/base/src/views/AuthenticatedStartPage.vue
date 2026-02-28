<script setup lang="ts">
/**
 * AuthenticatedStartPage - Onboarding wizard for authenticated users.
 *
 * If onboarding is already completed, shows the completion state.
 * Otherwise shows the multi-step onboarding wizard.
 */
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import OnboardingWizard from '../components/OnboardingWizard.vue'
import StartFooter from '../components/StartFooter.vue'
import { useOnboardingApi } from '../composables/useOnboardingApi'

const { getOnboardingItems } = useOnboardingApi()
const { t } = useI18n()

const isReady = ref(false)
const onboardingCompleted = ref<boolean | null>(null)

onMounted(async () => {
    try {
        const data = await getOnboardingItems()
        onboardingCompleted.value = data.onboardingCompleted
    } catch (err) {
        console.error('[AuthenticatedStartPage] Failed to check onboarding status:', err)
        onboardingCompleted.value = false
    }
    isReady.value = true
})

const handleComplete = () => {
    onboardingCompleted.value = true
}

const handleStartOver = () => {
    onboardingCompleted.value = false
}
</script>

<template>
    <div class="authenticated-page">
        <!-- Loading state -->
        <div v-if="!isReady" class="loading-center">
            <div class="spinner" />
        </div>

        <!-- Completion state -->
        <template v-else-if="onboardingCompleted">
            <div class="page-content">
                <div class="completion-card">
                    <img src="/background-image.jpg" alt="Universo Platformo" class="completion-image" onerror="this.style.display='none'" />
                    <h2 class="completion-title">{{ t('completed.title') }}</h2>
                    <p class="completion-text">{{ t('completed.description') }}</p>
                    <div class="completion-notice">
                        <p class="notice-title">{{ t('completed.noticeTitle') }}</p>
                        <ul class="notice-list">
                            <li>{{ t('completed.noticeAlpha') }}</li>
                            <li>
                                {{ t('completed.noticeGithub') }}
                                <a href="https://github.com/teknokomo/universo-platformo-react" target="_blank" rel="noopener noreferrer">GitHub</a>.
                            </li>
                            <li>
                                {{ t('completed.noticeTelegram') }}
                                <a href="https://t.me/universo_pro" target="_blank" rel="noopener noreferrer">@universo_pro</a>.
                            </li>
                        </ul>
                    </div>
                    <p class="slogan">{{ t('completed.slogan') }}</p>
                    <button class="btn-restart" @click="handleStartOver">{{ t('completed.startOver') }}</button>
                </div>
            </div>
        </template>

        <!-- Onboarding wizard -->
        <template v-else>
            <div class="page-content">
                <OnboardingWizard @complete="handleComplete" />
            </div>
        </template>

        <!-- Footer -->
        <StartFooter variant="internal" />
    </div>
</template>

<style scoped>
.authenticated-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f9fafb;
}

.page-content {
    flex: 1;
}

.loading-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
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

/* Completion */
.completion-card {
    max-width: 720px;
    margin: 0 auto;
    padding: 5.5rem 1.5rem 2rem;
}

.completion-image {
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1.5rem;
}

.completion-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.5rem;
}

.completion-text {
    color: #374151;
    line-height: 1.7;
    margin: 0 0 1rem;
}

.completion-notice {
    background: #f3f4f6;
    border-radius: 8px;
    padding: 1rem 1.25rem;
    margin: 1.25rem 0;
}

.notice-title {
    font-weight: 600;
    font-size: 0.9rem;
    margin: 0 0 0.5rem;
    color: #111827;
}

.notice-list {
    margin: 0;
    padding-left: 1.25rem;
    font-size: 0.85rem;
    color: #374151;
    line-height: 1.7;
}

.notice-list a {
    color: #3b82f6;
}

.slogan {
    font-size: 1.4rem;
    font-weight: 700;
    color: #3b82f6;
    margin: 1rem 0;
}

.btn-restart {
    padding: 0.6rem 1.5rem;
    border: 2px solid #d1d5db;
    border-radius: 7px;
    background: transparent;
    color: #374151;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
}

.btn-restart:hover {
    border-color: #9ca3af;
    background: #f9fafb;
}
</style>
