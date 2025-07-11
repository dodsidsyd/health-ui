<template>
  <div class="attached-file-item">
    <span class="file-name">{{ fileName }}</span>
    <div class="flex align-center">
      <span class="file-size">{{ fileSize }}</span>
      <button class="icon close"></button>
    </div>
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
    flex: 1;
    color: var(--gray-16);
    word-break: break-all;
  }
  .flex.align-center {
    flex-shrink: 0;
  }
  .file-size {
    flex-shrink: 0;
    color: var(--gray-17);
    text-align: right;
    font-size: 1.3rem;
    flex-shrink: 0;
  }
  & + .attached-file-item {
    border-top: 0.1rem solid #e2e2e2;
  }
  button {
    width: 2.4rem;
    height: 2.4rem;
    margin-left: 1.2rem;
    flex-shrink: 0;
  }
}
</style>
