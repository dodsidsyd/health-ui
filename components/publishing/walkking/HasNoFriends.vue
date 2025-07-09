<template>
  <div class="hasno-friends-wrap">
    <div class="img-box"></div>
    <p>아직 참가중인 친구가 없습니다.</p>
    <Button btn-type="secondary" element-type="button" aria-label="친구에게 알리기" class="xs" :width="11.9" />
  </div>
</template>
<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
</script>
<style lang="scss" scoped>
.hasno-friends-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  margin-top: 0.8rem;
  border-radius: 0.8rem;
  .img-box {
    width: 5.8rem;
    height: 4.4rem;
    margin: 2.4rem 0 1.2rem;
    background: url(~/assets/images/walkingking/img-no-friends.svg) center / 100% no-repeat;
  }
  p {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
    color: #959595;
  }
}
</style>
