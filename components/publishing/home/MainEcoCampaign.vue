<template>
  <div class="main-eco-campaign">
    <div class="banner-txt">
      <h5 class="title">
        오늘도 지구와 함께<br />
        걷는 중이예요!
      </h5>
      <div class="campaign-info">
        <div class="item">
          <span class="tit">오늘 걸음</span>
          <strong class="txt">2,109</strong>
        </div>
        <div class="item"><span class="tit">내가 줄인 탄소</span> <strong class="txt t-green">191.9g</strong></div>
      </div>
    </div>

    <img src="~/assets/images/home/img-main-campaign.svg" alt="" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main-eco-campaign {
  margin-top: 1.2rem;
  padding: 3.2rem 2.8rem;
  border-radius: 2rem;
  background: #e5efe0;
  position: relative;
  height: 22rem;
  margin-bottom: 3.2rem;
  .banner-txt {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 2.4rem;
      font-weight: 700;
      color: #519430;
    }
    .campaign-info {
      display: flex;
      flex-direction: row;
      gap: 0 2rem;
      .item {
        display: flex;
        flex-direction: column;
        gap: 0.4rem 0;
        .tit {
          font-size: 1.4rem;
          font-weight: 500;
          color: #555;
        }
        .txt {
          font-size: 1.6rem;
          font-weight: 700;
          color: #444;
          &.t-green {
            color: #0c9f64;
          }
        }
      }
    }
  }
  img {
    width: 17.2rem;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
@media (max-width: 375px) {
  .main-eco-campaign {
    margin-top: 1.2rem;
    padding: 2rem;
    border-radius: 2rem;
    background: #e5efe0;
    position: relative;
    height: 18rem;
    img {
      width: 14rem;
    }
  }
}
</style>
