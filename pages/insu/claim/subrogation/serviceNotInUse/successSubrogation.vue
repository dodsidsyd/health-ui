<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구 안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <h2 style="font-size: 25px; font-weight: bold">대리청구 서비스 가입을<br />완료했어요</h2>
    <div
      style="
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 4rem;
        border: 1px solid gainsboro;
        border-radius: 0.75rem;
      "
    >
      <div>
        <div>대리청구 무제한 이용!</div>
        <div>보험 영업 지원 혜택까지!!</div>
      </div>
      <button style="padding: 0.75rem; background-color: #4299e1; color: white; border-radius: 0.75rem">
        구독 신청하고 혜택 받기
      </button>
      <button style="text-align: center; color: #b0b0b0" @click="movePage">나중에 이용하기</button>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

const movePage = () => {
  // 로그인 화면으로 이동 (로그아웃 처리 필요?)
  navigateTo('/common/login')
}
</script>

<style scoped lang="scss"></style>
