<template>
  <div class="wrap-hospitals">
    <div class="wrap-body" :class="{ 'is-expanded': isDetailVisible }">
      <div v-if="hasTitle" class="tit">{{ title }}</div>
      <div class="wrap-hospital-list">
        <div v-for="hospital in hospitalList" :key="hospital.name" class="item">
          <img :src="getImageUrl(hospital.logo)" alt="hospital.name" />
          <div class="text">{{ hospital.name }}</div>
        </div>
      </div>
    </div>
    <button class="btn-all" @click="toggleDetail">
      <div class="text">{{ btnText }}</div>
      <i class="icon-arrow-down" :class="{ 'is-rotated': isDetailVisible }"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  hospitalList: {
    type: Array as PropType<{ name: string; logo: string }[]>,
    required: true
  },
  btnText: { type: String, default: '전체보기' },
  hasTitle: { type: Boolean, default: true },
  title: { type: String, default: '자동청구 병원' }
})
const getImageUrl = (logo: string) => {
  return `/_nuxt/assets/images/${logo}`
}

// 아코디언 상태 (초기: 닫힘)
const isDetailVisible = ref(false)

// 아코디언 토글 함수
const toggleDetail = () => {
  isDetailVisible.value = !isDetailVisible.value
}
</script>

<style scoped lang="scss">
.wrap-hospitals {
  margin-top: 3.2rem;
  border-radius: 1.2rem;
  border: 0.1rem solid #e2e2e2;
  .wrap-body {
    max-height: 29.6rem;
    overflow: hidden;
    padding: 2rem;
    &.is-expanded {
      max-height: 100rem;
      overflow: scroll;
      transition: max-height 0.3s ease-in-out;
    }
    .tit {
      margin-left: 0.4rem;
      font-size: 1.4rem;
      font-weight: 700;
    }
    .wrap-hospital-list {
      margin-top: 1.6rem;
      .item {
        @include mixin.flex-container(items-center);
        gap: 1.2rem;
        &:not(:first-child) {
          margin-top: 1.6rem;
        }
      }
      .logo {
        width: 3.2rem;
      }
      .text {
        font-size: 1.4rem;
        font-weight: 500;
      }
    }
  }
  .btn-all {
    border-top: 0.1rem solid #e2e2e2;
    padding: 1.4rem 0;
    width: 100%;
    @include mixin.flex-container(justify-center items-center);
    gap: 0.8rem;
    cursor: pointer;
    .text {
      font-size: 1.4rem;
      font-weight: 500;
      color: #000;
    }
    .icon-arrow-down {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-image: url('/assets/images/insu/icon-arrow-down.svg');
      background-repeat: no-repeat;
      background-size: contain;
      transition: transform 0.3s ease;
      &.is-rotated {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
