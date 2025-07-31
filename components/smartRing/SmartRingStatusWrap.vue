<template>
  <div class="status-wrap">
    <div class="tip-title">
      <p>{{ title }}</p>
    </div>
    <div :class="['status-box', boxClass]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  boxClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.status-wrap {
  margin: 0 -2rem;
  padding: 3.2rem 2rem;
  background: #f4f4f4;
  .tip-title {
    display: flex;
    margin-bottom: 1.6rem;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.5rem;
  }
}
.status-box {
  display: flex;
  padding: 0.8rem 2rem;
  flex-direction: column;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
  &.hasNoBg {
    padding: 0;
    gap: 1.2rem;
    background: transparent;
    border-radius: none;
    box-shadow: none;
  }
}
</style>
