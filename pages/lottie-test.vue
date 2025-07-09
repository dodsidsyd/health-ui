<template>
  <div class="lottie-player">
    <h1>콘페티 애니메이션 (한번만 재생)</h1>

    <LottieAnimation
      src="/animations/confetti.json"
      :speed="2"
      :loop="false"
      width="300px"
      height="400px"
      loading-text="콘페티 로딩 중..."
    />
  </div>
</template>

<script setup lang="ts">
// 필요시 애니메이션 컨트롤
// const animationRef = ref()
// const playAnimation = () => animationRef.value?.play()
</script>

<style scoped>
.lottie-player {
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.lottie-player h1 {
  color: #333;
  margin-bottom: 2.5rem;
}
</style>
