<template>
  <BaseBody
    :show-back-button="true"
    page-title="병원서류 발급신청"
    logo-type="text"
    :has-cart="true"
    :cart-count="2"
    class="pb-36"
  >
    <h1 class="c-tit mt-40">
      <span class="text"> 발급할 진료내역을<br />선택해 주세요. </span>
    </h1>
    <FlexSection>
      <div class="total-claim">
        <div class="total">총 <strong>2</strong>건</div>
        <div class="wrap-check">
          <Checkbox
            id="checkBox1"
            aria-label="전체선택"
            :model-value="isAllSelected"
            @update:model-value="toggleAllSelection"
          />
        </div>
      </div>
      <div class="wrap-check-icon">
        <label for="check1" class="c-checktype-btn">
          <input id="check1" v-model="insuranceSelections[0]" name="check1" type="checkbox" class="c-checktype-check" />
          <div class="c-checktype-label">
            <div class="date">2025.01.20</div>
            <i class="icon"></i>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="desc">신경내과</div>
            </div>
            <div class="list-item">
              <div class="tit">진료의</div>
              <div class="desc">이현정</div>
            </div>
            <div class="list-item">
              <div class="tit">진료구분</div>
              <div class="desc">통원</div>
            </div>
            <div class="list-item">
              <div class="item-sub">
                <div class="tit">
                  총 발급비용
                  <div class="tit-sub">456,789원</div>
                </div>
                <i
                  class="icon-arrow-up"
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
          <Button
            class="mt-12"
            btn-type="line"
            element-type="button"
            aria-label="바로 결제하기"
            @click="clickPayment"
          />
        </label>
        <label for="check2" class="c-checktype-btn">
          <input id="check2" v-model="insuranceSelections[1]" name="check2" type="checkbox" class="c-checktype-check" />
          <div class="c-checktype-label">
            <div class="date">2025.01.20</div>
            <i class="icon"></i>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="desc">신경내과</div>
            </div>
            <div class="list-item">
              <div class="tit">진료의</div>
              <div class="desc">이현정</div>
            </div>
            <div class="list-item">
              <div class="tit">진료구분</div>
              <div class="desc">통원</div>
            </div>
            <div class="list-item">
              <div class="item-sub">
                <div class="tit">
                  총 발급비용
                  <div class="tit-sub">456,789원</div>
                </div>
                <i
                  class="icon-arrow-up"
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
          <Button
            class="mt-12"
            btn-type="line"
            element-type="button"
            aria-label="바로 결제하기"
            @click="clickPayment"
          />
        </label>
      </div>
    </FlexSection>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        :aria-label="`장바구니 담기(${selectedCount}건)`"
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
import Select from '~/components/publishing/input/Select.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'

// 확장된 상세 항목 상태
const expandedItems = ref([false, false])

// 상세 항목 토글 함수
const toggleDetail = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
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
  padding: 2rem;
  margin-right: -2rem;
  margin-left: -2rem;
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
      .date {
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
  //
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
</style>
