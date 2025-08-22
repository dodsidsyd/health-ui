<template>
  <div class="family-homework">
    <div class="homework-tit">
      <h4 class="tit">패밀리 숙제</h4>
      <nuxt-link to="javascript:void(0)" title="패밀리 숙제 페이지로 이동">
        <i class="icon arrow-type-black" aria-hidden="true"></i>
      </nuxt-link>
    </div>

    <!-- 새로운 숙제 도착 -->
    <div class="new-updated-homework" :class="{ updated: showNewHomework }">
      <button type="button" class="btn-new-homework" @click="clickHomeWorkModal">
        <i class="icon ico-bell-color"></i>새로운 숙제 도착했어요!
      </button>
    </div>

    <div v-if="homeworkList.length > 0" class="homework-list">
      <HomeworkItem
        v-for="homework in homeworkList"
        :key="homework.id"
        :homework="homework"
        @view-detail="viewDetail"
        @accept-homework="acceptHomework"
        @reject-homework="rejectHomework"
      />
      <button type="button" class="btn-add-homework mb-12"><i class="icon ico-plus-lg"></i>숙제 추가하기</button>
    </div>

    <EmptyState
      v-else
      class="mt-12"
      empty-title="아직 숙제가 없어요"
      href="/community"
      :button="true"
      button-aria-label="숙제 추가하기"
      button-icon="ico-plus-lg"
    />

    <!-- 숙제하기 바텀 모달 -->
    <Teleport to="body">
      <BottomModal
        :is-visible="isShowHomeWorkModal"
        :title="modalTitle"
        :is-show-close-button="true"
        :is-show-cancel-button="true"
        :is-show-confirm-button="true"
        :confirm-button-text="confirmButtonText"
        :cancel-button-text="cancelButtonText"
        @close="toggleHomeWorkModal"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <template #content>
          <!-- HomeworkItem 컴포넌트 활용 (기본 상태) -->
          <div v-if="!isRejectMode" class="modal-homework-wrapper">
            <HomeworkItem
              :homework="newHomeworkData"
              @accept-homework="handleAcceptFromItem"
              @reject-homework="handleRejectFromItem"
            />
          </div>

          <!-- 거절 사유 입력 (거절 모드) -->
          <div v-else>
            <InputText v-model="rejectReason" placeholder="거절사유를 간단히 남겨주세요. (선택)" />
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import CommonBadge from '~/components/common/badge/CommonBadge.vue'

import InputText from '~/components/publishing/input/InputText.vue'

import HomeworkItem from '~/components/publishing/community/familyCare/HomeworkItem.vue'

import EmptyState from '~/components/publishing/community/common/EmptyState.vue'

interface Props {
  color?: 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'brown' | 'gray' | 'deepRed'
  variant?: 'solid' | 'outline' | 'soft'
  badgeText: string
  titleText: string
}
const props = withDefaults(defineProps<Props>(), {
  color: 'default',
  variant: 'soft'
})

// 새로운 숙제 알림 상태 관리
const showNewHomework = ref(false)

// 모달 상태 관리
const isShowHomeWorkModal = ref(false)
const isRejectMode = ref(false)
const rejectReason = ref('')

// 새로운 숙제 데이터 (모달에서 표시할 데이터)
const newHomeworkData = ref({
  id: 'new-1',
  title: '비타민C 영양제 먹기',
  description: '요즘 우리 가족들 너무 피곤해하는것 같아서 추가했어 같이 해보면 어때?',
  startDate: '2024-04-16',
  endDate: '2024-05-17',
  verificationDays: [
    { day: '월', isSelected: true },
    { day: '화', isSelected: false },
    { day: '수', isSelected: true },
    { day: '목', isSelected: false },
    { day: '금', isSelected: true },
    { day: '토', isSelected: false },
    { day: '일', isSelected: false }
  ],
  targets: [
    { id: '1', name: '나', isSelected: true },
    { id: '2', name: '엄마', isSelected: true }
  ],
  createdAt: new Date().toISOString(),
  status: 'active' as const,
  isNew: true,
  isParticipating: false,
  creatorName: '엄마',
  creatorProfile: 'community/img-rank-profile.png'
})

// 모달 제목과 버튼 텍스트를 동적으로 변경
const modalTitle = computed(() => {
  return isRejectMode.value ? '숙제를 거절하시겠어요?' : '새로운 숙제'
})

const confirmButtonText = computed(() => {
  return isRejectMode.value ? '거절하기' : '수락하기'
})

const cancelButtonText = computed(() => {
  return isRejectMode.value ? '취소' : '거절하기'
})

// 컴포넌트 마운트 후 10초 뒤에 새로운 숙제 알림 표시
onMounted(() => {
  // 새로운 숙제 도착했어요 테스트용
  setTimeout(() => {
    showNewHomework.value = true
  }, 3000) // 3초
})

const clickHomeWorkModal = () => {
  //showNewHomework.value = false
  resetModalState() // 모달 상태 초기화
  toggleHomeWorkModal()
}

const toggleHomeWorkModal = () => {
  isShowHomeWorkModal.value = !isShowHomeWorkModal.value
  if (!isShowHomeWorkModal.value) {
    resetModalState() // 모달 닫을 때 상태 초기화
  }
}

// 모달 상태 초기화
const resetModalState = () => {
  isRejectMode.value = false
  rejectReason.value = ''
}

// HomeworkItem 컴포넌트에서 수락 이벤트 처리
const handleAcceptFromItem = (homeworkId: string) => {
  console.log('숙제 수락:', homeworkId)
  toggleHomeWorkModal()
}

// HomeworkItem 컴포넌트에서 거절 이벤트 처리
const handleRejectFromItem = (homeworkId: string) => {
  isRejectMode.value = true
}

// 확인 버튼 클릭 처리
const handleConfirm = () => {
  if (isRejectMode.value) {
    // 거절 처리 로직
    console.log('숙제 거절:', rejectReason.value)
    toggleHomeWorkModal()
  } else {
    // 수락 처리 로직
    console.log('숙제 수락')
    toggleHomeWorkModal()
  }
}

// 취소/거절 버튼 클릭 처리
const handleCancel = () => {
  if (isRejectMode.value) {
    // 거절 모드에서 취소 → 기본 모드로 돌아가기
    resetModalState()
  } else {
    // 기본 모드에서 거절 → 거절 모드로 전환
    isRejectMode.value = true
  }
}

// 동적 클래스 계산
const badgeClasses = computed(() => {
  const classes = ['badge']

  // 컬러 클래스 추가
  if (props.color !== 'default') {
    classes.push(`badge-${props.color}`)
  }

  // 변형 클래스 추가
  if (props.variant !== 'soft') {
    classes.push(`badge-${props.variant}`)
  }

  return classes
})

// 상세보기 핸들러
const viewDetail = (homeworkId: string) => {
  console.log('View detail:', homeworkId)
}

// 수락 핸들러
const acceptHomework = (homeworkId: string) => {
  console.log('Accept homework:', homeworkId)
}

// 거절 핸들러
const rejectHomework = (homeworkId: string) => {
  console.log('Reject homework:', homeworkId)
}

// 숙제 리스트 데이터 (예시)
const homeworkList = ref([
  {
    id: '1',
    title: '물 2L 마시기',
    description: '하루에 물을 2L 마시는 습관을 만들어보세요. 건강한 피부와 신진대사에 도움이 됩니다.',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    verificationDays: [
      { day: '월', isSelected: true },
      { day: '화', isSelected: true },
      { day: '수', isSelected: true },
      { day: '목', isSelected: true },
      { day: '금', isSelected: true },
      { day: '토', isSelected: true },
      { day: '일', isSelected: true }
    ],
    targets: [
      { id: '1', name: '나', isSelected: true },
      { id: '2', name: '엄마', isSelected: true }
    ],
    createdAt: '2024-01-10T09:00:00Z',
    status: 'active',
    progress: 65,
    isNew: false,
    isParticipating: true,
    creatorName: '엄마',
    myCompletedDate: 3,
    missionProgressDays: 15
  },
  {
    id: '2',
    title: '물 2L 마시기',
    description: '하루에 물을 2L 마시는 습관을 만들어보세요. 건강한 피부와 신진대사에 도움이 됩니다.',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    verificationDays: [
      { day: '월', isSelected: true },
      { day: '화', isSelected: true },
      { day: '수', isSelected: true },
      { day: '목', isSelected: true },
      { day: '금', isSelected: true },
      { day: '토', isSelected: true },
      { day: '일', isSelected: true }
    ],
    targets: [
      { id: '1', name: '나', isSelected: true },
      { id: '2', name: '엄마', isSelected: true }
    ],
    createdAt: '2024-01-10T09:00:00Z',
    status: 'active',
    progress: 65,
    isNew: false,
    isParticipating: true,
    creatorName: '엄마',
    myCompletedDate: 5,
    missionProgressDays: 15
  },
  {
    id: '3',
    title: '스트레칭 10분',
    description: '매일 아침 스트레칭 10분으로 유연성을 높이고 몸을 깨워보세요.',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    verificationDays: [
      { day: '월', isSelected: true },
      { day: '화', isSelected: true },
      { day: '수', isSelected: true },
      { day: '목', isSelected: true },
      { day: '금', isSelected: true },
      { day: '토', isSelected: false },
      { day: '일', isSelected: false }
    ],
    targets: [{ id: '1', name: '나', isSelected: true }],
    createdAt: '2024-01-01T09:00:00Z',
    status: 'completed',
    progress: 100,
    isNew: false,
    isParticipating: false,
    creatorName: '나',
    myCompletedDate: 0,
    missionProgressDays: 31
  }
])
</script>

<style scoped lang="scss">
.family-homework {
  margin-top: 3.2rem;
  position: relative;
  .homework-tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;

    .tit {
      font-size: 2rem;
      font-weight: 700;
      color: #2b2b2b;
    }
    .icon {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .new-updated-homework {
    overflow: hidden;
    height: 0;
    &.updated {
      height: auto;
      .btn-new-homework {
        opacity: 1;
        right: 0;
      }
    }
    .btn-new-homework {
      border-radius: 1.2rem;
      width: 100%;
      background-color: #f4f4f4;
      padding: 1.6rem 2rem;
      font-size: 1.6rem;
      font-weight: 500;
      display: flex;
      justify-items: center;
      align-items: center;
      gap: 0 0.8rem;
      position: relative;
      opacity: 0.5;
      right: -50%;
      @include mixin.rippleEffectPrimary;
      transition: 0.5s all cubic-bezier(0.075, 0.82, 0.165, 1);
      .icon {
        width: 2.8rem;
        height: 2.8rem;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 2rem 2.4rem;
        background-position: center;
      }
    }
  }

  .homework-list {
    display: flex;
    flex-direction: column;
    margin-top: 1.2rem;
    gap: 1.2rem 0;

    .homework-item {
      .item-link {
        width: 100%;
        position: relative;
        padding: 2rem;
        font-size: 1.4rem;
        border-radius: 2rem;
        border: 0.1rem solid #e2e2e2;
        background: vars.$white;
        box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
        display: flex;
        flex-direction: column;
        text-align: left;
        gap: 0.7rem 0;
        color: #959595;
        font-weight: 500;
      }

      .tit {
        font-size: 1.6rem;
        font-weight: 700;
        color: #2b2b2b;
        display: flex;
        justify-content: space-between;
      }
      .homework-target {
        display: flex;
        gap: 0 1.2rem;
        strong {
          color: #2b2b2b;
          font-weight: 500;
        }
        .duration-date {
          margin-left: auto;
          flex: 0 0 auto;
          strong {
            color: vars.$blue-primary;
          }
        }
      }
    }
  }
}

.btn-add-homework {
  width: auto;
  align-self: flex-start;
  justify-self: center;
  margin: auto;
  position: relative;
  border-radius: 3.2rem;
  padding: 0.7rem 1.6rem;
  border: 0.1rem solid #e2e2e2;
  background: vars.$white;
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 0.4rem;
  margin-top: 1.2rem;

  @include mixin.rippleEffectPrimary;
  .icon {
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
  }
}

// 모달 내부에서 HomeworkItem 컴포넌트 스타일 조정
.modal-homework-wrapper {
  // 모달 안에서는 박스 그림자와 보더 제거
  :deep(.homework-item) {
    border: none;
    box-shadow: none;
    padding: 0;
  }

  // 모달에서는 버튼 숨기기 (모달 자체 버튼 사용)
  :deep(.homework-item-actions) {
    display: none;
  }
}
</style>
