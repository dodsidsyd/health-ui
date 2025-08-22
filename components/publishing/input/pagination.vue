<template>
  <nav class="pagination" aria-label="Pagination">
    <ul class="pagination-list">
      <li class="pagination-item">
        <button
          class="move-page prev"
          :disabled="currentPage === 1"
          aria-label="이전페이지"
          @click="changePage(currentPage - 1)"
        ></button>
      </li>

      <li v-for="page in totalPages" :key="page" class="pagination-item">
        <button
          class="pagination-link"
          :class="{ 'is-active': page === currentPage }"
          :aria-current="page === currentPage ? 'page' : null"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </li>

      <li class="pagination-item">
        <button
          class="move-page next"
          :disabled="currentPage === totalPages"
          aria-label="다음페이지"
          @click="changePage(currentPage + 1)"
        ></button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalItems: {
    type: Number,
    default: 5
  },
  itemsPerPage: {
    type: Number,
    default: 1
  },
  currentPage: {
    type: Number,
    default: 3
  }
})

const emit = defineEmits(['update:currentPage'])

// 총 페이지 수
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})
// 페이지 변경 함수
const changePage = page => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  .pagination-list {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
  }
  .pagination-item {
    height: 3.2rem;
  }
  .move-page {
    width: 3.2rem;
    height: 3.2rem;
    transition: all 0.2s ease;
    background: url("data:image/svg+xml,%0A%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 17L10 12L15 7' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")
      center / 2.4rem no-repeat;
    &:disabled {
      background-image: url("data:image/svg+xml,%0A%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 17L10 12L15 7' stroke='%23D5D5D5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    }
    &.next {
      background: url("data:image/svg+xml,%0A%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 17L15 12L10 7' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")
        center / 2.4rem no-repeat;
      &:disabled {
        background-image: url("data:image/svg+xml,%0A%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 17L15 12L10 7' stroke='%23D5D5D5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      }
    }
  }
  .pagination-link {
    width: 3.2rem;
    height: 3.2rem;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #212936;
    &.is-active {
      background-color: #e7f4ff;
      border-radius: 0.4rem;
      color: var(--blue-primary);
      font-weight: bold;
    }
  }
}
</style>
