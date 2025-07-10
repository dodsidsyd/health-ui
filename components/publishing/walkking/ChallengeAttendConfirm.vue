<template>
  <div class="challenge-attend-wrap">
    <img src="~/assets/images/walkingking/ico-warning.svg" alt="알림 이미지" />
    <h4>{{ title }}</h4>
    <p>{{ subtit }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: '' },
  subtit: { type: String, default: '' }
})
</script>
<style scoped lang="scss">
.challenge-attend-wrap {
  position: relative;
  display: flex;
  min-width: 28rem;
  flex-direction: column;
  align-items: center;
}

h4 {
  width: 80%;
  margin-top: 0.6rem;
  word-break: keep-all;
}
p {
  margin-top: 0.8rem;
  color: #555;
  font-size: 1.4rem;
}
</style>
