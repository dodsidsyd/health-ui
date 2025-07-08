<template>
  <BaseBody>
    <client-only>
      <div>
        <div>소속 보험사 또는 GA를 선택해 주세요</div>
        <button
          style="border-bottom: 1px solid gray; padding: 1rem 3rem"
          :style="selectedTab === 'ga' ? 'border-bottom: 3px solid blue' : ''"
          @click="clickTab('ga')"
        >
          GA
        </button>
        <button
          style="border-bottom: 1px solid gray; padding: 1rem 3rem"
          :style="selectedTab === 'insuranceCompany' ? 'border-bottom: 3px solid blue' : ''"
          @click="clickTab('insuranceCompany')"
        >
          보험사
        </button>
        <div style="padding: 1rem">
          <div v-show="selectedTab === 'ga'" style="display: flex; flex-direction: column; gap: 1rem">
            <input
              type="text"
              style="padding: 0.25rem; border: 1px solid gainsboro"
              placeholder="GA명이나 주소를 검색해주세요"
            />

            <div
              v-for="item in gaList"
              :key="item.id"
              style="display: flex; align-items: center; gap: 3rem; border-top: 1px solid gainsboro"
              @click="clickAgency(item)"
            >
              <div style="padding: 0.75rem 0">
                <div>{{ item.label }}</div>
                <div>{{ item.address }}</div>
              </div>
              <div><i class="ri-arrow-right-s-line"></i></div>
            </div>

            <div style="padding: 1rem; border: 1px solid gainsboro; text-align: center">
              <div>소속된 GA가 없나요?</div>
              <button style="border: 1px solid gray; padding: 0.25rem" @click="clickRegisterGA">직접 찾기</button>
            </div>
          </div>
          <div v-show="selectedTab === 'insuranceCompany'">
            <div v-for="item in insuList" :key="item.insuId" @click="clickRegisterInsuComp(item)">
              <img :src="item.logoUrl" alt="" style="width: 40px" />
              {{ item.insuDispNm }}
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </BaseBody>
</template>

<script setup lang="ts">
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'
import BaseBody from '~/components/layout/BaseBody.vue'
import { useAsyncData } from '#app'

definePageMeta({
  title: '설계사 가입'
})

const selectedTab = ref('ga')
const gaList = ref([
  {
    id: 1,
    label: 'GA1',
    type: 'ga',
    address: '서울 영등포구 국제금융로 66길 33 여의도동'
  },
  {
    id: 2,
    label: 'GA2',
    type: 'ga',
    address: '서울 영등포구 국제금융로 66길 33 여의도동'
  },
  {
    id: 3,
    label: 'GA3',
    type: 'ga',
    address: '서울 영등포구 국제금융로 66길 33 여의도동'
  }
])
const insuList = ref<any>([])

const clickTab = (type: 'ga' | 'insuranceCompany') => {
  selectedTab.value = type
}

const clickAgency = async (item: any) => {
  const modalContent = `
    <div>
      <div>
        <i class="ri-information-line"></i>
      </div>
      <div>[${item.type}] ${item.label}</div>
      <div>보험설계사용 서비스에 가입하시겠어요?</div>
    </div>`

  // const alertModalContent = `
  //   <div>
  //     <div>
  //       <i class="ri-information-line"></i>
  //     </div>
  //     <div>가입을 완료했어요.</div>
  //     <div>보험설계사용 서비스 이용을 위해<br /> 다시 로그인 해주세요.</div>
  //   </div>`

  const signupModalRes = await ConfirmModal.open({
    isVisible: true,
    html: modalContent,
    confirmButtonText: '가입하기',
    isShowCancelButton: false
  })
  if (signupModalRes) {
    return navigateTo('/insu/claim/subrogation/serviceNotInUse/successSubrogation')
  }
}

const clickRegisterGA = () => {
  navigateTo('/insu/claim/subrogation/serviceNotInUse/requestGARegister')
}

const clickRegisterInsuComp = async (item: any) => {
  const res = await ConfirmModal.open({
    isVisible: true,
    confirmButtonText: '가입하기',
    html: `<div>보험사 <br />${item.insuDispNm} <div>보험설계사용 서비스에 가입하시겠어요?</div></div>`
  })

  if (!res) return
  navigateTo('/insu/claim/subrogation/serviceNotInUse/successSubrogation')
}

onMounted(() => {
  insuList.value = []
  console.log('✅ 보험사 데이터:', insuList.value)
})
</script>

<style scoped lang="scss"></style>
