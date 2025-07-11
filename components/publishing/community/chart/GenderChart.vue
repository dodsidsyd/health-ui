<template>
  <pie-chart :data="gender" :size="200" :view-box="'0 0 200 200'" class="gender-chart" />
</template>

<script setup>
import PieChart from '~/components/chart/pieChart.vue'

const gender = [
  { label: '남자', value: 7000, color: '#D7E1F7' },
  { label: '여자', value: 20000, color: '#243E8E' }
]
</script>
<style lang="scss" scoped>
::v-deep(.chart-wrap) {
  &.gender-chart {
    .legend {
      justify-content: center;
    }
  }
}
</style>
