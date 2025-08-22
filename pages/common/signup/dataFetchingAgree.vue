<template>
  <BaseBody
    :show-back-button="false"
    page-title="청구의신 데이터 이관 동의"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-close-btn="true"
    class="pb-36"
  >
    <div class="agree-wrap flex flex-col gap-10 pb-48 mt-40">
      <div class="fz-24 bold lineH-130">청구의신 이용정보를 <br />가져오시겠습니까?</div>
      <p class="fz-18 medium mt-24">
        홍길동님, 청구의 신 이용정보를 가져오시면,<br />
        건강의 신에서 모든 내역이 조회가 가능합니다.
      </p>
      <div class="mt-56 flex flex-row gap-26 align-center justify-center">
        <div class="app-icon">
          <img src="../../../assets/images/logo-cc-symbol.png" alt="청구의신" />
        </div>
        <i class="icon app-data-transfer" aria-hidden="true"></i>
        <div class="app-icon">
          <img src="../../../assets/images/logo-hc-symbol.png" alt="건강의신" />
        </div>
      </div>
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 동의안함 </Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky"> 동의함 </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup>
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
</script>

<style scoped lang="scss">
.app-icon {
  width: 10.4rem;
  border-radius: 3rem;
  overflow: hidden;
  box-shadow: 0 1.5rem 4.5rem 0 rgba(0, 0, 0, 0.05);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.app-data-transfer {
  width: 3.6rem;
  height: 1.2rem;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
