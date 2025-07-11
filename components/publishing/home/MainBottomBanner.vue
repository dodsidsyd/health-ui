<template>
  <div class="main-bottom-banner">
    <nuxt-link to="">
      <img
        src="~/assets/images/home/img-bottom-banner.png"
        alt="에어맥스 DN8 새로워진 다이내믹 에어로 경이로운 감각을 경험해 보세요"
      />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main-bottom-banner {
  margin: 0 -2rem;
  a {
    position: relative;
    display: block;
    @include mixin.rippleEffectWhite;
  }

  img {
    width: 100%;
  }
}
</style>
