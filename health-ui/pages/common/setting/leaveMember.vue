<template>
  <BaseBody :show-back-button="true" page-title="회원탈퇴">
    <div class="flex flex-col h-full">
      <h1 class="mt-24 mb-22 fz-24">건강의신을 탈퇴하려는 이유를 선택해주세요</h1>
      <ul>
        <li>
          <Radio
            id="rdo01"
            name="leaveType"
            custom-style="button"
            aria-label="다른 건강관리앱 사용중"
            icon="ico-empty"
            icon-type="check"
            v-model="rdoSelected"
            value="rdo01"
          />
        </li>
        <li>
          <Radio
            id="rdo02"
            name="leaveType"
            custom-style="button"
            aria-label="이용중인 병원이 연동안됨"
            icon="ico-empty"
            icon-type="check"
            v-model="rdoSelected"
            value="rdo02"
          />
        </li>
        <li>
          <Radio
            id="rdo03"
            name="leaveType"
            custom-style="button"
            aria-label="서비스콘텐츠가 부족"
            icon="ico-empty"
            icon-type="check"
            v-model="rdoSelected"
            value="rdo03"
          />
        </li>
        <li>
          <Radio
            id="rdo04"
            name="leaveType"
            custom-style="button"
            aria-label="앱 사용이 불편"
            icon="ico-empty"
            icon-type="check"
            v-model="rdoSelected"
            value="rdo04"
          />
        </li>
        <li>
          <Radio
            id="rdoEtc"
            name="leaveType"
            custom-style="button"
            aria-label="기타"
            icon="ico-empty"
            icon-type="check"
            v-model="rdoSelected"
            value="etc"
          />
          <div v-if="rdoSelected === 'etc'" class="mt-12">
            <InputText placeholder="탈퇴사유를 직접 입력해주세요." />
          </div>
        </li>
      </ul>
      <ButtonGroup class="is-fixed">
        <Button btn-type="secondary" element-type="button" aria-label="취소" class="lg btn-sticky" />
        <Button
          btn-type="primary"
          element-type="button"
          aria-label="탈퇴하기"
          class="lg btn-sticky"
          @click="clickBottomModal"
        />
      </ButtonGroup>
      <BottomModal
        :is-visible="isShowBottomModal"
        v-bind="bottomModalProps"
        @cancel="clickCancel"
        @confirm="clickConfirmModal"
        @close="toggleBottomModal"
      >
        <template #content>
          <div class="leave-box">
            <strong class="leave-infotitle">회원 탈퇴하시면 모든 개인 데이터는 완전히 삭제됩니다.</strong>
            <ul class="leave-info">
              <li>보유한 포인트는 탈퇴즉시 소멸되며, 복구가 불가능합니다.</li>
              <li>개인데이터와 건강 통계 등의 데이터 모두 삭제됩니다.</li>
              <li>실손청구된 진료건별 처방전, 영수증, 세부내역서 모두 삭제됩니다.</li>
              <li>그매 결제 후 보관함에 저장된 병원 서류들 모두 삭제됩니다.</li>
              <li>(주)헥토 데이터와 연동된 정보가 모두 삭제됩니다.</li>
            </ul>
          </div>
          <div class="leave-check ml-n20 mr-n20">
            <Checkbox id="checkBox" aria-label="상기 내용을 확인하였으며, 회원탈퇴를 진행합니다." />
          </div>
        </template>
      </BottomModal>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

import InputText from '~/components/publishing/input/InputText.vue'
import Radio from '~/components/publishing/input/radio.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

import { ConfirmModal, BottomModal } from '@lemonhc/fo-ui/components/modal'

const rdoSelected = ref()

const isShowBottomModal = ref(false)

const bottomModalProps = ref({
  title: '회원탈퇴 안내',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '탈퇴하기',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const clickBottomModal = () => {
  toggleBottomModal()
}
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickConfirmModal = async () => {
  const modalContent = `
    <div style="display: flex; flex-direction: column; gap: 1rem; text-align: center">
      <div>
        <i class="ri-information-line"></i>
      </div>
      <div style="font-weight: bold">건강의신 서비스 회원탈퇴를 진행하시겠습니까?</div>
    </div>`

  const confirmRes = await ConfirmModal.open({
    isVisible: true,
    html: modalContent,
    confirmButtonText: '확인'
  })
}
</script>
<style lang="scss" scoped>
.leave-infotitle {
  display: block;
  text-align: left;
  margin-bottom: 1.2rem;
  font-weight: vars.$medium;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  &.leave-info {
    li {
      position: relative;
      padding-left: 0.9rem;
      font-size: var(--num-14);
      text-align: left;
      color: #555;
      &:before {
        display: block;
        content: '';
        position: absolute;
        top: 0.9rem;
        left: 0;
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        background: #959595;
      }
    }
  }
}
.leave-check {
  border-top: 1px solid #eee;
  padding-top: 2rem;
  margin-top: 1.6rem;
}
.c-checktype {
  width: 100%;
  padding: 0 2rem;
  .c-label {
    align-items: left;
    &.after {
      flex: 1;
      text-align: left;
    }
  }
}
::v-deep(.c-radiotype) {
  width: 100%;
  .c-label {
    flex: 1;
  }
  &.button {
    .c-label {
      &:before {
        text-align: left;
      }
    }
  }
}
</style>
