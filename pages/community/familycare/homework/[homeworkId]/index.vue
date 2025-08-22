<template>
  <BaseBody :show-back-button="true" page-title="패밀리 숙제">
    <HomeWorkTop title="비타민C 영양제 먹기" duration="4월 16일 ~ 5월 17일 / 매일" />

    <hr class="hr-section mt-24 mb-32 ml-n20 mr-n20" />

    <BoxedTabs :tabs="boxTabs" :active-key="activeBoxTab" variant="fill-type" @tab-change="onBoxTabChange" />

    <!-- 달성률 -->
    <AchievementRate :target-width="30" steps-text="3/10" />

    <!-- 숙제 달력 -->
    <DatePicker
      class="mt-24"
      :vital-homework="true"
      :vital-homework-data="homeworkData"
      :homework-start-date="startDate"
      :homework-end-date="endDate"
      @homework-click="handleHomeworkClick"
    />
    <!-- 하단 고정 영역 -->
    <ButtonGroup v-if="!isFieldsetFocused" class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg medium btn-sticky" @click="showDeleteConfirm">
        삭제하기
      </Button>
      <Button btn-type="primary" element-type="button" class="lg medium btn-sticky"> 수정하기 </Button>
    </ButtonGroup>

    <!-- 삭제 모달 -->
    <ConfirmModal
      :is-visible="isShowConfirmModal"
      title="숙제를 삭제하시나요?"
      :content="deleteConfirmMessage"
      :is-show-cancel-button="true"
      :is-show-close-button="true"
      :is-show-confirm-button="true"
      confirm-button-text="삭제하기"
      cancel-button-text="취소"
      class="modal-confirm-modal"
      @confirm="confirmDelete"
      @close="closeModal"
      @cancel="cancelDelete"
    />

    <!-- 숙제 완료 팝업 영역 -->
    <Teleport to="body">
      <BottomModal
        v-bind="homeworkCompleteModalProps"
        :is-visible="isShowBottomModal"
        @confirm="clickConfirm"
        @close="toggleBottomModal"
      >
        <template #content>
          <slot name="modal-content">
            <!-- 완료 문의 (숙제가 완료되지 않은 경우) -->
            <div v-if="currentHomeworkStatus !== 'completed'" class="ask-complete">
              <div class="ask-wrap">
                <i class="icon icon-info"></i>
                <h5 class="tit">숙제를 완료하시겠어요?</h5>
              </div>
              <InputText v-model="currentHomeworkMemo" :placeholder="'한 줄 메모를 입력해 주세요.(선택)'" />
            </div>
            <!-- 완료 확인 (숙제가 이미 완료된 경우) -->
            <div v-else class="confirm-complete">
              <div class="complete-wrap">
                <i class="icon icon-info"></i>
                <h5 class="tit">숙제를 완료했어요!</h5>
              </div>
              <p v-if="currentHomeworkMemo" class="homework-txt">{{ currentHomeworkMemo }}</p>
              <p v-else class="homework-txt">메모가 없습니다.</p>
            </div>
          </slot>
        </template>
      </BottomModal>

      <!-- 숙제 관련 토스트 팝업 -->
      <BottomToast v-model="showToastMessage" :duration="1000">
        <template #default>
          <p class="text-center">숙제를 완료하였어요!</p>
        </template>
      </BottomToast>

      <BottomToast v-model="showFutureWarningToast" :duration="1000">
        <template #default>
          <p class="text-center">미래의 숙제는 진행할 수 없어요!</p>
        </template>
      </BottomToast>

      <BottomToast v-model="showOutOfRangeToast" :duration="1000">
        <template #default>
          <p class="text-center">숙제 기간이 아닌 날짜에요!</p>
        </template>
      </BottomToast>

      <BottomToast v-model="showDeleteToast" :duration="1500">
        <template #default>
          <p class="text-center">숙제가 삭제되었어요.</p>
        </template>
      </BottomToast>
    </Teleport>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import DatePicker from '~/components/publishing/input/DatePicker.vue'

import HomeWorkTop from '~/components/publishing/community/familyCare/HomeWorkTop.vue'
import AchievementRate from '~/components/publishing/community/familyCare/AchievementRate.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import BottomToast from '~/components/common/bottomToast.vue'

const activeBoxTab = ref('me')

const boxTabs = ref<BoxTab[]>([
  { title: '나', key: 'me' },
  { title: '엄마', key: 'mother' },
  { title: '큰 딸', key: 'old daughter' },
  { title: '작은 딸', key: 'young daughter' }
])

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
}

// ConfirmModal 상태 관리 (자체 상태로 변경)
const isShowConfirmModal = ref(false)
const isFieldsetFocused = ref(false) // isFieldsetFocused도 정의 추가

// Toast 메시지 상태
const showToastMessage = ref(false)
const showFutureWarningToast = ref(false)
const showOutOfRangeToast = ref(false)
const showDeleteToast = ref(false)

// 모달 메시지 (줄바꿈 포함)
const deleteConfirmMessage = `한 번 삭제하면 되돌릴 수 없어요.
[건강 숙제명]을 정말 삭제하시겠어요?`

// 모달 표시 함수
const showDeleteConfirm = () => {
  isShowConfirmModal.value = true
}

// 삭제 확인 함수
const confirmDelete = () => {
  isShowConfirmModal.value = false

  // 삭제 완료 토스트 표시
  showDeleteToast.value = true
}

// 모달 닫기 함수
const closeModal = () => {
  isShowConfirmModal.value = false
}

// 삭제 취소 함수
const cancelDelete = () => {
  isShowConfirmModal.value = false
}
// 숙제 캘린더
const selectedDate = ref(new Date())
const startDate = ref('2025-08-07')
const endDate = ref('2025-08-25')
const homeworkData = ref({
  '2025-08-07': { status: 'completed', task: '건강 숙제', memo: '원래먹던 비타민과 다른 비타민을 먹었다' }
})

// 현재 선택된 날짜의 숙제 상태
const currentHomeworkStatus = ref(null)
const currentHomeworkMemo = ref('')
const selectedDateKey = ref('')

const handleHomeworkClick = info => {
  console.log('숙제 클릭:', info)

  // 클릭한 날짜의 키 생성 (YYYY-MM-DD 형식)
  const year = info.date.getFullYear()
  const month = String(info.date.getMonth() + 1).padStart(2, '0')
  const day = String(info.date.getDate()).padStart(2, '0')
  selectedDateKey.value = `${year}-${month}-${day}`

  // 날짜 범위 체크를 위한 날짜 객체 생성
  const clickedDate = new Date(info.date)
  clickedDate.setHours(0, 0, 0, 0)

  const start = new Date(startDate.value)
  start.setHours(0, 0, 0, 0)

  const end = new Date(endDate.value)
  end.setHours(0, 0, 0, 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 숙제 범위 밖의 날짜 체크
  if (clickedDate < start || clickedDate > end) {
    console.log('숙제 범위 밖의 날짜:', selectedDateKey.value)
    showOutOfRangeToast.value = true
    return // 모달을 열지 않고 종료
  }

  // 미래 날짜 체크 (숙제 범위 내에서도 오늘보다 미래인 경우)
  if (clickedDate > today) {
    console.log('미래 날짜 클릭:', selectedDateKey.value)
    showFutureWarningToast.value = true
    return // 모달을 열지 않고 종료
  }

  // 해당 날짜의 숙제 데이터 확인
  const homeworkInfo = homeworkData.value[selectedDateKey.value]

  if (homeworkInfo) {
    currentHomeworkStatus.value = homeworkInfo.status
    currentHomeworkMemo.value = homeworkInfo.memo || ''
  } else {
    currentHomeworkStatus.value = null
    currentHomeworkMemo.value = ''
  }

  toggleBottomModal()
}

// 숙제 완료 바텀 모달
const isShowBottomModal = ref(false)
const homeworkCompleteModalProps = computed(() => {
  return {
    title: currentHomeworkStatus.value === 'completed' ? '숙제 완료 확인' : '숙제 완료',
    isShowCloseButton: true,
    isShowCancelButton: false,
    // isShowConfirmButton: currentHomeworkStatus.value !== 'completed', // 완료된 경우 저장 버튼 숨김
    confirmButtonText: currentHomeworkStatus.value === 'completed' ? '확인' : '저장하기',
    disabledCancelButton: false,
    disabledConfirmButton: false
  }
})
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickConfirm = () => {
  // 숙제 완료 처리 로직
  console.log('숙제 완료 저장')

  // 숙제가 아직 완료되지 않은 경우, 완료 상태로 변경
  if (currentHomeworkStatus.value !== 'completed') {
    homeworkData.value[selectedDateKey.value] = {
      status: 'completed',
      task: '건강 숙제',
      memo: currentHomeworkMemo.value
    }
    console.log(`${selectedDateKey.value} 숙제 완료 처리:`, currentHomeworkMemo.value)

    // 토스트 메시지 표시
    showToastMessage.value = true
  } else {
    // 이미 완료된 숙제의 경우 메모 업데이트
    if (homeworkData.value[selectedDateKey.value]) {
      homeworkData.value[selectedDateKey.value].memo = currentHomeworkMemo.value
      console.log(`${selectedDateKey.value} 메모 업데이트:`, currentHomeworkMemo.value)
    }
  }

  isShowBottomModal.value = false
}
</script>

<style lang="scss" scoped>
.ask-complete {
  .ask-wrap {
    display: flex;
    flex-direction: column;
    gap: 1.6rem 0;
    margin-bottom: 2rem;
    .icon-info {
      width: 8rem;
      height: 8rem;
      display: block;
      margin: auto;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      background-image: url(~/assets/images/community/ico-complete-ask.svg);
    }
    .tit {
      font-size: 1.8rem;
      font-weight: 500;
      color: #555;
    }
  }
}
.confirm-complete {
  .complete-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.8rem 0;
    margin-bottom: 4rem;
    .icon-info {
      width: 12.8rem;
      height: 12.8rem;
      display: block;
      margin: auto;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      background-image: url(~/assets/images/community/ico-complete.svg);
    }
    .tit {
      font-size: 2.4rem;
      font-weight: 700;
      color: #2b2b2b;
    }
  }
  .homework-txt {
    font-size: 1.6rem;
    color: #555;
    font-weight: 400;
    margin-bottom: 1.6rem;
  }
}
</style>
