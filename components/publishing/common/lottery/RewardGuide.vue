<template>
  <!-- 포인트 case -->
  <div v-if="rewardType === 'point'" class="reward-guide-wrap">
    <p class="guide-tit">행운복권 포인트 당첨안내</p>
    <ul>
      <li>포인트는 당첨 즉시 적립되며, 바로 사용할 수 있습니다.</li>
      <li>해당 포인트의 유효기간은 발급일로부터 6개월입니다.</li>
      <li>
        해당 포인트는 환전 요청할 수 없는 비현금성 포인트이며, 서비스내 챌린지 아이템 또는 모바일 교환 구매에 사용할 수
        있습니다.
      </li>
    </ul>
  </div>

  <!-- 아이템 case -->
  <div v-if="rewardType === 'item'" class="reward-guide-wrap">
    <p class="guide-tit">아이템 당첨안내</p>
    <ul>
      <li>아이템은 당첨 즉시 지급되며 참가중인 챌린지에서 바로 사용할 수 있습니다.</li>
      <li>
        아이템의 유효기간은 별도의 제한이 없으며, 각 챌린지별 사용 설정에 따라 사용에 제한적으로 사용될 수 있습니다.
      </li>
    </ul>
  </div>

  <!-- 상품교환권 case -->
  <div v-if="rewardType === 'gift'" class="reward-guide-wrap">
    <p class="guide-tit">상품교환권 당첨안내</p>
    <ul>
      <li>상품교환권은 당첨 즉시 선물받기를 통해 바로 받을 수 있습니다.</li>
      <li>
        상품교환권의 유효기간이나 이용방법, 수령방법 등에 대한 규정은 상품 판매처의 정책에 따라 상이함으로 선물받기 신청
        시 상품 상세정보를 확인해 주시기 바랍니다.
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  rewardType: { type: String as () => 'point' | 'item' | 'gift' | null, default: null }
})
</script>
<style scoped lang="scss">
.reward-guide-wrap {
  margin: auto -2rem -2rem;
  padding: 2rem;
  background-color: #f9f9f9;
  text-align: left;
  position: relative;
}
.guide-tit {
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2rem;
}
ul {
  margin-top: 1.6rem;
  li {
    position: relative;
    padding-left: 0.9rem;
    color: var(--gray-11);
    font-size: 1.2rem;
    line-height: 1.6rem;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.6rem;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      border-radius: 50%;
    }
  }
}
</style>
