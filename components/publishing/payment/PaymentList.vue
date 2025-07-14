<template>
  <div class="payment-wrap">
    <nuxt-link to="./[id]" v-for="item in data" :key="item.id" class="payment-item">
      <div class="payment-time">{{ item.date }}</div>
      <div class="item-name">
        <strong>{{ item.name }}</strong>
        {{ item.cardCompany }}
      </div>
      <div class="price">
        <strong :class="{ priceCancel: item.approved === '승인취소' }">{{ item.price }}원</strong>
        <span class="price-result" :class="{ priceCancel: item.approved === '승인취소' }">{{ item.approved }}</span>
      </div>
    </nuxt-link>
    <div v-if="data.length === 0" class="no-data">해당 기간에 데이터가 없습니다.</div>
  </div>
</template>

<script setup lang="ts">
interface PaymentItem {
  id: number
  name: string
  date: string
  price: string
  cardCompany: string
  approved: string
}

interface Props {
  data?: PaymentItem[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})
</script>

<style scoped lang="scss">
.payment-wrap {
  border-top: 0.1rem solid #eee;
  margin: 0 -2rem;
  padding: 0 2rem;
  .payment-item {
    display: flex;
    flex-direction: row;
    padding: 1.6rem 0;
    gap: 0 1.6rem;
    border-bottom: 0.1rem solid #eee;
    .payment-time {
      font-size: 1.3rem;
      font-weight: 400;
      color: #959595;
      flex: 0 0 auto;
    }
    .item-name {
      display: flex;
      flex-direction: column;
      font-size: 1.4rem;
      font-weight: 400;
      color: #959595;
      strong {
        font-size: 1.6rem;
        font-weight: 500;
        color: #2b2b2b;
      }
    }
    .price {
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex: 0 0 auto;

      strong {
        color: #2b2b2b;
        font-size: 1.6rem;
        font-weight: 700;
        &.priceCancel {
          color: #959595;
          text-decoration: line-through;
        }
      }
      .price-result {
        color: #959595;
        font-size: 1.4rem;
        font-weight: 400;
        &.priceCancel {
          color: #f14960;
        }
      }
    }
  }
  .no-data {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 400;
    color: #2b2b2b;
    margin: 2rem;
  }
}
@media (max-width: 375px) {
  .payment-wrap {
    .payment-item {
      font-size: 1.4rem;
      .item-name {
        font-size: 1.2rem;
        strong {
          font-size: 1.4rem;
        }
      }
      .price {
        strong {
          font-size: 1.4rem;
        }
        .price-result {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
