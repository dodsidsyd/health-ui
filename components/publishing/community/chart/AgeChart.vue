<template>
  <PieChart :data="chartData" :size="160" chartClass="gender-chart" />
</template>
<script setup>
import PieChart from '~/components/chart/pieChart.vue'

const chartData = [
  { label: '10대', value: 1001, color: '#D7E1F7' },
  { label: '20대', value: 800, color: '#243E8E' },
  { label: '30대', value: 1000, color: '#9B48FF' },
  { label: '40대', value: 500, color: '#41BCF5' },
  { label: '50대', value: 600, color: '#4776E5' },
  { label: '60대+', value: 900, color: '#A5D15D' }
]
</script>
<style lang="scss" scoped>
.chart-wrap {
  &.gender-chart {
    .legend {
      margin-bottom: 1rem;
    }
  }
}
</style>
