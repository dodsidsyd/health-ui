<template>
  <div v-if="members.length > 0" class="member-list">
    <span v-for="(member, index) in members" :key="index" class="member-box">
      <img :src="getImageUrl(member.profileImage)" :alt="member.name" />
      <strong>{{ member.name }}</strong>
    </span>
  </div>
  <div v-else class="no-members">
    <p>참여 멤버가 없습니다.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Member {
  name: string
  profileImage: string
}

interface Props {
  members?: Member[]
}

const props = withDefaults(defineProps<Props>(), {
  members: () => []
})

const basePath = '/_nuxt/assets/images/'

const getImageUrl = (src: string) => {
  if (src) {
    return `${basePath}${src}`
  }
  return ''
}
</script>

<style lang="scss" scoped>
.member-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
  padding: 3.2rem 0;
}

.member-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
  gap: 0.8rem;

  img {
    width: 5.5rem;
    height: 5.6rem;
    border-radius: 50%;
    object-fit: cover;
  }

  strong {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #555;
  }
}

.no-members {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3.2rem 0;

  p {
    font-size: 1.4rem;
    color: #999;
    text-align: center;
  }
}
</style>
