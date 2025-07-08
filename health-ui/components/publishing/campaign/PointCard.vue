<template>
  <div class="flex flex-col point-card">
    <dl>
      <dt>보유포인트</dt>
      <dd class="bold">{{ formattedPoint }}</dd>
    </dl>
    <dl>
      <dt>30일 이내 소멸예정포인트</dt>
      <dd>{{ formattedExpirePoint }}</dd>
    </dl>
  </div>
</template>
<script setup lang="ts">
const point = 98400
const expirePoint = 1800
const formattedPoint = point.toLocaleString() + 'P'
const formattedExpirePoint = expirePoint.toLocaleString() + 'P'
</script>
<style scoped lang="scss">
.point-card {
  padding: 1.8rem 2rem;
  background: #f4f4f4;
  border-radius: 0.8rem;
  gap: 0.4rem;
  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    dt {
      line-height: 2rem;
      font-size: var(--num-14);
      color: #555;
    }
    dd {
      line-height: 2rem;
      &:not(.bold) {
        font-size: var(--num-14);
        color: #555;
      }
      &.bold {
        font-size: var(--num-16);
        line-height: 2.2rem;
      }
    }
    & + dl {
      dt {
        font-size: var(--num-12);
      }
    }
  }
}
</style>
