<template>
  <div class="emoji-selector">
    <div class="emoji-list">
      <div v-for="(emoji, i) in displayEmojis" :key="emoji.label" class="emoji-item">
        <img :src="emoji.src" :alt="emoji.label" class="emoji-img" @click="selectEmoji(emoji)" />
        <div class="emoji-label">{{ emoji.label }}</div>
      </div>
      <div v-if="hasMore" class="emoji-item more" @click="goToEmojiPicker">
        <img :src="moreImg" alt="이모지 더보기" class="emoji-img" />
        <div class="emoji-label">...</div>
      </div>
    </div>
  </div>
  <BottomModal
    :is-visible="isShowBottomModal"
    v-bind="bottomModalProps"
    @cancel="clickCancel"
    @confirm="clickConfirm"
    @close="isShowBottomModal = false"
  >
    <template #content>
      <Emoji @emoji-selected="handleEmojiSelected" />
    </template>
  </BottomModal>
</template>

<script setup>
import { ref, computed } from 'vue'
const router = useRouter()
const route = useRoute()
import BottomModal from '~/components/common/modal/BottomModal.vue'
import Emoji from './Emoji.vue'
const props = defineProps({
  emojis: {
    type: Array,
    required: false,
    default: () => [
      { src: '/_nuxt/assets/images/emoji/thrilled.svg', label: '기쁨' },
      { src: '/_nuxt/assets/images/emoji/peaceful.svg', label: '평온' },
      { src: '/_nuxt/assets/images/emoji/indifferent.svg', label: '덤덤' },
      { src: '/_nuxt/assets/images/emoji/upset.svg', label: '속상' },
      { src: '/_nuxt/assets/images/emoji/angry.svg', label: '화남' }
    ]
  },
  max: {
    type: Number,
    default: 6
  },
  moreImg: {
    type: String,
    default: '/_nuxt/assets/images/emoji/more.svg'
  }
})

const isShowBottomModal = ref(false)
const displayEmojis = computed(() => props.emojis.slice(0, props.max - 1))
const hasMore = computed(() => true)

const bottomModalProps = ref({
  title: '오늘은 어떤 하루였나요?',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const selectEmoji = (selectedEmoji) => {
  // returnPath가 있으면 해당 경로로, 없으면 create.vue로 이동
  const returnPath = route.query.returnPath || '/community/diary/create'
  
  // 이모지 파일명 추출 (src에서 파일명만 가져오기)
  const emojiFile = selectedEmoji.src.split('/').pop().replace('.svg', '') || ''
  
  // 선택된 이모지와 날짜 정보를 쿼리로 전달
  const query = {
    date: route.query.date,
    emoji: emojiFile,
    name: selectedEmoji.label
  }
  
  router.push({
    path: returnPath,
    query
  })
}

const handleEmojiSelected = (selectedEmoji) => {
  // BottomModal 내부의 Emoji에서 선택된 경우
  const returnPath = route.query.returnPath || '/community/diary/create'
  
  // 선택된 이모지와 날짜 정보를 쿼리로 전달
  const query = {
    date: route.query.date,
    emoji: selectedEmoji.file,
    name: selectedEmoji.name
  }
  
  // 모달 닫기
  isShowBottomModal.value = false
  
  // 페이지 이동
  router.push({
    path: returnPath,
    query
  })
}

const clickCancel = () => {
  isShowBottomModal.value = false
}

const clickConfirm = () => {
  isShowBottomModal.value = false
}

const goToEmojiPicker = () => {
  // emojiPicker.vue로 이동
  const query = {
    date: route.query.date,
    returnPath: route.query.returnPath || '/community/diary/create'
  }
  
  router.push({
    path: '/community/diary/emojiPicker',
    query
  })
} 

</script>

<style scoped>
.emoji-selector {
  padding: 1.2rem 0;
  .emoji-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: #222;
  }
  .emoji-list {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .emoji-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    .emoji-img {
      width: 4rem;
      height: 4rem;
    }
    .emoji-label {
      line-height: 2.2rem;
      color: #555;
    }
  }
}

.emoji-modal-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  padding: 16px 0;
  .emoji-modal-item {
    width: 72px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  .emoji-modal-item .emoji-img {
    width: 48px;
    height: 48px;
    margin-bottom: 8px;
  }
  .emoji-label {
    font-size: 1em;
    color: #555;
    word-break: break-all;
  }
}
</style>
