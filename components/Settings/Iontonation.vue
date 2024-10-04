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
                <v-select variant="outlined" density="comfortable" label="Key" v-model="/* @ts-ignore */inotonation.key"
                    :items="allKeys.slice().sort()">
                </v-select>
            </v-col>
            <v-col cols="6" class="pl-2">
                <v-select variant="outlined" density="comfortable" label="Mode"
                    v-model="/* @ts-ignore */inotonation.mode" :items="['Major', 'Minor']">
                </v-select>
            </v-col>
            <v-col cols="12">
                <v-select variant="outlined" density="comfortable" label="Iontonation"
                    v-model="/* @ts-ignore */inotonation.inot" :items="inotonations">
                </v-select>
            </v-col>
            <v-col cols="12">
                <v-divider />
            </v-col>
            <v-col cols="12">
                <p class="ma-3">
                    In <strong>just intonation</strong>, the frequency of each fundamental note is determined based on
                    <em>harmonious intervals</em>, but the frequency of semitones is <strong>not fixed</strong>. The
                    semitone frequencies in just intonation are adjusted <em>on the fly</em> to find the most
                    appropriate interval relationships based on the fundamental note being played. For example, with the
                    interval <strong>1 - ♭3</strong>, the frequency of ♭3 is set according to its <em>minor third
                        interval</em> with 1. Additionally, <strong>transposing</strong> in just intonation is more
                    complex compared to <strong>12-tone equal temperament (12-TET)</strong>, where only the note names
                    need to change. In just intonation, the original interval relationships must be maintained when
                    transposing.
                </p>
                <p class="ma-3">
                    <strong class="text-red">The black display area above the piano keys will show the frequency of the
                        note being played and the optimal interval relationship of the semitone.</strong>
                </p>
                <p class="ma-3">
                    The shortcut keys for transposition are the <strong>Up or Down arrow keys</strong>; to change the
                    tuning system, press <code>"\"</code>; and to switch octaves, use the <code>"`"</code> and
                    <code>"1"</code> keys.
                </p>
                <p class="ma-3">
                    纯律以<strong>和谐音程</strong>为基准来定每个基本音的频率，而<strong>半音频率</strong>却非固定的。所有纯律的半音频率会
                    <em>即时地</em>根据所弹奏的基本音找到最适合的音程关系，比如<strong>
                    1 - ♭3</strong>，则 ♭3 的频率以 1 的<strong>小三度音程</strong>关系设定。另外纯律的<strong>转调</strong>也相比 <strong>12
                    平均律</strong>更为复杂，12 平均律仅需改变音符唱名即可，而纯律转调后需要保持原有的音程关系。
                </p>
                <p class="ma-3">
                    <strong class="text-red">琴键上方的黑色展示区将会展示所弹奏的音频率及半音的最佳音程关系。</strong>
                </p>
                <p class="ma-3">
                    转调的快捷键为 <strong>上 方向键</strong>或<strong>下 方向键</strong>；更改音律的快捷键为 <code>"\"</code>；切换八度区的快捷键为
                    <code>"`"</code> 和 <code>"1"</code>。
                </p>

            </v-col>
        </v-row>
    </v-container>
</template>