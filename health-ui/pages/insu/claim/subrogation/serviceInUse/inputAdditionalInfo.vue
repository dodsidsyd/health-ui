<template>
  <BaseBody>
    <h1>보상 안내 받을 분을 선택해 주세요</h1>
    <div>
      <div style="border: 1px solid #8c8c8c; padding: 1rem; border-radius: 7px">설계사 정지혜</div>
    </div>

    <div style="display: flex">
      <button
        style="border-bottom: 1px solid gray; padding: 1rem 3rem; width: 100%"
        :style="selectedTab === 'agent' ? 'border-bottom: 3px solid blue' : ''"
        @click="clickTab('agent')"
      >
        보험설계사
      </button>
      <button
        style="border-bottom: 1px solid gray; padding: 1rem 3rem; width: 100%"
        :style="selectedTab === 'insured' ? 'border-bottom: 3px solid blue' : ''"
        @click="clickTab('insured')"
      >
        피보험자
      </button>
    </div>

    <div style="display: flex; flex-direction: column">
      <label for="name">이름</label>
      <input
        id="name"
        v-model="name"
        style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
        placeholder="이름 입력"
        @input="inputName"
      />
    </div>

    <div style="display: flex; flex-direction: column">
      <label for="phoneNumber">휴대폰번호</label>
      <input
        id="phoneNumber"
        v-model="phoneNumber"
        type="numeric"
        style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
        placeholder="휴대폰번호 입력"
        @input="inputName"
      />
    </div>

    <div style="display: flex; flex-direction: column">
      <label for="memo">메모</label>
      <input
        id="memo"
        v-model="memo"
        style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
        placeholder="메모 입력"
        @input="inputName"
      />
    </div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="clickNext">다음</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

const selectedTab = ref<'agent' | 'insured'>('agent')
const name = ref('')
const phoneNumber = ref()
const memo = ref('')

const clickTab = (tab: 'agent' | 'insured') => {
  selectedTab.value = tab
}

const inputName = () => {
  console.log('입력합니다.')
}

const clickNext = () => {
  // 서류첨부 이동
  navigateTo('/insu/claim/subrogation/serviceInUse/attachClaimFiles')
}
</script>

<style scoped lang="scss"></style>
