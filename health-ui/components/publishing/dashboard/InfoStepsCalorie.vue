<template>
  <div class="info-step-calorie">
    10,000걸음 목표로 설정하시면<br />
    걷기운동만으로 매일 <strong>약 573kcal가 소모</strong>되며,<br />
    지속적인 목표 달성시 <strong>체중감량효과가 기대</strong>됩니다.
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.info-step-calorie {
  border: 0.1rem solid #eee;
  background: vars.$white;
  border-radius: 1.2rem;
  padding: 1.6rem;
  padding-left: 7.6rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #2b2b2b;
  position: relative;
  gap: 0 1.2rem;
  strong {
    color: vars.$blue-primary;
  }
  &::before {
    content: '';
    display: block;
    width: 4.8rem;
    height: 4.8rem;
    position: absolute;
    left: 1.6rem;
    top: 50%;
    transform: translateY(-50%);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('~/assets/images/dashboard/img-steps-lightBulb.svg');
  }
}
</style>
