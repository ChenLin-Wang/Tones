<script setup lang="ts">
import { allKeys, inotonations, type Inotonation, Key } from "~/shared/inotonation";
export type InotonationParas = {
    key: string,
    mode: 'Major' | 'Minor',
    inot: keyof Inotonation
}
const inotonation = defineModel<InotonationParas>()
</script>

<template>
    <v-container fluid class="px-6" style="overflow: scroll;">
        <v-row no-gutters>
            <h2>Iontonation</h2>
        </v-row>
        <v-row class="mt-3" no-gutters>
            <v-col cols="6" class="pr-2">
                <v-select variant="outlined" density="comfortable" label="Key" v-model="inotonation.key" :items="allKeys.slice().sort()">
                </v-select>
            </v-col>
            <v-col cols="6" class="pl-2">
                <v-select variant="outlined" density="comfortable" label="Mode" v-model="inotonation.mode" :items="['Major', 'Minor']">
                </v-select>
            </v-col>
            <v-col cols="12">
                <v-select variant="outlined" density="comfortable" label="Iontonation" v-model="inotonation.inot" :items="inotonations">
                </v-select>
            </v-col>
        </v-row>
    </v-container>
</template>