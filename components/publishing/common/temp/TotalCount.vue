<template>
  <div class="c-count-box">
    <div>
      총 <strong>{{ count }}</strong
      >건
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count: number
}>()
</script>

<style scoped lang="scss">
.c-count-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
