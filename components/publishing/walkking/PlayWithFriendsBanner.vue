<template>
  <NuxtLink to="javascript:void(0)" class="with-friends-wrap"> <p>챌린지중인 친구들과 걷기게임 해보세요!</p> </NuxtLink>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.with-friends-wrap {
  height: 5.6rem;
  padding: 1.7rem 0 1.7rem 2rem;
  border-radius: 0.8rem;
  background: #d9efe0 url(~/assets/images/walkingking/img-with-friends.png) right 1rem center / contain no-repeat;
  p {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2.2rem;
    color: #099382;
  }
}
</style>
