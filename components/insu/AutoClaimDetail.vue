<template>
  <div class="wrap-claim-detail">
    <div class="tit-detail">자동청구 내용</div>
    <div class="detail-list">
      <div v-for="(item, index) in claimDetails" :key="index" class="item-box">
        <div v-if="item.type === 'text'" class="item">
          <div class="tit">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
        <div v-else-if="item.type === 'select'" class="item item-select">
          <div class="tit">{{ item.title }}</div>
          <Select
            class="select-claim"
            :modal-title="item.title"
            select-placeholder="선택"
            :custom-opts="item.options"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Select from '~/components/publishing/input/Select.vue'

// Text 타입
interface TextItem {
  type: 'text'
  title: string
  desc: string
}

// Select 타입
interface SelectItem {
  type: 'select'
  title: string
  options: { value: string; label: string }[]
}

export type ClaimDetailItem = TextItem | SelectItem

defineProps({
  claimDetails: {
    type: Array as PropType<ClaimDetailItem[]>,
    required: true
  }
})
</script>

<style scoped lang="scss">
.wrap-claim-detail {
  margin-top: 1.2rem;
  border-radius: 1.2rem;
  border: 0.1rem solid #e2e2e2;
  padding: 2rem;
  .tit-detail {
    font-size: 1.4rem;
    font-weight: 700;
  }
  .detail-list {
    margin-top: 1.2rem;
    .item-box {
      &:not(:first-child) {
        margin-top: 1.2rem;
      }
    }
    .item {
      @include mixin.flex-container(justify-between items-center);
      &.item-select {
        flex-direction: column;
        align-items: flex-start;
      }
      .tit {
        font-size: 1.3rem;
        font-weight: 500;
        color: #959595;
      }
      .desc {
        font-size: 1.4rem;
        font-weight: 600;
        text-align: right;
      }
    }
  }
  .select-claim {
    margin-top: 1.2rem;
  }
}
</style>
