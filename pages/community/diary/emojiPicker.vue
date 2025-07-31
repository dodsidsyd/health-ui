<template>
  <BaseBody
    page-title="마음 일기"
    :show-back-button="false"
    :has-close-btn="true"
    :add-text-click-enabled="false"
    @close="handleClose"
  >
    <DateRangeSelect
      v-model="selectedDate"
      class="mt-23 mb-10"
      navigation-mode="notyear"
      :prev-btn="false"
      :next-btn="false"
      @update:model-value="handleDateChange"
    />

    <TitieBox 
      title="오늘은 어떤 하루였나요?" 
      titleClass=""
      ariaLabel=""
      text=""
      :center="true"
      class="mb-24" 
    />

    <Emoji @emoji-selected="handleEmojiSelected" />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import DateRangeSelect from '~/components/smartRing/DateRangeSelect.vue'
import TitieBox from '~/components/common/TitleBox.vue'
import Emoji from '~/components/publishing/community/diary/Emoji.vue'

const router = useRouter()
const route = useRoute()

// URL 파라미터에서 날짜 받아오기
const selectedDate = ref(new Date(route.query.date as string || new Date()))

// 날짜 변경 핸들러
const handleDateChange = (newDate: Date) => {
  selectedDate.value = new Date(newDate)
}

// 이모지 선택 핸들러
const handleEmojiSelected = (selectedEmoji: { file: string; name: string }) => {
  // returnPath가 있으면 해당 경로로, 없으면 create.vue로 이동
  const returnPath = route.query.returnPath as string || '/community/diary/create'
  
  // 선택된 이모지와 날짜 정보를 쿼리로 전달
  const query = {
    date: selectedDate.value.toISOString().split('T')[0],
    emoji: selectedEmoji.file,
    name: selectedEmoji.name
  }
  
  router.push({
    path: returnPath,
    query
  })
}

// 닫기 버튼 핸들러
const handleClose = () => {
  router.go(-1) // 히스토리백
}
</script>
<style lang="scss" scoped>
:deep(.title-box) {
  .title {
    font-size: 1.8rem;
    line-height: 2.5rem;
  }
}
.emoji-list {
  display: grid;
  padding: 0 0.4rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  :deep(.emoji-item) {
    img {
      margin: 0 auto;
    }
  }
}

@media (max-width: 374px) {
  .emoji-list {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media (min-width: 760px) {
  .emoji-list {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
