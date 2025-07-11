<template>
  <div class="custom-swiper">
    <ClientOnly>
      <swiper-container 
        ref="swiperContainerRef"
        :pagination="paginationEnabled"
        :navigation="navigation"
        :scrollbar="scrollbarEnabled"
        :autoplay="autoplayEnabled"
        :slides-per-view="slidesPerView"
        :space-between="spaceBetween"
        :loop="loopEnabled"
        @swiperinit="onSwiperInit"
        @slidechange="onSlideChange"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <!-- 슬롯이 있는 경우 슬롯 사용 -->
          <slot v-if="$slots.default" :slide="slide" :index="index"></slot>
          <!-- 기본 렌더링 -->
          <template v-else>
            <!-- 이미지 슬라이드인 경우 -->
            <img v-if="slideType === 'image'" :src="slide" :alt="`Slide ${index + 1}`" class="slide-image" />
            <!-- 텍스트 슬라이드인 경우 -->
            <div v-else class="slide-content">
              {{ slide }}
            </div>
          </template>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>

    <!-- 커스텀 Navigation 버튼 -->
    <div v-if="navigation && slides.length > 1 && showCustomButtons" class="custom-navigation">
      <button @click="swiper.prev()" class="nav-button prev-button">이전</button>
      <button @click="swiper.next()" class="nav-button next-button">다음</button>
    </div>

    <!-- 현재 슬라이드/총 슬라이드 수 -->
    <div v-if="showSlideLength && slides.length > 1" class="slide-info">
      <span>{{ currentIndex + 1 }} / {{ slides.length }}</span>
    </div>

    <!-- Play/Pause 버튼 -->
    <button
      v-if="showPlayPauseButton && slides.length > 1"
      :class="isAutoplayActive ? 'pause' : 'play'"
      @click="toggleAutoplay"
    >
      {{ isAutoplayActive ? 'Pause' : 'Play' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// Props for customization
const props = defineProps({
  slides: {
    type: Array,
    required: true
  },
  slideType: {
    type: String,
    default: 'text', // 'text', 'image', 'custom'
    validator: value => ['text', 'image', 'custom'].includes(value)
  },
  slidesPerView: {
    type: [Number, String],
    default: 1
  },
  spaceBetween: {
    type: Number,
    default: 30
  },
  navigation: {
    type: Boolean,
    default: true
  },
  pagination: {
    type: [Boolean, Object],
    default: true
  },
  scrollbar: {
    type: [Boolean, Object],
    default: false
  },
  loop: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: [Boolean, Object],
    default: false
  },
  autoplayDelay: {
    type: Number,
    default: 3000
  },
  showSlideLength: {
    type: Boolean,
    default: true
  },
  showPlayPauseButton: {
    type: Boolean,
    default: true
  },
  showCustomButtons: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:currentIndex', 'swiper-init', 'slide-change'])

// Variables
const swiperContainerRef = ref(null)
const swiper = useSwiper(swiperContainerRef)
const currentIndex = ref(0)
const isAutoplayActive = ref(false)

// Computed properties
const paginationEnabled = computed(() => {
  return props.pagination && props.slides.length > 1
})

const scrollbarEnabled = computed(() => {
  return props.scrollbar && props.slides.length > 1
})

const loopEnabled = computed(() => {
  return props.loop && props.slides.length > 1
})

const autoplayEnabled = computed(() => {
  if (!props.autoplay || props.slides.length <= 1) return false
  
  if (typeof props.autoplay === 'boolean') {
    return {
      delay: props.autoplayDelay
    }
  }
  
  return {
    delay: props.autoplayDelay,
    ...props.autoplay
  }
})

// Methods
const onSwiperInit = (event) => {
  console.log('Swiper initialized:', event.detail[0])
  isAutoplayActive.value = !!props.autoplay
  emit('swiper-init', event.detail[0])
}

const onSlideChange = (event) => {
  const swiperInstance = event.detail[0]
  currentIndex.value = swiperInstance.realIndex || swiperInstance.activeIndex
  emit('update:currentIndex', currentIndex.value + 1)
  emit('slide-change', swiperInstance)
}

const toggleAutoplay = () => {
  if (swiper.value) {
    if (isAutoplayActive.value) {
      // Autoplay 정지 로직 (swiper-container에서는 다를 수 있음)
      isAutoplayActive.value = false
    } else {
      // Autoplay 시작 로직
      isAutoplayActive.value = true
    }
  }
}

// Watchers
watch(() => props.slides, () => {
  // 슬라이드 변경 시 swiper 업데이트
  if (swiper.value) {
    setTimeout(() => {
      currentIndex.value = 0
    }, 100)
  }
}, { deep: true })

onMounted(() => {
  // 초기화 후 autoplay 상태 설정
  isAutoplayActive.value = !!props.autoplay
})
</script>

<style scoped>
.custom-swiper {
  width: 100%;
  position: relative;
}

swiper-container {
  width: 100%;
  height: auto;
}

swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.2rem;
  overflow: hidden;
  width: 100%;
}

.slide-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

.slide-image {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
}

.custom-navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-button {
  padding: 0.8rem 1.6rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.4rem;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #0056b3;
}

.nav-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.slide-info {
  text-align: center;
  margin-top: 1rem;
  font-size: 1.4rem;
  color: #666;
}

button.play, button.pause {
  display: block;
  margin: 1rem auto 0;
  padding: 0.8rem 1.6rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.4rem;
  transition: background-color 0.3s ease;
}

button.play {
  background-color: #28a745;
}

button.pause {
  background-color: #dc3545;
}

button.play:hover, button.pause:hover {
  opacity: 0.8;
}
</style>

<!-- Swiper Container 전역 스타일 -->
<style>
/* Swiper pagination bullet 커스텀 */
swiper-container::part(bullet) {
  background-color: #e8e8e8;
  width: 0.8rem;
  height: 0.8rem;
  opacity: 1;
  margin: 0 0.4rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

/* Swiper pagination active bullet 커스텀 */
swiper-container::part(bullet-active) {
  background-color: #4f5561;
  transform: scale(1.2);
}

/* Swiper navigation 버튼 커스텀 */
swiper-container::part(button-prev),
swiper-container::part(button-next) {
  color: #007bff;
  font-size: 1.8rem;
  font-weight: bold;
}

/* Swiper scrollbar 커스텀 */
swiper-container::part(scrollbar) {
  background: rgba(0, 0, 0, 0.1);
}

swiper-container::part(scrollbar-drag) {
  background: #007bff;
}
</style>