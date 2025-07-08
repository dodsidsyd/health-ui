<template>
  <div class="notice-detail">
    <p>
      <slot name="intro"></slot>
    </p>
    <div class="img-wrap">
      <slot name="media"></slot>
    </div>
    <p>
      <slot name="outro"></slot>
    </p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.notice-detail {
  padding: 2rem 0 1.2rem;
  .img-wrap {
    margin: 1.6rem 0;
    & :deep(img) {
      display: block;
      max-width: 100%;
      height: auto;
      margin: 0 auto;
    }
  }
}
</style>
