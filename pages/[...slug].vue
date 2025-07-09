<template>
  <BaseBody >
    <div>404</div>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

definePageMeta({
  middleware: ['redirect-404']
})
</script>
