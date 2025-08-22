<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI 실손 예상 보험금 확인 결과"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
  <h1 class="c-tit mt-40">
    <span class="text">
      AI가 분석한<br />실손 보상금 예상 결과에요.
    </span>
  </h1>
    <FlexSection>
      <div class="wrap-recent-searches">
        <div class="text">총 <strong>4</strong>건을 찾았어요.</div>
      </div>
    </FlexSection>
    <div class="wrap-hospitals">
      <button class="item">
        <div class="wrap-hospital-desc">
          <div class="wrap-label">
            <div class="h-label analyze-done">분석완료</div>
            <div class="h-label counsel">상담 신청완료</div>
            <div class="h-label">숨은 보상금 수령불가</div>
          </div>
          <div class="wrap-desc">
            <span class="tit">고려대학교 안암병원 <strong>2</strong>건</span>
            <span class="date">2024.04.18 12:12</span>
          </div>
        </div>
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" />
        </div>
      </button>
      <button class="item">
        <div class="wrap-hospital-desc">
          <div class="wrap-label">
            <div class="h-label failed">분석실패</div>
          </div>
          <div class="wrap-desc">
            <span class="tit">고려대학교 안암병원 <strong>2</strong>건</span>
            <span class="date">2024.04.18 12:12</span>
          </div>
        </div>
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" />
        </div>
      </button>
      <button class="item">
        <div class="wrap-hospital-desc">
          <div class="wrap-label">
            <div class="h-label analyze-done">분석완료</div>
            <div class="h-label counsel">상담 신청완료</div>
            <div class="h-label">숨은 보상금 수령불가</div>
          </div>
          <div class="wrap-desc">
            <span class="tit">고려대학교 안암병원 <strong>2</strong>건</span>
            <span class="date">2024.04.18 12:12</span>
          </div>
        </div>
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" />
        </div>
      </button>
      <button class="item">
        <div class="wrap-hospital-desc">
          <div class="wrap-label">
            <div class="h-label analyze-done">분석완료</div>
            <div class="h-label">상담 취소</div>
            <div class="h-label able">숨은 보상금 수령가능</div>
          </div>
          <div class="wrap-desc">
            <span class="tit">고려대학교 안암병원 <strong>2</strong>건</span>
            <span class="date">2024.04.18 12:12</span>
          </div>
        </div>
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" />
        </div>
      </button>
    </div>
    <!-- ToDo: 결과값 없을때 아래 활성화 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
      <div class="tit">AI가 분석한 실손 보험금<br />예상 결과가 없어요</div>
      <Button btn-type="line" element-type="button" aria-label="AI 실손 예상 보험금 확인하기" class="xs" :width="18.4" />
    </div> -->
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'

// 체크박스 상태 관리
const isPaperlessClaim = ref(true)
const isMyHospital = ref(false)

</script>

<style scoped lang="scss">
.search-hospital {
  margin-top: 4rem;
}
.wrap-recent-searches,
.wrap-claim-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.1rem 0;
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
}
.wrap-claim-type {
  justify-content: flex-end;
  gap: 1.2rem;
}
.wrap-hospitals {
  border-top: 0.1rem solid #EEEEEE;
  margin: 0 -2rem;
  padding: 0 2rem;
  .item {
    padding: 2rem 0; 
    display: flex;
    align-items: center;
    gap: 1.6rem;
    width: 100%;
    &:not(:first-child) {
      border-top: 0.1rem solid #EEEEEE;
    }
    .hospital-logo {
      width: 4.8rem;
      height: 4.8rem;
      flex-shrink: 0;
    }
    .wrap-hospital-desc {
      flex: 1 1 auto;
      min-width: 0;
      .wrap-desc {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        text-align: left;
        .tit {
          margin-top: 0.4rem;
          display: block;
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1.4;
          color: #2B2B2B;
          width: 100%;
          @include mixin.ellipsis;
          overflow: hidden;
          word-wrap: break-word;
          word-break: break-all;
          strong {
            color: #4C7FF7;
          }
        }
        .date {
          margin-top: 0.1rem;
          display: block;
          font-size: 1.4rem;
          font-weight: 400;
          line-height: 1.4;
          color: #555555;
          width: 100%;
          @include mixin.ellipsis;
          overflow: hidden;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .wrap-label {
        display: flex;
        gap: 0.4rem;
        .h-label {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          background-color: #EEEEEE;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 1.3;
          color: #555555;
          &.no-doc {
            background-color: #E5EDFF;
            color: #4C7FF7;
          }
          &.my {
            background-color: #4C7FF7;
            color: #fff;
          }
          &.analyze-ing {
            background-color: #C36F00;
            color: #fff;
          }
          &.analyze-done {
            background-color: #629105;
            color: #fff;
          }
          &.able {
            background-color: #E5EDFF;
            color: #4C7FF7;
          }
          &.failed {
            background-color: #C82626;
            color: #fff;
          }
          &.counsel {
            background-color: #EAF2CC;
            color: #506A1D;
          }
        }
      }
    }
    .icon-cancel {
      padding: 0.4rem;
      flex-shrink: 0;
      background-color: transparent;
      border: none;
      cursor: pointer;
      img {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
    
  }
}
.wrap-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 18.4rem 0;
  .img {
    width: 6rem;
    height: 6rem;
  }
  .tit {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.4;
    color: #555;
    text-align: center;
  }
}
</style>
