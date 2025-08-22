<template>
  <BaseBody
    :show-back-button="true"
    page-title="병원서류 발급신청"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <h1 class="c-tit mt-24">
      <span class="text">
        발급할 병원과 대상자를<br />선택해 주세요.
      </span>
    </h1>
    <div class="tit-form">병원</div>
    <Select
      modal-title="발급할 병원을 선택해주세요"
      select-placeholder="병원을 선택해주세요"
      cancel-button-text="선택"
      :is-show-cancel-btn="false"
      :custom-opts="hospital"
    />
    <div class="tit-form">발급 대상자</div>
    <Select
      modal-title="발급 대상자를 선택해주세요"
      select-placeholder="발급 대상자를 선택해주세요"
      cancel-button-text="선택"
      :is-show-cancel-btn="false"
      :custom-opts="target"
    />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="발급신청" class="lg w-full medium btn-sticky" @click="clickNext" />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Select from '~/components/publishing/input/Select.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const hospital = [
  { value: '강동성심병원', label: '강동성심병원' },
  { value: '서울아산병원', label: '서울아산병원' },
  { value: '삼성서울병원', label: '삼성서울병원' }
]
const target = [
  { value: '본인', label: '본인' },
  { value: '대리인', label: '대리인' }
]

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})

</script>

<style scoped lang="scss">

</style>
