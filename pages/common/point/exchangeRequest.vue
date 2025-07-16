<template>
  <BaseBody :show-back-button="true" page-title="레몬포인트 환전" logo-type="text">
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />
    <div class="pb-36">
      <!-- 보유 포인트 카드 -->
      <PointBalanceCard class="mt-20" />
      <!-- 환전요청 포인트 -->
      <PointRedeemPointCard class="mt-20" />
      <!-- 환전규정 -->
      <PointRedemptionRules class="mt-20" />
      <div class="btn-wrap fixed">
        <Button
          btn-type="primary"
          element-type="button"
          aria-label="포인트 환전 신청하기"
          class="lg w-full medium"
          @click="clickBottomModal"
        >
          포인트 환전 신청하기
        </Button>
      </div>
      <!-- 포인트 환전 신청 계좌 선택 modal -->
      <SelectRefundAccount ref="selectRefundAccountRef" />
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import Button from '~/components/publishing/button/Button.vue'

import PointBalanceCard from '~/components/publishing/point/PointBalanceCard.vue'
import PointRedeemPointCard from '~/components/publishing/point/PointRedeemPointCard.vue'
import PointRedemptionRules from '~/components/publishing/point/PointRedemptionRules.vue'

import SelectRefundAccount from '~/components/publishing/point/SelectRefundAccount.vue'

const activeLineTab = ref('refundRequest')

// SelectRefundAccount 컴포넌트 참조
const selectRefundAccountRef = ref<InstanceType<typeof SelectRefundAccount>>()

const lineTabs = ref<Tab[]>([
  { title: '환전신청내역', key: 'refundHistory', to: '/common/point/exchangeRequestList' },
  { title: '포인트 환전신청', key: 'refundRequest', to: '/common/point/exchangeRequest' }
])

// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

// 버튼 클릭 시 자식 컴포넌트의 모달 열기
const clickBottomModal = () => {
  if (selectRefundAccountRef.value) {
    selectRefundAccountRef.value.clickBottomModal()
  }
}
</script>

<style scoped lang="scss">
.btn-wrap {
  &.fixed {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .c-btn {
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>
