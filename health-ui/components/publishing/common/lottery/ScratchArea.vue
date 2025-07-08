<template>
  <div class="scratch-area"></div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.scratch-area {
  position: relative;
  width: 30.4rem;
  height: 30.4rem;
  margin: 4rem auto 0;
  background: #cdd6e8;
  border-radius: 2rem;
  text-align: center;
  &:after {
    content: '여기를 긁어주세요';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    font-size: 2.4rem;
    font-weight: 700;
    color: #777f92;
  }
}
</style>
