<template>
  <BaseBody :has-search="true" page-title="건신 커뮤니티" @search="handleSearch">
    <LineTabs :active-key="activeLineTab" :tabs="tabs" />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from '#app'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

const route = useRoute()
const activeLineTab = ref('home')
const tabs = ref<Tab[]>([
  { title: '홈', to: '/community', key: 'home' },
  { title: '마음일기', to: '/community/diary', key: 'diary' },
  { title: '패밀리케어', to: '/community/familycare', key: 'familycare' }
])

// LineTabs를 표시할 조건을 정의(뒤로가기 버튼도 같은 경로에는 조건부 보이게)
const shouldShowLineTabs = computed(() => {
  const currentPath = route.path

  // tabs에 정의된 경로들만 LineTabs를 표시
  const allowedPaths = tabs.value.map(tab => tab.to)
  return allowedPaths.includes(currentPath)
})
</script>

<style scoped></style>
