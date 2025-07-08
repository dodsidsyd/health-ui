<template>
  <div class="c-count-box">
    <div>
      총 <strong>{{ count }}</strong
      >건
    </div>
    <div class="check-type">
      <Checkbox id="checkBox1" :aria-label="label" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Props 정의가 필요한 경우 추가할 수 있습니다.
import Checkbox from '~/components/publishing/input/check.vue'

defineProps<{
  count: number
  label?: string
}>()
</script>

<style scoped lang="scss">
.c-count-box {
  display: flex;
  flex-direction: row;
  .check-type {
    margin-left: auto;
  }
}
</style>
