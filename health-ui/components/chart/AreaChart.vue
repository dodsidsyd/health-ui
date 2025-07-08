<template>
  <ClientOnly>
    <VueApexCharts type="area" :options="chartOptions" :series="chartDatas" :height="height" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
// import type { AreaChartProps } from '@/types/chart.type'

interface ChartItemProps {
  name: string
  data: number[]
}

interface AreaChartProps {
  type?: 'primary' | 'secondary' | 'teriary' | 'gray' | 'black'
  title?: string //Main title
  titleAlign?: string // title align
  xtitle?: string // x축 title
  ytitle?: string // y축 title
  height?: string // height
  categories?: string[] // x축 기준 데이터
  datas?: ChartItemProps[] // chart Data
}

const props = withDefaults(defineProps<AreaChartProps>(), {
  type: () => 'primary',
  title: () => '',
  titleAlign: () => '',
  xtitle: () => '',
  ytitle: () => '',
  height: () => '500px',
  categories: () => ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월'], //default sample data
  datas: () => [
    {
      //default sample data
      name: '2024년 매출',
      data: [10, 41, 35, 51, 80, 62, 69, 91, 125]
    },
    {
      name: '2025년 매출',
      data: [22, 33, 55, 77, 88, 62, 69, 100, 200]
    }
  ]
})

// 차트 옵션
const chartOptions = computed(() => {
  return {
    chart: {
      // height: 350,
      type: 'area',
      zoom: {
        enabled: false // 줌 기능 비활성화
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
