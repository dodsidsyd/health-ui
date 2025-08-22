<template>
  <BaseBody :show-back-button="true" page-title="패밀리 일정 추가">
    <FlexColDiv class="gap-12 mt-20">
      <InputText label="제목*" placeholder="제목을 입력해주세요." />
      <InputCalendar
        label="날짜 시간*"
        :show-time-picker="true"
        :placeholder="'2025.00.00 00:00'"
        :default-hour="9"
        :default-minute="0"
        :minute-step="5"
      />
      <!-- 패밀리 선택 영역 -->
      <FamilySelection />
      <!-- 알림 영역 -->
      <AlarmSetting />
    </FlexColDiv>
    <!-- 하단 고정 영역 -->
    <ButtonGroup v-if="!isFieldsetFocused" class="is-fixed">
      <Button btn-type="primary" element-type="button" class="lg w-full medium btn-sticky"> 등록하기 </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'

import InputText from '~/components/publishing/input/InputText.vue'
import InputCalendar from '~/components/publishing/input/InputCalendar.vue'

import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

import AlarmSetting from '~/components/publishing/community/familyCare/AlarmSetting.vue'
import FamilySelection from '~/components/publishing/community/familyCare/FamilySelection.vue'
</script>
