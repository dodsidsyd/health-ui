<template>
  <BaseBody
    :show-back-button="true"
    page-title="프로필설정"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text="true"
    add-text="<span style='color:#555;font-size:1.4rem'>일반회원으로 전환</span>"
    class="pb-36"
  >
    <LineTabs :tabs="tabs" />
    <!-- 승인거절 : decline / 보안요청 : complement / 인증완료 : access -->
    <div class="confirm-status" :class="confirmStatus">
      <i class="icon" :class="confirmStatusIcon" aria-hidden="true"></i>
      <span>{{ confirmStatusText }}</span>
    </div>

    <div class="flex flex-col align-center gap-12 mt-24 pb-48">
      <section class="profile-photo">
        <img :src="profileImageSrc" alt="프로필 사진" />
        <label>
          <input type="file" accept="image/*" @change="handleImageUpload" />
          <i class="icon ico-photo" aria-label="프로필 사진 선택"></i>
        </label>
      </section>

      <section class="btn-radio-box w-full">
        <label for="" class="c-label require" style="font-size: 1.2rem">전문가 유형</label>
        <div class="flex flex-row w-full gap-8">
          <Radio id="rdo1" name="rdo1" checked custom-style="button" aria-label="설계사" class="flex-11" />
          <Radio id="rdo2" name="rdo1" custom-style="button" aria-label="의사" class="flex-11" />
        </div>
        <div class="flex flex-row gap-8 mt-8">
          <Radio id="rdo3" name="rdo1" custom-style="button" aria-label="간호사" class="flex-11" />
          <Radio id="rdo4" name="rdo1" custom-style="button" aria-label="영양사" class="flex-11" />
        </div>
      </section>

      <InputText
        label="타이틀"
        type="text"
        class="require"
        :is-valid="false"
        valid-text="타이틀 벨리데이터 메시지"
        placeholder="10자 이내로 입력해주세요."
      />

      <InputText
        label="한줄소개"
        type="text"
        class="require"
        :is-valid="false"
        valid-text="한줄소개 벨리데이터 메시지"
        placeholder="30자 이내로 입력해주세요."
      />

      <InputText
        label="소속 회사(단체)"
        type="text"
        :is-valid="false"
        valid-text="회사명 벨리데이터 메시지"
        placeholder="현재 소속된 회사명을 입력해주세요."
      />

      <InputText
        label="활동 경력"
        type="text"
        :is-valid="false"
        valid-text="활동 경력 벨리데이터 메시지"
        placeholder="활동 경력 년차를 숫자로 입력해주세요."
      />

      <section class="w-full">
        <label for="" class="c-label require" style="font-size: 1.2rem">활동이력</label>
        <FieldSet
          maxLength="500"
          placeholder="500글자 이내로 입력해주세요

예 : 2018.03 대학교 졸업
       2024.05 보험설계사 활동"
        />
      </section>

      <section class="btn-radio-box w-full">
        <label for="" class="c-label" style="font-size: 1.2rem">상담채널</label>
        <div class="flex flex-row w-full gap-8">
          <Radio id="rdo5" name="rdo2" checked custom-style="button" aria-label="Direct Message" class="flex-11" />
          <Radio id="rdo6" name="rdo2" custom-style="button" aria-label="전화" class="flex-11" />
          <Radio id="rdo7" name="rdo2" custom-style="button" aria-label="문자" class="flex-11" />
        </div>
      </section>
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 취소 </Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky" :disabled="!requiredAgreements">
        다음
      </Button>
    </ButtonGroup>

    <!-- 일반 회원 전환 확인 모달 -->
    <ConfirmModal
      :is-visible="showExpertMemberModal"
      title="일반 회원 전환"
      content="일반 회원으로 전환하시겠습니까?"
      confirm-button-text="전환하기"
      cancel-button-text="취소"
      @confirm="handleExpertMemberConfirm"
      @cancel="closeExpertMemberModal"
      @close="closeExpertMemberModal"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Radio from '~/components/publishing/input/radio.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import defaultProfileImage from '~/assets/images/img-profile.svg'
import FieldSet from '~/components/publishing/input/FieldSet.vue'

import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'

const tabs = ref<Tab[]>([
  { title: '계정정보', to: '/common/setProfile/accountInfoInput' },
  { title: '건강프로필', to: '/common/setProfile/healthInput' },
  { title: '비즈프로필', to: '/common/setProfile/bizProfileInput' } // 비즈프로필 활성화 시
])

// 프로필 이미지 관련 상태
const profileImageSrc = ref(defaultProfileImage)

// 전문가 회원 전환 모달 관련 상태
const showExpertMemberModal = ref(false)

// 승인 상태 관련
const confirmStatus = ref('decline') // 'decline', 'complement', 'access'

// 승인 상태에 따른 아이콘 및 텍스트
const confirmStatusIcon = computed(() => {
  switch (confirmStatus.value) {
    case 'decline':
      return 'ico-decline'
    case 'complement':
      return 'ico-complement'
    case 'access':
      return 'ico-access'
    default:
      return 'ico-decline'
  }
})

const confirmStatusText = computed(() => {
  switch (confirmStatus.value) {
    case 'decline':
      return '승인거절'
    case 'complement':
      return '보안요청'
    case 'access':
      return '인증완료'
    default:
      return '승인거절'
  }
})
// 이미지 업로드 핸들러
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      profileImageSrc.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// 예시: 승인 상태 변경 함수
const changeConfirmStatus = (status: 'decline' | 'complement' | 'access') => {
  confirmStatus.value = status
}

// 전문가 회원 전환 모달 열기
const openExpertMemberModal = () => {
  showExpertMemberModal.value = true
}

// 전문가 회원 전환 모달 닫기
const closeExpertMemberModal = () => {
  showExpertMemberModal.value = false
}

// 전문가 회원 전환 확인 처리
const handleExpertMemberConfirm = () => {
  closeExpertMemberModal()
}

// 레이아웃에서 addTextClick 핸들러 등록
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')

// 컴포넌트 마운트 시 addTextClick 핸들러 등록
onMounted(() => {
  if (setAddTextClickHandler) {
    setAddTextClickHandler(openExpertMemberModal)
  }
})
</script>
<style scoped lang="scss">
.profile-photo {
  width: 8rem;
  height: 8rem;
  position: relative;
  label {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    input {
      opacity: 0;
      width: 100%;
      height: 100%;
    }
    .ico-photo {
      display: inline-block;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 2.8rem;
      height: 2.8rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.8rem;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border: 0.1rem solid #eee;
    border-radius: 50%;
  }
}
.confirm-status {
  display: flex;
  margin: 0 -2rem;
  align-items: center;
  line-height: 4.8rem;
  height: 4.8rem;
  justify-content: center;
  gap: 0 0.4rem;
  &.complement {
    background: #fff9df;
    color: #a18000;
  }
  &.access {
    background: #ddeec2;
    color: #56761f;
  }
  &.decline {
    background: #ffe0e5;
    color: #f14960;
  }
  .icon {
    width: 2rem;
    height: 2rem;
    background-size: 2rem;
    background-position: center;
    background-repeat: no-repeat;
  }
  span {
    font-size: 1.4rem;
    font-weight: 600;
  }
}
</style>
