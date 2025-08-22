<template>
  <div class="schedule-detail">
    <div class="tit">{{ scheduleTitle }}</div>
    <div class="schdule-date">
      <div class="schdule-time">{{ scheduleTime }}</div>
      <div class="schdule-alarm">
        <span>{{ alarmText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  scheduleTitle?: string
  scheduleTime?: string
  alarmText?: string
}

const props = withDefaults(defineProps<Props>(), {
  scheduleTitle: '생신모임',
  scheduleTime: '4월23일 오후 06:30',
  alarmText: '1일전(24시간전) 알림'
})
</script>

<style lang="scss" scoped>
.schedule-detail {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem 0;

  .tit {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.5rem;
  }

  .schdule-date {
    display: flex;
    justify-content: space-between;

    .schdule-time {
      font-weight: 500;
      line-height: 2.2rem;
      color: #959595;
    }

    .schdule-alarm {
      flex: 1;
      text-align: right;
      font-weight: 500;
      line-height: 2.2rem;
      color: #4c7ff7;
    }
  }
}
</style>
