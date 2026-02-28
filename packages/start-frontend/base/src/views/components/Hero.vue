<script setup lang="ts">
/**
 * Hero - Landing page hero section
 *
 * Displays the main heading, subtitle, and a CTA button.
 */
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
</script>

<template>
    <section id="hero" class="hero">
        <div class="hero-container">
            <h1 class="hero-title">
                <span>{{ t('hero.titlePrefix') }}</span>&nbsp;<span class="hero-highlight">{{ t('hero.titleHighlight') }}</span>
            </h1>
            <p class="hero-description">{{ t('hero.description') }}</p>
            <div class="hero-actions">
                <RouterLink to="/auth" class="hero-btn">
                    {{ t('hero.button') }}
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hero {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.hero-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 7rem 1.5rem 3rem;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    gap: 1.5rem;
}

.hero-title {
    font-size: clamp(2.5rem, 8vw, 3.5rem);
    font-weight: 800;
    color: #fff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    margin: 0;
    line-height: 1.15;
}

.hero-highlight {
    color: #60a5fa;
}

.hero-description {
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.92);
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    max-width: 620px;
    margin: 0 auto;
    line-height: 1.6;
}

.hero-actions {
    padding-top: 1rem;
}

.hero-btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: #3b82f6;
    color: #fff;
    text-decoration: none;
    border-radius: 8px;
    font-size: 1.05rem;
    font-weight: 600;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
    transition: background 0.15s, transform 0.15s;
}

.hero-btn:hover {
    background: #2563eb;
    transform: translateY(-1px);
}
</style>
