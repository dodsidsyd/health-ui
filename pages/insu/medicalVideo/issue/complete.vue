<template>
  <BaseBody page-title="" :show-back-button="false">
    <section class="issue-complete">
      <CompleteTitleSection
        :title="'의료영상 발급<br/>결제가 완료되었어요.'"
        :description="'의료영상 발급은 다소 시간이 소요될 수 있으며<br/>완료 후  알림 및 보관함에서 확인할 수 있어요.'"
      />
      <MedicalPayment :payment-infos="paymentInfos" :total-price="totalPrice" class="mt-32" />
      <MedicalHistoryAccordion
        :medical-history="medicalHistory"
        :is-label-title="true"
        label-title="의료영상 공유내역"
        class="mt-32"
      />
    </section>
    <ButtonGroup class="is-fixed half">
      <Button aria-label="취소" btn-type="secondary" class="lg" />
      <Button aria-label="결제하기" btn-type="primary" class="lg" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'
import MedicalPayment from '~/components/insu/MedicalPayment.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import CompleteTitleSection from '~/components/insu/CompleteTitleSection.vue'
const paymentInfos = ref([
  { id: 1, title: '영상 발급료', price: 10000 },
  { id: 2, title: '클라우드 사용료', price: 10000 },
  { id: 3, title: '부가세', price: 10000 }
])

const totalPrice = computed(() => {
  return paymentInfos.value.reduce((acc, curr) => acc + curr.price, 0)
})

const medicalHistory = ref([
  {
    id: 1,
    hospitalName: '충북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    departments: [
      {
        id: 1,
        department: '영상의학과',
        examinations: [
          {
            id: 1,
            name: 'CT 검사',
            date: '2025.05.24'
          },
          {
            id: 2,
            name: 'MRI 검사',
            date: '2025.05.24'
          }
        ]
      },
      {
        id: 2,
        department: '가정의학과',
        examinations: [
          {
            id: 3,
            name: 'X-Ray 검사',
            date: '2025.05.24'
          }
        ]
      },
      {
        id: 3,
        department: '내과',
        examinations: [
          {
            id: 4,
            name: '초음파 검사',
            date: '2025.05.24'
          }
        ]
      }
    ]
  }
])
</script>

<style lang="scss" scoped>
.issue-complete {
  padding-top: 0;
}
</style>
