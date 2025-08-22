<template>
  <div class="input-tit" :class="{ required: required === true }">
    {{ label }}
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  required: { type: Boolean, default: false },
  label: { type: String, required: true }
})
</script>

<style lang="scss" scoped>
.input-tit {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.3;
  color: #555555;
  position: relative;
  text-align: left;
  &.required::after {
    content: '*';
    font-size: 1.2rem;
    display: inline-block;
    margin-left: 0.3rem;
    color: #f14960;
  }
}
</style>
