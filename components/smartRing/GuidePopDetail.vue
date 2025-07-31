<template>
  <div class="guide-item-box">
    <ul class="guide-list">
      <li v-for="(item, index) in listItems" :key="index">
        {{ item }}
      </li>
    </ul>
    <TableWrap :table-data="tableData" />
    <div class="additional-box">
      <p>{{ title }}</p>
      <ul class="additional-guide-list">
        <li v-for="(item, index) in additionalItems" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import TableWrap from '~/components/common/tableWrap.vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  listItems: {
    type: Array as () => string[],
    default: () => []
  },
  additionalItems: {
    type: Array as () => string[],
    default: () => []
  },
  tableData: {
    type: Object as () => { headers: any[]; body: any[] },
    required: true
  }
})
</script>

<style scoped lang="scss">
.guide-item-box {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 0 0 3.2rem;

  :deep(table th),
  :deep(table td) {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.6rem;
    color: #555;
  }
  :deep(table td:last-child) {
    text-align: left;
  }
  :deep(.level-badge) {
    &.purple {
      background-color: #dcd5ff;
      color: #17009c;
    }
    &.blue {
      background-color: #e0e9ff;
      color: #002988;
    }
    &.yellow {
      background-color: #faeaa9;
      color: #5d4a00;
    }
    &.orange {
      background-color: #ffdab7;
      color: #b42800;
    }
    &.green {
      background-color: #e2edbb;
      color: #314a00;
    }
    &.red-deep {
      background-color: #ffc6c6;
      color: #850000;
    }
  }
  :deep(.highlight-txt) {
    margin-bottom: 0.4rem;
    font-weight: 600;
  }
}
.guide-list {
  text-align: left;
  li {
    position: relative;
    margin-bottom: 1.2rem;
    padding-left: 0.9rem;
    font-size: 1.4rem;
    line-height: 2rem;
    &:last-child {
      margin-bottom: 0;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0.9rem;
      height: 2rem;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='20' viewBox='0 0 9 20' fill='none'%3E%3Ccircle cx='1.5' cy='10.5' r='1.5' fill='%23959595'/%3E%3C/svg%3E")
        center top / 0.9rem 2rem no-repeat;
    }
  }
}
.additional-box {
  padding: 2rem;
  background: #f4f4f4;
  border-radius: 1.2rem;
  p {
    text-align: left;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
  }
}
.additional-guide-list {
  margin-top: 1.2rem;
  text-align: left;
  li {
    position: relative;
    margin-bottom: 1.2rem;
    padding-left: 0.9rem;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.6rem;
    color: #555;
    &:last-child {
      margin-bottom: 0;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0.9rem;
      height: 1.6rem;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='16' viewBox='0 0 9 16' fill='none'%3E%3Ccircle cx='1.5' cy='8.5' r='1.5' fill='%23959595'/%3E%3C/svg%3E")
        center top / 0.9rem 1.6rem no-repeat;
    }
  }
}
</style>
