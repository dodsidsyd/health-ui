<template>
  <BaseBody page-title="패밀리 일정" :show-back-button="true" :has-menu="true" :add-text-click-enabled="true">
    <ScheduleDetail :schedule-title="scheduleTitle" :schedule-time="scheduleTime" :alarm-text="alarmText" />
    <hr class="hr-section mt-0 mb-0 mb-0 ml-n20 mr-n20" />
    <MemberList :members="members" />
    <BottomModal
      :is-visible="isShowBottomModal"
      :is-show-cancel-button="false"
      :is-show-confirm-button="false"
      :is-show-close-button="true"
      :auto-close="true"
      @close="isShowBottomModal = false"
    >
      <template #content>
        <div class="modal-content">
          <Button
            btn-type="text"
            class="modal-btn edit-btn"
            :link-href="`/community/familycare/schedule/edit/${scheduleId}`"
            @click="isShowBottomModal = false"
          >
            수정하기
          </Button>
          <Button btnType="text" class="modal-btn delete-btn" @click="handleDelete"> 삭제하기 </Button>
        </div>
      </template>
    </BottomModal>
    <ConfirmModal
      class="modal-confirm-modal"
      :is-visible="isShowConfirmModal"
      title="일정을 삭제 하시나요?"
      content="한 번 삭제하면 되돌릴 수 없어요. [패밀리일정명]을 정말 삭제하시겠어요?"
      :is-show-cancel-button="true"
      :is-show-close-button="true"
      :is-show-confirm-button="true"
      confirm-button-text="삭제하기"
      cancel-button-text="취소"
      @confirm="isShowConfirmModal = false"
      @close="isShowConfirmModal = false"
      @cancel="isShowConfirmModal = false"
    />
  </BaseBody>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import Button from '~/components/publishing/button/Button.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import ScheduleDetail from '~/components/publishing/community/familyCare/ScheduleDetail.vue'
import MemberList from '~/components/publishing/community/familyCare/MemberList.vue'
import FamilySelectModal from '~/components/publishing/community/familyCare/FamilySelectModal.vue'

const isShowBottomModal = ref(false)
const isShowConfirmModal = ref(false)

// 일정 데이터
const scheduleTitle = ref('생신모임')
const scheduleTime = ref('4월23일 오후 06:30')
const alarmText = ref('1일전(24시간전) 알림')
const scheduleId = ref('123') // 실제로는 API에서 받아올 값

// 멤버 데이터
const members = ref([
  { name: '김동건', profileImage: 'img-community-01.png' },
  { name: '김동건', profileImage: 'img-community-01.png' },
  { name: '김동건', profileImage: 'img-community-01.png' },
  { name: '김동건', profileImage: 'img-community-01.png' },
  { name: '김동건', profileImage: 'img-community-01.png' },
  { name: '김동건', profileImage: 'img-community-01.png' }
])

// 삭제 핸들러
const handleDelete = () => {
  isShowConfirmModal.value = true
  isShowBottomModal.value = false
}

// 패밀리 선택 완료 핸들러
const handleFamilyConfirm = (selectedFamilies: any[]) => {
  console.log('선택된 패밀리들:', selectedFamilies)
  // 여기서 선택된 패밀리 정보들을 처리할 수 있습니다
}

// 메뉴 클릭 핸들러 등록
const setAddTextClickHandler = inject('setAddTextClickHandler')

onMounted(() => {
  if (setAddTextClickHandler) {
    setAddTextClickHandler(() => {
      isShowBottomModal.value = true
    })
  }
})
</script>
<style lang="scss" scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .modal-btn {
    width: 100%;
    justify-content: flex-start;
    padding: 1rem 0;
  }
}
</style>
