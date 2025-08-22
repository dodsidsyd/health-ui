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
       :show-preview="false"
       :current-image-count="props.modelValue.length"
       :enable-limit-check="true"
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

// modelValue와 selectedFiles 동기화
watch(() => props.modelValue, (newValue) => {
  // Base64 문자열들을 File 객체로 변환 (실제로는 사용하지 않음)
  selectedFiles.value = []
}, { immediate: true })

// 파일이 선택되었을 때 처리
const handleFileSelected = (files: File[]) => {
  // 현재 이미지 개수 + 새로 선택된 파일 개수 체크
  const totalImages = props.modelValue.length + files.length
  
  if (totalImages > props.maxImages) {
    emit('image-limit-exceeded')
    return
  }

  // 모든 파일을 한 번에 Base64로 변환하여 부모에게 전달
  const promises = files.map(file => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    })
  })

  Promise.all(promises).then(base64DataArray => {
    // 중복 방지를 위해 기존 이미지와 새 이미지를 합치되, 중복 제거
    const currentImages = [...props.modelValue]
    const newImages = base64DataArray.filter(newImage => 
      !currentImages.some(existingImage => existingImage === newImage)
    )
    currentImages.push(...newImages)
    emit('update:modelValue', currentImages)
  })
}

// 파일이 제거되었을 때 처리
const handleFileRemoved = (index: number) => {
  const currentImages = [...props.modelValue]
  currentImages.splice(index, 1)
  emit('update:modelValue', currentImages)
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