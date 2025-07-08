<template>
  <BaseBody>
    <h2>Footer 샘플 페이지</h2>
  </BaseBody>

  <!-- gap , padding Case -->
  <!-- <BaseFooter class="is-fixed no-gap">
    <button class="c-btn xl w-fix" type="button">로그인하기</button>
  </BaseFooter> -->

  <!-- no-gap , no-padding Case -->
  <BaseFooter class="is-fixed no-gap no-padding no-radius">
    <button class="c-btn xl w-fix" type="button" style="border-radius: 0">로그인하기</button>
  </BaseFooter>
</template>
<script setup lang="ts">
import BaseFooter from '@/components/layout/BaseFooter.vue'
import BaseBody from '@/components/layout/BaseBody.vue'
</script>
