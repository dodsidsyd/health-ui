<template>
  <BaseBody
    :show-back-button="true"
    page-title="무료 상담신청"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="flex flex-col mt-24">
      <h1 class="c-tit">
        <span class="text">
          현재 거주 중인<br />
          주소를 입력해 주세요
        </span>
      </h1>
      <div class="c-tit-sub">상담은 지역별 보상 전문상담사를 통해 이루어져요.</div>
    </div>
    <div class="flex flex-col gap-12 mt-40">
      <Select
        label="직업"
        class="require"
        modal-title="직업"
        :is-show-cancel-btn="false"
        :custom-opts="[
          { value: '직장인', label: '직장인' },
          { value: '공무원', label: '공무원' },
          { value: '전문직', label: '전문직' },
          { value: '자영업자', label: '자영업자' },
          { value: '주부', label: '주부' },
          { value: '초・중고생', label: '초・중고생' },
          { value: '기타', label: '기타' }
        ]"
      />
      <InputAddress
        id="address"
        v-model:second-model-value="detailAddress"
        label="주소"
        :is-valid="false"
        class="require"
        placeholder="주소를 검색해주세요"
      />
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="확인" class="lg w-full medium btn-sticky">
      다음
    </Button>
  </ButtonGroup>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Select from '~/components/publishing/input/Select.vue'

const isShowModal = ref(false)
const detailAddress = ref('')

const movePage = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickDiff = () => {
  movePage()
}

const clickSame = () => {
  movePage()
}

const clickNext = () => {
  // 사진찍어 청구: 피보험자, 수익자 동일인 여부 모달 띄우기
  isShowModal.value = true
  // 그외
  // return navigateTo('/insu/claim/inputAccidentData')
}
</script>

<style scoped lang="scss">
.wrap-signature {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  .input-tit {
    margin-bottom: 0.6rem;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.3;
    color: #555555;
    position: relative;
    &::after {
      content: '*';
      font-size: 1.2rem;
      display: inline-block;
      margin-left: 0.3rem;
      color: #f14960;
    }
  }
  .wrap-signature-square {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7.7rem 1.6rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #e2e2e2;
    background-color: #f4f4f4;
    font-size: 1.6rem;
    font-weight: 500;
    color: #959595;
    text-align: center;
  }
  .input-desc {
    font-size: 1.3rem;
    font-weight: 400;
    color: #959595;
  }
}
</style>
