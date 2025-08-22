<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구 내역"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <h1 class="c-tit mt-24 mb-24">
      <span class="text"> 보험금 청구 내역을<br />확인할 수 있어요 </span>
    </h1>
    <Button btn-type="line" element-type="button" aria-label="처방전 조회" />
    <hr class="hr-section ml-n20 mr-n20" />
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" />
    <div class="total-claim">
      <div class="total">총 <strong>3</strong>건</div>
      <div class="sort-insurance">
        <button class="item">전체</button>
        <button class="item">6개월</button>
        <button class="item" @click="clickSort">최신순<i class="icon-arrow-down"></i></button>
      </div>
    </div>

    <!-- ToDo: 기간 내, 청구내역이 없을때 활성화 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="아이콘:검색없음" />
      <div class="text">조회한 기간 내에<br />청구한 내역이 없어요.</div>
    </div> -->

    <div class="wrap-claim-list">
      <div class="item">
        <div class="wrap-status">
          <div class="wrap-label">
            <label for="status" class="label out">통원</label>
            <label for="status" class="label done">청구완료</label>
            <label for="status" class="label">자동청구</label>
          </div>
          <div class="date">2025.03.25</div>
        </div>
        <div class="wrap-insurance-company">
          <div class="wrap-insurance-info">
            <img src="/assets/images/insu/logo_kbbank.svg" alt="KB보험회사" />
            <span class="text">KB손해보험</span>
          </div>
          <i class="icon-arrow-right"></i>
        </div>
        <div class="claim-desc-list">
          <div class="claim-item">
            <div class="tit">설계사(비서)</div>
            <div class="desc">박미란</div>
          </div>
          <div class="claim-item">
            <div class="tit">피보험자(치료 받은 분)</div>
            <div class="desc">김레몬</div>
          </div>
          <div class="claim-item">
            <div class="tit">수익자(보험 수령인)</div>
            <div class="desc">이헬스</div>
          </div>
          <div class="claim-item">
            <div class="tit">청구사유</div>
            <div class="desc">[일반상해] 운동중 발목 접질림</div>
          </div>
        </div>
        <div class="wrap-detail">
          <div class="detail-item">
            <div class="tit">안과</div>
            <div class="desc">2025.03.29</div>
          </div>
          <div class="detail-item">
            <div class="tit">안과</div>
            <div class="desc">2025.03.18</div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="wrap-status">
          <div class="wrap-label">
            <label for="status" class="label in">입원</label>
            <label for="status" class="label able">재청구가능</label>
            <label for="status" class="label">자동청구</label>
          </div>
          <div class="date">2025.03.25</div>
        </div>
        <div class="wrap-insurance-company">
          <div class="wrap-insurance-info">
            <img src="/assets/images/insu/logo_kbbank.svg" alt="KB보험회사" />
            <span class="text">KB손해보험</span>
          </div>
          <i class="icon-arrow-right"></i>
        </div>
        <div class="claim-desc-list">
          <div class="claim-item">
            <div class="tit">설계사(비서)</div>
            <div class="desc">박미란</div>
          </div>
          <div class="claim-item">
            <div class="tit">피보험자(치료 받은 분)</div>
            <div class="desc">김레몬</div>
          </div>
          <div class="claim-item">
            <div class="tit">수익자(보험 수령인)</div>
            <div class="desc">이헬스</div>
          </div>
          <div class="claim-item">
            <div class="tit">청구사유</div>
            <div class="desc">[일반상해] 운동중 발목 접질림</div>
          </div>
        </div>
        <div class="wrap-detail">
          <div class="detail-item">
            <div class="tit">안과</div>
            <div class="desc">2025.03.29</div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="wrap-status">
          <div class="wrap-label">
            <label for="status" class="label out">통원</label>
            <label for="status" class="label fail">청구실패</label>
          </div>
          <div class="date">2025.03.25</div>
        </div>
        <div class="wrap-insurance-company">
          <div class="wrap-insurance-info">
            <img src="/assets/images/insu/logo_kbbank.svg" alt="KB보험회사" />
            <span class="text">KB손해보험</span>
          </div>
          <i class="icon-arrow-right"></i>
        </div>
        <div class="claim-desc-list">
          <div class="claim-item">
            <div class="tit">설계사(비서)</div>
            <div class="desc">박미란</div>
          </div>
          <div class="claim-item">
            <div class="tit">피보험자(치료 받은 분)</div>
            <div class="desc">김레몬</div>
          </div>
          <div class="claim-item">
            <div class="tit">수익자(보험 수령인)</div>
            <div class="desc">이헬스</div>
          </div>
          <div class="claim-item">
            <div class="tit">청구사유</div>
            <div class="desc">[일반상해] 운동중 발목 접질림</div>
          </div>
        </div>
        <div class="wrap-detail">
          <div class="detail-item">
            <div class="tit">안과</div>
            <div class="desc">2025.03.29</div>
          </div>
        </div>
      </div>
    </div>
  </BaseBody>
  <BottomModal
    :is-visible="isShowSortModal"
    title="조회조건 설정"
    :is-show-cancel-button="false"
    confirm-button-text="조회하기"
    @close="isShowSortModal = false"
  >
    <template #content>
      <div class="notice-box">
        청구내역은 최대 3년전까지 가능해요
        <i class="info" alt="info"></i>
      </div>
      <div class="wrap-bottom-sort">
        <div class="tit-sort">조회기간</div>
        <SegmentedTabs :tabs="segmentedTabs1" :active-key="activeSegmentedTab1" @tab-change="onSegmentedTabChange1" />
        <div class="tit-sort">조회기간</div>
        <!-- 기간 선택 탭 -->
        <div class="date-range-tabs">
          <SegmentedTabs :tabs="segmentedTabs2" :active-key="activeSegmentedTab2" @tab-change="onSegmentedTabChange2" />
        </div>

        <div class="tit-sort">정렬순서</div>
        <SegmentedTabsStyle
          :tabs="segmentedTabsSort"
          :active-index="segmentedActiveIndex"
          @tab-click="handleSegmentedTabClick"
        />
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Button from '~/components/publishing/button/Button.vue'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'
import SegmentedTabs from '~/components/tabbar/SegmentedTabs.vue'
import SegmentedTabsStyle from '~/components/common/tab/SegmentedTabs.vue'
// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '서류없이 청구', code: 'no-docs' },
  { name: '사진찍어 청구', code: 'photo-claim' },
  { name: '대리청구', code: 'application-claim' }
]
const lineActiveIndex = ref(1)
// 이벤트 핸들러들
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
  console.log('Line 탭 클릭:', lineTabs[index])
}

const agentList = ref([
  { id: 'all', label: '전체', value: 'all' },
  { id: '1', label: '설계사1', value: 1 },
  { id: '2', label: '설계사2', value: 2 },
  { id: '3', label: '설계사3', value: 3 },
  { id: '4', label: 'agent4', value: 4 }
])

// Select 컴포넌트용 옵션들
const selectOptions = ref([
  { value: '전체보기', label: '전체보기' },
  { value: '설계사1', label: '설계사1' },
  { value: '설계사2', label: '설계사2' },
  { value: '설계사3', label: '설계사3' },
  { value: '설계사4', label: '설계사4' },
  { value: '설계사5', label: '설계사5' }
])

const selectedAgent = ref<any>(agentList.value[0])
// 커스텀 Select 컴포넌트용 상태
const selectedAgentValue = ref('전체보기')
const selectedAgentLabel = ref('전체보기')
const isShowCustomSelect = ref(false)

const openCustomSelect = () => {
  isShowCustomSelect.value = true
}

const closeCustomSelect = () => {
  isShowCustomSelect.value = false
}

const selectCustomOption = (option: any) => {
  selectedAgentValue.value = option.value
  selectedAgentLabel.value = option.label
  selectedAgent.value = option
  closeCustomSelect()
}

interface DateRangeModalProps extends BaseModalProps {
  initialStartDate?: Date | null
  initialEndDate?: Date | null
  initialPeriodType1?: string
  initialPeriodType2?: string
}
const props = withDefaults(defineProps<DateRangeModalProps>(), {
  title: '기간 선택',
  isVisible: false,
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false,
  autoClose: true,
  initialStartDate: null,
  initialEndDate: null,
  initialPeriodType1: 'segment1',
  initialPeriodType2: 'segment5'
})

const isShowSortModal = ref(false)
const clickSort = () => {
  isShowSortModal.value = !isShowSortModal.value
}

// SegmentedTabs 설정
const segmentedTabs1 = ref([
  { title: '전체', key: 'segment1' },
  { title: '통원', key: 'segment2' },
  { title: '입원', key: 'segment3' },
  { title: '자동청구', key: 'segment4' }
])
const segmentedTabs2 = ref([
  { title: '3개월', key: 'segment5' },
  { title: '6개월', key: 'segment6' },
  { title: '12개월', key: 'segment7' },
  { title: '직접설정', key: 'segment8' }
])
const segmentedTabsSort = [
  { name: '최신순', code: 'latest' },
  { name: '과거순', code: 'past' }
]
const segmentedActiveIndex = ref(0)
const handleSegmentedTabClick = (index: number) => {
  segmentedActiveIndex.value = index
  console.log('Segmented 탭 클릭:', segmentedTabsSort[index])
}

//SegmentedTabs 이벤트 핸들러
const onSegmentedTabChange1 = (key: string) => {
  activeSegmentedTab1.value = key
}
const onSegmentedTabChange2 = (key: string) => {
  activeSegmentedTab2.value = key
}
// 반응형 상태
const activeSegmentedTab1 = ref(props.initialPeriodType1 || 'segment1')
const activeSegmentedTab2 = ref(props.initialPeriodType2 || 'segment5')
// 직접 입력 모드 여부
const isDirectInput = computed(() => activeSegmentedTab2.value === 'segment8')
</script>
<style scoped lang="scss">
// 청구내역
.wrap-claim-list {
  margin: 0 -2rem;
  padding: 2rem;
  background-color: #f4f4f4;
  .item {
    padding: 2rem;
    background-color: #fff;
    border-radius: 1.2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .wrap-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .wrap-label {
        @include mixin.flex-container(items-center);
        gap: 0.4rem;
        .label {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 130%;
          color: #555555;
          background-color: #eeeeee;
          // 동의대기
          &.ready {
            background-color: #bd9600;
            color: #fff;
          }
          // 청구완료
          &.done {
            background-color: #629105;
            color: #fff;
          }
          // 통원
          &.out {
            background-color: #fef4cc;
            color: #8d7000;
          }
          // 입원
          &.in {
            background-color: #eaf2cc;
            color: #506a1d;
          }
          // 실패
          &.fail {
            background-color: #c82626;
            color: #fff;
          }
          // 가능
          &.able {
            background-color: #c36f00;
            color: #fff;
          }
        }
      }
      .date {
        font-size: 1.4rem;
        color: #555555;
      }
    }
    .wrap-insurance-company {
      margin-top: 1.6rem;
      @include mixin.flex-container(justify-between items-center);
      .wrap-insurance-info {
        display: flex;
        align-items: center;
        gap: 1.6rem;
        img {
          width: 4.8rem;
          height: auto;
        }
        .text {
          font-weight: 700;
        }
      }
      .icon-arrow-right {
        display: inline-block;
        width: 2.4rem;
        height: 2.4rem;
        background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
        background-size: 100%;
      }
    }
    .claim-desc-list {
      margin-top: 1.6rem;
      .claim-item {
        padding: 0 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .desc {
          font-size: 1.4rem;
          font-weight: 600;
        }
      }
    }
    .wrap-detail {
      margin-top: 1.2rem;
      padding: 1.6rem 2rem;
      border-radius: 1.2rem;
      background-color: #f4f4f4;
      .detail-item {
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          color: #959595;
        }
        .tit,
        .desc {
          font-size: 1.3rem;
          font-weight: 500;
        }
      }
    }
  }
}

// .custom-select-options {
//   margin: 0 -2rem;
//   .custom-option-item {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 1.6rem 2rem;
//     cursor: pointer;
//     transition: background-color 0.2s ease;

//     &:hover {
//       background-color: #f6f9ff;
//     }

//     &.selected {
//       background-color: #f6f9ff;

//       .option-label {
//         color: #4c7ff7;
//         font-weight: 700;
//       }
//     }

//     .option-label {
//       font-size: 1.6rem;
//       font-weight: 500;
//       color: #555555;
//     }

//     .check-icon {
//       color: #4c7ff7;
//       font-weight: bold;
//       font-size: 1.4rem;
//     }
//   }
// }
.total-claim {
  width: 100%;
  padding: 2.1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 140%;
    color: #2b2b2b;
    strong {
      font-weight: 700;
    }
  }
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

// 조회기간 내 청구 내역 없음
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
.wrap-bottom-sort {
  .tit-sort {
    margin: 1.2rem 0 0.8rem;
    font-size: 1.2rem;
    line-height: 130%;
    color: #555555;
    text-align: left;
  }
}
.notice-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin: 0 -2rem;
  padding: 1.3rem 0;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.8rem;
  background-color: #eee;
  color: #555;
  .info {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
}
</style>
