<template>
  <div class="keyword-result">
    <div class="keyword-item">
      <NuxtLink to="#">
        <span>건강</span>
        <span><strong class="keyword">건강</strong>미션</span>
      </NuxtLink>
    </div>
    <div class="keyword-item">
      <NuxtLink to="#">
        <span>건강</span>
        <span>미션<strong class="keyword">건강</strong></span>
      </NuxtLink>
    </div>
    <div class="keyword-item">
      <NuxtLink to="#">
        <span>건강</span>
        <span><strong class="keyword">건강</strong>부채</span>
      </NuxtLink>
    </div>
    <div class="keyword-item">
      <NuxtLink to="#">
        <span>건강</span>
        <span><strong class="keyword">건강</strong>부채</span>
      </NuxtLink>
    </div>
    <div class="keyword-item">
      <NuxtLink to="#">
        <span>의료마이데이터</span>
        <span><strong class="keyword">건강</strong>기록부</span>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import CommonBadge from '~/components/common/badge/CommonBadge'
</script>

<style lang="scss" scoped>
.keyword-result {
  display: flex;
  flex-direction: column;

  .keyword-item {
    padding: 1.5rem 0;
    a {
      font-size: 1.6rem;
      font-weight: 500;
      display: flex;
      flex-direction: row;
      align-content: center;
      gap: 0 0.4rem;
      color: #555;
      > span {
        display: inline-flex;
        align-content: center;
        &::before {
          content: '';
          display: inline-block;
          width: 2rem;
          height: 2rem;
          background-repeat: no-repeat;
          background-size: 2rem;
          background-position: center;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7.49984 5.83398L11.6665 10.0007L7.49984 14.1673' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        }
        &:first-child {
          &::before {
            content: none;
          }
        }
      }
      .keyword {
        font-weight: 500;
        color: vars.$blue-primary;
      }
    }
  }
}
</style>
