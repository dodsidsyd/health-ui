<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI 보상금 분석"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <h2 class="tit">내 보험</h2>
    <div class="wrap-main-insurance-status">
      <div class="wrap-info" @click="toggleMoreInfo">
        <div class="text">월 납입 보험료</div>
        <i class="icon ico-info"></i>
        <div class="wrap-more" :class="{ active: isMoreInfoActive }">
          <div class="text">정상 유지 중인 계약 보험 중 내가 보험 계약자로 매월 납입하는 보험료예요.(연납/3개월납/6회납 등의 상품, 외화상품, 실효/만기/소멸/만료 등의 상품은 제외)</div>
          <i class="icon ico-cancel-white" @click.stop="closeMoreInfo"></i>
        </div>
      </div>
      <div class="wrap-status">
        <div class="price"><strong>300,398</strong>원</div>
        <button class="btn-reload">
          <i class="icon ico-reload"></i>
          <span class="date">2025.04.11 12:12</span>
        </button>
      </div>
      <button class="btn-c-insurance-count">
        <div class="wrap-insurance-text">
          <img src="/assets/images/insu/icon-insurance.svg" alt="아이콘 보험계약" />
          <span class="text">총 보험계약 <strong>5건</strong> 중 정상계약 <strong>4건</strong></span>
        </div>
        <img src="/assets/images/insu/icon-arrow-right-white.svg" alt="화살표" />
      </button>
      <!-- ToDo:  -->
      <button class="btn-c-insurance-count white">내 보험 연결하고 알아보기</button>
      <div class="wrap-btn-more">놓친 보험금이 1인 평균 24만원이래요.</div>
    </div>
    <div class="wrap-grey">
      <h2 class="tit">AI가 찾아주는 나의 휴면보험금</h2>
      <div class="wrap-ai-list">
        <button type="button" class="ai-item">
          <div class="wrap-mission-info">
            <img src="/assets/images/insu/icon-mission1.png" alt="미션1" />
            <div class="wrap-mission-tit">
              <div class="mission-tit">보상금 찾고 보장분석해요</div>
              <div class="mission-tit-sub">숨은 보상금 찾기 신청</div>
            </div>
            <div class="mission-count">100건</div>
          </div>
          <i class="icon-arrow-right"></i>
        </button>
        <button type="button" class="ai-item">
          <div class="wrap-mission-info">
            <img src="/assets/images/insu/icon-mission2.png" alt="미션2" />
            <div class="wrap-mission-tit">
              <div class="mission-tit">숨은 보상금 결과를 확인해요</div>
              <div class="mission-tit-sub">숨은 보상금 찾기 결과</div>
            </div>
          </div>
          <i class="icon-arrow-right"></i>
        </button>
      </div>
      <h2 class="tit">AI 실손 예상 보험금</h2>
      <div class="wrap-ai-list">
        <button type="button" class="ai-item">
          <div class="wrap-mission-info">
            <img src="/assets/images/insu/icon-mission3.png" alt="미션3" />
            <div class="wrap-mission-tit">
              <div class="mission-tit">예상 보상금을 AI가 분석해드려요</div>
              <div class="mission-tit-sub">실손 예상 보험금 확인</div>
            </div>
          </div>
          <i class="icon-arrow-right"></i>
        </button>
        <button type="button" class="ai-item">
          <div class="wrap-mission-info">
            <img src="/assets/images/insu/icon-mission4.png" alt="미션4" />
            <div class="wrap-mission-tit">
              <div class="mission-tit">조회한 예상수령금 결과를 확인해요</div>
              <div class="mission-tit-sub">실손 예상 보험금 분석 결과</div>
            </div>
          </div>
          <i class="icon-arrow-right"></i>
        </button>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
const isMoreInfoActive = ref(false)

// Toggle function
const toggleMoreInfo = () => {
  isMoreInfoActive.value = !isMoreInfoActive.value
}

// Close more info function
const closeMoreInfo = () => {
  isMoreInfoActive.value = false
}
</script>
<style scoped lang="scss">
h2.tit {
  margin-top: 2.4rem;
  font-size: 1.8rem;
  font-weight: 700;
}
.wrap-main-insurance-status {
  position: relative;
  margin-top: 1.6rem;
  padding: 2.4rem 2rem 2rem;
  border-radius: 1.2rem;
  background-color: #4C7FF7;
  .wrap-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    .text {
      font-weight: 600;
      color: #ffffff;
    }
    .ico-info {
      background: url('/assets/images/insu/icon-info-white.svg') no-repeat center center;
      background-size: contain;
      width: 2rem;
      height: 2rem;
      display: block;
    }
    .wrap-more {
      width: 100%;
      border-radius: 0.8rem;
      background-color: #4F5561;
      padding: 2rem;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
      display: none;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.8rem;
      &.active {
        display: flex;
      }
      .text {
        font-size: 1.4rem;
        color: #ffffff;
        word-break: keep-all;
        flex: 1 1;
      }
      .ico-cancel-white {
        background: url('/assets/images/insu/icon-cancel-white.svg') no-repeat center center;
        background-size: contain;
        width: 2rem;
        height: 2rem;
        display: block;
      }
    }
  }
  .wrap-status {
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price {
      font-size: 2.6rem;
      font-weight: 600;
      margin-left: 0.2rem;
      color: #ffffff;
      line-height: 130%;
      strong {
        font-weight: 700;
      }
      
    }
    .btn-reload {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background-color: #7099F9;
      border-radius: 1.4rem;
      padding: 0.6rem 1.2rem;
      .ico-reload {
        background: url('/assets/images/insu/icon-reloading-white.svg') no-repeat center center;
        background-size: contain;
        width: 1.6rem;
        height: 1.6rem;
        display: block;
      }
      .date {
        font-size: 1.2rem;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
  .btn-c-insurance-count {
    width: 100%;
    padding: 1.2rem 1.6rem;
    margin-top: 2rem;
    border-radius: 0.8rem;
    background-color: #4776E5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .wrap-insurance-text {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        font-size: 1.4rem;
        color: #C9D9FD;
        strong {
          font-weight: 600;
          color: #ffffff;
        }
      }
      img {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
    &.white {
      background-color: #fff;
      font-weight: 500;
      color: #4C7FF7;
      text-align: center;
      display: block;
    }
  }
  .wrap-btn-more {
    width: max-content;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 130%;
    color: #ffffff;
    border-radius: 1.2rem;
    background-color: #4F5561;
    padding: 0.4rem 0.8rem;
    display: inline-block;
    position: absolute;
    bottom: -1.2rem;
    left: 50%;
    transform: translate(-50%, 0);
    &::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 0.8rem solid transparent;
      border-right: 0.8rem solid transparent;
      border-bottom: 0.8rem solid #4F5561;
    }
  }
}
.wrap-grey {
  margin: 3.2rem -2rem 0;
  padding: 2.4rem 2rem 4rem;
  background-color: #F4F4F4;
  h2.tit {
    margin-top: 0;
  }
  .wrap-ai-list {
    margin-top: 1.6rem;
    padding: 2.4rem 2rem 2rem;
    border-radius: 1.2rem;
    background-color: #fff;
    + h2.tit {
      margin-top: 2.4rem;
    }
    .ai-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.2rem;
      &:not(:first-child) {
        margin-top: 2.4rem;
      }
      .wrap-mission-info {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        img {
          width: 6.4rem;
          height: auto;
        }
        .wrap-mission-tit {
          .mission-tit {
            font-size: 1.4rem;
            font-weight: 500;
            text-align: left;
          }
          .mission-tit-sub {
            margin-top: 0.2rem;
            font-weight: 700;
            text-align: left;
          }
        }
        .mission-count {
          padding: 0.3rem 0.8rem;
          border-radius: 1.1rem;
          background-color: #E0E9FF;
          font-size: 1.2rem;
          font-weight: 500;
          color: #002988;
        }
      }
      .icon-arrow-right {
        display: inline-block;
        width: 2.4rem;
        height: 2.4rem;
        background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
        background-size: 100%;
      }
    }
  }
}
</style>