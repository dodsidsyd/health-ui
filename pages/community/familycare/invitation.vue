<template>
  <BaseBody :show-back-button="true" page-title="초대장">
    <InvitationCard
      :inviter-name="inviterName"
      :family-name="familyName"
      :is-mobile="isMobile"
      :is-app-store="isAppStore"
      @join="handleJoin"
      @app-store="handleAppStore"
    />
    <ButtonGroup v-if="!isMobile" class="is-fixed">
      <Button aria-label="참가하기" class="btn-join w-full medium btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InvitationCard from '~/components/publishing/community/familyCare/InvitationCard.vue'

const inviterName = ref('김레몬')
const familyName = ref('동네사람들')
// 모바일 경우
const isMobile = ref(true)
// 앱이 없는경우
const isAppStore = ref(true)

const handleJoin = () => {
  // 참가하기 로직
  console.log('참가하기 클릭')
}

const handleAppStore = () => {
  // APP Store 가입하기 로직
  console.log('APP Store 가입하기 클릭')
}
</script>
<style lang="scss" scoped></style>
