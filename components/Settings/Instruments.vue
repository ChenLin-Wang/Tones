<script setup lang="ts">
import { Samples } from "../../shared/samples";
const emit = defineEmits<{ (e: "instrumentChange", instrument: keyof typeof Samples): void }>()
</script>

<template>
    <v-container fluid style="overflow: scroll; ">
        <v-row no-gutters>
            <h2 class="px-3">Instruments</h2>
        </v-row>
        <v-row no-gutters>
            <v-list class="ma-0 pa-0"  density="comfortable" style="width: 100%;">
                <v-list-item @click="emit('instrumentChange', item as keyof typeof Samples)" rounded="shaped" v-for="item in Object.keys(Samples).slice().sort()" style="width: 100%;" :value="item">
                    <v-list-item-title v-text="item"/>
                </v-list-item>
            </v-list>
        </v-row>
    </v-container>

</template>