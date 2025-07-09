<template>
  <div class="walking-graph-container">
    <ClientOnly>
      <div ref="scrollContainer" class="chart-scroll-container">
        <div class="chart-wrapper" :style="{ minWidth: chartWrapperWidth + 'px' }">
          <VueApexCharts type="bar" :options="chartOptions" :series="chartDatas" :height="height" />
        </div>
      </div>
      <!-- 고정 Y축 라벨 오버레이 -->
      <div class="fixed-yaxis-labels">
        <div
          v-for="(label, index) in yAxisLabels"
          :key="index"
          class="yaxis-label"
          :style="{ top: label.position + '%' }"
        >
          {{ label.text }}
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

interface WalkingGraphProps {
  title?: string
  height?: string
  categories?: string[]
  datas?: number[] // 걸음수 데이터
  goalSteps?: number // 목표 걸음수
  showScrollHint?: boolean // 스크롤 안내 표시 여부
}

const props = withDefaults(defineProps<WalkingGraphProps>(), {
  title: '일일 걸음수',
  height: '300px',
  goalSteps: 10000, // 디폴트 10000, 외부에서 지정 가능
  showScrollHint: true,
  categories: () => Array.from({ length: 31 }, (_, i) => `${i + 1}`),
  datas: () => [
    8500, 12300, 9800, 15200, 11400, 13600, 16800, 7200, 14500, 18900, 6800, 11200, 9500, 17600, 12800, 8900, 19200,
    5400, 13700, 16100, 7800, 10500, 14200, 18400, 9200, 12600, 15800, 6900, 17300, 13500, 20000
  ]
})

// 1번 막대 클릭 상태 관리
const isFirstBarClicked = ref(false)

// 차트 옵션
const chartOptions = computed(() => {
  // 데이터 색상 결정 (목표 달성 여부에 따라)
  const colors = props.datas.map(value => (value >= props.goalSteps ? '#4C7FF7' : '#C4D2DE'))

  return {
    chart: {
      type: 'bar',
      zoom: {
        enabled: false // 줌 비활성화 (스크롤과 충돌 방지)
      },
      toolbar: {
        show: false // 툴바 숨김
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        borderRadiusApplication: 'around',
        horizontal: false,
        columnWidth: 12, // 막대 너비를 16px로 고정
        distributed: true, // 개별 색상 적용을 위해 필요
        dataLabels: {
          position: 'top'
        }
      }
    },
    colors: colors,
    dataLabels: {
      enabled: false
    },

    xaxis: {
      categories: props.categories,
      labels: {
        style: {
          fontSize: '11px',
          colors: '#959595'
        },
        rotate: -45 // 라벨 기울이기 (가독성 향상)
      }
      // X축 스크롤을 위해 범위 제거
      // range: Math.min(7, props.categories.length)
    },
    yaxis: {
      opposite: true, // Y축을 우측으로 이동
      min: 0,
      max: props.goalSteps * 2, // goalSteps의 2배를 최대값으로 설정
      tickAmount: 4, // goalSteps 기준으로 4단계 분할
      labels: {
        show: false, // Y축 라벨 숨김 (커스텀 라벨 사용)
        formatter: function (value: number) {
          return value
        },
        style: {
          fontSize: '11px',
          colors: '#666'
        }
      },
      // Y축 고정을 위한 설정
      floating: false,
      axisBorder: {
        show: false // 경계선 숨김
      },
      axisTicks: {
        show: false // 눈금 숨김
      }
    },
    grid: {
      show: false,
      borderColor: '#e5e7eb',
      strokeDashArray: 5
    },
    legend: {
      show: false // 개별 색상이므로 범례 숨김
    },
    tooltip: {
      theme: 'dark',
      followCursor: false,
      intersect: true,
      shared: false,
      offsetX: 0,
      offsetY: 0,
      trigger: 'click', // 클릭 시에만 tooltip 표시
      fixed: {
        enabled: false
      },
      marker: {
        show: false
      },
      style: {
        fontSize: '12px'
      },
      onDatasetHover: {
        highlightDataSeries: false
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex]

        // 현재 날짜 기준으로 2025.MM.dd 형식 생성
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
        const day = String(dataPointIndex + 1).padStart(2, '0')
        const dateString = `${year}.${month}.${day}`

        // 마지막 3개 데이터 포인트에 대해 위치 조정
        const totalDataPoints = series[0].length
        const isLastFew = dataPointIndex >= totalDataPoints - 3
        const isFirst = dataPointIndex === 0 // 1번 막대 확인

        // 1번 막대 클릭 상태 업데이트
        if (isFirst) {
          isFirstBarClicked.value = true
        } else {
          isFirstBarClicked.value = false
        }

        const tooltipStyle = 'position: absolute; left: 50%; transform: translateX(-50%) translateY(-100%);'

        return `
          <div style="
            ${tooltipStyle}
            background-color: #4f5561;
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 12px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            white-space: nowrap;
          ">
            <div style="
              margin: 0;
              padding: 0;
              padding-bottom: 0;
              margin-bottom: 4px;
              color: white;
              font-weight: normal;
            ">
              ${dateString}
            </div>
            <div style="color: white; white-space:nowrap">
              ${value.toLocaleString()} 걸음 / 6.04km
            </div>
            
          </div>
        `
      }
    },
    annotations: {
      yaxis: [
        {
          y: props.goalSteps,
          borderColor: '#4C7FF7',
          borderWidth: 1,
          strokeDashArray: 2
        }
      ]
    }
  }
})

const chartDatas = computed(() => {
  return [
    {
      name: '',
      data: props.datas
    }
  ]
})

// 차트 래퍼 너비 계산
const chartWrapperWidth = computed(() => {
  return props.categories.length * 25
})

// Y축 라벨 데이터 (goalSteps 기준으로 동적 계산)
const yAxisLabels = computed(() => {
  const maxValue = props.goalSteps * 2 // goalSteps의 2배를 최대값으로 설정
  const step = props.goalSteps / 2 // goalSteps의 절반씩 증가

  return [
    { text: maxValue.toLocaleString(), position: 0 }, // 상단 (goalSteps * 2)
    { text: (maxValue - step).toLocaleString(), position: 25 }, // goalSteps * 1.5
    { text: props.goalSteps.toLocaleString(), position: 50 }, // goalSteps (목표값)
    { text: step.toLocaleString(), position: 75 }, // goalSteps * 0.5
    { text: '0', position: 100 } // 하단 (0)
  ]
})
</script>

<style scoped lang="scss">
.walking-graph-container {
  position: relative;
  width: 100%;
  max-width: 84rem;
  margin: auto;
  padding-right: 6.5rem;
}

.chart-scroll-container {
  overflow-x: auto; /* 가로 스크롤 활성화 */
  position: relative;
  padding: 0 5rem;
}

.chart-wrapper {
  width: max-content; /* 내용에 맞는 너비 */
  position: relative;
}

/* ApexCharts 스크롤바 스타일링 */
:deep(.apexcharts-scrollbar) {
  background: #f1f5f9 !important;
  border-radius: 4px !important;
}

:deep(.apexcharts-scrollbar-thumb) {
  background: #94a3b8 !important;
  border-radius: 4px !important;
}

:deep(.apexcharts-scrollbar-thumb:hover) {
  background: #64748b !important;
}

/* 고정 Y축 라벨 오버레이 */
.fixed-yaxis-labels {
  position: absolute;
  bottom: 5.7rem; /* 차트 상단 여백 */
  right: 1rem;
  width: 4rem;
  height: calc(100% - 8rem); /* 상하단 여백 제외 */
  pointer-events: none;
  z-index: 100;
}

.yaxis-label {
  position: absolute;
  left: 0;
  padding: 0;
  font-size: 1.1rem;
  font-weight: 400;
  color: #959595;
  &:nth-child(3) {
    color: #555;
  }
}

/* 차트가 wrapper 너비에 맞도록 강제 */
:deep(.apexcharts-canvas) {
  width: 100% !important;
}

/* 기존 Y축 완전히 숨김 */
:deep(.apexcharts-yaxis) {
  display: none !important;
}

/* 차트 오른쪽 여백 추가 */
:deep(.apexcharts-inner) {
  padding-right: 45px !important;
}

/* 전체 차트 영역의 overflow 설정 */
:deep(.apexcharts-svg) {
  overflow: visible !important;
}

/* Tooltip 가운데 정렬 */
:deep(.apexcharts-tooltip) {
  transform: translateX(-50%) translateY(-60%) !important;
  border-radius: 8px !important;
  text-align: center !important;
  overflow: visible !important;

  &:before {
    content: '';
    display: block;
    width: 0.6rem;
    height: 0.4rem;
    bottom: -0.3rem;
    left: 50%;
    transform: translateX(-50%);
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='4' viewBox='0 0 7 4' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.23204 3C4.46224 4.33333 2.53774 4.33333 1.76794 3L0.0358887 0H6.96409L5.23204 3Z' fill='%234F5561'/%3E%3C/svg%3E");
    position: absolute;
    z-index: 1000;
  }
}

/* Dark 테마 Tooltip 배경색 설정 */
.dark :deep(.apexcharts-tooltip),
[data-theme='dark'] :deep(.apexcharts-tooltip) {
  background-color: #4f5561 !important;
  border-color: #4f5561 !important;
  border-radius: 8px !important;
  text-align: center !important;
  overflow: visible !important;
  color: #ffffff !important;

  .apexcharts-tooltip-title {
    background-color: #4f5561 !important;
    border-color: #4f5561 !important;
    color: #ffffff !important;
    margin: 0;
    margin-bottom: 0;
    padding-bottom: 0;
    padding-top: 1.2rem !important;
  }

  .apexcharts-tooltip-y-group {
    background-color: #4f5561 !important;
    color: #ffffff !important;
  }

  .apexcharts-tooltip-series-group {
    background-color: #4f5561 !important;
  }
}

/* ApexCharts Dark Theme Tooltip */
:deep(.apexcharts-tooltip.apexcharts-theme-dark) {
  background-color: #4f5561 !important;
  border-color: #4f5561 !important;
  border-radius: 0.8rem !important;
  text-align: center !important;
  overflow: visible !important;
  color: #ffffff !important;
  font-weight: 400;
  .apexcharts-tooltip-title {
    background-color: #4f5561 !important;
    border-color: #4f5561 !important;
    color: #ffffff !important;
    margin: 0;
    padding-bottom: 0;
    font-weight: 500;
  }

  .apexcharts-tooltip-y-group {
    background-color: #4f5561 !important;
    color: #ffffff !important;
  }

  .apexcharts-tooltip-series-group {
    background-color: #4f5561 !important;
  }

  .apexcharts-tooltip-text {
    color: #ffffff !important;
  }

  .apexcharts-tooltip-text-y-label {
    color: #ffffff !important;
  }

  .apexcharts-tooltip-text-y-value {
    color: #ffffff !important;
  }
}

/* ApexCharts Tooltip Border-radius 강제 적용 */
:deep(.apexcharts-tooltip),
:deep(.apexcharts-tooltip-box),
:deep(.apexcharts-tooltip.apexcharts-theme-light),
:deep(.apexcharts-tooltip.apexcharts-theme-dark) {
  border-radius: 0.8rem !important;
  -webkit-border-radius: 0.8rem !important;
  -moz-border-radius: 0.8rem !important;
}

/* Tooltip 내부 요소들도 border-radius 적용 */
:deep(.apexcharts-tooltip-title),
:deep(.apexcharts-tooltip-y-group),
:deep(.apexcharts-tooltip-series-group) {
  border-radius: 0 !important;
}

/* 첫 번째 요소에만 상단 border-radius */
:deep(.apexcharts-tooltip-title:first-child) {
  border-radius: 0.8rem 0.8rem 0 0 !important;
}

/* 마지막 요소에만 하단 border-radius */
:deep(.apexcharts-tooltip-y-group:last-child),
:deep(.apexcharts-tooltip-series-group:last-child) {
  border-radius: 0 0 0.8rem 0.8rem !important;
}
</style>
