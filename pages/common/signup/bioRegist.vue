<template>
  <BaseBody
    :show-back-button="true"
    page-title="회원가입"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    add-text-left="<span style='color:#999;font-size:1.4rem'>생체인증 설정</span>"
    class="pb-36"
  >
    <div class="agree-wrap flex flex-col gap-10 pb-48 mt-40">
      <div class="fz-24 bold lineH-130">
        빠른 이용을 위해<br />
        생체인증을 설정하세요.
      </div>
      <p class="fz-18 medium mt-24">전체메뉴 > 설정 메뉴에서도 설정이 가능합니다.</p>
      <div class="flex flex-row gap-26 align-center justify-center">
        <div class="bio-icon">
          <img src="../../../assets/images/icon-finger-print.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="info-box" style="">
      <i class="icon ico-info" aria-label="hidden"></i>
      본인확인 목적으로 기기에 등록된 지문정보를 이용해 건강의신 서비스 로그인을 진행하며, 서버로 전송 및 저장하지
      않습니다.
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 이전 </Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky"> 다음 </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
</script>

<style scoped lang="scss">
.info-box {
  background: #f9f9f9;
  font-size: 1.2rem;
  font-weight: 500;
  position: absolute;
  left: 0;
  bottom: 5.6rem;
  padding: 2rem;
  padding-left: 4rem;
  right: 0;
  .ico-info {
    position: absolute;
    top: 2rem;
    left: 2rem;
    width: 1.6rem;
    height: 1.6rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}
.bio-icon {
  width: 19.2rem;
  min-height: 15.2rem;
  height: 50vh;
  @media (max-width: 375px) {
    height: 30vh;
    width: 15rem;
  }
  display: flex;
  align-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
