<template>
  <BaseBody :show-back-button="true" page-title="레몬포인트 환전" logo-type="text">
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

    <TotalCount :count="6" class="pt-20 pb-20" />

    <div class="point-history-list">
      <PointExchangeItem
        :item-name="'9,800P 환전신청'"
        :tax-point="'환전수수료 1,000P'"
        :exchange-price="455555"
        :time-point="'14일전'"
      />

      <PointExchangeItem
        :item-name="'15,500P 환전신청'"
        :tax-point="'환전수수료 1,000P'"
        :exchange-price="45555"
        :time-point="'14일전'"
        :current-state="'complete'"
      />

      <PointExchangeItem
        :item-name="'15,500P 환전신청'"
        :tax-point="'환전수수료 1,000P'"
        :exchange-price="8000"
        :time-point="'14일전'"
        :current-state="'complete'"
      />

      <!-- 환전  없을때 -->
      <div class="point-exchange-empty">
        <p>환전 내역이 없습니다.</p>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

import TotalCount from '~/components/publishing/common/temp/TotalCount.vue'
import PointExchangeItem from '~/components/publishing/point/PointExchangeItem.vue'

const activeLineTab = ref('refundHistory')

const lineTabs = ref<Tab[]>([
  { title: '환전신청내역', key: 'refundHistory', to: '/common/point/exchangeRequestList' },
  { title: '포인트 환전신청', key: 'refundRequest', to: '/common/point/exchangeRequest' }
])
// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}
</script>

<style scoped lang="scss">
.point-history-list {
  margin: 0 -2rem;
  padding: 0 2rem;
  border-top: 0.1rem solid #eee;
}

.point-exchange-empty {
  margin-top: 10rem;
  text-align: center;
  margin-bottom: 10rem;
  color: #555;
  font-size: 1.8rem;
  font-weight: 500;
}
</style>
