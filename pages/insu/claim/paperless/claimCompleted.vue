<template>
  <BaseBody
  >
    <div class="wrap-completed-main">
      <!-- ToDo: 상태에 따라 이미지 변경 -->
      <img src="/assets/images/insu/img-completed-01.png" alt="서류자동생성중" />
      <!-- <img src="/assets/images/insu/img-completed-02.png" alt="전송완료" />
      <img src="/assets/images/insu/img-completed-03.png" alt="전송실패" /> -->
      <h1 class="c-tit">
        <!-- ToDo: 상태에 따라 텍스트 변경 -->
        <span class="text">
          청구할 내용을 확인해 주세요
        </span>
        <!-- <span class="text">
          청구서류를 전송 중이에요
        </span>
        <span class="text">
          청구서류 전송을 실패 했어요
        </span> -->
      </h1>
      <div class="wrap-status">
        <img class="img" src="/assets/images/insu/icon-loading.svg" alt="loading" />
        <span class="time">2025.04.11 12:12</span>
      </div>
      <div class="wrap-status-bar">
        <!-- ToDo: progress bar의 길이는 inline-style %로 넣어주세요. 0, 50%, 100%만 존재함. -->
        <div class="bar">
          <div class="progress" style="width: 100%"></div>
        </div>
        <div class="wrap-status-point">
          <!-- ToDo: .item 뒤에 .active, .nagative 넣으면 아이콘 모양과 color가 달라짐 -->
          <div class="item active">
            <div class="icon-status-point"></div>
            <span class="text">서류 자동 생성</span>
          </div>
          <div class="item active">
            <div class="icon-status-point"></div>
            <span class="text">전송 시작</span>
          </div>
          <div class="item nagative">
            <div class="icon-status-point"></div>
            <span class="text">전송 완료</span>
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
            <div class="label price">입원진료비</div>
          </div>
          <div class="count"><strong>12</strong>건</div>
        </div>
      </div>
      <div class="wrap-info-text">
        <i class="info" alt="info"></i>
        <div class="text">전송결과는 카카오 알림톡으도로 안내해 드립니다.</div>
      </div>
    </FlexSection>
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <div class="wrap-claim-detail">
      <div class="wrap-tit">
        <h2 class="tit">진료비 청구 내용</h2>
      </div>
      <ul class="detail-list">
        <li class="item">
          <div class="tit">피보험자(치료 받은 분)</div>
          <div class="desc">이레몬</div>
        </li>
        <li class="item">
          <div class="tit">수익자(보험금 받는 분)</div>
          <div class="desc">이레몬</div>
        </li>
        <li class="item">
          <div class="tit">청구건수</div>
          <div class="desc">강남성심병원 1건</div>
        </li>
        <li class="item">
          <div class="tit">보험금 수령계좌</div>
          <div class="desc">국민은행(이레몬)<br/>1324567897897</div>
        </li>
        <li class="item">
          <div class="tit">청구 보험사</div>
          <div class="desc">신한라이프</div>
        </li>
        <li class="item">
          <div class="tit">총 청구 진료비</div>
          <div class="desc">350,000원</div>
        </li>
      </ul>
    </div>
    <hr class="hr-section ml-n20 mr-n20" />
    <div class="wrap-claim-detail">
      <div class="wrap-tit">
        <h2 class="tit">포인트 사용내역</h2>
        <div class="tit-sub">청구서류 자동생성(통원 <strong>1</strong>건)</div>
      </div>
      <ul class="detail-list">
        <li class="item">
          <div class="tit">보유 포인트</div>
          <div class="desc">12,000P</div>
        </li>
        <li class="item">
          <div class="tit">사용 포인트</div>
          <div class="desc">-500P</div>
        </li>
        <li class="item">
          <div class="tit">잔여 포인트</div>
          <div class="desc"><strong>11,500P</strong></div>
        </li>
      </ul>
      <div class="detail-text">포인트가 부족하여도 실손 청구 서비스 이용 가능합니다.</div>
    </div>
    <div class="wrap-adv">
      <div class="tit">AI 보상금 미리계산하기</div>
      <div class="tit-sub">내가 받을 수 있는<br />보상금은 얼마일까?</div>
      <Button btn-type="primary" element-type="button" aria-label="확인하기" class="lg medium" />
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="청구의신 홈으로" class="lg w-full medium btn-sticky" :disabled="hasSelectedHospitals" />
    </ButtonGroup>
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
  display: flex;
  flex-direction: column;
  align-items: center;;
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
          color: #D5D5D5;
        }
      }
    }
  }
}
.wrap-claim-detail {
  margin: 0 -2rem 0;
  .wrap-tit {
    border-bottom: 0.1rem solid #EEEEEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tit-sub {
      padding: 2rem;
      font-weight: 500;
      strong {
        color: #4C7FF7;
      }
    }
  }
  h2.tit {
    padding: 2rem;
    font-size: 1.6rem;
    font-weight: 700;
  }
  .detail-list {
    margin: 0 2rem;
    .item {
      padding: 1.6rem 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:not(:first-child) {
        border-top: 0.1rem solid #EEEEEE;
      }
      .tit {
        color: #555555;
      }
      .desc {
        font-weight: 500;
        text-align: right;
        strong {
          color: #4C7FF7;
        }
      }
    }
  }
  .detail-text {
    padding-left: 0.6rem;
    position: relative;
    margin: 0 2rem 0 2.6rem;
    font-size: 1.4rem;
    color: #555555;
    &::before {
      content: '';
      display: block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
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
    justify-content: space-between;
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
.wrap-info-text {
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  .info {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
  .text {
    font-size: 1.4rem;
    font-weight: 500;
    color: #959595;
  }
}
.wrap-adv {
  margin: 3.2rem 0 5rem;
  padding: 2.4rem;
  background-color: #DDF6F6;
  border-radius: 1.2rem;
  background: url('/assets/images/insu/img-bg-completed.png') calc(100% - 1rem) calc(100% - 1.5rem) no-repeat #DDF6F6;
  background-size: auto;
  .tit {
    font-weight: 700;
    color: #279B9B;
  }
  .tit-sub {
    margin-top: 0.4rem;
    font-size: 2.2rem;
    font-weight: 700;
  }
  .c-btn {
    margin-top: 2.4rem;
    width: 10.5rem;
    background-color: #279B9B;
  }
}

</style>
