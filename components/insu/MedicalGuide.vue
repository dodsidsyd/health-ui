<template>
  <div class="medical-guide-box">
    <Button
      aria-label="제휴병원 안내"
      btn-type="text"
      element-type="button"
      icon="ico-greater-than"
      icon-position="right"
      icon-size="16"
      class=""
    />
  </div>
</template>
<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
</script>
<style lang="scss" scoped>
.medical-guide-box {
  margin: auto auto 0;
  :deep(.text) {
    padding: 0;
    margin-right: 0.2rem;
    font-size: 1.4rem;
    color: #555;
    line-height: 2rem;
  }
}
</style>
