<template>
  <div :class="['my-community-card', isNew ? 'new' : '']">
    <NuxtLink :to="linkTo" class="card-link">
      <div class="community-img">
        <img :src="fullImagePath" :alt="text || '커뮤니티 이미지'" @error="handleImageError" />
      </div>
      <p class="community-text">{{ text }}</p>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
interface Props {
  src?: string
  text?: string
  isNew?: boolean
  linkTo?: string
  id?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  text: '',
  isNew: false,
  linkTo: '#',
  id: ''
})

const IMAGE_BASE_PATH = '/_nuxt/assets/images/'
const imageError = ref(false)

const fullImagePath = computed(() => {
  if (imageError.value) {
    return `${IMAGE_BASE_PATH}community/default-community.png` // 기본 이미지
  }
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return `${IMAGE_BASE_PATH}community/default-community.png`
})

const handleImageError = () => {
  imageError.value = true
}

// 이벤트 emit (필요한 경우)
const emit = defineEmits<{
  click: [id: number | string]
}>()

const handleCardClick = () => {
  if (props.id) {
    emit('click', props.id)
  }
}
</script>
<style scoped lang="scss">
.my-community-card {
  &.new {
    position: relative;
    &:after {
      display: block;
      content: '';
      overflow: hidden;
      position: absolute;
      top: -0.2rem;
      right: -0.2rem;
      width: 1rem;
      height: 1rem;
      background: Red;
      border: 0.4rem solid #fff;
      border-radius: 50%;
      box-sizing: content-box;
    }
  }
}
.card-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.community-img {
  width: 6.4rem;
  height: 6.4rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.community-text {
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
}
</style>
