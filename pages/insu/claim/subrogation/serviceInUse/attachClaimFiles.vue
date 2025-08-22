<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <h1 class="c-tit mt-24">
      <span class="text">
        청구 서류를 첨부해 주세요
      </span>
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
    <div class="wrap-attach-desc">
      <div class="attach-item">
        <img class="img-attach" src="/assets/images/insu/icon-attach01.svg" alt="서류 글씨가 잘 보이도록 촬영" />
        <span class="text">서류 글씨가<br />잘 보이도록 촬영</span>
      </div>
      <div class="attach-item">
        <img class="img-attach" src="/assets/images/insu/icon-attach02.svg" alt="최대 15장까지 서류첨부가 가능" />
        <span class="text">최대 15장까지<br />서류첨부가 가능</span>
      </div>
    </div>
    <!-- 서류첨부 버튼 -->
    <label class="btn-attach" for="file-upload">
      <input id="file-upload" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
      <img src="/assets/images/insu/icon-attach.svg" alt="첨부파일" />
      <span class="text">첨부서류</span>
    </label>
    <div class="wrap-attached-file">
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="다음" class="lg w-full medium btn-sticky" @click="clickNext" />
  </ButtonGroup>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
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



const clickNext = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/InputFax')
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
.wrap-attach-desc {
  margin: 3.2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .attach-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    &:first-child {
      padding-right: 1.6rem;
    }
    &:not(:first-child) {
      border-left: 0.1rem solid #EEEEEE;
      padding-left: 1.6rem;
    }
    .img-attach {
      width: 3.6rem;
      height: auto;
    }
    .text {
      font-size: 1.4rem;
      font-weight: 500;
      text-align: center;
    }
  }
}
.btn-attach {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding: 1.8rem;
  border-radius: 0.8rem;
  background-color:#F9F9F9;
  border: 0.1rem dashed var(--Semantic-Border-BRD-01, #E2E2E2);
  [type='file'] {
    display: none;
  }
}
.wrap-attached-file {
  margin-top: 0.8rem;
  padding: 2rem;
  background-color: #F4F4F4;
  border-radius: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.1rem;
  .btn-delete-attached {
    flex: 0 0 9.7rem;
    position: relative;
    border-radius: 0.8rem;
    border: 0.1rem solid #E2E2E2;
    width: 9.7rem;
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &::after {
      content: '';
      width: 1.8rem;
      height: 1.8rem;
      position: absolute;
      top: 0.9rem;
      right: 0.9rem;
      background: url('/assets/images/insu/icon-delete-circle.svg') center center no-repeat;
      background-size: 100%;
    }
  }
}
</style>
