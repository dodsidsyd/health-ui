<template>
  <section class="main-profile">
    <MainMyProfileBox />
    <MainMyRank class="mt-15" />
    <MainMyChallenge class="mt-20" />
  </section>
</template>

<script setup lang="ts">
import MainMyProfileBox from '~/components/publishing/walkking/subMain/MainMyProfileBox.vue'
import MainMyRank from '~/components/publishing/walkking/subMain/MainMyRank.vue'
import MainMyChallenge from '~/components/publishing/walkking/subMain/MainMyChallenge.vue'
</script>

<style scoped lang="scss">
.main-profile {
  background: #4c7ff7;
  margin: -5.6rem -2rem 0;
  padding: 5.6rem 2rem 2.8rem;
  overflow: hidden;
  position: relative;
}
</style>
