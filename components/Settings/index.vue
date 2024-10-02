<script setup lang="ts">
import { type Inotonation } from "~/shared/inotonation";
import type { Samples } from "~/shared/samples";
const emit = defineEmits<{ (e: "instrumentChange", instrument: keyof typeof Samples): void }>()
const envelop = defineModel<{ attack: number, release: number }>("envelop")
const inotonation = defineModel<{
    key: string,
    mode: 'Major' | 'Minor',
    inot: keyof Inotonation
}>("inotonation")
</script>

<template>
    <v-container fluid class="px-0 ma-0 pt-0 pb-4" style="height: 100%;">
        <v-row no-gutters style="height: 100%;">
            <v-col cols="6" class="pr-2" style="height: 100%;">
                <v-row no-gutters style="height: 100%;">
                    <v-card class="card-1" elevation="4">
                        <SettingsInstruments @instrument-change="name => emit('instrumentChange', name)" class="ma-0 pa-3" style="min-height: 100%; max-height: 100%;"/>
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols="6" class="pl-2" style="height: 100%;">
                <v-row class="pb-2" no-gutters style="width: 100%; height: 50%">
                    <v-card class="card-2" elevation="4">
                        <SettingsIontonation class="ma-0 pa-3" v-model="inotonation" style="height: 100%;"/>
                    </v-card>
                </v-row>
                <v-row class="pt-2" no-gutters style="width: 100%; height: 50%">
                    <v-card class="card-3" elevation="4">
                        <SettingsEnvelop class="ma-0 pa-3" v-model="envelop" style="height: 100%;"/>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="css" scoped>

.card-1 {
    width: 100%;
    height: 100%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

.card-2 {
    width: 100%;
    height: 100%;
    border-top-right-radius: 20px;
}

.card-3 {
    width: 100%;
    height: 100%;
    border-bottom-right-radius: 20px;
}

</style>