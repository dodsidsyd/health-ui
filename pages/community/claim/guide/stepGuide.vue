<template>
  <BaseBody
    :page-title="'청구의신 활용비법'"
    :show-back-button="true"
    :has-scrap="true"
    :has-share="true"
    :is-transparent="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
  >
    <section class="step-guide">
      <TitleBox customTitle>
        <template #content>
          <div class="title-img">
            <img src="/_nuxt/assets/images/community/ico-claim-step.svg" alt="" />
          </div>
          <strong class="title">실손청구 단계별 따라하기</strong>
        </template>
      </TitleBox>
      <div class="edit-box">
        <p class="text">{{ text }}</p>
      </div>
    </section>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleBox from '~/components/common/TitleBox.vue'

const text =
  '본문 내용이 표기 됩니다. 본문 내용이 표기 됩니다.본문 내용이 표기 됩니다.본문 내용이 표기 됩니다.본문 내용이 표기 됩니다.'
</script>

<style lang="scss" scoped>
.step-guide {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.title-box {
  justify-content: flex-start;
  margin: 2rem 0 2.4rem;
  gap: 2rem;
  .title {
    flex: 1;
    font-size: 2.2rem;
    line-height: 2.9rem;
  }
}

.title-img {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 1.2rem;
  background-color: #4c7ff7;
  img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
  }
}

.edit-box {
  flex: 1;
}
</style>
