<template>
  <CardFlip :cards="cards">
    <template #front="{ item }">
      <div>
        <strong>{{ item.title }}</strong>
        <p>{{ item.subtitle }}</p>
      </div>
    </template>
    <template #back="{ item }">
      <div>
        <p>{{ item.description }}</p>
      </div>
    </template>
  </CardFlip>
</template>

<script setup>
import CardFlip from '~/components/publishing/community/competitive/CardFlip.vue'
// import StackedCardFlip from '~/components/common/StackedCardFlip.vue'

const cards = [
  { id: 1, title: '두부투데이', subtitle: '뉴스 리스트', description: '상세 내용 A' },
  { id: 2, title: '쿨썸머 랭킹전', subtitle: '이벤트', description: '상세 내용 B' }
  // { id: 3, title: '이주의 핀플', subtitle: '추천', description: '상세 내용 C' },
  // { id: 4, title: '이슈톡', subtitle: '핫 이슈', description: '상세 내용 D' }
]
</script>

<style scoped></style>
