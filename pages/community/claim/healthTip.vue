<template>
  <BaseBody
    :page-title="'건강꿀팁'"
    :show-back-button="true"
    :has-scrap="true"
    :has-share="true"
    :is-transparent="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
  >
    <section class="health-tip">
      <TitleBox customTitle>
        <template #content>
          <strong class="title">{{ title }}</strong>
        </template>
      </TitleBox>
      <div class="edit-box">
        <p class="text">{{ text }}</p>
      </div>
    </section>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" aria-label="확인" class="lg w-full medium btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import TitleBox from '~/components/common/TitleBox.vue'

const title = '1형 당뇨 합병증 검사 언제 받아야 할까?제목 2줄1형 당뇨 합병증 검사 언제 받아야 할까?제목 2줄'
const text =
  '본문 내용이 표기 됩니다. 본문 내용이 표기 됩니다.본문 내용이 표기 됩니다.본문 내용이 표기 됩니다.본문 내용이 표기 됩니다.'
</script>

<style lang="scss" scoped>
.health-tip {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.title-box {
  margin: 2rem 0 2.4rem;
  .title {
    font-size: 2.2rem;
  }
}
.edit-box {
  flex: 1;
}
</style>
