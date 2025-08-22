<template>
  <BaseBody :show-back-button="true" page-title="패밀리 숙제">
    <LineTabs class="pb-32" :active-key="activeLineTab" :tabs="tabs" />

    <!-- 새로운 숙제 -->
    <NewHomeworkSection v-if="showNewHomework" @view-detail="handleViewDetail" @start-homework="handleStartHomework" />

    <!-- 숙제 리스트 -->
    <HomeworkListSection
      @view-detail="handleViewDetail"
      @accept-homework="handleAcceptHomework"
      @reject-homework="handleRejectHomework"
    />
    <!-- 하단 고정 영역 -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="추가하기"
        class="lg w-full medium btn-sticky"
        @click="navigateToAdd"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import NewHomeworkSection from '~/components/publishing/community/familyCare/NewHomeworkSection.vue'
import HomeworkListSection from '~/components/publishing/community/familyCare/HomeworkListSection.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'

// 새로운 숙제 삳태
const showNewHomework = ref(true)

const router = useRouter()
const activeLineTab = ref('familycare')
const tabs = ref<Tab[]>([
  { title: '패밀리 숙제', to: '/community/familycare/homework', key: 'familycare' },
  { title: '내가 만든 숙제', to: '/community/familycare/homework/my', key: 'my' }
])

// 이벤트 핸들러들
const handleViewDetail = (homeworkId: string) => {
  console.log('상세보기:', homeworkId)
  // TODO: 상세 페이지로 이동
}

const handleStartHomework = (homeworkId: string) => {
  console.log('숙제 시작:', homeworkId)
  // TODO: 숙제 시작 로직
}

const handleAcceptHomework = (homeworkId: string) => {
  console.log('숙제 수락:', homeworkId)
  // TODO: 숙제 수락 로직
}

const handleRejectHomework = (homeworkId: string) => {
  console.log('숙제 거절:', homeworkId)
  // TODO: 숙제 거절 로직
}

const navigateToAdd = () => {
  router.push('/community/familycare/homework/add')
}
</script>

<style scoped lang="scss">
// 필요한 경우 추가 스타일
</style>
