<template>
  <div :class="['chart-wrap', chartClass]">
    <div class="chart-container">
      <apexchart type="pie" :options="chartOptions" :series="series" :width="size" :height="height" />
    </div>
    <div v-if="chartData.length === 0" class="empty-data-container">데이터가 충분하지 않아요</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// ApexChart 컴포넌트 등록
const apexchart = VueApexCharts

interface ChartData {
  label: string
  value: number
  color: string
}

// Props 정의
interface Props {
  data: ChartData[]
  size?: number
  height?: number
  chartClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 184,
  height: 180,
  chartClass: ''
})

const chartData = computed(() => props.data)

// ApexCharts 시리즈 데이터
const series = computed(() => {
  if (chartData.value.length === 0) {
    // 데이터가 없을 때 100%를 차지하는 단일 더미 데이터 반환
    return [100]
  }
  return chartData.value.map(item => item.value)
})

// ApexCharts 옵션
const chartOptions = computed(() => ({
  chart: {
    type: 'pie',
    toolbar: {
      show: false
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    }
  },
  labels: chartData.value.length === 0 ? [''] : chartData.value.map(item => item.label),
  colors: chartData.value.length === 0 ? ['#E2E2E2'] : chartData.value.map(item => item.color),
  legend: {
    show: false // 커스텀 범례 사용
  },
  dataLabels: {
    enabled: chartData.value.length > 0,
    formatter: function (val: number) {
      return Math.round(val) + '%'
    },
    style: {
      fontFamily: 'pretendard',
      fontSize: '1.8rem',
      fontWeight: 700,
      colors: ['#fff']
    },
    dropShadow: {
      enabled: false
    }
  },
  tooltip: {
    enabled: chartData.value.length > 0 // 데이터가 있을 때만 툴팁 활성화
  },
  plotOptions: {
    pie: {
      size: 184,
      customScale: 1.1,
      offsetX: 0,
      offsetY: 1,
      startAngle: -90,
      endAngle: 270,
      dataLabels: {
        offset: -20, // 라벨을 원형 중심쪽으로 이동
        minAngleToShowLabel: 0
      },
      expandOnClick: false
    }
  },
  stroke: {
    show: false
  },
  fill: {
    type: 'solid',
    opacity: 1
  },
  responsive: [
    {
      breakpoint: 370,
      options: {
        chart: {
          width: props.size * 0.9
        }
      }
    }
  ]
}))
</script>

<style lang="scss" scoped>
.chart-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.4rem;
  padding-top: 0.8rem;
  flex: 1;
  .chart-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    // ApexCharts 스타일 오버라이드
    :deep(.apexcharts-canvas) {
      margin: 0 auto;
    }
  }
}
.empty-data-container {
  position: absolute;
  top: 50%;
  left: calc(50%);
  transform: translate(-50%, -50%);
  padding: 1.5rem 2.4rem;
  border-radius: 1.2rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(1rem);
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.2rem;
  color: #fff;
}
</style>
