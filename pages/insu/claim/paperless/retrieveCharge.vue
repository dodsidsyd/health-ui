<template>
  <BaseBody>
    <div>보험사에 청구 가능 여부를 조회하고 있어요</div>
  </BaseBody>

  <!-- 피보험자/수익자 같은지 확인하는 모달 -->
  <SelectInsuredOrBeneficiaryModal
    :is-visible="isShowModal"
    @close="isShowModal = false"
    @click-diff="clickModalButton"
    @click-same="clickModalButton"
  />

  <!-- 피보험자/수익자 같은지 확인하는 모달 -->
  <!--  <SelectInsuredOrBeneficiaryModal-->
  <!--    :is-visible="isShowModal"-->
  <!--    @close="isShowModal = false"-->
  <!--    @click-diff="clickModalButton"-->
  <!--    @click-same="clickModalButton"-->
  <!--  />-->
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import SelectInsuredOrBeneficiaryModal from '~/components/insu/SelectInsuredOrBeneficiaryModal.vue'

const isShowModal = ref(false)

const clickModalButton = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

onMounted(() => {
  // 서류없이 청구 && 통원
  setTimeout(() => {
    return navigateTo('/insu/claim/paperless/confirmChargeInfo')
  }, 2000)
  // 서류없이 청구 && 입원 && 정상처리 가능한 경우 피보험자/수익자 동일 여부확인 하단 모달 호출
  // isShowModal.value = true

  // 보험계약정보 자격이 아닌 경우
  // 보장계약 기간이 지난 경우
  // [NH농협생명] 청구중인 청구서 존재 시
  // 서류 첨부 여부 선택
})
</script>

<style scoped lang="scss"></style>
