<template>
  <BaseBody
    :has-share="true"
    page-title="대리청구 순위"
    :show-back-button="true"
    style="background-color: #fefefe"
    :is-transparent="true"
    :has-add-text="false"
    :add-text-click-enabled="true"
  >
    <h1 class="c-tit mt-24">
      <span class="text"> 청구의신 대리청구 순위예요 </span>
    </h1>
    <div class="total-claim">
      <div class="sort-insurance">
        <button class="item">전체 설계사</button>
        <button class="item" @click="clickBottomModal">{{ selectedDateText }} <i class="icon-arrow-down"></i></button>
      </div>
    </div>
    <!-- ToDo: 나를 등록한 대리인이 없을때 활성화 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/subrogation/icon-empty-customer.png" alt="아이콘:검색없음" />
      <div class="text">나를 등록한<br />대리인(총무/비서)이 없어요.</div>
    </div> -->

    <div class="wrap-rank-list">
      <ChallengeRankingBox
        rank="1"
        changed="up"
        changed-rank="2"
        user-name="곰탱이"
        user-location="서울금천"
        :is-show-steps="false"
        :total-class="'cases'"
      />
      <ChallengeRankingBox
        rank="2"
        changed="down"
        changed-rank="2"
        user-name="곰탱이"
        user-location="서울금천"
        :is-show-steps="false"
        :total-class="'cases'"
      />
      <ChallengeRankingBox
        rank="3"
        changed="down"
        changed-rank="2"
        user-name="곰탱이"
        user-location="서울금천"
        :is-show-steps="false"
        :total-class="'cases'"
      />
      <ChallengeRankingBoxMe rank="4" changed="up" changed-rank="2" :is-show-steps="false" :total-class="'cases'" />
      <ChallengeRankingBox
        rank="5"
        changed="up"
        changed-rank="2"
        user-name="곰탱이"
        user-location="서울금천"
        :is-show-steps="false"
        :total-class="'cases'"
      />
      <ChallengeRankingBox
        rank="6"
        changed="up"
        changed-rank="2"
        user-name="곰탱이"
        user-location="서울금천"
        :is-show-steps="false"
        :total-class="'cases'"
      />

      <ChallengeRankingBox
        rank="7"
        changed="up"
        changed-rank="2"
        user-name="곰탱이"
        user-location="서울금천"
        :is-show-steps="false"
        :total-num="'120'"
        :total-class="'cases'"
      />
    </div>
    <BottomModal
      :is-visible="isShowBottomModal"
      v-bind="bottomModalProps"
      @cancel="clickCancel"
      @confirm="clickConfirm"
      @close="isShowBottomModal = false"
    >
      <template #content>
        <div class="wrap-search">
          <RoundTabsStyle :tabs="roundTabs" :active-index="roundActiveIndex" @tab-click="handleRoundTabClick" />
          <div class="wrap-term">
            <YearMonthPicker v-model="selectedDate" />
          </div>
        </div>
      </template>
    </BottomModal>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import ChallengeRankingBox from '~/components/publishing/walkking/ChallengeRankingBox.vue'
import ChallengeRankingBoxMe from '~/components/publishing/walkking/ChallengeRankingBoxMe.vue'
import ChallengeRankingBoxRival from '~/components/publishing/walkking/ChallengeRankingBoxRival.vue'
import RoundTabsStyle, { type RoundTab } from '~/components/common/tab/RoundTabs.vue'
import YearMonthPicker from '~/components/publishing/input/YearMonthPicker.vue'

const isShowBottomModal = ref(false)
const selectedDate = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1
})

const selectedDateText = computed(() => {
  return `${selectedDate.value.year}년 ${selectedDate.value.month}월`
})

const bottomModalProps = ref({
  title: '검색 조건을 선택해 주세요.',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const clickBottomModal = () => {
  isShowBottomModal.value = true
}
const clickCancel = () => {
  console.log('하단 모달 취소')
}
const clickConfirm = () => {
  console.log('하단 모달 확인 클릭')
  isShowBottomModal.value = false
}

// RoundTabs 데이터
const roundTabs: RoundTab[] = [
  { name: '전체 설계사', code: 'agents' },
  { name: '소속 보험사  / GA', code: 'insurance' }
]
const roundActiveIndex = ref(0)
const handleRoundTabClick = (index: number) => {
  roundActiveIndex.value = index
  console.log('Round 탭 클릭:', roundTabs[index])
}
</script>

<style scoped lang="scss">
.total-claim {
  margin-top: 3.2rem;
  width: 100%;
  padding: 2.1rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .sort-insurance {
    .item {
      position: relative;
      padding: 0 1.2rem;
      font-weight: 500;
      color: #555555;
      i.icon-arrow-down {
        margin-left: 0.4rem;
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
        background-size: 100%;
        transition: transform 0.3s ease;
        transform-origin: center center;

        &.rotated {
          transform: rotate(180deg);
        }
      }
      &:not(:first-child) {
        &::before {
          content: '';
          width: 0.1rem;
          height: 1.2rem;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background-color: #e2e2e2;
        }
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
}
.wrap-rank-list {
  border-top: 0.1rem solid #eeeeee;
  margin: 0 -2rem;
  padding: 0 2rem;
}
.wrap-search {
  .wrap-term {
    background-color: #f9f9f9;
    border-radius: 0.8rem;
    padding: 2rem;
    margin-top: 2rem;
  }
}
.wrap-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 20rem);
  img {
    width: 8rem;
    height: 8rem;
  }
  .text {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    color: #555555;
    text-align: center;
  }
}
</style>
