<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="agree-wrap flex flex-col gap-10 pb-48 mt-40">
      <h1 class="c-tit">
        <span class="text">
          주민등록 번호를 입력해 주세요    
        </span>
      </h1>
    </div>
    <FlexSection>
      <div class="resident-id-form-group">
        <label for="resident-id-front" class="resident-id-label">주민등록번호</label>
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
    </FlexSection>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="다음" class="lg w-full medium btn-sticky" disabled />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import InputID from '~/components/publishing/input/InputID.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import { ref, computed } from 'vue'

const isShowBottomModal = ref(false)
const idInputValue = ref('')
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

const clickFindHospitals = () => {
  navigateTo('/insu/SuccessFIndHospitals')
}

// ID 입력이 6글자 완료되면 모달 열기
const onIdInputComplete = (value: string) => {
  console.log('ID input complete:', value)
  flatKeypad.value = shuffleKeypad() // 키패드 위치 랜덤 변경
  toggleBottomModal()
}
</script>

<style scoped lang="scss">
.resident-id-form-group {
  // margin: 1rem;
  width: 100%; /* Ensures it takes full width of its parent */
  // max-width: 400px; /* Optional: Sets a max width for desktop for better aesthetics */
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
</style>
