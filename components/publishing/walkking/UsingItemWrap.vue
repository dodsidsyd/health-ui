<template>
  <div class="using-item-wrap">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  imageName: { type: String, default: '' },
  brandName: { type: String, default: '브랜드' },
  giftName: { type: String, default: '상품 이름' },
  giftType: { type: String, default: '상품 타입' }
})
</script>
<style scoped lang="scss">
.using-item-wrap {
  display: grid;
  padding: 1.6rem 2rem 2.4rem;
  grid-template-columns: repeat(3, 8rem);
  justify-content: space-between;
  row-gap: 3.2rem;
}
</style>
