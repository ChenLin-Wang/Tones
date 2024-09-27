// plugins/tone.client.ts
import { defineNuxtPlugin } from '#app'
import * as Tone from 'tone'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            tone: Tone
        }
    }
})
