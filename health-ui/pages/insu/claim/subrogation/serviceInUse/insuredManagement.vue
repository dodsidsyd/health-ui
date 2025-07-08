<template>
  <BaseBody>
    <h1>청구할 피보험자를 선택해 주세요</h1>

    <div style="display: flex">
      <button
        style="border-bottom: 1px solid gray; padding: 1rem 3rem; width: 100%"
        :style="selectedTab === 'customer' ? 'border-bottom: 3px solid blue' : ''"
        @click="clickTab('customer')"
      >
        고객
      </button>
      <button
        style="border-bottom: 1px solid gray; padding: 1rem 3rem; width: 100%"
        :style="selectedTab === 'etc' ? 'border-bottom: 3px solid blue' : ''"
        @click="clickTab('etc')"
      >
        나의 가족/제3자
      </button>
    </div>

    <!-- 설계사, 가족/제3자인 경우 셀렉트 박스 노출 X -->
    <div
      style="padding: 1rem; border: 1px solid gainsboro; border-radius: 10px; margin-top: 1rem"
      @click="isShowAgentModal = true"
    >
      {{ selectedAgent.label }}
    </div>

    <div>
      <div style="display: flex; justify-content: space-between; margin-top: 1rem" @click="isShowFilterModal = true">
        <div>총 3명</div>
        <div>전체.KB손해보험</div>
      </div>

      <div
        style="
          display: flex;
          flex-direction: column;
          border: 1px solid gainsboro;
          padding: 1rem;
          border-radius: 10px;
          margin-top: 0.25rem;
        "
      >
        <div style="display: flex; justify-content: space-between">
          <div>
            <div>김레몬</div>
            <div>010****5555</div>
          </div>
          <button class="c-btn" style="width: 10%" @click="clickClaim">청구하기</button>
        </div>
        <div style="display: flex; gap: 0.75rem; margin-top: 10px">
          <span style="border: 1px solid #2f69f0; color: #2f69f0; padding: 3px 5px; border-radius: 10px"
            >KB손해보험</span
          >
          <span style="border: 1px solid #2f69f0; color: #2f69f0; padding: 3px 5px; border-radius: 10px">삼성화재</span>
          <span style="border: 1px solid #2f69f0; color: #2f69f0; padding: 3px 5px; border-radius: 10px"
            >DB손해보험</span
          >
        </div>
        <div style="background-color: #ecf0f1; color: #7b7b7b; border-radius: 7px; padding: 1rem; margin-top: 1rem">
          메모메모메모메모메모메모
        </div>
      </div>
    </div>

    <button class="c-btn" style="width: 50%; background-color: #368e6e; margin-top: 25px" @click="movePage">
      {{ selectedTab === 'customer' ? '고객 추가' : '나의 가족/제3자 추가' }}
    </button>
  </BaseBody>

  <!-- 설계사 선택 모달 -->
  <BottomModal
    title="설계사를 선택해 주세요"
    :is-visible="isShowAgentModal"
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    @close="isShowAgentModal = false"
  >
    <template #content>
      <template style="display: flex; flex-direction: column; gap: 0.75rem">
        <button v-for="item in agentList" :key="item.id" class="c-btn outline" @click="selectAgent(item)">
          {{ item.label }}
        </button>
      </template>
    </template>
  </BottomModal>

  <!-- 조회 조건 검색 모달 -->
  <BottomModal
    title="조회조건을 설정해 주세요"
    :is-visible="isShowFilterModal"
    :is-show-cancel-button="false"
    @close="isShowFilterModal = false"
  >
    <template #content>
      <div style="text-align: left; font-weight: bold">대리청구 상태</div>
      <div style="display: flex; gap: 1rem">
        <span style="border: 1px solid #7b7b7b; padding: 0.25rem 1rem; border-radius: 7px">전체</span>
        <span style="border: 1px solid #7b7b7b; padding: 0.25rem 1rem; border-radius: 7px">청구 가능</span>
        <span style="border: 1px solid #7b7b7b; padding: 0.25rem 1rem; border-radius: 7px">서명 요청</span>
        <span style="border: 1px solid #7b7b7b; padding: 0.25rem 1rem; border-radius: 7px">서명 대기</span>
      </div>

      <div style="text-align: left; font-weight: bold; margin-top: 1rem">보험사</div>
      <div style="display: flex; gap: 1rem">
        <span style="border: 1px solid #7b7b7b; padding: 2rem; border-radius: 7px">전체</span>
        <span style="border: 1px solid #7b7b7b; padding: 2rem; border-radius: 7px">보험사명</span>
        <span style="border: 1px solid #7b7b7b; padding: 2rem; border-radius: 7px">보험사명</span>
        <span style="border: 1px solid #7b7b7b; padding: 2rem; border-radius: 7px">보험사명</span>
      </div>
    </template>
  </BottomModal>

  <FullModal
    title="피보험자 편집"
    :is-visible="isShowEditFullModal"
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    @close="closeEditFullModal"
  >
    <template #content>
      <div>전체선택</div>
      <div style="border: 1px solid grey">
        <div style="display: flex">
          <div>김레몬</div>
          <button class="c-btn" style="width: 10%" @click="editInsuredData">편집</button>
        </div>
        <div>010****5555</div>
      </div>
    </template>
  </FullModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import { HEADER_UTILS_BUTTON } from '~/constants/header.constants'
import { BottomModal, FullModal } from '@lemonhc/fo-ui/components/modal'

definePageMeta({
  title: '대리청구/피보험자 관리',
  utils: [HEADER_UTILS_BUTTON.SEARCH, HEADER_UTILS_BUTTON.EDIT]
})

const agentList = ref([
  { id: 'all', label: '전체', value: 'all' },
  { id: '1', label: '설계사1', value: 1 },
  { id: '2', label: '설계사2', value: 2 },
  { id: '3', label: '설계사3', value: 3 },
  { id: '4', label: 'agent4', value: 4 }
])

const selectedTab = ref<'customer' | 'etc'>('customer')
const isShowAgentModal = ref(false)
const isShowFilterModal = ref(false)
const selectedAgent = ref<any>(agentList.value[0])

const isShowEditFullModal = computed(() => {
  return false
})
const closeEditFullModal = () => {
  return false
}

const clickTab = (tab: 'customer' | 'etc') => {
  selectedTab.value = tab
}

const selectAgent = (selectValue: any) => {
  selectedAgent.value = selectValue
  isShowAgentModal.value = false
}

const clickClaim = () => {
  // 보안키패드 모달 띄우기
  navigateTo('/insu/claim/subrogation/serviceInUse/selectInsuranceCompany')
}

const movePage = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/addInsuredData')
}

const editInsuredData = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/EditInsuredData')
}
</script>

<style scoped lang="scss"></style>
