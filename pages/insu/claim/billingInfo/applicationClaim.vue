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
      <span class="text">
        보험금 청구 내역을<br />확인할 수 있어요
      </span>
    </h1>
    <Button btn-type="line" element-type="button" aria-label="처방전 조회" />
    <hr class="hr-section ml-n20 mr-n20" />
    <div class="total-claim">
      <div class="total">총 <strong>2</strong>건</div>
      <div class="sort-insurance">
        <button class="item">전체</button>
        <button class="item">최근 7일<i class="icon-arrow-down"></i></button>
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
          <label for="status" class="label ready">피보험자 동의 대기</label>
          <div class="date">2025.03.25</div>
        </div>
        <div class="wrap-insurance-company">
          <img src="/assets/images/insu/logo_kbbank.svg" alt="KB보험회사" />
          <span class="text">KB손해보험</span>
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
        <Button btn-type="primary" element-type="button" aria-label="추가 서류 접수하기" class="sm mt-24" />
      </div>
      <div class="item">
        <div class="wrap-status">
          <label for="status" class="label ready">피보험자 동의 대기</label>
          <div class="date">2025.03.25</div>
        </div>
        <div class="wrap-insurance-company">
          <img src="/assets/images/insu/logo_kbbank.svg" alt="KB보험회사" />
          <span class="text">KB손해보험</span>
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
        <Button btn-type="primary" element-type="button" aria-label="추가 서류 접수하기" class="sm mt-24" />
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Button from '~/components/publishing/button/Button.vue'

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
  { value: '설계사5', label: '설계사5' },
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
</script>
<style scoped lang="scss">
// 청구내역
.wrap-claim-list {
  margin: 0 -2rem;
  padding: 2rem;
  background-color: #F4F4F4;
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
      .label {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        color: #fff;
        &.ready {
          background-color: #BD9600;
        }
      }
      .date {
        font-size: 1.4rem;
        color: #555555;
      }
    }
    .wrap-insurance-company {
      margin-top: 1.6rem;
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
    color: #2B2B2B;
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
          background-color: #E2E2E2;
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
</style>