<template>
  <div class="result-community-detail">
    <div class="detail-item">
      <NuxtLink to="#">
        <div class="text-wrap">
          <span class="tit">안양천 걷기 좋네요.</span>
          <span class="text"
            ><strong class="keyword">건강</strong>을 위해 시작한 산책. 오랜만에 고등학교시절 자주 지나다니던 안양천에
            가보았습니다. 많이 좋아졌어요 오랜만에 고등학교시절 자주 지나다니던 안양천에 가보았습니다. 많이 좋아졌어요
            오랜만에 고등학교시절 자주 지나다니던 안양천에 가보았습니다. 많이 좋아졌어요</span
          >
        </div>
        <!-- 이미지 있을때 -->
        <span class="img-wrap">
          <img src="../../../assets/images/img-community-01.png" alt="" />
        </span>
      </NuxtLink>
    </div>

    <div class="detail-item">
      <NuxtLink to="#">
        <div class="text-wrap">
          <span class="tit">안양천 걷기 좋네요.</span>
          <span class="text"
            ><strong class="keyword">건강</strong>을 위해 시작한 산책. 오랜만에 고등학교시절 자주 지나다니던 안양천에
            가보았습니다. 많이 좋아졌어요 오랜만에 고등학교시절 자주 지나다니던 안양천에 가보았습니다. 많이 좋아졌어요
            오랜만에 고등학교시절 자주 지나다니던 안양천에 가보았습니다. 많이 좋아졌어요</span
          >
        </div>
      </NuxtLink>
    </div>
    <div class="more-btn-wrap">
      <NuxtLink to="#"> 게시글 검색결과 더보기 <i class="icon arrow-type"></i></NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import CommonBadge from '~/components/common/badge/CommonBadge'
</script>

<style lang="scss" scoped>
.result-community-detail {
  display: flex;
  flex-direction: column;
  gap: 1.6rem 0;
  .detail-item {
    align-self: flex-start;
    width: 100%;
    a {
      display: flex;
      flex-direction: row;
      gap: 0 1.2rem;
      flex: 1;
      .img-wrap {
        width: 7.2rem;
        height: 7.2rem;
        border-radius: 1.2rem;
        overflow: hidden;
        margin-left: auto;
        flex: 0 0 auto;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          font-weight: 500;
          color: #555;
          @include mixin.lineClamp($fontSize: 14, $lineNum: 2, $lineHeight: 1.4);
          .keyword {
            color: vars.$blue-primary;
          }
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
