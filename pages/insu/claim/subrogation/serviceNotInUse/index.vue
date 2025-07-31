<template>
  <BaseBody
    :show-back-button="false"
    page-title="실손청구"
    logo-type="text"
    :has-notification="true"
    :has-chat="true"
    :has-add-text-left="true"
  >
    <div class="wrap-claim-main">
      <div class="warp-period">
        <div class="tit">김레몬님은<br /><strong>구독 서비스 이용중</strong></div>
        <div class="wrap-chart">
          <div class="circular-progress">
            <svg class="progress-ring" width="72" height="72">
              <circle
                class="progress-ring-circle-bg"
                stroke="#E5E5E5"
                stroke-width="8"
                fill="transparent"
                r="32"
                cx="36"
                cy="36"
              />
              <circle
                class="progress-ring-circle"
                stroke="#4C7FF7"
                stroke-width="8"
                fill="transparent"
                :r="radius"
                cx="36"
                cy="36"
                :stroke-dasharray="strokeDasharray"
                :stroke-dashoffset="strokeDashoffset"
                stroke-linecap="round"
                transform="rotate(-90 36 36)"
              />
            </svg>
            <div class="progress-text">
              <div class="days">{{ remainingDays }}일</div>
              <div class="label">남음</div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-btn-claim">
        <button class="btn-claim no-doc">
          <div class="text">
            몇번의<br />터치로 간단히<br /><strong>대리청구/<br />피보험자 관리</strong>
          </div>
          <img
            class="img-claim"
            src="/assets/images/insu/subrogation/icon-submain-manage.png"
            alt="서류없이 청구하기"
          />
        </button>
        <button class="btn-claim picture">
          <div class="text">
            청구한<br />내역이 있다면<br /><strong>대리청구<br />내역 조회</strong>
          </div>
          <img
            class="img-claim"
            src="/assets/images/insu/subrogation/icon-submain-query.png"
            alt="사진 찍어 청구하기"
          />
        </button>
      </div>
    </div>
    <div class="wrap-bg-grey">
      <h2 class="tit2">대리청구 관리 및 안내</h2>
      <div class="wrap-info">
        <button class="item">
          <div class="item-info-text">
            <img
              class="img-qa"
              src="/assets/images/insu/subrogation/icon-submain-setting.png"
              alt="아이콘:설계사 관리"
            />
            <div class="text">설계사 관리</div>
          </div>
          <i class="icon-arrow-right"></i>
        </button>
        <button class="item">
          <div class="item-info-text">
            <img
              class="img-qa"
              src="/assets/images/insu/subrogation/icon-submain-rank.png"
              alt="아이콘:대리청구 순위"
            />
            <div class="text">대리청구 순위</div>
          </div>
          <i class="icon-arrow-right"></i>
        </button>
        <button class="item">
          <div class="item-info-text">
            <img class="img-qa" src="/assets/images/insu/subrogation/icon-submain-center.png" alt="아이콘:고객센터" />
            <div class="text">고객센터</div>
          </div>
          <i class="icon-arrow-right"></i>
        </button>
      </div>
      <Button
        class="btn-cancel hasLine"
        btn-type="text"
        element-type="button"
        aria-label="보험금 대리청구 서비스 해지"
        icon="ico-right"
        icon-position="right"
        :icon-size="16"
        icon-color="#959595"
      />
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'

// 원형 프로그레스 차트 계산
const totalDays = 30 // 전체 구독 기간 (예시)
const remainingDays = 8 // 남은 일수
const progressPercentage = ((totalDays - remainingDays) / totalDays) * 100

// SVG 원형 차트 계산
const radius = 32
const circumference = 2 * Math.PI * radius
const strokeDasharray = circumference
const strokeDashoffset = circumference - (progressPercentage / 100) * circumference
</script>

<style scoped lang="scss">
.wrap-claim-main {
  padding-bottom: 3.2rem;
  margin: 0 -2rem;
  background: vars.$white;
  .warp-period {
    padding: 2.4rem 3.2rem 3.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tit {
      font-size: 2.4rem;
      line-height: 130%;
      strong {
        font-weight: 700;
      }
    }
    .wrap-chart {
      .circular-progress {
        position: relative;
        width: 7.2rem;
        height: 7.2rem;
        .progress-ring {
          position: absolute;
          top: 0;
          left: 0;
          .progress-ring-circle-bg {
            transition: stroke-dashoffset 0.35s;
          }
          .progress-ring-circle {
            transition: stroke-dashoffset 0.35s;
          }
        }
        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          .days {
            font-size: 1.6rem;
            font-weight: 500;
          }
          .label {
            font-size: 1.2rem;
            line-height: 130%;
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
    .btn-claim {
      padding: 2.4rem 2.4rem 1.6rem;
      border-radius: 1.6rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.4rem;
      &.no-doc {
        background-color: #4c7ff7;
      }
      &.picture {
        background-color: #31519e;
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
        .sub-text {
          text-align: left;
          margin-top: 0.2rem;
          font-size: 1.3rem;
          font-weight: 500;
          color: #fbc700;
        }
      }
      .img-claim {
        align-self: flex-end;
        width: 6rem;
      }
    }
  }
}
.wrap-bg-grey {
  margin: 0 -2rem -2rem;
  padding: 0 2rem 5.4rem;
  background-color: #f4f4f4;
}
h2.tit2 {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 140%;
  color: #2b2b2b;
  margin-top: 3.2rem;
}
.wrap-info {
  margin-top: 1.2rem;
  padding: 1.6rem 2rem;
  border-radius: 1.2rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-radius: 1.2rem;
    padding: 1.2rem 0;
    &:not(:first-child) {
      border-top: 0.1rem solid #e2e2e2;
    }
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }
    .item-info-text {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      .text {
        font-size: 1.4rem;
        font-weight: 500;
        color: #2b2b2b;
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
.c-btn.btn-cancel {
  display: flex;
  margin: 2.4rem auto;
}
</style>
