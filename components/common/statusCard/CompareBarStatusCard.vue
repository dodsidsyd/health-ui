<template>
  <div class="status-card">
    <div class="flex flex-row">
      <div class="flex flex-col gap-8">
        <p class="tit">{{ title }}</p>
        <strong class="data-text">{{ mainData }}</strong>
      </div>
      <i :class="['icon', cardType]" aria-label="hidden"></i>
    </div>
    <div class="flex flex-row space-between">
      <div class="flex flex-col">
        <p class="txt">{{ subTitle }}</p>
        <strong class="sub-data-text">{{ subData }}</strong>
      </div>
      <i :class="['emoji', emojiType]" aria-label="hidden"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props 타입 정의
interface Props {
  title: string
  subTitle: string
  mainData: string
  subData: string
  cardType: string
  emojiType: string
}

// Props 기본값 설정
const props = withDefaults(defineProps<Props>(), {
  title: '',
  subTitle: '',
  mainData: '',
  cardType: '',
  emojiType: '',
  subData: ''
})
</script>

<style lang="scss" scoped>
.status-card {
  overflow: hidden;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  padding-bottom: 3.2rem;
  height: 18.8rem;
  justify-content: space-between;

  .flex-row {
    justify-content: space-between;
  }

  .tit {
    font-weight: 500;
    color: #555;
  }

  .data-text {
    font-size: 2rem;
    line-height: 2.6rem;
    color: #2b2b2b;
  }

  .icon {
    display: block;
    width: 2rem;
    height: 2rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
}
</style>
