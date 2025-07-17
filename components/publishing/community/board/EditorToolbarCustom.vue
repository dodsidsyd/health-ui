<template>
  <!-- 해당 파일은 원본 Editor / EditorToolbar 에서 가져와 수정 <br />수정사항은 주석으로 표기(ex] 07-17
      description 추가 및 주석처리) -->
  <!-- 07-17 toolbar-wrap 추가 -->
  <div class="toolbar-wrap">
    <div class="toolbar">
      <!-- 이미지 업로드 (갤러이 이미지)-->
      <!-- 07-17 toolbar-btn 클래스에 아이콘 클래스 추가, 이모지 제거 -->
      <button
        class="toolbar-btn icon icon-photo"
        :class="{ disabled: (imageCount || 0) >= 5 }"
        :disabled="(imageCount || 0) >= 5"
        :title="(imageCount || 0) >= 5 ? '최대 5개의 이미지까지 업로드할 수 있습니다.' : '이미지 업로드'"
        @click="$emit('image-upload')"
      ></button>

      <!-- 해시태그 ( # ) -->
      <button class="toolbar-btn icon icon-hashtag" @click="$emit('hashtag')"></button>

      <!-- 별점 평가 ( 별 이미지 ) -->
      <button class="toolbar-btn icon icon-rating" @click="$emit('star')">
        <!-- 07-17 툴팁 추가 -->
        <Transition name="fade">
          <ToolbatBtnTooltip v-if="showTooltip1" :text="'별점 평가를 잊지마세요'" />
        </Transition>
      </button>

      <!-- 건강데이터 (하트 이미지) -->
      <button class="toolbar-btn icon heart-beep-bw" @click="$emit('health-data')">
        <!-- 07-17 툴팁 추가 -->
        <Transition name="fade">
          <ToolbatBtnTooltip v-if="showTooltip2" :text="'여기를 눌러서 건강 데이터를 추가할 수 있어요'"
        /></Transition>
      </button>
    </div>
    <!-- 07-17 등록하기 버튼 추가 -->
    <button type="button" class="regist">등록하기</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import ToolbatBtnTooltip from '~/components/publishing/community/board/ToolbatBtnTooltip.vue'
const props = defineProps<{
  editor: Editor
  hashtag: string[]
  star: number
  healthData: any
  imageCount?: number
}>()

defineEmits<{ 'image-upload': []; hashtag: []; star: []; 'health-data': [] }>()
// tooltip 관련 상태 정의 및 최초 진입시 노출
const showTooltip1 = ref(false)
const showTooltip2 = ref(false)
onMounted(() => {
  showTooltip1.value = true
  setTimeout(() => {
    showTooltip1.value = false
    nextTick(() => {
      showTooltip2.value = true
      setTimeout(() => {
        showTooltip2.value = false
      }, 2500)
    })
  }, 2500)
})
</script>

<style scoped lang="scss">
.toolbar-wrap {
  position: fixed;
  z-index: 200;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.6rem;
  padding: 1.6rem;
  background: #fff;
  border-top: 0.1rem solid #e2e2e2;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 2rem;
  button {
    width: 2.4rem;
    height: 2.4rem;
  }
}
.toolbar-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  color: #374151;
  @include mixin.rippleEffectPrimary;
  overflow: visible;
}
.regist {
  position: relative;
  font-weight: 500;
  line-height: 2.2rem;
  color: var(--blue-primary);
  overflow: hidden;
  @include mixin.rippleEffectPrimary;
}
:deep(.fade-enter-active),
:deep(.fade-leave-active) {
  transition: opacity 1s ease;
}
</style>
