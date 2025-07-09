<template>
  <div class="reward-grid">
    <slot>
      <div class="no-reward-content">
        <p>사용가능한 복권이 없습니다.</p>
      </div>
    </slot>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.reward-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  justify-items: center;
  margin-bottom: 2.4rem;
}
.no-reward-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &::before {
    content: '';
    display: block;
    width: 8rem;
    height: 8rem;
    margin-bottom: 1.6rem;
    background: url(~/assets/images/insu/icon-empty.svg) center / 5.8rem 6.3rem no-repeat;
  }
  p {
    font-weight: 700;
    font-size: 1.6rem;
    color: #959595;
  }
}
</style>
