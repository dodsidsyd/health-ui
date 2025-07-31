<template>
  <div v-if="infoText.length" class="more-info-btn">
    <Button
      btn-type="text"
      element-type="button"
      icon="ico-greater-than"
      icon-position="right"
      class="xxs"
      :icon-size="16"
      @click="seeMoreInfo"
      >{{ infoText }}</Button
    >
  </div>
  <FlexColDiv class="gap-16">
    <div class="claim-gift-wrap">
      <div class="gift-detail-box">
        <img :src="imageName" alt="선물 이미지" />
        <div class="gift-detail-text">
          <span class="brand"> {{ brandName }}</span>
          <p class="gift-name">{{ giftName }}</p>
          <span class="type">{{ giftType }}</span>
        </div>
      </div>
    </div>
    <InputNum v-model="inputAmount" unit-r="" placeholder="0" class="t-right" />
    <div class="btn-wrap">
      <Button
        btn-type="line"
        :icon="!begFriendImage ? 'ico-plus' : ''"
        :image-src="begFriendImage"
        element-type="button"
        aria-label="조르기"
        :border-radius="30"
        :class="{ 'beg-selected': selectedButtonType === 'beg' }"
        :disabled="selectedButtonType !== null && selectedButtonType !== 'beg'"
        @click="handleButtonClick('beg')"
      />

      <Button
        btn-type="line"
        :icon="!giftFriendImage ? 'ico-plus' : ''"
        :image-src="giftFriendImage"
        element-type="button"
        aria-label="선물하기"
        :border-radius="30"
        :class="{ 'gift-selected': selectedButtonType === 'gift' }"
        :disabled="selectedButtonType !== null && selectedButtonType !== 'gift'"
        @click="handleButtonClick('gift')"
      />
    </div>
    <p class="guide-txt">
      조르기는 커뮤니티>패밀리 그룹 회원에게 요청 할수 있어요.<br />
      선물하기는 내 연락처에 등록된 친구에게 선물 할수 있어요.
    </p>
    <div class="cal-point-box">
      <dl>
        <dt>주문금액</dt>
        <dd>{{ calOrderCost }}P</dd>
      </dl>
      <dl>
        <dt>잔여포인트</dt>
        <dd>{{ point }}P</dd>
      </dl>
    </div>
  </FlexColDiv>
</template>
<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import InputNum from '~/components/publishing/input/InputNum.vue'
import Button from '~/components/publishing/button/Button.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
const props = defineProps({
  imageName: { type: String, default: '' },
  brandName: { type: String, default: '브랜드' },
  giftName: { type: String, default: '상품 이름' },
  giftType: { type: String, default: '상품 타입' },
  infoText: { type: String, default: '' },
  point: { type: Number, default: 0 },
  begFriendImage: { type: String, default: '' },
  giftFriendImage: { type: String, default: '' }
})
const emits = defineEmits<{
  (e: 'see-more-info'): void
  (e: 'beg-for-gift', actionType: 'beg'): void
  (e: 'to-give-gift', actionType: 'gift'): void
  (e: 'update:cal-order-cost', cost: number): void
  (e: 'navigate-to', path: string): void
}>()

const selectedButtonType = ref<'beg' | 'gift' | null>(null) // 현재 선택된 버튼 타입 (초기값 null)
const seeMoreInfo = () => {
  emits('see-more-info')
}
const handleButtonClick = (actionType: 'beg' | 'gift') => {
  if (selectedButtonType.value === actionType) {
    selectedButtonType.value = null
    // 특정 페이지로 이동 이벤트 발생
    if (actionType === 'beg') {
      emits('navigate-to', '/common/point/makePaymentBuy') //
    } else if (actionType === 'gift') {
      emits('navigate-to', '/common/point/makePaymentGift') //
    }
  } else {
    selectedButtonType.value = actionType
    if (actionType === 'beg') {
      emits('beg-for-gift', actionType)
    } else {
      emits('to-give-gift', actionType)
    }
  }
}
const inputAmount = ref<string>('1')
const giftPointValue = computed(() => {
  const rawGiftType = props.giftType || ''
  const cleanedString = rawGiftType.replace(/,/g, '')
  const match = cleanedString.match(/(\d+)/)

  if (match && match[1]) {
    return Number(match[1])
  }
  return 0 // 숫자를 찾지 못하면 0으로 폴백
})

const calOrderCost = computed(() => {
  const amount = inputAmount.value
  const unitPoint = giftPointValue.value

  return (Number(amount) || 0) * (Number(unitPoint) || 0)
})

watch(
  calOrderCost,
  newCost => {
    emits('update:cal-order-cost', newCost)
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
.claim-gift-wrap {
  .gift-detail-box {
    display: flex;
    align-items: flex-start;

    img {
      width: 8.8rem;
      height: 8.8rem;
    }
    .gift-detail-text {
      margin-left: 2rem;
      text-align: left;
    }
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
}
.more-info-btn {
  margin-left: auto;
}
.btn-wrap {
  display: flex;
  gap: 0.8rem;
  &:has(:disabled) {
    :deep(.c-btn) {
      gap: 0.4rem;
      .icon {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='18' viewBox='0 0 19 18' fill='none'%3E%3Cpath d='M9.74961 3.59961L9.74961 14.3996M15.1496 8.99961L4.34961 8.99961' stroke='%23999999' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      }
    }
  }
  :deep(.c-btn) {
    gap: 0.4rem;
    .icon {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='18' viewBox='0 0 19 18' fill='none'%3E%3Cpath d='M9.74961 3.59961L9.74961 14.3996M15.1496 8.99961L4.34961 8.99961' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    }
  }
}
.guide-txt {
  text-align: center;
  font-size: 1.3rem;
  line-height: 1.8rem;
  color: #959595;
}
.cal-point-box {
  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem 0;
    font-size: 1.6rem;
    line-height: 2.2rem;
    &:first-child {
      border-bottom: 0.1rem solid #eee;
    }
    dt {
      color: #555;
    }
    dd {
      font-weight: 500;
    }
  }
}
</style>
