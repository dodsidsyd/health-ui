<template>
  <div class="post-detail-reaction-wrap">
    <h5 class="reaction-tit">공감 리액션</h5>
    <div class="reaction-list">
      <div class="reaction-box">
        <button type="button" class="reaction-item">
          <span class="icon ico-cheer"></span>
        </button>
        <span class="type">응원</span>
        <span class="count">{{ likeCount }}</span>
      </div>
      <div class="reaction-box">
        <button type="button" class="reaction-item">
          <span class="icon ico-congrats"></span>
        </button>
        <span class="type">축하</span>
        <span class="count">{{ likeCount }}</span>
      </div>
      <div class="reaction-box">
        <button type="button" class="reaction-item">
          <span class="icon ico-thanks"></span>
        </button>
        <span class="type">감사</span>
        <span class="count">{{ likeCount }}</span>
      </div>
      <div class="reaction-box">
        <button type="button" class="reaction-item">
          <span class="icon ico-sadness"></span>
        </button>
        <span class="type">슬픔</span>
        <span class="count">{{ likeCount }}</span>
      </div>
      <div class="reaction-box">
        <button type="button" class="reaction-item">
          <span class="icon ico-comfort"></span>
        </button>
        <span class="type">위로</span>
        <span class="count">{{ likeCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  likeCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 }
})
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
      background-repeat: no-repeat;
    }
  }
}
</style>
