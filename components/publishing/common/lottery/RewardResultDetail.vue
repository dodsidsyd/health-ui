<template>
  <div v-if="haveReward" class="result-title-wrap">
    <LottieAnimation src="/animations/confetti.json" width="100%" height="100%" :speed="1.5" :loop="false" />
    <h2>
      <span class="reward-item">{{ rewardItem }}</span
      ><br />
      <span>당첨을 축하합니다</span>
    </h2>
    <NuxtLink v-if="rewardType === 'point'" to="#">
      <p class="check-item">지급된 포인트 확인하기</p>
    </NuxtLink>
    <NuxtLink v-if="rewardType === 'item'" to="#">
      <p class="check-item">지급된 아이템 확인하기</p>
    </NuxtLink>
    <p v-if="rewardType === 'gift'" class="comment">
      선물받기를 이용해서<br />
      지급된 상품교환권을 받을 수 있어요
    </p>
    <div class="reward-image-area">
      <!-- <div v-if="showCongratsGif" class="gif-container">
        <img :src="congratsGif" alt="포인트 당첨 애니메이션" class="point-gif" />
      </div> -->

      <div v-if="rewardType === 'point'" class="point-coing-bg">
        <p class="coin-num">{{ point }}P</p>
      </div>
      <img
        v-if="rewardType === 'item' || rewardType === 'gift'"
        :src="rewardImage"
        class="reward-img"
        alt="당첨 리워드"
      />
    </div>
  </div>
  <div v-else class="result-title-wrap">
    <h2>
      <span class="reward-item">꽝!</span><br />
      <span>아쉽지만 다음기회에...</span>
    </h2>
    <p class="comment">
      친구에게 공유하면
      <br />
      친구추천 포인트를 받을 수 있어요!
    </p>
    <div class="reward-image-area">
      <img src="~/assets/images/lottery/img-reward-7.svg" alt="꽝" class="reward-img no-reward" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import congratsGif from '~/assets/images/lottery/img-congrats.gif'

const props = defineProps({
  haveReward: { type: Boolean, default: false },
  rewardItem: { type: String, default: '' },
  rewardType: { type: String as () => 'point' | 'item' | 'gift' | null, default: null },
  rewardImage: { type: String, default: '' },
  point: { type: String, default: '' }
})
const showCongratsGif = ref(false)

onMounted(() => {
  if (props.haveReward) {
    // 보상이 있는 경우에만 GIF 재생
    showCongratsGif.value = true // GIF 표시 시작
  }
})
</script>
<style scoped lang="scss">
.result-title-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 4.8rem;
  text-align: center;
  flex-grow: 1;
  overflow: hidden;
  h2 {
    margin-bottom: 2rem;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 3.35rem;
    position: relative;
    .reward-item {
      color: var(--blue-primary);
    }
  }
  .comment {
    position: relative;
  }
  .check-item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    &:after {
      content: '';
      display: block;
      width: 2rem;
      height: 2rem;
      margin-left: 0.2rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7.50008 5.83398L11.6667 10.0007L7.50008 14.1673' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
  }
  .lottie-animation {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0rem;
    right: 0;
  }
  .reward-image-area {
    position: relative;
    flex-grow: 1;
    width: 100%;
    overflow: hidden;
    .gif-container {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .reward-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 14.4rem;
      height: 14.4rem;
      &.no-reward {
        width: 16.6rem;
        height: 16.6rem;
      }
    }
  }
}
.point-coing-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  height: 20rem;
  background-image: url('~/assets/images/benefit/img-point-coin.png');
  background-position: left 3.4rem top 3.2rem;
  background-size: 14.4rem;
  background-repeat: no-repeat;
  .coin-num {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Jalnan2', sans-serif;
    font-weight: 700;
    font-size: 2.4rem;
  }
}
</style>
