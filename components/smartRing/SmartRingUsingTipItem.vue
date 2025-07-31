<template>
  <div class="using-tip-box">
    <div v-if="title" class="tip-title">
      <p>{{ title }}</p>
      <i :class="['icon', iconClass]"></i>
    </div>
    <p class="detail"><slot></slot></p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  iconClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.using-tip-box {
  margin-bottom: 1.2rem;
  padding: 2rem;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
  &:last-child {
    margin-bottom: 0;
  }
  .tip-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.4rem 0 0.8rem;
    p {
      font-weight: 700;
      line-height: 2.2rem;
    }
  }
  .detail {
    line-height: 2.2rem;
    color: #555;
  }
  i {
    width: 2.4rem;
    height: 2.4rem;
    flex-shrink: 0;
  }
}
</style>
