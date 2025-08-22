<template>
  <DiaryEditor
    v-if="isDataLoaded"
    :is-edit-mode="true"
    :diary-id="diaryId"
    :initial-data="diaryData"
    @save="handleSave"
    @close="handleClose"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DiaryEditor from '~/components/publishing/community/diary/DiaryEditor.vue'

const router = useRouter()
const route = useRoute()

// 다이어리 ID
const diaryId = route.params.diaryId as string

// 다이어리 데이터
const diaryData = ref({})
const isDataLoaded = ref(false)

// 기존 다이어리 데이터 로드
const loadExistingDiary = () => {
  try {
    const existingDiaries = JSON.parse(localStorage.getItem('diaryList') || '[]')
    const existingDiary = existingDiaries.find((diary: any) => diary.id === Number(diaryId))

    if (existingDiary) {
      diaryData.value = existingDiary
      isDataLoaded.value = true
      console.log('기존 다이어리 로드:', existingDiary)
    } else {
      console.error('다이어리를 찾을 수 없음:', diaryId)
      router.push('/community/diary/list')
    }
  } catch (error) {
    console.error('다이어리 로드 실패:', error)
    router.push('/community/diary/list')
  }
}

// 저장 처리
const handleSave = (diaryData: any) => {
  console.log('수정할 다이어리 데이터:', diaryData)

  // localStorage에서 기존 다이어리 목록 가져오기
  const existingDiaries = JSON.parse(localStorage.getItem('diaryList') || '[]')

  // 기존 다이어리 업데이트
  const existingIndex = existingDiaries.findIndex((diary: any) => diary.id === Number(diaryId))
  if (existingIndex !== -1) {
    existingDiaries[existingIndex] = diaryData
  } else {
    console.error('수정할 다이어리를 찾을 수 없음')
    return
  }

  // localStorage에 저장
  localStorage.setItem('diaryList', JSON.stringify(existingDiaries))

  console.log('다이어리 수정 완료:', diaryData)

  // 수정 후 목록 페이지로 이동
  router.push({
    path: '/community/diary/list',
    query: {
      scrollTo: diaryData.date,
      updatedDiary: 'true'
    }
  })
}

// 뒤로가기 함수
const handleClose = () => {
  router.go(-1) // 히스토리백
}

// 컴포넌트 마운트 시 기존 다이어리 로드
onMounted(() => {
  loadExistingDiary()
})
</script>
