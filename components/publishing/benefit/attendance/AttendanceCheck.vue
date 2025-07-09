<template>
  <div class="attendance-info">
    <div class="info-txt-wrap">
      <div class="title">출석체크는?</div>
      <div class="info-list">
        <p>
          매일 연속 출석체크시에만 다음날의 출석체크를 할 수 있으며, 미출석시 연속출석체크 이벤트는 초기화되며,
          1일차부터 출석체크를 재시작됩니다.
        </p>
        <p>출석체크 시 해당일자의 포인트는 즉시 지급니다.</p>
      </div>
    </div>
    <Button btn-type="primary" element-type="button" aria-label="오늘 출석체크하고 포인트받기" class="lg btn-sticky" />
  </div>
</template>
<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
</script>
<style scoped lang="scss">
.attendance-info {
  margin: 0 -2rem;
  background: vars.$white;
  .info-txt-wrap {
    padding: 2rem;
    .title {
      font-size: 1.4rem;
      font-weight: 600;
      color: #2b2b2b;
      margin-bottom: 1.6rem;
    }
    .info-list {
      font-size: 1.2rem;
      font-weight: 400;
      color: #555;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      p {
        position: relative;
        padding-left: 0.9rem;
        &::before {
          content: '';
          display: block;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 50%;
          background: #959595;
          position: absolute;
          left: 0;
          top: 0.7rem;
        }
      }
    }
  }
}
</style>
