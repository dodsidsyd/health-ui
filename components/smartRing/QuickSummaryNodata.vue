<template>
  <div class="summary-wrap">
    <div class="summary-box-top">
      <p class="tit">
        {{ title }}
        <button type="button" class="vital-tooltip" @click="handleTooltipClick"></button>
      </p>
      <div class="score-box">
        <p>-{{ unit }}</p>
      </div>
      <i :class="['icon', iconClass]"></i>
    </div>
    <div class="summary-box-bottom">데이터가 충분하지 않아요</div>
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
  },
  unit: {
    type: String,
    default: ''
  }
})

interface Emits {
  (e: 'tooltip-click'): void
}
const emit = defineEmits<Emits>()
// tooltip 클릭 핸들러
const handleTooltipClick = () => {
  emit('tooltip-click')
}
</script>

<style scoped lang="scss">
.summary-wrap {
  margin: 2.4rem 0 3.2rem;
  background: #fff;
  border-radius: 2rem;
  border: 0.1rem solid #e2e2e2;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;
}
.summary-box-top {
  position: relative;
  padding: 2rem 2rem 2rem 2.4rem;
  .tit {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    font-weight: 500;
    line-height: 2.2rem;
    color: #555;
  }
  .score-box {
    display: flex;
    align-items: center;
    margin-top: 0.8rem;
    p {
      margin-right: 0.8rem;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 3.1rem;
      color: #000;
    }
  }
  i {
    position: absolute;
    top: 2rem;
    right: 2rem;
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
  }
}
.summary-box-bottom {
  padding: 2rem;
  background-color: #f4f4f4;
  font-weight: 500;
  line-height: 2.2rem;
}
.vital-tooltip {
  display: block;
  width: 2rem;
  height: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none'%3E%3Cpath d='M10.4992 13.75V13.783M8.625 7.69166C8.625 6.63657 9.46447 5.78125 10.5 5.78125C11.5355 5.78125 12.375 6.63657 12.375 7.69166C12.375 8.74675 11.5355 9.60207 10.5 9.60207C10.5 9.60207 10.4992 10.1723 10.4992 10.8757M18 10C18 14.1421 14.6421 17.5 10.5 17.5C6.35786 17.5 3 14.1421 3 10C3 5.85786 6.35786 2.5 10.5 2.5C14.6421 2.5 18 5.85786 18 10Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.7;
  }
}
</style>
