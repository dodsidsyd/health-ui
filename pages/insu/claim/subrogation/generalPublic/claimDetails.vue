<template>
  <BaseBody
    :show-back-button="true"
    page-title="청구 상세내역 조회"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <h1 class="c-tit mt-40">
      <span class="text">
        청구할 내용을 확인해 주세요
      </span>
    </h1>
    <FlexSection>
      <div class="medical-info">
        <div class="medical-info-head">
          <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
          <div class="wrap-hospital">
            <div class="text">강동성심병원 강동성심병원 강동성심병원 강동성심병원 강동성심병원 강동성심병원 </div>
          </div>
        </div>
        <label for="status" class="label done">청구완료</label>
      </div>
    </FlexSection>
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <div class="wrap-claim-detail">
      <h2 class="tit">청구내역</h2>
      <ul class="detail-list">
        <li class="item">
          <div class="tit">청구일</div>
          <div class="desc">2025.04.01</div>
        </li>
        <li class="item">
          <div class="tit">피보험자(치료 받은 분)</div>
          <div class="desc">이레몬</div>
        </li>
        <li class="item">
          <div class="tit">수익자(보험금 받는 분)</div>
          <div class="desc">이헬스</div>
        </li>
        <li class="item">
          <div class="tit">사고유형</div>
          <div class="desc">질병</div>
        </li>
        <li class="item">
          <div class="tit">사고내용</div>
          <div class="desc">감기몸살</div>
        </li>
        <li class="item">
          <div class="tit">보험금 수령계좌</div>
          <div class="desc">국민은행(이레몬)<br/>1324567897897</div>
        </li>
        <li class="item">
          <div class="tit">보상안내 연락처</div>
          <div class="desc">박미란(설계사)<br />010-1111-2222</div>
        </li>
        <li class="item">
          <div class="tit">첨부서류</div>
          <button type="button" class="btn-detail">상세보기</button>
        </li>
      </ul>
      <div class="wrap-memo">
        <div class="text">메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다.</div>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'

</script>

<style scoped lang="scss">
.wrap-claim-detail {
  margin: 0 -2rem 5.6rem;
  h2.tit {
    border-bottom: 0.1rem solid #EEEEEE;
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
      }
      .btn-detail {
        border: 0.1rem solid #E2E2E2;
        padding: 0.6rem 1.2rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: #555555;
        border-radius: 1.4rem;
      }
    }
  }
}

.medical-info {
  margin-top: 3.2rem;
  border: 0.1rem solid #E2E2E2;
  border-radius: 1.2rem;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0; // 추가: flex 아이템이 부모를 넘지 않도록 설정
  .medical-info-head {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    flex: 1; // 추가: 남은 공간을 모두 차지하도록 설정
    min-width: 0; // 추가: flex 아이템이 부모를 넘지 않도록 설정
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-hospital {
      flex: 1; // 변경: 1 0 auto에서 1로 변경
      min-width: 0; // 추가: flex 아이템이 부모를 넘지 않도록 설정
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        flex: 1;
        min-width: 0;
        font-weight: 700;
        @include mixin.ellipsis;
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
  .label {
    display: inline-block;
    padding: 0.3rem 0.6rem;
    border-radius: 0.3rem;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 130%;
    flex: 0 0 auto; // 추가: 크기 고정
    margin-left: 1.2rem; // 추가: 왼쪽 여백 추가
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
    // ToDo: medicalHistory.vue에서 '입원'일때 아래 color 사용. 확인 필요
    // &.in {
    //   background-color: #EAF2CC;
    //   color: #506A1D;
    // }
    // 청구완료
    &.done {
      background-color: #629105;
      color: #ffffff;
    }
  }
  .medical-info-desc {
    margin-top: 1.6rem;
    padding-top: 1.6rem;
    border-top: 0.1rem solid #EEEEEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      color: #555555;
    }
    .price {
      font-weight: 500;
      color: #4C7FF7;
    }
  }
}
.wrap-memo {
  margin: 0 2rem;
  padding: 1.2rem;
  background-color: #F9F8F7;
  border-radius: 0.8rem;
  border: 0.1rem solid #E2E2E2;
  .text {
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    @include mixin.multi-ellipsis(2); // 최대 두 줄로 표시
  }
}
</style>
