<template>
  <div
    class="ranker-box-wrap"
    :class="{
      gold: rank === '1',
      silver: rank === '2',
      copper: rank === '3'
    }"
  >
    <div class="profile-img-box">
      <img :src="fullImagePath" alt="프로필 이미지" />
    </div>
    <div class="txt-box">
      <p>유교맨</p>
      <span>서울 강남</span>
    </div>
    <div class="step-box">
      <p>13,541 걸음</p>
      <span>3.97 km</span>
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
const props = withDefaults(
  defineProps<{
    rank: string
    src?: string
  }>(),
  {
    src: 'img-profile.svg'
  }
)
</script>
<style lang="scss" scoped>
.ranker-box-wrap {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  font-size: 1.4rem;
  text-align: center;
  &.gold {
    .profile-img-box::after {
      background-image: url(~/assets/images/walkingking/img-1st.svg);
    }
    .step-box {
      height: 10.4rem;
    }
  }
  &.silver {
    .profile-img-box::after {
      background-image: url(~/assets/images/walkingking/img-2nd.svg);
    }
    .step-box {
      height: 8rem;
    }
  }
  &.copper {
    .profile-img-box::after {
      background-image: url(~/assets/images/walkingking/img-3rd.svg);
    }
    .step-box {
      height: 7.2rem;
    }
  }
  p {
    font-weight: 600;
    line-height: 2rem;
  }
  span {
    color: #555;
  }
  .profile-img-box {
    position: relative;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -1.4rem;
      transform: translateX(-50%);
      width: 4rem;
      height: 4rem;
      background-position: center;
      background-size: 4rem;
      background-repeat: no-repeat;
    }
  }
  .txt-box {
    span {
      font-weight: 500;
    }
  }
  .step-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    background: #fff;
    border-radius: 0.8rem;
  }
}
</style>
