<template>
  <div class="vitality-chart">
    <div class="chart-wrap">
      <span
        v-for="(item, index) in vitalityData"
        :key="index"
        class="bar"
        :class="{ active: item.vital !== null }"
        :data-time="item.time"
        :data-vital="item.vital"
        :style="{
          height: getBarHeight(item.vital),
          animationDelay: `${index * 0.1}s`
        }"
      ></span>
    </div>
    <div class="chart-label">
      <span class="morning"></span>
      <span class="noon">12PM</span>
      <span class="night"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface VitalityDataItem {
  time: string
  vital: number | null
}

// Props 정의
interface Props {
  data?: VitalityDataItem[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

// 기본 데이터
const defaultData: VitalityDataItem[] = [
  { time: '1am', vital: 10 },
  { time: '2am', vital: 30 },
  { time: '3am', vital: 20 },
  { time: '4am', vital: 50 },
  { time: '5am', vital: 70 },
  { time: '6am', vital: 100 },
  { time: '7am', vital: 50 },
  { time: '8am', vital: 40 },
  { time: '9am', vital: 20 },
  { time: '10am', vital: 30 },
  { time: '11am', vital: 50 },
  { time: '12pm', vital: 100 },
  { time: '1pm', vital: 20 },
  { time: '2pm', vital: 50 },
  { time: '3pm', vital: 60 },
  { time: '4pm', vital: 70 },
  { time: '5pm', vital: 10 },
  { time: '6pm', vital: null },
  { time: '7pm', vital: null },
  { time: '8pm', vital: null },
  { time: '9pm', vital: null },
  { time: '10pm', vital: null },
  { time: '11pm', vital: null },
  { time: '12am', vital: null }
]

// 실제 사용할 데이터 계산
const vitalityData = computed(() => {
  return props.data.length > 0 ? props.data : defaultData
})

// 막대 높이 계산 함수
const getBarHeight = (vital: number | null): string => {
  if (vital === null || vital === 0) {
    return '0' // 최소 높이
  }

  // vital 값을 0-100 범위로 가정하고 5.2rem의 80%까지 사용
  const maxHeight = 5.2 * 0.8 // 4.16rem
  const minHeight = 0.5
  const height = minHeight + (vital / 100) * (maxHeight - minHeight)

  return `${height}rem`
}
</script>

<style scoped lang="scss">
.vitality-chart {
  .chart-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    height: 5.2rem;
    .bar {
      display: block;
      width: 0.5rem;
      border-radius: 1rem;
      padding-bottom: 0.5rem;
      box-sizing: content-box;
      background: rgba(136, 105, 63, 0.2);

      // 초기 애니메이션 설정
      animation: barSlideUp 0.3s 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      transform: translateY(100%) scaleY(0);
      transform-origin: bottom;
      opacity: 0;

      &.active {
        background-color: #3763d3;

        &:hover {
          background-color: #4a7cff;
          transform: scale(1.1);
          transition: all 0.2s ease;
        }
      }
    }

    // 막대 애니메이션 키프레임
    @keyframes barSlideUp {
      0% {
        transform: scaleY(0);
        opacity: 0;
      }
      50% {
        transform: scaleY(0.5);
        opacity: 0.7;
      }
      100% {
        transform: scaleY(1);
        opacity: 1;
      }
    }
  }
  .chart-label {
    display: flex;
    justify-content: space-between;
    margin: 0 -0.4rem;
    margin-top: 0.4rem;

    .noon {
      font-size: 1.1rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      line-height: 1.6rem;
    }
    .morning,
    .night {
      display: inline-block;
      width: 1.6rem;
      height: 1.6rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    .morning {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M7.99833 11.4637C9.91132 11.4637 11.4621 9.91291 11.4621 7.99992C11.4621 6.08692 9.91132 4.53613 7.99833 4.53613C6.08534 4.53613 4.53455 6.08692 4.53455 7.99992C4.53455 9.91291 6.08534 11.4637 7.99833 11.4637Z' fill='black' fill-opacity='0.3'/%3E%3Cpath d='M14.3514 7.35059L14.4174 7.35397C14.745 7.38716 15.0009 7.66372 15.0009 8.00005C15.0009 8.33637 14.745 8.61294 14.4174 8.64612L14.3514 8.64951H13.7738C13.4152 8.64951 13.1244 8.35873 13.1244 8.00005C13.1244 7.64136 13.4152 7.35059 13.7738 7.35059H14.3514Z' fill='black' fill-opacity='0.3'/%3E%3Cpath d='M7.35095 2.22704V1.64946C7.35095 1.29077 7.64173 1 8.00041 1C8.3591 1 8.64987 1.29077 8.64987 1.64946V2.22704L8.64649 2.293C8.6133 2.62057 8.33673 2.8765 8.00041 2.8765C7.66409 2.8765 7.38752 2.62057 7.35433 2.293L7.35095 2.22704Z' fill='black' fill-opacity='0.3'/%3E%3Cpath d='M7.35095 14.3511V13.7735C7.35095 13.4148 7.64173 13.124 8.00041 13.124C8.3591 13.124 8.64987 13.4148 8.64987 13.7735V14.3511L8.64649 14.417C8.6133 14.7446 8.33673 15.0005 8.00041 15.0005C7.66409 15.0005 7.38752 14.7446 7.35433 14.417L7.35095 14.3511Z' fill='black' fill-opacity='0.3'/%3E%3Cpath d='M11.5804 11.582C11.8182 11.3442 12.1946 11.3291 12.4497 11.5372L12.4988 11.582L13.0763 12.1596L13.1203 12.2086C13.3285 12.4637 13.3142 12.8401 13.0763 13.0779C12.8385 13.3158 12.4621 13.3301 12.207 13.1219L12.158 13.0779L11.5804 12.5004L11.5356 12.4513C11.3275 12.1962 11.3426 11.8198 11.5804 11.582Z' fill='black' fill-opacity='0.3'/%3E%3Cpath d='M12.1577 2.92257C12.4114 2.66908 12.8225 2.66899 13.0761 2.92257C13.3296 3.17617 13.3296 3.58736 13.0761 3.84095L12.4985 4.41853C12.2449 4.67197 11.8338 4.67197 11.5802 4.41853C11.3266 4.16495 11.3267 3.7538 11.5802 3.50015L12.1577 2.92257Z' fill='black' fill-opacity='0.3'/%3E%3Cpath d='M3.49759 11.5818C3.75123 11.3283 4.16238 11.3282 4.41597 11.5818C4.66941 11.8353 4.66941 12.2465 4.41597 12.5001L3.83839 13.0777C3.58479 13.3312 3.1736 13.3312 2.92001 13.0777C2.66643 12.8241 2.66652 12.413 2.92001 12.1593L3.49759 11.5818Z' fill='black' fill-opacity='0.3'/%3E%3Cpath d='M2.92023 2.92279C3.15802 2.685 3.53447 2.66988 3.78956 2.87798L3.83861 2.92279L4.41619 3.50037L4.46016 3.54942C4.66835 3.80452 4.65401 4.18093 4.41619 4.41875C4.17836 4.65658 3.80195 4.67091 3.54686 4.46273L3.49781 4.41875L2.92023 3.84117L2.87541 3.79212C2.66732 3.53703 2.68244 3.16059 2.92023 2.92279Z' fill='black' fill-opacity='0.3'/%3E%3Cpath d='M2.22643 7.35059L2.29239 7.35397C2.61996 7.38716 2.87589 7.66372 2.87589 8.00005C2.87589 8.33637 2.61996 8.61294 2.29239 8.64612L2.22643 8.64951H1.64885C1.29016 8.64951 0.99939 8.35873 0.99939 8.00005C0.99939 7.64136 1.29016 7.35059 1.64885 7.35059H2.22643Z' fill='black' fill-opacity='0.3'/%3E%3C/svg%3E");
    }
    .night {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M2 7.67107C2 11.1665 4.83356 14 8.32893 14C10.8139 14 12.9644 12.5679 14 10.4839C7.11198 12.6667 3.44531 8.66667 5.51607 2C3.43214 3.03563 2 5.1861 2 7.67107Z' fill='black' fill-opacity='0.3'/%3E%3C/svg%3E");
    }
  }
}
@media (min-width: 768px) {
  .vitality-chart {
    .chart-wrap {
      .bar {
        width: 1.6rem;
        padding-bottom: 1.6rem;
        border-radius: 3rem;
      }
    }
    .chart-label {
      .noon {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
