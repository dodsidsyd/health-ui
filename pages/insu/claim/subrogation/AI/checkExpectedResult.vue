<template>
  <BaseBody
  >
    <div class="wrap-completed-main">
      <!-- ToDo: 상태에 따라 이미지 변경 -->
      <img src="/assets/images/insu/img-completed-02.png" alt="전송완료" />
      <!-- <img src="/assets/images/insu/img-completed-03.png" alt="전송실패" /> -->
      <h1 class="c-tit">
        <span class="text">
          AI가 분석한 실손 예상 보상금은<br /><strong>1,234,567원</strong>이에요
        </span>
        <!-- <span class="text">
          AI 실손 예상 보험금<br />분석에 실패했어요.
        </span> -->
      </h1>
    </div>
    <div class="wrap-count">
      <div class="text">총 <strong>2</strong>건</div>
      <div class="wrap-label">
        <label for="success" class="h-label success">성공 <strong>1</strong>건</label>
        <label for="fail" class="h-label fail">실패 <strong>1</strong>건</label>
      </div>
    </div>
    <div class="wrap-result-lists">
      <div class="item">
        <div class="item-header">
          <div class="wrap-hospital">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="경북대학교병원" />
            <div class="wrap-hospital-info">
              <div class="name">경북대학교병원</div>
              <div class="wrap-info">
                <div class="item-info">2025.05.10</div>
                <div class="item-info">안과</div>
              </div>
            </div>
          </div>
          <!-- 통원: .visit, 입원: .admission -->
          <div class="label-status visit">통원</div>
        </div>
        <div class="detail-lists">
          <div class="detail-item">
            <div class="tit">총 금액</div>
            <div class="price"><strong>1,123,456원</strong></div>
          </div>
          <div class="detail-item">
            <div class="tit">급여</div>
            <div class="price">456,789원</div>
          </div>
          <div class="detail-item">
            <div class="tit">비급여</div>
            <div class="price">456,789원</div>
          </div>
          <div class="detail-item">
            <div class="tit">환자부담금액</div>
            <div class="price">456,789원</div>
          </div>
        </div>
        <!-- 분석 실패시 .fail 추가 -->
        <div class="analyze">
          <div class="text">예상 실손의료비 보상금</div>
          <div class="price">956,789원</div>
        </div>
      </div>
      <div class="item">
        <div class="item-header">
          <div class="wrap-hospital">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="경북대학교병원" />
            <div class="wrap-hospital-info">
              <div class="name">경북대학교병원</div>
              <div class="wrap-info">
                <div class="item-info">2025.05.10</div>
                <div class="item-info">안과</div>
              </div>
            </div>
          </div>
          <!-- 통원: .visit, 입원: .admission -->
          <div class="label-status admission">입원</div>
        </div>
        <div class="detail-lists">
          <div class="detail-item">
            <div class="tit">총 금액</div>
            <div class="price"><strong>1,123,456원</strong></div>
          </div>
          <div class="detail-item">
            <div class="tit">급여</div>
            <div class="price">456,789원</div>
          </div>
          <div class="detail-item">
            <div class="tit">비급여</div>
            <div class="price">456,789원</div>
          </div>
          <div class="detail-item">
            <div class="tit">환자부담금액</div>
            <div class="price">456,789원</div>
          </div>
        </div>
        <!-- 분석 실패시 .fail 추가 -->
        <div class="analyze fail">
          <div class="text">실손 예상 보험금 분석에 실패했어요</div>
        </div>
      </div>
    </div>
    <div class="wrap-info-lists">
      <div class="item">실손의료비 예상 보상금은 진료내용과 보험 약관에 따라 달라질 수 있습니다.</div>
    </div>
    <div class="wrap-computed-again">
      <div class="text">다시 확인이 필요하신가요?</div>
      <button class="btn-again">실손의료비 보상금 다시 계산하기</button>
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="AI분석 숨은보상금 찾기 신청" class="lg w-full medium btn-sticky" :disabled="hasSelectedHospitals" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
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
}
.wrap-count {
  margin: 4rem -2rem 0;
  padding: 2.1rem 2rem;
  border-top: 0.1rem solid #EEEEEE;
  @include mixin.flex-container( justify-between items-center);
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
  .wrap-label {
    @include mixin.flex-container( items-center);
    gap: 0.8rem;
    .h-label {
      padding: 0.45rem 0.8rem;
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 130%;
      color: #555555;
      border: 0.1rem solid transparent;
      border-radius: 0.4rem;
      strong {
        font-weight: 700;
      }
      &.success {
        background-color: #F6F9FF;
        border-color: #4C7FF7;
      }
      &.fail {
        background-color: #FFF7F7;
        border-color: #F14960;
      }
    }
  }
  
}
.wrap-result-lists {
  background-color: #F4F4F4;
  margin: 0 -2rem;
  padding: 2rem;
  .item {
    border-radius: 1.2rem;
    background-color: #fff;
    padding: 2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item-header {
      @include mixin.flex-container( justify-between items-center);
      .wrap-hospital {
        @include mixin.flex-container(items-center);
        gap: 1.6rem;
        img {
          width: 4.8rem;
          height: 4.8rem;
        }
        .wrap-hospital-info {
          .name {
            font-weight: 700;
          }
          .wrap-info {
            @include mixin.flex-container(items-center);
            gap: 1.2rem;
            .item-info {
              font-size: 1.4rem;
              color: #555555;
              position: relative;
              &:not(:first-child)::before {
                content: '';
                display: inline-block;
                width: 0.1rem;
                height: 1.2rem;
                background-color: #E2E2E2;
                position: absolute;
                top: 50%;
                left: -0.6rem;
                transform: translateY(-50%);
              }
            }
          }
        }
      }
      .label-status {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        font-size: 1.2rem;
        font-weight: 500;
        &.visit {
          background-color: #FEF4CC;
          color: #8D7000;
        }
        &.admission {
          background-color: #EAF2CC;
          color: #506A1D;
        }
      }
    }
    .detail-lists {
      margin-top: 1.6rem;
      .detail-item {
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .price {
          font-size: 1.4rem;
          font-weight: 600;
          strong {
            font-size: 1.6rem;
            font-weight: 700;
          }
        }
      }
    }
    .analyze {
      margin-top: 1.6rem;
      padding: 1.6rem 2rem;
      background-color: #F6F9FF;
      border-radius: 0.8rem;
      border: 0.1rem solid #4C7FF7;
      @include mixin.flex-container(justify-between items-center);
      .text {
        font-size: 1.4rem;
        font-weight: 500;
        color: #555555;
      }
      .price {
        font-weight: 700;
      }
      &.fail {
        background-color: #FFF7F7;
        border-color: #F14960;
        text-align: center;
        justify-content: center;
        position: relative;
        .text {
          display: inline-block;
          margin-left: 0.4rem;
        }
        &::before {
          content: '';
          background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
          background-size: 100%;
          width: 2rem;
          height: 2rem;
          display: inline-block;
        }
      }
    }
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
.wrap-computed-again {
  margin: 2rem 0 8rem;
  padding: 2rem 0;
  border: 0.1rem solid #E2E2E2;
  border-radius: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    color: #555555;
  }
  .btn-again {
    margin-top: 1.2rem;
    padding: 0.7rem 1.6rem;
    border-radius: 0.6rem;
    background-color: #E8E8E8;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
  }
}
</style>
