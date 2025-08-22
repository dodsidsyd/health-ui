<template>
  <BaseBody page-title="">
    <CompleteTitleSection :title="'이메일 발송을 완료하였어요.'" />
    <HistoryDetail :details-list="detailInfos" />
    <MedicalHistoryAccordion
      :medical-history="medicalInfos"
      :is-label-title="true"
      :label-title="'의료영상 발급내역'"
      class="mt-32"
    />
    <ButtonGroup class="is-fixed">
      <Button aria-label="의료영상 내역으로" btn-type="primary" class="lg w-full" />
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import CompleteTitleSection from '~/components/insu/CompleteTitleSection.vue'
import HistoryDetail from '~/components/insu/HistoryDetail.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
const detailInfos = [
  {
    id: 1,
    title: '공유 병원명',
    detail: '고려대학병원'
  },
  {
    id: 2,
    title: '병원 이메일 주소',
    detail: 'kimlemon@naver.com'
  },
  {
    id: 3,
    title: '비밀번호',
    password: 5156151
  }
]
const medicalInfos = [
  {
    id: 1,
    title: '공유 병원명',
    hospitalName: '고려대학병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    issueDate: '2025.06.25',
    accessDate: '2025.06.25~2025.08.31',
    departments: [
      {
        id: 101,
        department: '내과',
        examinations: [
          {
            id: 1001,
            name: 'CT (컴퓨터단층촬영)',
            date: '2024.11.20'
          },
          {
            id: 1002,
            name: 'MRI (자기공명영상)',
            date: '2024.11.15'
          }
        ]
      },
      {
        id: 102,
        department: '정형외과',
        examinations: [
          {
            id: 1003,
            name: 'X-ray (엑스레이)',
            date: '2024.11.10'
          }
        ]
      }
    ]
  }
]
</script>
<style scoped>
.issue-history {
  padding: 2.4rem 0 3.2rem;
}
</style>
