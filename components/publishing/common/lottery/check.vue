<template>
  <div class="check-wrap">
    <div>
      <img :src="ImgLottery" alt="리워드 이미지" />
      <span>걷기왕 챌린지 미션 참여로</span>
      <h2>행운복권을 받았어요!</h2>
    </div>

    <div class="check-wrap-box">
      <p class="tit">6월 2차 하이워킹 챌린지</p>
      <p class="timer">06:48:36</p>
      <p class="notify">남은 시간이 지나면 행운복권이 사라져요!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImgLottery from '~/assets/images/lottery/img-lottery.svg'
const props = defineProps({
  imageName: {
    type: String,
    required: false,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.check-wrap {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12rem;
  img {
    width: 12.8rem;
    margin: 0 auto;
  }
  span {
    display: block;
    margin-top: 1.6rem;
    font-weight: 500;
    font-size: 1.8rem;
    color: var(--gray-11);
  }
  h2 {
    margin-top: 0.8rem;
    font-size: 2.4rem;
    font-weight: 700;
    color: #2b2b2b;
  }
  .check-wrap-box {
    position: relative;
    margin-bottom: 2.4rem;
    padding: 2.4rem 2rem;
    border-radius: 0.8rem;
    background: #f4f4f4;
    .tit {
      margin-bottom: 1.6rem;
      padding-bottom: 1.6rem;
      font-size: 1.6rem;
      font-weight: 700;
      color: #2b2b2b;
      border-bottom: 0.1rem solid #e2e2e2;
    }
    .timer {
      margin-bottom: 0.4rem;
      font-family: Roboto;
      font-weight: 700;
      font-size: 2.4rem;
      color: var(--blue-primary);
    }
    .notify {
      font-weight: 400;
      font-size: 1.4rem;
    }
  }
}
</style>
