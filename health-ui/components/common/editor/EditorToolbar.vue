<template>
  <div class="toolbar">
    <!-- 이미지 업로드 (갤러이 이미지)-->
    <button
      class="toolbar-btn"
      :class="{ disabled: (imageCount || 0) >= 5 }"
      :disabled="(imageCount || 0) >= 5"
      :title="(imageCount || 0) >= 5 ? '최대 5개의 이미지까지 업로드할 수 있습니다.' : '이미지 업로드'"
      @click="$emit('image-upload')"
    >
      📷
    </button>

    <!-- 해시태그 ( # ) -->
    <button class="toolbar-btn" @click="$emit('hashtag')">#</button>

    <!-- 별점 평가 ( 별 이미지 ) -->
    <button class="toolbar-btn" @click="$emit('star')">⭐</button>

    <!-- 건강데이터 (하트 이미지) -->
    <button class="toolbar-btn" @click="$emit('health-data')">❤️</button>
  </div>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'

const props = defineProps<{
  editor: Editor
  hashtag: string[]
  star: number
  healthData: any
  imageCount?: number
}>()

defineEmits<{ 'image-upload': []; hashtag: []; star: []; 'health-data': [] }>()
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  color: #374151;
  position: relative;
}

.toolbar-btn:hover:not(.disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.toolbar-btn.is-active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.toolbar-btn.disabled {
  background: #f3f4f6;
  color: #9ca3af;
  border-color: #d1d5db;
  cursor: not-allowed;
  opacity: 0.6;
}

.toolbar-image-upload {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 600;
}

.toolbar-btn:active:not(.disabled) {
  transform: translateY(1px);
}
</style>
