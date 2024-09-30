<script setup lang="ts">
const scrollIndex = ref({i: 3, d: true})

var border: HTMLElement
const keyboard = ref(null)

const emit = defineEmits<{
    (e: 'attack', note: string): void;
    (e: 'release', note: string): void;
}>()

onMounted(() => {
    nextTick(() => {
        border = document.querySelectorAll('.border')[0] as HTMLElement;
        console.log(keyboard.value)
        border.addEventListener('keydown', keyDown)
        border.addEventListener('keyup', keyUp)
    })
})

const previousBar = () => {
    const v = Math.floor(scrollIndex.value.i)
    scrollIndex.value = {i: v - 1 < 0 ? 0 : v - 1, d: true}
}

const nextBar = () => {
    const v = Math.floor(scrollIndex.value.i)
    scrollIndex.value = {i: v + 1 > 7 ? 7 : v + 1, d: true}
}

const keyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") previousBar()
    else if (e.key === "ArrowRight") nextBar()
    else (keyboard.value as any).keyDown(e.key)
}

const keyUp = (e: KeyboardEvent) => {
    (keyboard.value as any).keyUp(e.key)
}

defineExpose(() => {
    (keyboard.value as any).attack,
    (keyboard.value as any).release
})

</script>

<template>
    <ClientOnly>
    <v-container fluid tabindex="1" class="border pa-5 bg-black">
        <v-row no-gutters>
            <v-col class="ma-0" style="width: 40px;">
                <v-btn @click="previousBar" class="fill-height pa-0 ma-0" style="min-width: 100%; max-width: 100%;">
                    <v-icon style="font-size: 30px;">mdi-chevron-left</v-icon>
                </v-btn>
            </v-col>
            <v-col class="px-1 ma-0" style="width: calc(100% - 80px);">
                <KeyboardKeys @attack="(note: string) => { emit('attack', note) }" @release="(note: string) => { emit('release', note) }" ref="keyboard" v-model:scroll-index="scrollIndex" />
            </v-col>
            <v-col class="ma-0" style="width: 40px;">
                <v-btn @click="nextBar" class="fill-height" style="min-width: 100%; max-width: 100%;">
                    <v-icon style="font-size: 30px;">mdi-chevron-right</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</ClientOnly>
</template>

<style lang="css" scoped>
.border {
    border-radius: 20px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 1);
}
</style>