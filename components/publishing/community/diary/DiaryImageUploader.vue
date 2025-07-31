<template>
  <div class="diary-image-uploader">
    <!-- InputImage 컴포넌트 사용 -->
    <InputImage
      v-model="selectedFiles"
      :multiple="true"
      :max-files="maxImages"
      :max-file-size="5 * 1024 * 1024"
      :show-icon="true"
      icon-type="ico-image"
      icon-size="2.4rem"
      @file-selected="handleFileSelected"
      @file-removed="handleFileRemoved"
      @error="handleError"
    />
    <!-- 하단 등록 버튼 -->
    <div class="bottom-actions">
      <button type="button" class="register-btn" @click="$emit('register')">
        {{ registerButtonText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import InputImage from '~/components/publishing/input/InputImage.vue'

interface Props {
  modelValue: string[]
  registerButtonText?: string
  maxImages?: number
}

interface Emits {
  (e: 'update:modelValue', value: string[]): void
  (e: 'register'): void
  (e: 'image-limit-exceeded'): void
}

const props = withDefaults(defineProps<Props>(), {
  registerButtonText: '완료',
  maxImages: 3
})

const emit = defineEmits<Emits>()

// File 객체들을 관리
const selectedFiles = ref<File[]>([])

// Base64 문자열들을 관리 (기존 modelValue와 호환)
const selectedImages = ref<string[]>([])

// modelValue와 selectedImages 동기화
watch(() => props.modelValue, (newValue) => {
  selectedImages.value = [...newValue]
}, { immediate: true })

// selectedImages가 변경되면 부모에게 알림
watch(selectedImages, (newValue) => {
  emit('update:modelValue', [...newValue])
}, { deep: true })

// 파일이 선택되었을 때 처리
const handleFileSelected = (files: File[]) => {
  // Base64로 변환하여 selectedImages에 추가
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedImages.value.push(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  })
}

// 파일이 제거되었을 때 처리
const handleFileRemoved = (index: number) => {
  selectedImages.value.splice(index, 1)
}

// 에러 처리
const handleError = (message: string) => {
  if (message.includes('최대')) {
    emit('image-limit-exceeded')
  } else {
    // 다른 에러는 콘솔에 출력하거나 토스트로 표시
    console.error('이미지 업로드 오류:', message)
  }
}
</script>

<style lang="scss" scoped>
.diary-image-uploader {
  display:flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.6rem;
  background:#fff 
}

.bottom-actions {
  display: flex;
  gap: 1rem;
}

.register-btn {
  flex: 1;
  
  border-radius: 0.8rem;
  color: #4C7FF7;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #3d6bd8;
  }
}
</style> 