<template>
  <BaseBody page-title="챌린지 참가하기" :show-back-button="true">
    <FlexColDiv class="gap-12">
      <InputText v-model="challengeName" label="챌린지명*" :disabled="true" />
      <InputText v-model="challengeType" label="참가방식*" :disabled="true" />
      <!-- 08-04 중복확인 추가 -->
      <InputText v-model="teamName" label="팀명*" inp-type="hasBtn" />
      <InputText v-model="introduceTeam" label="팀소개*" />
      <!-- 08-04 대표 이미지 수정 -->
      <FlexColDiv class="gap-6">
        <InputLabelText label="대표이미지" />
        <SelectThumbnail />
      </FlexColDiv>
    </FlexColDiv>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="secondary" element-type="button" :aria-label="'취소'" class="lg btn-sticky" />
    <Button btn-type="primary" element-type="button" :aria-label="'변경하기'" class="lg btn-sticky" />
  </ButtonGroup>

  <BottomToastSlot v-model="showToast" type="success" :duration="3000">
    <p>참가신청이 완료되었습니다.</p></BottomToastSlot
  >
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from '~/components/publishing/input/InputText.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import SelectThumbnail from '~/components/publishing/walkking/SelectThumbnail.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BottomToastSlot from '~/components/common/bottomToastSlot.vue'
// 챌린지명
const challengeName = ref('프리썸머 챌린지')
// 참가방식
const challengeType = ref('유료참가')
// 팀명
const teamName = ref('우리는하나')
// 팀소개
const introduceTeam = ref('충남고교 합창단')

const showToast = ref(false) // 토스트 표시 상태
</script>

<style scoped lang="scss"></style>
