<template>
  <div class="expert-chart-box">
    <ClientOnly>
      <VueApexCharts type="radar" :options="chartOptions" :series="chartSeries" :height="chartHeight" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// DOM 조작을 위한 함수
const applyCustomStyles = () => {
  const tryApplyStyles = () => {
    // 먼저 DOM 구조 전체 확인
    const chartBox = document.querySelector('.expert-chart-box')
    if (!chartBox) {
      console.log('Chart box not found')
      return false
    }

    const svg = chartBox.querySelector('svg')
    if (!svg) {
      console.log('SVG not found')
      return false
    }

    console.log('SVG found, checking structure...')

    // 다각형에 박스 섀도우 효과 추가
    const applyPolygonShadow = () => {
      // defs 요소가 있는지 확인하고 없으면 생성
      let defs = svg.querySelector('defs')
      if (!defs) {
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
        svg.insertBefore(defs, svg.firstChild)
      }

      // 기존 필터 제거 (중복 방지)
      const existingFilter = defs.querySelector('#polygon-shadow')
      if (existingFilter) {
        existingFilter.remove()
      }

      // 섀도우 필터 생성
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
      filter.setAttribute('id', 'polygon-shadow')
      filter.setAttribute('x', '-50%')
      filter.setAttribute('y', '-50%')
      filter.setAttribute('width', '200%')
      filter.setAttribute('height', '200%')

      // 그림자 효과 생성
      const feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow')
      feDropShadow.setAttribute('dx', '2')
      feDropShadow.setAttribute('dy', '4')
      feDropShadow.setAttribute('stdDeviation', '3')
      feDropShadow.setAttribute('flood-color', 'rgba(0, 0, 0, 0.15)')
      feDropShadow.setAttribute('flood-opacity', '1')

      filter.appendChild(feDropShadow)
      defs.appendChild(filter)

      // 데이터 다각형(채워진 영역)에 필터 적용
      const dataPolygons = svg.querySelectorAll('.apexcharts-series-radar .apexcharts-series path')
      dataPolygons.forEach(polygon => {
        if (polygon.getAttribute('fill') && polygon.getAttribute('fill') !== 'none') {
          polygon.style.filter = 'url(#polygon-shadow)'
        }
      })

      console.log('Applied shadow filter to data polygons:', dataPolygons.length)
    }

    // 모든 텍스트 요소 찾기
    const allTexts = svg.querySelectorAll('text')
    console.log('All text elements found:', allTexts.length)

    let foundLabels = false

    allTexts.forEach((textElement, index) => {
      const text = textElement.textContent || ''
      console.log(
        `Text ${index}:`,
        text,
        'Classes:',
        textElement.className.baseVal || textElement.getAttribute('class')
      )

      // 파이프 문자가 포함된 텍스트 찾기
      if (text.includes(' | ')) {
        foundLabels = true
        const parts = text.split(' | ')
        if (parts.length === 2) {
          const [category, value] = parts
          console.log(`Found target text: "${category}" | "${value}"`, textElement)

          // 기존 내용 제거
          textElement.innerHTML = ''

          // text-anchor 속성을 middle로 설정하여 중앙 정렬
          textElement.setAttribute('text-anchor', 'middle')

          // 첫 번째 tspan (카테고리)
          const categorySpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
          categorySpan.textContent = category
          categorySpan.setAttribute('fill', '#555555')
          categorySpan.setAttribute('font-weight', '600')
          categorySpan.setAttribute('x', textElement.getAttribute('x') || '0') // x 좌표 유지
          categorySpan.setAttribute('text-anchor', 'middle') // 카테고리 중앙 정렬
          textElement.appendChild(categorySpan)

          // 두 번째 tspan (값) - 빨간색, 줄바꿈
          const valueSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
          valueSpan.textContent = value
          valueSpan.setAttribute('fill', '#FF0000')
          valueSpan.setAttribute('font-weight', 'bold')
          valueSpan.setAttribute('font-size', '13px')
          valueSpan.setAttribute('x', textElement.getAttribute('x') || '0') // 같은 x 좌표
          valueSpan.setAttribute('dy', '1.2em') // 아래로 이동 (줄바꿈 효과)
          valueSpan.setAttribute('text-anchor', 'middle') // 값 중앙 정렬
          textElement.appendChild(valueSpan)

          console.log(`Applied red color to value: ${value}`)
        }
      }
    })

    // 다각형 섀도우 적용
    applyPolygonShadow()

    if (!foundLabels) {
      console.log('No labels with pipe character found')
      return false
    }

    return true
  }

  // 최대 15번 재시도 (3초 동안)
  let attempts = 0
  const maxAttempts = 15

  const retryInterval = setInterval(() => {
    attempts++
    console.log(`Attempt ${attempts}/${maxAttempts}`)

    if (tryApplyStyles() || attempts >= maxAttempts) {
      clearInterval(retryInterval)
      if (attempts >= maxAttempts) {
        console.log('Max attempts reached, checking final DOM state...')
        // 마지막으로 DOM 상태 확인
        const chartBox = document.querySelector('.expert-chart-box')
        if (chartBox) {
          console.log('Chart box HTML:', chartBox.innerHTML.substring(0, 500))
        }
      } else {
        console.log('Styles applied successfully!')
      }
    }
  }, 200)
}

onMounted(() => {
  // 차트 렌더링 후 스타일 적용
  applyCustomStyles()
})

// Props 정의
interface ExpertChartProps {
  expertName?: string
  expertData?: number[]
  categories?: string[]
  height?: string
  theme?: 'default'
  showValues?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<ExpertChartProps>(), {
  expertName: '전문가',
  expertData: () => [40, 130, 140, 50, 130],
  categories: () => ['답변수', '게시글수', '대리청구 건수', '고객수', '받은 공갑수'],
  height: '250px',
  theme: 'default',
  showValues: true,
  animated: true
})

const chartHeight = computed(() => props.height)

// 테마별 색상 및 스타일 설정
const themeConfig = computed(() => {
  const themes = {
    default: {
      primary: '#4C7FF7',
      secondary: '#059669',
      background: '#ffffff',
      textColor: '#555555',
      gridColor: '#E2E2E2',
      fillColors: ['#ffffff']
    }
  }
  return themes[props.theme]
})

// 차트 시리즈 데이터
const chartSeries = computed(() => [
  {
    name: props.expertName,
    data: props.expertData
  }
])

// 차트 옵션
const chartOptions = computed(() => ({
  chart: {
    type: 'radar',
    background: themeConfig.value.background,
    fontFamily: 'Pretendard',
    // 차트 전체 여백 추가로 라벨 공간 확보
    offsetX: 0,
    offsetY: 0,
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    },
    animations: {
      enabled: props.animated,
      easing: 'easeinout',
      speed: 300,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 150
      }
    },
    events: {
      mounted: () => {
        // 차트 마운트 후 스타일 적용
        applyCustomStyles()
      },
      updated: () => {
        // 차트 업데이트 후 스타일 적용
        applyCustomStyles()
      },
      dataPointSelection: () => {
        // 데이터 포인트 선택 후에도 스타일 적용
        applyCustomStyles()
      }
    }
  },

  colors: [themeConfig.value.primary, themeConfig.value.secondary],

  plotOptions: {
    radar: {
      size: 110,
      polygons: {
        strokeColors: '#E2E2E2',
        strokeWidth: 1,
        connectorColors: '#E2E2E2',
        fill: {
          colors: themeConfig.value.fillColors
        }
      }
    }
  },

  // 차트 background 다각형에 shadow 효과 추가
  grid: {
    show: false,
    borderColor: 'transparent',
    strokeDashArray: 0,
    position: 'back',
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    },
    row: {
      colors: undefined,
      opacity: 0.5
    },
    column: {
      colors: undefined,
      opacity: 0.5
    },
    // 차트 패딩 조정으로 라벨 공간 확보
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },

  xaxis: {
    categories: props.categories.map((category, index) => {
      const value = props.expertData[index]
      // 고유 ID를 가진 요소로 만들어 CSS로 스타일링
      return `${category} | ${value}`
    }),
    labels: {
      show: true,
      style: {
        colors: themeConfig.value.textColor,
        fontSize: '12px',
        fontWeight: '500'
      },
      offsetY: 0 // 라벨을 차트에서 더욱 멀리 배치
    }
  },

  yaxis: {
    show: false,
    min: 0,
    max: 200,
    tickAmount: 2
  },

  dataLabels: {
    enabled: false // xaxis에 값을 표시하므로 dataLabels 비활성화
  },

  markers: {
    size: 4,
    colors: themeConfig.value.primary,
    strokeColors: '#ffffff',
    strokeWidth: 2
  },

  stroke: {
    show: true,
    width: 2,
    colors: [themeConfig.value.primary],
    dashArray: 0
  },

  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'center',
    fontSize: '14px',
    fontWeight: '500',
    offsetY: 200,
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      radius: 6
    },
    itemMargin: {
      horizontal: 10,
      vertical: 5
    }
  }

  // responsive: [
  //   {
  //     breakpoint: 768,
  //     options: {
  //       chart: {
  //         height: 300
  //       },
  //       plotOptions: {
  //         radar: {
  //           size: 100
  //         }
  //       },
  //       dataLabels: {
  //         enabled: false
  //       },
  //       legend: {
  //         position: 'bottom'
  //       }
  //     }
  //   },
  // {
  //   breakpoint: 480,
  //   options: {
  //     chart: {
  //       height: 250
  //     },
  //     plotOptions: {
  //       radar: {
  //         size: 80
  //       }
  //     },
  //     xaxis: {
  //       labels: {
  //         style: {
  //           fontSize: '11px'
  //         }
  //       }
  //     }
  //   }
  // }
  // ]
}))
</script>

<style lang="scss" scoped>
.expert-chart-box {
  padding: 1.6rem 2rem;
  border-radius: 2rem;
  background: #fff;
  border: 0.1rem solid #e2e2e2;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  // ApexCharts xaxis 라벨 스타일링
  :deep(.apexcharts-xaxis-label) {
    // 파이프 문자 뒤에 오는 숫자(값)를 다른 색상으로 스타일링
    tspan {
      &:nth-child(1) {
        // 카테고리명 (파이프 앞 부분)
        fill: #555 !important;
        font-weight: 500;
      }

      &:nth-child(2) {
        // 값 부분 (파이프 뒤 부분)
        fill: #2b2b2b !important;
        font-weight: bold !important;
        font-size: 1.6rem !important;
      }
    }
  }

  // 차트 background 다각형에 box-shadow 추가
  :deep(.apexcharts-radar-series) {
    polygon {
      filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.05));
    }
  }
}
</style>
