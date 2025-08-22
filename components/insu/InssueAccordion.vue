<template>
  <div class="inssue-accordion">
    <div class="inssue-accordion__header">
      <slot name="header"></slot>
    </div>

    <div class="inssue-accordion__content" :class="{ 'is-expanded': isOpen }">
      <slot name="content"></slot>
    </div>

    <div class="inssue-accordion__toggle" @click="toggle">
      <div class="toggle-text">{{ isOpen ? closeText : openText }}</div>
      <i class="icon-arrow" :class="{ 'is-rotated': isOpen }"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue?: boolean
  openText?: string
  closeText?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  openText: '내역보기',
  closeText: '내역접기'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  toggle: [value: boolean]
}>()

const isOpen = ref<boolean>(props.modelValue)

watch(
  () => props.modelValue,
  value => {
    if (value !== undefined) isOpen.value = value
  }
)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
  emit('toggle', isOpen.value)
}

const openText = props.openText
const closeText = props.closeText
</script>

<style lang="scss" scoped>
.inssue-accordion {
  border: 1px solid #eee;
  border-radius: 1.2rem;
  background-color: #fff;
}

.inssue-accordion__header {
  padding: 2rem;
}

.inssue-accordion__content {
  padding: 0 2rem;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  max-height: 0;

  &.is-expanded {
    max-height: 50rem;
  }
}

.inssue-accordion__toggle {
  border-top: 0.1rem solid #eeeeee;
  padding: 1.7rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;

  .toggle-text {
    font-size: 1.4rem;
    color: #555;
  }

  .icon-arrow {
    width: 2rem;
    height: 2rem;
    background-image: url('/assets/images/insu/icon-arrow-down.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    transition: transform 0.3s ease;

    &.is-rotated {
      transform: rotate(180deg);
    }
  }
}
</style>
