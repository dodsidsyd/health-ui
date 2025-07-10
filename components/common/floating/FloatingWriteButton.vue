<template>
  <NuxtLink to="/community/write" class="floating-write-button" aria-label="게시글 쓰기 버튼">
    <i class="icon ico-float-write"></i>
  </NuxtLink>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.floating-write-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 1.6rem;
  right: 1.6rem;
  width: 5.6rem;
  height: 5.6rem;
  padding: 1.6rem;
  border-radius: 4.8rem;
  background: #4c7ff7;
  z-index: 100;
  .ico-float-write {
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
