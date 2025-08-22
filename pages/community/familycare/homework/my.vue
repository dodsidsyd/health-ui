<template>
  <BaseBody :show-back-button="true" page-title="내가 만든 숙제">
    <LineTabs :active-key="activeLineTab" :tabs="tabs" />
    <section v-if="filteredHomeworkList.length > 0" class="homework-list mt-32">
      <HomeworkItem
        v-for="homework in filteredHomeworkList"
        :key="homework.id"
        :homework="homework"
        @view-detail="viewDetail"
        @accept-homework="acceptHomework"
        @reject-homework="rejectHomework"
      />
    </section>

    <div v-else class="homework-item empty-homework">
      <div class="empty-content">
        <p class="empty-text">등록된 숙제가 없어요:)</p>
        <p class="empty-subtext">숙제를 추가해 함께 한걸음씩 <br />더 나은 하루를 만들어봐요</p>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import HomeworkItem from '~/components/publishing/community/familyCare/HomeworkItem.vue'

const activeLineTab = ref('my')
const tabs = ref<Tab[]>([
  { title: '패밀리 숙제', to: '/community/familycare/homework', key: 'familycare' },
  { title: '내가 만든 숙제', to: '/community/familycare/homework/my', key: 'my' }
])

const filteredHomeworkList = computed(() => {
  return homeworkList.value.filter(homework => homework.isNew === false)
})

const homeworkList = ref([
  {
    id: '1',
    title: '물 2L 마시기',
    description: '하루에 물을 2L 마시는 습관을 만들어보세요. 건강한 피부와 신진대사에 도움이 됩니다.',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    verificationDays: [
      { day: '월', isSelected: true },
      { day: '화', isSelected: true },
      { day: '수', isSelected: true },
      { day: '목', isSelected: true },
      { day: '금', isSelected: true },
      { day: '토', isSelected: true },
      { day: '일', isSelected: true }
    ],
    targets: [
      { id: '1', name: '나', isSelected: true },
      { id: '2', name: '엄마', isSelected: true }
    ],
    createdAt: '2024-01-10T09:00:00Z',
    status: 'active',
    progress: 65,
    isNew: false,
    isParticipating: true,
    creatorName: '엄마',
    myCompletedDate: 3,
    missionProgressDays: 15
  },
  {
    id: '2',
    title: '물 2L 마시기',
    description: '하루에 물을 2L 마시는 습관을 만들어보세요. 건강한 피부와 신진대사에 도움이 됩니다.',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    verificationDays: [
      { day: '월', isSelected: true },
      { day: '화', isSelected: true },
      { day: '수', isSelected: true },
      { day: '목', isSelected: true },
      { day: '금', isSelected: true },
      { day: '토', isSelected: true },
      { day: '일', isSelected: true }
    ],
    targets: [
      { id: '1', name: '나', isSelected: true },
      { id: '2', name: '엄마', isSelected: true }
    ],
    createdAt: '2024-01-10T09:00:00Z',
    status: 'active',
    progress: 65,
    isNew: false,
    isParticipating: true,
    creatorName: '엄마',
    myCompletedDate: 5,
    missionProgressDays: 15
  },
  {
    id: '3',
    title: '스트레칭 10분',
    description: '매일 아침 스트레칭 10분으로 유연성을 높이고 몸을 깨워보세요.',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    verificationDays: [
      { day: '월', isSelected: true },
      { day: '화', isSelected: true },
      { day: '수', isSelected: true },
      { day: '목', isSelected: true },
      { day: '금', isSelected: true },
      { day: '토', isSelected: false },
      { day: '일', isSelected: false }
    ],
    targets: [{ id: '1', name: '나', isSelected: true }],
    createdAt: '2024-01-01T09:00:00Z',
    status: 'active',
    progress: 100,
    isNew: false,
    isParticipating: false,
    creatorName: '나',
    myCompletedDate: 0,
    missionProgressDays: 31
  }
])
</script>
<style lang="scss" scoped>
.homework-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
