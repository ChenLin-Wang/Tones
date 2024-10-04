<script setup lang="ts">
const envelop = defineModel<{ attack: number, decay: number, sustain: number, release: number }>()
</script>

<template>
    <v-container fluid class="px-6" style="overflow: scroll;">
        <v-row no-gutters>
            <h2>ADSR Envelope</h2>
        </v-row>
        <v-row class="mt-2" no-gutters>
            <v-col class="my-3" cols="12">
                <v-slider append-icon="mdi-knob" v-model="/* @ts-ignore */envelop.attack" :label="'Attack ' + envelop.attack" max="5"
                    min="0.01" step="0.1" hide-details thumb-label></v-slider>
            </v-col>
            <v-col class="my-3" cols="12">
                <v-slider append-icon="mdi-knob" v-model="/* @ts-ignore */envelop.decay" :label="'Decay ' + envelop.decay" max="5"
                    min="0.1" step="0.1" hide-details thumb-label></v-slider>
            </v-col>
            <v-col class="my-3" cols="12">
                <v-slider append-icon="mdi-knob" v-model="/* @ts-ignore */envelop.sustain" :label="'Sustain ' + envelop.sustain" max="1"
                    min="0" step="0.01" hide-details thumb-label></v-slider>
            </v-col>
            <v-col class="my-3" cols="12">
                <v-slider append-icon="mdi-knob" v-model="/* @ts-ignore */envelop.release" :label="'Release ' + envelop.release" max="5"
                    min="0.05" step="0.1" hide-details thumb-label></v-slider>
            </v-col>
            <v-col cols="12">
                <v-divider />
            </v-col>
            <v-col cols="12" class="ma-3">
                <p><strong>ADSR envelope</strong> (Attack, Decay, Sustain, Release) is used to describe the <em>volume
                        change</em> of a sound produced by an instrument. <strong class="text-red">Currently, the website only supports
                    adjustments for Attack and Release, and does not support the others yet.</strong></p>
                <ul class="ma-3">
                    <li><strong>Attack:</strong> This is the time it takes for the sound to go from silence to its peak
                        volume. A short attack time (typically between <strong>0.01</strong> and <strong>2</strong>
                        seconds) results in the sound quickly reaching its maximum volume, while a longer attack time
                        causes a gradual buildup.</li>
                    <li><strong>Decay:</strong> This is the time it takes for the sound to drop from the peak volume to
                        the sustain level. A short decay time (between <strong>0.1</strong> and <strong>3</strong>
                        seconds) makes the sound quickly settle, while a longer decay time causes a smoother transition
                        to the sustain phase.</li>
                    <li><strong>Sustain:</strong> This refers to the volume level that the sound maintains during the
                        sustain phase. The sound remains at this volume until the release phase starts. <em>Sustain is
                            not a time duration</em>, but rather the level at which the sound is held (typically between
                        <strong>0</strong> and <strong>1</strong>, as a percentage of the peak volume).
                    </li>
                    <li><strong>Release:</strong> This is the time it takes for the sound to fade from the sustain level
                        back to silence. The release time (ranging from <strong>0.05</strong> to <strong>5</strong>
                        seconds) determines how quickly the sound disappears after the key is released; a longer release
                        time results in a gradual fade-out, while a shorter release makes the sound stop more abruptly.
                    </li>
                </ul>

                <p>
                    <strong>ADSR 包络</strong> (Attack, Decay, Sustain, Release)
                    用来描述乐器发出声音的<em>音量变化</em>，能够精确控制声音的起伏与持续，从而塑造声音的特性，广泛用于合成器、采样器等音频设备。
                    <strong class="text-red">目前，该网站仅支持 Attack 和 Release 调整，暂不支持其它。</strong>
                </p>
                <ul class="ma-3">
                    <li><strong>Attack（起音）：</strong> 这是声音从静音到达最大音量的时间。起音时间较短时（通常在 <strong>0.01</strong> 到
                        <strong>2</strong> 秒之间），声音会迅速达到最大音量，而较长的起音时间则会使声音逐渐增强。
                    </li>
                    <li><strong>Decay（衰减）：</strong> 这是声音从最大音量衰减到持续阶段音量的时间。衰减时间较短（通常为 <strong>0.1</strong> 到
                        <strong>3</strong> 秒），声音会迅速进入持续阶段，而较长的衰减时间则会使声音更缓慢地进入稳定状态。
                    </li>
                    <li><strong>Sustain（维持）：</strong> 这是声音在保持阶段的音量水平。在该阶段，声音的音量将保持不变，直到释放阶段开始。<em>Sustain
                            不代表时间</em>，而是表示音量的固定水平（通常为 <strong>0</strong> 到 <strong>1</strong>，代表最大音量的百分比）。</li>
                    <li><strong>Release（释放）：</strong> 这是声音从维持阶段音量减弱到静音的时间。释放时间决定了声音在停止按键后消失的速度，释放时间范围为
                        <strong>0.05</strong> 到 <strong>5</strong> 秒，较长的释放时间意味着声音会渐渐消失，而较短的释放时间则使声音迅速消失。
                    </li>
                </ul>
            </v-col>
        </v-row>
    </v-container>
</template>