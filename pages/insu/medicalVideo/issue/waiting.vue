<template>
  <BaseBody :show-back-button="true" page-title="발급대기함" :has-notification="true">
    <section class="issue-waiting">
      <TitleSection
        title="발급할 의료영상을 확인하고 <br/>결제를 진행해주세요."
        description="결제 후 발급 받은 의료영상을 <br/>다른 병원으로 공유할 수 있어요."
      />
      <!-- 체크박스가 있는 아코디언들 -->
      <MedicalHistoryAccordion
        :medical-history="medicalHistory"
        :is-label-title="true"
        label-title="의료영상 발급 신청 대기 목록"
        :show-checkbox="true"
        class="mt-32"
        @change="handleCheckboxChange"
      />
    </section>
    <ButtonGroup class="is-fixed">
      <Button aria-label="결제하기" btn-type="primary" class="lg w-full" :disabled="!hasAnyChecked" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'

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
  },
  {
    id: 2,
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

// 체크된 항목이 하나라도 있는지 확인
const hasAnyChecked = ref(false)

// 체크박스 상태 변경 핸들러
const handleCheckboxChange = (checked: boolean) => {
  console.log('체크박스 상태 변경:', checked)
  hasAnyChecked.value = checked
}
</script>

<style lang="scss" scoped>
.issue-waiting {
  padding: 2.4rem 0 2rem;
}
</style>
