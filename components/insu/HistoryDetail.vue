<template>
  <div class="history-detail-box">
    <div class="detail-info">
      <div v-for="item in detailsList" :key="item.id" class="detail-info-item">
        <span class="tit">{{ item.title }}</span>
        <span v-if="item.price" class="detail">{{ item.price.toLocaleString() }}원</span>
        <span v-else-if="item.detail" class="detail">{{ item.detail }}</span>
        <span v-else-if="item.password" class="detail">
          <template v-if="passwordVisibility[item.id]">
            {{ item.password }}
          </template>
          <template v-else>
            {{ maskPassword(item.password) }}
          </template>
          <button class="icon-show-password" @click="togglePasswordVisibility(item.id)"></button>
        </span>
      </div>
    </div>
    <div v-if="totalPrice" class="payment-total">
      <strong>총 결제금액</strong>
      <strong>{{ totalPrice.toLocaleString() }}원</strong>
    </div>
  </div>
</template>
<script setup lang="ts">
import { withDefaults, defineProps, reactive } from 'vue'

const props = withDefaults(
  defineProps<{
    detailsList?: { id: number; title: string; price?: number; detail?: string; password?: number }[]
    totalPrice?: number
  }>(),
  {
    detailsList: () => [],
    totalPrice: 0
  }
)
// 비밀번호를 *로 마스킹하는 함수
const maskPassword = (password: number): string => {
  return '*'.repeat(String(password).length)
}
// 각 항목의 비밀번호 표시 상태를 관리하는 반응형 객체
const passwordVisibility = reactive<Record<number, boolean>>({})

// 비밀번호 표시 상태를 토글하는 함수
const togglePasswordVisibility = (id: number) => {
  console.log('?')
  passwordVisibility[id] = !passwordVisibility[id]
}
</script>
<style lang="scss" scoped>
.history-detail-box {
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e2e2;
  border-radius: 1.2rem;
  background: #fff;
  padding: 2rem;
  .detail-info {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .detail-info-item {
    display: flex;
    justify-content: space-between;
    .tit {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
      color: #959595;
    }
    .detail {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
      &:has(.icon-show-password) {
        display: flex;
        align-items: center;
      }
    }
    .icon-show-password {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      margin-left: 0.2rem;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M17 16.25L4.5 3.75M8.5 8.70131C8.18882 9.04438 8 9.49503 8 9.98859C8 11.0634 8.89543 11.9347 10 11.9347C10.5093 11.9347 10.9741 11.7495 11.3272 11.4445M17.0323 11.9347C17.7209 10.904 18 10.0634 18 10.0634C18 10.0634 16.1795 4.25 10 4.25C9.65308 4.25 9.31989 4.26832 9 4.30291M14.5 14.4579C13.3521 15.1901 11.8744 15.7079 10 15.6773C3.89744 15.5775 2 10.0634 2 10.0634C2 10.0634 2.88155 7.2484 5.5 5.5361' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")
        center / 100% no-repeat;
    }
  }
  .payment-total {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e2e2;
    strong {
      line-height: 2.2rem;
    }
  }
}
</style>
