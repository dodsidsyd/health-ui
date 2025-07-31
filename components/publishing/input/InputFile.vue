<template>
  <div class="file-upload-container">
    <label class="btn-attach" for="file-upload">
      <input
        id="file-upload"
        ref="fileInputRef"
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        multiple
        @change="handleFileChange"
      />
      <img src="/assets/images/community/icon-camera.svg" alt="사진첨부 아이콘" />
      <span class="text">사진첨부</span>
    </label>

    <!-- 첨부된 이미지 리스트 -->
    <div v-if="attachedFiles.length > 0" class="attached-files">
      <div class="file-list">
        <div
          v-for="(file, index) in attachedFiles"
          :key="index"
          class="file-item"
          :class="{ 'is-image': isImageFile(file.file) }"
        >
          <!-- 이미지 미리보기 -->
          <div v-if="isImageFile(file.file)" class="image-preview">
            <img :src="file.preview" alt="이미지 미리보기" />
          </div>
          <!-- 비이미지 파일 아이콘 -->
          <div v-else class="file-icon">
            <i class="icon file-doc"></i>
          </div>

          <button type="button" class="btn-remove" aria-label="파일 삭제" @click="removeFile(index)"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onUnmounted } from 'vue'

interface AttachedFile {
  file: File
  preview?: string
}

// Emits 정의
const emit = defineEmits<{
  filesChanged: [files: File[]]
}>()

// 첨부된 파일 목록
const attachedFiles = ref<AttachedFile[]>([])
const fileInputRef = ref<HTMLInputElement>()

// 파일 선택 처리
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files) {
    Array.from(files).forEach(file => {
      const attachedFile: AttachedFile = { file }

      // 이미지 파일인 경우 미리보기 URL 생성
      if (isImageFile(file)) {
        attachedFile.preview = URL.createObjectURL(file)
      }

      attachedFiles.value.push(attachedFile)
    })

    // 부모 컴포넌트에 파일 변경 알림
    emitFilesChanged()

    // input 초기화 (같은 파일 재선택 가능)
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  }
}

// 파일 삭제
const removeFile = (index: number) => {
  const removedFile = attachedFiles.value[index]

  // 메모리 누수 방지를 위해 URL 해제
  if (removedFile.preview) {
    URL.revokeObjectURL(removedFile.preview)
  }

  attachedFiles.value.splice(index, 1)
  emitFilesChanged()
}

// 이미지 파일 판별
const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/')
}

// 파일 크기 포맷팅
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 부모 컴포넌트에 파일 변경 사항 전달
const emitFilesChanged = () => {
  const files = attachedFiles.value.map(item => item.file)
  emit('filesChanged', files)
}

// 컴포넌트 언마운트 시 메모리 정리
const cleanup = () => {
  attachedFiles.value.forEach(file => {
    if (file.preview) {
      URL.revokeObjectURL(file.preview)
    }
  })
}

// 외부에서 파일 목록 초기화할 수 있도록 expose
const clearFiles = () => {
  cleanup()
  attachedFiles.value = []
  emitFilesChanged()
}

defineExpose({
  clearFiles,
  attachedFiles: attachedFiles.value
})

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  cleanup()
})
</script>

<style scoped lang="scss">
.file-upload-container {
  width: 100%;
}

.btn-attach {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  height: 5.6rem;
  padding: 0 1.8rem;
  border-radius: 0.8rem;
  background-color: #f9f9f9;
  color: #555;
  font-size: 1.4rem;
  font-weight: 500;
  border: 0.1rem dashed var(--Semantic-Border-BRD-01, #e2e2e2);
  transition: all 0.2s ease;

  [type='file'] {
    width: 0;
    height: 0;
    opacity: 0;
  }
}

.attached-files {
  margin-top: 1.6rem;

  .file-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
  }

  .file-item {
    width: 8rem;
    height: 8rem;
    position: relative;
    .image-preview {
      width: 100%;
      height: 100%;
      border-radius: 0.8rem;
      overflow: hidden;
      border: 0.1rem solid #e2e2e2;
      background: #fff;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .btn-remove {
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      position: absolute;
      right: -0.8rem;
      top: -0.8rem;
      background-color: #4f5561;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M12 6L6 12M12 12L6 6' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>
