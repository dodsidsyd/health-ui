<template>
  <div class="result-community-list">
    <div class="list-item">
      <NuxtLink to="#">
        <span class="img-wrap">
          <img src="../../../assets/images/img-community-01.png" alt="" />
        </span>
        <div class="text-wrap">
          <span class="tit">건강기록부</span>
          <span class="text">대회참가로 <strong class="keyword">건강</strong>도 치키고 다양한 혜택도 받아가세요.</span>
        </div>
      </NuxtLink>
    </div>
    <div class="list-item">
      <NuxtLink to="#">
        <span class="img-wrap">
          <img src="../../../assets/images/img-community-01.png" alt="" />
        </span>
        <div class="text-wrap">
          <span class="tit">RS바이러스</span>
          <span class="text">RS바이러스로부터 우리아이의 <strong class="keyword">건강</strong>을 보호하세요.</span>
        </div>
      </NuxtLink>
    </div>
    <div class="more-btn-wrap">
      <NuxtLink to="#"> 커뮤니티 검색결과 더보기 <i class="icon arrow-type"></i></NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import CommonBadge from '~/components/common/badge/CommonBadge'
</script>

<style lang="scss" scoped>
.result-community-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem 0;
  .list-item {
    align-self: flex-start;
    a {
      display: flex;
      flex-direction: row;
      gap: 0 1.2rem;

      .img-wrap {
        width: 5.6rem;
        height: 5.6rem;
        border-radius: 1.2rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .text-wrap {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      .tit {
        font-size: 1.6rem;
        font-weight: 500;
        color: #2b2b2b;
      }
      .text {
        font-size: 1.4rem;
        font-weight: 500;
        color: #555;
        .keyword {
          color: vars.$blue-primary;
        }
      }
    }
  }
  .more-btn-wrap {
    border-top: 0.1rem solid #eee;
    width: 100%;
    text-align: center;
    a {
      // color:;
      display: block;
      padding-top: 1.4rem;
      padding-bottom: 0.2rem;
      font-size: 1.4rem;
      font-weight: 400;
      color: #2b2b2b;
    }
    .icon {
      width: 1.6rem;
      height: 1.6rem;
      display: inline-block;
    }
  }
}
</style>
