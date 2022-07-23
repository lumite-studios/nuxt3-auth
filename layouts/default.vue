<template>
    <div v-if="!$auth?.loggingIn ?? false">
        <NuxtPage/>
    </div>
    <div v-else>logging in</div>
</template>

<script setup lang="ts">
const { $auth } = useNuxtApp()
</script>
