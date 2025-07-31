<template>
  <NuxtLink :to="diaryLink" class="record-count-card">
    <div class="diary-info">
      <strong class="diary-title">{{ diaryTitle }}</strong>
      <span class="diary-date">{{ diaryDate }}</span>
      <p class="diary-text">{{ diaryText }}</p>
    </div>
  </NuxtLink>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    diaryLink?: string
    diaryTitle?: string
    diaryDate?: string
    diaryText?: string
  }>(),
  {
    diaryLink: '#',
    diaryTitle: '',
    diaryDate: '',
    diaryText: ''
  }
)
</script>
<style lang="scss" scoped>
.record-count-card {
  flex: 1;
  display: flex;
  gap: 1.6rem;
  overflow: hidden;
  flex-direction: column;
  padding: 1.6rem 2rem 2rem;
  border-radius: 2rem;
  background: #f4f4f4;
  .diary-info {
    display: flex;
    flex-direction: column;
    position: relative;
    &:after {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 2.4rem;
      height: 2.4rem;
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 7L15 12L10 17' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;
    }
  }
  .diary-title {
    margin-bottom: 0.5rem;
    font-size: 1.6rem;
    line-height: 2.2rem;
  }
  .diary-date {
    font-weight: 700;
    line-height: 2.2rem;
    color: #4c7ff7;
  }
  .diary-text {
    @include mixin.multi-ellipsis(2);
    margin-top: 1.8rem;
    font-size: 1.8rem;
    line-height: 2.5rem;
    color: #555;
  }
}
</style>
