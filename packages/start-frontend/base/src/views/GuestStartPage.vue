<script setup lang="ts">
/**
 * GuestStartPage - Landing page for non-authenticated users.
 *
 * Displays:
 * - Navigation bar with logo and login button
 * - Hero section with title and CTA button (centered)
 * - Testimonials section (4 cards in a row, at the bottom)
 * - Footer with contact information
 */
import AppAppBar from './components/AppAppBar.vue'
import Hero from './components/Hero.vue'
import Testimonials from './components/Testimonials.vue'
import StartFooter from '../components/StartFooter.vue'
</script>

<template>
    <div class="guest-page">
        <!-- Navigation -->
        <AppAppBar />

        <!-- Hero (takes available vertical space, content centered) -->
        <div class="hero-wrapper">
            <Hero />
        </div>

        <!-- Testimonials (anchored to bottom) -->
        <div class="testimonials-wrapper">
            <Testimonials />
        </div>

        <!-- Footer -->
        <div class="footer-wrapper">
            <StartFooter variant="guest" />
        </div>
    </div>
</template>

<style scoped>
.guest-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    background-image: url('/background-image.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* Gradient overlay for better text readability */
    background-color: #1e3a5f;
}

.guest-page::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(96, 165, 250, 0.4), transparent);
    pointer-events: none;
    z-index: 0;
}

.hero-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
}

.testimonials-wrapper {
    flex-shrink: 0;
    position: relative;
    z-index: 1;
}

.footer-wrapper {
    flex-shrink: 0;
    position: relative;
    z-index: 1;
}
</style>
