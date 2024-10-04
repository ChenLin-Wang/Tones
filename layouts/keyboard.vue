<template>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-app-bar class="icon-title" elevation="3" color="white" height="40">
            <Header />
        </v-app-bar>
        <v-main>
            <slot />
        </v-main>
    </v-parallax>
</template>

<style lang="css" scoped>
.icon-title {
    font-size: 20px;
}
</style>