<template>
  <pie-chart :data="age" class="age-chart" :size="200" :view-box="'30 30 150 150'" />
</template>

<script setup>
import PieChart from '~/components/chart/pieChart.vue'

const age = [
  { label: '10대', value: 7000, color: '#D7E1F7' },
  { label: '20대', value: 20000, color: '#243E8E' },
  { label: '30대', value: 35000, color: '#9B48FF' },
  { label: '40대', value: 15000, color: '#41BCF5' },
  { label: '50대', value: 11600, color: '#4776E5' },
  { label: '60대+', value: 10000, color: '#A5D15D' }
]
</script>
