<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <h2>사고유형, 일자, 내용, 주소 한번에 입력</h2>

      <!-- 대리청구일 경우 표시 -->
      <div v-if="isSubrogationPath" style="border: 1px solid #8c8c8c; padding: 1rem; border-radius: 7px">
        설계사 정지혜
      </div>

      <!-- 대리청구일 경우 표시 X -->
      <div v-if="!isSubrogationPath" style="display: flex; flex-direction: column">
        <div>주소</div>
        <input
          style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
          placeholder="주소를 입력하세요"
        />
        <input
          style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
          placeholder="상세주소 입력"
        />
      </div>

      <div style="display: flex; flex-direction: column">
        <span>사고(질병 OR 내원) 내용</span>
        <input
          style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
          placeholder="(예) 감기몸살, 장염, 골절"
        />
      </div>

      <div style="display: flex; flex-direction: column">
        <div>사고(진료)일자</div>
        <input style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem" />
      </div>

      <div style="display: flex; flex-direction: column">
        <span>사고 유형</span>
        <select style="border: 1px solid gray; padding: 10px">
          <option value="disease">질병</option>
          <option value="wound">일반상해</option>
          <option value="carAccident">교통사고</option>
        </select>
      </div>
    </div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="clickNext">다음</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

definePageMeta({
  title: '대리청구'
})

const isShowAddressInput = ref(false)

const clickNext = () => {
  // 서류없이 청구 && 통원
  return navigateTo('/insu/claim/paperless/selectOutpatientTreatment')
  // 서류없이 청구 && 진료
  // return navigateTo('/insu/claim/paperless/selectInpatientTreatment')

  // 사진찍어 청구
  // return navigateTo('/insu/claim/inputBeneficiaryInfo')
  // 그 외 (대리청구...)
  // return navigateTo('/insu/claim/subrogation/serviceInUse/inputAdditionalInfo')
}

const isSubrogationPath = computed(() => {
  return false
})
</script>

<style scoped lang="scss"></style>
