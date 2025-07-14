<template>
  <div class="day-steps-graph" ref="graphContainer">
    <div class="weeks-graph">
      <div class="graph-item" v-for="(item, index) in graphData" :key="index">
        <div class="graph-bar">
          <i class="graph-item" :style="{ height: isVisible ? item.height : '0%' }" :class="{ animate: isVisible }">
            <span v-if="index === maxHeightIndex" class="tooltip">{{
              formatNumber(rawGraphData[maxHeightIndex].value)
            }}</span>
          </i>
        </div>
        <span class="date" :class="item.dateClass">{{ item.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'

interface GraphDataItem {
  value: number
  date: string
  dateClass: string
}

const graphContainer = ref<HTMLElement>()
const isVisible = ref(false)

// 원본 데이터 (실제 수치값)
const rawGraphData = [
  { value: 3500, date: '일', dateClass: 'sunday' },
  { value: 8200, date: '월', dateClass: '' },
  { value: 12500, date: '화', dateClass: '' },
  { value: 0, date: '수', dateClass: '' },
  { value: 5800, date: '목', dateClass: '' },
  { value: 15200, date: '금', dateClass: '' },
  { value: 23212, date: '토', dateClass: 'saturday' }
]

// 최대값 찾기
const maxValue = computed(() => {
  return Math.max(...rawGraphData.map(item => item.value))
})

// 높이를 계산하는 computed
const graphData = computed(() => {
  return rawGraphData.map(item => {
    const percentage = maxValue.value === 0 ? 0 : (item.value / maxValue.value) * 100
    return {
      ...item,
      height: `${percentage}%`
    }
  })
})

// 최고값의 인덱스를 찾는 computed
const maxHeightIndex = computed(() => {
  let max = 0
  let maxIdx = 0
  rawGraphData.forEach((item, idx) => {
    if (item.value > max) {
      max = item.value
      maxIdx = idx
    }
  })
  return maxIdx
})

// 숫자를 포맷팅하는 함수
const formatNumber = (num: number) => {
  return num.toLocaleString()
}

const observeGraph = () => {
  if (!graphContainer.value) return

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 약간의 딜레이 후 애니메이션
          setTimeout(() => {
            isVisible.value = true
          }, 100)
          observer.unobserve(entry.target)
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
  border-radius: 1.2rem;
  padding: 0 2rem;
  @media (max-width: 375px) {
    padding: 0;
  }
  .weeks-graph {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2.6rem;
    margin-top: 4.4rem;
    @media (max-width: 375px) {
      gap: 0.6rem;
      justify-content: space-around;
    }
    .graph-item {
      display: flex;
      flex-direction: column;
      align-content: center;
      gap: 0.4rem;

      .graph-bar {
        height: 16rem;
        width: 1.2rem;
        border-radius: 1rem;
        position: relative;
        background: #ececec;
        overflow: visible; // 툴팁이 보이도록 변경

        .graph-item {
          position: absolute;
          bottom: 0;
          background: #4c7ff7;
          width: 100%;
          max-height: 100%;
          border-radius: 1rem;
          height: 0;
          transition: height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

          .tooltip {
            position: absolute;
            top: -3.5rem;
            left: 50%;
            transform: translateX(-50%);
            background: #4f5561;
            color: #fff;
            font-size: 1.2rem;
            font-weight: 500;
            padding: 0.4rem 0.8rem;
            border-radius: 1.2rem;
            white-space: nowrap;
            opacity: 0;
            animation: fadeInTooltip 0.3s ease-in-out 0.8s forwards;

            &::after {
              content: '';
              position: absolute;
              top: calc(100% - 1.2rem);
              left: 50%;
              width: 0.7rem;
              height: 2.4rem;
              transform: translateX(-50%);
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='24' viewBox='0 0 4 24' fill='none'%3E%3Cpath d='M0.99992 13.2676C-0.333254 12.4977 -0.33336 10.5735 0.99992 9.80371L3.99992 8.07129L3.99992 15L0.99992 13.2676Z' fill='%234F5561'/%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-size: 100%;
              background-position: 100%;
              transform: translateX(-0.35rem) rotate(-90deg);
            }
          }
        }
      }

      .date {
        color: #959595;
        font-size: 1.1rem;
        font-weight: 400;
        line-height: 1.5rem;
        text-align: center;

        &.today {
          color: #4c7ff7;
        }
        &.holiday,
        &.sunday {
          color: #f14960;
        }
        &.saturday {
          color: #4c7ff7;
        }
      }
    }
  }
}

@keyframes fadeInTooltip {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
