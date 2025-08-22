<template>
  <BaseBody
    :show-back-button="true"
    page-title="장바구니"
    logo-type="text"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="wrap-info-lists">
      <div class="item">장바구니 내역은 24시간 후 자동 삭제됩니다.</div>
    </div>
    <FlexSection>
      <div class="wrap-select-claim">
        <div class="btn-delete">
          <i class="icon-delete"></i>
          <div class="text">선택삭제</div>
        </div>
        <div class="wrap-check">
          <Checkbox
            id="checkBox1"
            aria-label="전체선택"
            :model-value="isAllSelected"
            @update:model-value="toggleAllSelection"
          />
        </div>
      </div>
      <div class="wrap-medical-info">
        <div class="medical-info-head">
          <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
          <div class="wrap-hospital">
            <div class="text">충북대학교병원 <strong>2</strong>건</div>
          </div>
        </div>
        <i class="icon-arrow-down" :class="{ rotated: expandedItems[0] }" @click.stop.prevent="toggleDetail(0)"></i>
      </div>
      <div :class="{ expanded: expandedItems[0] }" class="wrap-check-icon">
        <label for="check1" class="c-checktype-btn">
          <input id="check1" v-model="insuranceSelections[0]" name="check1" type="checkbox" class="c-checktype-check" />
          <div class="c-checktype-label">
            <div class="text">진료비영수증</div>
            <i class="icon"></i>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">작성일자</div>
              <div class="desc">2024.02.20</div>
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
              <div class="tit">서류 발급 매 수</div>
              <div class="desc">
                <div
                  class="ico icon-minus"
                  :class="{ active: count[0] > 1 }"
                  @click.stop.prevent="count[0] > 1 ? count[0]-- : (count[0] = 1)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                    <path d="M13.2 10L6.8 10" stroke="#D2D2D2" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </div>
                <div class="text">{{ count[0] }}매</div>
                <div class="ico icon-plus active" @click.stop.prevent="count[0]++">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                    <path
                      d="M10 6.80078L10 13.2008M13.2 10.0008L6.8 10.0008"
                      stroke="#D2D2D2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
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
          <div class="wrap-btn-group">
            <Button btn-type="line" element-type="button" aria-label="삭제" />
            <Button btn-type="line" element-type="button" aria-label="미리보기" />
          </div>
        </label>
        <label for="check2" class="c-checktype-btn">
          <input id="check2" v-model="insuranceSelections[1]" name="check2" type="checkbox" class="c-checktype-check" />
          <div class="c-checktype-label">
            <div class="text">외래진료확인서</div>
            <i class="icon"></i>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">작성일자</div>
              <div class="desc">2024.02.20</div>
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
              <div class="tit">서류 발급 매 수</div>
              <div class="desc">
                <div
                  class="ico icon-minus"
                  :class="{ active: count[1] > 1 }"
                  @click.stop.prevent="count[1] > 1 ? count[1]-- : (count[1] = 1)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                    <path d="M13.2 10L6.8 10" stroke="#D2D2D2" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </div>
                <div class="text">{{ count[1] }}매</div>
                <div class="ico icon-plus active" @click.stop.prevent="count[1]++">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                    <path
                      d="M10 6.80078L10 13.2008M13.2 10.0008L6.8 10.0008"
                      stroke="#D2D2D2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
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
          <div class="wrap-btn-group">
            <Button btn-type="line" element-type="button" aria-label="삭제" />
            <Button btn-type="line" element-type="button" aria-label="미리보기" />
          </div>
        </label>
      </div>
      <div class="wrap-medical-info">
        <div class="medical-info-head">
          <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
          <div class="wrap-hospital">
            <div class="text">충북대학교병원 <strong>1</strong>건</div>
          </div>
        </div>
        <i class="icon-arrow-down" :class="{ rotated: expandedItems[1] }" @click.stop.prevent="toggleDetail(1)"></i>
      </div>
      <div :class="{ expanded: expandedItems[1] }" class="wrap-check-icon">
        <label for="check1" class="c-checktype-btn">
          <input id="check1" v-model="insuranceSelections[0]" name="check1" type="checkbox" class="c-checktype-check" />
          <div class="c-checktype-label">
            <div class="text">진료비영수증</div>
            <i class="icon"></i>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">작성일자</div>
              <div class="desc">2024.02.20</div>
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
              <div class="tit">서류 발급 매 수</div>
              <div class="desc">
                <div
                  class="ico icon-minus"
                  :class="{ active: count[2] > 1 }"
                  @click.stop.prevent="count[2] > 1 ? count[2]-- : (count[2] = 1)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                    <path d="M13.2 10L6.8 10" stroke="#D2D2D2" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </div>
                <div class="text">{{ count[2] }}매</div>
                <div class="ico icon-plus active" @click.stop.prevent="count[2]++">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                    <path
                      d="M10 6.80078L10 13.2008M13.2 10.0008L6.8 10.0008"
                      stroke="#D2D2D2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
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
                  :class="{ rotated: expandedCostItems[2] }"
                  @click.stop.prevent="toggleCostDetail(2)"
                ></i>
              </div>
              <div :class="{ expanded: expandedCostItems[2] }" class="wrap-desc-detail">
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
          <div class="wrap-btn-group">
            <Button btn-type="line" element-type="button" aria-label="삭제" />
            <Button btn-type="line" element-type="button" aria-label="미리보기" />
          </div>
        </label>
      </div>
    </FlexSection>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        :aria-label="`22,000원 결제하기(${selectedCount}건)`"
        class="lg w-full medium btn-sticky"
      />
    </ButtonGroup>
  </BaseBody>
  <BottomModal
    :is-visible="isShowPaymentModal"
    title="결제 방법을 선택해 주세요."
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    confirm-button-text="확인"
    @close="isShowPaymentModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <div class="wrap-pay-info">
        <div class="pay-text">총 결제 금액</div>
        <div class="pay-amount">456,789원</div>
      </div>
      <div class="wrap-btn-pay">
        <Button
          btn-type="line"
          element-type="button"
          aria-label="신용/체크카드"
          class="btn-card"
          icon="ico-card"
          :icon-size="24"
        />
        <Button
          btn-type="line"
          element-type="button"
          aria-label="네이버페이"
          class="btn-naver"
          icon="ico-naver"
          :icon-size="24"
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

const count = ref([1, 1, 1])
// 확장된 상세 항목 상태
const expandedItems = ref([true, true])
// 상세 항목 토글 함수
const toggleDetail = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}

// 확장된 상세 항목 상태
const expandedCostItems = ref([true, true, true])
// 상세 항목 토글 함수
const toggleCostDetail = (index: number) => {
  expandedCostItems.value[index] = !expandedCostItems.value[index]
}

const isShowPaymentModal = ref(false)
const clickPayment = () => {
  isShowPaymentModal.value = !isShowPaymentModal.value
}

const clickNext = () => {
  // return navigateTo('/insu/')
}

// 진료내역 선택 상태 관리 (실제 체크박스 개수에 맞춤)
const insuranceSelections = ref([false, false])

// 전체 선택 상태 계산
const isAllSelected = computed(() => {
  return insuranceSelections.value.every((selected: boolean) => selected)
})

// 선택된 진료내역이 있는지 확인
const hasSelectedHospitals = computed(() => {
  return insuranceSelections.value.some((selected: boolean) => selected)
})

// 선택된 개수 계산
const selectedCount = computed(() => {
  return insuranceSelections.value.filter((selected: boolean) => selected).length
})

// 전체 선택 토글 함수
const toggleAllSelection = () => {
  const newValue = !isAllSelected.value
  insuranceSelections.value = insuranceSelections.value.map(() => newValue)
}
const clickRegisterHospitals = () => {
  console.log('선택한 병원 등록 후 청구의신 서브메인으로 이동')
  navigateTo('/insu/claim/paperless/successFindHospitals')
}
</script>

<style scoped lang="scss">
.wrap-check {
  display: flex;
  justify-content: flex-end;
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
            min-width: 2rem;
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
.wrap-select-claim {
  margin: 0 -2rem;
  // width: 100%;
  padding: 2.1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid #e2e2e2;
  .btn-delete {
    display: flex;
    align-items: center;
    .icon-delete {
      width: 2.4rem;
      height: 2.4rem;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M16 8L8 16M16 16L8 8' stroke='%23555555' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    }
    .text {
      margin-left: 0.2rem;
      font-size: 1.6rem;
      font-weight: 500;
      color: #555555;
      line-height: 2.4rem;
    }
  }
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
.wrap-bottom-sort {
  .tit-sort {
    margin: 1.2rem 0 0.8rem;
    font-size: 1.2rem;
    line-height: 130%;
    color: #555555;
    text-align: left;
  }
}
.wrap-pay-info {
  padding: 0.8rem 0;
  .pay-text {
    font-size: 1.8rem;
    font-weight: 500;
  }
  .pay-amount {
    margin-top: 0.4rem;
    font-size: 2.6rem;
    font-weight: 700;
    color: #4c7ff7;
  }
}
.wrap-btn-pay {
  margin: 1.6rem 0 2.4rem;
  @include mixin.flex-container(justify-between items-center);
  gap: 0.8rem;
}
.wrap-info-lists {
  padding: 2rem 0;
  .item {
    text-align: left;
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    margin-top: 0.8rem;
    & > span {
      color: #4c7ff7;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
}
.wrap-btn-group {
  margin-top: 1.2rem;
  @include mixin.flex-container(justify-between items-center);
  gap: 1.2rem;
}
</style>
