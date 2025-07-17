<template>
  <div class="post-actions-wrap">
    <div class="actions-box">
      <button type="button" class="icon icon-photo">
        <ActionsTooltip />
      </button>
      <button type="button" class="icon icon-hashtag"></button>
      <button type="button" class="icon icon-rating"></button>
      <button type="button" class="icon heart-beep-bw"></button>
    </div>
    <button type="button" class="regist">등록하기</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ActionsTooltip from '~/components/publishing/community/board/PostDetailHashtagWrap.vue'
</script>

<style lang="scss" scoped>
.post-actions-wrap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 3.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.6rem;
  padding: 1.6rem;
  background: #fff;
  border-top: 0.1rem solid #e2e2e2;
  button {
    position: relative;
    @include mixin.rippleEffectPrimary;
  }
}
.actions-box {
  display: flex;
  align-items: center;
  gap: 2rem;
  button {
    width: 2.4rem;
    height: 2.4rem;
  }
}
.regist {
  font-weight: 500;
  line-height: 2.2rem;
  color: var(--blue-primary);
}
</style>
