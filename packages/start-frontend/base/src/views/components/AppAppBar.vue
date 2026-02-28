<script setup lang="ts">
/**
 * AppAppBar - Top navigation bar
 *
 * Shows logo on the left and login/logout button on the right.
 * Responsive: hamburger menu on mobile.
 */
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '@universo/auth-frontend'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { isAuthenticated, logout, loading } = useAuth()

const mobileMenuOpen = ref(false)

const handleLogout = async () => {
    mobileMenuOpen.value = false
    await logout()
}
</script>

<template>
    <header class="appbar">
        <div class="appbar-inner">
            <!-- Logo -->
            <RouterLink to="/" class="appbar-logo">
                <span class="logo-icon">◎</span>
                <span class="logo-text">Universo</span>
            </RouterLink>

            <!-- Desktop nav -->
            <nav class="appbar-nav desktop-nav">
                <template v-if="!loading">
                    <button v-if="isAuthenticated" class="nav-btn" @click="logout">
                        {{ t('nav.logout') }}
                    </button>
                    <RouterLink v-else to="/auth" class="nav-btn nav-btn--primary">
                        {{ t('nav.login') }}
                    </RouterLink>
                </template>
            </nav>

            <!-- Mobile hamburger -->
            <button class="hamburger" :aria-label="mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')" :aria-expanded="mobileMenuOpen" @click="mobileMenuOpen = !mobileMenuOpen">
                <span v-if="!mobileMenuOpen">☰</span>
                <span v-else>✕</span>
            </button>
        </div>

        <!-- Mobile drawer -->
        <Transition name="slide-down">
            <div v-if="mobileMenuOpen" class="mobile-menu">
                <template v-if="!loading">
                    <button v-if="isAuthenticated" class="mobile-nav-btn" @click="handleLogout">
                        {{ t('nav.logout') }}
                    </button>
                    <RouterLink v-else to="/auth" class="mobile-nav-btn mobile-nav-btn--primary" @click="mobileMenuOpen = false">
                        {{ t('nav.login') }}
                    </RouterLink>
                </template>
            </div>
        </Transition>
    </header>
</template>

<style scoped>
.appbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0.85rem 1.5rem;
}

.appbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1100px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 0.5rem 1.1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.appbar-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 1.1rem;
}

.logo-icon {
    font-size: 1.4rem;
}

.appbar-nav {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.desktop-nav {
    display: flex;
}

@media (max-width: 640px) {
    .desktop-nav {
        display: none;
    }
}

.nav-btn {
    padding: 0.4rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: transparent;
    color: #fff;
    text-decoration: none;
    transition: background 0.15s;
}

.nav-btn:hover {
    background: rgba(255, 255, 255, 0.15);
}

.nav-btn--primary {
    background: #3b82f6;
    border-color: #3b82f6;
}

.nav-btn--primary:hover {
    background: #2563eb;
    border-color: #2563eb;
}

.hamburger {
    display: none;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 1.4rem;
    cursor: pointer;
}

@media (max-width: 640px) {
    .hamburger {
        display: flex;
    }
}

.mobile-menu {
    max-width: 1100px;
    margin: 0.5rem auto 0;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.mobile-nav-btn {
    display: block;
    width: 100%;
    padding: 0.6rem 1rem;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: transparent;
    color: #fff;
    text-decoration: none;
    text-align: center;
    transition: background 0.15s;
}

.mobile-nav-btn--primary {
    background: #3b82f6;
    border-color: #3b82f6;
}

/* Transition */
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.2s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
