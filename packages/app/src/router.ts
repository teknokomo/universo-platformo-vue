import { createRouter, createWebHistory } from 'vue-router'
import { StartPage } from '@universo/start-frontend'
import { AuthPage } from '@universo/auth-frontend'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: StartPage
        },
        {
            path: '/auth',
            component: AuthPage
        }
    ]
})
