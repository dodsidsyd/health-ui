<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 2rem">
      <h2 style="font-size: 25px; font-weight: bold">청구의신 대리청구 순위예요</h2>

      <div style="text-align: right" @click="clickFilter">전체 설계사.2025 4월</div>

      <div>
        <div style="display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid grey">
          <div>
            <div style="">김ㅇ정</div>
            <div>1,234건</div>
          </div>
          <div>
            <div>KB손해보험</div>
            <div>▲12</div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid grey">
          <div>
            <div style="">김ㅇ정</div>
            <div>1,234건</div>
          </div>
          <div>
            <div>KB손해보험</div>
            <div>▲12</div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid grey">
          <div>
            <div style="">김ㅇ정</div>
            <div>1,234건</div>
          </div>
          <div>
            <div>KB손해보험</div>
            <div>▲12</div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid grey">
          <div>
            <div style="">김ㅇ정</div>
            <div>1,234건</div>
          </div>
          <div>
            <div>KB손해보험</div>
            <div>▲12</div>
          </div>
        </div>
      </div>
    </div>
  </BaseBody>
  <BottomModal
    title="검색 조건을 선택해 주세요"
    :is-visible="isShowFilterModal"
    :is-show-cancel-button="false"
    @close="toggleFilterModal"
    @confirm="selectFilter"
  >
    <template #content>
      <div style="display: flex; padding: 0.75rem; background-color: #d2d2d2">
        <button style="width: 100%; border: 1px solid #2c3e50; padding: 0.75rem 4rem">전체 설계사</button>
        <button style="width: 100%; border: 1px solid #2c3e50; padding: 0.75rem 4rem">소속보험사/GA</button>
      </div>
      <div>
        <!-- 년 선택 셀렉트 박스?-->
        <!-- 월 선택 셀렉트 박스?-->
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowFilterModal = ref(false)

const toggleFilterModal = () => {
  isShowFilterModal.value = !isShowFilterModal.value
}

const clickFilter = () => {
  toggleFilterModal()
}

const selectFilter = () => {
  console.log('필터를 선택했어요')
}
</script>

<style scoped lang="scss"></style>
