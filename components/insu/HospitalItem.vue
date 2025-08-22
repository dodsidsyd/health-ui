<template>
  <div class="item">
    <NuxtLink :to="hospital.href" class="item-link">
      <img class="logo" :src="getImageUrl(hospital.logo)" :alt="hospital.name" />
      <div class="text-wrap">
        <strong class="text">{{ hospital.name }}</strong>
        <p class="address">{{ hospital.address }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Hospital {
  id: string | number
  href: string
  logo: string
  name: string
  address: string
}

interface Props {
  hospital: Hospital
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const getImageUrl = (logo: string) => {
  return `/_nuxt/assets/images/${logo}`
}
</script>

<style scoped lang="scss">
.item {
  position: relative;
  & + .item {
    border-top: 1px solid #eee;
  }
  .item-link {
    display: flex;
    gap: 1.6rem;
    position: relative;
    padding: 2rem 0.4rem;
    background-color: #fff;
    &:after {
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      right: 0.4rem;
      transform: translateY(-50%);
      width: 2.4rem;
      height: 2.4rem;
      background: url('~/assets/images/icon/ico-arrow-black.svg') no-repeat center center / contain;
    }

    .logo {
      width: 6.4rem;
      height: 6.4rem;
    }

    .text-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1px;
      justify-content: center;
    }

    .text {
      font-weight: 700;
      line-height: 2.2rem;
    }

    .address {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 2rem;
      color: #555;
    }
  }
}
</style>
