<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 2rem">
      <div>
        <h2 style="font-size: 25px; font-weight: bold">구독서비스</h2>
        <div style="display: flex; gap: 1rem">
          <button class="c-btn" style="padding: 2rem" @click="movePage('insuredManagement')">
            대리청구/피보험자 관리
          </button>
          <button class="c-btn" style="padding: 2rem" @click="movePage('agentHistory')">대리청구 내역조회</button>
        </div>
      </div>

      <div>
        <h3>대리청구 관리 및 안내</h3>
        <button
          class="c-btn"
          style="padding: 2rem; margin-top: 1rem; background-color: #b0b0b0"
          @click="movePage('agentManagement')"
        >
          {{ getManagementButtonName }}
        </button>
        <button
          class="c-btn"
          style="padding: 2rem; margin-top: 0.75rem; background-color: #8c8c8c"
          @click="movePage('ranking')"
        >
          대리청구 순위
        </button>
        <button
          class="c-btn"
          style="padding: 2rem; margin-top: 0.75rem; background-color: antiquewhite; color: black"
          @click="movePage('helpDesk')"
        >
          고객센터
        </button>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

const movePage = (type: 'agentManagement' | 'ranking' | 'helpDesk' | 'agentHistory' | 'insuredManagement') => {
  switch (type) {
    case 'ranking':
      return navigateTo('/insu/claim/subrogation/serviceInUse/agentRanking')
    case 'agentManagement':
      return navigateTo('/insu/claim/subrogation/serviceInUse/agentManagement')
    case 'agentHistory':
      return navigateTo('/insu/claim/subrogation/serviceInUse/agentClaimHistory')
    case 'insuredManagement': {
      // 설계사/기타대리인일 경우
      return navigateTo('/insu/claim/subrogation/serviceInUse/insuredManagement')
      // 일반 고객일 경우
      // return navigateTo('/insu/claim/subrogation/serviceInUse/insuredManagementByGeneral')
    }
    default:
      return
  }
}

const getManagementButtonName = computed(() => {
  // 보험설계사인 경우
  // return '설계사 대리인 관리'
  // 설계사 대리인인 경우
  return '설계사 관리'
})
</script>

<style scoped lang="scss"></style>
