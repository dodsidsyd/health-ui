<template>
  <BaseBody page-title="스마트링" :show-back-button="true" :is-transparent="true" :has-setting="true">
    <SmartRingTopSTatus ref="smartRingTopStatus" />

    <!-- 스마트링 배터리 컨디션 -->
    <SmartRingBatteryCondition class="mt-32" />

    <FlexRowDiv class="status-wrap mt-12">
      <CommonStatusCard
        title="수면"
        main-data="7시간 20분"
        card-type="sleep"
        emoji-type="good"
        smart-ring-status="충분해요"
      />

      <!-- 데이터 없는 케이스 -->
      <CommonStatusCard title="스트레스" main-data="70" card-type="stress" :has-data="false" />

      <CommonStatusCard
        title="심박수"
        main-data="10bpm"
        card-type="heart-beep"
        emoji-type="dislike"
        smart-ring-status="낮아요"
      />
      <CommonStatusCard
        title="심박변이도"
        main-data="15ms"
        card-type="variability"
        emoji-type="good"
        smart-ring-status="정상"
      />
      <CommonStatusCard
        title="체온"
        main-data="36.4 ℃"
        card-type="temperature"
        emoji-type="bad"
        smart-ring-status="주의필요"
      />
      <CommonStatusCard
        title="산소포화도"
        main-data="70%"
        card-type="oxygen"
        emoji-type="good"
        smart-ring-status="높아요"
      />
    </FlexRowDiv>

    <div v-if="isDeviceConnected" class="btn-wrap fixed">
      <button type="button" class="cbtn btn-measurement"><i class="icon ico-heart-beep"></i>지금 측정하기</button>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import SmartRingTopSTatus from '~/components/smartRing/SmartRingTopSTatus.vue'
import SmartRingBatteryCondition from '~/components/smartRing/SmartRingBatteryCondition.vue'
import CommonStatusCard from '~/components/common/statusCard/CommonStatusCard.vue'

// SmartRingTopSTatus 컴포넌트의 ref
const smartRingTopStatus = ref<InstanceType<typeof SmartRingTopSTatus> | null>(null)

// 디바이스 연결 상태를 확인하는 computed
const isDeviceConnected = computed(() => {
  if (!smartRingTopStatus.value) return false
  return smartRingTopStatus.value.statusData?.isDeviceConnected || false
})
</script>

<style scoped lang="scss">
.status-wrap {
  gap: 1.2rem;
  flex-wrap: wrap;
  padding-bottom: 3rem;
  .status-card {
    flex: 0 0 calc(50% - 0.6rem);
  }
}
.btn-wrap {
  &.fixed {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-measurement {
      color: #2b2b2b;
      display: flex;
      align-items: center;
      gap: 0 0.4rem;
      font-size: 1.6rem;
      font-weight: 700;
      padding: 1.4rem 3.2rem;
      border-radius: 48px;
      border: 0.1rem solid #d2d2d2;
      line-height: 1;
      background: vars.$white;
      box-shadow: 0 1.2rem 1.2rem 0 rgba(0, 0, 0, 0.06);
      position: relative;
      @include mixin.rippleEffectPrimary;
      .icon {
        display: inline-block;
        width: 2.4rem;
        height: 2.4rem;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }
    }
  }
}
</style>
