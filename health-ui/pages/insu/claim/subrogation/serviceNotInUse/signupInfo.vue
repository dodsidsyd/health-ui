<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <div>
        <div>번거로운 보험금<br />대신 청구해드려요</div>
        <div>보험설계사, 대리인(비서, 총무)가 피보험자를<br />대신해 실손 보험금을 청구할 수 있어요.</div>
      </div>
      <button style="border: 1px solid gray; padding: 0.25rem 2rem" @click="clickSignup('consultant')">
        설계사 가입하기
      </button>
      <button style="border: 1px solid gray; padding: 0.25rem 2rem" @click="clickSignup('agent')">
        설계사 대리인 가입하기
      </button>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})

const clickSignup = (type: string) => {
  // 설계사, 설계사 대리인에 따라 동의화면 이후 분기처리
  navigateTo('/insu/claim/subrogation/serviceNotInUse/term')
}
</script>

<style scoped lang="scss"></style>
