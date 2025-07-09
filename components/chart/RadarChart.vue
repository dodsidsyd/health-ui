<template>
  <ClientOnly>
    <VueApexCharts type="radar" :options="chartOptions" :series="chartDatas" :height="height" />
  </ClientOnly>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

interface RadarChartProps {
  title?: string //Main title
  height?: string
  categories?: string[] // x축 기준 데이터
  datas?: any[] // chart Data
}

const props = withDefaults(defineProps<RadarChartProps>(), {
  title: () => '',
  height: () => '500px',
  categories: () => ['January', 'February', 'March', 'April', 'May', 'June'],
  datas: () => [
    {
      name: 'Series A',
      data: [80, 50, 30, 40, 100, 20]
    }
  ]
})

// 차트 옵션
const chartOptions = computed(() => {
  return {
    chart: {
      // height: 350,
      type: 'radar',
      zoom: {
        enabled: false // 줌 기능 비활성화
      }
    },
    title: {
      text: 'Basic Radar Chart'
    },
    yaxis: {
      stepSize: 20
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June']
    }
  }
})

const chartDatas = computed(() => {
  return [
    {
      name: 'Series A',
      data: [80, 50, 30, 40, 100, 20]
    }
  ]
})
</script>
