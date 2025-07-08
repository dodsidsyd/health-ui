<template>
  <FullModal
    :is-visible="isShowFullModal"
    v-bind="fullModalProps"
    :confirm-button-text="'설정하기'"
    @close="closeModal"
  >
    <template #header>
      <div class="custom-modal-header">
        <strong class="c-modal-title">목표걸음수 설정</strong>
        <button type="button" class="icon c-modal-close-btn" aria-label="닫기" @click="closeModal">
          <i class="icon close"></i>
        </button>
      </div>
    </template>
    <template #content>
      <div class="step-goal-wrap">
        <div class="modal-tit">
          회원님의 건강프로필 정보로 <br />
          AI분석을 통해 최적의 목표걸음수을 <br />
          제시합니다.
        </div>
        <div class="sub-tit">
          건강프로필 설정으로 회원님의<br />
          현재의 건강상태를 알려주세요.
        </div>
        <div class="recommend-goal">
          <div class="step-recommend">
            <span class="tit">권장걸음수</span>
            <div class="txt"><strong class="setting-num">8,000</strong> 걸음/일</div>
          </div>

          <button type="button" class="c-btn setting-btn">건강프로필 설정</button>
        </div>
        <div class="recommend-info">
          <strong class="tit">권장걸음수란?</strong>
          권장걸음수는 연령대, 성별 기준으로 기본 권장걸음수를 산정하며, 건강프로필 정보를 설정하면 개인에 최적화된 권장
          걸음수를 제안합니다.
        </div>
      </div>

      <div class="select-goal-steps">
        <div class="tit"><strong>목표 걸음수</strong> 일일걸음 Dairy Steps</div>

        <RollSelectSteps class="mt-14" />

        <InfoStepsCalorie class="mt-16" />
      </div>
    </template>
  </FullModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FullModal from '~/components/common/modal/FullModal.vue'

import RollSelectSteps from '~/components/publishing/dashboard/RollSelectSteps.vue'
import InfoStepsCalorie from '~/components/publishing/dashboard/InfoStepsCalorie.vue'

// 모달 상태 관리
const isShowFullModal = ref(false)

// FullModal props
const fullModalProps = {
  showCloseButton: false // 커스텀 헤더를 사용하므로 기본 닫기 버튼 비활성화
}

// 모달 열기
const openModal = () => {
  isShowFullModal.value = true
}

// 모달 닫기
const closeModal = () => {
  isShowFullModal.value = false
}

// 외부에서 접근 가능하도록 메서드 노출
defineExpose({
  openModal,
  closeModal
})
</script>

<style scoped lang="scss">
// 커스텀 모달 헤더 스타일
.custom-modal-header {
  background: #e7f4ff;
  width: calc(100% + 4rem);
  display: flex;
  flex-direction: row;
  padding: 1.6rem 2rem;
  margin: -1.6rem -2rem;
}

.step-goal-wrap {
  padding: 0.8rem 2.4rem 2.4rem;
  margin: -2rem -2.4rem 0;
  background: #e7f4ff;
  .modal-tit {
    text-align: left;
    font-size: 2.2rem;
    font-weight: 700;
    color: #2b2b2b;
    margin-right: -2rem;
  }
  .sub-tit {
    text-align: left;
    margin-top: 1.2rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555;
  }

  .recommend-goal {
    background: #fff;
    margin-top: 1.6rem;
    border-radius: 1.2rem;
    padding: 1.9rem 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      display: block;
      right: 1rem;
      bottom: 6.2rem;
      width: 14.4rem;
      height: 10.8rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('~/assets/images/dashboard/img-goalStepShoe.svg');

      @media (max-width: 375px) {
        width: 10rem;
        height: 7.8rem;
        right: 0.4rem;
      }
    }
    .step-recommend {
      display: flex;
      flex-direction: column;
      .tit {
        font-size: 1.2rem;
        color: #555;
        text-align: left;
      }
      .txt {
        font-size: 1.2rem;
        display: inline-flex;
        gap: 0 0.4rem;
        align-items: center;
        color: #2b2b2b;
        .setting-num {
          font-weight: 700;
          font-size: 1.8rem;
        }
      }
    }
    .setting-btn {
      font-size: 1.2rem;
      font-weight: 500;
      color: #555;
      background: #fff;
      border: 0.1rem solid #e2e2e2;
      border-radius: 1.4rem;
      padding: 0.5rem 1.2rem;
      display: flex;
      line-height: 1.6rem;
      gap: 0 0.4rem;
      position: relative;
      @include mixin.rippleEffectPrimary;
      &::before {
        content: '';
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.11753 2.87751C8.83253 1.7075 7.16747 1.7075 6.88247 2.87751C6.83991 3.05333 6.75645 3.21661 6.63887 3.35408C6.5213 3.49155 6.37292 3.59931 6.20583 3.6686C6.03873 3.7379 5.85764 3.76676 5.67728 3.75284C5.49692 3.73893 5.3224 3.68263 5.16791 3.58852C4.13888 2.96152 2.96134 4.13903 3.58836 5.16805C3.99337 5.83256 3.63411 6.69957 2.87809 6.88333C1.7073 7.16758 1.7073 8.83336 2.87809 9.11686C3.05395 9.15947 3.21727 9.243 3.35474 9.36067C3.49221 9.47833 3.59994 9.6268 3.66917 9.79399C3.7384 9.96117 3.76716 10.1423 3.75312 10.3227C3.73908 10.5031 3.68263 10.6777 3.58836 10.8321C2.96134 11.8612 4.13888 13.0387 5.16791 12.4117C5.32237 12.3174 5.49691 12.2609 5.67732 12.2469C5.85772 12.2329 6.03889 12.2616 6.20608 12.3309C6.37326 12.4001 6.52174 12.5078 6.6394 12.6453C6.75707 12.7827 6.84061 12.9461 6.88322 13.1219C7.16747 14.2927 8.83328 14.2927 9.11679 13.1219C9.15953 12.9462 9.24315 12.783 9.36085 12.6456C9.47854 12.5082 9.62699 12.4005 9.79412 12.3313C9.96126 12.2621 10.1424 12.2333 10.3227 12.2473C10.5031 12.2613 10.6776 12.3176 10.8321 12.4117C11.8611 13.0387 13.0387 11.8612 12.4116 10.8321C12.3175 10.6776 12.2612 10.5031 12.2473 10.3228C12.2333 10.1424 12.2621 9.96132 12.3313 9.79419C12.4005 9.62706 12.5082 9.47861 12.6456 9.36092C12.7829 9.24323 12.9461 9.15961 13.1219 9.11686C14.2927 8.83261 14.2927 7.16683 13.1219 6.88333C12.946 6.84072 12.7827 6.75718 12.6453 6.63952C12.5078 6.52185 12.4001 6.37338 12.3308 6.2062C12.2616 6.03902 12.2328 5.85785 12.2469 5.67745C12.2609 5.49704 12.3174 5.32251 12.4116 5.16805C13.0387 4.13903 11.8611 2.96152 10.8321 3.58852C10.6776 3.68279 10.5031 3.73924 10.3227 3.75328C10.1423 3.76732 9.96111 3.73856 9.79392 3.66933C9.62674 3.6001 9.47826 3.49237 9.3606 3.3549C9.24293 3.21744 9.15939 3.05413 9.11679 2.87826L9.11753 2.87751Z' stroke='%23555555' stroke-width='1.2'/%3E%3Cpath d='M9.33333 8C9.33333 8.73638 8.73638 9.33333 8 9.33333C7.26362 9.33333 6.66667 8.73638 6.66667 8C6.66667 7.26362 7.26362 6.66667 8 6.66667C8.73638 6.66667 9.33333 7.26362 9.33333 8Z' stroke='%23555555' stroke-width='1.2'/%3E%3C/svg%3E");
      }
    }
  }
  .recommend-info {
    font-size: 1.2rem;
    font-weight: 500;
    color: #555;
    text-align: left;
    margin-top: 1.6rem;
    padding: 0 0.4rem;
    .tit {
      display: flex;
      margin-bottom: 0.6rem;
      gap: 0 0.4rem;
      &::before {
        content: '';
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M8 7.99997V4.99998M8 10.2236V10.25M14 4.24999L14 11.75C14 12.9926 12.9926 14 11.75 14H4.25C3.00736 14 2 12.9926 2 11.75V4.24999C2 3.00735 3.00736 2 4.25 2H11.75C12.9926 2 14 3.00735 14 4.24999Z' stroke='%232B2B2B' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
    }
  }
}

.select-goal-steps {
  text-align: left;
  padding-top: 2.4rem;
  .tit {
    font-size: 1.2rem;
    line-height: 2.2rem;
    font-weight: 500;
    color: #555;
    strong {
      font-size: 1.6rem;
      display: inline-block;
      margin-right: 0.4rem;
      color: #2b2b2b;
    }
  }
}
</style>
