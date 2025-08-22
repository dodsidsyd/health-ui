<template>
  <div class="c-input-image">
    <div class="c-inpType">
      <label v-if="label" :for="inputId" :class="['c-label', labelClass]" :style="{ fontSize: labelSize }">
        <template v-if="hasRequiredMark">
          <span v-for="(part, index) in labelParts" :key="index">
            <span v-if="part === '*'" class="required-mark">*</span>
            <span v-else>{{ part }}</span>
          </span>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </label>

      <div class="c-inp-el" :class="{ lg: props.size === 'lg', sm: props.size === 'sm' }">
        <!-- 이미지 미리보기 영역 (showPreview가 true일 때만 표시) -->
        <div v-if="showPreview && previewImages.length > 0" class="image-preview-container">
          <div v-for="(image, index) in previewImages" :key="index" class="image-preview-item">
            <img :src="image" :alt="`미리보기 이미지 ${index + 1}`" />
            <button type="button" class="remove-image-btn" @click="removeImage(index)" aria-label="이미지 제거">
              <i class="icon ico-close"></i>
            </button>
          </div>
        </div>

        <!-- 파일 입력 영역 -->
        <div class="file-input-area">
          <input
            :id="inputId"
            ref="fileInput"
            type="file"
            accept="image/*"
            v-bind="multiple ? { multiple: true } : {}"
            :disabled="disabled"
            :class="['c-file-inp', { 'is-invalid': isInvalid }]"
            @change="handleFileSelect"
            @click="handleInputClick"
          />

          <!-- 커스텀 버튼 -->
          <button
            type="button"
            class="upload-btn"
            :disabled="disabled || (maxFiles && previewImages.length >= maxFiles)"
            @click="triggerFileInput"
          >
            <i v-if="showIcon" :class="['icon', iconType]" :style="{ width: iconSize, height: iconSize }"></i>
            <span v-if="uploadButtonText">{{ uploadButtonText }}</span>
          </button>
        </div>
      </div>

      <!-- 에러 메시지 -->
      <p v-if="isInvalid" class="feedback error">
        <span class="text">{{ validText }}</span>
      </p>

      <!-- 도움말 텍스트 -->
      <p v-if="helpText" class="help-text">{{ helpText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface FileInfo {
  file: File
  preview: string
}

const props = defineProps({
  label: { type: String, default: '' },
  labelSize: { type: String, default: '1.2rem' },
  labelClass: { type: String, default: '' },
  name: { type: String, default: '' },
  modelValue: { type: Array as () => File[], default: () => [] },
  multiple: { type: Boolean, default: false },
  maxFiles: { type: Number, default: null },
  maxFileSize: { type: Number, default: 5 * 1024 * 1024 }, // 5MB 기본값
  disabled: { type: Boolean, default: false },
  isInvalid: { type: Boolean, default: false },
  validText: { type: String, default: '이미지 업로드 오류' },
  helpText: { type: String, default: '' },
  uploadButtonText: { type: String, default: '' },
  showIcon: { type: Boolean, default: true },
  iconType: { type: String, default: 'ico-image' },
  iconSize: { type: String, default: '2.4rem' },
  size: { type: String, validator: (value: string) => ['lg', 'sm', 'normal'].includes(value), default: 'normal' },
  showPreview: { type: Boolean, default: true },
  currentImageCount: { type: Number, default: 0 },
  enableLimitCheck: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'file-selected', 'file-removed', 'error'])

const fileInput = ref<HTMLInputElement>()
const selectedFiles = ref<File[]>([])
const previewImages = ref<string[]>([])

// 고유 ID 생성
const inputId = computed(() => `image-input-${Math.random().toString(36).substr(2, 9)}`)

// 필수 표시 처리
const hasRequiredMark = computed(() => props.label.includes('*'))
const labelParts = computed(() => {
  if (!hasRequiredMark.value) return [props.label]
  return props.label.split('*')
})

// 파일 선택 처리
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (!files || files.length === 0) return

  const newFiles = Array.from(files)

  // 파일 개수 제한 확인 (부모의 현재 이미지 개수 + 새로 선택된 파일 개수)
  if (props.maxFiles && props.modelValue.length + newFiles.length > props.maxFiles) {
    emit('error', `최대 ${props.maxFiles}개까지 업로드 가능합니다.`)
    return
  }

  // 파일 유효성 검사
  for (const file of newFiles) {
    if (!file.type.startsWith('image/')) {
      emit('error', '이미지 파일만 업로드 가능합니다.')
      return
    }

    if (file.size > props.maxFileSize) {
      emit('error', `파일 크기는 ${formatFileSize(props.maxFileSize)} 이하여야 합니다.`)
      return
    }
  }

  // 파일 추가
  selectedFiles.value.push(...newFiles)

  // 미리보기 생성
  newFiles.forEach(file => {
    const reader = new FileReader()
    reader.onload = e => {
      previewImages.value.push(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  })

  // 부모 컴포넌트에 업데이트
  emit('update:modelValue', [...selectedFiles.value])
  emit('file-selected', newFiles)

  // 입력 초기화
  target.value = ''
}

// 파일 입력 트리거
const triggerFileInput = () => {
  // 파일 개수 제한 확인 (enableLimitCheck가 true일 때만 체크)
  if (props.enableLimitCheck && props.maxFiles && props.currentImageCount >= props.maxFiles) {
    emit('error', `최대 ${props.maxFiles}개까지 업로드 가능합니다.`)
    return
  }

  fileInput.value?.click()
}

// 입력 클릭 처리
const handleInputClick = () => {
  // 파일 개수 제한 확인 (enableLimitCheck가 true일 때만 체크)
  if (props.enableLimitCheck && props.maxFiles && props.currentImageCount >= props.maxFiles) {
    emit('error', `최대 ${props.maxFiles}개까지 업로드 가능합니다.`)
    return
  }
}

// 이미지 제거
const removeImage = (index: number) => {
  selectedFiles.value.splice(index, 1)
  previewImages.value.splice(index, 1)

  emit('update:modelValue', [...selectedFiles.value])
  emit('file-removed', index)
}

// 파일 크기 포맷팅
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// modelValue 변경 감지
watch(
  () => props.modelValue,
  newValue => {
    if (newValue.length !== selectedFiles.value.length) {
      selectedFiles.value = [...newValue]
      // 미리보기 재생성
      previewImages.value = []
      newValue.forEach(file => {
        const reader = new FileReader()
        reader.onload = e => {
          previewImages.value.push(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      })
    }
  },
  { deep: true }
)

// 컴포넌트 초기화
watch(
  () => props.modelValue,
  newValue => {
    selectedFiles.value = [...newValue]
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.c-inpType {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.c-label {
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  line-height: 1.4;

  .required-mark {
    color: #ff4757;
  }
}

.c-inp-el {
  position: relative;

  &.lg {
    .upload-btn {
      padding: 1.6rem 2rem;
      font-size: 1.6rem;
    }
  }

  &.sm {
    .upload-btn {
      padding: 0.8rem 1.2rem;
      font-size: 1.2rem;
    }
  }
}

.c-file-inp {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
}

.file-input-area {
  position: relative;
  height: 2.4rem;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.image-preview-item {
  position: relative;
  width: 12rem;
  height: 12rem;
  border-radius: 0.8rem;
  overflow: hidden;
  border: 0.1rem solid #e9ecef;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .remove-image-btn {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    width: 2.4rem;
    height: 2.4rem;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }

    .icon {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
}

.feedback {
  margin: 0.4rem 0 0 0;
  font-size: 1.2rem;
  line-height: 1.4;

  &.error {
    color: #dc3545;
  }

  .text {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    &::before {
      content: '⚠';
      font-size: 1.4rem;
    }
  }
}

.help-text {
  margin: 0.4rem 0 0 0;
  font-size: 1.2rem;
  color: #6c757d;
  line-height: 1.4;
}

.is-invalid {
  border-color: #dc3545 !important;

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
  }
}
</style>
