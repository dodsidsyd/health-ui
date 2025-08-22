<template>
  <BaseBody :show-back-button="true" page-title="패밀리 일정">
    <!-- 일정 있는 날짜 5, 10, 15, 20, 25  -->
    <DatePicker class="mt-24" :scheduled="[5, 10, 15, 20, 25]" />
    <hr class="hr-section ml-n20 mr-n20 mb-10" />

    <div class="schduled-date">8 월 4일 수요일</div>

    <div class="schedule-item-list">
      <FamilyScheduleItem />
      <FamilyScheduleItem />
      <FamilyScheduleItem />
    </div>
    <!-- 하단 고정 영역 -->
    <ButtonGroup v-if="!isFieldsetFocused" class="is-fixed">
      <Button btn-type="primary" element-type="button" class="lg w-full medium btn-sticky"> 일정 추가하기 </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import DatePicker from '~/components/publishing/input/DatePicker.vue'
import FamilyScheduleItem from '~/components/publishing/community/familyCare/FamilyScheduleItem.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

// 각 스케줄 아이템의 확장 상태를 관리
const expandedItems = ref<boolean[]>([false, false])

// 특정 스케줄 아이템의 토글 상태를 변경
const toggleSchedule = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}
</script>

<style scoped lang="scss">
.schduled-date {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2b2b2b;
  padding-top: 2.2rem;
}
.schedule-item-list {
  padding-top: 1.2rem;

  &.no-schedule {
    width: 100%;
    height: 14.2rem;
    background: #f4f4f4;
    border-radius: 1.2rem;
    padding-top: 0;
    &:after {
      content: '아직 일정이 없어요';
      text-align: center;
      display: block;
      font-size: 1.6rem;
      color: #959595;
      padding-top: 3.4rem;
    }
    & + .btn-add-schedule {
      position: absolute;
      bottom: 2rem;
    }
  }
}
</style>
