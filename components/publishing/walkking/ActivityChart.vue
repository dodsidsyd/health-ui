<template>
  <div ref="graphContainer" class="day-steps-graph">
    <div class="grap-tit">
      <p>일일걸음수</p>
      <span>걸음수/일</span>
    </div>
    <div class="weeks-graph">
      <div v-for="(item, index) in processedGraphData" :key="index" class="graph-item">
        <div class="graph-bar">
          <i
            class="graph-bar-fill"
            :style="{ height: isVisible ? item.height : '0%' }"
            :class="{ animate: isVisible }"
            @click="toggleItemTooltip(item)"
          >
            <div v-if="item.showTooltip" class="tooltip">
              <p class="date">2025.06.{{ item.date }}({{ getDayOfWeek(item.date) }})</p>
              <p class="steps">{{ item.steps.toLocaleString() }}</p>
              <p class="plus-steps">2,300걸음</p>
            </div>
          </i>
        </div>
        <span class="date" :class="item.dateClass">{{ item.date }}</span>
      </div>

      <div v-if="standardLineHeight !== undefined" class="standard-line" :style="{ top: standardLineHeight }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'

// 인터페이스 정의 (steps 속성 추가)
interface GraphDataItem {
  steps: number
  date: string
  dateClass: string
  height?: string
  showTooltip?: boolean
}

// 반응형 변수 선언
const graphContainer = ref<HTMLElement>()
const isVisible = ref(false)

// 원본 데이터 (걸음 수로 입력)
const rawGraphData: GraphDataItem[] = [
  { steps: 3000, date: '10', dateClass: 'saturday' },
  { steps: 7000, date: '11', dateClass: 'sunday' },
  { steps: 8000, date: '12', dateClass: '' },
  { steps: 15000, date: '13', dateClass: '' },
  { steps: 3000, date: '14', dateClass: '' },
  { steps: 3000, date: '15', dateClass: '' },
  { steps: 1200, date: '16', dateClass: '' }
]

// 최대 걸음 수 계산
const maxSteps = computed(() => {
  const stepValues = rawGraphData.map(item => item.steps)
  return Math.max(...stepValues)
})

// 기준선 (10000 걸음) 높이 계산
const standardLineHeight = computed(() => {
  const targetSteps = 10000
  const graphBarMaxHeightRem = 8
  // targetSteps(10000) 이상 걸음에 해당하는 데이터가 있는지 확인
  const hasStepsGreaterThanOrEqualToTarget = rawGraphData.some(item => item.steps >= targetSteps)

  if (!hasStepsGreaterThanOrEqualToTarget || maxSteps.value === 0) {
    return undefined
  }

  // 10000 걸음이 전체 maxSteps에서 차지하는 비율에 해당하는 높이
  const heightRelativeToMax = (targetSteps / maxSteps.value) * graphBarMaxHeightRem

  return `${graphBarMaxHeightRem - heightRelativeToMax}rem`
})

const processedGraphData = ref(
  rawGraphData.map(item => {
    // 최대 걸음수를 기준으로 퍼센트 계산
    const calculatedHeight = (item.steps / maxSteps.value) * 100
    // 높이는 최대 100%로 제한 (만약 최대 걸음수보다 큰 값이 올 경우를 대비)
    const limitedHeight = Math.min(calculatedHeight, 100)

    return {
      ...item,
      height: `${limitedHeight}%`, // 계산된 퍼센트 높이
      showTooltip: false // 각 아이템의 툴팁 상태 초기화
    }
  })
)

// 툴팁 토글 메소드
const toggleItemTooltip = (clickedItem: GraphDataItem) => {
  processedGraphData.value.forEach(item => {
    if (item !== clickedItem) {
      item.showTooltip = false
    }
  })
  clickedItem.showTooltip = !clickedItem.showTooltip
}

// 날짜에 따른 요일 반환 함수 (2025년 7월로 수정)
const getDayOfWeek = (date: string) => {
  const year = 2025
  const month = 7
  const fullDate = new Date(year, month - 1, parseInt(date))
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return days[fullDate.getDay()]
}

// 그래프 애니메이션 옵저버
const observeGraph = () => {
  if (!graphContainer.value) return
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            isVisible.value = true
          }, 100)
          observer.unobserve(entry.target) // 한 번만 실행되도록
        }
      })
    },
    {
      threshold: 0.3 // 30%가 보이면 애니메이션
    }
  )

  observer.observe(graphContainer.value)
}

onMounted(() => {
  nextTick(() => {
    observeGraph()
  })
})
</script>

<style lang="scss" scoped>
.day-steps-graph {
  margin-top: -0.8rem;
  padding: 2rem 2.4rem;
  background: #f9f9f9;
  border-radius: 1.2rem;
  .grap-tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
    }
    span {
      font-size: 1.1rem;
      font-style: normal;
      line-height: 1.5rem;
      color: #959595;
    }
  }

  .weeks-graph {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0.4rem 2.8rem;
    margin-top: 2rem;
    @media (max-width: 375px) {
      gap: 0.4rem 0;
      justify-content: space-between;
    }
    .graph-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .graph-bar {
        height: 8rem;
        width: 1.2rem;
        border-radius: 1rem;
        position: relative;
        background: #ececec;
        .graph-bar-fill {
          position: absolute;
          left: 0;
          bottom: 0;
          background: var(--blue-primary);
          width: 100%;
          max-height: 100%;
          border-radius: 1rem;
          height: 0;
          transition: height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          .tooltip {
            position: absolute;
            bottom: calc(100% + 0.8rem);
            left: 50%;
            transform: translateX(-50%);
            padding: 1.2rem;
            background: #4f5561;
            border-radius: 0.8rem;
            font-size: 1.1rem;
            line-height: 1.5rem;
            white-space: nowrap;
            text-align: right;
            color: #fff;
            z-index: 10;
            .date {
              margin-top: 0;
              color: #fff;
            }
            .steps {
              font-weight: 600;
            }
            .plus-steps {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              &::before {
                content: '';
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='13' viewBox='0 0 12 13' fill='none'%3E%3Cg clip-path='url(%23clip0_5098_36696)'%3E%3Cpath d='M5.71994 8.35323C5.73925 8.19987 5.62064 8.06422 5.46724 8.06422H2.39773C2.19475 8.06422 2.07331 7.83667 2.18521 7.66602L6.24609 1.47341C6.39474 1.24674 6.74526 1.37772 6.71131 1.64725L6.27951 5.0759C6.26019 5.22926 6.37880 5.36490 6.53221 5.36490H9.60171C9.80469 5.36490 9.92614 5.59246 9.81423 5.76311L5.75336 11.9557C5.60472 12.1824 5.25420 12.0514 5.28814 11.7819L5.71994 8.35323Z' fill='%23F9C41C'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_5098_36696'%3E%3Crect width='12' height='12' fill='white' transform='translate(0 0.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")
                  center / 1.2rem no-repeat;
              }
            }
            &::before {
              content: '';
              position: absolute;
              top: 100%;
              left: 50%;
              transform: translateX(-50%);
              width: 0.7rem;
              height: 0.4rem;
              background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='4' viewBox='0 0 7 4' fill='none'%3E%3Cpath d='M5.23242 3.00008C4.46256 4.33325 2.53832 4.33336 1.76855 3.00008L0.0361332 7.90261e-05L6.96484 7.96318e-05L5.23242 3.00008Z' fill='%234F5561'/%3E%3C/svg%3E")
                center / 100% no-repeat;
            }
          }
        }
      }
      .date {
        margin-top: 0.4rem;
        font-size: 1.1rem;
        font-weight: 400;
        line-height: 1.5rem;
        color: #959595;
        &.sunday {
          color: #f14960;
        }
        &.saturday {
          color: var(--blue-primary);
        }
      }
    }
    .standard-line {
      position: absolute;
      left: 0.6rem;
      right: 0.6rem;
      height: 0.1rem;
      border: 0.1rem dashed #4c7ff7;
    }
  }
}
</style>
