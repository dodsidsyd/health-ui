<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <h1 class="c-tit mt-24">
      <span class="text">
        보상 안내 받을 분을 선택해 주세요
      </span>
    </h1>
    <div class="wrap-form">
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
      <div class="wrap-select-radio">
        <div class="input-tit required">보안안내 대상</div>
        <div class="wrap-radio">
          <Radio id="rdo1" name="rdo1" checked custom-style="button small w-full" aria-label="보험설계사" />
          <Radio id="rdo2" name="rdo1" custom-style="button small w-full" aria-label="피보험자" />
        </div>
      </div>
      <InputText
        label="피보험자 이름"
        class="require"
        :is-valid="true"
        valid-text="이름을 입력해주세요."
        placeholder="피보험자 이름을 입력해 주세요."
      />
      <InputText
        label="피보험자 휴대폰 번호"
        class="require"
        :is-valid="true"
        valid-text="피보험자 휴대폰 번호를 입력해주세요."
        placeholder="휴대폰 번호를 입력해주세요."
      />
      
      <InputText
        label="메모"
        class="optional"
        :is-valid="true"
        valid-text="메모할 내용을 입력해주세요."
        placeholder="내용을 입력해 주세요."
      />
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="다음" class="lg w-full medium btn-sticky" @click="clickNext" />
  </ButtonGroup>

  <BottomModal
    :is-visible="isShowModal"
    title="선택"
    confirm-button-text="네, 같아요"
    cancel-button-text="아니요, 달라요"
    @close="isShowModal = false"
    @cancel="clickDiff"
    @confirm="clickSame"
  >
    <template #content>
      <div style="font-size:1.8rem;font-weight: 700;text-align:left;">피보험자(치료 받은 분)와<br />수익자(보험금 받는 분)가 같은가요?</div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Select from '~/components/publishing/input/Select.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Radio from '~/components/publishing/input/radio.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

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

const isShowModal = ref(false)

const clickDiff = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickSame = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickNext = () => {
  isShowModal.value = true
}
</script>
<style scoped lang="scss">
.wrap-form {
  margin-top: 3.2rem;
  .c-input {
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
  }
  .wrap-select-radio {
    margin-top: 3.2rem;
    .input-tit {
      margin: 1.2rem 0 0.6rem;
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.3;
      color: #555555;
      position: relative;
      &.required::after {
        content: "*";
        font-size: 1.2rem;
        display: inline-block;
        margin-left: 0.3rem;
        color: #f14960;
      }
    }
    .wrap-radio {
      display: flex;
      justify-content: space-between;
      gap: 0.8rem;
    }
  }
}

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
</style>
