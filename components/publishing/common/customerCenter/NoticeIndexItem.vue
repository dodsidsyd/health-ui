<template>
  <FlexRowDiv class="notice-wrap">
    <CommonBadge :color="color" variant="solid">{{ type }}</CommonBadge>
    <span class="notice-tit"
      >건강의 신 서비스가 오픈하였습니다.건강의 신 서비스가 오픈하였습니다.건강의 신 서비스가 오픈하였습니다.</span
    >
    <span class="notice-date">03.25</span>
  </FlexRowDiv>
</template>

<script setup lang="ts">
import CommonBadge from '~/components/common/badge/CommonBadge.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'

defineProps<{
  type: string
  color?: 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'brown' | 'gray' | 'deepRed'
}>()
</script>

<style lang="scss" scoped>
:deep(.badge) {
  height: 2.2rem;
}
.notice-wrap {
  gap: 0.8rem;
  padding: 2.4rem 0;
  border-bottom: 0.1rem solid var(--gray-light);
  align-items: center;
}
.notice-tit {
  font-weight: 700;
  @include mixin.multi-ellipsis($clamp: 2);
}
.notice-date {
  align-self: center;
  margin-left: auto;
  font-size: 1.4rem;
  color: var(--gray-17);
}
</style>
