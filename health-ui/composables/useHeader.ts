import { inject, nextTick } from 'vue'

interface HeaderOptions {
  // 헤더 표시 여부
  showHeader?: boolean

  // 기본 옵션 (logoType 기본값: text)
  showBackButton?: boolean
  pageTitle?: string
  logoType?: 'both' | 'text' | 'image'
  logoTypeWithBack?: 'both' | 'text' | 'image' | ''

  // 투명 옵션
  backgroundType?: string

  // 검색  옵션
  showSearch?: boolean
  showSearchBtn?: boolean

  // 알림 옵션
  hasNotification?: boolean
  hasNotificationDot?: boolean
  // 리워드 옵션
  hasReward?: boolean
  hasRewardDot?: boolean

  // 추가 기능 옵션
  hasSetting?: boolean
  hasSearch?: boolean
  hasChat?: boolean
  hasShare?: boolean
  hasMenu?: boolean

  // 카운트 옵션
  notificationCount?: number
  chatCount?: number

  // 레이아웃 옵션
  isCenterTitle?: boolean
  pageType?: string
  hasAddText?: boolean
  addText?: string
  hasAddTextLeft?: boolean
  addTextLeft?: string
  // 전체화면 모달 옵션
  hasCloseBtn?: boolean
  
  // 배경 투명도 옵션
  isTransparent?: boolean
}

export const useHeader = () => {
  const setHeaderOptions = inject<(options: HeaderOptions) => void>('setHeaderOptions')

  console.log('useHeader - setHeaderOptions inject result:', setHeaderOptions)

  const setShowBackButton = async (show: boolean) => {
    await setHeaderConfig({ showBackButton: show })
  }

  const setPageTitle = async (title: string) => {
    await setHeaderConfig({ pageTitle: title })
  }

  const setLogoType = async (type: 'both' | 'text' | 'image') => {
    await setHeaderConfig({ logoType: type })
  }

  const setShowSearchBtn = async (show: boolean) => {
    await setHeaderConfig({ showSearchBtn: show })
  }

  const setBackground = async (backGround: string) => {
    await setHeaderConfig({ backgroundType: backGround })
  }

  const setShowHeader = async (show: boolean) => {
    await setHeaderConfig({ showHeader: show })
  }

  const setTransparentHeader = async (transparent: boolean) => {
    await setHeaderConfig({ isTransparent: transparent })
  }

  const setHeaderConfig = async (options: HeaderOptions) => {
    console.log('\n=== setHeaderConfig called in useHeader ===')
    console.log('options received:', options)

    // inject가 실패한 경우 재시도 로직
    if (!setHeaderOptions) {
      console.warn('setHeaderOptions not available, retrying...')
      await nextTick()

      // 재시도 후에도 실패하면 에러 로그
      const retrySetHeaderOptions = inject<(options: HeaderOptions) => void>('setHeaderOptions')
      if (!retrySetHeaderOptions) {
        console.error('setHeaderOptions inject failed after retry')
        return
      }

      retrySetHeaderOptions(options)
      return
    }

    // 정상적으로 설정
    console.log('🟢 setHeaderOptions available:', options)
    setHeaderOptions(options)
    console.log('=== end setHeaderConfig ===')
  }

  return {
    setShowBackButton,
    setPageTitle,
    setLogoType,
    setShowSearchBtn,
    setBackground,
    setShowHeader,
    setTransparentHeader,
    setHeaderConfig
  }
}
