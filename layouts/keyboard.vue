<template>
    <v-app-bar class="icon-title" elevation="3" color="white" height="40">
        <Header />
    </v-app-bar>
    <v-main>
        <slot />
    </v-main>
</template>

<style lang="css" scoped>
.icon-title {
    font-size: 20px;
}
</style>