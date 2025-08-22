<template>
  <div class="tip-item">
    <NuxtLink :to="tip.url" class="tip-item-link">
      <div class="tip-item-img" v-if="tip.image">
        <img :src="tip.image" alt="꿀팁 이미지" />
      </div>
      <div class="tip-item-content">
        <p class="tip-item-desc">{{ tip.description }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Tip {
  id: number
  url?: string
  image?: string
  description: string
}

defineProps<{
  tip: Tip
}>()

defineOptions({
  name: 'HealthTipItem'
})
</script>

<style lang="scss" scoped>
.tip-item {
  & + .tip-item {
    border-top: 0.1rem solid #eee;
  }
}

.tip-item-link {
  display: flex;
  align-items: center;
  padding: 2.4rem 0;
  gap: 1.2rem;
  background: #fff;
}

.tip-item-img {
  width: 7rem;
  height: 7rem;
  overflow: hidden;
  border-radius: 1.2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.tip-item-content {
  flex: 1;
}

.tip-item-desc {
  font-weight: 500;
  line-height: 2.2rem;
  @include mixin.multi-ellipsis(2);
}
</style>
