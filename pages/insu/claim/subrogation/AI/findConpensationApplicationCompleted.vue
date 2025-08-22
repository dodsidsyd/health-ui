<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI분석 숨은 보상금 찾기 결과"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="wrap-completed-main">
      <img src="/assets/images/insu/img-completed-01.png" alt="서류자동생성중" />
      <h1 class="c-tit">
        <span class="text">
          AI가 숨은 보상금을 찾고 있어요
        </span>
      </h1>
      <div class="wrap-status">
        <img class="img" src="/assets/images/insu/icon-loading.svg" alt="loading" />
        <span class="time">2025.04.11 12:12</span>
      </div>
      <div class="wrap-status-bar">
        <!-- ToDo: progress bar의 길이는 inline-style %로 넣어주세요. 0, 50%, 100%만 존재함. -->
        <div class="bar">
          <div class="progress" style="width: 50%"></div>
        </div>
        <div class="wrap-status-point">
          <!-- ToDo: .item 뒤에 .active, .nagative 넣으면 아이콘 모양과 color가 달라짐 -->
          <div class="item active">
            <div class="icon-status-point"></div>
            <span class="text">전송시작
              <span class="text-sub">계약보험/질병명</span>
            </span>
          </div>
          <div class="item active">
            <div class="icon-status-point"></div>
            <span class="text">AI분석중</span>
          </div>
          <div class="item">
            <div class="icon-status-point"></div>
            <span class="text">AI분석완료</span>
          </div>
        </div>
      </div>
    </div>
    <FlexSection>
      <div class="medical-info">
        <div class="medical-info-head">
          <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
          <div class="wrap-hospital">
            <div class="text">강동성심병원 강동성심병원 강동성심병원 강동성심병원 강동성심병원 강동성심병원 </div>
          </div>
        </div>
      </div>
      <div class="wrap-medical-info-text">
        <i class="icon ico-info"></i>
        <span class="text">숨은 보상금 찾기 분석이 완료되면 알림으로 보내드려요.</span>
      </div>
      <div class="wrap-info-lists">
        <div class="item">실손보험 이외의 계약보험 약관 및 담보 내용을 바탕으로 AI가 숨은 보상금 수령 가능성 유무를 분석 하고 있어요.</div>
        <div class="item">숨은 보상금 찾기 분석 결과 확인은 30분 정도 소요될 수 있어요.</div>
        <div class="item"><span>AI 분석 숨은 보상금 찾기 결과</span> 화면에서 숨은 보상금 수령가능성 여부를 확인하세요.</div>
      </div>
    </FlexSection>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

</script>

<style scoped lang="scss">
.wrap-completed-main {
  margin-top: 5.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img-status {
    width: 9.6rem;
  }
  .c-tit {
    margin-top: 0.8rem;
    .text {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 130%;
    }
  }
  .wrap-status {
    margin-top: 1.6rem;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    border-radius: 1.4rem;
    border: 0.1rem solid #E2E2E2;
    .img {
      width: 1.1rem;
    }
    .time {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 130%;
      color: #555555;
    }
  }
  .wrap-status-bar {
    margin-top: 3.5rem;
    width: 100%;
    .bar {
      width: calc(100% - 16rem);
      margin: 0 8rem;
      background-color: #EEEEEE;
      .progress {
        background-color: #4C7FF7;
        height: 1.2rem;
      }
    }
    .wrap-status-point {
      margin: -2.2rem 4rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        width: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        &.active {
          .icon-status-point {
            background: url('/assets/images/insu/icon-check-active.svg') center center no-repeat;
            background-size: 100%;
          }
          .text {
            color: #4C7FF7;
          }
        }
        &.nagative {
          .icon-status-point {
            background: url('/assets/images/insu/icon-check-fail.svg') center center no-repeat;
            background-size: 100%;
          }
          .text {
            color: #F14960;
          }
        }
        .icon-status-point {
          width: 3.2rem;
          height: 3.2rem;
          background: url('/assets/images/insu/icon-check.svg') center center no-repeat;
          background-size: 100%;
        }
        .text {
          font-size: 1.4rem;
          font-weight: 600;
          line-height: 130%;
          text-align: center;
          color: #D5D5D5;
          height: 3.64rem;
          .text-sub {
            font-size: 1.2rem;
            font-weight: 500;
          }
        }
      }
    }
  }
}

.medical-info {
  margin-top: 2.5rem;
  border: 0.1rem solid #E2E2E2;
  border-radius: 1.2rem;
  padding: 1.2rem 2rem;
  .medical-info-head {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-hospital {
      flex: 1 0 auto;
      max-width: calc(100% - 10rem);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        flex: 1;
        min-width: 0;
        font-weight: 700;
        @include mixin.ellipsis;
      }
      .label {
        display: inline-block;
        padding: 0.3rem 0.6rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        // 통원
        &.out {
          background-color: #FEF4CC;
          color: #8D7000;
        }
        // 입원
        &.in {
          background-color: #FFE7E7;
          color: #CA2828;
        }
        &.price {
          background-color: #EEEEEE;
          color: #555555;
        }
      }
    }
    .count {
      flex: 0 0;
      font-size: 1.4rem;
      font-weight: 600;
      strong {
        margin-right: 0.3rem;
        color: #4C7FF7;
      }
    }
  }
}
.wrap-medical-info-text {
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: #959595;
  .icon {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: contain;
  }
  .text {
    flex: 1;
    min-width: 0;
    @include mixin.ellipsis;
  }
}
.wrap-info-lists {
  margin-top: 1.6rem;
  .item {
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    margin-top: 0.8rem;
    & > span {
      color: #4C7FF7;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
}

</style>
