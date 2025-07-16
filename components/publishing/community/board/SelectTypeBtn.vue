<template>
  <div>
    <legend>{{ legend }}</legend>
    <button
      :class="['category-select-btn', { 'is-placeholder': !displayLabel, 'is-modal-open': isModalOpen }]"
      @click="emit('click')"
    >
      <span v-if="displayLabel"> {{ displayLabel }}</span>
      <span v-else>{{ placeholder }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  legend: {
    type: String,
    default: ''
  },
  displayLabel: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '게시판을 선택해주세요'
  },
  isModalOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
</script>

<style scoped lang="scss">
legend {
  margin-bottom: 0.6rem;
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: #555;
}
.category-select-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 4.8rem;
  padding: 1rem 1.5rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 0.8rem;
  background-color: #fff;
  font-size: 1.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: #4c7ff7;
    background-color: #f6f9ff;
  }
  &.is-placeholder {
    color: #959595;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 1.5rem;
    width: 2.4rem;
    height: 2.4rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10L12.0008 14.58L17 10' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    transform: translateY(-50%);
  }
  &.is-modal-open::after {
    transform: translateY(-50%) rotate(180deg);
  }
}
</style>
