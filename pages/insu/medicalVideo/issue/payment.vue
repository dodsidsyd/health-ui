<template>
  <BaseBody page-title="의료영상발급" :show-back-button="true" :has-notification="true">
    <section class="payment-confirmation">
      <TitleSection
        title="결제 후 발급한 의료영상을 <br/> 확인할 수 있어요."
        description="결제 후 발급 받은 의료 다른 병원으로 <br/>공유할 수 있어요."
      />
      <MedicalPayment :payment-infos="paymentInfos" :total-price="totalPrice" class="mt-32" />
      <MedicalHistoryAccordion :medical-history="medicalHistory" :label-title="labelTitle" class="mt-32" />
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
import TitleSection from '~/components/insu/TitleSection.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'
import MedicalPayment from '~/components/insu/MedicalPayment.vue'

const paymentInfos = ref([
  { id: 1, title: '영상 발급료', price: 10000 },
  { id: 2, title: '클라우드 사용료', price: 10000 },
  { id: 3, title: '부가세', price: 10000 }
])

const totalPrice = computed(() => {
  return paymentInfos.value.reduce((acc, curr) => acc + curr.price, 0)
})

// 단일 의료영상 공유내역 데이터
const medicalHistory = ref({
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
})

// 아코디언 제목
const labelTitle = ref('의료영상 공유내역')
</script>

<style lang="scss" scoped>
.payment-confirmation {
  padding-top: 2.4rem;
}
</style>
