<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구/수익자 정보 변경"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    
    <div class="wrap-form">
      <div class="wrap-form-tit">
        <div class="form-tit">피보험자(치료받은 분)</div>
      </div>
      <div class="custom-select-container">
        <div class="custom-select-display" @click="openCustomSelect">
          <span class="fixed-label">설계사</span>
          <div class="separator"></div>
          <span class="selected-value">{{ selectedAgentLabel }}</span>
          <i class="custom-arrow" :class="{ open: isShowCustomSelect }"></i>
        </div>
      </div>
      <!-- 커스텀 Select 모달 -->
      <BottomModal
        title="설계사를 선택해 주세요"
        :is-visible="isShowCustomSelect"
        :is-show-cancel-button="false"
        :is-show-confirm-button="false"
        @close="closeCustomSelect"
      >
        <template #content>
          <div class="custom-select-options">
            <div
              v-for="option in selectOptions"
              :key="option.value"
              :class="['custom-option-item', { selected: selectedAgentValue === option.value }]"
              @click="selectCustomOption(option)"
            >
              <span class="option-label">{{ option.label }}</span>
              <i v-if="selectedAgentValue === option.value" class="check-icon">✓</i>
            </div>
          </div>
        </template>
      </BottomModal>
      <InputText
        label="피보험자 이름"
        class="require"
        :is-valid="true"
        valid-text="피보험자 이름을 입력해주세요."
        placeholder="피보험자 이름을 입력해 주세요."
      />
      <InputText
        label="피보험자 휴대폰 번호"
        class="require"
        :is-valid="true"
        valid-text="피보험자 휴대폰 번호를 입력해주세요."
        placeholder="휴대폰 번호를 입력해주세요."
      />
      <InputText
        label="피보험자 생년월일"
        class="require"
        :is-valid="true"
        valid-text="피보험자의 생년월일을 입력해주세요."
        placeholder="생년월일 6자리 입력"
      />
      <div class="wrap-gender">
        <div class="input-tit required">피보험자 성별</div>
        <div class="wrap-radio">
          <Radio id="rdo1" name="rdo1" checked custom-style="button small w-full" aria-label="남성" />
          <Radio id="rdo2" name="rdo1" custom-style="button small w-full" aria-label="여성" />
        </div>
      </div>
      <InputAddress label="피보험자 주소" :is-valid="false" class="require" placeholder="주소를 검색하세요" />
    </div>
    <hr class="hr-section ml-n20 mr-n20" />
    <div class="wrap-form">
      <div class="wrap-form-tit">
        <div class="form-tit">수익자(보험금 받는분)</div>
        <Checkbox class="checkbox-beneficiary" id="checkBox2" custom-style="small" ariaLabel="피보험자와 수익자가 다름" />
      </div>
      <InputText
        label="수익자 이름"
        class="require"
        :is-valid="true"
        valid-text="수익자 이름을 입력해주세요."
        placeholder="수익자 이름을 입력해 주세요."
      />
      <!-- 주민번호 -->
      <div class="resident-id-form-group">
        <label for="resident-id-front" class="resident-id-label required">주민등록번호</label>
        <div class="resident-id-inputs">
          <input
            id="resident-id-front"
            v-model="residentIdFront"
            type="tel"
            class="resident-id-input"
            maxlength="6"
            placeholder="생년월일 6자리"
            inputmode="numeric"
            aria-label="주민등록번호 앞 6자리"
          />
          <span class="resident-id-hyphen">-</span>
          <input
            id="resident-id-back"
            v-model="residentIdBack"
            type="tel"
            class="resident-id-input"
            maxlength="7"
            placeholder="뒷자리 입력"
            inputmode="numeric"
            aria-label="주민등록번호 뒤 7자리"
          />
        </div>
      </div>
      <InputText
        label="수익자 휴대폰 번호"
        class="require"
        :is-valid="true"
        valid-text="수익자 휴대폰번호를 입력해주세요."
        placeholder="수익자 휴대폰번호를 입력해 주세요."
      />
      <InputText
        label="피보험자와의 관계"
        class="require"
        :is-valid="true"
        valid-text="피보험자와의 관계을 입력해주세요."
        placeholder="피보험자와의 관계을 입력해 주세요."
      />
    </div>
    <hr class="hr-section ml-n20 mr-n20" />
    <div class="wrap-add-insurance">
      <div class="wrap-insurance-header">
        <div class="text">보험사</div>
        <Button btn-type="line" element-type="button" aria-label="보험사 추가" class="xs" icon="ico-plus" :width="11.3" />
      </div>
      <div class="wrap-insurance-list">
        <div class="item">
          <div class="item-header">
            <div class="text">보험사 01</div>
            <button type="button" class="c-modal-close-btn" aria-label="닫기">
              <i class="icon close"></i>
            </button>
          </div>
          <Select class="insurance-select" select-placeholder="보험사 선택" @click="openInsuranceModal" />
          <InputSearch
            class="bank-account"
            selectPlaceholder="은행선택" 
            placeholder="계좌번호 입력" 
            modal-title="은행선택"
            :custom-search-options="bankOptions"
            :hide-search-icon="true"
            @select="onBankSelect"
          />
        </div>
        <div class="item">
          <div class="item-header">
            <div class="text">보험사 01</div>
            <button type="button" class="c-modal-close-btn" aria-label="닫기">
              <i class="icon close"></i>
            </button>
          </div>
          <Select class="insurance-select" select-placeholder="보험사 선택" @click="openInsuranceModal" />
          <InputSearch
            class="bank-account"
            selectPlaceholder="은행선택" 
            placeholder="계좌번호 입력" 
            modal-title="은행선택"
            :custom-search-options="bankOptions"
            :hide-search-icon="true"
            @select="onBankSelect"
          />
        </div>
      </div>
      <InputText
        label="메모"
        class="optional"
        :is-valid="true"
        valid-text="메모할 내용을 입력해주세요."
        placeholder="내용을 입력해 주세요."
      />
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="secondary" element-type="button" aria-label="삭제" class="lg btn-sticky" />
    <Button btn-type="primary" element-type="button" aria-label="저장" class="lg w-full medium btn-sticky" @click="clickNext" />
  </ButtonGroup>
  
  <!-- 은행 선택 모달 -->
  <BottomModal
    :is-visible="isShowBankModal"
    title="은행선택"
    :is-show-cancel-button="false"
    :is-show-confirm-button="true"
    confirm-button-text="확인"
    @close="closeBankModal"
    @confirm="selectBank"
  >
    <template #content>
      <div class="bank-selection-modal">
        <div class="bank-grid">
          <button
            v-for="bank in bankOptions"
            :key="bank.value"
            class="bank-option"
            :class="{ 'selected': selectedBank?.value === bank.value }"
            @click="selectBankOption(bank)"
          >
            <div class="bank-logo">
              <img src="/assets/images/insu/logo-alert-db.png" alt="DB" />
            </div>
            <div class="bank-name">{{ bank.label }}</div>
          </button>
        </div>
      </div>
    </template>
  </BottomModal>
  
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
      <div class="insurance-selection-modal">
        <RoundTabs :tabs="roundTabs" :active-key="activeRoundTab" @tab-change="onRoundTabChange" />
        <div class="insurance-grid">
          <button
            v-for="insurance in insuranceCompanies"
            :key="insurance.value"
            class="insurance-option"
            :class="{ 'selected': selectedInsurance?.value === insurance.value }"
            @click="selectInsuranceOption(insurance)"
          >
            <div class="insurance-logo">
              <img src="/assets/images/insu/logo-alert-db.png" alt="DB" />
            </div>
            <div class="insurance-name">{{ insurance.label }}</div>
          </button>
        </div>
      </div>
    </template>
  </BottomModal>
  
  <BottomModal
    :is-visible="isShowModal"
    title="안내"
    
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    @close="isShowModal = false"
    @cancel="clickDiff"
    @confirm="clickSame" 
  >
    <template #content>
      <div style="font-size:1.6rem;font-weight: 700;text-align:left;color:#000;">김레몬님께 청구에 필요한 개인정보 활용동의<br />알림톡을 발송합니다.</div>
      <div style="padding:0.7rem 1.6rem;border: 0.1rem solid #E2E2E2;border-radius: 0.4rem;margin-top: 1.6rem;display: flex;justify-content: space-between;align-items: center;">
        <div style="font-weight: 500;">김레몬 010-1234-5678</div>
        <button style="padding: 0.7rem 1.4rem;color:#555555;font-size: 1.4rem;border-radius: 0.4rem;border:0.1rem solid #E2E2E2;">변경</button>
      </div>
      <div style="font-size:1.3rem;color:#F14960;margin-top:0.6rem;text-align:left;margin:0.6rem 0.6rem 0;">반드시 고객 동의 및 서명이 이루어져야 대리청구를 진행할 수 있습니다.</div>
      <div style="display: flex;justify-content: space-between;align-items: center;gap:0.8rem;margin-top: 2rem;">
        <button style="border-radius:0.6rem;padding:1.3rem 2.5rem;background-color:#E8E8E8;color:#555555;width:100%;font-weight: 500;">나중에 보내기</button>
        <button style="border-radius:0.6rem;padding:1.3rem 2.5rem;background-color:#4C7FF7;color:#ffffff;width:100%;font-weight: 500;">알림톡 보내기</button>
      </div>
    </template>
  </BottomModal>
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
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import InputSearch from '~/components/publishing/input/InputSearch.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import Select from '~/components/publishing/input/Select.vue'
import RoundTabs, { type RoundTab } from '~/components/tabbar/RoundTabs.vue'
import Radio from '~/components/publishing/input/radio.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
import { ref, computed, onMounted, nextTick } from 'vue'


const isShowModal = ref(false)
const checkbox1 = ref(false)

const agentList = ref([
  { id: 'all', label: '전체', value: 'all' },
  { id: '1', label: '설계사1', value: 1 },
  { id: '2', label: '설계사2', value: 2 },
  { id: '3', label: '설계사3', value: 3 },
  { id: '4', label: 'agent4', value: 4 }
])

// Select 컴포넌트용 옵션들
const selectOptions = ref([
  { value: '전체보기', label: '전체보기' },
  { value: '설계사1', label: '설계사1' },
  { value: '설계사2', label: '설계사2' },
  { value: '설계사3', label: '설계사3' },
  { value: '설계사4', label: '설계사4' },
  { value: '설계사5', label: '설계사5' },
])
const isShowAgentModal = ref(false)
const selectedAgent = ref<any>(agentList.value[0])


// 커스텀 Select 컴포넌트용 상태
const selectedAgentValue = ref('전체보기')
const selectedAgentLabel = ref('전체보기')
const isShowCustomSelect = ref(false)

const openCustomSelect = () => {
  isShowCustomSelect.value = true
}

const closeCustomSelect = () => {
  isShowCustomSelect.value = false
}

const selectCustomOption = (option: any) => {
  selectedAgentValue.value = option.value
  selectedAgentLabel.value = option.label
  selectedAgent.value = option
  closeCustomSelect()
}

// 은행 선택 모달 관련
const isShowBankModal = ref(false)
const selectedBank = ref<{ value: string; label: string } | null>(null)

// 보험사 선택 모달 관련
const isShowInsuranceModal = ref(false)
const selectedInsurance = ref<{ value: string; label: string } | null>(null)

// RoundTabs 상태 관리
const activeRoundTab = ref('option1')
// RoundTabs 데이터
const roundTabs = ref<RoundTab[]>([
  { title: '손해보험', key: 'option1' },
  { title: '생명보험', key: 'option2' },
])

// RoundTabs 이벤트 핸들러
const onRoundTabChange = (key: string) => {
  activeRoundTab.value = key
  console.log('Round tab changed to:', key)
}

// 은행 옵션 정의
const bankOptions = ref([
  { value: 'shinhan', label: '신한은행' },
  { value: 'woori', label: '우리은행' },
  { value: 'hana', label: '하나은행' },
  { value: 'kb', label: 'KB국민은행' },
  { value: 'nh', label: 'NH농협은행' },
  { value: 'sc', label: 'SC제일은행' },
  { value: 'ibk', label: 'IBK기업은행' },
  { value: 'keb', label: 'KEB하나은행' },
  { value: 'db', label: 'DB손해보험' }
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

// 주민등록번호 입력 필드 ref 변수들
const residentIdFront = ref('')
const residentIdBack = ref('')

// 주민등록번호 앞자리 입력 처리
const onFrontIdInput = () => {
  if (residentIdFront.value.length === 6) {
    onIdInputComplete(residentIdFront.value)
  }
}

const clickDiff = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickSame = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickNext = () => {
  isShowModal.value = true
}

// 은행 선택 모달 관련 함수들
const openBankModal = () => {
  isShowBankModal.value = true
}

const closeBankModal = () => {
  isShowBankModal.value = false
}

// 보험사 선택 모달 관련 함수들
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

const selectBankOption = (bank: { value: string; label: string }) => {
  selectedBank.value = bank
}

const selectBank = () => {
  if (selectedBank.value) {
    // InputSearch의 선택된 은행 값 업데이트
    updateInputSearchBankValue(selectedBank.value)
    closeBankModal()
  }
}

// InputSearch의 은행 값 업데이트 함수
const updateInputSearchBankValue = (bank: { value: string; label: string }) => {
  // InputSearch 내부의 Select 컴포넌트 값 업데이트
  const inputSearchElement = document.querySelector('.bank-account')
  if (inputSearchElement) {
    const selectDisplay = inputSearchElement.querySelector('.select-display')
    if (selectDisplay) {
      selectDisplay.textContent = bank.label
    }
    
    // Select 컴포넌트의 내부 값도 업데이트
    const selectComponent = inputSearchElement.querySelector('select')
    if (selectComponent) {
      selectComponent.value = bank.value
    }
  }
}

// InputSearch의 은행 선택 이벤트 처리
const onBankSelect = (event: any) => {
  // 은행 선택 시 커스텀 모달 열기
  openBankModal()
  // 기본 이벤트 방지
  if (event && event.preventDefault) {
    event.preventDefault()
    event.stopPropagation()
  }
}

// 컴포넌트 마운트 후 은행 선택 부분 클릭 이벤트 오버라이드
onMounted(async () => {
  await nextTick()
  
  // 은행 선택 부분 클릭 시 커스텀 모달 열기
  const bankSelectElement = document.querySelector('.bank-account .custom-select')
  if (bankSelectElement) {
    // 기존 클릭 이벤트 제거
    bankSelectElement.removeEventListener('click', openBankModal)
    
    // 새로운 클릭 이벤트 추가
    bankSelectElement.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      openBankModal()
    })
  }
  
  // Select 컴포넌트의 모달 열기 함수를 오버라이드
  const selectComponent = document.querySelector('.bank-account .custom-select') as HTMLElement
  if (selectComponent) {
    // Select 컴포넌트의 openBottomModal 함수를 비활성화
    const originalClickHandler = selectComponent.onclick
    selectComponent.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      openBankModal()
      return false
    }
  }
  
  // InputSearch 내부의 Select 컴포넌트 모달 비활성화
  const inputSearchElement = document.querySelector('.bank-account')
  if (inputSearchElement) {
    // Select 컴포넌트의 모든 클릭 이벤트를 가로채기
    const selectElements = inputSearchElement.querySelectorAll('.custom-select')
    selectElements.forEach((element) => {
      const htmlElement = element as HTMLElement
      // 기존 이벤트 리스너 제거
      const newElement = htmlElement.cloneNode(true) as HTMLElement
      htmlElement.parentNode?.replaceChild(newElement, htmlElement)
      
      // 새로운 클릭 이벤트 추가
      newElement.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        openBankModal()
        return false
      })
    })
    
    // Select 컴포넌트의 모달 비활성화를 위한 데이터 속성 추가
    selectElements.forEach((element) => {
      element.setAttribute('data-modal-disabled', 'true')
    })
    
    // 모달 요소들을 직접 비활성화
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // 새로 추가된 모달 요소들을 찾아서 비활성화
          const modals = document.querySelectorAll('.c-modal.bottom')
          modals.forEach((modal) => {
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

const isShowBottomModal = ref(false)
const maskedIdValue = ref('')

const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
  console.log('toggleBottomModal called, isShowBottomModal:', isShowBottomModal.value)
}

const bottomModalProps = ref({
  title: '보안키패드',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '입력완료',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const clickCancel = () => {
  console.log('모달 취소')
}
const clickConfirm = () => {
  console.log('모달 확인 클릭')
  // 입력된 7자리 숫자를 *로 마스킹하여 두 번째 입력 필드에 설정
  if (inputNums.value.length === 7) {
    maskedIdValue.value = '*'.repeat(7)
    residentIdBack.value = maskedIdValue.value
    toggleBottomModal()
    inputNums.value = [] // 키패드 입력 초기화
  }
}

const inputNums = ref<number[]>([])
const currentInputIdx = computed(() => inputNums.value.length)
const showWarn = ref(false)

// 키패드 숫자 배열 (0-9)
const keypadNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 키패드 배열을 랜덤으로 섞는 함수
function shuffleKeypad() {
  const shuffledNumbers = [...keypadNumbers].sort(() => Math.random() - 0.5)
  
  // lock과 숫자들을 랜덤으로 섞기 (del 제외)
  const buttonsToShuffle = [...shuffledNumbers, 'lock']
  const shuffledButtons = buttonsToShuffle.sort(() => Math.random() - 0.5)
  
  // 섞인 버튼들을 3x4 그리드로 배치 (del은 우하단 고정)
  const keypadRows = [
    [shuffledButtons[0], shuffledButtons[1], shuffledButtons[2]],
    [shuffledButtons[3], shuffledButtons[4], shuffledButtons[5]],
    [shuffledButtons[6], shuffledButtons[7], shuffledButtons[8]],
    [shuffledButtons[9], shuffledButtons[10], 'del']
  ]
  
  return keypadRows.flat()
}

// 랜덤 키패드 배열
const flatKeypad = ref(shuffleKeypad())

function onKeypadClick(key: number | string) {
  if (typeof key === 'number') {
    if (inputNums.value.length < 7) {
      inputNums.value.push(key)
      showWarn.value = false
    }
  } else if (key === 'del') {
    inputNums.value.pop()
    showWarn.value = false
  }
}
// ID 입력이 6글자 완료되면 모달 열기
const onIdInputComplete = (value: string) => {
  console.log('ID input complete:', value)
  flatKeypad.value = shuffleKeypad() // 키패드 위치 랜덤 변경
  toggleBottomModal()
}

</script>
<style scoped lang="scss">
.wrap-form {
  margin-top: 3.2rem;
  .c-input {
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
  }
  .input-tit {
    margin: 1.2rem 0 0.6rem;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.3;
    color: #555555;
    position: relative;
    &.required::after {
      content: "*";
      font-size: 1.2rem;
      display: inline-block;
      margin-left: 0.3rem;
      color: #f14960;
    }
  }
  .wrap-gender {
    .wrap-radio {
      display: flex;
      justify-content: space-between;
      gap: 0.8rem;
    }
  }
}

// 보험사 추가
.wrap-add-insurance {
  margin: 3.2rem 0 5rem;
  .wrap-insurance-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      font-weight: 700;
    }
  }
  .wrap-insurance-list {
    margin-top: 1.2rem;
    .item {
      padding: 2rem;
      border-radius: 1.2rem;
      background-color: #F4F4F4;
      &:not(:first-child) {
        margin-top: 1.2rem;
      }
      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text {
          font-size: 1.4rem;
          font-weight: 600;
        }
        .c-modal-close-btn {
          width: 2.4rem;
          height: 2.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border: none;
          cursor: pointer;
          background-size: 70%;
          background-repeat: no-repeat;
          background-position: center;
          i.icon.close {
            font-size: 0.8rem;
            color: #555555;
          }
        }
      }
      .bank-account {
        margin-top: 1.2rem;
        :deep(.c-inp-el) {
          background-color: #fff;
          border: 0.1rem solid #E2E2E2;
          .c-inp-el {
            border: 0;
          }
        }
        
        // Select 컴포넌트의 기본 모달 비활성화
        :deep(.custom-select) {
          pointer-events: auto;
          
          // Select 컴포넌트의 모달 비활성화
          &[data-modal-disabled="true"] {
            .select-display {
              pointer-events: auto;
            }
          }
        }
      }
      .btn-confirm {
        margin-top: 2rem;
        background-color: #4F5561;
      }
      .info-text {
        margin-top: 0.6rem;
        font-size: 1.3rem;
        color: #959595;
      }
    }
  }
}

// 은행 선택 모달 스타일
.bank-selection-modal {
  padding: 2rem 0;
  
  .bank-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    padding: 0 2rem;
    
    .bank-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.6rem 0.8rem;
      background-color: #F9F9F9;
      border: 0.1rem solid transparent;
      border-radius: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background-color: #E8E8E8;
      }
      &.selected {
        background-color: #4C7FF7;
        border-color: #4C7FF7;
        .bank-name {
          color: #ffffff;
        }
        .bank-logo-inner {
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
          .bank-logo-text {
            color: #4C7FF7;
          }
        }
      }      
      .bank-name {
        margin-top: 0.4rem;
        font-size: 1.4rem;
        font-weight: 500;
        text-align: center;
      }
    }
  }
}

// 보험사 선택 모달 스타일
.insurance-selection-modal {
  padding: 2rem 0;
  
  .insurance-grid {
    margin-top: 1.6rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;    
    .insurance-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.6rem 0.8rem;
      background-color: #F9F9F9;
      border: 0.1rem solid transparent;
      border-radius: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background-color: #E8E8E8;
      }
      
      &.selected {
        background-color: #4C7FF7;
        border-color: #4C7FF7;
        
        .insurance-name {
          color: #ffffff;
        }
      }
      
      .insurance-logo {
        width: 4rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.4rem;
        
        img {
          width: 100%;
          height: auto;
        }
      }
      
      .insurance-name {
        font-size: 1.4rem;
        font-weight: 500;
        text-align: center;
        color: #2B2B2B;
      }
    }
  }
}
.wrap-gender {
  .input-tit {
    margin: 1.2rem 0 0.6rem;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.3;
    color: #555555;
    position: relative;
    &.required::after {
      content: "*";
      font-size: 1.2rem;
      display: inline-block;
      margin-left: 0.3rem;
      color: #f14960;
    }
  }
  .wrap-radio {
    display: flex;
    justify-content: space-between;
    gap: 0.8rem;
  }
}
.wrap-form-tit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .form-tit {
    font-weight: 700;
  }
}
// 커스텀 Select 스타일
.custom-select-container {
  margin-top: 1.2rem;
  .custom-select-display {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    position: relative;
    
    &:hover {
      border-color: #4c7ff7;
    }
    .fixed-label {
      color: #959595;
      font-size: 1.6rem;
      font-weight: 500;
      margin-right: 0.8rem;
    }
    
    .separator {
      width: 1px;
      height: 1.6rem;
      background-color: #e2e2e2;
      margin: 0 0.8rem;
    }
    
    .selected-value {
      color: #2b2b2b;
      font-size: 1.6rem;
      font-weight: 500;
      flex: 1;
    }
    
    .custom-arrow {
      width: 2.4rem;
      height: 2.4rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10L12.0008 14.58L17 10' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      transition: transform 0.2s ease;
      
      &.open {
        transform: rotate(180deg);
      }
    }
  }
}
.custom-select-options {
  margin: 0 -2rem;
  .custom-option-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: #f6f9ff;
    }
    
    &.selected {
      background-color: #f6f9ff;
      
      .option-label {
        color: #4c7ff7;
        font-weight: 700;
      }
    }
    
    .option-label {
      font-size: 1.6rem;
      font-weight: 500;
      color: #555555;
    }
    
    .check-icon {
      color: #4c7ff7;
      font-weight: bold;
      font-size: 1.4rem;
    }
  }
}
.resident-id-form-group {
  margin-top: 1.2rem;
  width: 100%; /* Ensures it takes full width of its parent */
  .resident-id-label {
    display: block; /* Makes the label take its own line */
    margin-bottom: 0.6rem;
    font-weight: 400;
    color: #555;
    font-size: 12px;
    position: relative;
    &.required {
      &::after {
        content: "*";
        font-size: 1.2rem;
        display: inline-block;
        margin-left: 0.3rem;
        color: #f14960;
      }
    }
  }
  .resident-id-inputs {
    display: flex; /* Uses flexbox for horizontal alignment */
    align-items: center; /* Vertically aligns items */
    gap: 10px; /* Space between inputs and hyphen */
    .resident-id-input {
      flex: 1; /* Allows inputs to grow and shrink */
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box; /* Includes padding and border in the element's total width and height */
      min-width: 0; /* Allows shrinking below content size */
      &::placeholder {
        color: #bbb;
      }
    }
    .resident-id-hyphen {
      font-size: 18px;
      color: #555;
      font-weight: bold;
    }
  }
}
.optional,
.insurance-select,
.checkbox-account {
  margin-top: 1.2rem;;
}
</style>
