<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구/피보험자 관리"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <h1 class="c-tit mt-24">
      <span class="text">
        피보험자(치료 받은 분)<br />정보를 입력해 주세요
      </span>
    </h1>
    <div class="wrap-form">
      <Select
        label="담당 설계사"
        class="require"
        modal-title="설계사를 선택해 주세요."
        select-placeholder="설계사를 선택해 주세요."
        :custom-opts="[
          { value: 'all', label: '전체보기' },
          { value: 'insured1', label: '설계사1' },
          { value: 'insured2', label: '설계사2' },
          { value: 'insured3', label: '설계사3' },
          { value: 'insured4', label: '설계사4' },
          { value: 'insured5', label: '설계사5' },
          { value: 'insured6', label: '설계사6' }
        ]"
      />
      <InputText
        label="피보험자 이름"
        class="require"
        :is-valid="true"
        valid-text="이름을 입력해주세요."
        placeholder="피보험자 이름을 입력해 주세요."
      />
      <InputText
        label="피보험자 휴대폰 번호"
        class="require"
        :is-valid="true"
        valid-text="피보험자 휴대폰 번호를 입력해주세요."
        placeholder="휴대폰 번호를 입력해주세요."
      />
      <InputText
        label="피보험자 생년월일"
        class="require"
        :is-valid="true"
        valid-text="생년월일 6자리를 입력해주세요."
        placeholder="생년월일 6자리를 입력해주세요."
      />
      <div class="wrap-gender">
        <div class="input-tit required">피보험자 성별</div>
        <div class="wrap-radio">
          <Radio id="rdo1" name="rdo1" checked custom-style="button small w-full" aria-label="남성" />
          <Radio id="rdo2" name="rdo1" custom-style="button small w-full" aria-label="여성" />
        </div>
      </div>
      <InputAddress label="피보험자 주소" :is-valid="false" class="require" placeholder="주소를 검색하세요" />
      <InputText
        label="메모"
        class="optional"
        :is-valid="true"
        valid-text="메모할 내용을 입력해주세요."
        placeholder="내용을 입력해 주세요."
      />
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="다음" class="lg w-full medium btn-sticky" @click="clickNext" />
  </ButtonGroup>

  <BottomModal
    :is-visible="isShowModal"
    title="선택"
    confirm-button-text="네, 같아요"
    cancel-button-text="아니요, 달라요"
    @close="isShowModal = false"
    @cancel="clickDiff"
    @confirm="clickSame"
  >
    <template #content>
      <div style="font-size:1.8rem;font-weight: 700;text-align:left;">피보험자(치료 받은 분)와<br />수익자(보험금 받는 분)가 같은가요?</div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Select from '~/components/publishing/input/Select.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Radio from '~/components/publishing/input/radio.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowModal = ref(false)

const clickDiff = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickSame = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickNext = () => {
  isShowModal.value = true
}
</script>
<style scoped lang="scss">
.wrap-form {
  margin-top: 3.2rem;
  .c-input {
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
  }
  .wrap-gender {
    .input-tit {
      margin: 1.2rem 0 0.6rem;
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.3;
      color: #555555;
      position: relative;
      &.required::after {
        content: "*";
        font-size: 1.2rem;
        display: inline-block;
        margin-left: 0.3rem;
        color: #f14960;
      }
    }
    .wrap-radio {
      display: flex;
      justify-content: space-between;
      gap: 0.8rem;
    }
  }
}
</style>
