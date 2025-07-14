<template>
  <dl class="detail-item" :class="typeClass">
    <dt class="title">{{ title }}</dt>
    <dd class="text">
      <!-- 타입 지정되면 추가 -->
      <span v-if="paymentMethodText" class="payment-method">{{ paymentMethodText }}</span>
      {{ text }}
    </dd>
  </dl>
</template>

<script setup lang="ts">
interface Props {
  title: string
  type?: 'card' | 'mobile' | 'bank' | 'kakao' | 'naver' | 'toss' // 결제 수단 타입
  text: string
}

const props = withDefaults(defineProps<Props>(), {
  type: ''
})

const typeClass = computed(() => {
  return props.type ? `detail-item--${props.type}` : ''
})

// 결제 수단별 텍스트 매핑
const paymentMethodText = computed(() => {
  const methodMap = {
    card: '신용/체크카드',
    mobile: '휴대폰 결제',
    bank: '계좌이체',
    kakao: '카카오페이',
    naver: '네이버페이',
    toss: '토스페이'
  }
  return props.type ? methodMap[props.type] || '' : ''
})
</script>

<style scoped lang="scss">
.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 12px 0;
  flex-direction: row;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .title {
    font-size: 14px;
    color: #666;
    font-weight: 500;
    margin: 0;
    min-width: 80px;
  }

  .text {
    font-size: 1.6rem;
    color: #2b2b2b;
    margin: 0;
    text-align: right;
    font-weight: 500;
    flex: 1;
    .payment-method {
      position: relative;
      display: inline-block;
    }
  }
  &--card .text {
    .payment-method {
      padding-right: 1.5rem;
      &:after {
        content: '';
        position: absolute;
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        background: #959595;
        border-radius: 50%;
        right: 0.3rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
