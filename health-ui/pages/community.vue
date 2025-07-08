<template>
  <BaseBody :show-back-button="true" :has-search="true" page-title="커뮤니티명 " @search="handleSearch">
    <LineTabs :tabs="tabs" />
    <NuxtPage />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

const tabs = ref<Tab[]>([
  { title: '홈', to: '/community' },
  { title: '마음일기', to: '/community/diary' },
  { title: '패밀리케어', to: '/community/family' }
])
</script>

<style scoped></style>
