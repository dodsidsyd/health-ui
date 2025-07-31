<template>
  <div class="store-item-wrap">
    <div class="gift-detail-box">
      <img :src="imageName" alt="선물 이미지" />
      <div class="gift-detail-text">
        <span class="brand"> {{ brandName }}</span>
        <p class="gift-name">{{ giftName }}</p>
        <p class="description">{{ description }}</p>
      </div>
    </div>
    <div class="use-guide">
      <p class="guide-tit">이용안내</p>
      <ul>
        <li>상기 이미지는 연출된 것으로 실제와 다를 수 있습니다.</li>
        <li>본 상품은 매장 재고 상황에 따라 동일 상품으로 교환이 불가능할 수 있습니다.</li>
        <li>
          동일 상품 교환이 불가한 경우 다른 상품으로 교환이 가능합니다. (차액 발생 시 차액 지불) 만약 다른 상품으로
          교환을 원치 않을 경우 매장에서 환불 요청 접수가 가능하며, 환불 요청 접수 시 카카오에서 쿠폰 수신자에게 환불
          진행을 위한 알림톡을 발송합니다.
        </li>
        <li>본 상품은 스타벅스 어플 홈 > Coupon > 모바일 상품권에 추가해 편리하게 사용하실 수 있습니다.</li>
        <li>
          상품 결제 시 본 상품 권면에 기재된 금액의 60% 이상을 결제한 후 남은 잔액은 회원의 계정에 등록된 스타벅스
          카드나 보유하고 있는 무기명 스타벅스 카드에 충전됩니다. 스타벅스 카드를 등록 또는 보유하고 있지 않은 고객의
          경우, 무기명 스타벅스 카드를 발급받아 잔액을 충전할 수 있습니다. (일부 매장 잔액 적립 불가)
        </li>
        <li>스타벅스 앱의 사이렌 오더를 통해서도 주문 및 결제가 가능합니다. (일부 MD제외)</li>
        <li>미군부대 매장, 워터파크 입점 매장 등 일부 매장에서는 사용이 불가합니다.</li>
        <li>
          해당 쿠폰과 스타벅스 카드의 복합결제 거래는 스타벅스 카드의 고유 혜택인 Free Extra 및 별 적립은 적용 대상이
          아닌 점 이용에 참고하시기 바랍니다.
        </li>
        <li>
          정식 판매처 외의 장소나 경로를 통하여 구매하거나, 기타의 방법으로 보유하신 쿠폰은 정상적인 사용 (환불, 재전송
          등 포함)이 금지되거나 제한될 수 있으니 주의하시기 바랍니다.
        </li>
        <li>해당 쿠폰을 무단으로 가공하는 등의 행위는 관계 법령에 위반될 수 있습니다.</li>
        <li>
          본 상품페이지에 포함된 콘텐츠(상표, 썸네일, 이미지)는 (주)에스씨케이컴퍼니의 자산입니다. 허가없이 무단 복제 및
          상업적 용도로 게재 및 재배포, 판매 시 반드시 법적 책임을 묻겠습니다.
        </li>
      </ul>
    </div>
    <div class="item-information">
      <p class="guide-tit">상품 고시정보</p>
      <TableWrap :table-data="tableData" :table-class="'text-left'" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import TableWrap from '~/components/common/tableWrap.vue'
const props = defineProps({
  imageName: { type: String, default: '' },
  brandName: { type: String, default: '브랜드' },
  giftName: { type: String, default: '상품 이름' },
  description: { type: String, default: '상품 설명' }
})
const tableData = {
  cols: [{ width: '10.4rem' }],
  headers: [],
  body: [
    [{ type: 'th', text: '발행자' }, { text: '(주)카카오' }],
    [{ type: 'th', text: '교환권 공급자' }, { text: '(주)에스씨케이컴퍼니' }],
    [{ type: 'th', text: '유효기간' }, { text: '3개월(93일)' }],
    [
      { type: 'th', text: '이용조건' },
      {
        text: '보유하신 교환권은 무상 교환권 및 프로모션 상품으로 유효기간 연장이 불가합니다. 또한, 취소/환불이 불가한 상품입니다.'
      }
    ],
    [{ type: 'th', text: '이용 가능 매장' }, { text: '상품상세설명참조' }],
    [
      { type: 'th', text: '환불조건 및 방법' },
      {
        text: '구매자취소(청약철회) 가능 기간까지는 구매자가 취소를 요청할수 있으며 실제 결제 금액의 100%가 구매자에게 결제 취소/ 환불 됩니다. 이후에는 수신자가 환불을 요청할수 있으며 실제 결제 금액의 90%가 수신자에게 환불 됩니다.(구매자와 수신자가 동일하다면 원결제 수단으로 결제 취소/ 환불) 유효기간 이후에는 수신자의 선택에 따라 실제 결제 금액의 90%를 현금 환불 받거나, 실제 결제 금액의 100%를 무상 쇼핑포인트로 적립 받을 수 있습니다(2023년 9월 1일 이후 판매된 교환권만 적용, 유효기간 연장 불가 상품은 90% 현금 환불만 가능). 선물취소, 환불은 선물함에서 직접 할수 있습니다.'
      }
    ]
  ]
}
</script>
<style scoped lang="scss">
.store-item-wrap {
  .guide-tit {
    margin-top: 2rem;
    margin-bottom: 1.6rem;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
    text-align: left;
  }
}
.gift-detail-box {
  display: flex;
  margin-bottom: 1.6rem;
  img {
    width: 8.8rem;
    height: 8.8rem;
  }
  .gift-detail-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 2rem;
  }
  .brand {
    display: inline-block;
    background: #e9ecef;
    padding: 0.3rem 0.6rem;
    border-radius: 0.3rem;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
  .gift-name {
    margin-top: 0.6rem;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.2rem;
  }
  .type {
    display: inline-block;
    margin-top: 1.2rem;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.2rem;
  }
  .description {
    margin-top: 0.2rem;
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
}
.use-guide {
  ul {
    text-align: left;
    li {
      position: relative;
      margin-bottom: 0.8rem;
      padding-left: 0.9rem;
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #555;
      &:last-child {
        margin-bottom: 0;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 0.9rem;
        height: 1.6rem;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='16' viewBox='0 0 9 16' fill='none'%3E%3Ccircle cx='1.5' cy='8.5' r='1.5' fill='%23959595'/%3E%3C/svg%3E")
          center / 100% no-repeat;
      }
    }
  }
}
.item-information {
  padding-bottom: 4.8rem;
}
</style>
