<script setup lang="ts">
import * as Tone from "tone";
import { Samples } from "../shared/samples";
import { Key, inotonationInit, getFreqs, keyShift } from "~/shared/inotonation";

definePageMeta({
    layout: "keyboard"
})

var synth: Tone.Sampler

const attack = (note: string) => {
    console.log(`attack: ${note}`)
    synth.triggerAttack([note])
}

const release = (note: string) => {
    console.log(`release: ${note}`)
    synth.triggerRelease([note])
}


inotonationInit()
keyShift(Key.E)
keyShift(Key["C#"])
// keyShift(Key["G#"])
// keyShift(Key.F)
// keyShift(Key.A)
console.log(getFreqs(["C3", "Eb4", "G4", "G#4"]))
// const res = toneShift("Eb")
// console.log(`${res.flap}, ${allKeys[res.key]}`)

onMounted(() => {
    synth = new Tone.Sampler({
        urls: Samples.piano.files,
        release: 1,
        // attack: 0.1,
        baseUrl: 'https://tones.inspiral.site/samples/piano/'
    }).toDestination();

    Tone.loaded().then(() => {
        console.log("Load complete")
    });
})

</script>

<template>
    <v-container fluid>
        <v-row>
            <Keyboard @attack="attack" @release="release" style="overflow: visible;" />
        </v-row>
    </v-container>
</template>
