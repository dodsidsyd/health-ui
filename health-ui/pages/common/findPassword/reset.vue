<template>
  <BaseBody
    :show-back-button="true"
    page-title="비밀번호 재설정"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    class="pb-36"
  >
    <div class="flex flex-col gap-12 mt-24 pb-48">
      <InputText
        type="password"
        :is-valid="false"
        valid-text="비밀번호 벨리데이터 메시지"
        placeholder="새로운 비밀번호를 입력해 주세요.."
      />
      <InputText
        type="password"
        :is-valid="false"
        valid-text="비밀번호 벨리데이터 메시지"
        placeholder="비밀번호를 한번 더 입력해 주세요."
      />
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 이전 </Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky" :disabled="!requiredAgreements">
        비밀번호 재설정
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
