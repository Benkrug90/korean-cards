import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/korean-cards/',
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Korean Cards',
      short_name: 'Korean Cards',
      description: 'A small offline Korean vocabulary deck.',
      start_url: '/korean-cards/',
      scope: '/korean-cards/',
      display: 'standalone',
      display_override: ['standalone'],
      background_color: '#fafafa',
      theme_color: '#fafafa',
      icons: [
        { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
        { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
      ]
    },
    workbox: { globPatterns: ['**/*.{js,css,html,svg,png,ico}'] }
  })]
})
