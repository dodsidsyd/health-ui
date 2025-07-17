<template>
  <div class="battery-condition-wrap">
    <div class="battery-condition">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M23 10V14"
          :stroke="batteryConfig.strokeColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 16V8C1 6.89543 1.89543 6 3 6H18C19.1046 6 20 6.89543 20 8V16C20 17.1046 19.1046 18 18 18H3C1.89543 18 1 17.1046 1 16Z"
          :stroke="batteryConfig.strokeColor"
          stroke-width="1.5"
        />
        <rect x="3" y="8" :width="batteryConfig.fillWidth" height="8" rx="1" :fill="batteryConfig.fillColor" />
      </svg>

      <strong class="condition-txt" :class="batteryConfig.textClass">{{ batteryConfig.percentage }}%</strong>
    </div>
    <div class="current-time">
      pm 4:15 기준
      <button type="button" class="btn-refresh" aria-label="새로고침버튼"></button>
    </div>
  </div>
</template>
<script setup lang="ts">
// Props
interface Props {
  batteryLevel?: number
  conditionText?: string
}

const props = withDefaults(defineProps<Props>(), {
  batteryLevel: 55,
  conditionText: ''
})

// 배터리 상태 설정
const batteryConfig = computed(() => {
  const level = props.batteryLevel
  const condition = props.conditionText.toLowerCase()

  // 배터리 레벨에 따른 너비 계산 (최대 15)
  const fillWidth = Math.max(0, Math.min(15, (level / 100) * 15))

  // 조건에 따른 색상 및 클래스 설정
  let fillColor = '#2B2B2B'
  let strokeColor = '#2B2B2B'
  let textClass = ''

  // 20% 밑으로 내려가면 배터리 색상 변경
  if (condition.includes('critical') || level <= 20) {
    fillColor = '#FF4444'
    strokeColor = '#FF4444'
    textClass = 'critical'
  } else {
    fillColor = '#2B2B2B'
    strokeColor = '#2B2B2B'
    textClass = ''
  }

  return {
    fillWidth,
    fillColor,
    strokeColor,
    textClass,
    percentage: level
  }
})
</script>

<style lang="scss" scoped>
.battery-condition-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .battery-condition {
    display: flex;
    align-items: center;
    gap: 0 0.4rem;
    strong {
      font-size: 1.3rem;
      font-weight: 700;
      color: #2b2b2b;
      // 배터리 텍스트 색상
      // &.critical {
      //   color: #ff4444;
      // }
    }
  }
  .current-time {
    display: flex;
    flex-direction: row;
    gap: 0 0.4rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: #555;
    align-items: center;
    .btn-refresh {
      width: 2.4rem;
      height: 2.4rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M19.4221 8.01389C18.0322 5.61438 15.4343 4 12.4588 4C9.08513 4 6.19686 6.07535 5.00433 9.01736M16.9806 9.01736H21V5.00347M5.57787 16.0417C6.96782 18.4412 9.56573 20.0556 12.5412 20.0556C15.9149 20.0556 18.8031 17.9802 19.9957 15.0382M8.0194 15.0382H4V19.0521' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      transition: 0.3s transform cubic-bezier(0.075, 0.82, 0.165, 1);
      &:active {
        transform: rotate(360deg) scale(0.8);
      }
    }
  }
}
</style>
