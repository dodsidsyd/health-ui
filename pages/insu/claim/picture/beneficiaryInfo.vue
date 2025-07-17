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
    <div class="pb-32 mt-24">
      <h1 class="c-tit">
        <span class="text">
          수익자(보험금 받는 분)<br />정보를 입력해 주세요
        </span>
      </h1>
      <div class="wrap-benefit">
        <div class="input-tit required">수익자 이름</div>
        <InputText placeholder="김레몬" disabled />
      </div>
      <!-- 주민번호 -->
      <div class="resident-id-form-group">
        <label for="resident-id-front" class="resident-id-label required">주민등록번호</label>
        <div class="resident-id-inputs">
          <input
            id="resident-id-front"
            v-model="residentIdFront"
            type="tel"
            class="resident-id-input"
            maxlength="6"
            placeholder="생년월일 6자리"
            inputmode="numeric"
            aria-label="주민등록번호 앞 6자리"
          />
          <span class="resident-id-hyphen">-</span>
          <input
            id="resident-id-back"
            v-model="residentIdBack"
            type="tel"
            class="resident-id-input"
            maxlength="7"
            placeholder="뒷자리 입력"
            inputmode="numeric"
            aria-label="주민등록번호 뒤 7자리"
          />
        </div>
      </div>
      <div class="mt-12">
        <!-- 수익자 휴대폰 -->
        <InputText label="수익자 휴대폰 번호*" placeholder="휴대폰 번호를 입력해주세요." />
      </div>
      <div class="mt-12">
        <!-- 피보험자와의 관계 -->
        <InputText label="피보험자와의 관계*" placeholder="예) 자녀, 남편, 배우자, 부, 모 등" />
      </div>
    </div>
    <hr class="hr-section ml-n20 mr-n20 mb-10" />
    <FlexSection>
      <div class="wrap-check-head">
        <div class="tit">보험금 지급계좌</div>
        <Button btn-type="line" element-type="button" aria-label="지급계좌 추가" class="xs" icon="ico-plus" :width="12.5" />
      </div>
      
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
            <img src="/assets/images/insu/logo-alert-db.png" alt="DB손해보험 자동이체 계좌" class="hospital-logo" />
            <div class="wrap-hospital-desc">
              <div class="wrap-desc">
                <span class="tit">DB손해보험 자동이체 계좌 DB손해보험 자동이체 계좌DB손해보험 자동이체 계좌DB손해보험 자동이체 계좌DB손해보험 자동이체 계좌DB손해보험 자동이체 계좌DB손해보험 자동이체 계좌DB손해보험 자동이체 계좌</span>
                <span class="address">김레몬 123456789456</span>
              </div>
            </div>
            <i class="icon"></i>
          </div>
        </label>
        <div class="tit2">최근 보험금 지급계좌</div>
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
            <img src="/assets/images/insu/logo-alert-db.png" alt="DB손해보험 자동이체 계좌" class="hospital-logo" />
            <div class="wrap-hospital-desc">
              <div class="wrap-desc">
                <span class="tit">DB손해보험 자동이체 계좌</span>
                <span class="address">김레몬 123456789456</span>
              </div>
            </div>
            <i class="icon"></i>
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
            <img src="/assets/images/insu/logo-alert-db.png" alt="DB손해보험 자동이체 계좌" class="hospital-logo" />
            <div class="wrap-hospital-desc">
              <div class="wrap-desc">
                <span class="tit">DB손해보험 자동이체 계좌</span>
                <span class="address">김레몬 123456789456</span>
              </div>
            </div>
            <i class="icon"></i>
          </div>
        </label>
        <div class="tit2">새로운 보험금 지급계좌</div>
        <label for="check4" class="c-checktype-btn">
          <input 
            id="check4" 
            name="check4" 
            type="checkbox" 
            class="c-checktype-check" 
            v-model="hospitalSelections[3]"
            @change="updateAllSelection"
          />
          <div class="c-checktype-label">
            <img src="/assets/images/insu/logo-alert-db.png" alt="DB손해보험 자동이체 계좌" class="hospital-logo" />
            <div class="wrap-hospital-desc">
              <div class="wrap-desc">
                <span class="tit">DB손해보험 자동이체 계좌</span>
                <span class="address">김레몬 123456789456</span>
              </div>
            </div>
            <i class="icon"></i>
          </div>
        </label>
      </div>
      <div class="wrap-regi-accout">
        <div class="regi-account-head">
          <div class="tit">새로운 지급계좌</div>
          <i class="ico-cancel" @click="clickRegisterHospitals">
            <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          </i>
        </div>
        <InputSearch 
          class="bank-account"
          selectPlaceholder="은행선택" 
          placeholder="계좌번호 입력" 
          modal-title="은행선택"
          :custom-search-options="bankOptions"
          :hide-search-icon="true"
        />
        <div class="wrap-depositor">
          <Button btn-type="primary" element-type="button" aria-label="예금주 확인" />
          <div class="text">23시~01시 사이에는 은행 서버 점검시간으로 예금주 확인 시 오류가 발생할 수 있습니다.</div>
        </div>
      </div>
    </FlexSection>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="확인" class="lg w-full medium btn-sticky" :disabled="!hasSelectedHospitals" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputSearch from '~/components/publishing/input/InputSearch.vue'
import { ref, computed } from 'vue'

// 주민등록번호 입력값
const residentIdFront = ref('')
const residentIdBack = ref('')

// 은행 옵션 정의
const bankOptions = ref([
  { value: 'shinhan', label: '신한은행' },
  { value: 'woori', label: '우리은행' },
  { value: 'hana', label: '하나은행' }
])

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
.wrap-benefit {
  .input-tit {
    margin-top: 3.2rem;
  }  
}
.input-tit {
  margin-bottom: 0.6rem;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.3;
  color: #555555;
  position: relative;
  &.required {
    &::after {
      content: "*";
      font-size: 1.2rem;
      display: inline-block;
      margin-left: 0.3rem;
      color: #f14960;
    }
  }
}

.wrap-check-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tit {
    font-weight: 700;
  }
  
}
.wrap-check-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 2rem;
  margin-right: -2rem;
  margin-left: -2rem;
  .c-checktype-btn {
    width: 100%;
    padding: 2rem;
    border: 0.1rem solid #E2E2E2;
    background-color: #fff;
    border-radius: 1.2rem;
    &:has(.c-checktype-check:checked) {
      padding: 1.9rem;
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
  .tit2 {
    margin-top: 0.4rem;
    font-size: 1.4rem;
    font-weight: 600;
    width: 100%;
  }
}
.resident-id-form-group {
  margin-top: 1.2rem;
  width: 100%; /* Ensures it takes full width of its parent */
  .resident-id-label {
    display: block; /* Makes the label take its own line */
    margin-bottom: 0.6rem;
    font-weight: 400;
    color: #555;
    font-size: 12px;
    position: relative;
    &.required {
      &::after {
        content: "*";
        font-size: 1.2rem;
        display: inline-block;
        margin-left: 0.3rem;
        color: #f14960;
      }
    }
  }
  .resident-id-inputs {
    display: flex; /* Uses flexbox for horizontal alignment */
    align-items: center; /* Vertically aligns items */
    gap: 10px; /* Space between inputs and hyphen */
    .resident-id-input {
      flex: 1; /* Allows inputs to grow and shrink */
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box; /* Includes padding and border in the element's total width and height */
      min-width: 0; /* Allows shrinking below content size */
      &::placeholder {
        color: #bbb;
      }
    }
    .resident-id-hyphen {
      font-size: 18px;
      color: #555;
      font-weight: bold;
    }
  }
}
.wrap-regi-accout {
  margin-top: 1.2rem;
  margin-bottom: 4rem;
  padding: 2rem;
  border-radius: 1.2rem;
  background-color: #F4F4F4;
  .regi-account-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tit {
      font-size: 1.4rem;
      font-weight: 600;
    }
  }
  .c-input.search-bar.bank-account {
    margin-top: 2rem;
    :deep(.c-inpType) {
      border-radius: 0.8rem;
      .c-inp-el {
        background-color: #fff;
        border: none;
      }
    }
  }
  .wrap-depositor {
    .c-btn {
      margin-top: 2rem;
      background-color: #4F5561;
    }
    .text {
      margin-top: 0.6rem;
      font-size: 1.3rem;
      color: #959595;
    }
  }
}
</style>
