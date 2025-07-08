<template>
  <BaseBody
    :show-back-button="true"
    page-title="비밀번호 재설정"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    class="h100vh mt-n56 mb-n20"
  >
    <div class="flex flex-col h-full text-center justify-center align-center">
      <div class="flex flex-col gap-8 align-center mb-16">
        <i class="img-wrap"><img src="../../../assets/images/icon-complete.svg" alt="" /></i>
        <div class="fz-24 bold lineH-130">비밀번호 재설정 완료</div>
        <div class="fz-16 regular lineH-140">
          홍길동님의 비밀번호가<br />
          재설정 되었습니다.
        </div>
      </div>

      <Button
        btn-type="secondary"
        element-type="button"
        aria-label="아이디 찾기"
        class="xs fz-14 w-auto pl-16 pr-16 medium"
        @click="clickBottomModal"
      />
    </div>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="로그인하기" class="lg w-full medium btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
</script>
<style scoped lang="scss">
.img-wrap {
  width: 12.8rem;
  img {
    width: 100%;
  }
}
</style>
