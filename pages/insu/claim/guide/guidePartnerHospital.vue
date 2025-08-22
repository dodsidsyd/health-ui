<template>
  <BaseBody :show-back-button="true" page-title="제휴병원 안내" logo-type="text" :has-close-btn="true" class="pb-36">
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" />

    <!-- 통원 -->
    <FlexSection v-if="lineActiveIndex === 0" class="mt-20 flex-1">
      <InputText inp-type="search" :placeholder="'병원 이름 검색'" />
      <FlexRowDiv class="gap-12 justify-end pd-20y">
        <Checkbox id="checkBox1" v-model="checkbox1" :aria-label="'서류없이 청구'" />
        <Checkbox id="checkBox2" v-model="checkbox2" :aria-label="'MY병원'" />
      </FlexRowDiv>
      <PartnerHospitalItem :hospitals="hospitals1" />
      <EmptyResult v-if="hospitals1 && hospitals1.length === 0" :title="'검색 결과가 없어요.'" :is-absolute="true">
        <div class="text-center mt-8" style="color: #555">
          병원 이름을 잘못 입력했거나<br />
          아직 제휴 전인 병원이예요.
        </div>
      </EmptyResult>
    </FlexSection>

    <!-- 입원 -->
    <FlexSection v-if="lineActiveIndex === 1" class="mt-20 flex-1">
      <FlexRowDiv class="gap-8 justify-end pb-12">
        <Select
          class="insurance-select"
          select-placeholder="보험사 선택"
          style="width: 14.8rem; flex-shrink: 0"
          @click="openInsuranceModal"
        />
        <InputText inp-type="search" :placeholder="'병원 이름 검색'" />
      </FlexRowDiv>
      <InfoText :text="'입원비를 청구하시려면 진단서가 준비되어 있어야 해요.'" />
      <FlexRowDiv class="gap-12 justify-end pd-20y">
        <Checkbox id="checkBox3" v-model="checkbox3" :aria-label="'서류없이 청구'" />
        <Checkbox id="checkBox4" v-model="checkbox4" :aria-label="'MY병원'" />
      </FlexRowDiv>
      <PartnerHospitalItem :hospitals="hospitals2" />
      <EmptyResult v-if="hospitals2 && hospitals2.length === 0" :title="'검색 결과가 없어요.'" :is-absolute="true">
        <div class="text-center mt-8" style="color: #555">
          병원 이름을 잘못 입력했거나<br />
          아직 제휴 전인 병원이예요.
        </div>
      </EmptyResult>
    </FlexSection>

    <!-- 의료영상공유 -->
    <FlexSection v-if="lineActiveIndex === 2" class="mt-20 flex-1">
      <InputText inp-type="search" :placeholder="'병원 이름 검색'" />
      <PartnerHospitalItem :hospitals="hospitals3" :has-btn="false" :has-line="false" />
      <EmptyResult v-if="hospitals3 && hospitals3.length === 0" :title="'검색 결과가 없어요.'" :is-absolute="true">
        <div class="text-center mt-8" style="color: #555">
          병원 이름을 잘못 입력했거나<br />
          아직 제휴 전인 병원이예요.
        </div>
      </EmptyResult>
    </FlexSection>
  </BaseBody>
  <!-- 보험사 선택 모달 -->
  <BottomModal
    :is-visible="isShowInsuranceModal"
    title="보험사를 선택해 주세요."
    :is-show-cancel-button="false"
    :is-show-confirm-button="true"
    confirm-button-text="확인"
    @close="closeInsuranceModal"
    @confirm="selectInsurance"
  >
    <template #content>
      <InsuranceSelectionModal
        :round-tabs="roundTabs"
        :active-round-tab="activeRoundTab"
        :insurance-companies="insuranceCompanies"
        :selected-insurance="selectedInsurance"
        @tab-change="onRoundTabChange"
        @select-option="selectInsuranceOption"
    /></template>
  </BottomModal>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'

import InputText from '~/components/publishing/input/InputText.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import PartnerHospitalItem, { type Hospital } from '~/components/insu/PartnerHospitalItem.vue'
import InsuranceSelectionModal from '~/components/insu/InsuranceSelectionModal.vue'
import Select from '~/components/publishing/input/Select.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import InfoText from '~/components/insu/InfoText.vue'
import EmptyResult from '~/components/publishing/wholeMenu/EmptyResult.vue'
// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '통원', code: 'outpatient-care' },
  { name: '입원', code: 'inpatient-care' },
  { name: '의료영상공유', code: 'medical-video' }
]
// LineTabs 초기 선택값
const lineActiveIndex = ref(0)
// LineTabs 탭 이동 이벤트
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
}
// RoundTabs 상태 관리
const activeRoundTab = ref('option1')
// RoundTabs 데이터
const roundTabs = ref([
  { title: '손해보험', key: 'option1' },
  { title: '생명보험', key: 'option2' }
])

// RoundTabs 이벤트 핸들러
const onRoundTabChange = (key: string) => {
  activeRoundTab.value = key
}
// 체크박스 상태 관리
const checkbox1 = ref(false)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(false)

// 보험사 선택 모달 관련
const isShowInsuranceModal = ref(false)
const selectedInsurance = ref<{ value: string; label: string } | null>(null)

const openInsuranceModal = () => {
  isShowInsuranceModal.value = true
}
const closeInsuranceModal = () => {
  isShowInsuranceModal.value = false
}
const selectInsuranceOption = (insurance: { value: string; label: string }) => {
  selectedInsurance.value = insurance
}
const selectInsurance = () => {
  if (selectedInsurance.value) {
    // Select 컴포넌트의 값 업데이트
    updateSelectInsuranceValue(selectedInsurance.value)
    closeInsuranceModal()
  }
}
// Select 컴포넌트의 보험사 값 업데이트 함수
const updateSelectInsuranceValue = (insurance: { value: string; label: string }) => {
  // Select 컴포넌트의 표시 값 업데이트
  const selectElement = document.querySelector('.c-select')
  if (selectElement) {
    const selectDisplay = selectElement.querySelector('.select-display')
    if (selectDisplay) {
      selectDisplay.textContent = insurance.label
    }
  }
}
// 통원 데이터
const hospitals1 = ref<Hospital[]>([
  {
    id: 1,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    badges: [
      { text: 'MY병원', variant: 'solid', class: 'badge-cobalt' },
      { text: '서류없이청구', class: 'badge-blue' },
      { text: '사진찍어청구' }
    ]
  },
  {
    id: 2,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    badges: [{ text: 'MY병원', variant: 'solid', class: 'badge-cobalt' }, { text: '사진찍어청구' }]
  },
  {
    id: 3,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    badges: [{ text: '사진찍어청구' }]
  },
  {
    id: 4,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    badges: [{ text: '사진찍어청구' }]
  },
  {
    id: 5,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    badges: [{ text: '사진찍어청구' }]
  },
  {
    id: 6,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    badges: [{ text: '사진찍어청구' }]
  }
])
// 입원 데이터
const hospitals2 = ref<Hospital[]>([
  {
    id: 1,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    method: '청구의 신, 병원 홈페이지',
    badges: [
      { text: 'MY병원', variant: 'solid', class: 'badge-cobalt' },
      { text: '서류없이청구', class: 'badge-blue' },
      { text: '사진찍어청구' }
    ]
  },
  {
    id: 2,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    method: '청구의 신, 병원 홈페이지',
    badges: [{ text: 'MY병원', variant: 'solid', class: 'badge-cobalt' }, { text: '사진찍어청구' }]
  },
  {
    id: 3,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    method: '청구의 신, 병원 홈페이지',
    badges: [{ text: '사진찍어청구' }]
  },
  {
    id: 4,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    method: '청구의 신, 병원 홈페이지',
    badges: [{ text: '사진찍어청구' }]
  },
  {
    id: 5,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    method: '청구의 신, 병원 홈페이지',
    badges: [{ text: '사진찍어청구' }]
  },
  {
    id: 6,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100',
    method: '청구의 신, 병원 홈페이지',
    badges: [{ text: '사진찍어청구' }]
  }
])
// 의료영상공유 데이터
const hospitals3 = ref<Hospital[]>([
  {
    id: 1,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  },
  {
    id: 2,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  },
  {
    id: 3,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  },
  {
    id: 4,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  },
  {
    id: 5,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  },
  {
    id: 6,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  }
])

// 보험사 옵션 정의
const insuranceCompanies = ref([
  { value: 'db-damage', label: 'DB손해' },
  { value: 'db-damage2', label: 'DB손해' },
  { value: 'db-damage3', label: 'DB손해' },
  { value: 'db-damage4', label: 'DB손해' },
  { value: 'db-damage5', label: 'DB손해' },
  { value: 'db-damage6', label: 'DB손해' },
  { value: 'db-damage7', label: 'DB손해' },
  { value: 'db-damage8', label: 'DB손해' },
  { value: 'db-damage9', label: 'DB손해' }
])

// 컴포넌트 마운트 후 은행 선택 부분 클릭 이벤트 오버라이드
onMounted(async () => {
  await nextTick()
  // InputSearch 내부의 Select 컴포넌트 모달 비활성화
  const inputSearchElement = document.querySelector('.insurance-select')
  if (inputSearchElement) {
    // Select 컴포넌트의 모든 클릭 이벤트를 가로채기
    const selectElements = inputSearchElement.querySelectorAll('.custom-select')
    selectElements.forEach(element => {
      const htmlElement = element as HTMLElement
      // 기존 이벤트 리스너 제거
      const newElement = htmlElement.cloneNode(true) as HTMLElement
      htmlElement.parentNode?.replaceChild(newElement, htmlElement)
      // 새로운 클릭 이벤트 추가
      newElement.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        openInsuranceModal()
        return false
      })
    })
    // Select 컴포넌트의 모달 비활성화를 위한 데이터 속성 추가
    selectElements.forEach(element => {
      element.setAttribute('data-modal-disabled', 'true')
    })

    // 모달 요소들을 직접 비활성화
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          // 새로 추가된 모달 요소들을 찾아서 비활성화
          const modals = document.querySelectorAll('.c-modal.bottom')
          modals.forEach(modal => {
            if (modal.querySelector('.select-options')) {
              // Select 컴포넌트의 모달인 경우 숨기기
              modal.remove()
            }
          })
        }
      })
    })

    // DOM 변경 감지 시작
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  }
})
</script>

<style scoped lang="scss"></style>
