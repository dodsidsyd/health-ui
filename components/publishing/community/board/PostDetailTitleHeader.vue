<template>
  <div class="title-header-wrap">
    <span class="board-name">{{ board }}</span>
    <h3 class="title">{{ title }}</h3>
    <div class="profile-box">
      <div class="profile-detail">
        <img :src="fullImagePath" alt="프로필 이미지" />
        <div class="flex column">
          <p class="nickname">
            {{ nickname }}<span class="level">Lv.{{ level }}</span>
          </p>
          <span class="upload-time">{{ time }}시간 전</span>
        </div>
      </div>
      <button v-if="isFollowing" type="button" class="btn flowing-btn" @click="handleFollowToggle">팔로잉</button>
      <button v-else type="button" class="btn flow-btn" @click="handleFollowToggle">팔로우</button>
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
  time: { type: Number, default: 1 },
  isFollowingInitial: { type: Boolean, default: false }
})
// 팔로우 상태 관리
const isFollowing = ref(props.isFollowingInitial)
// 팔로우 토글
const handleFollowToggle = () => {
  isFollowing.value = !isFollowing.value
}
</script>

<style scoped lang="scss">
.title-header-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -2rem;
    right: -2rem;
    height: 0.1rem;
    background-color: #e2e2e2;
  }
  .board-name {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
    color: #777f92;
  }
  .title {
    margin-top: 1.2rem;
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 2.9rem;
  }
  .profile-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem 0;
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
        font-weight: 500;
        .nickname {
          font-weight: 600;
        }
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
}
.flowing-btn {
  background-color: #4f5561;
  color: vars.$white;
  font-size: 1.2rem;
  display: inline-flex;
  width: 7.5rem;
  line-height: 2.8rem;
  border-radius: 2rem;
  text-align: center;
  justify-content: center;
  position: relative;
  align-items: center;
  @include mixin.rippleEffectWhite;
  &::before {
    content: '';
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.4rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M1.1001 14.3996C1.10007 14.6757 1.3239 14.8996 1.60004 14.8996C1.87618 14.8996 2.10007 14.6758 2.1001 14.3997L1.1001 14.3996ZM1.60037 11.9993L2.10037 11.9994L1.60037 11.9993ZM8.4001 10.0996C8.67624 10.0996 8.9001 9.87575 8.9001 9.59961C8.9001 9.32347 8.67624 9.09961 8.4001 9.09961V10.0996ZM14.4001 10.8996C14.6762 10.8996 14.9001 10.6758 14.9001 10.3996C14.9001 10.1235 14.6762 9.89961 14.4001 9.89961V10.8996ZM10.8001 9.89961C10.524 9.89961 10.3001 10.1235 10.3001 10.3996C10.3001 10.6758 10.524 10.8996 10.8001 10.8996V9.89961ZM12.1001 12.1995C12.1001 12.4757 12.324 12.6995 12.6001 12.6995C12.8762 12.6995 13.1001 12.4757 13.1001 12.1995H12.1001ZM13.1001 8.59952C13.1001 8.32337 12.8762 8.09952 12.6001 8.09952C12.324 8.09952 12.1001 8.32337 12.1001 8.59952H13.1001ZM9.6001 3.99961H9.1001C9.1001 5.04895 8.24944 5.89961 7.2001 5.89961V6.39961V6.89961C8.80172 6.89961 10.1001 5.60123 10.1001 3.99961H9.6001ZM7.2001 6.39961V5.89961C6.15076 5.89961 5.3001 5.04895 5.3001 3.99961H4.8001H4.3001C4.3001 5.60123 5.59847 6.89961 7.2001 6.89961V6.39961ZM4.8001 3.99961H5.3001C5.3001 2.95027 6.15076 2.09961 7.2001 2.09961V1.59961V1.09961C5.59847 1.09961 4.3001 2.39798 4.3001 3.99961H4.8001ZM7.2001 1.59961V2.09961C8.24944 2.09961 9.1001 2.95027 9.1001 3.99961H9.6001H10.1001C10.1001 2.39798 8.80172 1.09961 7.2001 1.09961V1.59961ZM1.6001 14.3996L2.1001 14.3997L2.10037 11.9994L1.60037 11.9993L1.10037 11.9993L1.1001 14.3996L1.6001 14.3996ZM4.00037 9.59961V9.09961C2.39887 9.09961 1.10055 10.3978 1.10037 11.9993L1.60037 11.9993L2.10037 11.9994C2.10049 10.9501 2.95111 10.0996 4.00037 10.0996V9.59961ZM4.00037 9.59961V10.0996H8.4001V9.59961V9.09961H4.00037V9.59961ZM14.4001 10.3996V9.89961H12.6001V10.3996V10.8996H14.4001V10.3996ZM12.6001 10.3996V9.89961H10.8001V10.3996V10.8996H12.6001V10.3996ZM12.6001 12.1995H13.1001V10.3996H12.6001H12.1001V12.1995H12.6001ZM12.6001 10.3996H13.1001V8.59952H12.6001H12.1001V10.3996H12.6001Z' fill='white'/%3E%3C/svg%3E");
  }
}
.flow-btn {
  background-color: vars.$white;
  border: 0.1rem solid #e2e2e2;
  color: #959595;
  font-size: 1.2rem;
  display: inline-flex;
  width: 7.5rem;
  line-height: 2.8rem;
  border-radius: 2rem;
  text-align: center;
  justify-content: center;
  position: relative;
  align-items: center;
  @include mixin.rippleEffectPrimary;
  &::before {
    content: '';
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.4rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: url("data:image/svg+xml,%0A%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.09961 14.4C1.09958 14.6762 1.32341 14.9001 1.59955 14.9001C1.8757 14.9001 2.09958 14.6763 2.09961 14.4002L1.09961 14.4ZM1.59988 11.9998L2.09988 11.9999L1.59988 11.9998ZM8.39961 10.1001C8.67575 10.1001 8.89961 9.87624 8.89961 9.6001C8.89961 9.32395 8.67575 9.1001 8.39961 9.1001V10.1001ZM14.3996 10.9001C14.6757 10.9001 14.8996 10.6762 14.8996 10.4001C14.8996 10.124 14.6757 9.9001 14.3996 9.9001V10.9001ZM10.7996 9.9001C10.5235 9.9001 10.2996 10.124 10.2996 10.4001C10.2996 10.6762 10.5235 10.9001 10.7996 10.9001V9.9001ZM12.0996 12.2C12.0996 12.4761 12.3235 12.7 12.5996 12.7C12.8758 12.7 13.0996 12.4761 13.0996 12.2H12.0996ZM13.0996 8.6C13.0996 8.32386 12.8758 8.1 12.5996 8.1C12.3235 8.1 12.0996 8.32386 12.0996 8.6H13.0996ZM9.59961 4.0001H9.09961C9.09961 5.04944 8.24895 5.9001 7.19961 5.9001V6.4001V6.9001C8.80123 6.9001 10.0996 5.60172 10.0996 4.0001H9.59961ZM7.19961 6.4001V5.9001C6.15027 5.9001 5.29961 5.04944 5.29961 4.0001H4.79961H4.29961C4.29961 5.60172 5.59798 6.9001 7.19961 6.9001V6.4001ZM4.79961 4.0001H5.29961C5.29961 2.95076 6.15027 2.1001 7.19961 2.1001V1.6001V1.1001C5.59798 1.1001 4.29961 2.39847 4.29961 4.0001H4.79961ZM7.19961 1.6001V2.1001C8.24895 2.1001 9.09961 2.95076 9.09961 4.0001H9.59961H10.0996C10.0996 2.39847 8.80123 1.1001 7.19961 1.1001V1.6001ZM1.59961 14.4001L2.09961 14.4002L2.09988 11.9999L1.59988 11.9998L1.09988 11.9998L1.09961 14.4L1.59961 14.4001ZM3.99988 9.6001V9.1001C2.39838 9.1001 1.10006 10.3983 1.09988 11.9998L1.59988 11.9998L2.09988 11.9999C2.1 10.9506 2.95062 10.1001 3.99988 10.1001V9.6001ZM3.99988 9.6001V10.1001H8.39961V9.6001V9.1001H3.99988V9.6001ZM14.3996 10.4001V9.9001H12.5996V10.4001V10.9001H14.3996V10.4001ZM12.5996 10.4001V9.9001H10.7996V10.4001V10.9001H12.5996V10.4001ZM12.5996 12.2H13.0996V10.4001H12.5996H12.0996V12.2H12.5996ZM12.5996 10.4001H13.0996V8.6H12.5996H12.0996V10.4001H12.5996Z' fill='%23555555'/%3E%3C/svg%3E%0A");
  }
}
</style>
