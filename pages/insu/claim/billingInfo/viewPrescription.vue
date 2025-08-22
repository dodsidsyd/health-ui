<template>
  <BaseBody
    :has-share="true"
    page-title="처방전 보기"
    :show-back-button="true"
    style="background-color: #1f1f1f"
    :has-close-btn="true"
    :is-transparent="true"
    :has-add-text="false"
    :add-text-click-enabled="true"
  >
    <div class="wrap-doc">
      <img class="img-doc" src="/assets/images/insu/subrogation/img-doc-insurance.png" alt="진단서 예시" />
    </div>
    <div class="wrap-btn-zoom">
      <button class="btn-minus">축소</button>
      <button class="btn-plus">확대</button>
    </div>
  </BaseBody>
  <!-- <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="발급하기" class="lg w-full medium btn-sticky" @click="clickNext" />
  </ButtonGroup> -->
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
// import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

</script>

<style scoped lang="scss">
.wrap-doc {
  margin: 0 -2rem;
  padding: 3.2rem 0;
  .img-doc {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 73vh;
  }
}
.wrap-btn-zoom {
  margin: 2.4rem 0 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  .btn-minus {
    background: url('/assets/images/insu/subrogation/icon-minus.svg') no-repeat center center;
    background-size: contain;
  }
  .btn-plus {
    background: url('/assets/images/insu/subrogation/icon-plus.svg') no-repeat center center;
    background-size: contain;
  }
  .btn-minus,
  .btn-plus {
    width: 4rem;
    height: 4rem;
    font-size: 0;
  }
}
</style>
