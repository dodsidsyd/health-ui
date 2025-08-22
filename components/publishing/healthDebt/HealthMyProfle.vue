<template>
  <div class="health-my-profile">
    <div class="tit-wrap">
      <h5 class="tit">내 건강 프로필</h5>
      <button type="button" class="btn-update" @click="showUpdateConfirmModal">업데이트하기</button>
    </div>
    <div class="profile-list-box">
      <ul class="profile-list">
        <li>
          <span>만성질환</span>
          <strong>고지혈증, 고혈압</strong>
        </li>
        <li><span>흡연</span> <strong>해당없음</strong></li>
        <li><span>음주</span> <strong>주 1회 이상</strong></li>
        <li><span>운동</span> <strong>현재 하지 않음</strong></li>
      </ul>
    </div>
    <Teleport to="body">
      <ConfirmModal
        :is-visible="showConfirmModal"
        :html="ConfirmModalContent"
        :confirm-button-text="confirmButtonText"
        :cancel-button-text="cancelButtonText"
        :is-show-cancel-button="isShowCancelButton"
        @cancel="closeConfirmModal"
        @close="closeConfirmModal"
        @confirm="handleToDownloadMydata"
      />
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
const ConfirmModalContent = ref('')
const showConfirmModal = ref(false)
const confirmButtonText = ref('업데이트')
const cancelButtonText = ref('취소')
const isShowCancelButton = ref(true)

const showUpdateConfirmModal = () => {
  ConfirmModalContent.value = `
    <img src="/_nuxt/assets/images/walkingking/ico-warning.svg" alt="알림 이미지" style="margin: 0 auto"/>
    <div class="fz-18 bold mt-6 text-center">업데이트 하시겠습니까?</div>
    <div class="fz-14 mt-6 text-center">건강 프로필을 업데이트하시면<br />레몬지수가 재계산됩니다.</div>`
  isShowCancelButton.value = true
  confirmButtonText.value = '업데이트'
  cancelButtonText.value = '취소'
  showConfirmModal.value = true
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
}

const handleToDownloadMydata = () => {
  closeConfirmModal()
}
</script>
<style lang="scss" scoped>
.health-my-profile {
  .tit-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6rem;
    .tit {
      font-size: 1.8rem;
      font-weight: 700;
      color: #2b2b2b;
    }
    .btn-update {
      background-color: vars.$white;
      border-radius: 1.4rem;
      font-size: 1.2rem;
      font-weight: 500;
      border: 0.1rem solid #e2e2e2;
      padding: 0.6rem 1.2rem;
      display: flex;
      gap: 0.4rem;
      align-items: center;
      position: relative;
      @include mixin.rippleEffectPrimary;
      &::before {
        content: '';
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M12.9481 5.3426C12.0215 3.74293 10.2895 2.66667 8.30586 2.66667C6.05675 2.66667 4.13124 4.05024 3.33622 6.01158M11.3204 6.01158H14V3.33565M3.71858 10.6945C4.64521 12.2941 6.37715 13.3704 8.36081 13.3704C10.6099 13.3704 12.5354 11.9868 13.3304 10.0255M5.34626 10.0255H2.66667V12.7014' stroke='%23555555' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
    }
  }
  .profile-list-box {
    padding: 0.8rem 2rem;
    border-radius: 1.2rem;
    background-color: vars.$white;

    .profile-list {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        padding: 1.6rem 0;
        justify-content: space-between;
        align-items: center;
        gap: 0 0.8rem;
        & + li {
          border-top: 0.1rem solid #eee;
        }
        font-size: 1.6rem;
        span {
          color: #555;
          font-weight: 400;
        }
        strong {
          font-weight: 500;
          color: #2b2b2b;
        }
      }
    }
  }
}
</style>
