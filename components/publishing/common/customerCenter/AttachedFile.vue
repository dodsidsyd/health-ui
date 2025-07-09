<template>
  <div>
    <span class="c-label"
      >문의내용
      <span class="required-mark">*</span>
    </span>
    <div class="file-upload-container">
      <input ref="fileInput" type="file" :id="inputId" style="display: none" aria-label="파일 선택" />
      <label :for="inputId" class="file-upload-button">
        <span class="icon"></span>
        <span class="button-text">파일첨부</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  inputId: {
    type: String,
    default: 'file-attached'
  }
})
</script>

<style lang="scss" scoped>
.c-label {
  font-size: 1.2rem;
}
.file-upload-container {
  display: block;
  width: 100%;
  height: 5.6rem;
  background: #f9f9f9;
  border: 0.1rem dashed #e2e2e2;
  border-radius: 0.8rem;
}

.file-upload-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  line-height: 5.6rem;
  color: var(--gray-11);
  cursor: pointer;
  @include mixin.rippleEffectPrimary;
  &:hover,
  &:active {
    background-color: #f0f0f0;
  }
  .icon {
    display: inline-block;
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 0.4rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='18' viewBox='0 0 19 18' fill='none'%3E%3Cpath d='M3.5 11.4033V14.1694C3.5 14.5886 3.65804 14.9906 3.93934 15.287C4.22064 15.5835 4.60218 15.75 5 15.75H14C14.3978 15.75 14.7794 15.5835 15.0607 15.287C15.342 14.9906 15.5 14.5886 15.5 14.1694V11.4033M9.50056 11.2069L9.50056 2.25M9.50056 2.25L6.07199 5.67238M9.50056 2.25L12.9291 5.67238' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }
}
</style>
