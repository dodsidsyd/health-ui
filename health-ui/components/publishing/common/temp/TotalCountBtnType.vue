<template>
  <div class="c-count-box">
    <div>
      총 <strong>{{ count }}</strong
      >건
    </div>
    <div v-if="btnText" class="select-option btn-type">
      <Button btnType="button" class="c-btn btn-line xs" :aria-label="btnText"
        ><span class="text">{{ btnText }}</span></Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
// Props 정의가 필요한 경우 추가할 수 있습니다.

defineProps<{
  count: number
  btnText?: string
}>()
</script>

<style scoped lang="scss">
.c-count-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
