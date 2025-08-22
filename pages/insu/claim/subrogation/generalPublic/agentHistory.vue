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
    <InputSearch
      :custom-search-options="postSearchOptions"
      :select-placeholder="'설계사 선택'"
      :modal-title="'설계사 선택'"
      :placeholder="'피보험자 이름'"
    />
    <!-- <div class="custom-select-container">
      <div class="custom-select-display" @click="openCustomSelect">
        <span class="fixed-label">설계사</span>
        <div class="separator"></div>
        <span class="selected-value">{{ selectedAgentLabel }}</span>
        <i class="custom-arrow" :class="{ open: isShowCustomSelect }"></i>
      </div>
    </div>
\
    <BottomModal
      title="설계사를 선택해 주세요"
      :is-visible="isShowCustomSelect"
      :is-show-cancel-button="false"
      :is-show-confirm-button="false"
      @close="closeCustomSelect"
    >
      <template #content>
        <div class="custom-select-options">
          <div
            v-for="option in selectOptions"
            :key="option.value"
            :class="['custom-option-item', { selected: selectedAgentValue === option.value }]"
            @click="selectCustomOption(option)"
          >
            <span class="option-label">{{ option.label }}</span>
            <i v-if="selectedAgentValue === option.value" class="check-icon">✓</i>
          </div>
        </div>
      </template>
    </BottomModal> -->

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
import InputSearch from '~/components/publishing/input/InputSearch.vue'
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

// 커스텀 검색 옵션 데이터 정의
const postSearchOptions = [
  { value: 'title', label: '설계사1' },
  { value: 'content', label: '설계사2' },
  { value: 'author', label: '설계사3' }
]
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
      .label {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        color: #fff;
        &.ready {
          background-color: #bd9600;
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

// 커스텀 Select 스타일
.custom-select-container {
  margin-top: 2rem;
  .custom-select-display {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    position: relative;

    &:hover {
      border-color: #4c7ff7;
    }
    .fixed-label {
      color: #959595;
      font-size: 1.6rem;
      font-weight: 500;
      margin-right: 0.8rem;
    }

    .separator {
      width: 1px;
      height: 1.6rem;
      background-color: #e2e2e2;
      margin: 0 0.8rem;
    }

    .selected-value {
      color: #2b2b2b;
      font-size: 1.6rem;
      font-weight: 500;
      flex: 1;
    }

    .custom-arrow {
      width: 2.4rem;
      height: 2.4rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10L12.0008 14.58L17 10' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      transition: transform 0.2s ease;

      &.open {
        transform: rotate(180deg);
      }
    }
  }
}
.custom-select-options {
  margin: 0 -2rem;
  .custom-option-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f6f9ff;
    }

    &.selected {
      background-color: #f6f9ff;

      .option-label {
        color: #4c7ff7;
        font-weight: 700;
      }
    }

    .option-label {
      font-size: 1.6rem;
      font-weight: 500;
      color: #555555;
    }

    .check-icon {
      color: #4c7ff7;
      font-weight: bold;
      font-size: 1.4rem;
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
