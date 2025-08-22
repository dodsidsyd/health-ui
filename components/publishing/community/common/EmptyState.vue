<template>
  <div :class="['empty-state', { 'bg-white': white }]">
    <p class="empty-title">{{ emptyTitle }}</p>
    <Button
      v-if="isButton"
      element-type="a"
      btn-type="line"
      :href="href"
      :border-radius="32"
      :height="4"
      :icon="buttonIcon"
      :icon-size="24"
      class="sm"
      :aria-label="buttonAriaLabel"
    />
  </div>
</template>
<script lang="ts" setup>
import Button from '~/components/publishing/button/Button.vue'

interface Props {
  emptyTitle: string
  button: boolean
  href: string
  white?: boolean
  buttonIcon?: string
  buttonAriaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  white: false,
  buttonIcon: 'ico-write',
  buttonAriaLabel: '글쓰기'
})

const isButton = computed(() => {
  return props.button
})
</script>
<style lang="scss" scoped>
.empty-state {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.2rem 2rem;
  text-align: center;
  background: #f4f4f4;
  border-radius: 1.2rem;
  gap: 1.6rem;
  .empty-title {
    font-weight: 500;
    line-height: 2.2rem;
    color: #959595;
  }
  &.bg-white {
    background: #fff;
  }
}
:deep(.c-btn) {
  width: auto;
  padding: 0 1.6rem 0 2rem;
  &.btn-write-post {
    &.btn-line {
      background-color: #fff;
    }
  }
}

.btn-write-post {
  &:deep(.text) {
    padding-left: 0.4rem;
    line-height: 2rem;
  }
  :deep(.icon) {
    background-repeat: no-repeat;
    background-position: left center;
  }
}
</style>
