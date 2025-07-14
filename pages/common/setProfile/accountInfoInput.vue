<template>
  <BaseBody
    :show-back-button="true"
    page-title="프로필설정"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text="true"
    add-text="<span style='color:#555;font-size:1.4rem'>전문가회원으로 전환</span>"
    class="pb-36"
  >
    <LineTabs :tabs="tabs" />
    <div class="flex flex-col gap-12 mt-24 pb-48">
      <!-- 프로필 정보 영역 -->
      <div class="profile-box flex flex-row">
        <div class="flex flex-col gap-10">
          <div class="flex gap-8 flex-row">
            <strong class="fz-22 bold">장동건</strong>
            <button type="button" class="btn-modify" aria-label="수정하기">
              <i class="icon ico-modify"></i>
            </button>
          </div>
          <div class="fz-14 medium flex flex-row gap-15 profile-info">
            <span>40세</span>
            <span>남</span>
            <span>010-3455-4844</span>
          </div>
        </div>
        <div class="profile-photo ml-auto">
          <img :src="profileImageSrc" alt="프로필 사진" />
          <label>
            <input type="file" accept="image/*" @change="handleImageUpload" />
            <i class="icon ico-photo" aria-label="프로필 사진 선택"></i>
          </label>
        </div>
      </div>
      <InputText
        label="닉네임"
        :is-valid="false"
        class="require"
        valid-text="이미 사용하고 있는 닉네임입니다."
        placeholder="닉네임을 입력해주세요."
      />

      <InputMail
        label="이메일주소"
        :is-valid="false"
        class="require"
        valid-text="올바른 이메일 주소를 입력해주세요."
        placeholder="이메일을 입력해주세요"
        :custom-domains="[
          { value: 'gmail.com', label: 'gmail.com' },
          { value: 'naver.com', label: 'naver.com' },
          { value: 'daum.net', label: 'daum.net' },
          { value: 'kakao.com', label: 'kakao.com' }
        ]"
      />

      <InputAddress label="지역선택" :is-valid="false" class="require" placeholder="주소를 검색해주세요" />
      <hr class="hr-section ml-n20 mr-n20" />
      <div class="flex flex-col gap-12">
        <div class="flex flex-row align-center">
          <div class="fz-16 bold">비밀번호</div>
          <Button
            btn-type="secondary"
            element-type="button"
            class="xs pl-16 pr-16 w-auto ml-auto"
            @click="togglePasswordChange"
          >
            {{ showPasswordChange ? '변경취소' : '비밀번호 변경' }}
          </Button>
        </div>

        <!-- 비밀번호 변경 버튼 클릭시 노출 -->
        <div v-if="showPasswordChange" class="flex flex-col gap-12">
          <InputText
            label="새로운 비밀번호"
            type="password"
            class="require"
            :is-valid="false"
            valid-text="비밀번호 벨리데이터 메시지"
            placeholder="새로운 비밀번호를 입력해 주세요."
          />
          <InputText
            label="비밀번호 확인"
            type="password"
            class="require"
            :is-valid="false"
            valid-text="비밀번호 벨리데이터 메시지"
            placeholder="비밀번호를 한번 더 입력해 주세요."
          />
        </div>
      </div>
    </div>
    <!-- 비대칭 버튼 레이아웃 asy mmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 이전 </Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky" :disabled="!requiredAgreements">
        다음
      </Button>
    </ButtonGroup>

    <!-- 전문가 회원 전환 확인 모달 -->
    <ConfirmModal
      :is-visible="showExpertMemberModal"
      title="전문가 회원 전환"
      content="전문가 회원으로 전환하시겠습니까?"
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
import InputMail from '~/components/publishing/input/InputMail.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'

import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import defaultProfileImage from '~/assets/images/img-profile.svg'

import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'

const activeLineTab = ref('accountInfo')
const activeLineTabIndex = ref(0)

const tabs = ref<Tab[]>([
  { title: '계정정보', to: '/common/setProfile/accountInfoInput' },
  { title: '건강프로필', to: '/common/setProfile/healthInput' },
  { title: '비즈프로필', to: '/common/setProfile/bizProfileInput' } // 비즈프로필 활성화 시
])

// 프로필 이미지 관련 상태
const profileImageSrc = ref(defaultProfileImage)

// 전문가 회원 전환 모달 관련 상태
const showExpertMemberModal = ref(false)

// 비밀번호 변경 섹션 표시 상태
const showPasswordChange = ref(false)

// 탭 클릭 핸들러
const handleTabClick = (index: number) => {
  activeLineTabIndex.value = index
  //todo: 페이지이동 (FE개발자가 처리)
}

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

// 비밀번호 변경 섹션 토글 함수
const togglePasswordChange = () => {
  showPasswordChange.value = !showPasswordChange.value
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

<style lang="scss">
.profile-box {
  .profile-info {
    span {
      position: relative;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: -0.9rem;
        top: 50%;
        margin-top: -0.2rem;
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        background: #959595;
      }
      &:first-child {
        &::before {
          content: none;
        }
      }
    }
  }
  .btn-modify {
    width: 2.8rem;
    height: 2.8rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 50%;
    background-color: #f4f4f4;
    .icon {
      display: inline-block;
      width: 2.8rem;
      height: 2.8rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1.4rem;
    }
  }
  .profile-photo {
    width: 8rem;
    height: 8rem;
    position: relative;
    border-radius: 50%;

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
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>
