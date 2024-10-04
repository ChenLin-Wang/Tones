<script setup lang="ts">
import { Fonts } from '~/shared/fonts';
const setCSSVariables = () => document.documentElement.style.setProperty('--brand-title', Fonts.BrandTitle)
onMounted(setCSSVariables)
const jumpToPlay = () => {
    useRouter().push("/play")
}
useHead({ title: 'Tones' })
</script>

<template>
    <v-container class="ma-0 pa-0" fluid style="height: 100vh;">
        <v-row class="pa-0 ma-0" style="height: calc(100% - 340px);" no-gutters>
            <v-col cols="text-center ma-0 pa-0">
                <v-card class="bg-white text-center mx-10 mt-10 mb-0 pa-5" elevation="12"
                    style="border-radius: 30px; height: calc(100% - 80px);">
                    <v-row class="fill-height" align="center" justify="center" no-gutters>
                        <v-col class="mr-10" cols="auto">
                            <v-img :width="300" src="/favicon.png"></v-img>
                        </v-col>
                        <v-col cols="auto">
                            <h1 class="title">Tones</h1>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="pa-0 ma-0" style="height: 300px;" no-gutters>
            <v-col cols="text-center ma-0 pa-0">
                <v-card class="bg-white mx-10 mt-0 mb-10 pa-0" elevation="12"
                    style="border-radius: 30px; height: calc(100% - 80px);">
                    <v-btn @click="jumpToPlay" class="bg-white text-center ma-0 pa-5"
                        style="width: 100%; height: 100%;">
                        <v-row class="fill-height" align="center" justify="center" no-gutters>
                            <v-col cols="auto">
                                <h1 class="button-title">Play</h1>
                            </v-col>
                        </v-row>
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="css" scoped>
.title {
    font-family: var(--brand-title);
    font-size: 120px;
    font-weight: 400;
}

.button-title {
    font-family: var(--brand-title);
    font-size: 80px;
    font-weight: 400;
}
</style>