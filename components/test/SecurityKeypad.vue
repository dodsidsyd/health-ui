<template>
  <div id="cModalBottom" class="c-modal bottom" :class="[{ 'is-show': isVisible }]" aria-describedby="modalBottomTitle">
    <div class="c-dim" @click="closeModal"></div>
    <div class="c-modal-inner">
      <div class="c-modal-header">
        <strong id="modalBottomTitle" class="c-modal-title">보안키패드</strong>
        <button type="button" class="c-modal-close-btn" aria-label="닫기" @click="closeModal"></button>
      </div>
      <div class="c-modal-body">
        <div
          style="display: flex; flex-direction: column; gap: 2rem; padding: 3rem 1rem 5rem 1rem; align-items: center"
        >
          <span>주민등록번호 뒷자리를 입력해 주세요</span>
          <div style="display: flex; gap: 1rem">
            <template v-for="(num, index) in nums" :key="index">
              <input
                v-if="num.value"
                v-model="num.value"
                :type="num.type"
                readonly
                style="width: 10px; text-align: center"
              />
              <!-- 숫자 없을때 -->
              <div v-show="!num.value" class="none-num"></div>
            </template>
          </div>
          <div v-if="isValid === false" style="color: red">주민등록 번호를 다시 확인해 주세요.</div>
        </div>
        <div class="keypad">
          <button v-for="key in keypad" :key="key.value" :disabled="key.disabled" @click="clickKey(key.value)">
            <!-- lock 키 -->
            <span v-if="key.value === 'lock'" class="lock-key"></span>
            <!-- 삭제 키 -->
            <span v-else-if="key.value === 'delete'" class="delete-key"></span>
            <template v-else>{{ key.label }}</template>
          </button>
        </div>
      </div>
      <div class="c-modal-footer">
        <button type="button" class="c-modal-btn confirm" @click="onClickConfirm">
          <span class="text">입력완료</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type KeyItem = {
  label: string
  value: number | string
  disabled: boolean
}

const props = withDefaults(defineProps<{ isVisible?: boolean; frontNumber?: string | number }>(), {
  isVisible: false,
  frontNumber: ''
})

const emit = defineEmits(['close', 'cancel', 'confirm'])

// 입력한 주민번호 뒷자리
const nums = ref<{ value: string; type: 'text' | 'password' }[]>([
  { value: '', type: 'text' },
  { value: '', type: 'text' },
  { value: '', type: 'text' },
  { value: '', type: 'text' },
  { value: '', type: 'text' },
  { value: '', type: 'text' },
  { value: '', type: 'text' }
])
const currentIndex = ref(0)
const keypad = ref<KeyItem[]>([])
const isValid = ref<boolean | null>(null)

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5)
}

// 랜덤으로 키패드 생성
const generateKeypad = () => {
  const baseKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const lockKey = 'lock'
  const deleteKey = { label: 'delete', value: 'delete', disabled: false }

  // 숫자, 'lock' 섞기
  const shuffled = shuffleArray([...baseKeys, lockKey])

  // 키패드 형태로 변환
  const keypad = shuffled.map(item =>
    item === lockKey
      ? { label: 'lock', value: 'lock', disabled: true }
      : { label: item.toString(), value: item, disabled: false }
  )

  // 마지막에 delete 추가
  return [...keypad, deleteKey]
}

const clickKey = (val: number | string) => {
  if (typeof val === 'number' && currentIndex.value < 7) {
    nums.value[currentIndex.value] = {
      value: val.toString(),
      type: 'text'
    }

    // 이전에 작성된 숫자 마스킹처리
    if (currentIndex.value > 0) {
      if (nums.value[currentIndex.value]) {
        nums.value[currentIndex.value - 1].type = 'password'
      }
    }
    currentIndex.value++
  } else if (val === 'delete' && currentIndex.value > 0) {
    currentIndex.value--

    nums.value[currentIndex.value] = {
      value: '',
      type: 'password'
    }
  }
}

const closeModal = () => {
  emit('close')
}
const onClickConfirm = () => {
  const backNumber = nums.value.map(item => item.value).join('')

  isValid.value = true

  if (isValid.value) {
    emit('confirm', backNumber)
  } else {
    isValid.value = false
    currentIndex.value = 0
    nums.value = [
      { value: '', type: 'text' },
      { value: '', type: 'text' },
      { value: '', type: 'text' },
      { value: '', type: 'text' },
      { value: '', type: 'text' },
      { value: '', type: 'text' },
      { value: '', type: 'text' }
    ]
  }
}

onMounted(() => {
  keypad.value = generateKeypad()
})
</script>

<style scoped>
.keypad {
  display: grid;
  grid-template-columns: repeat(3, 99px);
  grid-template-rows: repeat(4, 60px);
  gap: 1px;
  background-color: #ccc;
  border: 1px solid #999;
}
.keypad button {
  background-color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.keypad button:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
  color: #bbb;
}
.none-num {
  width: 15px;
  height: 15px;
  background-color: #e2e2e2;
  border-radius: 50%;
}
.lock-key {
  display: inline-block;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z'%3E%3C/path%3E%3C/svg%3E");
  width: 23px;
  height: 23px;
}
.delete-key {
  display: inline-block;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M6.53451 3H20.9993C21.5516 3 21.9993 3.44772 21.9993 4V20C21.9993 20.5523 21.5516 21 20.9993 21H6.53451C6.20015 21 5.88792 20.8329 5.70246 20.5547L0.369122 12.5547C0.145189 12.2188 0.145189 11.7812 0.369122 11.4453L5.70246 3.4453C5.88792 3.1671 6.20015 3 6.53451 3ZM7.06969 5L2.40302 12L7.06969 19H19.9993V5H7.06969ZM12.9993 10.5858L15.8277 7.75736L17.242 9.17157L14.4135 12L17.242 14.8284L15.8277 16.2426L12.9993 13.4142L10.1709 16.2426L8.75668 14.8284L11.5851 12L8.75668 9.17157L10.1709 7.75736L12.9993 10.5858Z'%3E%3C/path%3E%3C/svg%3E");
  width: 23px;
  height: 23px;
}
</style>
