<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구"
    logo-type="text"
    :has-notification="true"
    :has-add-text-left="true"
  >
    <h1 class="c-tit mt-24">
      <span class="text"> 청구할 내용을 확인해 주세요 </span>
    </h1>
    <div class="custom-select-container">
      <div class="custom-select-display" @click="openCustomSelect">
        <span class="fixed-label">설계사</span>
        <div class="separator"></div>
        <span class="selected-value">{{ selectedAgentLabel }}</span>
        <i class="custom-arrow" :class="{ open: isShowCustomSelect }"></i>
      </div>
    </div>
    <!-- 커스텀 Select 모달 -->
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
    </BottomModal>
    <hr class="hr-section ml-n20 mr-n20 mb-10 mt-32" />
    <div class="wrap-claim-company">
      <img class="logo" src="/assets/images/insu/logo_KUMedicine.svg" alt="보험사" />
      <div class="text">신한라이프</div>
    </div>
    <h2 class="claim-tit">청구내용</h2>
    <div class="wrap-claim-list">
      <div class="item">
        <div class="tit">피보험자(치료 받은 분)</div>
        <div class="desc">이레몬</div>
      </div>
      <div class="item">
        <div class="tit">수익자(보험금 받는 분)</div>
        <div class="desc">김헬스</div>
      </div>
      <div class="item">
        <div class="tit">사고유형</div>
        <div class="desc">질병</div>
      </div>
      <div class="item">
        <div class="tit">사고내용</div>
        <div class="desc">감기몸살</div>
      </div>
      <div class="item">
        <div class="tit">보험금 수령계좌</div>
        <div class="desc">국민은행(이레몬)<span>1324567897897</span></div>
      </div>
      <div class="item">
        <div class="tit">보상안내 연락처</div>
        <div class="desc">박미란(설계사)<span>010-1111-2222</span></div>
      </div>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="청구하기"
      class="lg w-full medium btn-sticky"
      @click="clickCharge"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

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

const clickCharge = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/successCharge')
}
</script>

<style scoped lang="scss">
// 커스텀 Select 스타일
.custom-select-container {
  margin-top: 3.2rem;
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

.wrap-claim-company {
  margin-top: 2.2rem;
  border-radius: 1.2rem;
  border: 0.1rem solid #e2e2e2;
  padding: 1.2rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  .logo {
    width: 4.8rem;
    height: 4.8rem;
    flex: 0 0;
  }
  .text {
    font-weight: 700;
  }
}
.claim-tit {
  margin: 0 -2rem;
  padding: 2.1rem 2rem;
  font-size: 1.6rem;
  font-weight: 700;
  border-bottom: 0.1rem solid #eeeeee;
}
.wrap-claim-list {
  margin-bottom: 3rem;
  .item {
    padding: 1.6rem 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:not(:first-child) {
      border-top: 1px solid #eee;
    }
    .tit {
      color: #555555;
    }
    .desc {
      text-align: right;
      font-weight: 500;
      span {
        display: block;
      }
    }
  }
}
</style>
