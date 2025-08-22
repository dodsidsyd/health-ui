<template>
  <BaseBody
    page-title="첨부서류 보기"
    :show-back-button="true"
    style="background-color: #1f1f1f"
    :is-transparent="true"
    :has-close-btn="true"
    :has-add-text="false"
    :white-logo="true"
    :add-text-click-enabled="true"
    :is-dark="true"
    :page-type="'dark-bg'"
  >
    <div class="wrap-doc">
      <img class="img-doc" src="/assets/images/insu/subrogation/img-doc-insurance.png" alt="진단서 예시" />
    </div>
    <div class="wrap-btn-zoom">
      <button class="btn-minus">축소</button>
      <button class="btn-plus">확대</button>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
</script>

<style scoped lang="scss">
.wrap-doc {
  margin: 0 -2rem;
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
