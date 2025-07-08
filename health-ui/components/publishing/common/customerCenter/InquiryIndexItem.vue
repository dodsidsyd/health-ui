<template>
  <div class="indexItem">
    <div class="flex space-between align-center">
      <span class="date">2025. 06. 01</span>
      <CommonBadge>답변대기</CommonBadge>
    </div>
    <p class="tit">루이비똥가방을 신청했는데.. 샤넬가방이 왔네요. ㅠㅠ 어쩌죠? 루이비똥가방을</p>
  </div>
</template>

<script setup lang="ts">
import CommonBadge from '~/components/common/badge/CommonBadge.vue'
</script>

<style lang="scss" scoped>
.indexItem {
  padding: 2rem 0;
  border-bottom: 1px solid #eee;
}
.date {
  color: var(--gray-17);
  font-size: 1.4rem;
}
.tit {
  margin-top: 0.4rem;
  color: var(--gray-16);
  font-size: 1.4rem;
  font-weight: 600;
  @include mixin.ellipsis;
}
</style>
