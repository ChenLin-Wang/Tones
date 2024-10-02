<script setup lang="ts">
import * as Tone from "tone";
import { Samples } from "../shared/samples";
import { Key, inotonationInit, getFreqs, keyShift, toMinor, allKeys, baseKey } from "~/shared/inotonation";
import type { InotonationParas } from "~/components/Settings/Iontonation.vue";

definePageMeta({
    layout: "keyboard"
})

var synth: Tone.Sampler
var tones: string[] = []
const loading = ref(true)

const inotonation = ref({ key: "C", mode: 'Major', inot: 'Just' } as InotonationParas)
const envelop = ref({ attack: 1, release: 1 })

const attack = (note: string) => {
    if (!tones.includes(note)) tones.push(note)
    const frqs = getFreqs(tones).map(a => a[inotonation.value.inot === "Just" ? 0 : 1])
    console.log(`attack: ${inotonation.value.inot} ${frqs}, ${allKeys[baseKey]}`)
    synth.releaseAll(0)
    synth.triggerAttack(frqs)
}

const release = (note: string) => {
    console.log(`release: ${note}`)
    tones = tones.filter(a => a !== note)
    synth.releaseAll(1)
}

inotonationInit()

onMounted(() => {
    instrumentChange("flute")
})

watch(inotonation.value, n => {
    var key = Key[n.key as keyof typeof Key]
    if (n.mode === "Major") key = toMinor(key)
    console.log(`${n.mode} ${n.key} to ${allKeys[key]}`)
    keyShift(key)
})

watch(envelop.value, n => {

})

const instrumentChange = (instrument: keyof typeof Samples) => {
    if (synth) synth.releaseAll(0)
    loading.value = true
    synth = new Tone.Sampler({
        urls: Samples[instrument].files,
        release: 1,
        // attack: 0.1,
        baseUrl: `https://tones.inspiral.site/samples/${instrument}/`
    }).toDestination();
    Tone.loaded().then(() => {
        // inotonation.value = { key: "C", mode: 'Major', inot: 'Just' }
        loading.value = false
    });
}

</script>

<template>
    <v-container fluid style="height: calc(100vh - 80px);">
        <v-row no-gutters style="height: calc(100% - 250px);">
            <Settings style="height: 100%" 
                v-model:inotonation="inotonation"
                v-model:envelop="envelop"
                @instrumentChange="instrumentChange"
            />
        </v-row>
        <v-row no-gutters>
            <v-col class="pb-10">
                <Keyboard v-if="!loading" @attack="attack" @release="release" style="overflow: visible;"/>
                <v-skeleton-loader v-else color="black" style="border-radius: 20px;" :elevation="12"
                        class="fill-width" height="290"
                        type="list-item-avatar-three-line, paragraph"></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</template>
