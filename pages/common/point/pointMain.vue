<template>
  <BaseBody
    :show-back-button="true"
    page-title="레몬포인트"
    logo-type="text"
    :has-add-text="true"
    :addTextClickEnabled="true"
    add-text="<span style='color:#555;font-size:1.4rem'><i class='icon ico-gift'></i>아이템 스토어</span>"
  >
    <PointMainCard />
    <hr class="hr-section mt-32 ml-n20 mr-n20 mb-8" />
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />
    <TotalCountSelectType :count="6" v-model:selected-period="selectedPeriod" :select-options="periodOptions" />

    <PointHistoryList />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import TotalCountSelectType from '~/components/publishing/common/temp/TotalCountSelectType.vue'

import PointMainCard from '~/components/publishing/point/PointMainCard.vue'
import PointHistoryList from '~/components/publishing/point/PointHistoryList.vue'

const activeLineTab = ref('all')

const lineTabs = ref<Tab[]>([
  { title: '전체', key: 'all' },
  { title: '적립내역', key: 'credit' },
  { title: '사용내역', key: 'used' }
])
// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

const selectedPeriod = ref('all')
const periodOptions = [
  { value: 'all', label: '전체' },
  { value: '3month', label: '3개월' },
  { value: '6month', label: '6개월' }
]
</script>
