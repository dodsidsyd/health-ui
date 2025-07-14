<template>
  <div class="title-header-wrap">
    <span class="board-name">{{ board }}</span>
    <h3 class="title">{{ title }}</h3>
    <div class="profile-box">
      <div class="profile-detail">
        <img :src="fullImagePath" alt="프로필 이미지" />
        <div>
          <p class="nickname">
            {{ nickname }}<span class="level">Lv.{{ level }}</span>
          </p>
          <span class="upload-time">{{ time }}시간 전</span>
        </div>
      </div>
      <div class="follow-btn"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})

const props = defineProps({
  src: { type: String, default: 'img-profile.svg' },
  title: { type: String, default: '게시글 타이틀' },
  board: { type: String, default: '게시판명' },
  nickname: { type: String, default: '' },
  level: { type: Number, default: 0 },
  time: { type: Number, default: 1 }
})
</script>

<style scoped lang="scss">
.title-header-wrap {
  display: flex;
  flex-direction: column;
  .board-name {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
    color: #777f92;
  }
  .title {
    margin: 1.2rem 0 1.8rem;
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 2.9rem;
  }
  .profile-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .profile-detail {
      display: flex;
      align-items: center;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        margin-right: 1.2rem;
      }
      p {
        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 500;
        .nickname {
          font-weight: 600;
          margin-right: 0.2rem;
        }
        .level {
          color: #959595;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
