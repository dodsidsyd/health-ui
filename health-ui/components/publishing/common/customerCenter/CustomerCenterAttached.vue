<template>
  <div class="attached-file-item">
    <span class="file-name">{{ fileName }}</span>
    <span class="file-size">{{ fileSize }}</span>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

interface AttachedFileItemProps {
  fileName: string // 파일명 (예: '문의사항 정리본.pdf')
  fileSize: string // 파일 크기 (예: '33.5MB')
}

// props 정의
const props = defineProps<AttachedFileItemProps>()
</script>

<style scoped lang="scss">
.attached-file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem 1.6rem;
  font-weight: 500;
  .file-name {
    color: var(--gray-16);
    word-break: break-all;
  }
  .file-size {
    color: var(--gray-17);
    text-align: right;
    font-size: 1.3rem;
    flex-shrink: 0;
  }
  & + .attached-file-item {
    border-top: 0.1rem solid #e2e2e2;
  }
}
</style>
