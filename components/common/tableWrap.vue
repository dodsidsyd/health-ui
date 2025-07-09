<template>
  <table>
    <colgroup>
      <col v-for="(col, colIdx) in tableData.cols" :key="'col' + colIdx" :style="{ width: col.width }" />
    </colgroup>
    <thead>
      <tr v-for="(headerRow, hIdx) in tableData.headers" :key="'h' + hIdx">
        <th
          v-for="(headerCell, hcIdx) in headerRow"
          :key="'hc' + hcIdx"
          :rowspan="headerCell.rowspan || 1"
          :colspan="headerCell.colspan || 1"
        >
          {{ headerCell.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(bodyRow, bIdx) in tableData.body" :key="'b' + bIdx">
        <component
          :is="cell.type === 'th' ? 'th' : 'td'"
          v-for="(cell, cIdx) in bodyRow"
          :key="'bc' + cIdx"
          :rowspan="cell.rowspan || 1"
          :colspan="cell.colspan || 1"
        >
          {{ cell.text }}
        </component>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface TableCell {
  text: string
  rowspan?: number
  colspan?: number
  type?: string
}
interface TableCol {
  width?: string
}
interface TableData {
  cols?: TableCol[]
  headers: TableCell[][]
  body: TableCell[][]
}

const props = defineProps<{
  tableData: TableData
}>()
</script>

<style scoped>
table {
  position: relative;
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0.1rem;
    background-color: #d5d5d5;
  }
  th,
  td {
    padding: 1.2rem;
    text-align: left;
    color: #555;
    font-size: 1.4rem;
    line-height: 2rem;
    border: 0.1rem solid #eee;
    &:first-child {
      border-left-width: 0;
    }
    &:last-child {
      border-right-width: 0;
    }
  }
  th {
    font-weight: 600;
  }
}
</style>
