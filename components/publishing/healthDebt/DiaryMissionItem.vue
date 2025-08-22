<template>
  <div class="diary-mission-item">
    <span class="item-img">
      <img src="~/assets/images/healthDebt/img-healthDebt-mission.png" alt="" />
    </span>
    <div class="mission-txt">
      <span class="sub-tit">알콜을 참아보아요!</span>
      <strong class="tit">하루 2잔 이하 절주 하기</strong>
    </div>
    <span class="mission-status bg-gray">미션성공</span>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.diary-mission-item {
  display: flex;
  gap: 0 1.2rem;
  align-items: center;
  justify-content: center;
  .item-img {
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 2.4rem;
    overflow: hidden;
    flex: 0 0 auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .mission-txt {
    display: flex;
    flex-direction: column;
    color: #2b2b2b;
    gap: 0.5rem 0;
    .sub-tit {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 140%;
    }
    .tit {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 140%;
    }
  }
  .mission-status {
    margin-left: auto;
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 500;
    padding: 0.8rem 1rem;
    border-radius: 0.6rem;
    flex: 0 0 auto;
    background-color: transparent;
    &.bg-gray {
      color: #959595;
      background-color: #d2d2d2;
    }
  }
}
@media (max-width: 345px) {
  .diary-mission-item {
    gap: 0 0.8rem;
    .item-img {
      width: 4.8rem;
      height: 4.8rem;
      border-radius: 1.2rem;
    }
    .mission-txt {
      gap: 0rem;
      .sub-tit {
        font-size: 1.3rem;
      }
      .tit {
        font-size: 1.5rem;
      }
    }
    .mission-status {
      font-size: 1.2rem;
      padding: 0.6rem;
    }
  }
}
</style>
