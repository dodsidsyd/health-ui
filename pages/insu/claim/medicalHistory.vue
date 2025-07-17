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
    <!-- ToDo: 로딩중 -->
    <!-- <div class="wrap-loading">
      <img class="loading-img" src="/assets/images/insu/img-medicalhistory-loading.png" alt="조회중" />
      <div class="loading-tit">보험사에 청구 가능<br />여부를 조회하고 있어요</div>
      <div class="loading-tit-sub">최대 1분까지 걸릴 수 있어요.</div>
    </div> -->
    <div class="agree-wrap flex flex-col gap-10 pb-32 mt-40">
      <h1 class="c-tit">
        <span class="text">
          진료내역을 선택해 주세요
        </span>
      </h1>
    </div>
    <FlexSection>
      <div class="medical-info">
        <div class="medical-info-head">
          <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
          <div class="wrap-hospital">
            <div class="text">강동성심병원 강동성심병원 강동성심병원 강동성심병원 강동성심병원 강동성심병원 </div>
            <div class="label out">통원</div>
          </div>
          <div class="count"><strong>12</strong>건</div>
        </div>
      </div>
    </FlexSection>
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <FlexSection>
      <div class="text-info">통원 진료내역은 <strong>10</strong>건씩 청구 가능해요.</div>

      <div class="wrap-check-icon">
        <label for="check1" class="c-checktype-btn">
          <input 
            id="check1" 
            name="check1" 
            type="checkbox" 
            class="c-checktype-check" 
            v-model="hospitalSelections[0]"
            @change="updateAllSelection"
          />
          <div class="c-checktype-label">
            <div class="wrap-status">
              <div class="label yet">미청구</div>
              <i class="icon"></i>
            </div>
            <ul class="detail-list">
              <li class="item">
                <div class="item-tit">진료일</div>
                <div class="item-desc">2025. 01. 20 ~ 2025. 05. 30</div>
              </li>
              <li class="item">
                <div class="item-tit">진료과</div>
                <div class="item-desc">영상의학과</div>
              </li>
              <li class="item">
                <div class="item-tit">입원비</div>
                <div class="item-desc">123,456원</div>
              </li>
            </ul>
          </div>
        </label>
        <label for="check2" class="c-checktype-btn">
          <input 
            id="check2" 
            name="check2" 
            type="checkbox" 
            class="c-checktype-check" 
            v-model="hospitalSelections[1]"
            @change="updateAllSelection"
          />
          <div class="c-checktype-label">
            <div class="wrap-status">
              <div class="label ing">청구중</div>
              <i class="icon"></i>
            </div>
            <ul class="detail-list">
              <li class="item">
                <div class="item-tit">진료일</div>
                <div class="item-desc">2025. 01. 20 ~ 2025. 05. 30</div>
              </li>
              <li class="item">
                <div class="item-tit">진료과</div>
                <div class="item-desc">영상의학과</div>
              </li>
              <li class="item">
                <div class="item-tit">입원비</div>
                <div class="item-desc">123,456원</div>
              </li>
            </ul>
          </div>
        </label>
        <label for="check3" class="c-checktype-btn">
          <input 
            id="check3" 
            name="check3" 
            type="checkbox" 
            class="c-checktype-check" 
            v-model="hospitalSelections[2]"
            @change="updateAllSelection"
          />
          <div class="c-checktype-label">
            <div class="wrap-status">
              <div class="label yet">미청구</div>
              <i class="icon"></i>
            </div>
            <ul class="detail-list">
              <li class="item">
                <div class="item-tit">진료일</div>
                <div class="item-desc">2025. 01. 20 ~ 2025. 05. 30</div>
              </li>
              <li class="item">
                <div class="item-tit">진료과</div>
                <div class="item-desc">영상의학과</div>
              </li>
              <li class="item">
                <div class="item-tit">입원비</div>
                <div class="item-desc">123,456원</div>
              </li>
            </ul>
          </div>
        </label>
      </div>
    </FlexSection>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="2건 청구하기" class="lg w-full medium btn-sticky" :disabled="hasSelectedHospitals" @click="clickConfirmModal" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { ref, computed } from 'vue'
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'

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

const clickConfirmModal = async () => {
  const modalContent1 = `
    <div class="modal-content-info">
      <div style="text-align:left;">해당 진료내역은 NH농협생명보험사의 계약<br />정보 확인이 필요해 지금 청구할 수 없어요.</div>
      <ul style="margin: 1.6rem 0;">
        <li style="padding: 0 0.4rem;display:flex;justify-content: space-between;align-items:center;">
          <div style="font-size: 1.4rem;font-weight: 400;color: #555555;">2023. 08. 01</div>
          <div style="font-size: 1.4rem;font-weight: 500;">영상학과</div>
        </li>
        <li style="margin-top: 0.6rem;padding: 0 0.4rem;display:flex;justify-content: space-between;align-items:center;">
          <div style="font-size: 1.4rem;font-weight: 400;color: #555555;">2023. 07. 01</div>
          <div style="font-size: 1.4rem;font-weight: 500;">영상의학과</div>
        </li>
      </ul>
      <div style="border-top: 0.1rem solid #E2E2E2;padding: 1.6rem 2rem 0;font-weight: 700;">위 진료내역을 제외하고 청구하시겠어요?</div>
    </div>`
    // ToDo: 11건 이상일때 아래 팝업
    const modalContent2 = `
    <div class="modal-content-info">
      <div style="text-align:left;">통원 진료내역은 최대 10건까지 선택할 수 있어요.</div>
    </div>`
    // 입원 팝업1
    const modalContent3 = `
    <div class="modal-content-info">
      <div style="text-align:left;">내 실손보험 계약정보는 청구의신 ARS (02-2009-5494)를 통해 확인하신 후, 보험사를 다시 선택해 주세요.</div>
    </div>`
    // 입원 팝업2
    const modalContent4 = `
    <div class="modal-content-info">
      <div style="text-align:left;">선택한 입원 진료내역은 NH농협생명보험사의 실손보험 계약정보 및 계약기간 확인이필요해요.</div>
    </div>`

  await ConfirmModal.open({
    title: '안내',
    isVisible: true,
    html: modalContent1,
    confirmButtonText: '계속하기',
    isShowCancelButton: false
  })
}
</script>

<style scoped lang="scss">
.medical-info {
  border: 0.1rem solid #E2E2E2;
  border-radius: 1.2rem;
  padding: 1.2rem 2rem;
  .medical-info-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-hospital {
      flex: 1 0 auto;
      max-width: calc(100% - 10rem);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        flex: 1;
        min-width: 0;
        font-weight: 700;
        @include mixin.ellipsis;
      }
      .label {
        display: inline-block;
        padding: 0.3rem 0.6rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        // 통원
        &.out {
          background-color: #FEF4CC;
          color: #8D7000;
        }
        // 입원
        &.in {
          background-color: #EAF2CC;
          color: #506A1D;
        }
      }
    }
    .count {
      flex: 0 0;
      font-size: 1.4rem;
      font-weight: 600;
      strong {
        margin-right: 0.3rem;
        color: #4C7FF7;
      }
    }
  }
}
.text-info {
  padding-bottom: 2rem;
  font-weight: 500;
  strong {
    font-weight: 700;
  }
}
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
  background-color: #F4F4F4;
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
      border: 0.2rem solid #4C7FF7;
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
      .wrap-status {
        width: 100%;
        // background-color: red;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .label {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 130%;
          color: #fff;
          &.yet {
            background-color: #BD9600;
          }
          &.ing {
            background-color: #C36F00;
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
      .detail-list {
        .item {
          margin-top: 1.6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:not(:first-child) {
            margin-top: 0.8rem;
          }
          .item-tit {
            font-size: 1.3rem;
            font-weight: 500;
            color: #959595;
          }
          .item-desc {
            font-size: 1.4rem;
            font-weight: 600;
          }
        }
      }
    }
  }
}
.wrap-loading {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  .loading-img {
    width: 12.8rem;
    height: auto;
  }
  .loading-tit {
    font-size: 2.4rem;
    font-weight: 700;
    text-align: center;
  }
  .loading-tit-sub {
    color: #555555;
    text-align: center;
  }
}
</style>
