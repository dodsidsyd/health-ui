<template>
  <div class="point-exchange-item">
    <div class="tit">
      <strong class="item-name"
        ><span class="badge" :class="statusClass">{{ statusText }}</span
        >{{ itemName }}</strong
      >
      <span class="tax-point">{{ taxPoint }}</span>
    </div>
    <div class="price-num">
      <strong class="price-txt">{{ formattedPrice }}원</strong>
      <span class="price-time">{{ timePoint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  itemName?: string
  taxPoint?: string
  exchangePrice?: number
  timePoint?: string
  currentState?: 'standby' | 'complete'
}

const props = withDefaults(defineProps<Props>(), {
  itemName: '상품명',
  taxPoint: '',
  exchangePrice: 0,
  timePoint: '',
  currentState: 'standby'
})

const statusClass = computed(() => {
  return props.currentState === 'standby' ? 'standby' : 'complete'
})

const statusText = computed(() => {
  return props.currentState === 'standby' ? '접수대기' : '접수완료'
})

// 가격에 천 단위 콤마 추가
const formattedPrice = computed(() => {
  return props.exchangePrice.toLocaleString()
})
</script>

<style scoped lang="scss">
.point-exchange-item {
  border-top: 0.1rem solid #eee;
  padding: 1.6rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0 1.6rem;
  &:first-child {
    border-top: 0;
  }
  .tit,
  .price-num {
    display: flex;
    flex-direction: column;
  }
  .price-num {
    text-align: right;
    flex: 0 0 auto;
    .price-txt {
      font-weight: 700;
      font-size: 1.6rem;
    }
    .price-time {
      color: #959595;
      font-size: 1.3rem;
      font-weight: 400;
    }
  }
  .tit {
    gap: 0.2rem 0;
    .item-name {
      font-size: 1.6rem;
      font-weight: 500;
      color: #2b2b2b;
      display: inline-flex;
      gap: 0 0.6rem;
      .badge {
        display: inline-block;
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        font-size: 1.2rem;
        color: #555;
        font-weight: 500;
        flex: 0 0 auto;
        height: 2.2rem;
        &.standby {
          background-color: #eaf2cc;
          color: #506a1d;
        }
        &.complete {
          background-color: #eee;
          color: #555;
        }
      }
    }
    .tax-point {
      color: #959595;
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
}
</style>
