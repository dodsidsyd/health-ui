<template>
  <div class="steps-box" :class="{ total: type === 'total' }" @click="$emit('click')">
    <div>
      <button v-if="type === 'total'" class="see-more">
        <span class="steps-title">{{ title }}</span>
      </button>
      <span v-else class="steps-title">{{ title }}</span>
    </div>
    <p>{{ steps }}</p>
  </div>
</template>
<script setup lang="ts">
// Props 정의
const props = withDefaults(
  defineProps<{
    title: string
    steps: string
    type?: string
  }>(),
  {
    type: ''
  }
)

// Emits 정의
const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
.steps-box {
  width: 100%;
  padding: 1.2rem;
  border-radius: 0.8rem;
  background: #f4f4f4;
  & > div {
    text-align: left;
    line-height: 1.6rem;
  }
  &.total {
    background: #e7f4ff;
    p {
      color: var(--blue-primary);
    }
  }
  .see-more {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    &::after {
      content: '';
      display: block;
      width: 1.6rem;
      height: 1.6rem;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M6.00065 4.6665L9.33398 7.99984L6.00065 11.3332' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
        center / 1.6rem no-repeat;
    }
  }
}
.steps-title {
  font-size: 1.2rem;
  font-weight: 500;
  color: #555;
}
p {
  margin-top: 0.4rem;
  text-align: right;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
}
</style>
