<script setup lang="ts">
import * as Tone from "tone";
import { Samples } from "../shared/samples";
import { Key, inotonationInit, getFreqs, keyShift, toMinor, allKeys, baseKey, isSemiTone, relativeNote, absoluteNote } from "~/shared/inotonation";
import type { InotonationParas } from "~/components/Settings/Iontonation.vue";

definePageMeta({
    layout: "keyboard"
})

var synth: Tone.Sampler

const loading = ref(true)
const inotonation = ref({ key: "C", mode: 'Major', inot: 'Just' } as InotonationParas)
const envelop = ref({ attack: 0.01, decay: 1, sustain: 0.7, release: 1 })

const tones = ref([] as { note: string, freq: number }[])
const semiTones = ref([] as { note: string, based?: string, r: string[] }[])

const attack = (note: string) => {
    const rNote = relativeNote(note)
    if (tones.value.find(a => a.note === rNote)) return
    const res = getFreqs(tones.value.map(a => absoluteNote(a.note)).concat(note))
    const freqs = res
    const i = inotonation.value.inot === "Just" ? 0 : 1
    const f = res[freqs.length - 1].fs[i]
    tones.value.push({ note: rNote, freq: f })
    if (isSemiTone(rNote)) semiTones.value.push({ note: rNote, based: res[freqs.length - 1].rels[i].based, r: res[freqs.length - 1].rels[i].r })
    synth.triggerAttack(f, '+' + envelop.value.attack)
}

const release = (note: string) => {
    const rNote = relativeNote(note)
    const f = tones.value.find(a => a.note === rNote)?.freq
    tones.value = tones.value.filter(a => a.note !== rNote)
    semiTones.value = semiTones.value.filter(a => a.note !== rNote)
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
    keyShift(key)
    tones.value = []
    semiTones.value = []
})

const shiftKeyDown = (): void => {
    inotonation.value.inot = "Equal"
}

const shiftKeyUp = (): void => {
    inotonation.value.inot = "Just"
}

const keyShiftUp = (): void => {
    inotonation.value.key = allKeys[(Key[inotonation.value.key as keyof typeof Key] + 1) % 12]
}

const keyShiftDown = (): void => {
    inotonation.value.key = allKeys[(Key[inotonation.value.key as keyof typeof Key] - 1) % 12]
}

const instrumentChange = (instrument: keyof typeof Samples) => {
    if (synth) synth.releaseAll(0)
    loading.value = true
    synth = new Tone.Sampler({
        urls: Samples[instrument].files,
        baseUrl: `https://tones.inspiral.site/samples/${instrument}/`
    }).toDestination();
    Tone.loaded().then(() => {
        loading.value = false
    });
}

</script>

<template>
    <v-container fluid style="height: calc(100vh - 80px);">
        <v-row no-gutters style="height: calc(100% - 335px);">
            <Settings style="height: 100%" v-model:inotonation="inotonation" v-model:envelop="envelop"
                @instrumentChange="instrumentChange" />
        </v-row>
        <v-row no-gutters style="height: 85px">
            <ShowCase v-if="!loading" :freqs="tones" :half-tone-relations="semiTones" />
            <v-skeleton-loader v-else color="black" style="width: 100%; border-radius: 20px;" :elevation="12"
                height="69" type="sentences"></v-skeleton-loader>
        </v-row>
        <v-row no-gutters>
            <v-col class="pb-10">
                <Keyboard v-if="!loading" @attack="attack" @release="release" @shift-key-down="shiftKeyDown"
                    @shift-key-up="shiftKeyUp" @key-shift-up-key-down="keyShiftUp"
                    @key-shift-down-key-down="keyShiftDown" style="overflow: visible;" />
                <v-skeleton-loader v-else color="black" style="border-radius: 20px;" :elevation="12" class="fill-width"
                    height="290" type="paragraph, paragraph, paragraph"></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</template>
