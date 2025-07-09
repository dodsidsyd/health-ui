<template>
  <BaseBody
    :show-back-button="false"
    page-title="퍼블가이드"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
  >
    <LineTabs :tabs="tabs" />
    <NuxtPage />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

const route = useRoute()
const router = useRouter()

const tabs = ref<Tab[]>([
  { title: '퍼블리스트', to: '/guide/PubList' },
  { title: '레이아웃', to: '/guide/layouts' },
  { title: '컴포넌트', to: '/guide/components' },
  { title: '혼합 컴포넌트', to: '/guide/compound' },
  { title: '탭', to: '/guide/tabsStyle' },
  { title: '모달', to: '/guide/modal' },
  { title: '스와이프', to: '/guide/swiper' }
])

// /guide 경로로 접근할 때 첫 번째 탭으로 리다이렉트
if (route.path === '/guide') {
  router.push('/guide/PubList')
}
</script>

<style scoped></style>
