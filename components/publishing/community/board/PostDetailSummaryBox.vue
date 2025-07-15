<template>
  <div class="post-detail-summary-wrap">
    <div class="flex align-center">
      <button type="button" class="reaction-item" @click="handleLikeToggle">
        <span class="icon ico-cheer"></span>
        {{ likeCount }}
      </button>
      <div class="view-count-box">
        조회<span class="view-count">{{ viewCount }}</span>
      </div>
    </div>
    <button type="button" class="btn scrap-btn" @click="handleScrapToggle">스크랩</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps({
  likeCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 }
})

// likeCount를 반응형 변수로 선언
const emits = defineEmits(['update:likeCount', 'scrap-toggled'])

// 좋아요 토글
const handleLikeToggle = () => {
  let newLikeCount: number
  if (props.likeCount % 2 === 0) {
    newLikeCount = props.likeCount + 1
  } else {
    newLikeCount = props.likeCount - 1
  }
  emits('update:likeCount', newLikeCount)
}

const handleScrapToggle = () => {
  emits('scrap-toggled')
}
</script>

<style scoped lang="scss">
.post-detail-summary-wrap {
  display: flex;
  justify-content: space-between;
  .reaction-item,
  .scrap-btn {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 1.2rem;
    padding: 1rem 1.6rem 1rem 1.2rem;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4.8rem;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #555;
    @include mixin.rippleEffectPrimary;
  }
  .view-count-box {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #959595;
    .view-count {
      margin-left: 0.4rem;
    }
  }
  .scrap-btn {
    padding: 1rem 1.6rem;
    &::before {
      content: none;
    }
  }
}
</style>
