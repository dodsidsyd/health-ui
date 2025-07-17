<template>
  <section class="smartRing-wrap">
    <div class="device-on" v-if="statusData.isDeviceConnected">
      <div class="title-wrap">
        <span class="text">{{ statusData.title }}</span>
        <strong class="vital-score">{{ statusData.vitalScore }}점</strong>
      </div>
      <div class="vital-txt">
        <strong class="tit">{{ statusData.conditionTitle }}</strong>
        {{ statusData.conditionMessage }}
      </div>

      <div class="condition-icon" :class="statusData.conditionIcon" aria-label="hidden"></div>
      <div class="vitality-chart-wrap">
        <VitalityChart :data="statusData.vitalityData" />
      </div>
    </div>

    <div class="no-device" v-else>
      <div class="title-wrap">
        <h2 class="tit">{{ statusData.noDeviceTitle }}</h2>
        <p class="sub-tit" v-html="statusData.noDeviceMessage"></p>
        <div>
          <button type="button" class="btn-white" @click="onMeasureClick">
            {{ statusData.buttonText }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VitalityChart from '~/components/smartRing/VitalityChart.vue'

interface VitalityDataItem {
  time: string
  vital: number | null
}

interface SmartRingStatusData {
  isDeviceConnected: boolean
  title: string
  vitalScore: number
  conditionTitle: string
  conditionMessage: string
  conditionIcon: string
  vitalityData: VitalityDataItem[]
  noDeviceTitle: string
  noDeviceMessage: string
  buttonText: string
}

// Props 정의
interface Props {
  data?: SmartRingStatusData
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({})
})

// Emits 정의
const emit = defineEmits<{
  measureClick: []
}>()

// 기본 데이터
const defaultData: SmartRingStatusData = {
  isDeviceConnected: true, // 디바이스 연결 상태
  title: 'Aura Vital Score',
  vitalScore: 88,
  conditionTitle: '오늘 컨디션이 좋아요!',
  conditionMessage: '야외 활동하기 좋은 컨디션이예요.',
  conditionIcon: 'sun', // sun, coffee, bed, sofa, glass
  vitalityData: [],
  noDeviceTitle: '스마트링을 착용해주세요',
  noDeviceMessage: '처음이세요? <br />아래 측정하기 버튼을 눌러주세요.',
  buttonText: '지금측정하기'
}

// 실제 사용할 데이터
const statusData = computed(() => {
  return Object.keys(props.data).length > 0 ? { ...defaultData, ...props.data } : defaultData
})

// 측정하기 버튼 클릭 핸들러
const onMeasureClick = () => {
  emit('measureClick')
}
</script>

<style scoped lang="scss">
.smartRing-wrap {
  .no-device {
    background-color: #dadee7;
    margin: -5.6rem -2rem 0;
    padding: 5.6rem 2rem 0;
  }
  .device-on {
    background: #fce697;
    margin: -5.6rem -2rem 0;
    padding: 5.6rem 2rem 2.8rem;
    min-height: 33.8rem;
    .title-wrap {
      margin-top: 2rem;
      margin-bottom: 1.6rem;
      display: flex;
      flex-direction: column;
      .text {
        font-size: 1.3rem;
        font-weight: 500;
        color: #694a15;
        letter-spacing: -0.026rem;
      }
      .vital-score {
        font-size: 2.8rem;
        font-weight: 700;
        color: #2b2b2b;
      }
    }
    .vital-txt {
      display: flex;
      flex-direction: column;
      font-size: 1.6rem;
      padding-right: 11rem;
      white-space: nowrap;
      .tit {
        font-size: 2rem;
        white-space: normal;
        font-weight: 700;
        color: #2b2b2b;
      }
    }
    .condition-icon {
      position: absolute;
      width: 12rem;
      height: 15rem;
      top: 0.4rem;
      right: -2rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center right;

      &.sun {
        background-image: url(~/assets/images/smartRing/ico-sun.png);
        animation: bounce 2s ease-in-out infinite;
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(0.8rem);
          }
        }
      }
      &.coffee {
        background-image: url(~/assets/images/smartRing/ico-coffee.png);
        animation: scale 2s ease-in-out infinite;
        @keyframes scale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      }
      &.bed {
        background-image: url(~/assets/images/smartRing/ico-bed.png);
        animation: scale 2s ease-in-out infinite;
        @keyframes scale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      }
      &.glass {
        background-image: url(~/assets/images/smartRing/ico-glass.png);
        animation: scale 2s ease-in-out infinite;
        @keyframes scale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      }
      &.sofa {
        background-image: url(~/assets/images/smartRing/ico-sofa.png);
        animation: scale 2s ease-in-out infinite;
        @keyframes scale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      }
    }
    .vitality-chart-wrap {
      margin-top: 4rem;
    }
  }
}
</style>
