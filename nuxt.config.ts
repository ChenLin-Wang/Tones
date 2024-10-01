// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    devServer: {
        host: '0.0.0.0',
        port: 9410
    },
    googleFonts: {
        families: {
            'Protest Guerrilla': true
        }
    },
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        'vue-knob-control',
        '@nuxtjs/google-fonts',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },
        //...
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
})