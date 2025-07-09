<template>
  <BaseBody  style="background-color: lightgray">
    <div>Today 친구랭킹 (임시페이지)</div>
    <RankItem nickname="곰탱이" real-name="강*현" location="서울 금천" :steps="6876" :distance="4.84" :rank="3" />
    <RankItem nickname="유교맨" real-name="김*용" location="인천 미추홀" :steps="6876" :distance="4.84" :rank="3" />
    <RankItem nickname="유교맨" real-name="김*용" location="인천 미추홀" :steps="6876" :distance="4.84" :rank="3" />
    <RankItem nickname="유교맨" real-name="김*용" location="인천 미추홀" :steps="6876" :distance="4.84" :rank="3" />

    <Test
      :intake-calorie="100"
      :basal-metabolic-rate="100"
      :burned-calorie="100"
      :target-calorie="1000"
      :current-time="new Date().toISOString()"
      :target-range-min="100"
      :target-range-max="100"
    />

    <div style="width: 100%; height: 100px; background-color: white">
      <SingleBar :value="10" :percentage="70" />
      <SingleBar :value="100" :percentage="70" />
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import RankItem from '~/components/walking/RankItem.vue'
import Test from '~/components/walking/Test.vue'
import SingleBar from '~/components/common/chart/SingleBar.vue'
</script>

<style scoped lang="scss"></style>
