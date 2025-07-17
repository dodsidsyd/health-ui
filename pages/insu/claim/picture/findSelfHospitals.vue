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
    <div class="flex flex-col gap-10 mt-40">
      <h1 class="c-tit">
        <span class="text">
          다녀온 병원을<br/>검색해 주세요
        </span>
        <Button btn-type="line" element-type="button" aria-label="약제비 청구" class="xs" icon="ico-plus" :width="12.5" @click="clickBottomModal" />
      </h1>
      <div class="c-tit-sub">서류 없이도 청구 가능한 병원인지 알 수 있어요.</div>
      <InputText class="search-hospital" inp-type="search" placeholder="병원 이름을 입력해 주세요." />
    </div>
    
    <FlexSection>
      <div class="wrap-recent-searches">
        <div class="text">최근 검색</div>
        <Button btn-type="text" element-type="button" aria-label="전체삭제" class="hasLine xs" />
      </div>
      <!-- ToDo: line16에 입력값이 있으면 위에는 비활성화, 아래 활성화 -->
      <!-- <div class="wrap-claim-type">
        <Checkbox id="checkBox1" v-model="isMyHospital" aria-label="MY병원" />
      </div> -->
    </FlexSection>
    <div class="wrap-hospitals">
      <button class="item">
        <img src="/assets/images/insu/logo_KUMedicine.svg" alt="고려대학교 안암병원" class="hospital-logo" />
        <div class="wrap-hospital-desc">
          <div class="wrap-desc">
            <span class="tit">고려대학교 안암병원</span>
            <span class="address">서울특별시 성북구 고려대로 73</span>
          </div>
          <div class="wrap-label">
            <div class="h-label my">MY병원</div>
            <div class="h-label no-doc">서류없이청구</div>
            <div class="h-label">사진찍어청구</div>
          </div>
        </div>
        <!-- ToDo: 버블링 안되게 코딩 할것 -->
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          <!-- ToDo: line16에 입력값에 따라 검색된 내용이 나옴. 위는 비활성화, 아래는 활성화 된 모양 -->
          <!-- <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" /> -->
        </div>
      </button>
      <button class="item">
        <img src="/assets/images/insu/logo_KUMedicine.svg" alt="고려대학교 안암병원" class="hospital-logo" />
        <div class="wrap-hospital-desc">
          <div class="wrap-desc">
            <span class="tit">고려대학교 안암병원</span>
            <span class="address">서울특별시 성북구 고려대로 73</span>
          </div>
          <div class="wrap-label">
            <div class="h-label my">MY병원</div>
            <div class="h-label no-doc">서류없이청구</div>
            <div class="h-label">사진찍어청구</div>
          </div>
        </div>
        <!-- ToDo: 버블링 안되게 코딩 할것 -->
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          <!-- ToDo: line16에 입력값에 따라 검색된 내용이 나옴. 위는 비활성화, 아래는 활성화 된 모양 -->
          <!-- <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" /> -->
        </div>
      </button>
      <button class="item">
        <img src="/assets/images/insu/logo_KUMedicine.svg" alt="고려대학교 안암병원" class="hospital-logo" />
        <div class="wrap-hospital-desc">
          <div class="wrap-desc">
            <span class="tit">고려대학교 안암병원</span>
            <span class="address">서울특별시 성북구 고려대로 73</span>
          </div>
          <div class="wrap-label">
            <div class="h-label my">MY병원</div>
            <div class="h-label no-doc">서류없이청구</div>
            <div class="h-label">사진찍어청구</div>
          </div>
        </div>
        <!-- ToDo: 버블링 안되게 코딩 할것 -->
        <div class="icon-cancel">
          <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          <!-- ToDo: line16에 입력값에 따라 검색된 내용이 나옴. 위는 비활성화, 아래는 활성화 된 모양 -->
          <!-- <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" /> -->
        </div>
      </button>
    </div>
    <!-- ToDo: 결과값 없을때 아래 활성화 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
      <div class="tit">검색 결과가 없어요.</div>
      <div class="sut-tit">병원 이름을 잘못 입력했거나<br />아직 제휴 전인 병원이에요.</div>
    </div> -->
  </BaseBody>
  <BottomModal
    :is-visible="isShowBottomModal"
    v-bind="bottomModalProps"
    @cancel="clickCancel"
    @confirm="clickConfirmModal"
    @close="toggleBottomModal"
  >
    <template #content>
      <div class="wrap-radio-btn">
        <RadioImg id="rdo1" name="rdo1" checked custom-style="button has-icon" text="본인 방문" :icon-src="iconId" icon-alt="아이콘:본인" />
        <RadioImg id="rdo2" name="rdo1" custom-style="button has-icon" text="가족 방문" :icon-src="iconFamily" icon-alt="아이콘:가족" />
      </div>
      <div class="wrap-claim-info">
        <div class="claim-info-text">약제비 청구를 하시려면 미리 준비해주세요.</div>
        <div class="claim-list">
          <div class="item">
            <img src="/assets/images/insu/icon-check-blue.svg" alt="아이콘:약제비 청구 리스트" />
            <div class="text">병원 발급 처방전</div>
          </div>
          <div class="item">
            <img src="/assets/images/insu/icon-check-blue.svg" alt="아이콘:약제비 청구 리스트" />
            <div class="text">약국 발급 약제비 영수증(약봉투)</div>
          </div>
        </div>
      </div>
    </template>
  </BottomModal>
  
  <ConfirmModal
    :is-visible="isShowConfirmModal"
    title="안내"
    :html="confirmModalContent"
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    :is-show-footer="false"
    @close="isShowConfirmModal = false"
  />
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import RadioImg from '~/components/publishing/input/radioImg.vue'
import iconId from '~/assets/images/insu/icon-id.svg'
import iconFamily from '~/assets/images/insu/icon-family.svg'

// 체크박스 상태 관리
const isMyHospital = ref(false)

const isShowBottomModal = ref(false)
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}
const isShowConfirmModal = ref(false)
const confirmModalContent = ref('')

const clickConfirmModal = async () => {
  confirmModalContent.value = `
    <div style="display: flex; flex-direction: column; text-align: center">
      <div>
        <i class="ri-information-line"></i>
      </div>
      <div style="font-weight: bold;font-size: var(--num-16);text-align: left;">고려대학병원은 서류없이 청구가 가능해요.</div>
      <div style="font-weight: 400;font-size: var(--num-16);text-align: left;color: #555555;margin-top:0.8rem;">진료내역을 선택해 간편히 청구하시겠어요?</div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:0.8rem;">
        <button type="button" class="c-btn btn-secondary" style="height: 4.8rem; background-color: #E8E8E8; border-radius: 0.6rem; font-size: 1.6rem; font-weight: bold; display: inline-flex; justify-content: center; align-items: center; width: 100%; line-height: 1.5; color: #555555; border: none; cursor: pointer; margin-top: 2rem;">
          <span class="text">사진찍어 청구</span>
        </button>
        <button type="button" class="c-btn btn-primary" style="height: 4.8rem; background-color: rgb(76, 127, 247); border-radius: 0.6rem; font-size: 1.6rem; font-weight: bold; display: inline-flex; justify-content: center; align-items: center; width: 100%; line-height: 1.5; color: white; border: none; cursor: pointer; margin-top: 2rem;">
          <span class="text">서류없이 청구</span>
        </button>
      </div>
    </div>`
  
  isShowConfirmModal.value = true
}

const clickCancel = () => {
  console.log('취소 버튼 클릭')
}
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
.c-tit {
  display: flex;
  justify-content: space-between;
}
.search-hospital {
  margin-top: 4rem;
}
.wrap-recent-searches,
.wrap-claim-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.1rem 0;
  .text {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 140%;
    color: #2B2B2B;
  }
}
.wrap-claim-type {
  justify-content: flex-end;
  gap: 1.2rem;
}
.wrap-hospitals {
  border-top: 0.1rem solid #EEEEEE;
  margin: 0 -2rem;
  padding: 0 2rem;
  .item {
    padding: 2rem 0; 
    display: flex;
    align-items: center;
    gap: 1.6rem;
    width: 100%;
    &:not(:first-child) {
      border-top: 0.1rem solid #EEEEEE;
    }
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
        text-align: left;
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
          &.my {
            background-color: #4C7FF7;
            color: #fff;
          }
        }
      }
    }
    .icon-cancel {
      padding: 0.4rem;
      flex-shrink: 0;
      background-color: transparent;
      border: none;
      cursor: pointer;
      img {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
}
.wrap-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 18.4rem 0;
  .img {
    width: 6rem;
    height: 6rem;
  }
  .tit {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.4;
    color: #555;
  }
  .sub-tit {
    margin-top: 0.8rem;
    font-size: 1.6rem;
    color: #555;
  }
}
.wrap-radio-btn {
  margin-top: 1.6rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
}
.wrap-claim-info {
  margin-top: 2.4rem;
  padding: 2rem;
  background-color: #F4F4F4;
  border-radius: 1.2rem;
  .claim-info-text {
    font-weight: 700;
    text-align: left;
  }
  .claim-list {
    margin-top: 1.7rem;
    .item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      &:not(:first-child) {
        margin-top: 0.8rem;
      }
      img {
        width: 1.8rem;
      }
      .text {
        font-weight: 500;
        color: #555555;
      }
    }
  }
}
</style>
