<template>
  <div class="btn-emoji-wrap">
    <button 
      type="button" 
      class="btn-emoji-modal" 
      :disabled="disabled"
      title="이모지 선택 팝업 열기" 
      @click="openEmojiPicker"
    >
      <i class="icon icon-emoji"></i>
    </button>

    <!-- 이모지 선택 모달 (라우팅 방지 모드) -->
    <EmojiPickerModalChat
      :is-visible="showEmojiPickerModal"
      @close="showEmojiPickerModal = false"
      @emoji-selected="handleEmojiSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EmojiPickerModalChat from '~/components/publishing/community/diary/EmojiPickerModalChat.vue'

interface Props {
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  'emoji-selected': [emoji: { file: string; name: string; src: string }]
}>()

const showEmojiPickerModal = ref(false)

const openEmojiPicker = () => {
  if (!props.disabled) {
    showEmojiPickerModal.value = true
  }
}

const handleEmojiSelected = (selectedEmoji: { file: string; name: string }) => {
  // 이모지 경로 생성
  const emojiWithPath = {
    ...selectedEmoji,
    src: `/_nuxt/assets/images/emoji/${selectedEmoji.file}`
  }
  
  // 부모 컴포넌트로 이모지 전달
  emit('emoji-selected', emojiWithPath)
  
  // 모달 닫기
  showEmojiPickerModal.value = false
}
</script>

<style lang="scss" scoped>
.btn-emoji-wrap {
  height: 2.4rem;
  .icon-emoji {
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M9.12039 9.1199V8.3699C8.70618 8.3699 8.37039 8.70569 8.37039 9.1199H9.12039ZM9.21601 9.1199H9.96601C9.96601 8.70569 9.63023 8.3699 9.21601 8.3699V9.1199ZM14.8804 9.1199V8.3699C14.4662 8.3699 14.1304 8.70569 14.1304 9.1199H14.8804ZM14.9654 9.1199H15.7154C15.7154 8.70569 15.3796 8.3699 14.9654 8.3699V9.1199ZM9.21601 9.19678V9.94678C9.63023 9.94678 9.96601 9.61099 9.96601 9.19678H9.21601ZM9.12039 9.19678H8.37039C8.37039 9.61099 8.70618 9.94678 9.12039 9.94678V9.19678ZM14.9654 9.19678V9.94678C15.3796 9.94678 15.7154 9.61099 15.7154 9.19678H14.9654ZM14.8804 9.19678H14.1304C14.1304 9.61099 14.4662 9.94678 14.8804 9.94678V9.19678ZM9.31005 14.5243C9.09204 14.1721 8.62979 14.0633 8.2776 14.2813C7.9254 14.4994 7.81662 14.9616 8.03463 15.3138L9.31005 14.5243ZM15.9661 15.3138C16.1842 14.9616 16.0754 14.4994 15.7232 14.2813C15.371 14.0633 14.9087 14.1721 14.6907 14.5243L15.9661 15.3138ZM21.6004 11.9999H20.8504C20.8504 16.8876 16.8881 20.8499 12.0004 20.8499V21.5999V22.3499C17.7165 22.3499 22.3504 17.716 22.3504 11.9999H21.6004ZM12.0004 21.5999V20.8499C7.11267 20.8499 3.15039 16.8876 3.15039 11.9999H2.40039H1.65039C1.65039 17.716 6.28424 22.3499 12.0004 22.3499V21.5999ZM2.40039 11.9999H3.15039C3.15039 7.11218 7.11267 3.1499 12.0004 3.1499V2.3999V1.6499C6.28424 1.6499 1.65039 6.28375 1.65039 11.9999H2.40039ZM12.0004 2.3999V3.1499C16.8881 3.1499 20.8504 7.11218 20.8504 11.9999H21.6004H22.3504C22.3504 6.28375 17.7165 1.6499 12.0004 1.6499V2.3999ZM9.12039 9.1199V9.8699H9.21601V9.1199V8.3699H9.12039V9.1199ZM14.8804 9.1199V9.8699H14.9654V9.1199V8.3699H14.8804V9.1199ZM9.21601 9.1199H8.46601V9.19678H9.21601H9.96601V9.1199H9.21601ZM9.21601 9.19678V8.44678H9.12039V9.19678V9.94678H9.21601V9.19678ZM9.12039 9.19678H9.87039V9.1199H9.12039H8.37039V9.19678H9.12039ZM14.9654 9.1199H14.2154V9.19678H14.9654H15.7154V9.1199H14.9654ZM14.9654 9.19678V8.44678H14.8804V9.19678V9.94678H14.9654V9.19678ZM14.8804 9.19678H15.6304V9.1199H14.8804H14.1304V9.19678H14.8804ZM12.0004 16.7998V16.0498C10.8783 16.0498 9.88263 15.4493 9.31005 14.5243L8.67234 14.9191L8.03463 15.3138C8.86193 16.6503 10.3242 17.5498 12.0004 17.5498V16.7998ZM15.3284 14.9191L14.6907 14.5243C14.1181 15.4493 13.1225 16.0498 12.0004 16.0498V16.7998V17.5498C13.6766 17.5498 15.1388 16.6503 15.9661 15.3138L15.3284 14.9191Z' fill='%232B2B2B'/%3E%3C/svg%3E");
  }
}
</style>
