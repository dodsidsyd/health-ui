<template>
  <div class="post-detail-reaction-wrap">
    <h5 class="reaction-tit">공감 리액션</h5>
    <div class="reaction-list">
      <div class="reaction-box">
        <button type="button" class="reaction-item" @click="handleReactionClick('ico-cheer', count1)">
          <span class="icon ico-cheer"></span>
        </button>
        <span class="type">응원</span>
        <span class="count">{{ count1 }}</span>
      </div>
      <div class="reaction-box">
        <button type="button" class="reaction-item" @click="handleReactionClick('ico-congrats', count2)">
          <span class="icon ico-congrats"></span>
        </button>
        <span class="type">축하</span>
        <span class="count">{{ count2 }}</span>
      </div>
      <div class="reaction-box">
        <button type="button" class="reaction-item" @click="handleReactionClick('ico-thanks', count3)">
          <span class="icon ico-thanks"></span>
        </button>
        <span class="type">감사</span>
        <span class="count">{{ count3 }}</span>
      </div>
      <div class="reaction-box">
        <button type="button" class="reaction-item" @click="handleReactionClick('ico-sadness', count4)">
          <span class="icon ico-sadness"></span>
        </button>
        <span class="type">슬픔</span>
        <span class="count">{{ count4 }}</span>
      </div>
      <div class="reaction-box">
        <button type="button" class="reaction-item" @click="handleReactionClick('ico-comfort', count5)">
          <span class="icon ico-comfort"></span>
        </button>
        <span class="type">위로</span>
        <span class="count">{{ count5 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const count1 = ref(3)
const count2 = ref(24)
const count3 = ref(104)
const count4 = ref(2)
const count5 = ref(8)
const emits = defineEmits(['reaction-selected'])
const handleReactionClick = (iconClass: string, count: number) => {
  emits('reaction-selected', iconClass, count)
}
</script>

<style scoped lang="scss">
.post-detail-reaction-wrap {
  .reaction-tit {
    margin-bottom: 1.6rem;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.5rem;
  }
}
.reaction-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .reaction-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 500;
    .type {
      margin-top: 1.2rem;
      font-size: 1.4rem;
      line-height: 2rem;
      color: #959595;
    }
    .count {
      margin-top: 0.4rem;
      font-size: 1.6rem;
      line-height: 2.2rem;
    }
  }
  .reaction-item {
    position: relative;
    @include mixin.rippleEffectPrimary;
    .icon {
      display: inline-block;
      width: 4rem;
      height: 4rem;
      background-size: 4rem 4rem;
      background-position: center;
      background-repeat: no-repeat;
      &.ico-sadness {
        background-size: 3.5rem;
      }
    }
  }
}
</style>
