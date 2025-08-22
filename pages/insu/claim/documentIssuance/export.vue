<template>
  <BaseBody :show-back-button="true" page-title="서류 보관함" logo-type="text" :has-cart="true" :cart-count="2">
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" class="" />
    <Button
      btn-type="line"
      element-type="button"
      aria-label="다운로드 서류함"
      class="lg btn-download"
      icon="ico-document"
      @click="toDownloadStorage"
    />
    <div class="wrap-form">
      <div class="tit-form">병원</div>
      <Select
        modal-title="병원"
        select-placeholder="병원을 선택해주세요"
        cancel-button-text="선택"
        :is-show-cancel-btn="false"
        :custom-opts="hospitalOptions"
      />
      <div class="tit-form">발급서류</div>
      <Select
        modal-title="발급서류"
        select-placeholder="발급서류를 선택해주세요"
        cancel-button-text="선택"
        :is-show-cancel-btn="false"
        :custom-opts="documentOptions"
      />
      <div class="tit-form">연도</div>
      <Select
        modal-title="발급연도 선택"
        select-placeholder="발급연도 선택"
        cancel-button-text="선택"
        :is-show-cancel-btn="false"
        :custom-opts="yearOptions"
      />
      <div class="tit-form">조회기간</div>
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
    </div>
    <hr class="hr-section ml-n20 mr-n20" />
    <div class="wrap-medical-info">
      <div class="medical-info-head">
        <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
        <div class="wrap-hospital">
          <div class="text">충북대학교병원 <strong>2</strong>건</div>
        </div>
      </div>
      <i class="icon-arrow-down" :class="{ rotated: expandedItems[0] }" @click.stop.prevent="toggleDetail(0)"></i>
    </div>
    <div class="wrap-grey">
      <div :class="{ expanded: expandedItems[0] }" class="wrap-check-icon">
        <label for="check1" class="c-checktype-btn">
          <div class="c-checktype-label">
            <div class="text">진료비영수증</div>
            <button class="btn-text" @click="toExportDetail">
              <div class="text">내보내기 상세</div>
              <i class="icon-arrow-right-grey"></i>
            </button>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">최근 내보낸 일시</div>
              <div class="desc">2024.02.20 17:18:26</div>
            </div>
            <div class="list-item">
              <div class="tit">진료일자</div>
              <div class="desc">2023.10.23</div>
            </div>
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="desc">신경내과</div>
            </div>
            <div class="list-item">
              <div class="tit">진료의</div>
              <div class="desc">이현정</div>
            </div>
            <div class="list-item">
              <div class="tit">발급일자</div>
              <div class="desc">2024.02.20</div>
            </div>
            <div class="list-item">
              <div class="tit">발급매수</div>
              <div class="desc">
                <!-- ToDo: .disabled 추가시 비활성화 -->
                <div class="text">2매</div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-sub">
                <div class="tit">
                  총 발급비용
                  <div class="tit-sub">111,000원</div>
                </div>
                <i
                  class="icon-arrow-up"
                  :class="{ rotated: expandedCostItems[0] }"
                  @click.stop.prevent="toggleCostDetail(0)"
                ></i>
              </div>
              <div :class="{ expanded: expandedCostItems[0] }" class="wrap-desc-detail">
                <div class="detail-item">
                  <div class="detail-tit">발급비용</div>
                  <div class="detail-desc">10,000원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">대행수수료</div>
                  <div class="detail-desc">1,000원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">대행수수료부가세</div>
                  <div class="detail-desc">100원</div>
                </div>
              </div>
            </div>
          </div>
        </label>
        <label for="check2" class="c-checktype-btn">
          <div class="c-checktype-label">
            <div class="text">통원(외래)확인서</div>
            <button class="btn-text" @click="toExportDetail">
              <div class="text">내보내기 상세</div>
              <i class="icon-arrow-right-grey"></i>
            </button>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">최근 내보낸 일시</div>
              <div class="desc">2024.02.20 17:18:26</div>
            </div>
            <div class="list-item">
              <div class="tit">진료일자</div>
              <div class="desc">2023.10.23</div>
            </div>
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="desc">신경내과</div>
            </div>
            <div class="list-item">
              <div class="tit">진료의</div>
              <div class="desc">이현정</div>
            </div>
            <div class="list-item">
              <div class="tit">발급매수</div>
              <div class="desc">
                <div class="text">2매</div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-sub">
                <div class="tit">
                  총 발급비용
                  <div class="tit-sub">456,789원</div>
                </div>
                <i
                  class="icon-arrow-up"
                  :class="{ rotated: expandedCostItems[1] }"
                  @click.stop.prevent="toggleCostDetail(1)"
                ></i>
              </div>
              <div :class="{ expanded: expandedCostItems[1] }" class="wrap-desc-detail">
                <div class="detail-item">
                  <div class="detail-tit">발급비용</div>
                  <div class="detail-desc">10,000원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">대행수수료</div>
                  <div class="detail-desc">1,000원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">대행수수료부가세</div>
                  <div class="detail-desc">100원</div>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'
import Button from '~/components/publishing/button/Button.vue'
import Select from '~/components/publishing/input/Select.vue'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'

const expandedItems = ref([false])
const toggleDetail = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}
// 확장된 총 발급비용 상태
const expandedCostItems = ref([true, true])
// 총 발급비용
const toggleCostDetail = (index: number) => {
  expandedCostItems.value[index] = !expandedCostItems.value[index]
}
// 다운로드 서류함으로 이동
const toDownloadStorage = () => {
  navigateTo('/insu/claim/documentIssuance/downloadStorage')
}
// 내보내기 상세내역으로 이동
const toExportDetail = () => {
  navigateTo('/insu/claim/documentIssuance/exportDetail')
}

const hospitalOptions = [
  { value: '강동성심병원', label: '강동성심병원' },
  { value: '삼성서울병원', label: '삼성서울병원' },
  { value: '서울아산병원', label: '서울아산병원' },
  { value: '세브란스병원', label: '세브란스병원' },
  { value: '한양대병원', label: '한양대병원' }
]
const documentOptions = [
  { value: '진료확인서', label: '진료확인서' },
  { value: '소견서', label: '소견서' },
  { value: '입퇴원확인서', label: '입퇴원확인서' },
  { value: '처방전', label: '처방전' },
  { value: '진단서', label: '진단서' }
]
const yearOptions = [
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' }
]

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

// 반응형 상태
const activeSegmentedTab = ref(props.initialPeriodType || 'segment4')
const startDate = ref<string>('')
const endDate = ref<string>('')

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

// 탭 변경 핸들러
const onSegmentedTabChange = (key: string) => {
  activeSegmentedTab.value = key
  updatePredefinedDates()

  console.log(`📅 기간 탭 변경: ${getPeriodLabel()}`)
}

// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '보관함', code: 'document' },
  { name: '내보내기 영역', code: 'export' }
]
const lineActiveIndex = ref(1)
// 이벤트 핸들러들
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
  console.log('Line 탭 클릭:', lineTabs[index])
}

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})
</script>

<style scoped lang="scss">
.c-btn.btn-line.btn-download {
  margin-top: 2rem;
  background-color: #f6f9ff;
  outline-color: #4c7ff7;
  :deep(.text) {
    color: #4c7ff7;
  }
}
.wrap-form {
  margin: 1.2rem 0 1.2rem;
}
.wrap-medical-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  .medical-info-head {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    .logo {
      width: 4.8rem;
      height: 4.8rem;
    }
    .wrap-hospital {
      .text {
        font-weight: 700;
        strong {
          color: #4c7ff7;
        }
      }
    }
  }
  i.icon-arrow-down {
    width: 2.4rem;
    height: 2.4rem;
    background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
    background-size: contain;
    transition: transform 0.3s ease-in-out;
    &.rotated {
      transform: rotate(180deg);
    }
  }
}
.wrap-check-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  background-color: #f4f4f4;
  padding: 0 2rem;
  margin-right: -2rem;
  margin-left: -2rem;
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.3s ease-out,
    padding 0.3s ease;
  visibility: hidden;
  &.expanded {
    padding: 2rem;
    max-height: 100rem;
    visibility: visible;
  }
  .c-checktype-btn {
    width: 100%;
    padding: 2rem;
    border: 0.2rem solid #fff;
    background-color: #fff;
    border-radius: 1.2rem;
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
      @include mixin.flex-container(justify-between items-center);
      width: 100%;
      .text {
        font-size: 1.4rem;
        font-weight: 700;
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
      .btn-text {
        @include mixin.flex-container(items-center);

        .text {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .icon-arrow-right-grey {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          background: url('/assets/images/insu/icon-arrow-right-gray.svg') center center no-repeat;
          background-size: contain;
          transition: transform 0.3s ease-in-out;
        }
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
          @include mixin.flex-container(items-center);
          gap: 0.8rem;
          .text {
            font-size: 1.4rem;
            font-weight: 600;
            &.disabled {
              color: #959595;
            }
          }
          .ico {
            &.active {
              rect {
                stroke: #4f5561;
              }
              path {
                stroke: #2b2b2b;
              }
            }
          }

          .icon-arrow-up {
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
            .text {
              font-size: 1.4rem;
              font-weight: 600;
            }
          }
        }
        .wrap-desc-detail {
          max-height: 0;
          flex: 1 0 100%;
          margin-top: 1.2rem;
          border-radius: 1.2rem;
          padding: 0 2.4rem;
          background-color: #f4f4f4;
          overflow: hidden;
          transition:
            max-height 0.3s ease,
            padding 0.3s ease;
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
          &.expanded {
            padding: 1.6rem 2.4rem;
            max-height: 50rem;
          }
        }
        .item-sub {
          @include mixin.flex-container(justify-between items-center);
          width: 100%;
          .tit {
            font-size: 1.4rem;
            font-weight: 600;
            color: #2b2b2b;
            .tit-sub {
              display: inline-block;
              margin-left: 0.6rem;
            }
          }
          .icon-arrow-up {
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
      }
    }
  }
}
.wrap-grey {
  flex: 1;
  margin: 0 -2rem;
  padding: 0 2rem;
  background-color: #f4f4f4;
}
</style>
