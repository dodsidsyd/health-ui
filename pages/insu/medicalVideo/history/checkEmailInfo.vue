<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true">
    <section class="issue-history">
      <TitleSection
        title="이메일 발송할 의료영상<br/>내역을 확인해주세요."
        description="이메일 발송 진행 시 아래 공유내역을<br/>발송할 수 있어요."
      />
    </section>
    <HistoryDetail :details-list="detailInfos" />
    <MedicalHistoryAccordion
      :medical-history="medicalInfos"
      :is-label-title="true"
      :label-title="'의료영상 발급내역'"
      class="mt-32"
    />
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import HistoryDetail from '~/components/insu/HistoryDetail.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'

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
