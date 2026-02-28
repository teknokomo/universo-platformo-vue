<script setup lang="ts">
/**
 * Testimonials - Grid of user testimonial cards
 */
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

interface TestimonialItem {
    text: string
    author: string
    role: string
}

const items = tm('testimonials.items') as TestimonialItem[]
</script>

<template>
    <section class="testimonials">
        <div class="testimonials-grid">
            <div v-for="(item, index) in items" :key="index" class="testimonial-card">
                <p class="testimonial-text">"{{ item.text }}"</p>
                <div class="testimonial-author">
                    <span class="author-name">{{ item.author }}</span>
                    <span class="author-role">{{ item.role }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.testimonials {
    padding: 1.5rem 1.5rem 0.5rem;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    max-width: 1100px;
    margin: 0 auto;
}

@media (max-width: 900px) {
    .testimonials-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 540px) {
    .testimonials-grid {
        grid-template-columns: 1fr;
    }
}

.testimonial-card {
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.testimonial-text {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.92);
    line-height: 1.5;
    margin: 0;
    font-style: italic;
}

.testimonial-author {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}

.author-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: #fff;
}

.author-role {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.65);
}
</style>
