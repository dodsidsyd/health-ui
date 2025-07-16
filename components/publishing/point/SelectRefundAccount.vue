<template>
  <BottomModal
    :is-visible="isShowBottomModal"
    v-bind="bottomModalProps"
    @confirm="clickConfirm"
    @close="toggleBottomModal"
  >
    <template #content>
      <p class="bank-account-info"><strong>홍길동</strong>(예금주) 회원 본인의 계좌번호를 입력해주세요.</p>
      <div class="select-account">
        <Select
          v-model="selectedBank"
          label="은행명"
          :modalTitle="'은행 선택'"
          :select-placeholder="'은행 선택'"
          :custom-opts="BANK_LIST"
          @change="onBankChange"
        />

        <InputText v-model="accountNumber" placeholder="계좌번호를 입력해주세요." />
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

import Select from '~/components/publishing/input/Select.vue'
import InputText from '~/components/publishing/input/InputText.vue'

// 타입 정의
interface BankOption {
  value: string
  label: string
  code?: string
}

const isShowBottomModal = ref(false)
const selectedBank = ref('')
const accountNumber = ref('')

// 실제 은행 목록 데이터
const BANK_LIST: BankOption[] = [
  { value: 'KB', label: 'KB국민은행', code: '004' },
  { value: 'SHINHAN', label: '신한은행', code: '088' },
  { value: 'WOORI', label: '우리은행', code: '020' },
  { value: 'HANA', label: '하나은행', code: '081' },
  { value: 'IBK', label: 'IBK기업은행', code: '003' },
  { value: 'NH', label: 'NH농협은행', code: '011' },
  { value: 'KAKAO', label: '카카오뱅크', code: '090' },
  { value: 'TOSS', label: '토스뱅크', code: '092' },
  { value: 'KBANK', label: '케이뱅크', code: '089' },
  { value: 'SC', label: 'SC제일은행', code: '023' },
  { value: 'CITI', label: '씨티은행', code: '027' },
  { value: 'DGB', label: 'DGB대구은행', code: '031' },
  { value: 'BUSAN', label: '부산은행', code: '032' },
  { value: 'GWANGJU', label: '광주은행', code: '034' },
  { value: 'JEJU', label: '제주은행', code: '035' },
  { value: 'JEONBUK', label: '전북은행', code: '037' },
  { value: 'KYONGNAM', label: '경남은행', code: '039' },
  { value: 'SUHYUP', label: '수협은행', code: '007' },
  { value: 'POST', label: '우체국', code: '071' }
]

const clickBottomModal = () => {
  toggleBottomModal()
}

const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
  // 모달 닫을 때 폼 리셋
  if (!isShowBottomModal.value) {
    resetForm()
  }
}

const resetForm = () => {
  selectedBank.value = ''
  accountNumber.value = ''
}

// 이벤트 핸들러
const onBankChange = (option: BankOption) => {
  selectedBank.value = option.value
}

const bottomModalProps = ref({
  title: '환전 계좌 정보',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '16,200P 환전 신청하기',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

// 환전 신청 확인 버튼 클릭
const clickConfirm = () => {
  // 간단한 로그 출력
  console.log('환전 신청:', {
    bank: selectedBank.value,
    accountNumber: accountNumber.value
  })

  // 성공 메시지 표시
  alert('환전 신청이 완료되었습니다.')

  // 모달 닫기
  toggleBottomModal()
}

// 부모 컴포넌트에서 접근할 수 있도록 expose
defineExpose({
  clickBottomModal,
  toggleBottomModal
})
</script>

<style scoped lang="scss">
.bank-account-info {
  font-size: 1.6rem;
  line-height: 1.5;
  color: #2b2b2b;
  margin-bottom: 2rem;
  text-align: left;
}

.select-account {
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 0 0.8rem;

  .c-input {
    flex: 0 0 auto;
    min-width: 0;
    width: 15rem;
    & + .c-input {
      flex: 1;
    }
  }
}

.points-balance {
  background: #f4f4f4;
  border-radius: 1.2rem;
  overflow: hidden;
  padding: 0.4rem 1.6rem;
  .item {
    padding: 1.2rem 0;
    display: flex;
    flex-direction: row;
    border-top: 0.1rem solid #e2e2e2;
    justify-content: space-between;
    &:first-child {
      border-top: 0;
    }
    dt {
      font-size: 1.3rem;
      line-height: 2.2rem;
      font-weight: 500;
      color: #2b2b2b;
    }
    dd {
      font-size: 1.4rem;
      line-height: 2.2rem;
      font-weight: 600;
      color: #2b2b2b;
      &.my-point {
        font-size: 1.6rem;
      }
    }
  }
}
@media (max-width: 375px) {
  .select-account {
    flex-direction: column;
    gap: 1.6rem 0;
    .c-input {
      width: 100%;
      min-width: 0;
      & + .c-input {
        width: 100%;
      }
    }
  }
}
</style>
