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
    <client-only>
      <div class="mt-24">
        <h1 class="c-tit">
          <span class="text">
            소속 보험사 또는 GA를<br />선택해 주세요
          </span>
        </h1>
      </div>
      <LineTabs :tabs="tabs" />
      <div class="wrap-insurance-list">
        <button 
          v-for="item in insuranceList" 
          :key="item.id"
          class="item"
          @click="clickAgency(item)"
        >
          <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
          <div class="name-insurance">{{ item.name }}</div>
        </button>
      </div>
    </client-only>
  </BaseBody>
</template>

<script setup lang="ts">
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
// import { useAsyncData } from '#app'

const activeLineTab = ref('accountInfo')
const tabs = ref<Tab[]>([
  { title: 'GA', to: '/insu/claim/subrogation/serviceNotInUse/selectInsuranceCompany' },
  { title: '보험사', to: '/insu/claim/subrogation/serviceNotInUse/insurance' },
])

definePageMeta({
  title: '설계사 가입'
})

const insuranceList = ref([
  { id: 1, name: 'DB손해' },
  { id: 2, name: 'DB손해' },
  { id: 3, name: 'DB손해' },
  { id: 4, name: 'DB손해' },
  { id: 5, name: 'DB손해' },
  { id: 6, name: 'DB손해' },
  { id: 7, name: 'DB손해' },
  { id: 8, name: 'DB손해' }
])
const insuList = ref<any>([])


const clickAgency = async (item: any) => {
  const modalContent = `
    <div>
      <div>
        <i class="ri-information-line"></i>
      </div>
      <div>보험설계사용 서비스에 가입하시겠어요?</div>
    </div>`

  const signupModalRes = await ConfirmModal.open({
    isVisible: true,
    title: '안내',
    html: modalContent,
    confirmButtonText: '가입하기',
    isShowCancelButton: false
  })
  if (signupModalRes) {
    return navigateTo('/insu/claim/subrogation/serviceNotInUse/successSubrogation')
  }
}
onMounted(() => {
  insuList.value = []
  console.log('✅ 보험사 데이터:', insuList.value)
})
</script>

<style scoped lang="scss">
.wrap-insurance-list {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
	grid-auto-columns: auto;
  gap: 0.8rem;
  .item {
    padding: 1.8rem 1.6rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    border-radius: 0.8rem;
    background-color: #F9F9F9;
    .logo-insurance {
      width: 4rem;
      height: 4rem;
    }
    .name-insurance {
      font-size: 1.4rem;
      font-weight: 500;
      color: #2B2B2B;
    }
  }
}
</style>
