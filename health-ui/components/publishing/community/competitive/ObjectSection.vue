<template>
  <FlexRowDiv class="object-section">
    <ShadowCard card-class="heart-card">
      <FlexRowDiv class="">
        <p>심박수</p>
        <i class="icon"></i>
      </FlexRowDiv>
      <strong>85bpm</strong>
    </ShadowCard>
    <ShadowCard card-class="oxygen-card">
      <FlexRowDiv class="">
        <p>산소포화도</p>
        <i class="icon"></i>
      </FlexRowDiv>
      <strong>85bpm</strong>
    </ShadowCard>
    <ShadowCard card-class="severity-card">
      <FlexRowDiv class="">
        <p>심박변이도</p>
        <i class="icon"></i>
      </FlexRowDiv>
      <strong>85bpm</strong>
    </ShadowCard>
    <ShadowCard card-class="stress-card">
      <FlexRowDiv class="">
        <p>스트레스</p>
        <i class="icon"></i>
      </FlexRowDiv>
      <strong>85bpm</strong>
    </ShadowCard>
    <ShadowCard card-class="cheer-card">
      <FlexRowDiv class="">
        <p>이번 달 응원 수</p>
        <i class="icon"></i>
      </FlexRowDiv>
      <strong>85bpm</strong>
    </ShadowCard>
    <ShadowCard card-class="today-card">
      <FlexRowDiv class="">
        <p>Today 게시글</p>
        <i class="icon"></i>
      </FlexRowDiv>
      <strong>85bpm</strong>
    </ShadowCard>
    <ShadowCard card-class="keyword-card">
      <FlexRowDiv class="">
        <p>인기 키워드</p>
        <i class="icon"></i>
      </FlexRowDiv>
      <strong>85bpm</strong>
    </ShadowCard>
  </FlexRowDiv>
</template>
<script setup lang="ts">
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import ShadowCard from '~/components/publishing/card/ShadowCard.vue'
</script>
<style scoped lang="scss">
.object-section {
  gap: 1.2rem;
  flex-wrap: wrap;
  .shadow-card {
    & > div {
      justify-content: space-between;
    }
    flex: 0 0 calc(50% - 0.6rem);
    &:last-child {
      flex: 1 1 100%;
    }
    i {
      display: block;
      width: 2.4rem;
      height: 2.4rem;
      background: red;
    }
    &.heart-card {
    }
    &.oxygen-card {
    }
    &.severity-card {
    }
    &.stress-card {
    }
    &.cheer-card {
    }
    &.today-card {
    }
    &.keyword-card {
    }
  }
}
</style>
