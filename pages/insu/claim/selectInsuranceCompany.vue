<template>
  <BaseBody >
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
        <div v-if="selectedTab === 'ga'" style="display: flex; flex-direction: column; gap: 1rem">
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
        <div v-else>
          <div></div>
        </div>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'
import BaseBody from '~/components/layout/BaseBody.vue'

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

const insuranceCompany = ref([
  {
    id: 1,
    label: 'insuComp1',
    type: 'insuComp',
    logo: ''
  },
  {
    id: 2,
    label: 'insuComp12',
    type: 'insuComp',
    logo: ''
  },
  {
    id: 3,
    label: 'insuComp13',
    type: 'insuComp',
    logo: ''
  }
])

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

  ConfirmModal.open({
    isVisible: true,
    html: modalContent,
    confirmButtonText: '가입하기',
    isShowCancelButton: false
  }).then(res => {
    console.log('eeee', res)
  })
}

const clickRegisterGA = () => {
  navigateTo('/insu/claim/subrogation/requestGARegister')
}
</script>

<style scoped lang="scss"></style>
