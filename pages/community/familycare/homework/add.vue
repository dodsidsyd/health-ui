<template>
  <BaseBody :show-back-button="true" page-title="건강 숙제">
    <AddHomeWork
      :show-required-error="showRequiredError"
      @update:selected-days="updateSelectedDays"
      @update:homework-name="updateHomeworkName"
      @update:homework-period="updateHomeworkPeriod"
      @validate="handleValidation"
    />
    <ButtonGroup v-if="!isFieldsetFocused" class="is-fixed">
      <Button btn-type="primary" element-type="button" class="lg w-full medium btn-sticky" @click="handleSubmit">
        등록하기
      </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import AddHomeWork from '~/components/publishing/community/familyCare/AddHomeWork.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import { ref } from 'vue'

interface SelectedDays {
  // 요일
  mon: boolean
  tue: boolean
  wed: boolean
  thu: boolean
  fri: boolean
  sat: boolean
  sun: boolean
  // 대상
  all: boolean
  me: boolean
  mother: boolean
  oldDaughter: boolean
  youngDaughter: boolean
  sonInLaw: boolean
  nephew: boolean
  son: boolean
}

const isFieldsetFocused = ref(false)
const showRequiredError = ref({
  name: false,
  period: false,
  days: false,
  targets: false
})
const homeworkName = ref('')
const homeworkPeriod = ref(null)
const selectedDays = ref<SelectedDays>({
  // 요일
  mon: false,
  tue: false,
  wed: false,
  thu: false,
  fri: false,
  sat: false,
  sun: false,
  // 대상
  all: false,
  me: false,
  mother: false,
  oldDaughter: false,
  youngDaughter: false,
  sonInLaw: false,
  nephew: false,
  son: false
})

// 요일 선택 상태 업데이트
const updateSelectedDays = (days: SelectedDays) => {
  selectedDays.value = days
}

// 숙제명 업데이트
const updateHomeworkName = (name: string) => {
  homeworkName.value = name
}

// 숙제 기간 업데이트
const updateHomeworkPeriod = (period: any) => {
  homeworkPeriod.value = period
}

// validation 처리
const handleValidation = (isValid: boolean) => {
  if (isValid) {
    // 각 항목이 입력되었으면 에러 메시지 숨김
    if (homeworkName.value.trim().length > 0) {
      showRequiredError.value.name = false
    }
    if (homeworkPeriod.value !== null) {
      showRequiredError.value.period = false
    }

    const hasSelectedDays = Object.values({
      mon: selectedDays.value.mon,
      tue: selectedDays.value.tue,
      wed: selectedDays.value.wed,
      thu: selectedDays.value.thu,
      fri: selectedDays.value.fri,
      sat: selectedDays.value.sat,
      sun: selectedDays.value.sun
    }).some(day => day)

    const hasSelectedTargets = Object.values({
      me: selectedDays.value.me,
      mother: selectedDays.value.mother,
      oldDaughter: selectedDays.value.oldDaughter,
      youngDaughter: selectedDays.value.youngDaughter,
      sonInLaw: selectedDays.value.sonInLaw,
      nephew: selectedDays.value.nephew,
      son: selectedDays.value.son
    }).some(target => target)

    if (hasSelectedDays) {
      showRequiredError.value.days = false
    }
    if (hasSelectedTargets) {
      showRequiredError.value.targets = false
    }
  }
}

// 등록하기 버튼 클릭 처리
const handleSubmit = () => {
  // 숙제명이 입력되었는지 확인
  const hasName = homeworkName.value.trim().length > 0

  // 숙제 기간이 선택되었는지 확인
  const hasPeriod = homeworkPeriod.value !== null

  // 요일이 하나도 선택되지 않았는지 확인
  const hasSelectedDays = Object.values({
    mon: selectedDays.value.mon,
    tue: selectedDays.value.tue,
    wed: selectedDays.value.wed,
    thu: selectedDays.value.thu,
    fri: selectedDays.value.fri,
    sat: selectedDays.value.sat,
    sun: selectedDays.value.sun
  }).some(day => day)

  // 대상이 하나도 선택되지 않았는지 확인
  const hasSelectedTargets = Object.values({
    me: selectedDays.value.me,
    mother: selectedDays.value.mother,
    oldDaughter: selectedDays.value.oldDaughter,
    youngDaughter: selectedDays.value.youngDaughter,
    sonInLaw: selectedDays.value.sonInLaw,
    nephew: selectedDays.value.nephew,
    son: selectedDays.value.son
  }).some(target => target)

  // 각각의 validation 상태 설정
  showRequiredError.value.name = !hasName
  showRequiredError.value.period = !hasPeriod
  showRequiredError.value.days = !hasSelectedDays
  showRequiredError.value.targets = !hasSelectedTargets

  // 하나라도 실패하면 등록하지 않음
  if (!hasName || !hasPeriod || !hasSelectedDays || !hasSelectedTargets) {
    return
  }

  // 모든 validation 통과 시 등록 로직 실행
  console.log('등록 처리:', {
    name: homeworkName.value,
    period: homeworkPeriod.value,
    selectedDays: selectedDays.value
  })
  // TODO: 실제 등록 API 호출
}
</script>
