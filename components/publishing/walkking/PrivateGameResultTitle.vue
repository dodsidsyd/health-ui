<template>
  <div class="result-title-wrap">
    <h2>{{ title }}</h2>
    <p>{{ date }}</p>
    <div class="contents-wrap">
      <dl class="contents-box">
        <dt>게임방식</dt>
        <dd v-if="hasGoal">먼저목표 도달하기</dd>
        <dd v-else>무조건많이걷기</dd>
      </dl>
      <dl v-if="hasGoal" class="contents-box">
        <dt>목표걸음 수</dt>
        <dd>{{ goal }}</dd>
      </dl>
      <dl class="contents-box">
        <dt>최하위가</dt>
        <dd>{{ forfeit }}</dd>
      </dl>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: '' },
  date: { type: String, default: '' },
  hasGoal: { type: Boolean, default: true },
  goal: { type: String, default: '' },
  forfeit: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
.result-title-wrap {
  margin-top: 2rem;
  h2 {
    margin-bottom: 0.4rem;
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 2.9rem;
  }
  p {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #555;
  }
}
.contents-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 2.4rem;
  .contents-box {
    flex: 1;
    font-size: 1.4rem;
    dt {
      line-height: 2.5rem;
      color: #959595;
    }
    dd {
      font-weight: 600;
      line-height: 2rem;
    }
  }
}
</style>
