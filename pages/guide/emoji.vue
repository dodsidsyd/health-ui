<template>
  <div class="emoji-guide">
    <div class="emoji-list">
      <div v-for="emoji in emojiFiles" :key="emoji.file" class="emoji-item">
        <img :src="`/_nuxt/assets/images/emoji/${emoji.file}`" :alt="emoji.name" />
        <div class="emoji-label">{{ emoji.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emojiFiles = [
  { file: 'diary.svg', name: '일기쓰기' },
  { file: 'more.svg', name: '더보기' },
  { file: 'thrilled.svg', name: '신남' },
  { file: 'sad.svg', name: '슬픔' },
  { file: 'upset.svg', name: '속상' },
  { file: 'angry.svg', name: '화남' },
  { file: 'ruined.svg', name: '망함' },
  { file: 'annoyed.svg', name: '짜증' },
  { file: 'indifferent.svg', name: '덤덤' },
  { file: 'flustered.svg', name: '당황' },
  { file: 'frustrated.svg', name: '답답' },
  { file: 'excited.svg', name: '설렘' },
  { file: 'hurt.svg', name: '아파' },
  { file: 'embarrassed.svg', name: '창피' },
  { file: 'peaceful.svg', name: '평온' },
  { file: 'worry.svg', name: '걱정' },
  { file: 'surprise.svg', name: '놀람' },
  { file: 'fun.svg', name: '재미' },
  { file: 'shocked.svg', name: '헐' },
  { file: 'happy.svg', name: '행복' },
  { file: 'cheer.svg', name: '응원' },
  { file: 'congrats.svg', name: '축하' },
  { file: 'touched.svg', name: '감동' },
  { file: 'dizzy.svg', name: '저혈압' },
  { file: 'tired.svg', name: '데이터없음' },
  { file: 'bad.svg', name: '나쁨' },
  { file: 'normal.svg', name: '보통' },
  { file: 'blank.svg', name: '미도래' }
]
</script>

<style scoped>
.emoji-guide {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px;
}
.emoji-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.emoji-item {
  width: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.emoji-item img {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
}
.emoji-label {
  font-size: 0.95em;
  color: #555;
  word-break: break-all;
}
</style>
