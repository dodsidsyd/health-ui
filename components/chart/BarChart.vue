<template>
  <ClientOnly>
    <VueApexCharts type="bar" :options="chartOptions" :series="chartDatas" :height="height" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
// import type { BarChartProps } from '@/types/chart.type'

interface BarChartProps {
  type?: 'primary' | 'secondary' | 'teriary' | 'gray' | 'black'
  title?: string //Main title
  titleAlign?: string // title align
  xtitle?: string // x축 title
  ytitle?: string // y축 title
  height?: string // height
  horizontal?: boolean // x축과 y축의 전환
  categories?: string[] // x축 기준 데이터
  datas?: any[] // chart Data
}

const props = withDefaults(defineProps<BarChartProps>(), {
  type: () => 'primary',
  title: () => '',
  titleAlign: () => '',
  xtitle: () => '',
  ytitle: () => '',
  height: () => '500px',
  horizontal: () => false,
  categories: () => [
    'South Korea',
    'Canada',
    'United Kingdom',
    'Netherlands',
    'Italy',
    'France',
    'Japan',
    'United States',
    'China',
    'Germany'
  ], //default sample data
  datas: () => [
    {
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }
  ]
})

// 차트 옵션
const chartOptions = computed(() => {
  return {
    chart: {
      // height: 350,
      type: 'bar',
      zoom: {
        enabled: false // 줌 기능 비활성화
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: props.horizontal
      }
    },
    dataLabels: {
      enabled: false //true: 데이터를 표시, false: 데이터를 표시하지 않음.
    },
    stroke: {
      // AreaChart에서는 curve를 표준으로 설정
      curve: 'smooth'
    },
    title: {
      text: props.title || undefined, // Main title
      align: props.titleAlign || 'center'
    },
    xaxis: {
      title: {
        text: props.xtitle || undefined //x축 title
      },
      categories: props.categories
    },
    yaxis: {
      title: {
        text: props.ytitle || undefined //y축 title
      }
    }
  }
})

const chartDatas = computed(() => {
  return props.datas
})
</script>
