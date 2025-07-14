<template>
  <div class="chart-container">
    <apexchart ref="chartRef" type="area" height="100" :options="chartOptions" :series="series" />

    <!-- 평균 심박수 툴팁 -->
    <div
      v-if="tooltipVisible"
      class="tooltip"
      :style="{
        left: `${tooltipPosition.x + (averageHeartRate >= 81 ? -45 : 0)}px`,
        top: `${tooltipPosition.y + (averageHeartRate >= 81 ? -13 : -45)}px`
      }"
      style="
        position: absolute;
        transform: translateX(-50%);
        padding: 0.4rem 0.8rem;
        background: #4f5561;
        border-radius: 1.2rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: #fff;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
      "
    >
      평균 {{ averageHeartRate }}%
      <svg
        v-if="averageHeartRate >= 81"
        class="tooltip-arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="6"
        viewBox="0 0 7 4"
        fill="none"
        style="position: absolute; right: -7px; top: 50%; transform: translateY(-50%) rotate(-90deg)"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.23228 3C4.46248 4.33333 2.53798 4.33333 1.76818 3L0.0361328 0H6.96433L5.23228 3Z"
          fill="#4F5561"
        />
      </svg>
      <svg
        v-else
        class="tooltip-arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="6"
        viewBox="0 0 7 4"
        fill="none"
        style="position: absolute; left: 50%; bottom: -5px; transform: translateX(-50%)"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.23228 3C4.46248 4.33333 2.53798 4.33333 1.76818 3L0.0361328 0H6.96433L5.23228 3Z"
          fill="#4F5561"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// ApexCharts 컴포넌트 등록
const apexchart = VueApexCharts

const chartRef = ref(null)

// Props로 심박수 데이터 받기
const props = defineProps({
  heartRateData: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: []
  },
  maxHeartRate: {
    type: Number,
    default: 100
  },
  minHeartRate: {
    type: Number,
    default: 0
  }
})

// 심박수 데이터에서 평균값 계산
const averageHeartRate = computed(() => {
  if (!props.heartRateData || props.heartRateData.length === 0) return 0
  const sum = props.heartRateData.reduce((acc, data) => acc + data.value, 0)
  return Math.round(sum / props.heartRateData.length)
})

// 툴팁 상태
const tooltipVisible = ref(true)
const tooltipPosition = reactive({ x: 0, y: 0 })

// ApexCharts 시리즈 데이터
const series = computed(() => {
  const chartStartTime = props.heartRateData[0]?.timestamp.getTime()
  const chartEndTime = props.heartRateData[props.heartRateData.length - 1]?.timestamp.getTime()
  const timeRange = chartEndTime - chartStartTime

  const mountainData = []
  for (let i = 0; i <= 100; i += 1) {
    // 1% 간격으로 더 부드럽게
    const timePosition = chartStartTime + (timeRange * i) / 100
    // 사인 함수로 부드러운 산 모양 생성 (0도~180도)
    const yValue = Math.sin((i / 100) * Math.PI) * 100
    mountainData.push({
      x: timePosition,
      y: yValue
    })
  }

  const mainSeries = {
    name: '심박수',
    data: mountainData
  }

  // **평균값 포인트** - heartRateData의 실제 평균값 사용
  const averagePercent = averageHeartRate.value
  const averagePointTime = chartStartTime + (timeRange * averagePercent) / 100

  // **산 모양에서 해당 %의 높이** 계산
  const yPosition = Math.sin((averagePercent / 100) * Math.PI) * 100

  const averagePointSeries = {
    name: '평균',
    data: [
      {
        x: averagePointTime,
        y: yPosition
      }
    ]
  }

  return [mainSeries, averagePointSeries]
})

// ApexCharts 옵션
const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 100,
    sparkline: {
      enabled: true
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    },
    events: {
      mounted: (chartContext, config) => {
        // 차트가 마운트된 후 툴팁 위치 업데이트
        setTimeout(() => {
          updateTooltipPosition()
        }, 300)
      },
      updated: (chartContext, config) => {
        // 차트가 업데이트된 후 툴팁 위치 업데이트
        setTimeout(() => {
          updateTooltipPosition()
        }, 300)
      }
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3,
    colors: ['#4C7FF7'],
    lineCap: 'round'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.3,
      gradientToColors: ['#4C7FF7'],
      inverseColors: false,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 100]
    }
  },
  colors: ['#4C7FF7'],
  xaxis: {
    type: 'datetime',
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    min: props.minHeartRate - 5,
    max: props.maxHeartRate + 5,
    labels: {
      show: false
    }
  },
  grid: {
    show: false
  },
  tooltip: {
    enabled: false // 기본 툴팁 비활성화
  },
  markers: {
    size: [0, 4],
    colors: ['transparent', '#ffffff'],
    strokeColors: ['transparent', '#4C7FF7'],
    strokeWidth: [0, 2],
    hover: {
      size: 0
    }
  },
  plotOptions: {
    area: {
      fillTo: 'end'
    }
  }
}))

// 평균 심박수에 해당하는 위치 계산
function updateTooltipPosition() {
  if (!chartRef.value || !chartRef.value.chart) return

  const chart = chartRef.value.chart
  const chartRect = chart.el.getBoundingClientRect()

  // 차트의 실제 그래프 영역 계산
  const plotArea = chart.w.globals.dom.baseEl.querySelector('.apexcharts-inner')
  if (!plotArea) return

  const plotRect = plotArea.getBoundingClientRect()

  // **평균값 %에 따른 x축 위치** 계산 (0%=왼쪽, 100%=오른쪽)
  const averagePercent = averageHeartRate.value
  const xPosition = (plotRect.width * averagePercent) / 100

  // **사인 함수로 부드러운 산 모양에서 해당 %의 y축 높이** 계산
  const yValue = Math.sin((averagePercent / 100) * Math.PI) * 100
  const normalizedValue = yValue / 100
  const yPosition = plotRect.height - normalizedValue * plotRect.height

  // 컨테이너 기준으로 위치 조정
  const containerRect = chartRef.value.$el.getBoundingClientRect()

  tooltipPosition.x = xPosition + (plotRect.left - containerRect.left)
  tooltipPosition.y = yPosition + (plotRect.top - containerRect.top)
}

// 심박수 데이터 변경 시 툴팁 위치 업데이트
watch([averageHeartRate, () => props.heartRateData], () => {
  nextTick(() => {
    setTimeout(() => {
      updateTooltipPosition()
    }, 100)
  })
})

// 리사이즈 대응
function handleResize() {
  setTimeout(() => {
    updateTooltipPosition()
  }, 100)
}

onMounted(() => {
  // 초기 툴팁 위치 설정
  setTimeout(() => {
    updateTooltipPosition()
  }, 500)

  // 리사이즈 이벤트 리스너
  window.addEventListener('resize', handleResize)

  // 컴포넌트 언마운트 시 이벤트 리스너 정리
  return () => {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
}

.tooltip {
  transition: all 0.3s ease;
}

// ApexCharts 스타일 오버라이드
:deep(.apexcharts-svg) {
  background: transparent;
}

:deep(.apexcharts-area-series) {
  filter: none;
}
</style>
