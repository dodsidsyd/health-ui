<template>
  <div class="private-game-main-wrap">
    <div class="main-bg" :style="{ backgroundImage: `url(${profileImgPath})` }"></div>
    <div class="summary-box">
      <div v-if="started" class="challenge-date-limit" :class="{ end: state === 'end', ing: state === 'ing' }">
        <strong class="limit-date">{{ day }}</strong>
        <span>{{ label }}</span>
      </div>
      <div class="img-wrap">
        <img :src="profileImgPath" alt="프로필 사진" />
      </div>
      <h2 class="game-tit">{{ gameTitle }}</h2>
      <p class="date">2025. 06. 15 ~ 2025. 06. 30</p>
      <FlexRowDiv class="mt-16 gap-6 justify-center">
        <slot name="badgeSlot"></slot>
      </FlexRowDiv>
      <div v-if="!started" class="summary-bottom">
        <div class="count-time">
          <span>시작까지</span>
          <p>104:08:20</p>
        </div>
        <div class="animation-box">
          <div class="message-box">
            <div class="message">
              <p>따라올테면 따라와봐!</p>
              <p>내가 제일 잘 걸어!</p>
              <p>걸어서 저하늘까지!</p>
            </div>
          </div>
          <!-- LottieAnimation 추가 -->
          <LottieAnimation src="/animations/shoeMotion.json" :speed="1.0" :loop="true" />
          <div class="rank-progress">
            <div class="current-bar" :style="{ width: currentBarWidth }"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="privat-game-bottom-box">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'

const props = defineProps({
  gameTitle: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  started: { type: Boolean, default: false },
  state: { type: String, default: '' },
  label: { type: String, default: '' },
  day: { type: String, default: '' }
})

const currentBarWidth = ref('0%')
onMounted(() => {
  setTimeout(() => {
    currentBarWidth.value = '50%'
  }, 100)
})

const IMAGE_BASE_PATH = '/_nuxt/assets/images'
const profileImgPath = computed(() => {
  if (props.profileImage) {
    return `${IMAGE_BASE_PATH}/${props.profileImage}`
  }
  return ''
})
</script>

<style lang="scss" scoped>
.private-game-main-wrap {
  position: relative;
  flex: 1;
  margin: -5.6rem -2rem 0;
  padding: 5.6rem 2.4rem 0;
  background-size: cover;
  text-align: center;
  overflow: hidden;
  .main-bg {
    position: absolute;
    left: -1rem;
    top: -1rem;
    right: -1rem;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: blur(0.5rem);
  }
  .summary-box {
    position: relative;
    margin-top: 4.8rem;
    padding: 8rem 2rem 2.4rem;
    background: #fff;
    border-radius: 2rem;
    .img-wrap {
      position: absolute;
      width: 9.6rem;
      height: 9.6rem;
      overflow: hidden;
      bottom: 100%;
      left: 50%;
      transform: translate(-50%, 50%);
      border-radius: 3.6rem;
      border: 0.15rem solid #fff;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    .game-tit {
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 2.9rem;
    }
    .date {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2rem;
      color: #555;
    }
    .summary-bottom {
      margin-top: 2.4rem;
    }
  }
  .rank-progress {
    position: absolute;
    bottom: 0.3rem;
    width: 100%;
    height: 0.6rem;
    background-color: #e8eefa;
    border-radius: 0.9rem;
    opacity: 0.8;
  }
  .current-bar {
    position: relative;
    width: 0;
    height: 100%;
    background-color: vars.$blue-primary;
    border-radius: 0.9rem;
    box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.15) inset;
    transition: width 0.75s ease-in-out;
    opacity: 0.8;
  }
  .count-time {
    color: vars.$blue-primary;
    text-align: center;
    span {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 1.8rem;
    }
    p {
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 3.2rem;
    }
  }
  .animation-box {
    position: relative;
    height: 10rem;
    margin: 1.6rem 0.4rem 0.2rem 0.4rem;
    &::before {
      content: '';
      position: absolute;
      z-index: 10;
      bottom: 0.2rem;
      right: -0.3rem;
      width: 2.4rem;
      height: 2.4rem;
      background: url(~/assets/images/walkingking/ico-flag.png) center / 2.4rem no-repeat;
    }
    // lottie animation으로 변경
    // &::after {
    //   content: '';
    //   position: absolute;
    //   left: 50%;
    //   bottom: 1rem;
    //   transform: translateX(-50%);
    //   width: 12rem;
    //   height: 5.6rem;
    //   background: url(~/assets/images/walkingking/img-walk.gif) center bottom -3.4rem / 100% no-repeat;
    // }
  }
  .message-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: 3.2rem;
    padding: 0.6rem 1.2rem;
    background: #0c0c0c;
    border-radius: 0.6rem;
    box-shadow: 0 0.4rem 0.9rem 0 rgba(2, 12, 34, 0.15);
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #fff;
    &::before {
      content: '';
      position: absolute;
      top: calc(100% - 0.2rem);
      left: 50%;
      transform: translateX(-50%);
      width: 0.9rem;
      height: 0.8rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='8' viewBox='0 0 9 8' fill='none'%3E%3Cpath d='M1.36788 0H7.63212C8.24398 0 8.62935 0.658927 8.32938 1.19221L5.19726 6.76043C4.89142 7.30415 4.10858 7.30415 3.80274 6.76043L0.670617 1.19221C0.370646 0.658926 0.756017 0 1.36788 0Z' fill='%230C0C0C'/%3E%3C/svg%3E");
    }
  }
  .message {
    width: 12rem;
    p {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      animation: show_and_hide 9s ease-in-out infinite;
      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 3s;
      }
      &:nth-child(3) {
        animation-delay: 6s;
      }
    }
    @keyframes show_and_hide {
      0%,
      33.33% {
        opacity: 0;
      }
      16.66% {
        opacity: 1;
      }
    }
  }
}

.privat-game-bottom-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 3.2rem -2.4rem 0 -2.4rem;
  padding: 2.8rem 2rem 0;
  background-color: #fff;
  border-radius: 2.8rem 2.8rem 0 0;
  &:has(.challeng-wrap) {
    position: relative;
    width: auto;
    padding-bottom: 0;
  }
  &:has(.participant-game-wrap) {
    position: relative;
    width: auto;
    padding-bottom: 0;
  }
  @media (max-height: 675px) {
    position: relative;
    width: auto;
    padding-bottom: 0;
    :deep(.participant-box) {
      margin-bottom: 0;
    }
  }
}
.challenge-date-limit {
  position: absolute;
  width: 4.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  right: 2.4rem;
  top: 0;
  padding-top: 0.8rem;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
  background: #bcdc85;
  &.end {
    background: #4f5561;
    color: #fff;
    &:after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='18' viewBox='0 0 48 18' fill='none'%3E%3Cpath d='M25.5606 17.6276C24.6288 18.1241 23.3711 18.1241 22.4394 17.6276L1.07785e-06 5.67085L1.2619e-06 3.5656C1.37995e-06 2.21521 1.41123 -2.58222e-07 3.99894 -3.19979e-08L44.6679 3.5234e-06C47.2556 3.74962e-06 47.3333 1.72297 47.9988 3.5656L48 5.67085L25.5606 17.6276Z' fill='%234F5561'/%3E%3C/svg%3E");
    }
    .limit-date {
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 1.6rem;
    }
    span {
      font-size: 1.3rem;
      font-weight: 700;
      line-height: 1.8rem;
    }
  }
  &.ing {
    background: #fddd66;
    &:after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='18' viewBox='0 0 48 18' fill='none'%3E%3Cpath d='M25.5606 17.6276C24.6288 18.1241 23.3711 18.1241 22.4394 17.6276L1.07785e-06 5.67085L1.2619e-06 3.5656C1.37995e-06 2.21521 1.41123 -2.58222e-07 3.99894 -3.19979e-08L44.6679 3.5234e-06C47.2556 3.74962e-06 47.3333 1.72297 47.9988 3.5656L48 5.67085L25.5606 17.6276Z' fill='%23FDDD66'/%3E%3C/svg%3E");
    }
  }
  .limit-date {
    font-size: 1.3rem;
    font-weight: 700;
  }
  &:after {
    content: '';
    display: block;
    width: 4.8rem;
    height: 1.8rem;
    position: absolute;
    left: 0;
    bottom: -1.5rem;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='18' viewBox='0 0 48 18' fill='none'%3E%3Cpath d='M25.5606 17.6276C24.6288 18.1241 23.3711 18.1241 22.4394 17.6276L1.07785e-06 5.67085L1.2619e-06 3.5656C1.37995e-06 2.21521 1.41123 -2.58222e-07 3.99894 -3.19979e-08L44.6679 3.5234e-06C47.2556 3.74962e-06 47.3333 1.72297 47.9988 3.5656L48 5.67085L25.5606 17.6276Z' fill='%23BCDC85'/%3E%3C/svg%3E");
  }
}
:deep(.lottie-animation) {
  position: absolute;
  top: calc(50% + 3rem);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12rem;
}
</style>
