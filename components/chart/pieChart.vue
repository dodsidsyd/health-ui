<template>
  <div :class="['chart-wrap', chartClass]">
    <div class="chart-container">
      <apexchart type="pie" :options="chartOptions" :series="series" :width="size" :height="size" />
    </div>

    <!-- 범례 -->
    <div class="legend">
      <div v-for="item in chartData" :key="item.label" class="legend-item">
        <div class="dot" :style="{ backgroundColor: item.color }"></div>
        <span class="legend-label">{{ item.label }}</span>
      </div>
    </div>
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
  chartClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
  chartClass: ''
})

const chartData = computed(() => props.data)

// ApexCharts 시리즈 데이터
const series = computed(() => chartData.value.map(item => item.value))

// 기본 색상 팔레트 (ApexCharts 데모와 동일)
const defaultColors = [
  '#008FFB',
  '#00E396',
  '#FEB019',
  '#FF4560',
  '#775DD0',
  '#546E7A',
  '#26a69a',
  '#D10CE8',
  '#FF6B6B',
  '#4ECDC4'
]

// 색상 계산 (색상이 제공되지 않았을 때 기본 색상 사용)
const chartColors = computed(() =>
  chartData.value.map((item, index) => item.color || defaultColors[index % defaultColors.length])
)

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
  labels: chartData.value.map(item => item.label),
  colors: chartColors.value,
  legend: {
    show: false // 커스텀 범례 사용
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return Math.round(val) + '%'
    },
    style: {
      fontSize: '12px',
      fontWeight: 600,
      colors: ['#fff']
    },
    dropShadow: {
      enabled: false
    },
    textAnchor: 'middle',
    position: 'center',
    offset: 0
  },
  tooltip: {
    enabled: false // 마우스 오버 툴팁 비활성화
  },
  plotOptions: {
    pie: {
      size: undefined,
      donut: {
        size: '0%'
      },
      customScale: 1,
      offsetX: 0,
      offsetY: 0,
      startAngle: 0,
      endAngle: 360,
      dataLabels: {
        offset: -20,
        minAngleToShowLabel: 10,
        textAnchor: 'middle',
        position: 'center'
      }
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
          width: props.size * 0.8
        }
      }
    }
  ]
}))
</script>

<style lang="scss" scoped>
.chart-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.8rem;
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

  .legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem 1.6rem;
    max-width: 20rem;
    @media (max-width: 370px) {
      gap: 0.6rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      border-radius: 1.6rem;

      .dot {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }

      .legend-label {
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 2rem;
        color: #959595;
        white-space: nowrap;
      }
    }
  }
}
</style>
