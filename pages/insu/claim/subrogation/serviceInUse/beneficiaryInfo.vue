<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구/피보험자 관리"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <h1 class="c-tit mt-24">
      <span class="text">
        수익자(보험금 받는 분)<br />정보를 입력해 주세요
      </span>
    </h1>
    <div class="wrap-form">
      <InputText
        label="수익자 이름"
        class="require"
        :is-valid="true"
        valid-text="수익자 이름을 입력해주세요."
        placeholder="이름을 입력해 주세요."
      />
      <div class="resident-id-form-group">
        <label for="resident-id-front" class="resident-id-label required">수익자 주민등록번호</label>
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
            @input="onFrontIdInput"
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
            readonly
          />
        </div>
      </div>
      <BottomModal
        :isVisible="isShowBottomModal"
        v-bind="bottomModalProps"
        @cancel="clickCancel"
        @confirm="clickConfirm"
        @close="toggleBottomModal"
      >
        <template #content>
          <div class="wrap-keypad">
            <div class="wrap-key-tit">주민등록번호 뒷자리를 입력해 주세요.</div>
            <div class="wrap-hide-num">
              <div class="circle-inputs">
                <template v-for="(val, idx) in 7" :key="idx">
                  <span
                    class="circle"
                    :class="{
                      filled: inputNums[idx] !== undefined && idx !== inputNums.length - 1,
                      showNum: idx === inputNums.length - 1 && inputNums[idx] !== undefined,
                      active: currentInputIdx === idx
                    }"
                  >
                    {{ inputNums[idx] !== undefined ? inputNums[idx] : '' }}
                  </span>
                </template>
              </div>
              <div v-if="showWarn" class="txt-warn">주민등록번호를 다시 확인해주세요.</div>
            </div>
            <div class="keypad">
              <div class="keypad-grid">
                <button v-for="(key, idx) in flatKeypad" :key="idx"
                  class="keypad-btn"
                  :class="{
                    'is-lock': key === 'lock',
                    'is-del': key === 'del'
                  }"
                  :disabled="key === 'lock' || (key === 'del' && inputNums.length === 0)"
                  @click="onKeypadClick(key)"
                >
                  <template v-if="key === 'lock'">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.10005 9.30039V8.3861C7.10005 5.34719 9.50862 2.90039 12.5 2.90039C15.4915 2.90039 17.9001 5.34719 17.9001 8.3861V9.30039M7.10005 9.30039C6.11005 9.30039 5.30005 10.1232 5.30005 11.129V20.2718C5.30005 21.2775 6.11005 22.1004 7.10005 22.1004H17.9001C18.8901 22.1004 19.7001 21.2775 19.7001 20.2718V11.129C19.7001 10.1232 18.8901 9.30039 17.9001 9.30039M7.10005 9.30039H17.9001M12.5 16.7004V14.3004" stroke="#D5D5D5" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </template>
                  <template v-else-if="key === 'del'">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.22 10.34L13.78 12.9M13.78 12.9L16.34 15.46M13.78 12.9L16.34 10.34M13.78 12.9L11.22 15.46M7.72235 19.3L20.82 19.3C21.5269 19.3 22.1 18.7269 22.1 18.02V7.78C22.1 7.07308 21.5269 6.5 20.82 6.5L7.72235 6.5L3.35346 12.2982C3.08501 12.6545 3.08501 13.1455 3.35346 13.5018L7.72235 19.3Z" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </template>
                  <template v-else>
                    {{ key }}
                  </template>
                </button>
              </div>
            </div>
          </div>
        </template>
      </BottomModal>
      <InputText
        label="수익자 휴대폰 번호"
        class="require"
        :is-valid="true"
        valid-text="수익자 휴대폰 번호를 입력해주세요."
        placeholder="휴대폰 번호를 입력해주세요."
      />
      <InputText
        label="피보험자와의 관계"
        class="require"
        :is-valid="true"
        valid-text="피보험자와의 관계를 입력해주세요."
        placeholder="예) 자녀, 남편, 배우자, 부, 모 등"
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
          <Checkbox class="checkbox-account" id="checkBox1" v-model="checkbox1" ariaLabel="DB손해보험 자동이체 계좌로 지급" />
          <InputSearch
            class="bank-account"
            selectPlaceholder="은행선택" 
            placeholder="계좌번호 입력" 
            modal-title="은행선택"
            :custom-search-options="bankOptions"
            :hide-search-icon="true"
            @select="onBankSelect"
          />
          <Button class="btn-confirm" btn-type="primary" element-type="button" aria-label="예금주 확인" />
          <div class="info-text">23시~01시 사이에는 은행 서버 점검시간으로 예금주 확인 시 오류가 발생할 수 있습니다.</div>
        </div>
        <div class="item">
          <div class="item-header">
            <div class="text">보험사 02</div>
            <button type="button" class="c-modal-close-btn" aria-label="닫기">
              <i class="icon close"></i>
            </button>
          </div>
          <Select class="insurance-select" @click="openInsuranceModal" />
          <Checkbox class="checkbox-account" id="checkBox1" v-model="checkbox1" ariaLabel="DB손해보험 자동이체 계좌로 지급" />
          <InputSearch
            class="bank-account"
            selectPlaceholder="은행선택" 
            placeholder="계좌번호 입력" 
            modal-title="은행선택"
            :custom-search-options="bankOptions"
            :hide-search-icon="true"
            @select="onBankSelect"
          />
          <Button class="btn-confirm" btn-type="primary" element-type="button" aria-label="예금주 확인" />
          <div class="info-text">23시~01시 사이에는 은행 서버 점검시간으로 예금주 확인 시 오류가 발생할 수 있습니다.</div>
        </div>
      </div>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
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
import { ref, computed, onMounted, nextTick } from 'vue'

const isShowModal = ref(false)
const checkbox1 = ref(false)

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
}

// 주민등록 번호 입력
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
// BottomModal (주민번호 뒷자리 입력 모달)
:deep(.c-modal) {
  .c-modal-body {
    padding: 0;
  }
  .wrap-keypad {
    .wrap-key-tit {
      margin-top: 4rem;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 1.4;
      color: #2B2B2B;
    }
    .wrap-hide-num {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 2.4rem;
      padding-bottom: 7.1rem;
      .circle-inputs {
        display: flex;
        justify-content: center;
        gap: 1.2rem;
        .circle {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 50%;
          background: #F4F4F4;
          color: #2B2B2B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          font-weight: 700;
          transition: background 0.2s, color 0.2s;
          &.filled {
            background: #2B2B2B;
            color: transparent;
          }
          &.showNum {
            background: transparent;
            color: #2B2B2B;
          }
        }
      }
    }
    .txt-warn{
      margin-top: 1.2rem;
      font-weight: 400;
      font-size: 1.3rem;
      line-height: 1.4;
      color: #F14960;
    }
  }
}

.keypad {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .keypad-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 0;
    background: #ededed;
    border-radius: 0 0 2.4rem 2.4rem;
    border-top: 0.1rem solid #ededed;
    overflow: hidden;
    box-shadow: 0 0.1rem 0 #e0e0e0;
    .keypad-btn {
      height: 5.6rem;
      font-size: 2.2rem;
      font-weight: 700;
      color: #222;
      background: #fff;
      border: none;
      border-right: 0.1rem solid #ededed;
      border-bottom: 0.1rem solid #ededed;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      &:nth-child(3n) {
        border-right: none;
      }
      &:nth-last-child(-n+3) {
        border-bottom: none;
      }
      &:active:not(:disabled) {
        background: #f4f4f4;
      }
      &.is-lock {
        background: #fafafa;
        color: #c0c0c0;
      }
      &.is-del {
        background: #fafafa;
      }
      &:disabled {
        color: #c0c0c0;
      }
      svg {
        display: block;
      }
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
      .insurance-select,
      .checkbox-account {
        margin-top: 1.2rem;;
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
</style>
