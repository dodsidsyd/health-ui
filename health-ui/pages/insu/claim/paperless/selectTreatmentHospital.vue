<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="agree-wrap flex flex-col gap-10 mt-40">
      <h1 class="c-tit">
        <span class="text">
          다녀온 병원을 선택해주세요.
        </span>
      </h1>
      <div class="c-tit-sub">
        <span class="text">최근 3년간 MY병원 진료내역이에요.</span>
        <div class="icon" @click="toggleTooltip">
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10.5V6.75M10 13.2795V13.3125M17.5 10.5C17.5 14.6421 14.1421 18 10 18C5.85786 18 2.5 14.6421 2.5 10.5C2.5 6.35786 5.85786 3 10 3C14.1421 3 17.5 6.35786 17.5 10.5Z" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="tooltip" v-show="isTooltipOpen">
            <button type="button" class="c-tooltip-close-btn" aria-label="닫기" @click.stop="closeTooltip"></button>
            <div class="text">MY병원을 연결해 최근 진료 내역을 업데이트할 수 있어요.</div>
          </div>
        </div>
      </div>
      <Button btn-type="line" element-type="button" aria-label="MY병원 연결하기" class="mt-16" />
    </div>
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <LineTabs :tabs="tabs" />
    <FlexSection>
      <div class="total-my-hospotal">
        <div class="total">총 <strong>{{ totalHospitalCount }}</strong>건의 병원을 찾았어요.</div>
      </div>
    </FlexSection>
    <div class="wrap-result" v-if="totalHospitalCount > 0">
      <div class="wrap-hospital-list">
        <div class="item" v-for="(hospital, index) in hospitals" :key="index">
          <div class="item-subject">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="병원로고" class="logo" />
            <div class="wrap-info">
              <div class="tit">{{ hospital.name }}</div>
              <div class="total"><strong>{{ hospital.count }}</strong>건</div>
            </div>
            <Button
              btn-type="primary"
              element-type="button"
              aria-label="청구하기"
              class="xs fz-14 w-auto pl-16 pr-16 medium"
              @click="clickBottomModal"
            />
          </div>
          <div class="wrap-bill" :class="{ 'show': billVisibleStates[index] }">
            <div class="wrap-bill-item" v-for="(bill, billIndex) in hospital.bills" :key="billIndex">
              <div class="item-list">
                <span class="tit">진료일</span>
                <span class="value">{{ bill.date }}</span>
              </div>
              <div class="item-list">
                <span class="tit">진료과</span>
                <span class="value">{{ bill.department }}</span>
              </div>
              <div class="item-list">
                <span class="tit">입원비</span>
                <span class="value">{{ bill.cost }}</span>
              </div>
            </div>
          </div>
          <button class="item-btn" @click="toggleBill(index)">
            <span class="text">{{ billVisibleStates[index] ? '내역접기' : '내역보기' }}</span>
            <img 
              src="/assets/images/insu/icon-arrow-down.svg" 
              alt="내역보기" 
              :class="{ 'rotated': billVisibleStates[index] }"
            />
          </button>
        </div>
      </div>
      <div class="wrap-find-hospital">
        <span class="text">찾고 있는 병원이 없나요?</span>
        <Button btn-type="secondary" element-type="button" aria-label="직접 병원 찾기" class="xs w-auto pl-16 pr-16 medium"  @click="clickFindSelfHospitals" />
      </div>
    </div>
    <div class="wrap-empty" v-if="totalHospitalCount === 0">
      <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
      <div class="tit">MY병원의 진료내역을 찾지 못했어요.</div>
      <div class="sut-tit">서류없이 청구 가능한 병원을<br />직접 찾아서 청구 할 수 있어요.</div>
      <Button btn-type="secondary" element-type="button" aria-label="직접 병원 찾기" class="xs w-auto pl-16 pr-16 medium"  @click="clickFindSelfHospitals" />
    </div>
  </BaseBody>
  <BottomModal
    :is-visible="isShowBottomModal"
    v-bind="bottomModalProps"
    @cancel="clickCancel"
    @confirm="clickConfirm"
    @close="toggleBottomModal"
  >
    <template #content>
      <div class="wrap-radio-btn">
        <RadioImg id="rdo1" name="rdo1" checked custom-style="button has-icon" text="본인" :icon-src="iconId" icon-alt="아이콘:본인" />
        <RadioImg id="rdo2" name="rdo1" custom-style="button has-icon" text="가족" :icon-src="iconFamily" icon-alt="아이콘:가족" />
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import { ConfirmModal, BottomModal } from '@lemonhc/fo-ui/components/modal'
import RadioImg from '~/components/publishing/input/radioImg.vue'
import iconId from '~/assets/images/insu/icon-id.svg'
import iconFamily from '~/assets/images/insu/icon-family.svg'

const isShowBottomModal = ref(false)
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}

const activeLineTab = ref('accountInfo')
const tabs = ref<Tab[]>([
  { title: '통원', to: '/insu/claim/paperless/selectTreatmentHospital' },
  { title: '입원', to: '/insu/claim/paperless/selectHospitalization' },
])
const isTooltipOpen = ref(false)

// 병원 데이터
const hospitals = ref([
  {
    name: '고려대학교 안암병원',
    count: 1,
    bills: [
      {
        date: '2025. 01. 20 ~ 2025. 05. 30',
        department: '영상의학과',
        cost: '123,456원'
      },
      {
        date: '2025. 01. 20 ~ 2025. 05. 30',
        department: '영상의학과',
        cost: '123,456원'
      }
    ]
  },
  {
    name: '서울대학교병원',
    count: 1,
    bills: [
      {
        date: '2025. 02. 15 ~ 2025. 06. 10',
        department: '내과',
        cost: '234,567원'
      },
      {
        date: '2025. 03. 01 ~ 2025. 07. 20',
        department: '외과',
        cost: '345,678원'
      }
    ]
  }
])

// 각 병원의 내역 표시 상태를 개별적으로 관리
const billVisibleStates = ref(hospitals.value.map(() => false))

const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value
}

const closeTooltip = () => {
  isTooltipOpen.value = false
}

const toggleBill = (index: number) => {
  billVisibleStates.value[index] = !billVisibleStates.value[index]
}

const clickFindHospitals = () => {
  navigateTo('/insu/claim/paperless/selectTreatmentHospital')
  
}

const clickFindSelfHospitals = () => {
  navigateTo('/insu/claim/findSelfHospitals')
}

const totalHospitalCount = computed(() => hospitals.value.reduce((total: number, hospital: any) => total + hospital.count, 0))

const bottomModalProps = ref({
  title: '누가 병원에 다녀왔나요?',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
</script>

<style scoped lang="scss">
.total-my-hospotal {
  width: 100%;
  padding: 2.1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 140%;
    color: #2B2B2B;
  }
}
.wrap-result {
  .wrap-hospital-list {
    background-color:#F4F4F4;
    padding: 2rem;
    margin-left: -2rem;
    margin-right: -2rem;
    .item {
      background-color: #fff;
      border-radius: 1.2rem;
      & + .item {
        margin-top: 1.2rem;
      }
      .item-subject {
        padding: 2rem 2rem 1.6rem;
        display: flex;
        align-items: center;
        gap: 1.6rem;
        min-width: 0;
        .logo {
          width: 4.8rem;
          height: 4.8rem;
          flex-shrink: 0;
        }
        .wrap-info {
          flex: 1 1 auto;
          min-width: 0;
          .tit {
            font-size: 1.6rem;
            font-weight: 700;
            line-height: 150%;
            color: #2B2B2B;
            width: 100%;
            @include mixin.ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .total {
            margin-top: 0.1rem;
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 140%;
            color: #2B2B2B;
            strong {
              color: #4C7FF7;
            }
          }
        }
        .c-btn {
          flex-shrink: 0;
        }
      }
      .wrap-bill {
        margin: 0 2rem 1.6rem;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;
        
        &.show {
          max-height: 50rem; // 충분한 높이로 설정
        }
        
        .wrap-bill-item {
          background-color: #F4F4F4;
          padding: 2rem;
          border-radius: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          & + .wrap-bill-item {
            margin-top: 1.2rem;
          }
          .item-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .tit {
              font-size: 1.3rem;
              font-weight: 500;
              line-height: 140%;
              color: #959595;
            }
            .value {
              font-size: 1.4rem;
              font-weight: 600;
              line-height: 140%;
              color: #2B2B2B;
            }
          }
        }
      }
      .item-btn {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.7rem 0;
        border-top: 0.1rem solid #EEEEEE;
        .text {
          font-size: 1.6rem;
          font-weight: 400;
          line-height: 140%;
          color: #2B2B2B;
        }
        img {
          margin-left: 0.8rem;
          transition: transform 0.3s ease-in-out;
          
          &.rotated {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  .wrap-find-hospital {
    margin-top: 2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    border: 0.1rem solid #E2E2E2;
    border-radius: 1.2rem;
    .text {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 140%;
      color: #555;
    }
  }
}
.wrap-empty {
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%;
    color: #555555;
  }
  .sut-tit {
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 140%;
    color: #555;
  }
}
.wrap-radio-btn {
  margin-top: 1.6rem;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
