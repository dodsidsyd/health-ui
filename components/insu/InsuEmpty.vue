<template>
  <div class="wrap-empty">
    <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
    <div>
      <div class="tit" v-html="title"></div>
      <div class="sub-tit" v-html="subTitle"></div>
    </div>
    <Button
      v-if="button"
      btn-type="line"
      element-type="a"
      :href="href"
      aria-label="제휴병원 다시 찾기"
      class="xs w-auto"
    />
  </div>
</template>
<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps({
  title: { type: String, default: '' },
  subTitle: { type: String, default: '' },
  href: { type: String, default: '#' },
  button: { type: Boolean, default: false }
})
</script>

<style lang="scss" scoped>
.wrap-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 0 2rem;
  min-height: 30rem;
  .img {
    width: 6rem;
    height: 6rem;
  }
  .tit {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.5rem;
    color: #555;
    text-align: center;
  }
  .sub-tit {
    margin-top: 0.8rem;
    font-size: 1.6rem;
    line-height: 2.2rem;
    color: #555;
    text-align: center;
  }
  .c-btn {
    &.btn-line {
      padding: 0.7rem 1.4rem;
      :deep(.text) {
        display: inline-block;
        padding: 0;
        color: #555;
        font-size: 1.4rem;
        line-height: 2rem;
      }
    }
  }
}
</style>
