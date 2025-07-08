<template>
  <NuxtLink to="#" class="link flex">
    <div class="link-img"><img src="~/assets/images/campaign/img-campaign.svg" /></div>
    <p class="link-text">
      건강의신 나무심기 프로젝트는<br />
      서울마이트리와 함께합니다.
    </p>
  </NuxtLink>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.link {
  background: url("data:image/svg+xml,%3Csvg width='7' height='11' viewBox='0 0 7 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.49996 1.33398L5.66663 5.50065L1.49996 9.66732' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")
    no-repeat center right 0.4rem;
  .link-img {
    overflow: hidden;
    padding: 1.4rem 1.3rem;
    border-radius: 0.8rem;
    border: 1px solid #e2e2e2;
  }
  .link-text {
    flex: 1;
    padding: 1.2rem 3.2rem 1.2rem 1.2rem;
    font-size: var(--num-14);
    font-weight: vars.$medium;
    color: #555;
    line-height: 140%;
  }
}
</style>
