<script setup lang="ts">
const envelop = defineModel<{ attack: number, release: number }>()
</script>

<template>
    <v-container fluid class="px-6" style="overflow: scroll;">
        <v-row no-gutters>
            <h2>ADSR Envelop</h2>
        </v-row>
        <v-row class="mt-2" no-gutters>
            <v-col class="my-6" cols="12">
                <v-slider class="pl-2" append-icon="mdi-knob" v-model="envelop.attack" label="Attack" max="20" min="0" step="0.1" hide-details
                    thumb-label></v-slider>
            </v-col>
            <v-col class="my-6" cols="12">
                <v-slider append-icon="mdi-knob" v-model="envelop.release" label="Release" max="20" min="0" step="0.1" hide-details
                    thumb-label></v-slider>
            </v-col>
        </v-row>
    </v-container>
</template>