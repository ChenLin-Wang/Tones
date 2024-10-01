<script setup lang="ts">
import * as Tone from "tone";
import { Samples } from "../shared/samples";

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

onMounted(() => {
    synth = new Tone.Sampler({
        urls: Samples.flute.files,
        release: 1,
        // attack: 0.1,
        baseUrl: 'https://tones.inspiral.site/samples/flute/'
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
