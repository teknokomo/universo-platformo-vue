<script setup lang="ts">
/**
 * OnboardingWizard - Multi-step wizard for new user onboarding.
 *
 * Steps:
 * 1. Welcome - introduction
 * 2. Projects (Global Goals) - select global goals
 * 3. Campaigns (Personal Interests) - select personal interests
 * 4. Clusters (Platform Features) - select platform features
 * 5. Completion - final message
 */
import { ref, onMounted } from 'vue'
import { getOnboardingItems, joinItems } from '../api/onboarding'
import type { OnboardingItem, OnboardingItems } from '../types'

const emit = defineEmits<{ complete: [] }>()

type StepName = 'welcome' | 'projects' | 'campaigns' | 'clusters' | 'completion'
const STEPS: StepName[] = ['welcome', 'projects', 'campaigns', 'clusters', 'completion']

const activeStep = ref(0)
const items = ref<OnboardingItems | null>(null)
const isLoading = ref(true)
const isSaving = ref(false)
const error = ref<string | null>(null)

const selectedProjects = ref<string[]>([])
const selectedCampaigns = ref<string[]>([])
const selectedClusters = ref<string[]>([])

onMounted(async () => {
    try {
        isLoading.value = true
        error.value = null
        const data = await getOnboardingItems()
        items.value = data

        if (data.projects.length > 0) selectedProjects.value = [data.projects[0].id]
        if (data.campaigns.length > 0) selectedCampaigns.value = [data.campaigns[0].id]
        if (data.clusters.length > 0) selectedClusters.value = [data.clusters[0].id]
    } catch (err) {
        console.error('[OnboardingWizard] Failed to load items:', err)
        error.value = 'Не удалось загрузить данные. Попробуйте ещё раз.'
    } finally {
        isLoading.value = false
    }
})

const toggleItem = (list: string[], id: string): string[] => {
    const idx = list.indexOf(id)
    if (idx >= 0) return list.filter((i) => i !== id)
    return [...list, id]
}

const toggleProject = (id: string) => (selectedProjects.value = toggleItem(selectedProjects.value, id))
const toggleCampaign = (id: string) => (selectedCampaigns.value = toggleItem(selectedCampaigns.value, id))
const toggleCluster = (id: string) => (selectedClusters.value = toggleItem(selectedClusters.value, id))

const handleNext = async () => {
    const current = STEPS[activeStep.value]

    if (current === 'clusters') {
        try {
            isSaving.value = true
            error.value = null
            await joinItems({
                projectIds: selectedProjects.value,
                campaignIds: selectedCampaigns.value,
                clusterIds: selectedClusters.value
            })
        } catch (err) {
            console.error('[OnboardingWizard] Failed to save:', err)
            error.value = 'Не удалось сохранить выбор. Попробуйте ещё раз.'
            isSaving.value = false
            return
        } finally {
            isSaving.value = false
        }
    }

    if (activeStep.value < STEPS.length - 1) {
        activeStep.value++
        if (STEPS[activeStep.value] === 'completion') {
            emit('complete')
        }
    }
}

const handleBack = () => {
    if (activeStep.value > 0) activeStep.value--
}

const handleStartOver = () => {
    activeStep.value = 0
}

const currentStep = () => STEPS[activeStep.value]
</script>

<template>
    <div class="wizard-container">
        <!-- Step indicators (desktop only) -->
        <div class="stepper desktop-only">
            <div
                v-for="(step, index) in STEPS"
                :key="step"
                class="step-item"
                :class="{ active: index === activeStep, completed: index < activeStep }"
            >
                <div class="step-circle">{{ index + 1 }}</div>
                <span class="step-label">{{ step }}</span>
            </div>
        </div>

        <!-- Error message -->
        <div v-if="error" class="error-alert" role="alert">
            <span>{{ error }}</span>
            <button class="error-close" @click="error = null">✕</button>
        </div>

        <!-- Step content -->
        <div class="step-content">
            <!-- Loading -->
            <div v-if="isLoading" class="loading-state">
                <div class="spinner" />
                <p>Загрузка…</p>
            </div>

            <!-- Welcome step -->
            <template v-else-if="currentStep() === 'welcome'">
                <img src="/background-image.jpg" alt="Universo Platformo" class="step-image" onerror="this.style.display='none'" />
                <h2 class="step-title">Добро пожаловать!</h2>
                <p class="step-text">
                    Universo Platformo — платформа, объединяющая глобальные проекты, кампании и сообщества. Давайте поможем вам настроить
                    персональный опыт.
                </p>
            </template>

            <!-- Projects step -->
            <template v-else-if="currentStep() === 'projects'">
                <h2 class="step-title">Глобальные проекты</h2>
                <p class="step-subtitle">Выберите глобальные цели, которые вас интересуют</p>
                <div v-if="items?.projects.length" class="items-grid">
                    <button
                        v-for="item in items.projects"
                        :key="item.id"
                        class="item-card"
                        :class="{ selected: selectedProjects.includes(item.id) }"
                        @click="toggleProject(item.id)"
                    >
                        <span class="item-title">{{ item.title }}</span>
                        <p v-if="item.description" class="item-desc">{{ item.description }}</p>
                    </button>
                </div>
                <p v-else class="empty-state">Проекты скоро появятся</p>
            </template>

            <!-- Campaigns step -->
            <template v-else-if="currentStep() === 'campaigns'">
                <h2 class="step-title">Личные интересы</h2>
                <p class="step-subtitle">Выберите кампании, соответствующие вашим интересам</p>
                <div v-if="items?.campaigns.length" class="items-grid">
                    <button
                        v-for="item in items.campaigns"
                        :key="item.id"
                        class="item-card"
                        :class="{ selected: selectedCampaigns.includes(item.id) }"
                        @click="toggleCampaign(item.id)"
                    >
                        <span class="item-title">{{ item.title }}</span>
                        <p v-if="item.description" class="item-desc">{{ item.description }}</p>
                    </button>
                </div>
                <p v-else class="empty-state">Кампании скоро появятся</p>
            </template>

            <!-- Clusters step -->
            <template v-else-if="currentStep() === 'clusters'">
                <h2 class="step-title">Функции платформы</h2>
                <p class="step-subtitle">Выберите возможности платформы, которые вас интересуют</p>
                <div v-if="items?.clusters.length" class="items-grid">
                    <button
                        v-for="item in items.clusters"
                        :key="item.id"
                        class="item-card"
                        :class="{ selected: selectedClusters.includes(item.id) }"
                        @click="toggleCluster(item.id)"
                    >
                        <span class="item-title">{{ item.title }}</span>
                        <p v-if="item.description" class="item-desc">{{ item.description }}</p>
                    </button>
                </div>
                <p v-else class="empty-state">Функции скоро появятся</p>
            </template>

            <!-- Completion step -->
            <template v-else-if="currentStep() === 'completion'">
                <img src="/background-image.jpg" alt="Завершение" class="step-image" onerror="this.style.display='none'" />
                <h2 class="step-title">Отлично! Вы готовы!</h2>
                <p class="step-text">
                    Ваши предпочтения сохранены. Мы подобрали для вас персонализированный опыт на платформе Universo Platformo.
                </p>
                <div class="completion-notice">
                    <p class="notice-title">Важно знать:</p>
                    <ul class="notice-list">
                        <li>Платформа находится в стадии альфа-тестирования.</li>
                        <li>
                            Следите за обновлениями на
                            <a href="https://github.com/teknokomo/universo-platformo-react" target="_blank" rel="noopener">GitHub</a>.
                        </li>
                        <li>
                            Присоединяйтесь в Telegram:
                            <a href="https://t.me/universo_pro" target="_blank" rel="noopener">@universo_pro</a>.
                        </li>
                    </ul>
                </div>
                <p class="slogan">Все миры открыты!</p>
            </template>
        </div>

        <!-- Navigation buttons -->
        <div class="wizard-nav">
            <div>
                <button v-if="activeStep > 0 && currentStep() !== 'completion'" class="btn btn-outline" :disabled="isSaving" @click="handleBack">
                    Назад
                </button>
            </div>
            <div>
                <button v-if="currentStep() === 'completion'" class="btn btn-primary" @click="handleStartOver">Начать заново</button>
                <button v-else class="btn btn-primary" :disabled="isLoading || isSaving" @click="handleNext">
                    <span v-if="isSaving" class="spinner spinner-sm" />
                    <span v-else>Далее</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wizard-container {
    max-width: 720px;
    margin: 0 auto;
    padding: 5.5rem 1.5rem 1.5rem;
}

/* Stepper */
.stepper {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.desktop-only {
    display: flex;
}

@media (max-width: 600px) {
    .desktop-only {
        display: none;
    }
}

.step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    opacity: 0.45;
    font-size: 0.75rem;
}

.step-item.active,
.step-item.completed {
    opacity: 1;
}

.step-circle {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 600;
}

.step-item.active .step-circle {
    border-color: #3b82f6;
    background: #3b82f6;
    color: #fff;
}

.step-item.completed .step-circle {
    border-color: #10b981;
    background: #10b981;
    color: #fff;
}

/* Error */
.error-alert {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fee2e2;
    border: 1px solid #f87171;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-bottom: 1.5rem;
    color: #dc2626;
    font-size: 0.9rem;
}

.error-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #dc2626;
    font-size: 1rem;
}

/* Step content */
.step-content {
    min-height: 320px;
}

.step-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1.5rem;
}

.step-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.5rem;
}

.step-subtitle {
    color: #6b7280;
    font-size: 0.95rem;
    margin: 0 0 1.25rem;
}

.step-text {
    color: #374151;
    line-height: 1.7;
    margin: 0;
}

/* Items grid */
.items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
    margin-top: 0.25rem;
    max-height: 340px;
    overflow-y: auto;
}

.item-card {
    background: #f9fafb;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    padding: 0.85rem 1rem;
    text-align: left;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.item-card:hover {
    border-color: #93c5fd;
    background: #eff6ff;
}

.item-card.selected {
    border-color: #3b82f6;
    background: #eff6ff;
}

.item-title {
    font-weight: 600;
    font-size: 0.9rem;
    color: #111827;
}

.item-desc {
    font-size: 0.78rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.4;
}

.empty-state {
    color: #9ca3af;
    font-style: italic;
    text-align: center;
    margin-top: 2rem;
}

/* Completion */
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
    margin-top: 1.5rem;
}

/* Loading */
.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 4rem 0;
    color: #9ca3af;
}

/* Navigation */
.wizard-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
}

.btn {
    padding: 0.6rem 1.5rem;
    border-radius: 7px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-primary {
    background: #3b82f6;
    color: #fff;
    border: 2px solid #3b82f6;
}

.btn-primary:hover:not(:disabled) {
    background: #2563eb;
    border-color: #2563eb;
}

.btn-outline {
    background: transparent;
    color: #374151;
    border: 2px solid #d1d5db;
}

.btn-outline:hover:not(:disabled) {
    border-color: #9ca3af;
    background: #f9fafb;
}

/* Spinner */
.spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid #e5e7eb;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}

.spinner-sm {
    width: 1rem;
    height: 1rem;
    border-width: 2px;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
