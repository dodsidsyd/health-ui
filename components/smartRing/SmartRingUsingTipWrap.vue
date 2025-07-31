<template>
  <div class="using-tip-wrap">
    <div class="tip-title">
      <p>{{ title }} <span>TIP</span></p>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.using-tip-wrap {
  margin: 0 -2rem;
  padding: 3.2rem 2rem 0 2rem;
  background: #f4f4f4;
  .tip-title {
    display: flex;
    margin-bottom: 1.6rem;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.5rem;
    &::after {
      content: '';
      display: block;
      width: 2.4rem;
      height: 2.4rem;
      margin-left: 0.6rem;
      background: url(~/assets/images/smartRing/ico-tip.png) center / 2.4rem no-repeat;
    }
  }
  span {
    color: var(--blue-primary);
  }
}
</style>
