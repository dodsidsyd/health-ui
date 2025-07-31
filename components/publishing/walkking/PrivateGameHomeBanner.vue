<template>
  <div class="privateGame-mainBanner-wrap">
    <h2>친구와 함께하는<br />프라이빗 걷기게임!</h2>
    <p>
      친구들과 함께 걷기게임을 통해<br />
      건강한 친목을 다져보세요
    </p>
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="게임 만들기"
      class="sm make-game"
      :width="10.4"
      @click="btnClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
const props = defineProps({
  point: {
    type: String,
    default: '0'
  },
  expiring: {
    type: String,
    default: '0'
  }
})
const emit = defineEmits(['btn-click'])
const btnClick = (index: number) => {
  emit('btn-click', index)
}
</script>

<style scoped lang="scss">
.privateGame-mainBanner-wrap {
  margin: 0 -2rem;
  padding: 1.6rem 2.4rem 4rem;
  background: #d9efe0 url(~/assets/images/walkingking/img-game-banner.png) right bottom 1.7rem / 20rem no-repeat;
  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    height: 6rem;
    background-color: #d9efe0;
  }
  h2 {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.1rem;
  }
  p {
    margin-top: 1.2rem;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #555;
  }
  .make-game {
    margin-top: 3rem;
    background-color: #099382;
  }
}
</style>
