<template>
  <PieChart :data="chartData" :size="160" chartClass="gender-chart" />
</template>

<script setup>
import PieChart from '~/components/chart/pieChart.vue'

const chartData = [
  { label: '남성', value: 1500, color: '#FF6B6B' },
  { label: '여성', value: 2300, color: '#4ECDC4' }
]
</script>
