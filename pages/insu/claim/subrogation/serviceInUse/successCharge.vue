<template>
  <BaseBody>
    <div class="wrap-completed-main">
      <img src="/assets/images/insu/img-completed-02.png" alt="전송완료" />
      <h1 class="c-tit">청구서 전송을 완료했어요</h1>
    </div>
    <div class="wrap-claim-list">
      <div class="claim-item">
        <div class="tit">청구 보험사</div>
        <div class="desc">DB손해보험</div>
      </div>
      <div class="claim-item">
        <div class="tit">피보험자(치료 받은 분)</div>
        <div class="desc">이헬스</div>
      </div>
      <div class="claim-item">
        <div class="tit">수익자(보험금 받는 분)</div>
        <div class="desc">김레몬</div>
      </div>
    </div>
    <div class="wrap-info-list">
      <div class="item">청구서 전송 실패 시 카카오 알림톡으로 별도 안내해 드립니다.</div>
      <div class="item">청구서가 보험사에 접수되면 해당 보험사에서 (고객님 휴대폰으로) 안내문자를 발송합니다.</div>
      <div class="item">
        청구내역 중 비급여 항목이 존재하는 경우 진료비 세부내역서를 제출해야하며, 그외 보상 관련이나 추가 서류 관련
        문의는 해당 보험사로 직접 문의 부탁드립니다.
      </div>
    </div>
    <Button
      class="btn-icon"
      btn-type="text"
      element-type="button"
      aria-label="다른 보험사도 청구하기"
      icon="ico-greater-than"
      icon-position="right"
      :icon-size="16"
      icon-color="#959595"
      @click="otherChargeInsuCompany"
    />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="청구의신 홈으로"
      class="lg w-full medium btn-sticky"
      @click="movePage"
    />
  </ButtonGroup>
  <!-- <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="movePage">청구의신 홈으로</button>
  </BaseFooter> -->
  <!-- <div @click="otherChargeInsuCompany">다른 보험사도 청구하기</div> -->
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

const movePage = () => {
  navigateTo('/insu')
}

const otherChargeInsuCompany = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/selectInsuranceCompany')
}
</script>

<style scoped lang="scss">
.wrap-completed-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrap-claim-list {
  margin-top: 4rem;
  .claim-item {
    padding: 1.6rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
    }
    .tit {
      color: #555555;
    }
    .desc {
      font-weight: 500;
    }
  }
}
.wrap-info-list {
  margin-top: 1.6rem;
  .item {
    padding-left: 1rem;
    font-size: 1.4rem;
    color: #555555;
    position: relative;
    &:not(:first-child) {
      margin-top: 0.8rem;
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background-color: #959595;
      border-radius: 50%;
      width: 0.3rem;
      height: 0.3rem;
    }
  }
}
.c-btn.btn-icon {
  display: flex;
  margin-top: auto;
  margin-bottom: 5.2rem;
  align-items: center;
}
</style>
