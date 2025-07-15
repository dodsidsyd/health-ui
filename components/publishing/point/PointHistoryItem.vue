<template>
  <div class="point-history-item">
    <div class="tit">
      <strong class="item-name">{{ itemName }}</strong>
      <span class="sub-tit">{{ subTitle }}</span>
    </div>
    <div class="point-num">
      <strong class="amount-txt" :class="amountClass">{{ formattedAmount }} P</strong>
      <span class="point-time">{{ timeText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  itemName: string
  subTitle: string
  amount: number
  timeText: string
  type?: 'plus' | 'minus'
}

const props = withDefaults(defineProps<Props>(), {
  itemName: '',
  subTitle: '',
  amount: 0,
  timeText: '',
  type: 'plus'
})

// 포인트 금액을 포맷팅하는 computed
const formattedAmount = computed(() => {
  const sign = props.type === 'plus' ? '+' : '-'
  return `${sign}${props.amount.toLocaleString()}`
})

// 금액 스타일 클래스
const amountClass = computed(() => {
  return props.type === 'plus' ? 'plus' : 'minus'
})
</script>

<style scoped lang="scss">
.point-history-item {
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
  .point-num {
    display: flex;
    flex-direction: column;
  }
  .point-num {
    text-align: right;
    flex: 0 0 auto;
    .amount-txt {
      font-weight: 700;
      font-size: 1.6rem;
      &.plus {
        color: vars.$blue-primary;
      }
      &.minus {
        color: #f14960;
      }
    }
    .point-time {
      color: #959595;
      font-size: 1.3rem;
      font-weight: 400;
    }
  }
  .tit {
    .item-name {
      font-size: 1.6rem;
      font-weight: 500;
      color: #2b2b2b;
    }
    .sub-tit {
      color: #959595;
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
}
</style>
