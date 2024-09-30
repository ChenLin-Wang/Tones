<script setup lang="ts">
const scrollIndex = ref({i: 3, d: true})

const previousBar = () => {
    const v = Math.floor(scrollIndex.value.i)
    scrollIndex.value = {i: v - 1 < 0 ? 0 : v - 1, d: true}
}

const nextBar = () => {
    const v = Math.floor(scrollIndex.value.i)
    scrollIndex.value = {i: v + 1 > 7 ? 7 : v + 1, d: true}
}
</script>

<template>
    <v-container fluid class="border pa-5 bg-black">
        <v-row no-gutters>
            <v-col class="ma-0" style="width: 40px;">
                <v-btn @click="previousBar" class="fill-height pa-0 ma-0" style="min-width: 100%; max-width: 100%;">
                    <v-icon style="font-size: 30px;">mdi-chevron-left</v-icon>
                </v-btn>
            </v-col>
            <v-col class="px-1 ma-0" style="width: calc(100% - 80px);">
                <KeyboardKeys v-model:scroll-index="scrollIndex" />
            </v-col>
            <v-col class="ma-0" style="width: 40px;">
                <v-btn @click="nextBar" class="fill-height" style="min-width: 100%; max-width: 100%;">
                    <v-icon style="font-size: 30px;">mdi-chevron-right</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="css" scoped>
.border {
    border-radius: 20px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 1);
}
</style>