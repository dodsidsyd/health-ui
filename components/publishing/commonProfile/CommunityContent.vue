<template>
  <div class="community-content">
    <!-- 고정될 탭 영역 -->
    <StickyTabsContainer class="mt-16">
      <BoxedTabs :tabs="boxTabs" :active-key="activeBoxTab" variant="fill-type" @tab-change="onBoxTabChange" />
    </StickyTabsContainer>

    <!--  알림 목록 영역 -->
    <ScrollableContents>
      <FlexSection class="pl-20 pr-20">
        <div class="community-box">
          <div class="flex flex-col gap-8">
            <span class="cate">스마트링</span>
            <strong class="tit">러닝할때 스마트링 활용해요</strong>
            <span class="text">몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음</span>
            <div class="detail-info">
              <span class="like-num">131</span>
              <span class="view-num">조회 70</span>
              <span class="reply-num">댓글 2</span>
            </div>
          </div>
          <div class="img-wrap">
            <i class="img-length">+2</i>
            <img src="../../../assets/images/img-community-01.png" alt="" />
          </div>
        </div>

        <div class="community-box">
          <div class="flex flex-col gap-8">
            <span class="cate">스마트링</span>
            <strong class="tit">러닝할때 스마트링 활용해요</strong>
            <span class="text">몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음</span>
            <div class="detail-info">
              <span class="like-num">131</span>
              <span class="view-num">조회 70</span>
              <span class="reply-num">댓글 2</span>
            </div>
          </div>
          <div class="img-wrap">
            <i class="img-length">+2</i>
            <img src="../../../assets/images/img-community-01.png" alt="" />
          </div>
        </div>

        <div class="community-box">
          <div class="flex flex-col gap-8">
            <span class="cate">스마트링</span>
            <strong class="tit">러닝할때 스마트링 활용해요</strong>
            <span class="text">몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음</span>
            <div class="detail-info">
              <span class="like-num">131</span>
              <span class="view-num">조회 70</span>
              <span class="reply-num">댓글 2</span>
            </div>
          </div>
          <div class="img-wrap">
            <i class="img-length">+2</i>
            <img src="../../../assets/images/img-community-01.png" alt="" />
          </div>
        </div>
      </FlexSection>
    </ScrollableContents>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FlexSection from '~/components/page/FlexSection.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import ScrollableContents from '~/components/common/ScrollableContents.vue'

import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'

// RoundTabs 상태 관리
const activeBoxTab = ref('all')

const boxTabs = ref<BoxTab[]>([
  { title: '전체', key: 'all' },
  { title: '건강의신', key: 'option2' },
  { title: '건강/운동', key: 'option5' }
])

const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
}
</script>

<style scoped lang="scss">
.community-box {
  & + .community-box {
    border-top: 0.1rem solid #eee;
  }
  padding: 2.4rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .img-wrap {
    width: 7.2rem;
    height: 7.2rem;
    flex: 0 0 7.2rem;
    top: 2.8rem;
    border-radius: 1.2rem;
    margin-left: 1.2rem;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .img-length {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 1.4rem;
      color: vars.$white;
      line-height: 2.8rem;
      width: 2.8rem;
      font-weight: 500;
      text-align: center;
      border-bottom-left-radius: 0.8rem;
      background: rgba(0, 0, 0, 0.7);
    }
  }
  .cate {
    font-size: 1.4rem;
    font-weight: 600;
    text-align: left;
    color: vars.$blue-primary;
  }
  .tit {
    font-size: 1.8rem;
    font-weight: 700;
    text-align: left;
    color: #2b2b2b;
  }
  .text {
    color: #555;
    font-size: 1.6rem;
    font-weight: 400;
    text-align: left;
  }
  .detail-info {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.4rem;
    color: #959595;
    display: flex;
    flex-direction: row;
    gap: 0 1.2rem;
    margin-top: 0.2rem;
    .like-num {
      display: inline-flex;
      align-content: center;
      &:before {
        content: '';
        display: inline-block;
        width: 2.4rem;
        height: 2.4rem;
        position: relative;
        top: -0.1rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z' fill='%23D5D5D5'/%3E%3Cpath d='M9.21574 9.11719H9.12012V9.19406H9.21574V9.11719Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14.9651 9.11719H14.8801V9.19406H14.9651V9.11719Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.67188 14.916C9.37181 16.0468 10.6008 16.7968 11.9999 16.7968C13.3991 16.7968 14.628 16.0468 15.328 14.916' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      }
    }
  }
}
</style>
