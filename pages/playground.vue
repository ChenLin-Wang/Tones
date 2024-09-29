<script setup>
const { $tone } = useNuxtApp()


const playSound = () => {
    // create two monophonic synths
    const synthA = new $tone.FMSynth().toDestination();
    const synthB = new $tone.AMSynth().toDestination();
    //play a note every quarter-note
    const loopA = new $tone.Loop((time) => {
        synthA.triggerAttackRelease("C2", "8n", time);
        synthB.triggerAttackRelease("C4", "8n", time + 0.5);
    }, "2n").start(0);
    //play another note every off quarter-note, by starting it "8n"
    // const loopB = new $tone.Loop((time) => {
    // 	synthB.triggerAttackRelease("C4", "8n", time);
    // }, "4n").start(0);
    // all loops start when the Transport is started
    $tone.getTransport().start();
    // ramp up to 800 bpm over 10 seconds
    $tone.getTransport().bpm.rampTo(800, 10);
}
</script>

<template>
    <v-container fluid>
        <v-row>
            <h1>Using Tone.js in Nuxt 3 with Plugin</h1>
        </v-row>
        <v-row>
            <button @click="playSound">Play Sound</button>
        </v-row>
        <v-row>
            <Keyboard style="overflow: visible;" />
        </v-row>
    </v-container>
</template>
