<script setup lang="ts">
import { Fonts } from '~/shared/fonts';

const setCSSVariables = () => document.documentElement.style.setProperty('--brand-title', Fonts.BrandTitle)
onMounted(setCSSVariables)

</script>

<template>
    <v-container class="ma-0 pa-0" fluid style="height: 100vh;">
        <v-row class="pa-0 ma-0" style="height: 50%;" no-gutters>
            <v-col cols="text-center ma-0 pa-0">
                <v-card class="bg-white text-center ma-10 pa-5" elevation="12" style="border-radius: 30px; height: calc(100% - 80px);">
                    <v-row class="fill-height" align="center" justify="center" no-gutters>
                        <v-col cols="auto">
                            <h1 class="title">Tones</h1>
                        </v-col>
                    </v-row>
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
    cursor: pointer; /* 改变鼠标指针 */
    transition: color 0.3s; /* 添加过渡效果 */
}
.description {
    font-family: var(--brand-title);
    font-size: 40px;
    font-weight: 400;
    cursor: pointer; /* 改变鼠标指针 */
    transition: color 0.3s; /* 添加过渡效果 */
}
</style>