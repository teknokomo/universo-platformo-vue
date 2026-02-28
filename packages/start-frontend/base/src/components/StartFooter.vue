<script setup lang="ts">
/**
 * StartFooter - Footer for guest and authenticated start pages.
 *
 * Supports two variants:
 * - 'guest': white text with shadow (on dark background)
 * - 'internal': gray text (on light background)
 */
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{ variant?: 'guest' | 'internal' }>(), { variant: 'guest' })

const { t } = useI18n()

const footerItems = [
    { icon: '✈', text: () => t('footer.owner'), href: 'https://t.me/diverslaboristo', external: true },
    { icon: '✉', text: () => `mailto:${t('footer.email')}`, href: () => `mailto:${t('footer.email')}`, external: true, label: () => t('footer.email') },
    { icon: '📄', text: () => t('footer.termsOfService'), href: '/terms', external: false },
    { icon: '🔒', text: () => t('footer.privacyPolicy'), href: '/privacy', external: false }
]
</script>

<template>
    <footer class="start-footer" :class="variant">
        <div class="footer-grid">
            <a
                v-for="(item, index) in footerItems"
                :key="index"
                :href="typeof item.href === 'function' ? item.href() : item.href"
                class="footer-item"
                :target="item.external ? '_blank' : undefined"
                :rel="item.external ? 'noopener noreferrer' : undefined"
            >
                <span class="footer-icon">{{ item.icon }}</span>
                <span class="footer-label">{{ item.label ? item.label() : item.text() }}</span>
            </a>
        </div>
    </footer>
</template>

<style scoped>
.start-footer {
    padding: 0.6rem 1.5rem 0.5rem;
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    max-width: 1100px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .footer-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 400px) {
    .footer-grid {
        grid-template-columns: 1fr;
    }
}

.footer-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    text-decoration: none;
    font-size: 0.8rem;
    transition: all 0.15s;
    padding: 0.25rem 0;
}

.guest .footer-item {
    color: rgba(255, 255, 255, 0.85);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.guest .footer-item:hover {
    color: #93c5fd;
    transform: translateY(-1px);
}

.internal .footer-item {
    color: #6b7280;
}

.internal .footer-item:hover {
    color: #3b82f6;
    transform: translateY(-1px);
}

.footer-icon {
    font-size: 0.9rem;
}
</style>
