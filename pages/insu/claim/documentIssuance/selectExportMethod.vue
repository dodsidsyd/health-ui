<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류 보관함"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <h1 class="c-tit mt-24">
      <span class="text"> 병원에 가지 않아도 쉽고 편하게<br />서류를 받을 수 있어요! </span>
    </h1>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="다음"
      class="lg w-full medium btn-sticky"
      @click="clickNext"
    />
  </ButtonGroup>
  <BottomModal
    :is-visible="isShowExportMethodModal"
    title="내보낼 방법을 선택해 주세요."
    :is-show-cancel-button="false"
    confirm-button-text="내보내기"
    @close="isShowExportMethodModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <div class="flex gap-8">
        <Radio
          id="rdo1"
          v-model="selectedMethod"
          name="rdo1"
          custom-style="button small"
          value="이메일"
          aria-label="이메일"
          class="w-full"
        />
        <Radio
          id="rdo2"
          v-model="selectedMethod"
          name="rdo1"
          custom-style="button small"
          value="SNS 공유"
          aria-label="SNS 공유"
          class="w-full"
        />
        <Radio
          id="rdo3"
          v-model="selectedMethod"
          name="rdo1"
          custom-style="button small"
          value="다운로드"
          aria-label="다운로드"
          class="w-full"
        />
      </div>

      <div v-if="selectedMethod === '이메일'" class="mt-16 text-left">
        <InputMail
          label="이메일 주소 입력"
          :is-valid="false"
          valid-text="올바른 이메일 주소를 입력해주세요."
          placeholder="이메일을 입력해주세요"
          :custom-domains="[
            { value: 'gmail.com', label: 'gmail.com' },
            { value: 'naver.com', label: 'naver.com' },
            { value: 'daum.net', label: 'daum.net' },
            { value: 'kakao.com', label: 'kakao.com' }
          ]"
        />
      </div>
      <div class="mt-16 text-left">
        <InputText
          label="비밀번호"
          type="password"
          :is-valid="false"
          valid-text="비밀번호 벨리데이터 메시지"
          placeholder="비밀번호를 입력해 주세요."
        />
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import InputMail from '~/components/publishing/input/InputMail.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Radio from '~/components/publishing/input/radio.vue'

const selectedMethod = ref('이메일')
const isShowExportMethodModal = ref(true)
const clickExportMethod = () => {
  isShowExportMethodModal.value = !isShowExportMethodModal.value
}

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})
</script>

<style scoped lang="scss"></style>
