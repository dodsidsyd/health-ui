<template>
  <BaseBody
    :show-back-button="false"
    page-title="입원비 청구 안내"
    logo-type="text"
    :has-add-text-left="true"
    :has-close-btn="true"
    class="pb-36"
  >
    <div class="wrap-payment-main">
      <h1 class="c-tit">
        <span class="text">병원에서<br />진단서를 발급 받으셨나요?</span>
      </h1>
      <img
        class="img-payment-main"
        src="/assets/images/insu/img-paymentInstructions-main.png"
        alt="입원비 청구 이미지"
      />
      <div class="wrap-payment-method">
        <div class="item">
          <img class="img-method" src="/assets/images/insu/icon-hospital-doc.svg" alt="입원비 청구 방법 1" />
          <div class="wrap-desc">
            <div class="tit">진단서만 있으면 입원비 청구도 빠르게!</div>
            <div class="sub-tit">진단서 사본 발급 안내 확인 후,<br />진단서만 준비해주세요.</div>
          </div>
        </div>
        <div class="item">
          <img class="img-method" src="/assets/images/insu/icon-hospital-nondoc.svg" alt="입원비 청구 방법 2" />
          <div class="wrap-desc">
            <div class="tit">청구의신에서 진료비 서류 발급 한번에!</div>
            <div class="sub-tit">제휴병원에서 진료비 영수증/ 세부내역서가<br />자동 발급돼요.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap-payment-instructions-info">
      <!-- 클래스 추가 및 툴팁 위치 변경 -->
      <h2 class="tit2 c-tit-sub">
        진단서 사본 발급 방법 안내
        <div class="icon" @click="toggleTooltip">
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 10.5V6.75M10 13.2795V13.3125M17.5 10.5C17.5 14.6421 14.1421 18 10 18C5.85786 18 2.5 14.6421 2.5 10.5C2.5 6.35786 5.85786 3 10 3C14.1421 3 17.5 6.35786 17.5 10.5Z"
              stroke="#555555"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="tooltip" v-show="isTooltipOpen">
            <button type="button" class="c-tooltip-close-btn" aria-label="닫기" @click.stop="closeTooltip"></button>
            <div class="text">
              자동생성된 진단서가 보험사로 전송되지 않을 수 있으니, 아래 방법 중 하나로 진단서를 준비해주세요.
            </div>
          </div>
        </div>
      </h2>
      <div class="wrap-spread">
        <div class="item">
          <div class="item-head" @click="toggleItem(0)">
            <img
              class="ico-payment-method"
              src="/assets/images/insu/icon-payment-method1.svg"
              alt="진단서 발급 방법1"
            />
            <div class="wrap-desc">
              <div class="text">청구에신에서 발급하기</div>
              <div class="label">가능</div>
            </div>
            <i class="icon-arrow-down" :class="{ rotated: expandedItems[0] }"></i>
          </div>
          <div class="item-body" :class="{ expanded: expandedItems[0] }">
            <div class="spread-tit">청구의신 병원 서류발급 서비스를 이용하여 진단서 사본을 발급해요.</div>
            <ul class="spread-list circle-num">
              <li>병원 서류 발급 > 병원 선택</li>
              <li>진단서 사본 발급 선택</li>
              <li>발급 수수료 결제</li>
            </ul>
            <div class="spread-desc">발급 수수료는 병원에 따라 달라질 수 있어요.</div>
            <Button btn-type="primary" element-type="button" aria-label="발급하기" class="sm" />
          </div>
        </div>
        <div class="item">
          <div class="item-head" @click="toggleItem(1)">
            <img
              class="ico-payment-method"
              src="/assets/images/insu/icon-payment-method2.svg"
              alt="진단서 발급 방법2"
            />
            <div class="wrap-desc">
              <div class="text">병원 홈페이지에서 발급하기</div>
              <div class="label">가능</div>
            </div>
            <i class="icon-arrow-down" :class="{ rotated: expandedItems[1] }"></i>
          </div>
          <div class="item-body" :class="{ expanded: expandedItems[1] }">
            <div class="spread-tit">병원 홈페이지에서 진단서 사본을 발급해요.</div>
            <ul class="spread-list circle-num">
              <li>병원 홈페이지 접속</li>
              <li>진단서 조회 및 사본 신청</li>
              <li>발급 수수료 결제</li>
            </ul>
            <div class="spread-desc">발급 수수료는 병원에 따라 달라질 수 있어요.</div>
          </div>
        </div>
        <div class="item">
          <div class="item-head" @click="toggleItem(2)">
            <img
              class="ico-payment-method"
              src="/assets/images/insu/icon-payment-method3.svg"
              alt="진단서 발급 방법3"
            />
            <div class="wrap-desc">
              <div class="text">병원 방문 후 직접 발급하기</div>
              <div class="label">가능</div>
            </div>
            <i class="icon-arrow-down" :class="{ rotated: expandedItems[2] }"></i>
          </div>
          <div class="item-body" :class="{ expanded: expandedItems[2] }">
            <div class="spread-tit">
              신분증을 지참하신 후 실손청구 하실 병원에<br />직접 방문하여 진단서 사본 발급을 신청해요.
            </div>
            <div class="spread-desc">각 병원의 운영 시간을 꼭 확인하신 후 방문해주세요.</div>
          </div>
        </div>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'

const isTooltipOpen = ref(false)
const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value
}

const closeTooltip = () => {
  isTooltipOpen.value = false
}

// 각 item의 확장 상태를 관리하는 배열
const expandedItems = ref([false, false, false])

// item 토글 함수
const toggleItem = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}
</script>

<style scoped lang="scss">
.wrap-payment-main {
  margin: 0 -2rem;
  padding: 0.8rem 2rem 2.4rem;
  background-color: #e7f4ff;
  .img-payment-main {
    margin: 0.8rem auto;
    width: 28rem;
    height: auto;
  }
  .wrap-payment-method {
    padding: 0.8rem 0;
    border-radius: 1.2rem;
    background-color: #fff;
    .item {
      margin: 1.2rem 0;
      padding: 0.4rem 1.2rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      &:not(:first-child) {
        border-top: 0.1rem solid #eeeeee;
      }
      .img-method {
        width: 7.2rem;
        height: 7.2rem;
      }
      .wrap-desc {
        .tit {
          font-size: 1.6rem;
          font-weight: 700;
          color: #2b2b2b;
        }
        .sub-tit {
          margin-top: 0.2rem;
          font-size: 1.4rem;
          font-weight: 500;
          color: #555555;
        }
      }
    }
  }
}

h2.tit2 {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 140%;
  color: #2b2b2b;
  margin-top: 3.2rem;
  display: flex;
  align-items: center;
  .icon {
    .tooltip {
      width: calc(100% - 4rem);
      left: 2rem;
    }
  }
}
.wrap-payment-instructions-info {
  margin: 0 -2rem;
  h2 {
    padding: 0 2rem;
  }
  .wrap-spread {
    margin-top: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .item {
      width: 100%;
      &:not(:first-child) {
        border-top: 0.1rem solid #eeeeee;
      }
      &:last-child .item-body {
        border-bottom: 0.1rem solid #eeeeee;
      }
      .item-head {
        padding: 1.2rem 2.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.2rem;
        cursor: pointer;
        transition: background-color 0.2s ease;

        .ico-payment-method {
          flex: 0 0;
          width: 4.8rem;
          height: auto;
        }
        .wrap-desc {
          flex: 1 0 auto;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          .text {
            font-size: 1.6rem;
            font-weight: 700;
            color: #2b2b2b;
          }
          .label {
            flex: 0 0;
            padding: 0.3rem 0.6rem;
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 130%;
            color: #4c7ff7;
            background-color: #e5edff;
            border-radius: 0.4rem;
          }
        }
        i.icon-arrow-down {
          width: 2rem;
          height: 2rem;
          background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
          background-size: 100%;
          transition: transform 0.3s ease;
          transform-origin: center center;

          &.rotated {
            transform: rotate(180deg);
          }
        }
      }
      .item-body {
        max-height: 0;
        overflow: hidden;
        transition:
          max-height 0.3s ease,
          padding 0.3s ease,
          border-top 0.3s ease;
        padding: 0 2rem;
        border-top: 0.1rem solid transparent;
        background-color: #f9f9f9;

        &.expanded {
          max-height: 50rem; // 충분한 높이로 설정
          padding: 2.4rem 2rem;
          border-top: 0.1rem solid #eeeeee;
        }

        .spread-tit {
          font-size: 1.6rem;
          font-weight: 500;
          color: #2b2b2b;
        }
        .spread-list {
          margin-top: 1.6rem;
          counter-reset: num;
          li {
            position: relative;
            counter-increment: num;
            padding-left: 2.6rem;
            font-size: 1.6rem;
            font-weight: 500;
            color: #555555;
            &::before {
              content: counter(num);
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              background: #4f5561;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.2rem;
              font-weight: 500;
              line-height: 130%;
            }
            &:not(:first-child) {
              margin-top: 0.8rem;
            }
          }
          & + .spread-desc {
            margin-top: 0.2rem;
            margin-left: 3rem;
          }
        }
        .spread-desc {
          margin-top: 1.6rem;
          font-size: 1.4rem;
          font-weight: 500;
          color: #959595;
        }
        .c-btn {
          margin-top: 1.6rem;
        }
      }
    }
  }
}
</style>
