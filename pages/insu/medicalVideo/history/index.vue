<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true" class="pb-36">
    <section class="issue-history">
      <TitleSection title="의료영상 내역을<br/>확인할 수 있어요." />
      <ButtonGroup class="mt-16" gap="8">
        <Button aria-label="의료영상 발급" btn-type="line" class="xm" />
        <Button aria-label="발급대기함" btn-type="line" class="xm" />
      </ButtonGroup>
    </section>
    <hr class="hr-section ml-n20 mr-n20 mt-0" />
    <StickyTabsContainer class="pt-8">
      <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

      <!-- 영상 발급내역 탭 -->
      <div v-if="activeLineTab === 'issue'">
        <!-- 알림 노출 -->
        <StatusNotification v-if="medicalInfos.length > 0" :count="medicalInfos.length" />
        <!-- v-if="list.length > 0" -->
        <IssueHistory :medical-infos="medicalInfos" v-if="medicalInfos.length > 0" />
        <InsuEmpty v-else title="발급 내역이 없어요." sub-title="발급 내역을 확인할 수 있어요." />
      </div>

      <!-- 배송내역 탭 -->
      <div v-else-if="activeLineTab === 'delivery'">
        <!-- v-if="list.length > 0" -->
        <DeliveryHistory />
        <!-- <InsuEmpty v-else /> -->
      </div>
    </StickyTabsContainer>
    <ButtonGroup class="is-fixed">
      <Button aria-label="제휴병원 연결" btn-type="primary" class="lg w-full" />
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import IssueHistory from '~/components/insu/IssueHistory.vue'
import DeliveryHistory from '~/components/insu/DeliveryHistory.vue'
import StatusNotification from '~/components/insu/StatusNotification.vue'

import InsuEmpty from '~/components/insu/InsuEmpty.vue'

const activeLineTab = ref('issue')

const lineTabs = ref<Tab[]>([
  { title: '영상 발급내역', key: 'issue' },
  { title: '배송내역', key: 'delivery' }
])

const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

// 목록 데이터 (실사용 시 API 연동)
interface Examination {
  id: number
  name: string
  date: string
}
interface Department {
  id: number
  department: string
  examinations: Examination[]
}
interface MedicalHistory {
  id: number
  hospitalName: string
  logo: string
  status?: string
  arrowType?: boolean
  accessDate?: string
  shareFrom?: string
  shareTo?: string
  buttonCount?: 0 | 1 | 2 | 3
  buttonKeys?: ('share' | 'cd' | 'history')[]
  departments: Department[]
}

const medicalInfos = ref<MedicalHistory[]>([
  {
    id: 1,
    hospitalName: '경북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    status: '발급 완료',
    arrowType: true,
    shareFrom: '2025.08.20',
    shareTo: '2025.08.22',
    buttonCount: 3,
    departments: [
      {
        id: 1,
        department: '영상의학과',
        examinations: [
          { id: 10, name: 'CT 검사', date: '2025.08.20' },
          { id: 11, name: 'MRI 검사', date: '2025.08.21' }
        ]
      },
      { id: 2, department: '가정의학과', examinations: [{ id: 12, name: 'X-Ray 검사', date: '2025.08.20' }] },
      { id: 3, department: '내과', examinations: [{ id: 13, name: '초음파 검사', date: '2025.08.20' }] }
    ]
  },
  {
    id: 2,
    hospitalName: '경북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    status: '발급 진행중',
    accessDate: '2025.08.20',
    shareFrom: '2025.08.20',
    shareTo: '2025.08.22',
    departments: [{ id: 1, department: '영상의학과', examinations: [{ id: 10, name: 'CT', date: '2025.08.20' }] }]
  },
  {
    id: 3,
    hospitalName: '경북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    status: '다시 발급하기',
    arrowType: true,
    accessDate: '2025.08.20',
    buttonCount: 0,
    departments: [{ id: 1, department: '영상의학과', examinations: [{ id: 10, name: 'CT', date: '2025.08.20' }] }],
    buttonKeys: ['history']
  }
])
</script>
<style scoped>
.issue-history {
  padding: 2.4rem 0 3.2rem;
}
</style>
