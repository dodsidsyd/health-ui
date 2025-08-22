<template>
  <section class="section-homework">
    <TitleBox title="숙제 리스트" />
    <StickyTabsContainer>
      <BoxedTabs
        :tabs="boxTabs"
        :active-key="activeBoxTab"
        variant="fill-type"
        class="mb-20"
        @tab-change="onBoxTabChange"
      />
    </StickyTabsContainer>
    <div v-if="filteredHomeworkList.length > 0" class="homework-list">
      <HomeworkItem
        v-for="homework in filteredHomeworkList"
        :key="homework.id"
        :homework="homework"
        @view-detail="viewDetail"
        @accept-homework="acceptHomework"
        @reject-homework="rejectHomework"
      />
    </div>

    <div v-else class="homework-item empty-homework">
      <div class="empty-content">
        <p class="empty-text">등록된 숙제가 없어요:)</p>
        <p class="empty-subtext">숙제를 추가해 함께 한걸음씩 <br />더 나은 하루를 만들어봐요</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HomeworkItem from '~/components/publishing/community/familyCare/HomeworkItem.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import TitleBox from '~/components/common/TitleBox.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'

const activeBoxTab = ref('all')
const boxTabs = ref<BoxTab[]>([
  { title: '전체', key: 'all' },
  { title: '나', key: 'option1' },
  { title: '엄마', key: 'option2' },
  { title: '큰딸', key: 'option3' },
  { title: '작은 딸', key: 'option4' }
])

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
}

const emit = defineEmits<{
  'view-detail': [homeworkId: string]
  'accept-homework': [homeworkId: string]
  'reject-homework': [homeworkId: string]
}>()

const selectedStatus = ref('all')

// 숙제 리스트 더미 데이터
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

const filteredHomeworkList = computed(() => {
  if (selectedStatus.value === 'all') {
    return homeworkList.value
  }
  return homeworkList.value.filter(homework => homework.status === selectedStatus.value)
})

const viewDetail = (homeworkId: string) => {
  emit('view-detail', homeworkId)
}

const acceptHomework = (homeworkId: string) => {
  emit('accept-homework', homeworkId)
}

const rejectHomework = (homeworkId: string) => {
  emit('reject-homework', homeworkId)
}
</script>

<style scoped lang="scss">
.homework-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
}

.homework-list-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.homework-list-filters {
  .status-filter {
    padding: 0.8rem 1.2rem;
    border: 0.1rem solid #ddd;
    border-radius: 0.8rem;
    font-size: 1.2rem;
    background: white;
    color: #333;

    &:focus {
      outline: none;
      border-color: #4caf50;
    }
  }
}

.homework-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.homework-item {
  &.empty-homework {
    width: 100%;
    height: 14.2rem;
    background: #f4f4f4;
    border-radius: 1.2rem;
    border: 0;
    display: flex;
    margin-top: 1.2rem;
    box-shadow: none;
  }
}

.empty-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .empty-text {
    font-size: 1.6rem;
    color: #959595;
  }
}
</style>
