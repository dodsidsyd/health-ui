<template>
  <div class="participant-team-wrap">
    <div class="title-box" :class="{ small: smallFont }">
      <p>{{ title }}</p>
      <div class="number-box">
        <strong>{{ 3 }}</strong
        ><em v-if="wating"> / </em><span v-if="wating">{{ 4 }}</span>
      </div>
    </div>
    <div class="participant-box">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = withDefaults(
  defineProps<{
    title?: string
    wating?: boolean
    smallFont?: boolean
  }>(),
  { title: '팀 참가자', wating: true, smallFont: false }
)
</script>
<style lang="scss" scoped>
.participant-team-wrap {
  .title-box {
    display: flex;
    align-items: center;
    p {
      margin-right: 0.8rem;
      font-weight: 500;
      line-height: 2.5rem;
    }
    &.small {
      p,
      strong {
        font-size: 1.4rem;
      }
    }
  }
  .number-box {
    font-size: 18px;
    font-weight: 500;
    line-height: 2.5rem;
    color: #959595;
    strong {
      color: var(--blue-primary);
    }
  }
}
.participant-box {
  display: flex;
  margin: 0 -2rem 3.2rem;
  padding: 1.6rem 2rem 0;
  gap: 2.4rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
