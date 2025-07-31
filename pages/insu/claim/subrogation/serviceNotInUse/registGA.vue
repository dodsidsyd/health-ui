<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구 안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="flex flex-col gap-16 mt-24">
      <h1 class="c-tit">
        <span class="text">등록 요청할 GA이름과<br />주소를 입력해 주세요</span>
      </h1>
    </div>
    <div class="flex flex-col mt-32">
      <div class="input-tit required">GA 이름</div>
      <InputText placeholder="GA 이름을 입력해주세요" />
      <InputAddress label="주소" :is-valid="false" class="require address" placeholder="주소를 검색해주세요" />
      
      
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="GA등록 요청하기"
      class="lg w-full medium btn-sticky"
      @click="clickConfirmModal"
    >
      GA등록 요청하기
    </Button>
  </ButtonGroup>
  <ConfirmModal
    :is-visible="isShowConfirmModal"
    title="안내"
    :html="confirmModalContent"
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    :is-show-footer="false"
    @close="isShowConfirmModal = false"
  />  
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'

const isShowConfirmModal = ref(false)
const confirmModalContent = ref('')
const clickConfirmModal = async () => {
  confirmModalContent.value = `
    <div style="display: flex; flex-direction: column; text-align: center">
      <div>
        <i class="ri-information-line"></i>
      </div>
      <div style="font-weight: 400;font-size: var(--num-16);text-align: left;color: #555555;margin-top:0.8rem;">보험설계사용 서비스에 가입하시겠어요?</div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:0.8rem;">
        <button type="button" class="c-btn btn-primary" style="height: 4.8rem; background-color: rgb(76, 127, 247); border-radius: 0.6rem; font-size: 1.6rem; font-weight: bold; display: inline-flex; justify-content: center; align-items: center; width: 100%; line-height: 1.5; color: white; border: none; cursor: pointer; margin-top: 2rem;">
          <span class="text">가입하기</span>
        </button>
      </div>
    </div>`
  
  isShowConfirmModal.value = true
}
</script>

<style scoped lang="scss">
.input-tit {
  margin: 1.2rem 0 0.6rem;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.3;
  color: #555555;
  position: relative;
  &.required::after {
    content: "*";
    font-size: 1.2rem;
    display: inline-block;
    margin-left: 0.3rem;
    color: #f14960;
  }
}
.address {
  margin-top: 1.2rem;
}
</style>
