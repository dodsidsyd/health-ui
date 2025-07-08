<template>
  <div class="mission-item">
    <div class="mission-img">
      <img :src="mission.image" alt="해당 미션 이미지" />
    </div>
    <div class="mission-content">
      <span class="mission-text">{{ mission.text }}</span>
      <strong class="mission-title">{{ mission.title }}</strong>
    </div>

    <Button
      :btnType="mission.status"
      :disabled="mission.status === 'disabled'"
      :class="{ 'ico-lock': mission.type === 'lock' }"
    >
      {{ getButtonLabel(mission.type, mission.point) }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

defineProps<{
  mission: {
    id: number
    image: string
    text: string
    title: string
    type: 'complete' | 'point' | 'lock'
    status: 'primary' | 'disabled'
    point?: number
  }
}>()

const getButtonLabel = (type: string, point?: number): string => {
  switch (type) {
    case 'complete':
      return '받기완료'
    case 'point':
      return `${Number(point).toLocaleString()}P`
    case 'lock':
      return ''
    default:
      return ''
  }
}
</script>
<style scoped lang="scss">
.mission-item {
  display: flex;
  align-items: center;
  gap: 1.23rem;
  .mission-img {
    width: 6.4rem;
    height: 6.4rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .mission-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    gap: 0.5rem;
    .mission-text {
      font-size: var(--num-14);
      font-weight: vars.$medium;
    }
    .mission-title {
    }
  }
  .c-btn {
    width: 7.2rem;
    ::v-deep(.text) {
      font-size: var(--num-14);
      font-weight: vars.$medium;
    }
    &.ico-lock {
      ::v-deep(.text) {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
}
</style>
