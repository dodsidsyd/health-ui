<template>
  <div class="step-chart">
    <div class="chart-bars">
      <div v-for="(item, index) in chartData" :key="index" class="bar-item">
        <div
          class="bar"
          :style="{
            height: `${item.height}px`,
            background: item.isActive ? 'var(--MainColor, #2F6AF2)' : '#D9D9D9'
          }"
        ></div>
        <div class="bar-label" :style="{ color: item.labelColor || '#111111' }">
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="chart-unit">걸음수/일</div>
  </div>
</template>

<script setup lang="ts">
const chartData = [
  { height: 90, label: '10', isActive: true, labelColor: '#3B88C3' },
  { height: 77, label: '11', isActive: true, labelColor: '#1B80E4' },
  { height: 39, label: '12', isActive: false },
  { height: 74, label: '13', isActive: true },
  { height: 65, label: '14', isActive: true },
  { height: 77, label: '15', isActive: true },
  { height: 55, label: '16', isActive: false }
]
</script>

<style scoped lang="scss">
.step-chart {
  width: 100%;
  height: 100%;
  padding: 15px 10px;
  position: relative;
  background: #f8f8f8;
  display: inline-flex;
  justify-content: space-between;
  align-items: flex-end;

  .chart-bars {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;

    .bar-item {
      flex: 1;
      display: inline-flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      gap: 11px;

      .bar {
        width: 12px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      .bar-label {
        align-self: stretch;
        height: 8px;
        text-align: center;
        color: #111111;
        font-size: 12px;
        font-family: 'Noto Sans';
        font-weight: 700;
        line-height: 20px;
      }
    }
  }

  .chart-unit {
    position: absolute;
    width: 77px;
    right: 10px;
    top: 11px;
    text-align: right;
    color: #999999;
    font-size: 10px;
    font-family: 'Noto Sans KR';
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
