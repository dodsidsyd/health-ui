<template>
  <section class="smartRing-wrap">
    <div v-if="statusData.isDeviceConnected" class="device-on">
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

    <div v-else class="no-device">
      <div class="title-wrap">
        <h2 class="tit">{{ statusData.noDeviceTitle }}</h2>
        <p class="sub-tit">
          <span v-for="(line, index) in noDeviceMessageLines" :key="index">
            {{ line }}
            <br v-if="index < noDeviceMessageLines.length - 1" />
          </span>
        </p>
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
  conditionIcon: 'sun', // sun, coffee, bed, sofa, water
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

// noDeviceMessage를 줄바꿈으로 분리하는 computed (에러 수정)
const noDeviceMessageLines = computed(() => {
  return statusData.value.noDeviceMessage.split('<br />').map(line => line.trim())
})

// 부모 컴포넌트에서 접근할 수 있도록 statusData를 expose
defineExpose({
  statusData
})
</script>

<style scoped lang="scss">
.smartRing-wrap {
  // 연결 디바이스 없을때
  .no-device {
    background-color: #dadee7;
    margin: -5.6rem -2rem 0;
    padding: 5.6rem 2rem 4.6rem;
    position: relative;
    &::before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 3rem;
      width: 16rem;
      height: 16rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url(~/assets/images/smartRing/img-smartRing.png);
    }
    .title-wrap {
      margin-top: 3.2rem;
      .tit {
        font-size: 2rem;
        white-space: normal;
        font-weight: 700;
        color: #2b2b2b;
      }
      .sub-tit {
        margin-top: 0.4rem;
        font-size: 1.6rem;
        font-weight: 500;
        margin-bottom: 2.4rem;
      }
    }
    .btn-white {
      font-size: 1.4rem;
      line-height: 3.4rem;
      font-weight: 600;
      color: #2b2b2b;
      border-radius: 2rem;
      padding: 0 1.6rem;
      border: 0.1rem solid vars.$white;
      background: rgba(255, 255, 255, 0.7);
      position: relative;
      @include mixin.rippleEffectPrimary;
    }
  }
  // 연결 디바이스 연결 시
  .device-on {
    background: #fce697;
    margin: -5.6rem -2rem 0;
    padding: 5.6rem 2rem 2.8rem;
    min-height: 33.8rem;
    overflow: hidden;
    position: relative;

    .title-wrap {
      margin-top: 2rem;
      margin-bottom: 1.6rem;
      display: flex;
      flex-direction: column;
      animation: fadeInUp 0.8s ease-out 0.3s both;

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
        animation: fadeInUp 0.6s ease-out 0.6s both;
      }
    }
    .vital-txt {
      display: flex;
      flex-direction: column;
      font-size: 1.6rem;
      padding-right: 11rem;
      white-space: nowrap;
      animation: fadeInUp 0.8s ease-out 0.5s both;

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
      top: 6rem;
      right: 0;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center right;
      animation: fadeInRight 0.8s ease-out 0.7s both;

      &.sun {
        background-image: url(~/assets/images/smartRing/ico-sun.png);
        animation:
          fadeInRight 0.8s ease-out 0.7s both,
          bounce 2s ease-in-out 1.5s infinite;
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
        animation:
          fadeInRight 0.8s ease-out 0.7s both,
          scale 2s ease-in-out 1.5s infinite;
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
        animation:
          fadeInRight 0.8s ease-out 0.7s both,
          scale 2s ease-in-out 1.5s infinite;
      }
      &.water {
        background-image: url(~/assets/images/smartRing/ico-water.png);
        animation:
          fadeInRight 0.8s ease-out 0.7s both,
          scale 2s ease-in-out 1.5s infinite;
      }
      &.sofa {
        background-image: url(~/assets/images/smartRing/ico-sofa.png);
        animation:
          fadeInRight 0.8s ease-out 0.7s both,
          scale 2s ease-in-out 1.5s infinite;
      }
    }
    .vitality-chart-wrap {
      margin-top: 4rem;
    }

    // 공통 애니메이션 키프레임
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(0.5rem);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInRight {
      0% {
        opacity: 0;
        transform: translateX(0.4rem);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes scaleIn {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}
</style>
