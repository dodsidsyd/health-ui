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
  //   horizontal?: boolean // x축과 y축의 전환
  categories?: number[] // x축 기준 데이터
  datas?: any[] // chart Data
}

const props = withDefaults(defineProps<BarChartProps>(), {
  type: () => 'primary',
  title: () => '',
  titleAlign: () => '',
  xtitle: () => '',
  ytitle: () => '',
  height: () => '70px',
  //   horizontal: () => false,
  categories: () => [], //default sample data 2008, 2009, 2010, 2011, 2012, 2013, 2014
  datas: () => [
    {
      //   name: 'Marine Sprite',
      data: [44]
    },
    {
      //   name: 'Striking Calf',
      data: [53]
    },
    {
      //   name: 'Tank Picture',
      data: [12]
    },
    {
      //   name: 'Bucket Slope',
      data: [9]
    },
    {
      //   name: 'Reborn Kid',
      data: [25]
    }
    // {
    //   name: 'Marine Sprite',
    //   data: [44, 55, 41, 37, 22, 43, 21]
    // },
    // {
    //   name: 'Striking Calf',
    //   data: [53, 32, 33, 52, 13, 43, 32]
    // },
    // {
    //   name: 'Tank Picture',
    //   data: [12, 17, 11, 9, 15, 11, 20]
    // },
    // {
    //   name: 'Bucket Slope',
    //   data: [9, 7, 5, 8, 6, 9, 4]
    // },
    // {
    //   name: 'Reborn Kid',
    //   data: [25, 12, 19, 32, 25, 24, 10]
    // }
  ]
})

// 차트 옵션
const chartOptions = computed(() => {
  return {
    chart: {
      //   height: 100,
      width: 100,
      toolbar: {
        show: false
      },
      type: 'bar',
      stacked: true,
      stackType: '100%'
    },
    dataLabels: {
      enabled: true // 데이터 라벨 노출/미노출
    },
    grid: {
      // 그리드 숨기기
      show: false
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    stroke: {
      show: false,
      width: 0 // 테두리 선 두께를 0으로 설정
    },
    title: {
      text: props.title || undefined // Main title
    },
    xaxis: {
      categories: props.categories,
      labels: {
        show: false // x축 라벨 숨기기
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false // y축 라벨 숨기기
      }
    },
    tooltip: {
      enabled: false,
      y: {
        formatter: function (val: any) {
          return val + 'K'
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      show: false // 범례 숨기기
      //   position: 'top',
      //   horizontalAlign: 'left',
      //   offsetX: 40
    }
  }
})

const chartDatas = computed(() => {
  return props.datas
})
</script>
