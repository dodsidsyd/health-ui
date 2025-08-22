<template>
  <div class="diary-health-mission">
    <h5 class="mission-date">2025년 3월 6일 건강미션</h5>
    <!-- 미션 아이템 리스트 -->
    <FlexColDiv class="gap-24">
      <DiaryMissionItem />
      <DiaryMissionItem />
      <DiaryMissionItem />
    </FlexColDiv>

    <!-- 차감된 건강부채 & 레몬지수 -->
    <HealthDebtInfo />

    <!-- 완료된 맞춤미션 없음 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="" class="img" />
      <div class="tit">완료된 맞춤미션이 없어요</div>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'

import DiaryMissionItem from '~/components/publishing/healthDebt/DiaryMissionItem.vue'
import HealthDebtInfo from '~/components/publishing/healthDebt/HealthDebtInfo.vue'
</script>
<style lang="scss" scoped>
.diary-health-mission {
  display: flex;
  flex-direction: column;
  gap: 2.4rem 0;
  .mission-date {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 140%;
    color: #2b2b2b;
  }
  .wrap-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
    padding: 3.2rem 0;
    text-align: center;
    color: #555;
    .img {
      width: 8rem;
      height: 8rem;
    }
    .tit {
      font-size: 1.8rem;
      font-weight: 500;
      line-height: 140%;
    }
  }
}
</style>
