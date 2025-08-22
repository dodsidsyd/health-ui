<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <h1 class="c-tit mt-40">
      <span class="text"> 청구할 보험사를 선택해 주세요 </span>
    </h1>
    <div class="wrap-hospitals">
      <button class="item">
        <img src="/assets/images/insu/logo_kbbank.svg" alt="KB국민은행" class="hospital-logo" />
        <div class="wrap-hospital-desc">
          <div class="wrap-label">
            <div class="h-label brown">미청구</div>
          </div>
          <div class="wrap-desc">
            <span class="tit">DB손해보험</span>
            <span class="address">기업은행 123-456-7894</span>
          </div>
        </div>
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" />
        </div>
      </button>
      <button class="item">
        <img src="/assets/images/insu/logo_kbbank.svg" alt="KB국민은행" class="hospital-logo" />
        <div class="wrap-hospital-desc">
          <div class="wrap-label">
            <div class="h-label brown">미청구</div>
          </div>
          <div class="wrap-desc">
            <span class="tit">DB손해보험</span>
            <span class="address">기업은행 123-456-7894</span>
          </div>
        </div>
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" />
        </div>
      </button>
      <button class="item">
        <img src="/assets/images/insu/logo_kbbank.svg" alt="KB국민은행" class="hospital-logo" />
        <div class="wrap-hospital-desc">
          <div class="wrap-label">
            <div class="h-label brown">미청구</div>
          </div>
          <div class="wrap-desc">
            <span class="tit">DB손해보험</span>
            <span class="address">기업은행 123-456-7894</span>
          </div>
        </div>
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" />
        </div>
      </button>
    </div>
    <Button btn-type="line" element-type="button" aria-label="보험사 추가/수정" class="sm mt-16" />
    <!-- ToDo: 결과값 없을때 아래 활성화 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
      <div class="tit">검색 결과가 없어요.</div>
      <div class="sut-tit">병원 이름을 잘못 입력했거나<br />아직 제휴 전인 병원이에요.</div>
    </div> -->
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
// import FlexSection from '~/components/page/FlexSection.vue'
// import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
// import Checkbox from '~/components/publishing/input/check.vue'

// 체크박스 상태 관리
const isPaperlessClaim = ref(true)
const isMyHospital = ref(false)
</script>

<style scoped lang="scss">
.wrap-hospitals {
  // border-top: 0.1rem solid #EEEEEE;
  margin: 3.2rem -2rem 0;
  padding: 0 2rem;
  .item {
    padding: 2rem 0;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    width: 100%;
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
    }
    .hospital-logo {
      width: 6.4rem;
      height: 6.4rem;
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
          display: block;
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1.4;
          color: #2b2b2b;
          width: 100%;
          @include mixin.ellipsis;
          overflow: hidden;
          word-wrap: break-word;
          word-break: break-all;
        }
        .address {
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
        // margin-top: 0.4rem;
        display: flex;
        gap: 0.4rem;
        + .wrap-desc {
          margin-top: 0.4rem;
        }
        .h-label {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          background-color: #eeeeee;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 1.3;
          color: #555555;
          &.no-doc {
            background-color: #e5edff;
            color: #4c7ff7;
          }
          &.my {
            background-color: #4c7ff7;
            color: #fff;
          }
          &.brown {
            background-color: #bd9600;
            color: #fff;
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
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.4;
    color: #555;
  }
  .sub-tit {
    margin-top: 0.8rem;
    font-size: 1.6rem;
    color: #555;
  }
}
</style>
