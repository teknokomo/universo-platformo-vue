import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const apiTarget = env.VITE_API_TARGET || 'http://localhost:8000'

    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': resolve(__dirname, './src')
            }
        },
        server: {
            port: 3000,
            proxy: {
                '/api': {
                    target: apiTarget,
                    changeOrigin: true
                }
            }
        }
    }
})
