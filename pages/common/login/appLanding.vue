<template>
  <BaseBody
    :show-back-button="false"
    page-title="건강의신"
    :has-notification="false"
    :has-reward="false"
    class="h100vh mt-n56 mb-n20"
  >
    <div class="landing-container flex flex-col">
      <div class="landing-top mt-60">
        <h1 class="landing-logo health-god-icon">건강의신</h1>
        <p class="landing-subtitle mt-16">건강한 오늘이 더 건강한 내일이 됩니다.</p>
      </div>

      <div class="landing-btn-group">
        <i class="img-char char-lemon-working" aria-hidden="true"></i>

        <div class="flex flex-col gap-8 mb-20">
          <Button
            btn-type="sns-login"
            element-type="button"
            aria-label="카카오로 계속하기"
            class="md kakao fz-16 medium"
          />
          <Button
            btn-type="sns-login"
            element-type="button"
            aria-label="네이버로 계속하기"
            class="md naver fz-16 medium"
          />
          <Button
            btn-type="sns-login"
            element-type="button"
            aria-label="Google로 계속하기"
            class="md google fz-16 medium"
          />
          <Button
            btn-type="sns-login"
            element-type="button"
            aria-label="Apple로 계속하기"
            class="md apple fz-16 medium"
          />
        </div>

        <div class="landing-line fz-13 mb-20"><span>또는</span></div>

        <!-- 비대칭 버튼 레이아웃 asymmetric -->
        <ButtonGroup gap="8" asymmetric class="mb-48">
          <Button btn-type="secondary" element-type="button" aria-label="회원가입" class="md medium" />
          <Button btn-type="primary" element-type="button" aria-label="로그인" class="md medium" />
        </ButtonGroup>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import { useHeader } from '~/composables/useHeader'

import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

// 헤더 설정
const { setShowHeader } = useHeader()

// 페이지 로드 시 헤더 숨기기
onMounted(() => {
  setShowHeader(false)
})
</script>
<style scoped lang="scss">
.landing-container {
  height: 100%;
  justify-content: space-between;
  align-items: stretch;
  display: flex;
  flex-direction: column;
}

.landing-top {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.landing-btn-group {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: flex-end;

  .char-lemon-working {
    position: absolute;
    width: 13rem;
    height: 14.5rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    z-index: 1;
    top: -12rem;
    right: -1.1rem;
  }
}

.landing-logo {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  font-size: 0;
  width: 17rem;
  height: 4.8rem;
}

.landing-line {
  position: relative;
  font-size: 1.3rem;
  color: #959595;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    background: vars.$white;
    display: inline-block;
    padding: 0 1rem;
    position: relative;
    z-index: 1;
    font-weight: vars.$medium;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 0.1rem;
    top: 50%;
    background: #e2e2e2;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
}

.btn-sns-login {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 2.4rem;
    height: 2.4rem;
    top: 1.4rem;
    left: 2.4rem;
    background-size: contain;
    background-position: center;
  }
  &.kakao {
    background-color: #fae300;
    color: #2b2b2b;
  }
  &.naver {
    background-color: #03c75a;
    color: vars.$white;
  }
  &.google {
    background-color: vars.$white;
    color: #2b2b2b;
    border: 0.1rem solid #e2e2e2;
  }
  &.apple {
    background-color: vars.$black;
    color: vars.$white;
  }
}
</style>
