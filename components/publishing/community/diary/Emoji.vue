<template>
  <div class="emoji-list">
    <div v-for="emoji in emojiFiles" :key="emoji.file" class="emoji-item" @click="selectEmoji(emoji)">
      <img :src="`/_nuxt/assets/images/emoji/${emoji.file}`" :alt="emoji.name" />
      <div class="emoji-label">{{ emoji.name }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const emit = defineEmits(['emoji-selected'])

const selectEmoji = (selectedEmoji: { file: string; name: string }) => {
  // 부모 컴포넌트에 이벤트 발생
  emit('emoji-selected', selectedEmoji)
}

const emojiFiles = [
  { file: 'thrilled.svg', name: '기쁨' },
  { file: 'sad.svg', name: '슬픔' },
  { file: 'indifferent.svg', name: '덤덤' },
  { file: 'happy.svg', name: '행복' },
  { file: 'excited.svg', name: '설렘' },

  { file: 'touched.svg', name: '감동' },
  { file: 'peaceful.svg', name: '평온' },
  { file: 'fun.svg', name: '재미' },
  { file: 'congrats.svg', name: '축하' },
  { file: 'cheer.svg', name: '응원' },

  { file: 'upset.svg', name: '속상' },
  { file: 'flustered.svg', name: '당황' },
  { file: 'embarrassed.svg', name: '창피' },
  { file: 'annoyed.svg', name: '짜증' },
  { file: 'angry.svg', name: '화남' },

  { file: 'worry.svg', name: '걱정' },
  { file: 'frustrated.svg', name: '답답' },
  { file: 'hurt.svg', name: '아파' },
  { file: 'ruined.svg', name: '망함' },
  { file: 'shocked.svg', name: '헐' },

  { file: 'surprise.svg', name: '놀람' }
  // { file: 'dizzy.svg', name: '저혈압' },
  // { file: 'bad.svg', name: '나쁨' },
  // { file: 'normal.svg', name: '보통' }
]
</script>
<style lang="scss" scoped>
.emoji-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 2.4rem 3.6rem;
  .emoji-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    img {
      width: 4rem;
      height: 4rem;
      margin:0 auto;
    }
  }
}

@media (max-width: 374px) {
  .emoji-list {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media (min-width: 760px) {
  .emoji-list {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
