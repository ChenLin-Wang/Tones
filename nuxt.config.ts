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

/*
PORT=9410 forever start -c node .output/server/index.mjs

# 安装forever
npm install forever -g
# 启动应用
forever start app.js --watch
# 关闭应用
forever stop app.js
# 重启应用
forever restart app.js
# 关闭所有应用
forever stopall
# 重启所有应用
forever restartall
# 显示所有运行的应用
forever list
*/