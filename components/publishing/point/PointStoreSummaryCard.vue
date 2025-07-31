<template>
  <div class="point-summary-card">
    <dl>
      <dt>보유포인트</dt>
      <dd>{{ point }}P</dd>
    </dl>
    <dl>
      <dt>30일 이내 소멸예정포인트</dt>
      <dd>{{ expiring }}P</dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  point: {
    type: String,
    default: '0'
  },
  expiring: {
    type: String,
    default: '0'
  }
})
</script>

<style scoped lang="scss">
.point-summary-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.6rem 2rem;
  gap: 2.4rem;
  border-radius: 1.2rem;
  background: var(--blue-primary);
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 2rem;
    right: 2rem;
    transform: translateY(-50%);
    height: 0.1rem;
    background-color: #5d8af4;
  }
  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    dt {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
    }
    dd {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 2.2rem;
    }
  }
}
</style>
