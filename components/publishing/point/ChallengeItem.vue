<template>
  <div class="challenge-item-box" @click="handleClick">
    <img :src="imageName" alt="챌린지 아이템 이미지" />
    <div class="txt-box">
      <p class="item-type">{{ type }}</p>
      <p class="item-name">{{ name }}</p>
      <p class="item-point">{{ point }}P</p>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  imageName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: '챌린지 부스터'
  },
  name: {
    type: String,
    required: true
  },
  point: {
    type: String,
    default: '0'
  }
})

const emits = defineEmits(['buttonClick'])
const handleClick = () => {
  emits('buttonClick')
}
</script>
<style scoped lang="scss">
.challenge-item-box {
  display: flex;
  width: 100%;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  border-radius: 1.2rem;
  border: 0.1rem solid #eee;
  background: #f9f9f9;
  img {
    width: 11.6rem;
    height: 11.6rem;
  }
  .txt-box {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    align-items: center;
    margin-top: 0.8rem;
    text-align: center;
    .item-type {
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 1.6rem;
      color: #555;
    }
    .item-name {
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 2rem;
    }
    .item-point {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
    }
  }
}
</style>
