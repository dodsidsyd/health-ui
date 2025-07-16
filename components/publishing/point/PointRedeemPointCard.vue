<template>
  <div class="redeem-points">
    <div class="request-point">
      <dl>
        <dt>
          <strong class="tit">환전요청 포인트</strong>
        </dt>
        <dd>16,200P</dd>
      </dl>
      <Checkbox class="small" id="chk1" v-model="checkbox1" ariaLabel="환전가능 전액 16,200P" />
    </div>

    <div class="estimated-calculate">
      <dl>
        <dt>
          <strong class="tit">예상환전금액</strong>
        </dt>
        <dd>16,200P</dd>
      </dl>
      <dl>
        <dt>
          <div class="tax-wrap"><strong class="tit">환전수수료</strong> 대상금액의 10%(10,000P 이하는 1,000P)</div>
        </dt>
        <dd class="refund-point">- 1,620P</dd>
      </dl>
    </div>

    <div class="estimated-payout">
      <dl>
        <dt>
          <strong class="tit">예상환전금액</strong>
        </dt>
        <dd class="payouot-price">14,580원</dd>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Checkbox from '~/components/publishing/input/check.vue'

const checkbox1 = ref(false)
</script>

<style scoped lang="scss">
.redeem-points {
  display: flex;
  flex-direction: column;
  gap: 0.8rem 0;
  .request-point,
  .estimated-calculate,
  .estimated-payout {
    border-radius: 0.8rem;
    border: 0.1rem solid #e2e2e2;
    padding: 1.8rem 1.6rem;
    background: vars.$white;
    &.estimated-calculate {
      position: relative;
      &::before {
        content: '';
        display: block;
        width: 3.2rem;
        height: 3.2rem;
        position: absolute;
        top: -2rem;
        background-color: #f4f4f4;
        border-radius: 50%;
        left: 50%;
        transform: translateX(-50%);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 2.1rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21' fill='none'%3E%3Cpath d='M10.122 3.93644C10.3214 3.7062 10.6786 3.7062 10.878 3.93644L14.3301 7.92267C14.6106 8.2465 14.3806 8.75 13.9522 8.75H7.04782C6.61944 8.75 6.38941 8.2465 6.66985 7.92267L10.122 3.93644Z' fill='%23555555'/%3E%3Cpath d='M10.122 17.0636C10.3214 17.2938 10.6786 17.2938 10.878 17.0636L14.3301 13.0773C14.6106 12.7535 14.3806 12.25 13.9522 12.25H7.04782C6.61944 12.25 6.38941 12.7535 6.66985 13.0773L10.122 17.0636Z' fill='%23555555'/%3E%3C/svg%3E");
      }
    }
    &.estimated-payout {
      border-color: vars.$blue-primary;
      background: #f6f9ff;
    }
    dl {
      display: flex;
      justify-content: space-between;
      & + dl {
        margin-top: 0.4rem;
      }
      dt {
        display: flex;
        flex-direction: column;
        color: #959595;
        line-height: 2.2rem;
        .tit {
          font-size: 1.4rem;
          font-weight: 500;
          color: #555;
        }

        .tax-wrap {
          font-size: 1.1rem;
          display: flex;
          gap: 0 0.4rem;
        }
      }
      dd {
        font-size: 1.6rem;
        font-weight: 700;
        flex: 0 0 auto;
        &.refund-point {
          font-size: 1.4rem;
          color: #555;
          font-weight: 500;
        }
      }
    }
    :deep(.c-label) {
      color: #555;
      font-weight: 500;
      margin-top: 0.5rem;
      &::after {
        font-size: 1.2rem;
      }
    }
  }
  .payouot-price {
    color: vars.$blue-primary;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2.2rem;
  }
}
</style>
