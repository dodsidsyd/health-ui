<template>
  <BaseBody
    :show-back-button="true"
    page-title="MY병원 찾기"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="agree-wrap flex flex-col gap-10 pb-48 mt-40">
      <h1 class="c-tit">
        <span class="text">
          MY병원 찾기로<br />총 <strong>3</strong>개의 병원을 찾았어요.
        </span>
      </h1>
      <div class="c-tit-sub">아래 병원을 연결하면 서류없이<br />간편하게 보험을 청구할 수 있어요.</div>
    </div>
    <FlexSection>
      <div class="wrap-check">
        <Checkbox 
          id="checkBox1" 
          aria-label="전체 선택" 
          :model-value="isAllSelected"
          @update:model-value="toggleAllSelection"
        />
      </div>
      <div class="wrap-check-icon">
        <div class="c-checktype-btn">
          <input 
            id="check1" 
            name="check1" 
            type="checkbox" 
            class="c-checktype-check" 
            v-model="hospitalSelections[0]"
            @change="updateAllSelection"
          />
          <label for="check1" class="c-checktype-label">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="고려대학교 안암병원" class="hospital-logo" />
            <div class="wrap-hospital-desc">
              <div class="wrap-desc">
                <span class="tit">고려대학교 안암병원 고려대학교 안암병원고려대학교 안암병원고려대학교 안암병원고려대학교 안암병원고려대학교 안암병원고려대학교 안암병원고려대학교 안암병원</span>
                <span class="address">서울특별시 성북구 고려대로 73</span>
              </div>
              <div class="wrap-label">
                <div class="h-label no-doc">종합병원</div>
                <div class="h-label">외래, 입원</div>
              </div>
            </div>
            <i class="icon"></i>
          </label>
        </div>
        <div class="c-checktype-btn">
          <input 
            id="check2" 
            name="check2" 
            type="checkbox" 
            class="c-checktype-check" 
            v-model="hospitalSelections[1]"
            @change="updateAllSelection"
          />
          <label for="check2" class="c-checktype-label">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="고려대학교 안암병원" class="hospital-logo" />
            <div class="wrap-hospital-desc">
              <div class="wrap-desc">
                <span class="tit">고려대학교 안암병원</span>
                <span class="address">서울특별시 성북구 고려대로 73</span>
              </div>
              <div class="wrap-label">
                <div class="h-label no-doc">종합병원</div>
                <div class="h-label">외래, 입원</div>
              </div>
            </div>
            <i class="icon"></i>
          </label>
        </div>
        <div class="c-checktype-btn">
          <input 
            id="check3" 
            name="check3" 
            type="checkbox" 
            class="c-checktype-check" 
            v-model="hospitalSelections[2]"
            @change="updateAllSelection"
          />
          <label for="check3" class="c-checktype-label">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="고려대학교 안암병원" class="hospital-logo" />
            <div class="wrap-hospital-desc">
              <div class="wrap-desc">
                <span class="tit">고려대학교 안암병원</span>
                <span class="address">서울특별시 성북구 고려대로 73</span>
              </div>
              <div class="wrap-label">
                <div class="h-label no-doc">종합병원</div>
                <div class="h-label">외래, 입원</div>
              </div>
            </div>
            <i class="icon"></i>
          </label>
        </div>
      </div>
    </FlexSection>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="MY병원 연결" class="lg w-full medium btn-sticky" :disabled="!hasSelectedHospitals" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import { ref, computed } from 'vue'

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

const clickRegisterHospitals = () => {
  console.log('선택한 병원 등록 후 청구의신 서브메인으로 이동')
  navigateTo('/insu/claim/paperless/successFindHospitals')
}
</script>

<style scoped lang="scss">
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
    height: 10.8rem;
    padding: 2rem;
    border: 0.2rem solid #fff;
    background-color: #fff;
    border-radius: 1.2rem;
    // display: flex;
    // align-items: center;
    // gap: 1.6rem;
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
      display: flex;
      align-items: center;
      gap: 1.6rem;
      width: 100%;
      .hospital-logo {
        width: 4.8rem;
        height: 4.8rem;
        flex-shrink: 0;
      }
      .wrap-hospital-desc {
        flex: 1 1 auto;
        min-width: 0;
        .wrap-desc {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          .tit {
            display: block;
            font-size: 1.6rem;
            font-weight: 700;
            line-height: 1.4;
            color: #2B2B2B;
            width: 100%;
            @include mixin.ellipsis;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
          }
          .address {
            display: block;
            font-size: 1.4rem;
            font-weight: 400;
            line-height: 1.4;
            color: #555555;
            width: 100%;
            @include mixin.ellipsis;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
          }
        }
        .wrap-label {
          margin-top: 0.4rem;
          display: flex;
          gap: 0.4rem;
          .h-label {
            padding: 0.3rem 0.6rem;
            border-radius: 0.4rem;
            background-color: #EEEEEE;
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 1.3;
            color: #555555;
            &.no-doc {
              background-color: #E5EDFF;
              color: #4C7FF7;
            }
            &.myhospital {
              background-color: #4C7FF7;
              color: #fff;
            }
          }
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
  }
}
</style>
