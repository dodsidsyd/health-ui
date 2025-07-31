<template>
  <section>
    <TitleBox title="이번주 키워드" class="mb-16" />
    <WeeklyKeywords :sliders="customSliders" :right-margin="50" title="커스텀 키워드" />
  </section>
</template>
<script setup lang="ts">
import TitleBox from '~/components/common/TitleBox.vue'
import WeeklyKeywords from '~/components/publishing/community/home/WeeklyKeywords.vue'

interface CommunityItem {
  id: string | number
  hashtags?: string[]
}

// Props 정의
interface Props {
  sliders?: CommunityItem[][]
  rightMargin?: number
}

const customSliders = [
  [{ id: 1, hashtags: ['유지어터', '다이어트', '걷기왕', '요리잘알'] }],
  [{ id: 2, hashtags: ['건강검진', '식단', '다이어트', '식단'] }],
  [{ id: 3, hashtags: ['키워드 10개', '4/3/3 3줄 노출'] }]
]
</script>
<style scoped lang="scss"></style>
