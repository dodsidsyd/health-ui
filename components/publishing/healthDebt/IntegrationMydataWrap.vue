<template>
  <div class="integration-manager-wrap">
    <div class="title-box" :class="{ upadted: updated === true }">
      <p class="tit">의료마이데이터</p>
      <p>의료마이데이터는 <span class="emphasis">필수연동 정보</span>입니다.</p>
      <p v-if="updated === true" class="notice-txt">최종 업데이트 2025.03.01</p>
    </div>
    <Button btn-type="primary" element-type="button" :aria-label="buttonText" class="xs" @click="handleButtonClick" />
    <p class="notice-txt">MY병원 찾기에서 선택된 병원 기준으로 개별 마이데이터를 연동합니다.</p>
  </div>
</template>
<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
const emits = defineEmits(['update:is-updated', 'open-modal'])
const updated = ref(false)
// 버튼의 텍스트
const buttonText = ref('연동하기')
const handleButtonClick = () => {
  if (updated.value === false) {
    buttonText.value = '업데이트'
    updated.value = true
    emits('update:is-updated', updated.value)
  } else {
    emits('open-modal')
  }
}
</script>
<style lang="scss" scoped>
.integration-manager-wrap {
  padding: 2rem;
  background: #f4f4f4;
  border-radius: 1.2rem;
  .title-box {
    position: relative;
    margin: 0.2rem 0 3.8rem;
    padding-left: 8rem;
    &.updated {
      margin-bottom: 1.6rem;
    }
    .tit {
      margin-bottom: 0.2rem;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 2.2rem;
    }
    p {
      font-size: 1.4rem;
      line-height: 2rem;
    }
    .emphasis {
      font-weight: 600;
      color: #f14960;
    }
    &:before {
      content: '';
      position: absolute;
      top: -0.4rem;
      left: 0;
      width: 7.2rem;
      height: 7.2rem;
      background: url(~/assets/images/healthDebt/img-mydata.png) center / contain no-repeat;
    }
    .notice-txt {
      text-align: left;
      margin-top: 0.2rem;
      font-size: 1.1rem;
      line-height: 1.5rem;
      color: #959595;
    }
  }
  .notice-txt {
    margin-top: 0.8rem;
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.5rem;
    color: #959595;
  }
}
</style>
