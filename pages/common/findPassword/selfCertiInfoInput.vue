<template>
  <BaseBody
    :show-back-button="true"
    page-title="비밀번호 재설정"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    add-text-left="<span style='color:#555;font-size:1.4rem'>본인인증</span>"
    class="pb-36"
  >
    <div class="flex flex-col gap-12 mt-24 pb-48">
      <InputText label="이름" :is-valid="false" valid-text="잘못된 형식 입니다." placeholder="이름을 입력해주세요." />
      <InputText
        type="number"
        label="생년월일"
        max-length="6"
        :is-valid="false"
        valid-text="잘못된 형식 입니다."
        placeholder="생년월일(800101)"
      />

      <div class="gender-box">
        <label for="" class="c-label" style="font-size: 1.2rem">성별</label>
        <div class="flex flex-row gap-8 flex-11">
          <Radio id="rdo1" name="rdo6" custom-style="button" aria-label="남자" class="flex-11" />
          <Radio id="rdo2" name="rdo6" checked custom-style="button" aria-label="여자" class="flex-11" />
        </div>
      </div>

      <InputPhone
        label="휴대폰 번호"
        :custom-opts="[
          { value: 'KT', label: 'KT' },
          { value: 'SKT', label: 'SKT' },
          { value: 'LG U+', label: 'LG U+' }
        ]"
      />

      <InputTimer label="인증번호 입력" />
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
import InputPhone from '~/components/publishing/input/InputPhone.vue'
import InputTimer from '~/components/publishing/input/InputTimer.vue'
</script>
