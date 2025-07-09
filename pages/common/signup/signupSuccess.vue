<template>
  <BaseBody
    :show-back-button="false"
    page-title="건강의신"
    :has-notification="false"
    :has-reward="false"
    class="h100vh mt-n56 mb-n20"
  >
    <div class="flex flex-col h-full text-center justify-center align-center">
      <div class="flex flex-col gap-8 align-center">
        <i class="img-wrap"><img src="../../../assets/images/icon-complete.svg" alt="" /></i>
        <div class="fz-24 bold lineH-130">홍길동님, 반갑습니다. <br />회원가입이 완료되었습니다.</div>
      </div>
      <div class="mt-40 flex flex-col mb-20 fz-16">
        친구 추천 코드
        <strong class="bold">hong4724</strong>
      </div>
      <Button
        btn-type="secondary"
        element-type="button"
        aria-label="친구 추천 코드 등록하기"
        class="xs fz-14 w-auto pl-16 pr-16 medium"
        @click="clickBottomModal"
      />

      <BottomModal
        :is-visible="isShowBottomModal"
        v-bind="bottomModalProps"
        @cancel="clickCancel"
        @confirm="clickConfirm"
        @close="toggleBottomModal"
      >
        <template #content>
          <div class="pt-11">
            <InputText placeholder="친구 추천 코드를 입력해주세요." />
          </div>
        </template>
      </BottomModal>
    </div>
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="건강의신 시작하기"
        class="lg w-full medium btn-sticky"
      >
        건강의신 시작하기
      </Button>
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import { useHeader } from '~/composables/useHeader'

import InputText from '~/components/publishing/input/InputText.vue'

import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowBottomModal = ref(false)
const bottomModalProps = ref({
  title: '친구 추천 코드 입력',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '입력완료',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}

const clickCancel = () => {
  console.log('취소 버튼 클릭')
  toggleBottomModal()
}

const clickConfirm = () => {
  console.log('확인 버튼 클릭')
  // 여기에 확인 버튼 누를 때의 로직 추가
  toggleBottomModal()
}
// 헤더 설정
const { setShowHeader } = useHeader()

// 페이지 로드 시 헤더 숨기기
onMounted(() => {
  setShowHeader(false)
})
</script>
<style scoped lang="scss">
.img-wrap {
  width: 12.8rem;
  img {
    width: 100%;
  }
}
</style>
