<template>
  <div class="search-result-box">
    <p>
      구매 가능한 {{ item }}이 총 <span class="count">{{ count }}</span
      >건 조회되었습니다
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  item: {
    type: String,
    default: '아이템'
  },
  count: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped lang="scss">
.search-result-box {
  margin: 2.1rem 0;
  font-weight: 500;
  line-height: 2.2rem;
  .count {
    font-weight: 700;
  }
}
</style>
