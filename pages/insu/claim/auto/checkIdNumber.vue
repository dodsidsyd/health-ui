<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    :has-tel-btn="true"
    class="pb-60"
  >
    <h1 class="c-tit mt-24 mb-32">
      <span v-if="nameValue.length <= 2" class="text"> 본인확인을 위해<br />이름을 입력해 주세요. </span>
      <span v-else-if="nameValue.length > 2 && backValue.length === 0" class="text">
        주민등록번호를<br />입력해 주세요.
      </span>
      <span v-else-if="backValue.length > 0" class="text"> 휴대폰번호를<br />입력해 주세요.</span>
    </h1>
    <FlexColDiv class="gap-12">
      <Transition name="fade-slide" mode="out-in">
        <InputPhone v-if="backValue.length > 0" v-model="phoneNum" label="휴대폰 번호" :has-verify-btn="false" />
      </Transition>
      <Transition name="fade-slide" mode="out-in">
        <InputRRNGender
          v-if="nameValue.length > 2"
          v-model:back-value="backValue"
          placeholder="앞자리 입력"
          placeholder2=""
        />
      </Transition>
      <InputText
        v-model="nameValue"
        label="이름"
        :is-valid="true"
        valid-text="이름을 입력해주세요."
        placeholder="이름을 입력해 주세요."
      />
    </FlexColDiv>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="확인"
      class="w-full lg btn-sticky"
      :disabled="phoneNum.length < 13"
      @click="clickAgreeTerm"
    />
  </ButtonGroup>
  <BottomModal
    :is-visible="isShowAgreeModal"
    title="본인인증을 위해 동의가 필요해요."
    :is-show-cancel-button="false"
    confirm-button-text="동의하고 다음"
    @close="isShowAgreeModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <AgreeToTerms v-model="terms" :terms-list="termsList" @show-detail-term="showDetailTerm" />
    </template>
  </BottomModal>

  <FullModal
    :is-visible="isShowDetailTerm"
    title="보험사 약관 동의"
    :is-show-cancel-button="false"
    confirm-button-text="동의하기"
    @confirm="showDetailTerm"
  >
    <template #content>
      <div class="wrap-agree-detail flex flex-col gap-10 pb-48">
        <div class="fz-14 semibold">1. 수집 · 이용에 관한 사항</div>
        <div class="agree-txt-box fz-14 flex flex-col gap-2">
          <div class="semibold">제1조(목적)</div>
          보험약관내용을 입력해주세요.
        </div>
        <div class="agree-txt-box fz-14 flex flex-col gap-2">
          <div class="semibold">제2조(용어의 정의)</div>
          본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          <ol class="num-type">
            <li>보험약관내용을 입력해주세요.</li>
            <li>보험약관내용을 입력해주세요.</li>
            <li>보험약관내용을 입력해주세요.</li>
          </ol>
        </div>
      </div>
    </template>
  </FullModal>
</template>

<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import InputPhone from '~/components/publishing/input/InputPhone.vue'
import InputRRNGender from '~/components/publishing/input/InputRRNGender.vue'
import { ref } from 'vue'
import { BottomModal, FullModal } from '@lemonhc/fo-ui/components/modal'
import AgreeToTerms from '~/components/insu/AgreeToTerms.vue'

const termsList = [
  { key: 'term1', label: '개인정보 수집이용 동의' },
  { key: 'term2', label: '고유식별정보 처리 동의' },
  { key: 'term3', label: '통신사 이용약관 동의' },
  { key: 'term4', label: '서비스 이용약관 동의' }
]

const terms = {
  all: false,
  term1: false,
  term2: false,
  term3: false,
  term4: false
}
const nameValue = ref('')
const backValue = ref('')
const phoneNum = ref('')
const isShowAgreeModal = ref(false)
const isShowDetailTerm = ref(false)
const showDetailTerm = () => {
  isShowDetailTerm.value = !isShowDetailTerm.value
}
const clickAgreeTerm = () => {
  isShowAgreeModal.value = !isShowAgreeModal.value
}
const clickNext = () => {
  return navigateTo('/insu/claim/auto/checkIdPhone')
}
</script>

<style scoped lang="scss">
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.8s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}

.wrap-agree-detail {
  text-align: left;
  .agree-txt-box {
    ol.num-type {
      list-style: none;
      counter-reset: list-counter;
      padding-left: 0;
      margin: 0;

      li {
        counter-increment: list-counter;
        position: relative;
        padding-left: 2.4rem;
        margin-bottom: 0.8rem;
        line-height: 1.6;

        &::before {
          content: '(' counter(list-counter) ')';
          position: absolute;
          left: 0;
          top: 0;
          font-weight: 500;
          color: #333;
        }
      }
    }
  }
}
</style>
