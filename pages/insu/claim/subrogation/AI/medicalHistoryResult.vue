<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI분석 숨은 보상금 찾기"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <!-- TODO: 진료내역 없을때 활성화 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
      <div class="tit">숨은 보상금 찾기<br />신청 가능한 진료내역이 없어요.</div>
      <div class="sut-tit">진료내역을 업데이트 해서<br />최근 진료내역을 가져올 수 있어요.</div>
      <Button btn-type="line" element-type="button" aria-label="진료내역 다시 가져오기" class="xs w-auto pl-16 pr-16 medium" />
    </div> -->
    <h1 class="c-tit mt-24">
      <span class="text">
        AI분석을 통해<br />숨은 보상금을 찾아보세요
      </span>
    </h1>
    <div class="c-tit-sub">최근 3년간 통원 및 입원 진료 내역 중<br />질병 코드가 포함된 진료내역만 신청가능해요.
      <div class="icon" @click="toggleTooltip">
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10.5V6.75M10 13.2795V13.3125M17.5 10.5C17.5 14.6421 14.1421 18 10 18C5.85786 18 2.5 14.6421 2.5 10.5C2.5 6.35786 5.85786 3 10 3C14.1421 3 17.5 6.35786 17.5 10.5Z" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="tooltip" v-show="isTooltipOpen">
          <button type="button" class="c-tooltip-close-btn" aria-label="닫기" @click.stop="closeTooltip"></button>
          <div class="text">진료 내역을 업데이트해서 최근 진료 내역을 가져올 수 있어요.</div>
        </div>
      </div>
    </div>
    <div class="wrap-recent-searches">
      <div class="text">총 <strong>3</strong>건을 찾았어요.</div>
      <div class="wrap-status">
        <img class="img" src="/assets/images/insu/icon-loading.svg" alt="loading" />
        <span class="time">2025.04.11 12:12</span>
      </div>
    </div>
    <div class="wrap-grey">
      <div class="wrap-insurance-info-list">
        <div class="item">
          <div class="wrap-item-header">
            <div class="wrap-item-info">
              <img src="/assets/images/insu/logo_KUMedicine.svg" alt="logo" />
              <div class="name">경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원</div>
            </div>
            <Button btn-type="primary" element-type="button" aria-label="분석하기" class="xs" :width="8" />
          </div>
          <div class="wrap-item-lists">
            <div class="item-list">
              <div class="tit">진료내역</div>
              <i class="icon-arrow-right"></i>
            </div>
            <div class="item-list">
              <div class="tit-sub">총 진료내역</div>
              <div class="desc">3건</div>
            </div>
            <div class="item-list">
              <div class="tit-sub">숨은 보상금 찾기 가능한 내역</div>
              <div class="desc">2건</div>
            </div>
            <div class="item-list">
              <div class="tit">최근 신청결과</div>
              <i class="icon-arrow-right"></i>
            </div>
            <div class="item-list">
              <div class="tit-sub">신청일시</div>
              <div class="desc">2025.04.15 12:12</div>
            </div>
            <div class="item-list">
              <div class="tit-sub">AI 분석결과</div>
              <label class="h-label able">숨은 보상금 수령가능</label>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="wrap-item-header">
            <div class="wrap-item-info">
              <img src="/assets/images/insu/logo_KUMedicine.svg" alt="logo" />
              <div class="name">경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원</div>
            </div>
            <Button btn-type="primary" element-type="button" aria-label="분석하기" class="xs" :width="8" />
          </div>
          <div class="wrap-item-lists">
            <div class="item-list">
              <div class="tit">진료내역</div>
              <i class="icon-arrow-right"></i>
            </div>
            <div class="item-list">
              <div class="tit-sub">총 진료내역</div>
              <div class="desc">3건</div>
            </div>
            <div class="item-list">
              <div class="tit-sub">숨은 보상금 찾기 가능한 내역</div>
              <div class="desc">2건</div>
            </div>
            <div class="item-list">
              <div class="tit">최근 신청결과</div>
              <i class="icon-arrow-right"></i>
            </div>
            <div class="item-list">
              <div class="tit-sub">신청일시</div>
              <div class="desc">2025.04.15 12:12</div>
            </div>
            <div class="item-list">
              <div class="tit-sub">AI 분석결과</div>
              <label class="h-label able">숨은 보상금 수령가능</label>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="wrap-item-header">
            <div class="wrap-item-info">
              <img src="/assets/images/insu/logo_KUMedicine.svg" alt="logo" />
              <div class="name">경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원</div>
            </div>
            <Button btn-type="primary" element-type="button" aria-label="분석하기" class="xs" :width="8" />
          </div>
          <div class="wrap-item-lists">
            <div class="item-list">
              <div class="tit">진료내역</div>
              <i class="icon-arrow-right"></i>
            </div>
            <div class="item-list">
              <div class="tit-sub">총 진료내역</div>
              <div class="desc">3건</div>
            </div>
            <div class="item-list">
              <div class="tit-sub">숨은 보상금 찾기 가능한 내역</div>
              <div class="desc">2건</div>
            </div>
            <div class="item-list">
              <div class="tit">최근 신청결과</div>
              <i class="icon-arrow-right"></i>
            </div>
            <div class="item-list">
              <div class="tit-sub">신청일시</div>
              <div class="desc">2025.04.15 12:12</div>
            </div>
            <div class="item-list">
              <div class="tit-sub">AI 분석결과</div>
              <label class="h-label able">숨은 보상금 수령가능</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </BaseBody>
  <span @click="clickAgree" style="background-color: green;color:#fff;">약관동의 팝업 열림</span>

  <BottomModal
    :is-visible="isShowAgreeModal"
    title="약관동의"
    :is-show-cancel-button="false"
    confirm-button-text="다음"
    @close="isShowAgreeModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <div class="wrap-agree">
        <div class="wrap-company">
          <div class="agree-tit">AI분석 숨은 보상금을 찾아보고<br />전문가 무료상담을 위해 동의가 필요해요</div>
        </div>
        <div class="wrap-agree-check">
          <Checkbox id="checkBox1" v-model="checkbox1" custom-style="button agree-all" aria-label="전체동의" />
          <ul class="agree-list">
            <li class="item" @click="showDetailTerm">
              <Checkbox id="checkBox2" v-model="checkbox2" custom-style="small non-border" aria-label="[필수] 민감정보(진료정보) 제3자 제공 동의" />
              <i class="icon-arrow-right"></i>
            </li>
            <li class="item" @click="showDetailTerm">
              <Checkbox id="checkBox3" v-model="checkbox3" custom-style="small non-border" aria-label="[필수] 개인정보 제3자 제공 동의" />
              <i class="icon-arrow-right"></i>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </BottomModal>

  <FullModal
    :is-visible="isShowDetailTerm"
    title="동의서 약관명 입력"
    :is-show-cancel-button="false"
    :is-show-close-button="true"
    confirm-button-text="동의하기"
    @close="isShowDetailTerm = false"
    @confirm="clickAgreeTerm"
  >
    <template #content>
      <div class="wrap-agree-detail flex flex-col gap-10 pb-48">
        <div class="fz-14 semibold">1. 수집 · 이용에 관한 사항</div>
        <div class="agree-txt-box fz-14 flex flex-col gap-2">
          <div class="semibold">제1조(목적)</div>
          보험약관내용을 입력해주세요.
        </div>
        <div class="agree-txt-box fz-14 flex flex-col gap-2">
          <div class="semibold">제2조(용어의 정의)</div>
          본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          <ol class="num-type">
            <li>
              보험약관내용을 입력해주세요.
            </li>
            <li>
              보험약관내용을 입력해주세요.
            </li>
            <li>
              보험약관내용을 입력해주세요.
            </li>
          </ol>
        </div>
      </div>
    </template>
  </FullModal>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import FullModal from '~/components/common/modal/FullModal.vue'
import Checkbox from '~/components/publishing/input/check.vue'

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: 'AI분석 숨은 보상금 찾기'
  // utils: ['phone']
  // customTitle: 'logo',
})

const isTooltipOpen = ref(false)
const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value
}

const closeTooltip = () => {
  isTooltipOpen.value = false
}

const isShowAgreeModal = ref(false)
const isShowDetailTerm = ref(false)

// checkbox 변수들 추가
const checkbox1 = ref(false)
const checkbox2 = ref(false)
const checkbox3 = ref(false)

const clickAgree = () => {
  isShowAgreeModal.value = !isShowAgreeModal.value
}

const showDetailTerm = () => {
  isShowDetailTerm.value = !isShowDetailTerm.value
}

const clickAgreeTerm = () => {
  isShowDetailTerm.value = !isShowDetailTerm.value
}
const clickNext = () => {
  // 서류없이 청구
  return navigateTo('/insu/claim/inputDefaultInfoData')
  // // 사진찍어 청구 && 본인 방문
  // return navigateTo('/insu/claim/inputDefaultInfoData')
  // // 사진찍어 청구 && 최초청구일 경우: 가족 방문
  // return navigateTo('/insu/claim/picture/inputFamilyData')
}

const clickSignup = (type: string) => {
  // 설계사, 설계사 대리인에 따라 동의화면 이후 분기처리
  navigateTo('/insu/claim/subrogation/serviceNotInUse/term')
}
</script>

<style scoped lang="scss">




// 약관 동의 모달
.wrap-agree {
  .wrap-company {
    padding: 0 0.4rem;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    .logo {
      width: 5.6rem;
      height: auto;
    }
    .company {
      font-size: 1.6rem;
      font-weight: 700;
    }
    .agree-tit {
      text-align: left;
      font-size: 1.8rem;
      font-weight: 700;
    }
  }
  .wrap-agree-check {
    margin-top: 1.2rem;
    .agree-all {
      width: 100%;
    }
    .agree-list {
      padding: 1.2rem 1.6rem;
      .item {
        padding: 0.8rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-arrow-right {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
          background-size: 100%;
        }
      }
    }
  }
}
// 약관 상세
.wrap-agree-detail {
  text-align: left;
  .agree-txt-box {
    ol.num-type {
      list-style: none;
      counter-reset: list-counter;
      padding-left: 0;
      margin: 0;
  
      li {
        counter-increment: list-counter;
        position: relative;
        padding-left: 2.4rem;
        margin-bottom: 0.8rem;
        line-height: 1.6;
  
        &::before {
          content: '(' counter(list-counter) ')';
          position: absolute;
          left: 0;
          top: 0;
          font-weight: 500;
          color: #333;
        }
      }
    }
  }
}

// FullModal close 버튼 스타일 추가
:deep(.c-modal-close-btn) {
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  .icon.close {
    width: 2.4rem;
    height: 2.4rem;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z'%3E%3C/path%3E%3C/svg%3E") no-repeat center center;
    background-size: contain;
    color: #333;
  }
}

.c-tit-sub {
  align-items: flex-end;
  .icon {
    margin-bottom: 0.3rem;
  }
}
.wrap-recent-searches {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 0;
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
  .wrap-status {
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
}
.wrap-grey {
  position: relative;
  margin: 0 -2rem 0;
  padding: 2.4rem 2rem 4rem;
  background-color: #F4F4F4;
}
.wrap-insurance-info-list {
  .item {
    padding: 2rem;
    border-radius: 1.2rem;
    background-color: #fff;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .wrap-item-header {
      @include mixin.flex-container(justify-between items-center);
      gap: 0.4rem;
      .wrap-item-info {
        @include mixin.flex-container(items-center);
        gap: 1.6rem;
        flex: 1;
        min-width: 0;
        .name {
          font-weight: 700;
          flex: 1;
          min-width: 0;
          max-width: 100%;
          @include mixin.ellipsis;
        }
      }
    }
    .wrap-item-lists {
      .item-list {
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child):has(.tit) {
          margin-top: 2.4rem;
        }
        &:has(.tit-sub) {
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.4rem;
          font-weight: 700;
        }
        .tit-sub {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .desc {
          font-size: 1.4rem;
          font-weight: 600;
        }
        .icon-arrow-right {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
          background-size: 100%;
        }
        .h-label {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 130%;
          &.able {
            color: #4C7FF7;
            background-color: #E5EDFF;
          }
        }
      }
    }
    .wrap-item-lists {
      margin-top: 1.6rem;
      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          margin-left: 0.4rem;
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .wrap-desc {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          .desc {
            font-weight: 1.4rem;
            font-weight: 600;
          }
          .icon-arrow-down {
            display: inline-block;
            width: 1.6rem;
            height: 1.6rem;
            background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
            background-size: 100%;
            transition: transform 0.3s ease;
            cursor: pointer;
            &.rotated {
              transform: rotate(180deg);
            }
          }
        }
        .wrap-detail {
          margin-top: 1.2rem;
          width: 100%;
          padding: 1.6rem 2rem;
          border-radius: 1.2rem;
          background-color: #F4F4F4;
          .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:not(:first-child) {
              margin-top: 1.2rem;
            }
            .detail-tit {
              font-size: 1.3rem;
              font-weight: 500;
              color: #959595;
            }
            .detail-desc {
              font-size: 1.3rem;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}
.wrap-empty {
  margin-top: 2rem;
  padding: 23rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%;
    color: #555555;
    text-align: center;
  }
  .sut-tit {
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 140%;
    color: #555;
    text-align: center;
  }
}
.wrap-radio-btn {
  margin-top: 1.6rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
}
</style>
