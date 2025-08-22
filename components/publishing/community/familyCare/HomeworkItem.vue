<template>
  <div v-if="homework" class="homework-item">
    <!-- new가 아닌 경우에만 링크로 감싸기 -->
    <NuxtLink
      v-if="!isNewHomework"
      :to="`/community/familycare/homework/detail/${homework.id}`"
      class="homework-item-link"
    >
      <!-- 제목 -->
      <div :class="['homework-item-header', { 'is-new': isNewHomework }]">
        <div class="homework-item-title">
          <strong class="item-title">{{ homework.title }}</strong>
          <!-- 상태 플래그 -->
          <!-- 완료된 숙제 (status: 'completed')
              진행중 (status: 'active' && isParticipating: true)
              진행전 (status: 'active' && isParticipating: false)
              만료된 숙제 (status: 'expired') -->
          <span v-if="!isNewHomework" class="status-flag" :class="getStatusClass">
            {{ getStatusText }}
          </span>
        </div>
        <div class="homework-item-date">
          <span class="period">{{ formatDate(homework.startDate) }} ~ {{ formatDate(homework.endDate) }}</span>
          <span class="date">{{ formatDays(homework.verificationDays) }}</span>
        </div>
        <div class="homework-item-info">
          <div class="homework-item-basic">
            <div class="info-row">
              <span class="info-label">개설자</span>
              <span class="info-value">{{ homework.creatorName || '알 수 없음' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">숙제대상</span>
              <span class="info-value">{{ formatTargets(homework.targets) }}</span>
            </div>
          </div>
          <!-- new가 아닌 경우 추가 정보 -->
          <div v-if="!isNewHomework" class="homework-item-progress">
            <div class="info-row">
              <!-- 내가 완료한 날짜 -->
              <span class="info-value completed">{{ myCompletedDate }}일째</span>
              <!-- 미션 진행 되는 날짜 일수 -->
              <span class="info-value progress">{{ missionProgressDays }}일</span>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>

    <!-- new인 경우 div로 감싸기 -->
    <div v-else class="homework-item-header is-new">
      <div class="homework-item-title">
        <strong class="item-title">{{ homework.title }}</strong>
      </div>
      <div class="homework-item-date">
        <span class="period">{{ formatDate(homework.startDate) }} ~ {{ formatDate(homework.endDate) }}</span>
        <span class="date">{{ formatDays(homework.verificationDays) }}</span>
      </div>
      <div class="homework-item-info">
        <div class="homework-item-basic">
          <div class="info-row">
            <span class="info-label">개설자</span>
            <span class="info-value">{{ homework.creatorName || '알 수 없음' }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">숙제대상</span>
            <span class="info-value">{{ formatTargets(homework.targets) }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- new인 경우에만 프로필, 설명, 버튼 표시 -->
    <template v-if="isNewHomework">
      <div class="homework-item-content">
        <div class="homework-item-content-header">
          <img :src="getImageUrl" alt="개설자 프로필" class="creator-profile" />
          <span class="creator-name">{{ homework.creatorName || '개설자' }}</span>
        </div>
        <p class="homework-description">{{ homework.description }}</p>
      </div>

      <ButtonGroup class="homework-item-actions" gap="8">
        <Button btn-type="secondary" element-type="button" class="sm" @click="openRejectModal">거절</Button>
        <Button btn-type="primary" element-type="button" class="sm" @click="acceptHomework">수락</Button>
      </ButtonGroup>
    </template>

    <!-- 거절하기 모달 -->
    <Teleport to="body">
      <BottomModal
        :is-visible="isShowRejectModal"
        title="숙제를 거절하시겠어요?"
        :is-show-close-button="true"
        :is-show-cancel-button="true"
        :is-show-confirm-button="true"
        confirm-button-text="거절하기"
        cancel-button-text="취소하기"
        @close="closeRejectModal"
        @confirm="handleRejectConfirm"
        @cancel="handleRejectCancel"
      >
        <template #content>
          <div>
            <InputText v-model="rejectReason" placeholder="거절사유를 간단히 남겨주세요. (선택)" />
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </div>

  <div v-else class="homework-item empty-homework">
    <div class="empty-content">
      <p class="empty-text">등록된 숙제가 없어요:)</p>
      <p class="empty-subtext">숙제를 추가해 함께 한걸음씩 <br />더 나은 하루를 만들어봐요</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import InputText from '~/components/publishing/input/InputText.vue'

defineOptions({
  name: 'HomeworkItem'
})

interface VerificationDay {
  day: string
  isSelected: boolean
}

interface Target {
  id: string
  name: string
  isSelected: boolean
}

interface Homework {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  verificationDays: VerificationDay[]
  targets: Target[]
  createdAt: string
  status: 'active' | 'completed' | 'expired'
  progress?: number
  creatorName?: string
  creatorProfile?: string
  isNew?: boolean
  isParticipating?: boolean
  myCompletedDate?: number | 0
  missionProgressDays?: number
}

interface Props {
  homework: Homework
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'view-detail': [homeworkId: string]
  'accept-homework': [homeworkId: string]
  'reject-homework': [homeworkId: string]
}>()

const newHomework = computed(() => props.homework)

// new 숙제인지 확인
const isNewHomework = computed(() => props.homework.isNew === true)

// 참여중인지 확인
const isParticipating = computed(() => props.homework.isParticipating === true)

// 내가 완료한 날짜
const myCompletedDate = computed(() => props.homework.myCompletedDate)

// 미션 진행 일수
const missionProgressDays = computed(() => props.homework.missionProgressDays)

// 거절 모달 관련 상태
const isShowRejectModal = ref(false)
const rejectReason = ref('')

// 상태 텍스트
const getStatusText = computed(() => {
  if (isNewHomework.value) return ''

  if (props.homework.status === 'completed') return '완료된 숙제'
  if (props.homework.status === 'active' && props.homework.isParticipating) return '진행중'
  if (props.homework.status === 'active' && !props.homework.isParticipating) return '진행전'

  return '만료된 숙제'
})

// 상태 클래스
const getStatusClass = computed(() => {
  if (isNewHomework.value) return ''

  if (props.homework.status === 'completed') return 'completed'
  if (props.homework.status === 'active' && props.homework.isParticipating) return 'in-progress'
  if (props.homework.status === 'active' && !props.homework.isParticipating) return 'not-started'

  return 'expired'
})

// 프로필 이미지 경로 설정
const basePath = '/_nuxt/assets/images/'

const getImageUrl = computed(() => {
  if (props.homework.creatorProfile) {
    return `${basePath}${props.homework.creatorProfile}`
  }
  return ''
})

const formatDays = (days: VerificationDay[]) => {
  const selectedDays = days
    .filter(day => day.isSelected)
    .map(day => day.day)
    .join(', ')
  return selectedDays || '없음'
}

const formatTargets = (targets: Target[]) => {
  const selectedTargets = targets.filter(target => target.isSelected)
  const count = selectedTargets.length

  if (count === 0) return '없음'
  if (count === 1) return '1명'
  if (count === 2) return '2명'
  if (count === 3) return '3명'

  return `${count}명`
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric'
  })
}

const viewDetail = () => {
  if (newHomework.value) {
    emit('view-detail', newHomework.value.id)
  }
}

const acceptHomework = () => {
  if (newHomework.value) {
    emit('accept-homework', newHomework.value.id)
  }
}

const rejectHomework = () => {
  if (newHomework.value) {
    emit('reject-homework', newHomework.value.id)
  }
}

const openRejectModal = () => {
  isShowRejectModal.value = true
  rejectReason.value = ''
}

const closeRejectModal = () => {
  isShowRejectModal.value = false
}

const handleRejectConfirm = () => {
  if (newHomework.value) {
    emit('reject-homework', newHomework.value.id)
    closeRejectModal()
  }
}

const handleRejectCancel = () => {
  closeRejectModal()
}
</script>

<style scoped lang="scss">
// 공통 스타일 변수
$border-radius: 2.4rem;
$padding: 2.4rem 2rem 2rem;
$gap: 2rem;
$shadow: 0 0 23px 0 rgba(0, 0, 0, 0.06);

// 기본 숙제 아이템 스타일
.homework-item {
  display: flex;
  flex-direction: column;
  gap: $gap;
  width: 100%;
  padding: $padding;
  border-radius: $border-radius;
  border: 1px solid #e2e2e2;
  background: #fff;
  box-shadow: $shadow;

  // 링크가 있는 경우 (기존 숙제)
  &:has(.homework-item-link) {
    display: block;
    width: auto;
    padding: 0;
    border: none;
    border-radius: 0;
    background: none;
    box-shadow: none;
  }

  &.empty-homework {
    text-align: center;
    width: 100%;
    height: 14.2rem;
    background: #f4f4f4;
    border-radius: 1.2rem;
    border: 0;
    margin-top: 1.2rem;
    box-shadow: none;
  }
}

// 링크 스타일 (기존 숙제용)
.homework-item-link {
  display: inline-flex;
  flex-direction: column;
  gap: $gap;
  width: 100%;
  padding: $padding;
  border-radius: $border-radius;
  border: 1px solid #e2e2e2;
  background: #fff;
  box-shadow: $shadow;
  text-decoration: none;
  color: inherit;
}

// 헤더 영역
.homework-item-header {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  &.is-new {
    gap: 0;

    .item-title {
      font-size: 1.8rem;
      line-height: 2.5rem;
      text-align: left;
    }

    .homework-item-basic {
      margin-top: 1.2rem;
    }

    .homework-item-date {
      margin-top: 0.4rem;
    }
  }
}

// 제목 영역
.homework-item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;

  .item-title {
    font-weight: 700;
    line-height: 2.2rem;
    color: #2b2b2b;
    flex: 1;
  }
}

// 상태 플래그
.status-flag {
  padding: 0.3rem 0.8rem;
  border-radius: 1.1rem;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.7rem;

  &.completed {
    background: #e8f5e8;
    color: #2e7d32;
  }

  &.in-progress {
    background: #e0e9ff;
    color: #002988;
  }

  &.not-started {
    background: #fff3e0;
    color: #f57c00;
  }

  &.expired {
    background: #ffebee;
    color: #c62828;
  }
}

// 날짜 영역
.homework-item-date {
  display: flex;

  span {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #959595;

    & + span:before {
      content: '/';
      margin: 0 0.3rem;
    }
  }
}

// 정보 영역
.homework-item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.homework-item-basic {
  display: flex;
  gap: 1.2rem;

  span {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
  }

  .info-row {
    display: flex;
    text-align: right;
    gap: 0.3rem;
  }

  .info-label {
    color: #959595;
  }
}

// 진행 상황 영역
.homework-item-progress {
  display: flex;

  .info-row {
    display: flex;
    gap: 0.3rem;
  }

  span + span:before {
    content: '/';
    margin: 0 0.3rem;
  }

  .info-value {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;

    &.completed {
      color: #4c7ff7;
    }

    &.progress {
      color: #959595;
    }
  }
}

// 콘텐츠 영역 (새로운 숙제용)
.homework-item-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1.6rem;
  background: #e7f4ff;
  border: 0.1rem solid #fff;
  border-radius: 0 2rem 2rem 2rem;

  .homework-item-content-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .creator-profile {
    display: block;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .creator-name {
    line-height: 2.2rem;
    font-weight: 500;
    color: #555;
  }

  .homework-description {
    padding-left: 4rem;
    line-height: 2.2rem;
    text-align: left;
    color: #555;
  }
}

// 액션 버튼 영역
.homework-item-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

// 빈 상태 영역
.empty-content {
  .empty-text {
    font-size: 1.6rem;
    color: #666;
    margin-bottom: 0.8rem;
  }

  .empty-subtext {
    font-size: 1.2rem;
    color: #999;
  }
}
</style>
