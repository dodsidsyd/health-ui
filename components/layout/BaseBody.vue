<template>
  <div class="cbody">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, onMounted, nextTick, onUnmounted, inject, computed, ref } from 'vue'
import { useHeader } from '~/composables/useHeader'

// Props 정의 - 간단한 버전
interface Props {
  showBackButton?: boolean
  pageTitle?: string
  backgroundType?: string
  logoType?: 'both' | 'text' | 'image'
  logoTypeWithBack?: 'both' | 'text' | 'image' | ''
  showSearch?: boolean
  showSearchBtn?: boolean
  hasNotification?: boolean
  hasReward?: boolean
  hasSetting?: boolean
  hasSearch?: boolean
  hasChat?: boolean
  hasScrap?: boolean
  hasShare?: boolean
  hasMenu?: boolean
  notificationCount?: number
  chatCount?: number
  isCenterTitle?: boolean
  titleCenter?: boolean
  pageType?: string
  hasAddText?: boolean
  addText?: string
  addTextIcon?: string
  hasAddTextLeft?: boolean
  addTextLeft?: string
  hasCloseBtn?: boolean // 전체화면 모달창 닫기 버튼
  addTextClickEnabled?: boolean // addTextClick 활성화 여부
  isTransparent?: boolean // 투명 배경 여부
  whiteLogo?: boolean // 화이트 로고 여부
  hasInsu?: boolean // 청구의신 my병원
  insuStatus?: 'unregistered' | 'needUpdate' | 'registered' // MY병원 상태
  hasMyInfo?: boolean // 내정보 영역 표시 여부
}

const props = defineProps<Props>()

// 헤더 설정
const { setHeaderConfig } = useHeader()

// addTextClick 상태를 inject로 받아오기
const injectedAddTextClickEnabled = inject('addTextClickEnabled', ref(false))

// addTextClick 상태를 computed로 처리 (프롭스 우선)
const finalAddTextClickEnabled = computed(() => {
  if (props.addTextClickEnabled !== undefined) {
    return props.addTextClickEnabled
  }
  return injectedAddTextClickEnabled.value
})

// 헤더 설정 함수
const updateHeader = async () => {
  const headerConfig: any = {}

  if (props.showBackButton !== undefined) headerConfig.showBackButton = props.showBackButton
  if (props.pageTitle) headerConfig.pageTitle = props.pageTitle
  if (props.backgroundType) headerConfig.backGround = props.backgroundType
  if (props.logoType) headerConfig.logoType = props.logoType
  if (props.logoTypeWithBack) headerConfig.logoTypeWithBack = props.logoTypeWithBack
  if (props.showSearch !== undefined) headerConfig.showSearch = props.showSearch
  if (props.showSearchBtn !== undefined) headerConfig.showSearchBtn = props.showSearchBtn
  if (props.hasNotification !== undefined) headerConfig.hasNotification = props.hasNotification
  if (props.hasReward !== undefined) headerConfig.hasReward = props.hasReward
  if (props.hasSetting !== undefined) headerConfig.hasSetting = props.hasSetting
  if (props.hasSearch !== undefined) headerConfig.hasSearch = props.hasSearch
  if (props.hasChat !== undefined) headerConfig.hasChat = props.hasChat
  if (props.hasScrap !== undefined) headerConfig.hasScrap = props.hasScrap
  if (props.hasShare !== undefined) headerConfig.hasShare = props.hasShare
  if (props.hasMenu !== undefined) headerConfig.hasMenu = props.hasMenu
  if (props.notificationCount !== undefined) headerConfig.notificationCount = props.notificationCount
  if (props.chatCount !== undefined) headerConfig.chatCount = props.chatCount
  if (props.isCenterTitle !== undefined) headerConfig.isCenterTitle = props.isCenterTitle
  if (props.titleCenter !== undefined) headerConfig.titleCenter = props.titleCenter
  if (props.pageType) headerConfig.pageType = props.pageType
  if (props.hasAddText !== undefined) headerConfig.hasAddText = props.hasAddText
  if (props.addText) headerConfig.addText = props.addText
  if (props.addTextIcon) headerConfig.addTextIcon = props.addTextIcon
  if (props.hasMenu !== undefined) headerConfig.hasMenu = props.hasMenu
  if (props.hasAddTextLeft !== undefined) headerConfig.hasAddTextLeft = props.hasAddTextLeft
  if (props.addTextLeft) headerConfig.addTextLeft = props.addTextLeft
  if (props.hasCloseBtn !== undefined) headerConfig.hasCloseBtn = props.hasCloseBtn
  if (finalAddTextClickEnabled.value !== undefined) headerConfig.addTextClickEnabled = finalAddTextClickEnabled.value
  if (props.isTransparent !== undefined) headerConfig.isTransparent = props.isTransparent
  if (props.whiteLogo !== undefined) headerConfig.whiteLogo = props.whiteLogo
  if (props.hasInsu !== undefined) headerConfig.hasInsu = props.hasInsu
  if (props.insuStatus !== undefined) headerConfig.insuStatus = props.insuStatus
  if (props.hasMyInfo !== undefined) headerConfig.hasMyInfo = props.hasMyInfo

  if (Object.keys(headerConfig).length > 0) {
    await setHeaderConfig(headerConfig)
  }

  // 디버깅용 로그 간소화
  if (props.hasInsu) {
    console.log('BaseBody - headerConfig updated:', {
      hasInsu: headerConfig.hasInsu,
      insuStatus: headerConfig.insuStatus
    })
  }
}

// 즉시 실행 + 지연 실행 조합
watchEffect(updateHeader, { flush: 'sync' })

onMounted(async () => {
  // 즉시 실행
  await updateHeader()

  // nextTick 후에도 한 번 더 실행 (안전장치)
  await nextTick()
  await updateHeader()

  // 추가 지연 실행 (극단적인 경우를 위한 안전장치)
  setTimeout(async () => {
    await updateHeader()
  }, 50)
})
</script>

<style scoped lang="scss"></style>
