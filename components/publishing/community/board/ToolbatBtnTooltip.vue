<template>
  <div class="tooltip-wrap">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  text: { type: String, default: '' }
})
</script>

<style scoped lang="scss">
.tooltip-wrap {
  position: absolute;
  left: -0.3rem;
  bottom: calc(100% + 1.2rem);
  padding: 0.4rem 0.8rem;
  background: #4f5561;
  border-radius: 1.2rem;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6rem;
  text-wrap: nowrap;
  color: #fff;
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 1.2rem;
    width: 0.8rem;
    height: 0.4rem;
    background-image: url("data:image/svg+xml,%0A%3Csvg width='8' height='4' viewBox='0 0 8 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.88672 3.00008C2.65658 4.33325 4.58082 4.33336 5.35059 3.00008L7.08301 7.95734e-05H0.154297L1.88672 3.00008Z' fill='%234F5561'/%3E%3C/svg%3E%0A");
  }
}
</style>
