/**
 * Universo Platformo | start-frontend
 *
 * Vue start page module - exports all public API.
 */

// Views
export { default as StartPage } from './views/StartPage.vue'
export { default as GuestStartPage } from './views/GuestStartPage.vue'
export { default as AuthenticatedStartPage } from './views/AuthenticatedStartPage.vue'

// Components
export { default as OnboardingWizard } from './components/OnboardingWizard.vue'
export { default as StartFooter } from './components/StartFooter.vue'

// API
export { getOnboardingItems, joinItems } from './api/onboarding'

// Types
export * from './types'

// i18n
export { i18n } from './i18n'
