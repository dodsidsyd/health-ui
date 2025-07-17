<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <!-- ToDo: 로딩중 -->
    <div class="mt-24">
      <h1 class="c-tit">
        <span class="text">
          진단서 사본 서류를 첨부해 주세요
        </span>
      </h1>
    </div>
    <FlexSection>
      <div class="wrap-attach-desc">
        <div class="attach-item">
          <img class="img-attach" src="/assets/images/insu/icon-attach01.svg" alt="서류 글씨가 잘 보이도록 촬영" />
          <span class="text">서류 글씨가<br />잘 보이도록 촬영</span>
        </div>
        <div class="attach-item">
          <img class="img-attach" src="/assets/images/insu/icon-attach02.svg" alt="최대 15장까지 서류첨부가 가능" />
          <span class="text">최대 15장까지<br />서류첨부가 가능</span>
        </div>
      </div>
      <!-- 서류첨부 버튼 -->
      <label class="btn-attach" for="file-upload">
        <input id="file-upload" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
        <img src="/assets/images/insu/icon-attach.svg" alt="첨부파일" />
        <span class="text">첨부서류</span>
      </label>
      <div class="wrap-attached-file">
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
      </div>
    </FlexSection>
    
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="다음" class="lg w-full medium btn-sticky" :disabled="hasSelectedHospitals" @click="clickBottomModal" />
    </ButtonGroup>
  </BaseBody>
  <BottomModal
    :is-visible="isShowBottomModal"
    v-bind="bottomModalProps"
    @cancel="clickCancel"
    @confirm="clickConfirm"
    @close="toggleBottomModal"
  >
    <template #content>
      <div class="wrap-radio-btn">
        <RadioImg id="rdo1" name="rdo1" checked custom-style="button has-icon" text="카메라 촬영" :icon-src="iconCamera" icon-alt="아이콘:카메라 촬영" />
        <RadioImg id="rdo2" name="rdo1" custom-style="button has-icon" text="앨범에서 선택" :icon-src="iconAlbum" icon-alt="아이콘:앨범에서 선택" />
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { ref } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import RadioImg from '~/components/publishing/input/radioImg.vue'
import iconCamera from '~/assets/images/insu/icon-camera.svg'
import iconAlbum from '~/assets/images/insu/icon-album.svg'

const isShowBottomModal = ref(false)
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}
const clickCancel = () => {
  console.log('모달 취소')
}
const bottomModalProps = ref({
  title: '서류 첨부 방식을 선택해 주세요.',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
</script>

<style scoped lang="scss">
.wrap-attach-desc {
  margin: 3.2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .attach-item {
    // border: 1px solid red;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    &:first-child {
      padding-right: 1.6rem;
    }
    &:not(:first-child) {
      border-left: 0.1rem solid #EEEEEE;
      padding-left: 1.6rem;
    }
    .img-attach {
      width: 3.6rem;
      height: auto;
    }
    .text {
      font-size: 1.4rem;
      font-weight: 500;
      text-align: center;
    }
  }
}
.btn-attach {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding: 1.8rem;
  border-radius: 0.8rem;
  background-color:#F9F9F9;
  border: 0.1rem dashed var(--Semantic-Border-BRD-01, #E2E2E2);
  [type='file'] {
    display: none;
  }
}
.wrap-attached-file {
  margin-top: 0.8rem;
  padding: 2rem;
  background-color: #F4F4F4;
  border-radius: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.1rem;
  .btn-delete-attached {
    flex: 0 0 9.7rem;
    position: relative;
    border-radius: 0.8rem;
    border: 0.1rem solid #E2E2E2;
    width: 9.7rem;
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &::after {
      content: '';
      width: 1.8rem;
      height: 1.8rem;
      position: absolute;
      top: 0.9rem;
      right: 0.9rem;
      background: url('/assets/images/insu/icon-delete-circle.svg') center center no-repeat;
      background-size: 100%;
    }
  }
}
.wrap-radio-btn {
  margin-top: 1.6rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
}
</style>
