<template>
  <h1>ApexChart (https://apexcharts.com/)</h1>
  <div style="width: 100%; height: 10px">
    <section>
      <h2>StackedBarChart</h2>
      <StackedBarChart />
    </section>

    <section>
      <h2>AreaChart case1</h2>
      <AreaChart />
      <h2>AreaChart case2</h2>
      <AreaChart :datas="[
    {
      //default sample data
      name: '2024년 매출',
      data: [10, 41, 35, 51, 80, 62, 69, 91, 125]
    }
  ]"/>
    </section>

    <section>
      <h2>BarChart</h2>
      <BarChart />
    </section>


    <section>
      <h2>RadarChart</h2>
      <RadarChart />
    </section>
  </div>
</template>
<script setup lang="ts">
import AreaChart from '~/components/chart/AreaChart.vue'
import BarChart from '~/components/chart/BarChart.vue'
import RadarChart from '~/components/chart/RadarChart.vue'
import StackedBarChart from '~/components/chart/StackedBarChart.vue'
</script>
<style scoped></style>
