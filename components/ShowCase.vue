<script setup lang="ts">
import { isSemiTone } from '~/shared/inotonation';

const props = defineProps<{
    freqs: {note: string, freq: number}[],
    halfToneRelations: {note: string, based?: string, r: string[]}[]
}>()

</script>

<template>
    <v-container fluid class="px-0 ma-0 pt-0 pb-4" style="height: 100%; width: 100%;">
        <v-row no-gutters style="height: 100%; width: 100%;">
            <v-card class="card-1 bg-black" elevation="4" style="height: 100%; width: 100%; border-radius: 20px;">
                <v-container class="py-2" style="height: 100%;" fluid align="center" justfiy="center">
                    <v-row no-gutters style="height:50%">
                        <h4>Frequencies:&nbsp;&nbsp;</h4>
                        <v-chip v-for="frq in freqs.slice().sort((a, b) => a.note.localeCompare(b.note) )" :color="isSemiTone(frq.note) ? 'orange' : 'green'" style="height: 24px;">
                            {{ frq.note + ": " + frq.freq }}
                        </v-chip>
                        <v-chip v-if="freqs.length === 0" color="red"style="height: 24px;">No Tones</v-chip>
                    </v-row>
                    <v-row no-gutters style="height:50%">
                        <h4>Semi-Tones:&nbsp;&nbsp;</h4>
                        <v-chip v-for="rels in halfToneRelations" :color="rels.based ? 'blue' : 'red'" style="height: 24px;">
                            {{ rels.note + (rels.based ? " --< " + rels.based : "") + ": " + rels.r.join(", ") }}
                        </v-chip>
                        <v-chip v-if="halfToneRelations.length === 0" color="red"style="height: 24px;">No Semi-Tones</v-chip>
                    </v-row>
                </v-container>
            </v-card>
        </v-row>
    </v-container>
</template>