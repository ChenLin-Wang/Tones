<script setup lang="ts">
import * as Tone from "tone";

const synth = new Tone.FMSynth().toDestination()
// synth.triggerAttack("E4")
const attack = (note: string) => {
    console.log(`attack: ${note}`)
    synth.triggerAttack(note)
}

const release = (note: string) => {
    console.log(`release: ${note}`)
    synth.triggerRelease(0)
}



</script>

<template>
    <v-container fluid>
        <v-row>
            <Keyboard @attack="attack" @release="release" style="overflow: visible;" />
        </v-row>
    </v-container>
</template>
