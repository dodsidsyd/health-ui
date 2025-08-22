<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI 실손 예상 보험금 확인"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <h1 class="c-tit mt-40">
      <span class="text"> 진료내역을 선택해 주세요 </span>
    </h1>
    <div class="c-tit-sub">
      최근 3년간 진료내역만 분석 가능해요.
      <div class="icon" @click="toggleTooltip">
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 10.5V6.75M10 13.2795V13.3125M17.5 10.5C17.5 14.6421 14.1421 18 10 18C5.85786 18 2.5 14.6421 2.5 10.5C2.5 6.35786 5.85786 3 10 3C14.1421 3 17.5 6.35786 17.5 10.5Z"
            stroke="#555555"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div v-show="isTooltipOpen" class="tooltip">
          <button type="button" class="c-tooltip-close-btn" aria-label="닫기" @click.stop="closeTooltip"></button>
          <div class="text">MY병원을 연결해 최근 진료 내역을 업데이트할 수 있어요.</div>
        </div>
      </div>
    </div>
    <Button btn-type="line" element-type="button" aria-label="MY병원 연결하기" class="mt-16" />
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <!-- ToDo: MY병원 진료내역이 없을때 활성화 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="아이콘:검색없음" />
      <div class="text">MY병원의 진료내역을<br />찾지 못했어요.</div>
    </div> -->
    <FlexSection>
      <div class="total-claim">
        <div class="total">총 <strong>2</strong>건</div>
        <div class="sort-insurance">
          <button class="item">전체</button>
          <button class="item">1개월</button>
          <button class="item" @click="clickSort">최근 7일<i class="icon-arrow-down"></i></button>
        </div>
      </div>
      <div class="wrap-check-icon">
        <label for="check1" class="c-checktype-btn">
          <input
            id="check1"
            v-model="hospitalSelections[0]"
            name="check1"
            type="checkbox"
            class="c-checktype-check"
            @change="updateAllSelection"
          />
          <div class="c-checktype-label">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="고려대학교 안암병원" class="hospital-logo" />
            <div class="wrap-hospital-desc">
              <div class="wrap-desc">
                <span class="tit">경북대학교병원</span>
              </div>
              <div class="wrap-label">
                <div class="h-label out">통원</div>
              </div>
            </div>
            <i class="icon"></i>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">진료일</div>
              <div class="desc">2025. 01. 20 ~ 2025. 05. 30</div>
            </div>
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="desc">내과</div>
            </div>
            <div class="list-item">
              <div class="tit">청구보험사</div>
              <div class="desc">DB손해보험<br />(2024.02.08)</div>
            </div>
            <div class="list-item">
              <div class="tit">진료비</div>
              <div class="desc">
                456,789원
                <i
                  class="icon-arrow-down"
                  :class="{ rotated: expandedItems[0] }"
                  @click.stop.prevent="toggleDetail(0)"
                ></i>
              </div>
              <div v-show="expandedItems[0]" class="wrap-desc-detail">
                <div class="detail-item">
                  <div class="detail-tit">급여</div>
                  <div class="detail-desc">178,000원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">비급여</div>
                  <div class="detail-desc">178,000원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">환자부담금액</div>
                  <div class="detail-desc">178,000원</div>
                </div>
              </div>
            </div>
          </div>
        </label>
        <label for="check2" class="c-checktype-btn">
          <input
            id="check2"
            v-model="hospitalSelections[1]"
            name="check2"
            type="checkbox"
            class="c-checktype-check"
            @change="updateAllSelection"
          />
          <div class="c-checktype-label">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="고려대학교 안암병원" class="hospital-logo" />
            <div class="wrap-hospital-desc">
              <div class="wrap-desc">
                <span class="tit">경북대학교병원</span>
              </div>
              <div class="wrap-label">
                <div class="h-label admission">입원</div>
              </div>
            </div>
            <i class="icon"></i>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">진료일</div>
              <div class="desc">2025. 01. 20 ~ 2025. 05. 30</div>
            </div>
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="desc">내과</div>
            </div>
            <div class="list-item">
              <div class="tit">청구보험사</div>
              <div class="desc">DB손해보험<br />(2024.02.08)</div>
            </div>
            <div class="list-item">
              <div class="tit">진료비</div>
              <div class="desc">
                456,789원
                <i
                  class="icon-arrow-down"
                  :class="{ rotated: expandedItems[1] }"
                  @click.stop.prevent="toggleDetail(1)"
                ></i>
              </div>
              <div v-show="expandedItems[1]" class="wrap-desc-detail">
                <div class="detail-item">
                  <div class="detail-tit">급여</div>
                  <div class="detail-desc">178,000원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">비급여</div>
                  <div class="detail-desc">178,000원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">환자부담금액</div>
                  <div class="detail-desc">178,000원</div>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
    </FlexSection>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="1건 AI 실손 보험금 예상 분석"
        class="lg w-full medium btn-sticky"
      />
    </ButtonGroup>
  </BaseBody>
  <BottomModal
    :is-visible="isShowSortModal"
    title="조회조건 설정"
    :is-show-cancel-button="false"
    confirm-button-text="확인"
    @close="isShowSortModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <div class="wrap-bottom-sort">
        <div class="tit-sort">MY병원</div>
        <Select
          modal-title="병원선택"
          select-placeholder="MY 병원을 선택해주세요."
          :is-show-cancel-btn="false"
          :custom-opts="[
            { value: 'all', label: '전체' },
            { value: '경북대학병원', label: '경북대학병원' },
            { value: '연세대학병원', label: '연세대학병원' }
          ]"
        />
        <div class="tit-sort">조회기간</div>
        <!-- 기간 선택 탭 -->
        <div class="date-range-tabs">
          <SegmentedTabs :tabs="segmentedTabs" :active-key="activeSegmentedTab" @tab-change="onSegmentedTabChange" />
        </div>

        <!-- 날짜 입력 영역 -->
        <div class="date-input-section mt-8">
          <InputCalendarFromTo
            v-model:from-date="startDate"
            v-model:to-date="endDate"
            placeholder="시작일"
            placeholder2="종료일"
            :readonly="!isDirectInput"
            :disabled="!isDirectInput"
          />
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
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Select from '~/components/publishing/input/Select.vue'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'
import SegmentedTabsStyle, { type SegmentTabSort } from '~/components/common/tab/SegmentedTabs.vue'

const segmentedTabsSort: SegmentTab[] = [
  { name: '최신순', code: 'latest' },
  { name: '과거순', code: 'past' }
]
const segmentedActiveIndex = ref(0)
const handleSegmentedTabClick = (index: number) => {
  segmentedActiveIndex.value = index
  console.log('Segmented 탭 클릭:', segmentedTabsSort[index])
}

// 타입 정의
export interface DateRange {
  startDate: Date
  endDate: Date
  periodType: 'custom' | '3months' | '6months' | '12months'
  label: string
}

interface DateRangeModalProps extends BaseModalProps {
  initialStartDate?: Date | null
  initialEndDate?: Date | null
  initialPeriodType?: string
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
  initialPeriodType: 'segment4'
})

const emit = defineEmits<{
  (e: ModalEmitEvent, dateRange?: DateRange): void
  (e: 'update:startDate', date: Date): void
  (e: 'update:endDate', date: Date): void
}>()
//SegmentedTabs 이벤트 핸들러
const onSegmentedTabChange = (key: string) => {
  activeSegmentedTab.value = key
  console.log('Segmented tab changed to:', key)
}

// 반응형 상태
const activeSegmentedTab = ref(props.initialPeriodType || 'segment4')
const startDate = ref<string>('')
const endDate = ref<string>('')

// body 스크롤 방지를 위한 상태
const originalBodyStyle = ref<string>('')

// SegmentedTabs 설정
const segmentedTabs = ref<SegmentTab[]>([
  { title: '3개월', key: 'segment1' },
  { title: '6개월', key: 'segment2' },
  { title: '12개월', key: 'segment3' },
  { title: '직접설정', key: 'segment4' }
])

// 직접 입력 모드 여부
const isDirectInput = computed(() => activeSegmentedTab.value === 'segment4')

// 날짜 포맷팅 유틸리티
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null
  const cleanedDate = dateStr.replace(/\./g, '-')
  const date = new Date(cleanedDate)
  return isNaN(date.getTime()) ? null : date
}

// 미리 정의된 기간에 따른 날짜 계산
const updatePredefinedDates = () => {
  const now = new Date()
  let start: Date
  let end: Date = new Date(now)

  switch (activeSegmentedTab.value) {
    case 'segment1': // 3개월
      start = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
      break
    case 'segment2': // 6개월
      start = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
      break
    case 'segment3': // 12개월
      start = new Date(now.getFullYear(), now.getMonth() - 12, now.getDate())
      break
    default:
      // 직접설정의 경우 기존 값 유지 또는 초기값 사용
      if (props.initialStartDate) {
        start = new Date(props.initialStartDate)
      } else {
        start = new Date(now.getFullYear(), now.getMonth(), 1) // 이번 달 1일
      }
      if (props.initialEndDate) {
        end = new Date(props.initialEndDate)
      }
      break
  }

  startDate.value = formatDate(start)
  endDate.value = formatDate(end)
}

// 선택된 기간 표시
const formattedPeriod = computed(() => {
  if (!startDate.value || !endDate.value) return ''

  const start = parseDate(startDate.value)
  const end = parseDate(endDate.value)

  if (!start || !end) return ''

  const startFormatted = formatDate(start)
  const endFormatted = formatDate(end)

  return `${startFormatted} ~ ${endFormatted}`
})

// 기간 라벨 계산
const getPeriodLabel = (): string => {
  switch (activeSegmentedTab.value) {
    case 'segment1':
      return '최근 3개월'
    case 'segment2':
      return '최근 6개월'
    case 'segment3':
      return '최근 12개월'
    default:
      return '사용자 지정'
  }
}

const isShowSortModal = ref(false)

// 필터 상태 관리
const selectedFilters = ref({
  all: false,
  normal: false,
  expired: false,
  maturity: false,
  extinct: false,
  cancel: false
})

// 필터 변경 핸들러
const handleFilterChange = () => {
  // 전체 선택 로직
  if (selectedFilters.value.all) {
    // 전체가 선택되면 다른 모든 옵션들도 선택
    selectedFilters.value.normal = true
    selectedFilters.value.expired = true
    selectedFilters.value.maturity = true
    selectedFilters.value.extinct = true
    selectedFilters.value.cancel = true
  } else {
    // 전체가 해제되면 다른 모든 옵션들도 해제
    selectedFilters.value.normal = false
    selectedFilters.value.expired = false
    selectedFilters.value.maturity = false
    selectedFilters.value.extinct = false
    selectedFilters.value.cancel = false
  }

  // 개별 옵션들이 모두 선택되면 전체도 선택
  if (
    selectedFilters.value.normal &&
    selectedFilters.value.expired &&
    selectedFilters.value.maturity &&
    selectedFilters.value.extinct &&
    selectedFilters.value.cancel
  ) {
    selectedFilters.value.all = true
  }

  // 개별 옵션 중 하나라도 해제되면 전체도 해제
  if (
    !selectedFilters.value.normal ||
    !selectedFilters.value.expired ||
    !selectedFilters.value.maturity ||
    !selectedFilters.value.extinct ||
    !selectedFilters.value.cancel
  ) {
    selectedFilters.value.all = false
  }
}

// 개별 필터 변경 핸들러
const handleIndividualFilterChange = (filterName: string) => {
  // 개별 옵션 변경 시 전체 상태 업데이트
  if (filterName !== 'all') {
    // 개별 옵션들이 모두 선택되면 전체도 선택
    if (
      selectedFilters.value.normal &&
      selectedFilters.value.expired &&
      selectedFilters.value.maturity &&
      selectedFilters.value.extinct &&
      selectedFilters.value.cancel
    ) {
      selectedFilters.value.all = true
    } else {
      selectedFilters.value.all = false
    }
  }
}
const clickSort = () => {
  isShowSortModal.value = !isShowSortModal.value
}
const clickNext = () => {
  // return navigateTo('/insu/')
}

const isTooltipOpen = ref(false)
const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value
}

const closeTooltip = () => {
  isTooltipOpen.value = false
}

// 병원 선택 상태 관리
const hospitalSelections = ref([false, false, false])

// 전체 선택 상태 계산
const isAllSelected = computed(() => {
  return hospitalSelections.value.every((selected: boolean) => selected)
})

// 선택된 병원이 있는지 확인
const hasSelectedHospitals = computed(() => {
  return hospitalSelections.value.some((selected: boolean) => selected)
})

// 전체 선택 토글 함수
const toggleAllSelection = () => {
  const newValue = !isAllSelected.value
  hospitalSelections.value = hospitalSelections.value.map(() => newValue)
}

// 개별 체크박스 변경 시 전체 선택 상태 업데이트
const updateAllSelection = () => {
  // 개별 체크박스 변경 시에는 전체 선택 상태가 자동으로 계산됨
  // computed 속성 isAllSelected가 자동으로 업데이트됨
}

const clickRegisterHospitals = () => {
  console.log('선택한 병원 등록 후 청구의신 서브메인으로 이동')
  navigateTo('/insu/claim/paperless/successFindHospitals')
}

// 확장된 상세 항목 상태
const expandedItems = ref([false, false, false, false, false, false])

// 상세 항목 토글 함수
const toggleDetail = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}
</script>

<style scoped lang="scss">
.wrap-check {
  display: flex;
  justify-content: flex-end;
  padding: 2rem 0;
}
.wrap-check-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  background-color: #f4f4f4;
  padding: 2rem;
  margin-right: -2rem;
  margin-left: -2rem;
  .c-checktype-btn {
    width: 100%;
    // height: 10.8rem;
    padding: 2rem;
    border: 0.2rem solid #fff;
    background-color: #fff;
    border-radius: 1.2rem;
    // display: flex;
    // align-items: center;
    // gap: 1.6rem;
    &:has(.c-checktype-check:checked) {
      border: 0.2rem solid #4c7ff7;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
      .icon {
        border-color: #4c7ff7;
        background-color: #4c7ff7;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
    }
    .c-checktype-check {
      display: none;
    }
    .c-checktype-label {
      display: flex;
      align-items: center;
      gap: 1.6rem;
      width: 100%;
      .hospital-logo {
        width: 4.8rem;
        height: 4.8rem;
        flex-shrink: 0;
      }
      .wrap-hospital-desc {
        @include mixin.flex-container(items-center);
        gap: 0.4rem;

        flex: 1 1 auto;
        min-width: 0;
        .wrap-desc {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          .tit {
            display: block;
            font-size: 1.6rem;
            font-weight: 700;
            line-height: 1.4;
            color: #2b2b2b;
            width: 100%;
            @include mixin.ellipsis;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
          }
        }
        .wrap-label {
          display: flex;
          gap: 0.4rem;
          .h-label {
            padding: 0.3rem 0.6rem;
            border-radius: 0.4rem;
            background-color: #eeeeee;
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 1.3;
            color: #555555;
            &.no-doc {
              background-color: #e5edff;
              color: #4c7ff7;
            }
            &.myhospital {
              background-color: #4c7ff7;
              color: #fff;
            }
            // 통원
            &.out {
              background-color: #fef4cc;
              color: #8d7000;
            }
            // 입원
            &.admission {
              background-color: #eaf2cc;
              color: #506a1d;
            }
          }
        }
      }
      .icon {
        width: 2.4rem;
        height: 2.4rem;
        flex-shrink: 0;
        border-radius: 50%;
        border: 1.5px solid #eee;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23E2E2E2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-size: 1.9rem;
        background-repeat: no-repeat;
        background-position: center;
        transition:
          background-color 0.2s ease-in,
          border-color 0.2s ease-in;
      }
    }
    .wrap-desc-lists {
      margin-top: 2rem;
      .list-item {
        @include mixin.flex-container(justify-between items-start);
        flex-wrap: wrap;
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .desc {
          text-align: right;
          font-size: 1.4rem;
          font-weight: 600;
          .icon-arrow-down {
            position: relative;
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
        }
        .wrap-desc-detail {
          flex: 1 0 100%;
          margin-top: 1.2rem;
          border-radius: 1.2rem;
          padding: 1.6rem 2.4rem;
          background-color: #f4f4f4;
          .detail-item {
            @include mixin.flex-container(justify-between items-center);
            &:not(:first-child) {
              margin-top: 1.2rem;
            }
            .detail-tit {
              font-size: 1.3rem;
              font-weight: 500;
              color: #959595;
            }
            .detail-desc {
              font-size: 1.3rem;
              font-weight: 500;
              color: #2b2b2b;
            }
          }
        }
      }
    }
  }
}
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

.wrap-bottom-sort {
  .tit-sort {
    margin: 1.2rem 0 0.8rem;
    font-size: 1.2rem;
    line-height: 130%;
    color: #555555;
    text-align: left;
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
