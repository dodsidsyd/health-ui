<template>
  <BaseBody page-title="챌린지 참가하기" :show-back-button="true">
    <FlexColDiv class="gap-12">
      <InputText v-model="challengeName" label="챌린지명*" :disabled="true" />
      <InputText v-model="challengeType" label="참가방식*" :disabled="true" />
      <InputText v-model="teamName" label="팀명*" />
      <InputText v-model="introduceTeam" label="팀소개*" />
      <TeamProfileImage :modify="true" />
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
import TeamProfileImage from '~/components/publishing/walkking/TeamProfileImage.vue'
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
