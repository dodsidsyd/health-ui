<template>
  <BaseBody :show-back-button="true" page-title="출석체크" logo-type="text">
    <AttendanceTitle />
    <AttendanceStatus />
    <AttendanceSteps />
    <!-- 출석체크 버튼 추가 (기획서와 디자인이 달라 확인후 작업) -->
    <AttendanceCheck />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

import AttendanceTitle from '~/components/publishing/benefit/attendance/AttendanceTitle.vue'
import AttendanceStatus from '~/components/publishing/benefit/attendance/AttendanceStatus.vue'
// 출석체크 리스트 컴포넌트
import AttendanceSteps from '~/components/publishing/benefit/attendance/AttendanceSteps.vue'

import AttendanceCheck from '~/components/publishing/benefit/attendance/AttendanceCheck.vue'
</script>

<style scoped lang="scss"></style>
