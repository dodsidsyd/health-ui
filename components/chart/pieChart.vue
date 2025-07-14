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
  colors: chartData.value.map(item => item.color),
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
    }
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
      startAngle: -90,
      endAngle: 270,
      dataLabels: {
        offset: -20, // 라벨을 원형 중심쪽으로 이동
        minAngleToShowLabel: 10
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
        font-weight: 400;
        line-height: 2rem;
        color: #959595;
      }
    }
  }
}
</style>
