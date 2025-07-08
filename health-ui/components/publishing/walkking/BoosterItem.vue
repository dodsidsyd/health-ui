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
  // ⭐ emit 하기 전에 props.src와 props.count의 최종 값을 확인해 봅니다.
  console.log('BoosterItem emit 직전 - props.name:', props.name)
  console.log('BoosterItem emit 직전 - props.src (확인!):', props.src) // 이 부분이 undefined인지 확인
  console.log('BoosterItem emit 직전 - props.count (확인!):', props.count) // 이 부분이 undefined인지 확인

  emit('item-clicked', {
    name: props.name,
    src: props.src, // withDefaults에 의해 이미 기본값이 적용된 상태여야 함
    count: props.count // withDefaults에 의해 이미 기본값이 적용된 상태여야 함
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
