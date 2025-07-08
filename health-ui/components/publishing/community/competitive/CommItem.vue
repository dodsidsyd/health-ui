<template>
  <NuxtLink to="#" class="community-box" v-if="!item.isBlind">
    <FlexColDiv class="gap-8">
      <span :class="['cate', { 'cate-blue': type === 'blue' }]">{{ item.cate }}</span>
      <FlexRowDiv class="info-box">
        <FlexColDiv class="info">
          <strong class="tit">{{ item.tit }}</strong>
          <span class="text">{{ item.text }}</span>
        </FlexColDiv>
        <div class="img-wrap">
          <i v-if="item.length && item.length > 1" class="img-length">+ {{ item.length ?? 0 }}</i>
          <img src="~/assets/images/community/img-community-01.png" alt="" />
        </div>
      </FlexRowDiv>
      <div class="detail-info">
        <span class="like-num">{{ item.likeNum ?? 0 }}</span>
        <span class="view-num">조회 {{ item.viewNum ?? 0 }}</span>
        <span class="reply-num">댓글 {{ item.replyNum ?? 0 }}</span>
        <span class="date-num">{{ item.dateNum ?? 0 }} 전</span>
      </div>
    </FlexColDiv>
  </NuxtLink>
  <div v-else class="community-box blind-box">
    <strong class="tit tit-blind">이 게시물은 신고로 가려졌어요</strong>
    <span class="text text-blind">운영원칙에 따라 블라인드 처리된 게시물입니다.</span>
  </div>
</template>

<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'

interface CommItem {
  id: number
  cate: string
  tit: string
  text: string
  likeNum: number
  viewNum: number
  replyNum: number
  dateNum: string
  length?: number
  type?: '' | 'blue'
  isBlind?: boolean
}

const props = withDefaults(
  defineProps<{
    item: CommItem
    type?: 'blue' | ''
    isLength?: boolean
  }>(),
  {
    type: '',
    cate: '',
    text: '',
    isLength: false
  }
)
</script>
<style scoped lang="scss">
.community-box {
  display: block;
  padding: 2.4rem 0;
  & + .community-box {
    border-top: 1px solid #eee;
  }
  .cate {
    display: block;
    font-size: 1.4rem;
    font-weight: 600;
    text-align: left;
    color: #777f92;
  }
  .info-box {
    gap: 2rem;
  }
  .info {
    gap: 0.4rem;
    flex: 1;
    overflow: hidden;
  }
  .tit {
    @include mixin.ellipsis;
    font-size: 1.8rem;
    font-weight: 700;
    text-align: left;
    color: #2b2b2b;
    &.tit-blind {
      display: inline-block;
      position: relative;
      padding-right: 2.4rem;
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 2.2rem;
      color: #555;
      &:after {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 2rem;
        height: 2rem;
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.1076 9.99993V13.5714C14.1076 13.8671 13.8676 14.1071 13.5718 14.1071H6.42899C6.13328 14.1071 5.89328 13.8671 5.89328 13.5714V9.99993C5.89328 7.73564 7.73613 5.89279 10.0004 5.89279C12.2647 5.89279 14.1076 7.73564 14.1076 9.99993ZM10.0004 4.82136C10.2961 4.82136 10.5361 4.58136 10.5361 4.28564V3.57136C10.5361 3.27564 10.2961 3.03564 10.0004 3.03564C9.7047 3.03564 9.4647 3.27564 9.4647 3.57136V4.28564C9.4647 4.58136 9.7047 4.82136 10.0004 4.82136ZM14.1668 5.07564L13.6618 5.58064C13.4526 5.78993 13.4526 6.12922 13.6618 6.3385C13.7661 6.44279 13.9033 6.49564 14.0404 6.49564C14.1776 6.49564 14.3147 6.4435 14.419 6.3385L14.924 5.8335C15.1333 5.62422 15.1333 5.28493 14.924 5.07564C14.7147 4.86636 14.3761 4.86636 14.1668 5.07564ZM16.429 9.46422H15.7147C15.419 9.46422 15.179 9.70422 15.179 9.99993C15.179 10.2956 15.419 10.5356 15.7147 10.5356H16.429C16.7247 10.5356 16.9647 10.2956 16.9647 9.99993C16.9647 9.70422 16.7247 9.46422 16.429 9.46422ZM4.28613 9.46422H3.57185C3.27613 9.46422 3.03613 9.70422 3.03613 9.99993C3.03613 10.2956 3.27613 10.5356 3.57185 10.5356H4.28613C4.58185 10.5356 4.82185 10.2956 4.82185 9.99993C4.82185 9.70422 4.58185 9.46422 4.28613 9.46422ZM6.33899 6.3385C6.54828 6.12922 6.54828 5.78993 6.33899 5.58064L5.83399 5.07564C5.6247 4.86636 5.28542 4.86636 5.07613 5.07564C4.86685 5.28493 4.86685 5.62422 5.07613 5.8335L5.58113 6.3385C5.68542 6.44279 5.82256 6.49564 5.9597 6.49564C6.09685 6.49564 6.2347 6.4435 6.33899 6.3385Z' fill='%23B7CCFC'/%3E%3Cpath d='M14.2863 13.0356H5.71484C5.02449 13.0356 4.46484 13.5953 4.46484 14.2856V15.7142C4.46484 16.4046 5.02449 16.9642 5.71484 16.9642H14.2863C14.9766 16.9642 15.5363 16.4046 15.5363 15.7142V14.2856C15.5363 13.5953 14.9766 13.0356 14.2863 13.0356Z' fill='%234C7FF7'/%3E%3C/svg%3E%0A");
      }
    }
  }
  .text {
    color: #555;
    font-weight: 400;
    &.text-blind {
      display: block;
      margin-top: 0.4rem;
      color: #959595;
    }
  }
  .img-wrap {
    position: relative;
    overflow: hidden;
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 1.2rem;
    .img-length {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.4rem 0.6rem;
      background: rgba($color: #000000, $alpha: 0.7);
      border-radius: 0 0.8rem;
      font-size: 1.4rem;
      color: #fff;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .detail-info {
    display: flex;
    flex-direction: row;
    gap: 0 1.2rem;
    margin-top: 0.2rem;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.4rem;
    color: #959595;
    .like-num {
      position: relative;
      padding-left: 2.8rem;
      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 2.4rem;
        height: 2.4rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z' fill='%23D5D5D5'/%3E%3Cpath d='M9.21574 9.11719H9.12012V9.19406H9.21574V9.11719Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14.9651 9.11719H14.8801V9.19406H14.9651V9.11719Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.67188 14.916C9.37181 16.0468 10.6008 16.7968 11.9999 16.7968C13.3991 16.7968 14.628 16.0468 15.328 14.916' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      }
    }
    .date-num {
      text-align: right;
      flex: 1;
    }
  }
}
</style>
