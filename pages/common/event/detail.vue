<template>
  <BaseBody page-title="이벤트" :show-back-button="true">
    <div class="event-title">
      <span class="date">2025.06.01</span>
      <p class="event-tit">
        걷기왕대회 중 프라이빗대회에 초대받았습니다. 지금 바로 참여하세요. 걷기왕대회 중 프라이빗 대회
      </p>
      <span class="date range">2025.03.14 ~ 2025.04.30</span>
    </div>
    <hr />
    <div class="event-contents"></div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
</script>

<style scoped lang="scss">
.event-title {
  padding: 1.2rem 0;
  .date {
    color: var(--gray-11);
    font-size: 1.4rem;
    &.range {
      font-weight: 500;
    }
  }
  .event-tit {
    margin: 0.2rem 0 0.6rem;
    color: var(--gray-16);
    font-size: 1.6rem;
    font-weight: 700;
  }
}
hr {
  width: auto;
  height: 0.1rem;
  margin: 0 -2rem;
  background-color: var(--gray-light);
  border: none;
}
.event-contents {
  height: 60rem;
  margin-top: 2rem;
  background-color: var(--gray-11);
}
</style>
