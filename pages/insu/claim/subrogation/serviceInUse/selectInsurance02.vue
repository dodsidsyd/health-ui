<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="wrap-add-insurance mt-24">
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
      <div class="wrap-info">
        <img src="/assets/images/insu/icon-info.svg" alt="정보" srcset="">
        <div class="text">수익자(보험금을 받을 분)정보 변경은 피보험자 관리 화면에서 가능해요.</div>
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


</script>
<style scoped lang="scss">


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

.wrap-info {
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  .text {
    font-size: 1.4rem;
    font-weight: 500;
    color: #959595;
  }
}
</style>
