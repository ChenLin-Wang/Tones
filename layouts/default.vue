<template>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-app-bar class="icon-title" elevation="6" color="white" height="80">
            <Header />
        </v-app-bar>
        <v-main>
            <slot />
        </v-main>
    </v-parallax>
</template>

<style lang="css" scoped>

.icon-title {
    font-size: 30px;
}

.bgimage {
    background-color: #ffffff;
    /* opacity: 0.9; */
    background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #ffffff 30px ), repeating-linear-gradient( #0069ff55, #006affb4 );
}

</style>