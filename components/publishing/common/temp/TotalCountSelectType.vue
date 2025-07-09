<template>
  <div class="c-count-box">
    <div>
      총 <strong>{{ count }}</strong
      >건
    </div>
    <!-- 버튼 타입 -->

    <div class="select-option select-type">
      <Select
        modal-title="조회하기"
        transparent="true"
        model-value="3month"
        :custom-opts="[
          { value: '3month', label: '3개월' },
          { value: '6month', label: '6개월' }
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Props 정의가 필요한 경우 추가할 수 있습니다.
import Select from '~/components/publishing/input/Select.vue'

const props = withDefaults(
  defineProps<{
    count?: number
  }>(),
  {
    count: 0
  }
)
</script>

<style scoped lang="scss">
.c-count-box {
  display: flex;
  flex-direction: row;
  .select-option {
    display: flex;
    flex-direction: row;
    gap: 0 1.2rem;
    margin-left: auto;
    &.btn-type {
      .select-item {
        font-size: 1.6rem;
        font-weight: 500;
        &.active {
          color: vars.$blue-primary;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
