<template>
  <BottomModal
    :is-visible="isVisible"
    v-bind="bottomModalProps"
    @cancel="clickCancel"
    @confirm="clickConfirm"
    @close="closeModal"
  >
    <template #content>
      <div class="wrap-keypad">
        <div v-if="!$slots?.subTitle" class="wrap-key-tit">주민등록번호 뒷자리를 입력해 주세요</div>
        <div v-else class="wrap-key-tit">
          <slot name="subTitle"></slot>
        </div>
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
          <div v-if="isInvalid" class="txt-warn">주민등록번호를 다시 확인해주세요.</div>
        </div>
        <div class="keypad">
          <div class="keypad-grid">
            <button
              v-for="(key, idx) in flatKeypad"
              :key="idx"
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
                  <path
                    d="M7.10005 9.30039V8.3861C7.10005 5.34719 9.50862 2.90039 12.5 2.90039C15.4915 2.90039 17.9001 5.34719 17.9001 8.3861V9.30039M7.10005 9.30039C6.11005 9.30039 5.30005 10.1232 5.30005 11.129V20.2718C5.30005 21.2775 6.11005 22.1004 7.10005 22.1004H17.9001C18.8901 22.1004 19.7001 21.2775 19.7001 20.2718V11.129C19.7001 10.1232 18.8901 9.30039 17.9001 9.30039M7.10005 9.30039H17.9001M12.5 16.7004V14.3004"
                    stroke="#D5D5D5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </template>
              <template v-else-if="key === 'del'">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.22 10.34L13.78 12.9M13.78 12.9L16.34 15.46M13.78 12.9L16.34 10.34M13.78 12.9L11.22 15.46M7.72235 19.3L20.82 19.3C21.5269 19.3 22.1 18.7269 22.1 18.02V7.78C22.1 7.07308 21.5269 6.5 20.82 6.5L7.72235 6.5L3.35346 12.2982C3.08501 12.6545 3.08501 13.1455 3.35346 13.5018L7.72235 19.3Z"
                    stroke="#555555"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import { isValidResidentNumber } from '~/utils/common/validators.utils'

export interface SecurityKeypadEmitData {
  isInvalid: boolean
  frontNumber: string
  backNumber: string
}

interface Props {
  isVisible?: boolean
  frontNumber?: string | number
  checkValidation?: boolean // 주민등록번호 유효성검사 실시 여부
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  frontNumber: '',
  checkValidation: true,
  subTitle: '주민등록번호 뒷자리를 입력해 주세요.'
})

const emit = defineEmits(['close', 'cancel', 'confirm'])

const inputNums = ref<number[]>([])
const currentInputIdx = computed(() => inputNums.value.length)
const isInvalid = ref(false)

const bottomModalProps = ref({
  title: '보안키패드',
  isShowCancelButton: false,
  confirmButtonText: '입력완료',
  disabledConfirmButton: computed(() => currentInputIdx.value !== 7)
})

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
      isInvalid.value = false
    }
  } else if (key === 'del') {
    inputNums.value.pop()
    isInvalid.value = false
  }
}

const closeModal = () => {
  emit('close')
}
const clickCancel = () => {
  emit('cancel')
}
const clickConfirm = () => {
  // 테스트용: 1111111 입력시 넘어감
  if (inputNums.value.join('') === '1111111') {
    emit('confirm', {
      isInvalid: false,
      frontNumber: props.frontNumber,
      backNumber: inputNums.value.join('')
    })
    inputNums.value = [] // 키패드 입력 초기화
    return
  }

  // 주민번호 유효성 검사
  if (props.checkValidation && !isValidResidentNumber(props.frontNumber, inputNums.value.join(''))) {
    isInvalid.value = true
    inputNums.value = [] // 키패드 입력 초기화
    return
  }

  emit('confirm', {
    isInvalid: false,
    frontNumber: props.frontNumber,
    backNumber: inputNums.value.join('')
  })
  isInvalid.value = false
  inputNums.value = [] // 키패드 입력 초기화
}
</script>

<style scoped lang="scss">
:deep(.c-modal-body) {
  padding: 0;
}

.wrap-keypad {
  .wrap-key-tit {
    margin-top: 4rem;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.4;
    color: #2b2b2b;
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
        background: #f4f4f4;
        color: #2b2b2b;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        font-weight: 700;
        transition:
          background 0.2s,
          color 0.2s;
        &.filled {
          background: #2b2b2b;
          color: transparent;
        }
        &.showNum {
          background: transparent;
          color: #2b2b2b;
        }
        // &.active {
        // border: 0.1rem solid #2B2B2B;
        // }
      }
    }
  }
  .txt-warn {
    margin-top: 1.2rem;
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 1.4;
    color: #f14960;
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
      &:nth-last-child(-n + 3) {
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
