<template>
  <BaseBody :show-back-button="true" page-title="Direct Message" logo-type="text">
    <DmListWrap>
      <DmItem @click="openDmModal" />
      <DmItem @click="openDmModal" />
      <DmItem @click="openDmModal" />
      <DmItem @click="openDmModal" />
      <DmItem @click="openDmModal" />
      <DmItem @click="openDmModal" />
      <DmItem @click="openDmModal" />
      <DmItem @click="openDmModal" />
    </DmListWrap>

    <DmModal 
      :is-visible="showDmModal" 
      :is-show-cancel-button="true"
      :is-show-confirm-button="true"
      cancel-button-text="취소"
      confirm-button-text="전송"
      @close="closeDmModal" 
      @confirm="handleConfirm"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'

import DmListWrap from '~/components/publishing/DM/DmListWrap.vue'
import DmItem from '~/components/publishing/DM/DmItem.vue'

import DmModal from '~/components/publishing/DM/DmModal.vue'

// DM 모달 상태 관리
const showDmModal = ref(false)

// DM 모달 열기
const openDmModal = () => {
  showDmModal.value = true
}

// DM 모달 닫기
const closeDmModal = () => {
  showDmModal.value = false
}

// DM 메시지 전송
const handleConfirm = () => {
  // 여기에 메시지 전송 로직 추가
  console.log('DM 메시지 전송')
  showDmModal.value = false
}
</script>

<style scoped lang="scss"></style>
