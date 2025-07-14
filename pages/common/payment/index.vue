<template>
  <BaseBody :show-back-button="true" page-title="결제내역" logo-type="text">
    <div>
      <TotalCountDateRangeType
        :data="allData"
        class="pt-20 pb-20"
        :active-option="currentPeriod"
        modal-title="조회 기간 선택"
        confirm-button-text="조회하기"
        @filtered-data-change="handleFilteredDataChange"
        @period-change="handlePeriodChange"
      />

      <PaymentList :data="displayData" />
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import TotalCountDateRangeType from '~/components/publishing/common/temp/TotalCountDateRangeType.vue'
import PaymentList from '~/components/publishing/payment/PaymentList.vue'

interface PaymentItem {
  id: number
  name: string
  date: string
  price: string
  cardCompany: string
  approved: string
}

const currentPeriod = ref('all')
const filteredData = ref<PaymentItem[]>([])
const allData = ref<PaymentItem[]>([
  {
    id: 1,
    name: '55,000P 충전',
    date: '30초 전',
    price: '50,000',
    cardCompany: '신용/체크카드 / KB국민',
    approved: '승인완료'
  },
  {
    id: 2,
    name: '55,000P 충전',
    date: '19일 전',
    price: '30,000',
    cardCompany: '신용/체크카드 / KB국민',
    approved: '승인완료'
  },
  {
    id: 3,
    name: '55,000P 충전',
    date: '03.27',
    price: '100,000',
    cardCompany: '신용/체크카드 / KB국민',
    approved: '승인완료'
  },
  {
    id: 4,
    name: '55,000P 충전',
    date: '03.27',
    price: '1,000,000',
    cardCompany: '신용/체크카드 / KB국민',
    approved: '승인완료'
  },
  {
    id: 5,
    name: '55,000P 충전',
    date: '03.27',
    price: '50,000',
    cardCompany: '신용/체크카드 / KB국민',
    approved: '승인취소'
  },
  {
    id: 6,
    name: '55,000P 충전',
    date: '03.27',
    price: '50,000',
    cardCompany: '신용/체크카드 / KB국민',
    approved: '승인완료'
  }
] as PaymentItem[])

// 표시할 데이터 (필터링된 데이터가 있으면 그것을, 없으면 전체 데이터를 표시)
const displayData = computed(() => {
  return filteredData.value.length > 0 ? filteredData.value : allData.value
})

// 필터링된 데이터 받기
const handleFilteredDataChange = (data: PaymentItem[]) => {
  filteredData.value = data
  console.log(`필터링 완료: ${data.length}개 데이터`)
}

// 기간 변경 처리
const handlePeriodChange = (period: string) => {
  currentPeriod.value = period
  console.log(`기간 변경: ${period}`)
}
</script>

<style scoped lang="scss"></style>
