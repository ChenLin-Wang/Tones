<script setup lang="ts">
import * as Tone from "tone";
import { Samples } from "../shared/samples";
import { Key, inotonationInit, getFreqs, keyShift, toMinor, allKeys, baseKey } from "~/shared/inotonation";
import type { InotonationParas } from "~/components/Settings/Iontonation.vue";

definePageMeta({
    layout: "keyboard"
})

var synth: Tone.Sampler

const loading = ref(true)
const inotonation = ref({ key: "C", mode: 'Major', inot: 'Just' } as InotonationParas)
const envelop = ref({ attack: 0, release: 1 })

var tones: {t: string, freq: number}[] = []

const attack = (note: string) => {
    console.log(note)
    if (tones.find(a => a.t === note)) return
    const freqs = getFreqs(tones.map(a => a.t).concat(note))
    const f = freqs[freqs.length - 1][inotonation.value.inot === "Just" ? 0 : 1]
    tones.push({t: note, freq: f})
    synth.triggerAttack(f, '+' + envelop.value.attack)
    // const frqs = getFreqs(tones).map(a => a[inotonation.value.inot === "Just" ? 0 : 1])
    // console.log(`attack: ${inotonation.value.inot} ${frqs}, ${allKeys[baseKey]}`)
    // console.log(tones)
    // synth.releaseAll()
    // synth.triggerAttack(note)
    // synth.triggerRelease(note, synth.toSeconds(2))
    // synth.triggerAttackRelease(note, 2)
    // setTimeout(() => {
    //     synth.releaseAll()
    // }, 1000)
}

const release = (note: string) => {
    console.log(`release: ${note}`)
    const f = tones.find(a => a.t === note)?.freq
    tones = tones.filter(a => a.t !== note)
    if (f) synth.triggerRelease(f, '+' + envelop.value.release)
    else console.log("No release key")
}

inotonationInit()

onMounted(() => {
    instrumentChange("piano")
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
        attack: 0.1,
        baseUrl: `https://tones.inspiral.site/samples/${instrument}/`
    }).toDestination();
    Tone.loaded().then(() => {
        // inotonation.value = { key: "C", mode: 'Major', inot: 'Just' }
        Tone.start();
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
                        type="paragraph, paragraph, paragraph"></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</template>
