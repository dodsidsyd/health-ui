<template>
  <BaseBody
    :show-back-button="false"
    page-title="실손청구"
    logo-type="text"
    :has-notification="true"
    :has-chat="true"
    :has-add-text-left="true"
    class="pb-36"
  >
  <div class="wrap-claim-main">
    <div class="wrap-btn-alert">
      <button class="btn-alert">
        <img class="img-alert" src="/assets/images/insu/logo-alert-samsung.png" alt="삼성화재" />
        <div class="wrap-alert-text">
          <span class="text">청구서류 전송을 완료했어요</span>
          <div class="text-sub">삼성화재 청구 내역 확인<i class="icon-arrow-right"></i></div>
        </div>
      </button>
      <button class="btn-alert">
        <img class="img-alert" src="/assets/images/insu/logo-alert-db.png" alt="DB손해보험" />
        <div class="wrap-alert-text">
          <span class="text">추가서류가 필요한 청구가 있어요</span>
          <div class="text-sub">DB손해보험 청구 내역 확인<i class="icon-arrow-right"></i></div>
        </div>
      </button>
    </div>
    <div class="wrap-btn-claim">
      <button class="btn-claim no-doc">
        <div class="text">진료내역을 찾아서<br /><strong>서류 없이 청구</strong></div>
        <img class="img-claim" src="/assets/images/insu/img-claim-nodoc.png" alt="서류없이 청구하기" />
      </button>
      <button class="btn-claim picture">
        <div class="text">서류 준비해서<br /><strong>사진 찍어 청구</strong></div>
        <img class="img-claim" src="/assets/images/insu/img-claim-picture.png" alt="사진 찍어 청구하기" />
      </button>
    </div>
    <button class="btn-wide">
      <div class="wrap-wide-text">
        <span class="text">보험금 대리청구</span>
        <div class="label puple">설계사</div>
      </div>
    </button>
  </div>
  <FlexSection>
    <h2 class="tit2">놓치기 쉬운 보상금 돌려받으세요</h2>
    <div class="wrap-payback">
      <button class="item type-a blue">
        <div class="wrap-text">
          <span class="text">AI 분석 실손 보험금 예측</span>
          <span class="sub-text">미리 예상해 볼 진료내역<br />2건이 있어요</span>
        </div>
        <img class="img-payback" src="/assets/images/insu/img-payback1.png" alt="AI 분석 실손 보험금 예측" />
      </button>
      <button class="item type-a orange">
        <div class="wrap-text">
          <span class="text">AI 분석 휴면보험금 찾기</span>
          <span class="sub-text">분석 가능한 숨은 보상금<br />2건을 찾았어요</span>
        </div>
        <img class="img-payback" src="/assets/images/insu/img-payback2.png" alt="AI 분석 휴면보험금 찾기" />
      </button>
      <button class="item type-b b1">
        <div class="wrap-text">
          <span class="text">청구내역<br />조회</span>
        </div>
        <img class="img-payback" src="/assets/images/insu/img-payback3.png" alt="청구내역 조회" />
      </button>
      <button class="item type-b b2">
        <div class="wrap-text">
          <span class="text">병원 서류<br />발급</span>
        </div>
        <img class="img-payback" src="/assets/images/insu/img-payback4.png" alt="병원 서류 발급" />
      </button>
      <div class="item type-c">
        <div class="wrap-auto">
          <div class="wrap-text">
            <span class="text">실손보험 자동청구</span>
            <span class="sub-text">놓치지 않게 자동으로<br />청구해드려요</span>
          </div>
          <img class="img-payback" src="/assets/images/insu/img-payback5.png" alt="실손보험 자동청구" />
        </div>
        <div class="wrap-btn">
          <button class="btn-claim">청구 보험사 2개</button>
          <button class="btn-claim">청구 병원 3개</button>
        </div>
      </div>
    </div>
    <h2 class="tit2">청구의신 더 알아보기</h2>
    <div class="wrap-more">
      <button class="item purple">
        <img class="img-more" src="/assets/images/insu/img-more-myhospital.png" alt="MY병원/보험사관리" />
        <div class="text">MY병원/<br />보험사관리</div>
      </button>
      <button class="item pink">
        <img class="img-more" src="/assets/images/insu/img-more-hospital.png" alt="제휴병원 찾아보기" />
        <div class="text">제휴병원 찾아보기</div>
      </button>
      <button class="item yellow">
        <img class="img-more" src="/assets/images/insu/img-more-myhospital.png" alt="실손청구 알아보기" />
        <div class="text">실손청구 알아보기</div>
      </button>
    </div>
    <h2 class="tit2">실손청구에 대해 궁금하다면?</h2>
    <div class="wrap-qa">
      <button class="item">
        <div class="item-qa-text">
          <img class="img-qa" src="/assets/images/insu/icon-kakaotalk.svg" alt="카카오톡 아이콘" />
          <div class="text">카카오톡 상담</div>
        </div>
        <i class="icon-arrow-right"></i>
      </button>
      <button class="item">
        <div class="item-qa-text">
          <img class="img-qa" src="/assets/images/insu/icon-faq.svg" alt="자주 묻는 질문 아이콘" />
          <div class="text">자주 묻는 질문</div>
        </div>
        <i class="icon-arrow-right"></i>
      </button>
      <button class="item">
        <div class="item-qa-text">
          <img class="img-qa" src="/assets/images/insu/icon-qa.svg" alt="질문 아이콘" />
          <div class="text">1:1 문의</div>
        </div>
        <i class="icon-arrow-right"></i>
      </button>
      <button class="item">
        <div class="item-qa-text">
          <img class="img-qa" src="/assets/images/insu/icon-counsel.svg" alt="질문 아이콘" />
          <div class="text">전화상담<strong>1661-2966</strong></div>
        </div>
      </button>
    </div>
  </FlexSection>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'

</script>

<style scoped lang="scss">
.wrap-claim-main {
  padding-bottom: 3.2rem;
  margin: 0 -2rem;
  background: var(--scheme-bluegary-300, rgba(215, 225, 247, 1));
  .wrap-btn-alert {
    padding: 0 2rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    & + .wrap-btn-claim {
      margin-top: 1.2rem;
    }
    .btn-alert {
      padding: 1.6rem 2rem;
      display: flex;
      align-items: center;
      gap: 1.2rem;
      border-radius: 1.2rem;
      background: rgba(255, 255, 255, 0.3);
      border: 0.1rem solid rgba(255, 255, 255, 0.1);
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
      backdrop-filter: blur(20px);
      width: 100%;
      .img-alert {
        width: 4rem;
        height: 4rem;
      }
      .wrap-alert-text {
        .text {
          font-size: 1.6rem;
          font-weight: 500;
          color: #2B2B2B;
        }
        .text-sub {
          margin-top: 0.4rem;
          font-size: 1.4rem;
          color: #2B2B2B;
          display: flex;
          align-items: center;
          gap: 0.2rem;
          .icon-arrow-right {
            width: 1.6rem;
            height: 1.6rem;
            background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
            background-size: 100%;
          }
        }
      }
    }
  }
  .wrap-btn-claim {
    padding: 0 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    .btn-claim {
      padding: 2.4rem 2.4rem 1.6rem;
      border-radius: 1.6rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      &.no-doc {
        background-color: #4C7FF7;
      }
      &.picture {
        background-color: #31519E;
      }
      .text {
        font-size: 1.6rem;
        font-weight: 500;
        color: #fff;
        text-align: left;
        strong {
          margin-top: 0.8rem;
          font-size: 2rem;
          font-weight: 700;
          font-weight: 130%;
        }
      }
      .img-claim {
        margin-top: 2.4rem;
        align-self: flex-end;
        width: 6rem;
      }
    }
  }
  .btn-wide {
    margin: 1.2rem 2rem 0;
    padding: 3.1rem 2.4rem;
    border-radius: 1.2rem;
    box-shadow: 4px 4px 12px 0px #0000000A;
    width: calc(100% - 4rem);
    background: url('/assets/images/insu/img-claim-people.png') no-repeat right bottom #F6F9FF;
    
    .wrap-wide-text {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      .text {
        font-size: 2rem;
        font-weight: 700;
        line-height: 130%;
        color: #2B2B2B;
      }
      .label {
        font-size: 1.2rem;
        line-height: 130%;
        font-weight: 500;
        color: #fff;
        background-color: #6449FC;
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
      }
    }
    
  }
}
h2.tit2 {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 140%;
  color: #2B2B2B;
  margin-top: 3.2rem;
}
.wrap-payback {
  margin-top: 1.2rem;
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, auto);
  .item {
    padding: 2.4rem 2rem 2.4rem 2.4rem;
    border: 0.1rem solid #EEEEEE;
    border-radius: 2rem;
    box-shadow: 0px 0px 23px 0px #0000000F;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.type-a {
      flex: 1 1 0;
      &.blue {
        grid-area: 1 / 1 / 2 / 3;
        background-image: linear-gradient(to top right, transparent, #E8F0FF);
      }
      &.orange {
        grid-area: 2 / 1 / 3 / 3;
        background-image: linear-gradient(to top right, transparent, #FFF4E8);
      }
      .wrap-text {
        .text {
          color: #31519E;
        }
      }
    }
    &.type-b {
      .wrap-text .text {
        color: #555555;
      }
      .img-payback {
        width: 3.2rem;
        align-self: flex-end;
      }
      &.b1 {
        grid-area: 3 / 1 / 4 / 2;
      }
      &.b2 {
        grid-area: 3 / 2 / 4 / 3;
      }
    }
    &.type-c {
      grid-area: 4 / 1 / 5 / 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .wrap-text .text {
        color: #4C7FF7;
      }
      .wrap-auto {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .img-payback {
          width: 8rem;
          height: auto;
        }
      }
      .wrap-btn {
        margin-top: 1.2rem;
        display: flex;
        gap: 1.2rem;
        width: 100%;
        .btn-claim {
          background-color: #F4F4F4;
          border-radius: 0.8rem;
          padding: 1.2rem;
          color: #555555;
          font-size: 1.4rem;
          font-weight: 600;
          text-align: center;
          width: 100%;
        }
      }
    }
    .wrap-text {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      text-align: left;
      .text {
        font-size: 1.8rem;
        font-weight: 700;
      }
      .sub-text {
        font-size: 1.6rem;
        font-weight: 500;
        color: #555555;
      }
    }
    .img-payback {
      width: 8rem;
      height: auto;
    }
  }
}
.wrap-more {
  margin-top: 1.6rem;
  display: flex;
  gap: 1.2rem;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    width: 14.8rem;
    height: 16rem;
    flex: 1 0 auto;
    padding: 2.4rem;
    border-radius: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    &.purple {
      background-color: #E8EEFA;
    }
    &.pink {
      background-color: #FFE2E6;
    }
    &.yellow {
      background-color: #FEF4CC;
    }
    .img-more {
      width: 4.8rem;
      height: auto;
    }
    .text {
      text-align: left;
      font-size: 1.6rem;
      font-weight: 700;
      color: #2B2B2B;
    }
  }
}
.wrap-qa {
  margin-top: 1.2rem;
  padding: 1.6rem 2rem;
  border-radius: 1.2rem;
  background-color: #F4F4F4;
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1.2rem;
    padding: 1.2rem 0;
    &:not(:first-child) {
      border-top: 0.1rem solid #E2E2E2;
    }
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }
    .item-qa-text {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      .text {
        font-size: 1.4rem;
        font-weight: 500;
        color: #2B2B2B;
        strong {
          margin-left: 0.6rem;
          font-weight: 600;
          color: #555555;
        }
      }
      .img-qa {
        width: 3.2rem;
        height: 3.2rem;
      }
    }
    i.icon-arrow-right {
      width: 2.4rem;
      height: 2.4rem;
      background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
      background-size: 100%;
    }
  }
}
</style>
