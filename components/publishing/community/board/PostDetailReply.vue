<template>
  <div class="comment-wrap">
    <div class="profile-box">
      <div class="profile-detail">
        <img :src="fullImagePath" alt="프로필 이미지" />
        <div class="flex column">
          <p class="nickname">
            {{ nickname }}<span class="level">Lv.{{ level }}</span>
            <span v-if="author" class="author-badge">작성자</span>
          </p>
          <span class="upload-time">{{ time }}시간 전</span>
        </div>
      </div>
      <button type="button" class="see-more-btn" @click="author ? emit('seeMoreSelf') : emit('seeMoreOther')">
        <span class="icon ico-menu">메뉴 아이콘</span>
      </button>
    </div>
    <div class="comment-detail">
      {{ comment }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})

const props = defineProps({
  src: { type: String, default: 'img-profile.svg' },
  nickname: { type: String, default: '' },
  level: { type: Number, default: 0 },
  time: { type: Number, default: 1 },
  author: { type: Boolean, default: false },
  comment: {
    type: String,
    default: '댓글내용이 들어갑니다. 댓글내용이 들어갑니다. 댓글내용이 들어갑니다. 댓글내용이 들어갑니다.'
  }
})
const emit = defineEmits(['seeMoreSelf', 'seeMoreOther'])
</script>

<style scoped lang="scss">
.comment-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  margin-left: 5.2rem;
}
.profile-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2.4rem;
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
      margin-bottom: 0.4rem;
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: 600;
      color: #555;
      .level {
        margin-left: 0.4rem;
        color: #959595;
        font-weight: 500;
      }
    }
    .upload-time {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2rem;
      color: #959595;
    }
  }
}
.author-badge {
  display: inline-block;
  height: 1.8rem;
  margin-left: 0.6rem;
  padding: 0.1rem 0.4rem;
  background: #eee;
  border-radius: 0.4rem;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.8rem;
  color: #555;
}
.see-more-btn {
  position: relative;
  @include mixin.rippleEffectPrimary;
  span {
    display: block;
    width: 2rem;
    height: 2rem;
    font-size: 0;
    background-size: 2rem 2rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cellipse cx='10.416' cy='4.58325' rx='1.25' ry='1.25' fill='%23959595'/%3E%3Ccircle cx='10.416' cy='10.4167' r='1.25' fill='%23959595'/%3E%3Ccircle cx='10.416' cy='16.25' r='1.25' fill='%23959595'/%3E%3C/svg%3E");
  }
}
.comment-detail {
  margin-left: 5.2rem;
}
.reply-box {
  margin-left: 5.2rem;
  .reply-btn {
    position: relative;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #959595;
    @include mixin.rippleEffectPrimary;
  }
}
</style>
