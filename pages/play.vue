<script setup lang="ts">
import * as Tone from "tone";
import { Samples } from "../shared/samples";
import { Key, inotonationInit, getFreqs, keyShift } from "~/shared/inotonation";

definePageMeta({
    layout: "keyboard"
})

var synth: Tone.Sampler
var tones: string[] = []

const attack = (note: string) => {
    if (!tones.includes(note)) tones.push(note)
    const frqs = getFreqs(tones).map(a => a[0])
    synth.releaseAll(0)
    synth.triggerAttack(frqs)
}

const release = (note: string) => {
    console.log(`release: ${note}`)
    tones = tones.filter(a => a !== note)
    synth.triggerRelease([note])
}

inotonationInit()

onMounted(() => {
    synth = new Tone.Sampler({
        urls: Samples.violin.files,
        release: 1,
        // attack: 0.1,
        baseUrl: 'https://tones.inspiral.site/samples/violin/'
    }).toDestination();

    Tone.loaded().then(() => {
        console.log("Load complete")
    });
})

</script>

<template>
    <v-container fluid style="height: 100vh;">
        <v-row>
            <Settings />
        </v-row>
        <v-row class="fill-height" no-gutters align="end" justify="center">
            <v-col class="pb-10">
                <Keyboard @attack="attack" @release="release" style="overflow: visible;" />
            </v-col>
        </v-row>
    </v-container>
</template>
