<template>
  <BaseBody
    :show-back-button="true"
    page-title="회원로그인"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text="true"
    :has-add-text-left="true"
  >
    <div class="pt-24 flex flex-col gap-12">
      <Input :is-valid="false" valid-text="아이디 벨리데이터 메시지" placeholder="아이디를 입력해 주세요." />
      <Input
        type="password"
        :is-valid="false"
        valid-text="비밀번호 벨리데이터 메시지"
        placeholder="비밀번호를 입력해 주세요."
      />

      <div>
        <Button btn-type="primary" element-type="button" aria-label="로그인" class="md medium" />
        <p class="guide-txt">
          건강의 신은 기본으로 자동로그인을 제공합니다.<br />
          안전한 사용을 위해 개인 기기에서만 이용 바랍니다.
        </p>
        <div class="find-btn-wrap flex flex-row">
          <NuxtLink to="" class="link">아이디 찾기</NuxtLink>
          <NuxtLink to="" class="link">비밀번호 재설정</NuxtLink>
          <NuxtLink to="" class="link">회원가입</NuxtLink>
        </div>
      </div>
    </div>
    <small class="copyright">© LEMONHEALTHCARE Corp.</small>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Input from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
</script>
<style scoped lang="scss">
.find-btn-wrap {
  margin-top: 1.6rem;
  .link {
    flex: 1 1 auto;
    font-size: 1.4rem;
    font-weight: 400;
    text-align: center;
    color: #555;
    position: relative;
    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      width: 1px;
      height: 1.4rem;
      margin-top: -0.7rem;
      background: #ddd;
    }
    &:first-child {
      &::before {
        content: none;
      }
    }
  }
}
.copyright {
  width: 100%;
  position: fixed;
  font-size: 1.2rem;
  font-weight: 500;
  color: #959595;
  bottom: 1.6rem;
  left: 0;
  text-align: center;
}
.guide-txt {
  margin: 1.6rem auto 2rem;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.8rem;
  color: #959595;
}
</style>
