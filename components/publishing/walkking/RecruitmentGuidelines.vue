<template>
  <div class="guideline-wrap">
    <dl>
      <dt>
        <span v-if="type === 'date'" class="ico ico-date"></span>
        <span v-if="type === 'method'" class="ico ico-process-method"></span>
        <span v-if="type === ''" class="ico ico-participate-method"></span>
        {{ title }}
      </dt>
      <dd>{{ detail }}</dd>
    </dl>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  title: { type: String, default: '' },
  detail: { type: String, default: '' },
  type: { type: String, default: '' }
})
</script>
<style lang="scss" scoped>
.guideline-wrap {
  dl {
    display: flex;
    align-items: center;
  }
  dt {
    display: flex;
    align-items: center;
    margin-right: 1.6rem;
    color: #555;
    font-size: 1.4rem;
    font-weight: 600;
  }
  dd {
    font-weight: 700;
  }
}
.ico {
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 0.4rem;
  &.ico-date {
    background: url(~/assets/images/walkingking/ico-recruit-date.svg) center / contain no-repeat;
  }
  &.ico-process-method {
    background: url(~/assets/images/walkingking/ico-process-method.svg) center / contain no-repeat;
  }
  &.ico-participate-method {
    background: url(~/assets/images/walkingking/ico-participate-method.svg) center / contain no-repeat;
  }
}
</style>
