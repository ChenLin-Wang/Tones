<template>
    <v-app-bar color="black" :elevation="0">
        <Header />
    </v-app-bar>
    <v-main>
        <v-parallax class="grow contents" src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
            <slot />
        </v-parallax>
    </v-main>
</template>