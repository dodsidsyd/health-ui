<template>
  <Teleport to="body">
    <AlertModal
      :is-visible="isShowWishItemModal"
      :html="modalHtmlContent"
      confirm-button-text="확인"
      @close="toggleWishItemModal"
      @confirm="toggleWishItemModal"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AlertModal from '~/components/common/modal/AlertModal.vue'

// AlertModal 상태 관리
const isShowWishItemModal = ref(false)
const toggleWishItemModal = () => {
  isShowWishItemModal.value = !isShowWishItemModal.value
}

// 모달 HTML 컨텐츠
const modalHtmlContent = `
  <div class="walkingKing-modal-info">
    <h3 class="tit">
      걷기왕 대회 참여하기 전에 <br />반드시 알아두세요!
    </h3>
    <ul class="info-list">
      <li>걷기왕 대회 참여를 원활하게 하려면 건강의신 앱의 권한 허용이 필요합니다. (자세한 방법은 Q&A를 참고해 주세요.)</li>
      <li>걷기왕 대회는 부정 참가를 방지하고자 디바이스의 GPS를 통해 위치를 참고하고 있습니다. 건강의신 앱의 GPS 접근 권한을 꼭 확인해 주세요.</li>
      <li>걷기왕 대회의 주요 정보(걸음 수 순위 정보 등)는 앱 갱신을 통해 반영됩니다. 실시간 정보를 원하실 경우 앱을 다시 실행해 주세요. (디바이스 메모리, 배터리 등의 손실을 최소화하기 위한 설정입니다.)</li>
    </ul> 
  </div>
`

// 컴포넌트 마운트 시 모달 표시
onMounted(() => {
  isShowWishItemModal.value = true
})
</script>

<style scoped lang="scss">
:deep(.walkingKing-modal-info) {
  max-width: 30rem;
  .tit {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2b2b2b;
    text-align: center;
    margin-bottom: 2rem;
    margin-top: 0.8rem;
    &::before {
      content: '';
      display: block;
      width: 7.2rem;
      height: 7.2rem;
      margin: 0 auto 0.6rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72' fill='none'%3E%3Ccircle cx='36' cy='36' r='27' fill='%23F1F1F1'/%3E%3Cpath d='M36.0172 48.3749C35.5066 48.3749 35.0626 48.1862 34.6852 47.8088C34.3078 47.4314 34.1191 46.9874 34.1191 46.4768V32.957C34.1191 32.4464 34.3078 32.0024 34.6852 31.625C35.0626 31.2476 35.5066 31.0589 36.0172 31.0589H36.883C37.3936 31.0589 37.8376 31.2476 38.215 31.625C38.5924 32.0024 38.7811 32.4464 38.7811 32.957V46.4768C38.7811 46.9874 38.5924 47.4314 38.215 47.8088C37.8376 48.1862 37.3936 48.3749 36.883 48.3749H36.0172ZM36.0172 27.3959C35.5066 27.3959 35.0626 27.2072 34.6852 26.8298C34.3078 26.4524 34.1191 26.0084 34.1191 25.4978V25.298C34.1191 24.7874 34.3078 24.3434 34.6852 23.966C35.0626 23.5886 35.5066 23.3999 36.0172 23.3999H36.883C37.3936 23.3999 37.8376 23.5886 38.215 23.966C38.5924 24.3434 38.7811 24.7874 38.7811 25.298V25.4978C38.7811 26.0084 38.5924 26.4524 38.215 26.8298C37.8376 27.2072 37.3936 27.3959 36.883 27.3959H36.0172Z' fill='%23AABEE9'/%3E%3C/svg%3E");
    }
  }
  .info-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      position: relative;
      padding-left: 1rem;
      margin-bottom: 0.8rem;
      box-sizing: border-box;
      text-align: left;
      line-height: 1.6;
      font-size: 1.4rem;
      color: #555;

      &::before {
        content: '';
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        background-color: #959595;
        position: absolute;
        left: 0;
        top: 0.6rem;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
