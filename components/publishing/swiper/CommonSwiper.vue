<template>
  <div class="custom-swiper">
    <ClientOnly>
      <swiper-container
        ref="swiperContainerRef"
        :pagination="paginationEnabled"
        :pagination-type="paginationType"
        :navigation="navigation"
        :scrollbar="scrollbarEnabled"
        :autoplay="autoplayEnabled"
        :slides-per-view="slidesPerView"
        :space-between="spaceBetween"
        :slides-offset-before="slidesOffsetBefore"
        :slides-offset-after="slidesOffsetAfter"
        :loop="loopEnabled"
        @swiperinit="onSwiperInit"
        @slidechange="onSlideChange"
        @swiperslidechange="onSlideChange"
        @slidechangetransitionend="onSlideChange"
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
    default: 'text',
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
  slidesOffsetBefore: { type: Number, default: 0 },
  slidesOffsetAfter: { type: Number, default: 0 },
  navigation: {
    type: Boolean,
    default: true
  },
  pagination: {
    type: [Boolean, Object],
    default: true
  },
  paginationType: {
    type: String,
    default: 'bullets', // 'bullets', 'fraction', 'progressbar'
    validator: value => ['bullets', 'fraction', 'progressbar'].includes(value)
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
const swiper = ref(null)
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
const onSwiperInit = event => {
  console.log('Swiper initialized:', event.detail[0])
  swiper.value = event.detail[0]
  isAutoplayActive.value = !!props.autoplay
  emit('swiper-init', event.detail[0])

  // Swiper 인스턴스에 직접 이벤트 리스너 추가
  if (swiper.value) {
    swiper.value.on('slideChange', () => {
      console.log('Direct swiper slideChange event')
      const newIndex = swiper.value.realIndex !== undefined ? swiper.value.realIndex : swiper.value.activeIndex
      console.log('Direct event - New slide index:', newIndex)
      currentIndex.value = newIndex
      emit('slide-change', swiper.value)

      // customPagination이 활성화된 경우에만 스타일 재적용
      if (props.customPagination) {
        setTimeout(() => {
          addCustomPaginationStyles()
        }, 50)
      }
    })
  }
}

const onSlideChange = event => {
  console.log('Slide change event:', event)
  const swiperInstance = event.detail[0]
  const newIndex = swiperInstance.realIndex !== undefined ? swiperInstance.realIndex : swiperInstance.activeIndex
  console.log('New slide index:', newIndex)
  currentIndex.value = newIndex
  emit('update:currentIndex', currentIndex.value + 1)
  emit('slide-change', swiperInstance)
}

const toggleAutoplay = () => {
  if (swiper.value) {
    if (isAutoplayActive.value) {
      if (swiper.value.autoplay && swiper.value.autoplay.stop) {
        swiper.value.autoplay.stop()
      }
      isAutoplayActive.value = false
    } else {
      if (swiper.value.autoplay && swiper.value.autoplay.start) {
        swiper.value.autoplay.start()
      }
      isAutoplayActive.value = true
    }
  }
}

// Custom Pagination 스타일 적용 함수
const addCustomPaginationStyles = () => {
  if (!props.customPagination) return

  console.log('Applying custom pagination styles...')

  // pagination 컨테이너 찾기
  const selectors = ['.swiper-pagination', 'swiper-container .swiper-pagination', '.custom-swiper .swiper-pagination']

  let paginationContainer = null

  for (const selector of selectors) {
    paginationContainer = document.querySelector(selector)
    if (paginationContainer) {
      console.log(`Found pagination with selector: ${selector}`)
      break
    }
  }

  if (paginationContainer) {
    // customPagination 옵션에 따른 스타일 적용
    const paginationStyle = typeof props.customPagination === 'object' ? props.customPagination : {}

    const defaultStyles = {
      position: 'relative',
      marginTop: '2rem',
      padding: '1rem 2rem',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '2rem',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(76, 127, 247, 0.2)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      zIndex: '10'
    }

    // 사용자 정의 스타일과 기본 스타일 병합
    const finalStyles = { ...defaultStyles, ...paginationStyle }

    // 스타일 적용
    Object.assign(paginationContainer.style, finalStyles)

    console.log('Applied custom pagination styles')
  }
}

// Watchers
watch(
  () => props.slides,
  () => {
    if (swiper.value) {
      setTimeout(() => {
        currentIndex.value = 0
      }, 100)
    }
  },
  { deep: true }
)

onMounted(() => {
  isAutoplayActive.value = !!props.autoplay

  setTimeout(() => {
    emit('slide-change', { activeIndex: 0, realIndex: 0 })
  }, 100)

  // customPagination이 활성화된 경우에만 스타일 적용
  if (props.customPagination) {
    setTimeout(() => addCustomPaginationStyles(), 300)
    setTimeout(() => addCustomPaginationStyles(), 600)
  }
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

button.play,
button.pause {
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

button.play:hover,
button.pause:hover {
  opacity: 0.8;
}
</style>

<!-- customPagination이 활성화된 경우에만 적용되는 전역 스타일 -->
<style>
/* customPagination이 true인 경우에만 적용 */
.custom-pagination-enabled .swiper-pagination {
  position: relative !important;
  margin-top: 2rem !important;
  padding: 1rem 2rem !important;
  background: rgba(255, 255, 255, 0.9) !important;
  border-radius: 2rem !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(76, 127, 247, 0.2) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  transition: all 0.3s ease !important;
  z-index: 10 !important;
}

.custom-pagination-enabled .swiper-pagination:hover {
  background: rgba(255, 255, 255, 0.95) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15) !important;
}

.custom-pagination-enabled .swiper-pagination-bullet {
  background-color: #d1d5db !important;
  width: 1rem !important;
  height: 1rem !important;
  opacity: 0.5 !important;
  margin: 0 0.5rem !important;
  border-radius: 50% !important;
  transition: all 0.3s ease !important;
}

.custom-pagination-enabled .swiper-pagination-bullet-active {
  background-color: #4c7ff7 !important;
  opacity: 1 !important;
  transform: scale(1.3) !important;
}
</style>
