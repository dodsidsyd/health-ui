<template>
  <section class="emoji-section ml-n20 mr-n20">
    <TitleBox :is-title="true" :center="true" html-title="오늘 기분 어때요? <span>이모티콘을 선택해보세요</span>" />
    <EmojiSelector />
    <!-- :emojis="emojis" 변경가능 -->
  </section>
</template>
<script setup lang="ts">
import EmojiSelector from '~/components/publishing/community/diary/EmojiSelector.vue'
import TitleBox from '~/components/common/TitleBox.vue'

// const emojis = ref([{ src: '/_nuxt/assets/images/emoji/thrilled.svg', label: '기쁨' }])
</script>
<style lang="scss" scoped>
.emoji-section {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 4rem 2.4rem 3.2rem 2.4rem;
  background: linear-gradient(135deg, #e3f0ff 0%, #f7e6f7 100%);
}
:deep(.title-box) {
  margin-bottom: 0;
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    span {
      font-size: 1.8rem;
      font-weight: 500;
      line-height: 2.5rem;
    }
  }
}
</style>
