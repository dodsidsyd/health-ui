<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="flex flex-col gap-16 mt-24">
      <h1 class="c-tit">
        <span class="text">사고(상해)가 일어난<br />주소를 입력해 주세요</span>
      </h1>
    </div>
    <div class="flex flex-col mt-32">
      <InputAddress label="주소" :is-valid="false" class="require" placeholder="주소를 검색해주세요" />
      <div class="input-tit">사고(내원) 내용</div>
      <InputText placeholder="(예) 감기몸살, 장염, 골절" value="골절" />
      <div class="input-tit">사고(진료) 일자</div>
      <InputCalendar />
      <div class="input-tit">사고 유형</div>
      <Select
        class="require"
        modal-title="사고 유형"
        :is-show-cancel-button="false"
        :custom-opts="[
          { value: '질병', label: '질병' },
          { value: '일반상해', label: '일반상해' },
          { value: '교통사고', label: '교통사고' },
        ]"
      />
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="확인"
      class="lg w-full medium btn-sticky"
    >
      다음
    </Button>
  </ButtonGroup>

  
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Select from '~/components/publishing/input/Select.vue'
import InputCalendar from '~/components/publishing/input/InputCalendar.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
</script>

<style scoped lang="scss">
.input-tit {
  margin: 1.2rem 0 0.6rem;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.3;
  color: #555555;
  position: relative;
  &::after {
    content: "*";
    font-size: 1.2rem;
    display: inline-block;
    margin-left: 0.3rem;
    color: #f14960;
  }
}
</style>
