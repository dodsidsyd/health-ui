<template>
  <section class="section-homework mb-2">
    <TitleBox title="새로운 숙제가 도착했어요!" />
    <HomeworkItem :homework="newHomework" @view-detail="viewDetail" @start-homework="startHomework" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TitleBox from '~/components/common/TitleBox.vue'
import HomeworkItem from '~/components/publishing/community/familyCare/HomeworkItem.vue'

interface VerificationDay {
  day: string
  isSelected: boolean
}

interface Target {
  id: string
  name: string
  isSelected: boolean
}

interface NewHomework {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  verificationDays: VerificationDay[]
  targets: Target[]
  createdAt: string
  isNew?: boolean
  creatorName?: string
  creatorProfile?: string
}

const emit = defineEmits<{
  'view-detail': [homeworkId: string]
  'start-homework': [homeworkId: string]
}>()

// 새로운 숙제 데이터
const newHomework = ref<NewHomework>({
  id: '1',
  title: '매일 30분 걷기',
  description: '가족과 함께 매일 30분씩 걷는 습관을 만들어보세요. 건강한 다이어트와 체력 증진에 도움이 됩니다.',
  startDate: '2024-01-15',
  endDate: '2024-02-15',
  verificationDays: [
    { day: '월', isSelected: true },
    { day: '화', isSelected: true },
    { day: '수', isSelected: true },
    { day: '목', isSelected: true },
    { day: '금', isSelected: true },
    { day: '토', isSelected: false },
    { day: '일', isSelected: false }
  ],
  targets: [
    { id: '1', name: '나', isSelected: true },
    { id: '2', name: '엄마', isSelected: true },
    { id: '3', name: '큰 딸', isSelected: true }
  ],
  createdAt: '2024-01-15T09:00:00Z',
  isNew: true,
  creatorName: '엄마',
  creatorProfile: 'community/img-community-01.png'
})

const viewDetail = () => {
  if (newHomework.value) {
    emit('view-detail', newHomework.value.id)
  }
}

const startHomework = () => {
  if (newHomework.value) {
    emit('start-homework', newHomework.value.id)
  }
}
</script>

<style scoped lang="scss"></style>
