<template>
  <div class="reward-item-wrap">
    <div v-if="rewardType === 'point'" class="point-coing-bg">
      <p class="coin-num">{{ title }}</p>
    </div>
    <img v-if="rewardType != 'point'" :src="imageName" alt="리워드 이미지" />
    <div>
      <p class="reward-tit">{{ title }}</p>
      <p class="reward-date">{{ date }}</p>
    </div>
    <Button v-if="!used" btn-type="primary" element-type="button" :aria-label="label" class="sm" @click="handleClick" />
    <Button v-if="used" btn-type="secondary" element-type="button" aria-label="지급완료" class="sm" disabled />
  </div>
</template>
<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps({
  imageName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: '선물받기'
  },
  used: {
    type: Boolean,
    default: false
  },
  rewardType: { type: String as () => 'point' | null, default: null },
  point: { type: String, default: '' }
})

const emits = defineEmits(['buttonClick'])
const handleClick = () => {
  emits('buttonClick')
}
</script>
<style scoped lang="scss">
.reward-item-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem;
  gap: 0.8rem;
  border-radius: 1.2rem;
  background: #fff;
  img {
    width: 11.6rem;
    height: 11.6rem;
  }
}
.reward-tit {
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
}
.reward-date {
  margin-top: 0.2rem;
  color: #959595;
  font-size: 1.4rem;
  font-weight: 400;
}
.point-coing-bg {
  position: relative;
  width: 11.6rem;
  height: 11.6rem;
  background-image: url('~/assets/images/benefit/img-point-coin.png');
  background-position: left -0.6rem top -0.6rem;
  background-size: 13.6rem;
  background-repeat: no-repeat;
  .coin-num {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Jalnan2', sans-serif;
    font-weight: 700;
    font-size: 2.2rem;
    letter-spacing: -0.1rem;
  }
}
</style>
