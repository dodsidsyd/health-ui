<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="agree-wrap flex flex-col gap-10 mt-40">
      <h1 class="c-tit">
        <span class="text">
          다녀온 병원을 검색해 주세요
        </span>
      </h1>
      <div class="c-tit-sub">서류 없이도 청구 가능한 병원인지 알 수 있어요.</div>
      <InputText class="search-hospital" inp-type="search" placeholder="병원 이름을 입력해 주세요." />
    </div>
    
    <FlexSection>
      <div class="wrap-recent-searches">
        <div class="text">최근 검색</div>
        <Button btn-type="text" element-type="button" aria-label="전체삭제" class="hasLine xs" />
      </div>
      <!-- ToDo: line16에 입력값이 있으면 위에는 비활성화, 아래 활성화 -->
      <!-- <div class="wrap-claim-type">
        <Checkbox id="checkBox1" v-model="isPaperlessClaim" aria-label="서류없이청구" />
        <Checkbox id="checkBox2" v-model="isMyHospital" aria-label="MY병원" />
      </div> -->
    </FlexSection>
    <div class="wrap-hospitals">
      <button class="item">
        <img src="/assets/images/insu/logo_KUMedicine.svg" alt="고려대학교 안암병원" class="hospital-logo" />
        <div class="wrap-hospital-desc">
          <div class="wrap-desc">
            <span class="tit">고려대학교 안암병원</span>
            <span class="address">서울특별시 성북구 고려대로 73</span>
          </div>
          <div class="wrap-label">
            <div class="h-label my">MY병원</div>
            <div class="h-label no-doc">종합병원</div>
            <div class="h-label">외래, 입원</div>
          </div>
        </div>
        <!-- ToDo: 버블링 안되게 코딩 할것 -->
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          <!-- ToDo: line16에 입력값에 따라 검색된 내용이 나옴. 위는 비활성화, 아래는 활성화 된 모양 -->
          <!-- <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" /> -->
        </div>
      </button>
      <button class="item">
        <img src="/assets/images/insu/logo_KUMedicine.svg" alt="고려대학교 안암병원" class="hospital-logo" />
        <div class="wrap-hospital-desc">
          <div class="wrap-desc">
            <span class="tit">고려대학교 안암병원</span>
            <span class="address">서울특별시 성북구 고려대로 73</span>
          </div>
          <div class="wrap-label">
            <div class="h-label my">MY병원</div>
            <div class="h-label no-doc">종합병원</div>
            <div class="h-label">외래, 입원</div>
          </div>
        </div>
        <!-- ToDo: 버블링 안되게 코딩 할것 -->
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          <!-- ToDo: line16에 입력값에 따라 검색된 내용이 나옴. 위는 비활성화, 아래는 활성화 된 모양 -->
          <!-- <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" /> -->
        </div>
      </button>
      <button class="item">
        <img src="/assets/images/insu/logo_KUMedicine.svg" alt="고려대학교 안암병원" class="hospital-logo" />
        <div class="wrap-hospital-desc">
          <div class="wrap-desc">
            <span class="tit">고려대학교 안암병원</span>
            <span class="address">서울특별시 성북구 고려대로 73</span>
          </div>
          <div class="wrap-label">
            <div class="h-label my">MY병원</div>
            <div class="h-label no-doc">종합병원</div>
            <div class="h-label">외래, 입원</div>
          </div>
        </div>
        <!-- ToDo: 버블링 안되게 코딩 할것 -->
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          <!-- ToDo: line16에 입력값에 따라 검색된 내용이 나옴. 위는 비활성화, 아래는 활성화 된 모양 -->
          <!-- <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" /> -->
        </div>
      </button>
    </div>
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
import FlexSection from '~/components/page/FlexSection.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
import Checkbox from '~/components/publishing/input/check.vue'

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
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 140%;
    color: #2B2B2B;
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
        margin-top: 0.4rem;
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
