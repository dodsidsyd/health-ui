<template>
  <div v-if="props.selectedBoosterItem" class="flex flex-col align-center gap-32 mb-n12">
    <div style="width: 8rem; height: 8rem">
      <img :src="`${IMAGE_BASE_PATH_MODAL}${props.selectedBoosterItem.src}`" alt="선택된 아이템 이미지" />
    </div>
    <p style="font-size: 1.8rem; font-weight: 500">
      {{ props.selectedBoosterItem.name }} 부스터를<br />사용하시겠어요?
    </p>
    asdfasdfasdf
  </div>
  <div v-else>
    <p>선택된 부스터 아이템이 없습니다.</p>
  </div>
</template>

<script setup lang="ts">
// 부모로부터 받아올 props를 정의합니다.
// selectedBoosterItem을 ref가 아닌 props로 받습니다.
const props = defineProps<{
  // 💡 selectedBoosterItem을 prop으로 정의합니다.
  // 부모에서 null을 전달할 수도 있으므로, 해당 타입에 null을 포함하는 것이 좋습니다.
  selectedBoosterItem: { name: string; src: string; count: string } | null
  title?: string // 기존 props 유지
  subtit?: string // 기존 props 유지
}>()

// 아이템 사용 확인 모달 이미지 경로
const IMAGE_BASE_PATH_MODAL = '/_nuxt/assets/images/'

// 이전에 선언했던 selectedBoosterItem ref는 제거합니다.
// const selectedBoosterItem = ref<{ name: string; src: string; count: string } | null>(null)
</script>

<style scoped lang="scss">
.challenge-attend-wrap {
  position: relative;
  display: flex;
  min-width: 28rem;
  flex-direction: column;
  align-items: center;
}

h4 {
  width: 80%;
  margin-top: 0.6rem;
  word-break: keep-all;
}
p {
  margin-top: 0.8rem;
  color: #555;
  font-size: 1.4rem;
}
</style>
