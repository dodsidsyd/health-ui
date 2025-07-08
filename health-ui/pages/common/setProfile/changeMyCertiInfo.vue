<template>
  <BaseBody
    :show-back-button="true"
    page-title="본인인증 정보 변경"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    add-text-left="<span style='color:#999;font-size:1.4rem'>본인인증</span>"
    class="pb-36"
  >
    <div class="flex flex-col gap-12 mt-24 pb-48">
      <div class="myCertify-list flex flex-col">
        <div class="myCertify-item">
          <span class="tit">이름</span>
          <strong class="text">김건강</strong>
        </div>
        <div class="myCertify-item">
          <span class="tit">생년월일</span>
          <strong class="text">871005</strong>
        </div>
        <div class="myCertify-item">
          <span class="tit">성별</span>
          <strong class="text">여자</strong>
        </div>
      </div>
      <hr class="hr-section ml-n20 mr-n20" />
      <div class="mt-20 flex flex-col gap-12">
        <InputPhone
          label="휴대폰 번호"
          :custom-opts="[
            { value: 'KT', label: 'KT' },
            { value: 'SKT', label: 'SKT' },
            { value: 'LG U+', label: 'LG U+' }
          ]"
        />

        <InputTimer label="인증번호 입력" />
      </div>
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 취소 </Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky" :disabled="!requiredAgreements">
        다음
      </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

import InputText from '~/components/publishing/input/InputText.vue'
import InputPhone from '~/components/publishing/input/InputPhone.vue'
import InputTimer from '~/components/publishing/input/InputTimer.vue'
</script>
<style scoped lang="scss">
.myCertify-list {
  .myCertify-item {
    border-bottom: 0.1rem solid #eee;
    display: flex;
    justify-content: space-between;
    padding: 1.6rem 0;
    .tit {
      font-size: 1.6rem;
      color: rgb(var(--gray-11)) !important;
      font-weight: 400;
    }
    .text {
      font-size: 1.6rem;
      color: rgb(var(--gray-16)) !important;
      font-weight: 500;
    }
  }
}
</style>
