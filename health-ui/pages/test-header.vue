<template>
  <BaseBody 
    page-title="헤더 테스트"
    :show-back-button="true"
    :has-setting="true"
    :has-search="true"
    :has-chat="true"
    :has-notification="true"
    :has-reward="true"
    :notification-count="5"
    :chat-count="12"
  >
    <div style="padding: 20px;">
      <h1>헤더 버튼 테스트 페이지</h1>
      <p>헤더에 설정, 검색, 채팅, 알림, 리워드 버튼이 모두 표시되어야 합니다.</p>
      <ul>
        <li>알림 버튼: 5개 카운트 표시</li>
        <li>채팅 버튼: 12개 카운트 표시</li>
        <li>리워드, 설정, 검색 버튼: 카운트 없이 표시</li>
      </ul>
      
      <div style="margin-top: 30px;">
        <button @click="updateCounts">카운트 업데이트 테스트</button>
      </div>
    </div>
  </BaseBody>
</template>

<script setup>
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'

const notificationCount = ref(5)
const chatCount = ref(12)

const updateCounts = () => {
  notificationCount.value = Math.floor(Math.random() * 99) + 1
  chatCount.value = Math.floor(Math.random() * 99) + 1
  console.log('카운트 업데이트:', { notification: notificationCount.value, chat: chatCount.value })
}
</script>
