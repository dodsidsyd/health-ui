<template>
    <main id="base-page" class="l-page" :data-page="dataPage">
        <slot></slot>
    </main>
</template>
<script setup lang="ts">
const route = useRoute();
const dataPage = computed(() => {
    const path = route.path.split("/").pop() || "";
    return path.charAt(0).toUpperCase() + path.slice(1);
});
</script>
