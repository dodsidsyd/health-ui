<template>
  <BaseBody
    :show-back-button="true"
    page-title="아이디찾기"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    class="h100vh mt-n56 mb-n20"
  >
    <div class="flex flex-col h-full text-center justify-center align-center">
      <div class="flex flex-col gap-8 align-center mb-16">
        <i class="img-wrap mb-16"><img src="../../../assets/images/icon-google.svg" alt="" /></i>
        <div class="fz-24 bold lineH-130">
          홍길동님은 구글<br />
          간편로그인을 이용중입니다.
        </div>
        <div class="fz-16 regular lineH-140">
          구글 계정으로 로그인하시거나<br />
          회원가입 후, 건강의신 아이디와 비밀번호로<br />
          로그인할 수 있습니다.
        </div>
      </div>

      <Button
        btn-type="secondary"
        element-type="button"
        aria-label="일반 회원가입"
        class="xs fz-14 w-auto pl-16 pr-16 medium"
        @click="clickBottomModal"
      />
      <div class="btn-wrap">
        <Button btn-type="primary" element-type="button" aria-label="로그인하기" class="md w-full medium" />
      </div>
    </div>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
</script>
<style scoped lang="scss">
.img-wrap {
  width: 9.6rem;
  img {
    width: 100%;
  }
}
.btn-wrap {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
}
</style>
