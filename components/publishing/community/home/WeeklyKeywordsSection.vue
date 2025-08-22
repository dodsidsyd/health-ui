<template>
  <section class="weeklyKeywords-section">
    <TitleBox title="이번주 키워드" class="mb-16" />
    <template v-if="customSliders.length > 0">
      <WeeklyKeywords :sliders="customSliders" :right-margin="50" title="커스텀 키워드" />
    </template>
    <EmptyState v-else empty-title="이번주 추천 키워드가 없어요" href="/community" :button="false" />
  </section>
</template>
<script setup lang="ts">
import TitleBox from '~/components/common/TitleBox.vue'
import WeeklyKeywords from '~/components/publishing/community/home/WeeklyKeywords.vue'
import EmptyState from '~/components/publishing/community/common/EmptyState.vue'

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
<style scoped lang="scss">
.weeklyKeywords-section {
  padding: 3.2rem 0;
}
</style>
