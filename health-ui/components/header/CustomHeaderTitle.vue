<template>
  <!-- CUSTOM_HEADER_TITLE.LOGO 는 예시. 추후 삭체 처리 -->
  <img v-if="customType === CUSTOM_HEADER_TITLE.LOGO" src="~/assets/images/common/god_logo.png" alt="" />

  <!-- ===== 회원가입 ===== -->
  <div
    v-if="customType === CUSTOM_HEADER_TITLE.SIGNUP_TERMS_DETAIL"
    style="display: flex; align-items: center; gap: 0.25rem"
  >
    <span style="font-size: 18px; font-weight: bold">회원가입</span>
    <span style="color: #b0b0b0; font-size: 12px; font-weight: bold">약관동의</span>
  </div>
  <div
    v-if="customType === CUSTOM_HEADER_TITLE.SIGNUP_SELF_CERTI_INFO_INPUT"
    style="display: flex; align-items: center; gap: 0.25rem"
  >
    <span style="font-size: 18px; font-weight: bold">회원가입</span>
    <span style="color: #b0b0b0; font-size: 12px; font-weight: bold">본인인증</span>
  </div>
  <div
    v-if="customType === CUSTOM_HEADER_TITLE.SIGNUP_PHYSICAL_INPUT"
    style="display: flex; align-items: center; gap: 0.25rem"
  >
    <span style="font-size: 18px; font-weight: bold">회원가입</span>
    <span style="color: #b0b0b0; font-size: 12px; font-weight: bold">신체정보입력</span>
  </div>
  <div
    v-if="customType === CUSTOM_HEADER_TITLE.SIGNUP_INPUT_ACCOUNT"
    style="display: flex; align-items: center; gap: 0.25rem"
  >
    <span style="font-size: 18px; font-weight: bold">회원가입</span>
    <span style="color: #b0b0b0; font-size: 12px; font-weight: bold">계정정보 입력</span>
  </div>
  <!-- ===== 회원가입 끝 ===== -->
</template>

<script setup lang="ts">
import { CUSTOM_HEADER_TITLE } from '~/constants/header.constants'
import type { CustomHeaderTitle } from '~/types/common/header/header.types'

interface Props {
  customType?: CustomHeaderTitle | undefined
}

withDefaults(defineProps<Props>(), {
  customType: undefined
})
</script>

<style scoped lang="scss"></style>
