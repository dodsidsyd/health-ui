<template>
  <div class="c-count-box">
    <div>
      댓글 <strong>{{ count }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    count?: number
  }>(),
  {
    count: 0
  }
)
</script>

<style scoped lang="scss">
.c-count-box {
  display: flex;
  flex-direction: row;
  strong {
    color: var(--blue-primary);
  }
}
</style>
