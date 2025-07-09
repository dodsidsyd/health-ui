<template>
  <div class="booster-item-wrap" @click="handleClick">
    <div class="img-box">
      <img :src="fullImagePath" alt="아이템 이미지" />
      <span class="count-item">{{ count }}</span>
    </div>
    <span>{{ name }}</span>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    src?: string
    count?: string
  }>(),
  {
    src: 'walkingking/img-booster-item5.png',
    count: '+'
  }
)
const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})

const emit = defineEmits<{
  (e: 'item-clicked', itemData: { name: string; src: string; count: string }): void
}>()

const handleClick = () => {
  emit('item-clicked', {
    name: props.name,
    src: props.src,
    count: props.count
  })
}
</script>
<style scoped lang="scss">
.booster-item-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  .img-box {
    position: relative;
    img {
      width: 8rem;
      height: 8rem;
    }
    .count-item {
      position: absolute;
      display: block;
      top: 0;
      right: -0.2rem;
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.7);
      text-align: center;
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 3.2rem;
      color: #fff;
    }
  }
  span {
    width: 6rem;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
  }
}
</style>
