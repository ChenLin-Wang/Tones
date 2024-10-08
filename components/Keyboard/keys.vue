<script setup lang="ts">

const scrollIndex = defineModel<{ i: number, d: boolean }>("scrollIndex")

const keyOffset = 2
const blackKeyIndex = [0, 2, 3, 5, 6]
const barColors = ["bg-red", "bg-pink", "bg-teal", "bg-purple", "bg-blue", "bg-green", "bg-orange", "bg-indigo", "bg-cyan"]
const barNames = ["Sc", "Contra Octave(C1 - B1)", "Great Octave(C2 - B2)", "Small Octave(C3 - B3)", "--------- One-line Octave ---------", "Two-line Octave(C5 - B5)", "Three-line Octave(C6 - B6)", "Four-line Octave(C7 - B7)", "Fl"]
const whiteShortKeys = " 2345ASDFGHJKL;'67890"
const blackLeftShortKeys = "     qw rt uio [] "
const blackRightShortKeys = "      z cv nm, / "
const scrollOffset = 0
const keyWidth = 50
const emit = defineEmits<{
    (e: 'attack', note: string): void;
    (e: 'release', note: string): void;
}>()

function generateNumbers(start: number, end: number): number[] {
    if (start > end) return [];
    return [start, ...generateNumbers(start + 1, end)];
}

var whiteKeys: HTMLElement[]
var blackSharpKeys: HTMLElement[]
var blackFlapKeys: HTMLElement[]
var scrollView: HTMLElement
var whiteLabels: HTMLElement[]
var blackLeftLabels: HTMLElement[]
var blackRightLabels: HTMLElement[]

var mousePressed = false

var keyPressed: string[] = []

watch(scrollIndex, i => {
    if (i?.d) { scrollAdjust() }
})

onMounted(() => {
    nextTick(() => {
        whiteKeys = Array.from(document.querySelectorAll('.key-white-field'));
        blackSharpKeys = Array.from(document.querySelectorAll('.key-black-field-left'));
        blackFlapKeys = Array.from(document.querySelectorAll('.key-black-field-right'));
        whiteLabels = Array.from(document.querySelectorAll('.shortcut-label'));
        blackLeftLabels = Array.from(document.querySelectorAll('.shortcut-label-black-left'));
        blackRightLabels = Array.from(document.querySelectorAll('.shortcut-label-black-right'));
        scrollView = document.querySelectorAll('.scrollview')[0] as HTMLElement;
        scrollAdjust()
        for (const key of [...whiteKeys, ...blackSharpKeys, ...blackFlapKeys]) {
            key.addEventListener('mouseenter', mouseEnter, true)
            key.addEventListener('mouseleave', mouseLeave, true)
            key.addEventListener('mousedown', mouseDown, true)
            key.addEventListener('mouseup', mouseUp, true)
        }
        scrollView.addEventListener('scroll', () => scrollAdjust(false))
    })
})

const scrollAdjust = (live: boolean = true) => {
    var update = false
    if (live) {
        scrollView.scrollLeft = ((scrollIndex.value?.i ?? 4) * 7 + scrollOffset) * keyWidth
        update = true
    } else {
        if (scrollIndex.value && scrollIndex.value?.i !== (Math.round((scrollView.scrollLeft / keyWidth - scrollOffset) / 7))) {
            scrollIndex.value.i = Math.round((scrollView.scrollLeft / keyWidth - scrollOffset) / 7)
            scrollIndex.value.d = false
            update = true
        }
    }

    if (update) {
        const ks = keyPressed
        for (const k of ks) keyUp(k)
        labelUpdate()
        for (const k of ks) keyDown(k)
    }
}

const keyDown = (k: string) => {
    for (const l of [...whiteLabels, ...blackLeftLabels, ...blackRightLabels]) {
        if (l.textContent?.toLowerCase() === k.toLowerCase() && !keyPressed.includes(k.toLowerCase())) {
            attack(undefined, l.id)
            keyPressed.push(k.toLowerCase())
        }
    }
}

const keyUp = (k: string) => {
    for (const l of [...whiteLabels, ...blackLeftLabels, ...blackRightLabels]) {
        if (l.textContent?.toLowerCase() === k.toLowerCase()) {
            release(undefined, l.id)
            keyPressed = keyPressed.filter(s => s !== k.toLowerCase())
        }
    }
}

const attack = (e?: HTMLElement, note?: string) => {
    var dom = e
    if (!dom) {
        const n = note as string
        dom = (n.length < 3 ? whiteKeys : n.startsWith("1") ? blackSharpKeys : blackFlapKeys).filter(key => key.id === note)[0]
    }
    if (dom.classList.contains("key-black-field-left-pressed")) return
    if (dom.id.length === 3) {
        // black keys
        if (dom.id.startsWith("1")) dom.classList.add("key-black-field-left-pressed") // #
        else dom.classList.add("key-black-field-right-pressed") // b
    } else dom.classList.add("key-white-field-pressed") // white keys
    emit('attack', dom.id)
}

const release = (e?: HTMLElement, note?: string) => {
    var dom = e
    if (!dom) {
        const n = note as string
        dom = (n.length < 3 ? whiteKeys : n.startsWith("1") ? blackSharpKeys : blackFlapKeys).filter(key => key.id === note)[0]
    }
    if (dom.id.length === 3) {
        // black keys
        if (dom.id.startsWith("1")) dom.classList.remove("key-black-field-left-pressed") // #
        else dom.classList.remove("key-black-field-right-pressed") // b
    } else dom.classList.remove("key-white-field-pressed") // white keys
    emit('release', dom.id)
}

defineExpose({ keyDown, keyUp, attack, release })

const labelUpdate = () => {
    var startI = (scrollIndex.value?.i ?? 3) * 7 - 4
    for (const wl of whiteLabels) {
        const i = parseInt(wl.id) - startI
        if (i >= 0 && whiteShortKeys[i] !== "") {
            wl.textContent = whiteShortKeys[i]
        } else {
            wl.textContent = ""
        }
    }
    for (const bll of blackLeftLabels) {
        const i = parseInt(bll.id) - 100 - startI
        bll.textContent = i >= 0 ? blackLeftShortKeys[i] : ""
    }
    for (const brl of blackRightLabels) {
        const i = parseInt(brl.id) - 200 - startI
        brl.textContent = i >= 0 ? blackRightShortKeys[i] : ""
    }
}

const pressKey = (e: MouseEvent) => {
    const k = e.currentTarget as HTMLElement
    if (mousePressed && k.getAttribute("pressed") === null) {
        k.setAttribute("pressed", "t")
        attack(k)
    }
}

const releaseKey = (e: MouseEvent) => {
    const k = e.currentTarget as HTMLElement
    if (k.getAttribute("pressed")) {
        k.removeAttribute("pressed")
        release(k)
    }
}

const mouseEnter = (e: MouseEvent) => {
    const k = e.currentTarget as HTMLElement
    pressKey(e)
}

const mouseLeave = (e: MouseEvent) => {
    const k = e.currentTarget as HTMLElement
    releaseKey(e)
}

const mouseDown = (e: MouseEvent) => {
    const k = e.currentTarget as HTMLElement
    mousePressed = true
    pressKey(e)
}

const mouseUp = (e: MouseEvent) => {
    const k = e.currentTarget as HTMLElement
    mousePressed = false
    releaseKey(e)
}

</script>

<template>
    <ClientOnly>
        <v-container fluid class="scrollview ma-0 pa-0">
            <v-row no-gutters>
                <tbody>
                    <tr>
                        <td class="pa-0" align="center" v-for="i in generateNumbers(0, 8)">
                            <div
                                :class="(i === 0 ? 'section-bar-start ' : i === 8 ? 'section-bar-end ' : 'section-bar ') + 'fill-height ' + barColors[i]">
                                <v-row align="center" class="fill-height" no-gutters>
                                    <v-col>
                                        <p class="bar-name">{{ barNames[i] }}</p>
                                    </v-col>
                                </v-row>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-row>
            <v-row fluid class="keyboard pa-0 ma-0">
                <tbody>
                    <tr class="white-keys">
                        <td class="white-key pa-0" v-for="i in generateNumbers(1, 52)">
                            <div :id="i.toString()" class="key-white-field text-black fill-height">
                                <v-row class="fill-height pb-3" no-gutters align="end">
                                    <v-col align="center">
                                        <p :id="(i).toString()"
                                            :class="`pa-0 shortcut-label text-center ${barColors[Math.floor((i + (6 - keyOffset)) / 7)]}`">
                                            a</p>
                                    </v-col>
                                </v-row>
                            </div>
                        </td>
                    </tr>
                    <tr class="black-keys">
                        <td class="black-key pa-0" align="center" v-for="i in generateNumbers(1, 51)">
                            <v-row class="fill-height pa-0 ma-0"
                                v-if="blackKeyIndex.includes((i + (7 - keyOffset)) % 7) && i > 1" no-gutters>
                                <v-col class="pa-0 ma-0">
                                    <div :id="(i + 100).toString()" class="key-black-field-left fill-height">
                                        <v-row class="fill-height pb-3" no-gutters align="end">
                                            <v-col align="center">
                                                <p :id="(i + 100).toString()"
                                                    :class="`pa-0 shortcut-label-black-left text-center ${barColors[Math.floor((i + (6 - keyOffset)) / 7)]}`">
                                                    a</p>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-col>
                                <v-col class="pa-0 ma-0">
                                    <div :id="(i + 200).toString()" class="key-black-field-right fill-height">
                                        <v-row class="fill-height pb-3" no-gutters align="end">
                                            <v-col align="center">
                                                <p :id="(i + 200).toString()"
                                                    :class="`pa-0 shortcut-label-black-right text-center ${barColors[Math.floor((i + (6 - keyOffset)) / 7)]}`">
                                                    a</p>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-col>
                            </v-row>
                        </td>
                    </tr>
                </tbody>
            </v-row>
        </v-container>
    </ClientOnly>
</template>

<style lang="css" scoped>
.scrollview {
    position: sticky;
    --key-width: 50px;
    --key-gap: 2px;
    --white-key-height: 220px;
    --white-key-width: calc(var(--key-width) * 1 - var(--key-gap));
    --black-key-width: calc(var(--key-width) * 0.4 - var(--key-gap));
    --black-key-height: calc(var(--white-key-height) * 0.6);
    --key-label-width: calc(var(--key-width) / 2);
    overflow-x: scroll !important;
    overflow-y: hidden !important;
    scrollbar-width: none;
    border-radius: 10px;
}

.bar-name {
    font-weight: 500;
    font-family: var(--brand-title);
}

.keyboard {
    position: relative;
}

.section-bar {
    margin-left: calc(var(--key-gap) / 2);
    margin-right: calc(var(--key-gap) / 2);
    width: calc(var(--key-width) * 7 - var(--key-gap));
    height: 30px !important;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

.section-bar-start {
    margin-left: calc(var(--key-gap) / 2);
    margin-right: calc(var(--key-gap) / 2);
    width: calc(var(--key-width) * 2 - var(--key-gap));
    height: 30px !important;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

.section-bar-end {
    margin-left: calc(var(--key-gap) / 2);
    margin-right: calc(var(--key-gap) / 2);
    width: calc(var(--key-width) * 1 - var(--key-gap));
    height: 30px !important;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

.white-keys {
    background-color: rgba(0, 0, 0, 0);
}

.white-key {
    height: var(--white-key-height) !important;
    max-width: var(--key-width);
    min-width: var(--key-width);
    overflow: hidden;
}

.black-keys {
    position: absolute;
    top: 0;
    left: calc(0px - var(--key-width) / 2);
    background-color: rgba(0, 0, 0, 0);
}

.black-key {
    height: var(--black-key-height) !important;
    max-width: var(--key-width);
    min-width: var(--key-width);
    z-index: 1;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.key-white-field {
    margin-left: calc(var(--key-gap) / 2);
    margin-right: calc(var(--key-gap) / 2);
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    width: var(--white-key-width);
    background-color: white;
}

.key-white-field-pressed {
    margin-left: calc(var(--key-gap) / 2);
    margin-right: calc(var(--key-gap) / 2);
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    width: var(--white-key-width);
    background-color: cyan;
}

.key-black-field-left {
    position: relative;
    left: calc((var(--key-width) / 2 - var(--black-key-width)) / 2);
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 10px;
    background-color: black;
    width: var(--black-key-width);
}

.key-black-field-right {
    position: relative;
    left: calc(0px - (var(--key-width) / 2 - var(--black-key-width)) / 2);
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 0px;
    background-color: black;
    width: var(--black-key-width);
}

.key-black-field-left-pressed {
    position: relative;
    left: calc((var(--key-width) / 2 - var(--black-key-width)) / 2);
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 10px;
    background-color: orange;
    width: var(--black-key-width);
}

.key-black-field-right-pressed {
    position: relative;
    left: calc(0px - (var(--key-width) / 2 - var(--black-key-width)) / 2);
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 0px;
    background-color: purple;
    width: var(--black-key-width);
}

.shortcut-label {
    border-radius: 10px;
    width: var(--key-label-width);
    font-family: var(--brand-title);
    user-select: none;
    /* Standard syntax */
    -webkit-user-select: none;
    /* Safari */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
}

.shortcut-label-black-left {
    border-top-right-radius: 0px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 10px;
    width: calc(var(--black-key-width) - var(--key-gap));
    font-family: var(--brand-title);
    user-select: none;
    margin-left: var(--key-gap);
    /* Standard syntax */
    -webkit-user-select: none;
    /* Safari */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
}

.shortcut-label-black-right {
    border-top-right-radius: 10px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 0px;
    width: calc(var(--black-key-width) - var(--key-gap));
    font-family: var(--brand-title);
    user-select: none;
    margin-right: var(--key-gap);
    /* Standard syntax */
    -webkit-user-select: none;
    /* Safari */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
}
</style>