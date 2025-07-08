<template>
  <BaseBody
    :show-back-button="true"
    page-title="회원가입"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    add-text-left="<span style='color:#999;font-size:1.4rem'>계정정보 입력</span>"
    class="pb-36"
  >
    <div class="flex flex-col gap-12 mt-24 pb-48">
      <div class="sub-tit fz-16 bold">계정정보</div>
      <InputText
        label="아이디"
        class="require"
        :is-valid="true"
        valid-text="이미 사용하고 있는 아이디입니다."
        placeholder="아이디를 입력해주세요."
      />
      <InputText
        type="password"
        label="비밀번호"
        class="require"
        :is-valid="false"
        valid-text="잘못된 형식 입니다."
        placeholder="비밀번호를 입력해 주세요."
      />
      <InputText
        type="password"
        label="비밀번호 확인"
        class="require"
        :is-valid="false"
        valid-text="잘못된 형식 입니다."
        placeholder="비밀번호를 한번 더 입력해 주세요.."
      />

      <InputText
        label="닉네임"
        class="require"
        :is-valid="false"
        valid-text="이미 사용하고 있는 아이디입니다."
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
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 이전 </Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky" :disabled="!requiredAgreements">
        다음
      </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

import Radio from '~/components/publishing/input/radio.vue'

import InputText from '~/components/publishing/input/InputText.vue'
import InputMail from '~/components/publishing/input/InputMail.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
</script>
