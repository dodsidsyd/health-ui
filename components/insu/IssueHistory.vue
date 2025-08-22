<template>
  <div class="ml-n20 mr-n20">
    <!-- 총 건수 -->
    <TotalCountSelectType :count="props.medicalInfos.length || 0" />

    <div class="list">
      <MedicalHistoryAccordion
        :medical-history="props.medicalInfos"
        :is-label-title="false"
        :show-status="true"
        :is-share-date="true"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import TotalCountSelectType from '~/components/publishing/common/temp/TotalCountSelectType.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'

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

const props = defineProps<{ medicalInfos: MedicalHistory[] }>()
</script>
<style lang="scss" scoped>
.c-count-box {
  padding: 2rem;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem 2rem 4.8rem;
  background: #f4f4f4;
}
@media (max-width: 420px) {
  :deep(.c-inpType) {
    .c-inp-el {
      .custom-select {
        .select-display {
          font-size: 1.6rem;
          min-width: auto;
        }
      }
    }
  }
}
</style>
