<template>
  <div class="alarm-setting">
    <InputLabelText label="알림" />
    <div class="alaram-list">
      <Radio id="rdoAlaram1" name="rdo" custom-style="button small" aria-label="10분 전" />
      <Radio id="rdoAlaram2" name="rdo" custom-style="button small" aria-label="30분 전" />
      <Radio id="rdoAlaram3" name="rdo" custom-style="button small" aria-label="1시간 전" />
      <Radio id="rdoAlaram4" name="rdo" custom-style="button small" aria-label="1일 전(24시간)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Radio from '~/components/publishing/input/radio.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
</script>
<style lang="scss" scoped>
.alaram-list {
  margin-top: 0.6rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
  :deep(.c-radiotype.button .c-label) {
    width: 100%;
    font-size: 1.4rem;
  }
}
@media (max-width: 480px) {
  .alaram-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
