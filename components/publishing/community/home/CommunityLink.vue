<template>
  <div>
    <NuxtLink :to="url" :class="['community-link', { new: hasNewPosts === true }]">
      <div class="community-img">
        <img :src="getImageUrl" alt="커뮤니티 아이콘" />
      </div>
      <div class="community-info">
        <strong class="tit">{{ communityTitle }}</strong>
        <p class="txt">{{ communityText }}</p>
        <span v-if="member" class="member"> 멤버 {{ (communityMember || 0).toLocaleString() }} </span>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    url?: string
    member?: boolean
    hasNewPosts?: boolean
    communityImg?: string
    communityTitle?: string
    communityText?: string
    communityMember?: number
  }>(),
  {
    url: '#',
    member: false,
    hasNewPosts: false,
    communityImg: '',
    communityTitle: '',
    communityText: '',
    communityMember: 0
  }
)

const basePath = '/_nuxt/assets/images/'

const getImageUrl = computed(() => {
  if (props.communityImg) {
    return `${basePath}${props.communityImg}`
  }
  return ''
})
</script>
<style scoped lang="scss">
.community-link {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  &.new {
    .community-img {
      position: relative;
      &:after {
        display: block;
        content: '';
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: 100%;
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6' cy='6' r='5' fill='%23F14960' stroke='white' stroke-width='2'/%3E%3C/svg%3E%0A");
        z-index: 10;
      }
    }
  }
  .community-img {
    width: 6.4rem;
    height: 6.4rem;

    img {
      overflow: hidden;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 2.4rem;
    }
  }
  .community-info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
    .tit {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
      color: #4c7ff7;
    }
    .txt {
      font-size: 1.8rem;
      font-weight: 500;
      line-height: 2.5rem;
    }
    .member {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2rem;
      color: #959595;
    }
  }
}
</style>
