<template>
  <BaseBody
    page-title="MY배지"
    :show-back-button="true"
    :has-add-text="true"
    :addTextClickEnabled="true"
    add-text="<span style='color:#555;font-size:1.4rem;font-weight:600'>MY배지 모아보기<span style='color: #4C7FF7'> 12</span></span>"
  >
    <!-- @badge-click="handleBadgeClick"  -->
    <MyBadgeWrap title="걸음수" :badges-data="badges1"> </MyBadgeWrap>
    <MyBadgeWrap title="목표걸음 연속달성" :badges-data="badges2"> </MyBadgeWrap>
    <MyBadgeWrap title="건강미션 연속달성" :badges-data="badges3"> </MyBadgeWrap>
    <MyBadgeWrap title="커뮤니티 활동" :badges-data="badges4"> </MyBadgeWrap>
  </BaseBody>

  <BottomModal
    :is-visible="isShowBottomModal"
    v-bind="bottomModalProps"
    @confirm="clickConfirm"
    @close="toggleBottomModal"
  >
    <template #content>
      <div style="width: 11.2rem; margin: 0 auto 0.8rem">
        <img :src="HealthBadgeImg" />
      </div>
      <div class="fz-16" style="font-weight: 700">목표걸음 {{ '목표걸음 2주 연속' }} 달성</div>
      <p class="mt-4 fz-14">
        목표걸음을 권장걸음수 이상 설정하시고<br />
        2주동안 매일 목표를 달성해보세요.
      </p>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import MyBadgeWrap from '~/components/publishing/common/myBadge/myBadgeWrap.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import walkedBadgeImg from '~/assets/images/badge/icon-badge-walked.png'
import StreakBadgeImg from '~/assets/images/badge/icon-badge-streak.png'
import HealthBadgeImg from '~/assets/images/badge/icon-badge-health.png'
import communityBadgeImg from '~/assets/images/badge/icon-badge-community.png'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowBottomModal = ref(false)
const bottomModalProps = ref({
  title: '뱃지 획득',
  isShowCloseButton: false,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const clickConfirm = () => {
  console.log('모달 확인 클릭')
}

const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

// 뱃지 클릭시 바텀 팝업 호출
// const selectedBadge = ref<Badge | null>(null)
// const handleBadgeClick = (badge: Badge) => {
// selectedBadge.value = badge // 클릭된 뱃지 정보를 selectedBadge에 저장
// bottomModalProps.value.title = '뱃지 획득'
// bottomModalProps.value.title = `'${badge.title}' 뱃지 정보`
// toggleBottomModal() // 모달 열기
// }

interface Badge {
  id: number
  type: 'walked' | 'streak' | 'health' | 'community'
  title: string
  date?: string
  imageName?: string
  variant?: 'empty'
}

// 마운트 시 모달 활성화
onMounted(() => {
  isShowBottomModal.value = true
})

const badges1 = ref<Badge[]>([
  {
    id: 1,
    type: 'walked',
    title: '7천 걸음 걷기',
    date: '2024. 06. 30',
    imageName: walkedBadgeImg
  },
  {
    id: 2,
    type: 'walked',
    title: '1만 걸음 걷기',
    date: '2024. 06. 29',
    imageName: walkedBadgeImg
  },
  {
    id: 3,
    type: 'walked',
    title: '2만 걸음 걷기',
    date: '2024. 06. 28',
    imageName: walkedBadgeImg
  },
  {
    id: 4,
    type: 'walked',
    title: '3만 걸음 걷기',
    variant: 'empty'
  },
  {
    id: 5,
    type: 'walked',
    title: '아직 비어있음',
    variant: 'empty'
  },
  {
    id: 6,
    type: 'walked',
    title: '새로운 연속',
    variant: 'empty'
  }
])
const badges2 = ref<Badge[]>([
  {
    id: 1,
    type: 'streak',
    title: '7천 걸음 걷기',
    date: '2024. 06. 30',
    imageName: StreakBadgeImg
  },
  {
    id: 2,
    type: 'streak',
    title: '1만 걸음 걷기',
    date: '2024. 06. 29',
    imageName: StreakBadgeImg
  },
  {
    id: 3,
    type: 'streak',
    title: '2만 걸음 걷기',
    date: '2024. 06. 28',
    imageName: StreakBadgeImg
  },
  {
    id: 4,
    type: 'streak',
    title: '3만 걸음 걷기',
    variant: 'empty'
  },
  {
    id: 5,
    type: 'streak',
    title: '아직 비어있음',
    variant: 'empty'
  },
  {
    id: 6,
    type: 'streak',
    title: '새로운 연속',
    variant: 'empty'
  }
])
const badges3 = ref<Badge[]>([
  {
    id: 1,
    type: 'health',
    title: '7천 걸음 걷기',
    date: '2024. 06. 30',
    imageName: HealthBadgeImg
  },
  {
    id: 2,
    type: 'health',
    title: '1만 걸음 걷기',
    date: '2024. 06. 29',
    imageName: HealthBadgeImg
  },
  {
    id: 3,
    type: 'health',
    title: '2만 걸음 걷기',
    date: '2024.06.28',
    imageName: HealthBadgeImg
  },
  {
    id: 4,
    type: 'health',
    title: '3만 걸음 걷기',
    variant: 'empty'
  },
  {
    id: 5,
    type: 'health',
    title: '아직 비어있음',
    variant: 'empty'
  },
  {
    id: 6,
    type: 'health',
    title: '새로운 연속',
    variant: 'empty'
  }
])
const badges4 = ref<Badge[]>([
  {
    id: 1,
    type: 'community',
    title: '7천 걸음 걷기',
    date: '2024. 06. 30',
    imageName: communityBadgeImg
  },
  {
    id: 2,
    type: 'community',
    title: '1만 걸음 걷기',
    date: '2024. 06. 29',
    imageName: communityBadgeImg
  },
  {
    id: 3,
    type: 'community',
    title: '2만 걸음 걷기',
    date: '2024. 06. 28',
    imageName: communityBadgeImg
  },
  {
    id: 4,
    type: 'community',
    title: '3만 걸음 걷기',
    variant: 'empty'
  },
  {
    id: 5,
    type: 'community',
    title: '아직 비어있음',
    variant: 'empty'
  },
  {
    id: 6,
    type: 'community',
    title: '새로운 연속',
    variant: 'empty'
  }
])
</script>

<style scoped lang="scss"></style>
