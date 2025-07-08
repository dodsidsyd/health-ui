<template>
  <div>
    <button
      v-if="utilsStatus.isUseSearch"
      type="button"
      class="c-btn c-icon"
      aria-label="검색"
      @click="clickButton($event, HEADER_UTILS_BUTTON.SEARCH)"
    >
      <i class="ri-search-line"></i>
    </button>
    <button
      v-if="utilsStatus.isUseUser"
      type="button"
      class="c-btn c-icon"
      aria-label="아바타"
      @click="clickButton($event, HEADER_UTILS_BUTTON.USER)"
    >
      <i class="ri-user-line"></i>
    </button>
    <button
      v-if="utilsStatus.isUseCalendar"
      type="button"
      class="c-btn c-icon"
      aria-label="일정"
      @click="clickButton($event, HEADER_UTILS_BUTTON.CALENDAR)"
    >
      <i class="ri-calendar-line"></i>
    </button>
    <button
      v-if="utilsStatus.isUseSettings"
      type="button"
      class="c-btn c-icon"
      aria-label="설정"
      @click="clickButton($event, HEADER_UTILS_BUTTON.SETTINGS)"
    >
      <i class="ri-settings-5-line"></i>
    </button>
    <button
      v-if="utilsStatus.isUseShare"
      type="button"
      class="c-btn c-icon"
      aria-label="공유"
      @click="clickButton($event, HEADER_UTILS_BUTTON.SHARE)"
    >
      <i class="ri-share-line"></i>
    </button>
    <button
      v-if="utilsStatus.isUseMore"
      type="button"
      class="c-btn c-icon"
      aria-label="더보기"
      @click="clickButton($event, HEADER_UTILS_BUTTON.MORE)"
    >
      <i class="ri-more-2-line"></i>
    </button>
    <button
      v-if="utilsStatus.isUsePhone"
      type="button"
      class="c-btn c-icon"
      aria-label="전화"
      @click="clickButton($event, HEADER_UTILS_BUTTON.PHONE)"
    >
      <i class="ri-phone-line"></i>
    </button>
    <button
      v-if="utilsStatus.isUseNoti"
      type="button"
      class="c-btn c-icon"
      aria-label="공지"
      @click="clickButton($event, HEADER_UTILS_BUTTON.NOTI)"
    >
      <i class="ri-notification-line"></i>
    </button>
    <button
      v-if="utilsStatus.isUseEdit"
      type="button"
      class="c-btn c-icon"
      aria-label="수정"
      @click="clickButton($event, HEADER_UTILS_BUTTON.EDIT)"
    >
      <i class="ri-edit-line"></i>
    </button>
    <button
      v-if="utilsStatus.isUseWriteDiary"
      type="button"
      class="c-btn c-icon"
      aria-label="일기쓰기"
      @click="clickButton($event, HEADER_UTILS_BUTTON.WRITE_DIARY)"
    >
      일기쓰기
    </button>
    <button
      v-if="utilsStatus.isUseRegister"
      type="button"
      class="c-btn c-icon"
      aria-label="등록하기"
      @click="clickButton($event, HEADER_UTILS_BUTTON.REGISTER)"
    >
      등록하기
    </button>

    <!--    라벨버튼: 라벨명, 클릭 콜백 -->
  </div>
</template>

<script setup lang="ts">
import type { HeaderUtilsButton, HeaderUtilsStatus } from '~/types/common/header/header.types'
import { HEADER_UTILS_BUTTON } from '~/constants/header.constants'

interface Props {
  utils?: HeaderUtilsButton[]
}

const props = withDefaults(defineProps<Props>(), {
  utils: () => []
})

const emit = defineEmits<{
  (e: 'click', value: { event: Event; name: string }): void
}>()

const utilsStatus = reactive<HeaderUtilsStatus>({
  isUseSearch: false,
  isUseUser: false,
  isUseNoti: false,
  isUseCalendar: false,
  isUseSettings: false,
  isUseShare: false,
  isUseMore: false,
  isUsePhone: false,
  isUseEdit: false,
  isUseWriteDiary: false,
  isUseRegister: false
})

watch(
  () => props.utils,
  newVal => {
    // 모든 값을 false로 초기화
    Object.keys(utilsStatus).forEach(key => {
      utilsStatus[key] = false
    })

    props.utils.forEach(item => {
      const str = item[0].toUpperCase() + item.slice(1)
      const key = `isUse${str}`

      utilsStatus[key] = true
    })
  },
  {
    immediate: true
  }
)

const clickButton = (event: Event, util: string) => {
  emit('click', { event, name: util })
}
</script>

<style scoped lang="scss"></style>
