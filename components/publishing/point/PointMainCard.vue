<template>
  <div class="point-main-card">
    <div class="card-top">
      <span class="tit">보유포인트</span>
      <div class="point-info">
        <div class="point-length">98,400 P</div>
        <div class="btn-wrap">
          <button type="button" class="btn-lightBlue">레몬포인트존</button>
        </div>
      </div>

      <p class="remove-point"><span>30일 이내 소멸예정포인트</span> <strong class="point-num">1,800P</strong></p>
    </div>

    <div class="card-bottom">
      <button type="button" class="card-link" @click="clickBottomModal">포인트 충전하기</button>
      <button type="button" class="card-link">포인트 사용하기</button>
    </div>
    <!-- 포인트 충전 모달 -->
    <BottomModal
      :is-visible="isShowBottomModal"
      title="포인트 충전"
      :is-show-close-button="true"
      :is-show-cancel-button="false"
      :is-show-confirm-button="true"
      confirm-button-text="30,000 결제하기"
      @close="toggleBottomModal"
    >
      <template #content>
        <div class="charge-box">
          <dl>
            <dt>일반결제</dt>
            <dd>
              <SegmentedTabs
                class="charge-amount"
                :tabs="chargeWayTabs"
                :active-key="activeChargeWay"
                :columns="3"
                @tab-change="onChargeWayChange"
              />
            </dd>
          </dl>
          <dl>
            <dt>간편결제</dt>
            <dd>
              <SegmentedTabs
                :tabs="chargeSimpleWayTabs"
                :active-key="activeChargeSimpleWay"
                :columns="3"
                @tab-change="onSimpleWayChange"
              />
            </dd>
          </dl>
        </div>
      </template>
    </BottomModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'

const isShowBottomModal = ref(false)
const clickBottomModal = () => {
  toggleBottomModal()
}
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const chargeWayTabs = ref<SegmentTab[]>([
  { title: '신용/체크카드', key: 'card' },
  { title: '무통장/계좌이체', key: 'bank' },
  { title: '휴대폰', key: 'mobile' }
])

const chargeSimpleWayTabs = ref<SegmentTab[]>([
  { title: '카카오페이', key: 'kakao' },
  { title: '네이버페이', key: 'naver' },
  { title: '토스페이', key: 'toss' }
])

const activeChargeWay = ref('card')
const activeChargeSimpleWay = ref('kakao')

const onChargeWayChange = (key: string) => {
  activeChargeWay.value = key
}
const onSimpleWayChange = (key: string) => {
  activeChargeSimpleWay.value = key
}
</script>

<style scoped lang="scss">
.point-main-card {
  border-radius: 1.2rem;
  background: vars.$blue-primary;
  padding: 2.4rem 2rem 0;
  color: vars.$white;
  .point-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .btn-lightBlue {
    color: vars.$white;
    font-size: 1.2rem;
    font-weight: 500;
    background: #7099f9;
    border-radius: 1.4rem;
    line-height: 1.4rem;
    padding: 0.7rem 1.2rem;
    @include mixin.rippleEffectWhite;
  }
  .tit {
    font-size: 1.3rem;
    font-weight: 500;
  }
  .point-length {
    font-size: 2.6rem;
    font-weight: 700;
    line-height: 3.4rem;
  }
  .remove-point {
    font-weight: 500;
    display: flex;
    gap: 0 0.6rem;
    align-items: center;
    margin-top: 0.9rem;
    span {
      opacity: 0.7;
      font-size: 1.3rem;
    }
    .point-num {
      font-size: 1.4rem;
    }
  }
  .card-bottom {
    flex: 0 0 auto;
    margin: 0 -2rem;
    border-bottom-left-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
    margin-top: 2.5rem;
    background: #4776e5;
    display: flex;
    flex-direction: row;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 0.1rem;
      background: #7099f9;
      height: 0.9rem;
    }
    .card-link {
      font-size: 1.4rem;
      font-weight: 500;
      text-align: center;
      line-height: 2rem;
      padding: 1.8rem;
      flex: 1 1 100%;
      color: vars.$white;
      position: relative;
      @include mixin.rippleEffectWhite;
    }
  }
}

.charge-box {
  text-align: left;

  dl {
    dt {
      margin-bottom: 0.6rem;
      font-size: var(--num-12);
    }
    & + dl {
      margin-top: 1.2rem;
    }
  }
}
</style>
