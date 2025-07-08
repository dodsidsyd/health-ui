<template>
  <BaseBody
    :show-back-button="true"
    page-title="비밀번호 재설정"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    class="h100vh mt-n56 mb-n20"
  >
    <div class="flex flex-col h-full text-center justify-center align-center">
      <div class="flex flex-col gap-8 align-center mb-16">
        <i class="img-wrap"><img src="../../../assets/images/icon-warning.svg" alt="" /></i>
        <div class="fz-24 bold lineH-130">시스템 점검 안내</div>

        <div class="fz-16 regular lineH-140">
          보다 나은 서비스제공을 위해<br />
          시스템 점검을 진행할 예정입니다.
        </div>

        <!-- <div class="fz-24 bold lineH-130">
          알 수 없는<br />
          오류가 발생했습니다.
        </div>
        <div class="fz-16 regular lineH-140">잠시 후에 다시 시도해주세요.</div>
        <NuxtLink to="" class="link-fresh fz-16 medium mt-24"><i class="icon ico-refresh"></i>다시 시도</NuxtLink> -->
      </div>
      <div class="gray-box">
        <div class="fz-14 medium">점검 시간</div>
        <div class="fz-16 medium">7월 10일(목) ~ 7월 11일(금) 16:00 ~ 18:00</div>
      </div>
    </div>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="확인" class="lg w-full medium btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import { useHeader } from '~/composables/useHeader'

import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

// 헤더 설정
const { setShowHeader } = useHeader()

// 페이지 로드 시 헤더 숨기기
onMounted(() => {
  setShowHeader(false)
})
</script>
<style scoped lang="scss">
.img-wrap {
  width: 12.8rem;
  img {
    width: 100%;
  }
}
.gray-box {
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-radius: 1.2rem;
  padding: 1.6rem 2rem;
}
.link-fresh {
  color: vars.$blue-primary;
  display: inline-flex;
  align-content: center;
  justify-content: center;
  vertical-align: middle;
  gap: 0.3rem;
  .icon {
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 2.4rem;
    position: relative;
    top: -0.2rem;
  }
}
</style>
