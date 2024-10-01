<script setup lang="ts">
import { allKeys, inotonations } from "~/shared/inotonation";
</script>

<template>
    <v-container fluid class="px-6" style="overflow: scroll;">
        <v-row no-gutters>
            <h2>Iontonation</h2>
        </v-row>
        <v-row class="mt-3" no-gutters>
            <v-col cols="6">
                <v-select variant="outlined" density="comfortable" label="Key" :items="allKeys.sort()">
                </v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="5">
                <v-select variant="outlined" density="comfortable" label="Mode" :items="['Major', 'Minor']">
                </v-select>
            </v-col>
            <v-col cols="12">
                <v-select variant="outlined" density="comfortable" label="Iontonation" :items="inotonations.sort()">
                </v-select>
            </v-col>
        </v-row>
    </v-container>
</template>