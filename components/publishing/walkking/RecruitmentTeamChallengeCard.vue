<template>
  <div class="walking-challenge-item">
    <div class="challenge-date-limit">
      <strong class="limit-date">D-8</strong>
      <span>모집중</span>
    </div>
    <div class="flex flex-row gap-4">
      <CommonBadge color="blue">개인전</CommonBadge>
      <CommonBadge color="yellow">3,000P</CommonBadge>
      <CommonBadge color="purple">많이걷기</CommonBadge>
    </div>
    <div class="challenge-tit mt-16">
      <div class="challenge-info">
        <strong class="tit">16th 하이워킹 챌린지</strong>
        <span class="during-date">2025.06.15 ~ 06.30</span>
      </div>
    </div>
    <div class="challenge-detail">
      <dl class="reward-info">
        <dt>총 상금</dt>
        <dd>6,224,500P</dd>
        <dd class="increase-amount">+45,000</dd>
      </dl>
      <dl class="recruit-number">
        <dt>참가자</dt>
        <dd>224명</dd>
        <dd class="increase-amount">+28</dd>
      </dl>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  haveRank: { type: Boolean, default: true }
})
</script>
<style lang="scss" scoped>
.walking-challenge-item {
  position: relative;
  padding: 3.2rem 2rem 2rem 2rem;
  background-color: #fadfb7;
  border: 0.1rem solid #eee;
  border-radius: 2rem;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  &::after {
    content: '';
    z-index: 0;
    position: absolute;
    width: 18rem;
    height: 22rem;
    top: 0;
    right: 0;
    background: url(~/assets/images/walkingking/img-walkingking-card2.png) center / contain no-repeat;
  }
}
.challenge-tit {
  display: flex;
  flex-direction: row;
  gap: 0 1.2rem;
  .challenge-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem 0;
    .tit {
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 2.9rem;
    }
    .during-date {
      color: #555;
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
}
.challenge-detail {
  position: relative;
  z-index: 1;
  display: flex;
  margin-top: 4.7rem;
  gap: 1.2rem;
  .reward-info,
  .recruit-number {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
    padding: 1.6rem 2rem 1.2rem;
    background-color: #fff;
    border-radius: 1.2rem;
    box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
    dt {
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 1.6rem;
      color: #555;
    }
    dd {
      font-weight: 700;
      line-height: 2.2rem;
      &.increase-amount {
        font-size: 1.2rem;
        font-weight: 600;
        color: #f14960;
        line-height: 1.6rem;
      }
    }
  }
}

.challenge-date-limit {
  position: absolute;
  width: 4.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  right: 2.4rem;
  top: 0;
  padding-top: 0.8rem;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
  background: #b7ccfc;
  .limit-date {
    font-size: 1.3rem;
    font-weight: 700;
  }
  &:after {
    content: '';
    display: block;
    width: 4.8rem;
    height: 1.8rem;
    position: absolute;
    left: 0;
    bottom: -1.5rem;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='18' viewBox='0 0 48 18' fill='none'%3E%3Cpath d='M25.5606 17.6276C24.6288 18.1241 23.3711 18.1241 22.4394 17.6276L1.07785e-06 5.67085L1.2619e-06 3.5656C1.37995e-06 2.21521 1.41123 -2.58222e-07 3.99894 -3.19979e-08L44.6679 3.5234e-06C47.2556 3.74962e-06 47.3333 1.72297 47.9988 3.5656L48 5.67085L25.5606 17.6276Z' fill='%23B7CCFC'/%3E%3C/svg%3E");
  }
}
</style>
