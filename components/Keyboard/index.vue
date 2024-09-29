<script setup lang="ts">

const keyOffset = 2
const blackKeyIndex = [1, 2, 4, 5, 6]
const barColors = ["bg-red", "bg-pink", "bg-teal", "bg-purple", "bg-blue", "bg-green", "bg-orange", "bg-indigo", "bg-cyan"]
const barNames = ["Sc", "Contra Octave(C1 - B1)", "Great Octave(C2 - B2)", "Small Octave(C3 - B3)", "--------- One-line Octave ---------", "Two-line Octave(C5 - B5)", "Three-line Octave(C6 - B6)", "Four-line Octave(C7 - B7)", "Fl"]

function generateNumbers(start: number, end: number): number[] {
    if (start > end) return [];
    return [start, ...generateNumbers(start + 1, end)];
}

var keys: NodeListOf<HTMLDivElement>
var whiteKeys: HTMLElement[]
var blackSharpKeys: HTMLElement[]
var blackFlapKeys: HTMLElement[]

var mousePressed = false

onMounted(() => {
    nextTick(() => {
        keys = document.querySelectorAll('div')
        whiteKeys = Array.from(keys).filter( div => /^\d{1,2}$/.test(div.id) )
        blackSharpKeys = Array.from(keys).filter( div => /^1\d{2}$/.test(div.id) )
        blackFlapKeys = Array.from(keys).filter( div => /^2\d{2}$/.test(div.id) )
        for (const key of [...whiteKeys, ...blackSharpKeys, ...blackFlapKeys]) {
            key.addEventListener('mouseenter', mouseEnter)
            key.addEventListener('mouseleave', mouseLeave)
            key.addEventListener('mousedown', mouseDown)
            key.addEventListener('mouseup', mouseUp)
        }
    })
})

const pressKey = (e: MouseEvent) => {
    const k = e.target as HTMLElement
    if (mousePressed && k.getAttribute("pressed") === null) {
        k.setAttribute("pressed", "t")
        attack(e)
        // console.log(`mouse pressed: ${k.id}`)
    }
}

const releaseKey = (e: MouseEvent) => {
    const k = e.target as HTMLElement
    if (k.getAttribute("pressed")) {
        k.removeAttribute("pressed")
        release(e)
        // console.log(`mouse released: ${k.id}`)
    }
}

const mouseEnter = (e: MouseEvent) => {
    const k = e.target as HTMLElement
    pressKey(e)
    // console.log(`mouse enter: ${k.id}`)
}

const mouseLeave = (e: MouseEvent) => {
    const k = e.target as HTMLElement
    releaseKey(e)
    // console.log(`mouse leave: ${k.id}`)
}

const mouseDown = (e: MouseEvent) => {
    const k = e.target as HTMLElement
    mousePressed = true
    pressKey(e)
    // console.log(`mouse down: ${k.id}`)
}

const mouseUp = (e: MouseEvent) => {
    const k = e.target as HTMLElement
    mousePressed = false
    releaseKey(e)
    // console.log(`mouse up: ${k.id}`)
}

const attack = (e?: MouseEvent, note?: string) => {
    if (e) {
        const dom = e.target as HTMLElement
        if (dom.classList.contains("key-black-field-left-pressed")) return
        if (dom.id.length === 3) {
            // black keys
            if (dom.id.startsWith("1")) dom.classList.add("key-black-field-left-pressed") // #
            else dom.classList.add("key-black-field-right-pressed") // b
        } else dom.classList.add("key-white-field-pressed") // white keys
    } else if (note) {

    }
}

const release = (e?: MouseEvent, note?: string) => {
    if (e) {
        const dom = e.target as HTMLElement
        if (dom.id.length === 3) {
            // black keys
            if (dom.id.startsWith("1")) dom.classList.remove("key-black-field-left-pressed") // #
            else dom.classList.remove("key-black-field-right-pressed") // b
        } else dom.classList.remove("key-white-field-pressed") // white keys
    } else if (note) {

    }
}

</script>

<template>
    <ClientOnly>
        <v-container id="border" fluid class="border bg-black px-8 py-8">
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
                                <div :id="i.toString()"
                                    class="key-white-field fill-height" />
                            </td>
                        </tr>
                        <tr class="black-keys">
                            <td class="black-key pa-0" align="center" v-for="i in generateNumbers(1, 51)">
                                <v-row class="fill-height pa-0 ma-0"
                                    v-if="blackKeyIndex.includes((i + (7 - keyOffset)) % 7)" no-gutters>
                                    <v-col class="pa-0 ma-0">
                                        <div :id="(i + 100).toString()"
                                            class="key-black-field-left fill-height" />
                                    </v-col>
                                    <v-col class="pa-0 ma-0">
                                        <div :id="(i + 200).toString()"
                                            class="key-black-field-right fill-height" />
                                    </v-col>
                                </v-row>
                            </td>
                        </tr>
                    </tbody>
                </v-row>
            </v-container>
        </v-container>
    </ClientOnly>
</template>

<style lang="css" scoped>
.border {
    --key-width: 60px;
    --key-gap: 4px;
    --white-key-height: 300px;
    --white-key-width: calc(var(--key-width) * 1 - var(--key-gap));
    --black-key-width: calc(var(--key-width) * 0.40 - var(--key-gap));
    --black-key-height: calc(var(--white-key-height) * 0.6);
    border-radius: 20px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 1);
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

.scrollview {
    overflow-x: scroll !important;
    overflow-y: hidden !important;
    scrollbar-width: none;
    border-radius: 10px;
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
    left: calc(var(--key-width) / 2);
    background-color: rgba(0, 0, 0, 0);
}

.black-key {
    height: var(--black-key-height) !important;
    max-width: var(--key-width);
    min-width: var(--key-width);
    z-index: 1;
    overflow: hidden;
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
    background-color: gray;
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
</style>