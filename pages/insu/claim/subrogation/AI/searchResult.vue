<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI분석 숨은 보상금 찾기"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    style="background-color: #f4f4f4"
    class="pb-60"
  >
    <div class="">
      <div class="mt-24">
        <h1 class="c-tit">
          <span class="text">
            AI분석을 통해<br />
            숨은 보상금을 찾아보세요
          </span>
        </h1>
        <div class="c-tit-sub align-end">
          MY병원의 최근 3년간 통원/입원 진료내역으로<br />AI가 추가 보상금 수령 가능성 유무를 분석해요.
          <div class="icon mb-3" @click="toggleTooltip">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 10.5V6.75M10 13.2795V13.3125M17.5 10.5C17.5 14.6421 14.1421 18 10 18C5.85786 18 2.5 14.6421 2.5 10.5C2.5 6.35786 5.85786 3 10 3C14.1421 3 17.5 6.35786 17.5 10.5Z"
                stroke="#555555"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div v-show="isTooltipOpen" class="tooltip">
              <button type="button" class="c-tooltip-close-btn" aria-label="닫기" @click.stop="closeTooltip"></button>
              <div class="text">진료 내역을 업데이트해서 최근 진료 내역을 가져올 수 있어요.</div>
            </div>
          </div>
        </div>
      </div>

      <div class="wrap-recent-searches">
        <div class="text">총 <strong>4</strong>건을 찾았어요.</div>
        <button class="btn-reload">
          <i class="icon ico-reload"></i>
          <span class="date">2025.04.11 12:12</span>
        </button>
      </div>

      <div class="wrap-result-lists">
        <div class="item">
          <div class="item-header">
            <div class="wrap-hospital">
              <img src="/assets/images/insu/logo_KUMedicine.svg" alt="경북대학교병원" />
              <div class="wrap-hospital-info">
                <div class="name">경북대학교병원</div>
                <Button
                  btn-type="primary"
                  element-type="button"
                  aria-label="분석하기"
                  class="xs ml-auto"
                  :width="7.8"
                  @click="clickAgree"
                />
              </div>
            </div>
          </div>
          <div class="detail-lists">
            <div class="detail-item has-link">
              <div class="tit">진료내역</div>
              <button type="button" class="icon-arrow-right" @click="toggleFullModal"></button>
            </div>
            <div class="detail-item">
              <div class="tit">총 진료내역</div>
              <div class="price">3건</div>
            </div>
            <div class="detail-item">
              <div class="tit">숨은 보상금 찾기 가능한 내역</div>
              <div class="price">2건</div>
            </div>
            <div class="detail-item has-link">
              <div class="tit">최근 신청결과</div>
              <button type="button" class="icon-arrow-right"></button>
            </div>
            <div class="detail-item">
              <div class="tit">신청일시</div>
              <div class="price">2025.04.15 12:12</div>
            </div>
            <div class="detail-item">
              <div class="tit">AI 분석결과</div>
              <CommonBadge :color="'blue'">숨은 보상금 수령가능</CommonBadge>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-header">
            <div class="wrap-hospital">
              <img src="/assets/images/insu/logo_KUMedicine.svg" alt="경북대학교병원" />
              <div class="wrap-hospital-info">
                <div class="name">경북대학교병원</div>
                <Button
                  btn-type="primary"
                  element-type="button"
                  aria-label="분석하기"
                  class="xs ml-auto"
                  :width="7.8"
                />
              </div>
            </div>
          </div>
          <div class="detail-lists">
            <div class="detail-item has-link">
              <div class="tit">진료내역</div>
              <button type="button" class="icon-arrow-right"></button>
            </div>
            <div class="detail-item">
              <div class="tit">총 진료내역</div>
              <div class="price">3건</div>
            </div>
            <div class="detail-item">
              <div class="tit">숨은 보상금 찾기 가능한 내역</div>
              <div class="price">2건</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-header">
            <div class="wrap-hospital">
              <img src="/assets/images/insu/logo_KUMedicine.svg" alt="경북대학교병원" />
              <div class="wrap-hospital-info">
                <div class="name">경북대학교병원</div>
                <Button
                  btn-type="primary"
                  element-type="button"
                  aria-label="분석하기"
                  class="xs ml-auto"
                  :width="7.8"
                />
              </div>
            </div>
          </div>
          <div class="detail-lists">
            <div class="detail-item has-link">
              <div class="tit">진료내역</div>
              <button type="button" class="icon-arrow-right"></button>
            </div>
            <div class="detail-item">
              <div class="tit">총 진료내역</div>
              <div class="price">3건</div>
            </div>
            <div class="detail-item">
              <div class="tit">숨은 보상금 찾기 가능한 내역</div>
              <div class="price">2건</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ToDo: 진료내역이 없을때 활성화 -->
    <!-- 
    <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
      <div class="tit">
        <span>숨은 보상금 찾기<br />신청 가능한 진료내역이 없어요.</span>
        <p>진료내역을 업데이트 <br />해서 최근 진료내역을 가져올 수 있어요.</p>
      </div>

      <Button btn-type="line" element-type="button" aria-label="진료내역 다시 가져오기" class="xs" :width="15.4" />
    </div>
     -->
    <!-- 진료내역 확인 풀모달 -->
    <FullModal
      :is-visible="isShowFullModal"
      v-bind="fullModalProps"
      @confirm="clickFullConfirm"
      @close="toggleFullModal"
    >
      <template #content>
        <div class="medical-info">
          <div class="medical-info-head">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
            <div class="wrap-hospital">
              <div class="text">경북대학교병원</div>
            </div>
          </div>
        </div>
        <hr class="hr-section mt-32 mb-0 ml-n20 mr-n20" style="flex-shrink: 0" />
        <div class="wrap-recent-searches mg-0 pd-20">
          <div class="text">총 진료내역<strong>&nbsp;4</strong>건</div>
        </div>
        <div class="medical-history-wrap">
          <div class="history-item">
            <div class="badge-box">
              <CommonBadge :color="'yellow'">통원</CommonBadge>
            </div>
            <dl>
              <dt>진료일</dt>
              <dd>2025. 01. 20 ~ 2025. 05. 30</dd>
            </dl>
            <dl>
              <dt>진료과</dt>
              <dd>영상의학과</dd>
            </dl>
            <dl>
              <dt>입원비</dt>
              <dd>123,456원</dd>
            </dl>
          </div>
          <div class="history-item">
            <div class="badge-box">
              <CommonBadge :color="'cobalt'" :variant="'solid'">AI분석 신청가능</CommonBadge>
              <CommonBadge :color="'yellow'">통원</CommonBadge>
            </div>
            <dl>
              <dt>진료일</dt>
              <dd>2025. 01. 20 ~ 2025. 05. 30</dd>
            </dl>
            <dl>
              <dt>진료과</dt>
              <dd>영상의학과</dd>
            </dl>
            <dl>
              <dt>입원비</dt>
              <dd>123,456원</dd>
            </dl>
          </div>
          <div class="history-item">
            <div class="badge-box">
              <CommonBadge :color="'cobalt'" :variant="'solid'">AI분석 신청가능</CommonBadge>
              <CommonBadge :color="'green'">입원</CommonBadge>
            </div>
            <dl>
              <dt>진료일</dt>
              <dd>2025. 01. 20 ~ 2025. 05. 30</dd>
            </dl>
            <dl>
              <dt>진료과</dt>
              <dd>영상의학과</dd>
            </dl>
            <dl>
              <dt>입원비</dt>
              <dd>123,456원</dd>
            </dl>
          </div>
          <div class="history-item">
            <div class="badge-box">
              <CommonBadge :color="'cobalt'" :variant="'solid'">AI분석 신청가능</CommonBadge>
              <CommonBadge :color="'green'">입원</CommonBadge>
            </div>
            <dl>
              <dt>진료일</dt>
              <dd>2025. 01. 20 ~ 2025. 05. 30</dd>
            </dl>
            <dl>
              <dt>진료과</dt>
              <dd>영상의학과</dd>
            </dl>
            <dl>
              <dt>입원비</dt>
              <dd>123,456원</dd>
            </dl>
          </div>
        </div>
      </template>
    </FullModal>

    <BottomModal
      :is-visible="isShowAgreeModal"
      title="약관동의"
      :is-show-cancel-button="false"
      confirm-button-text="동의하고 다음"
      :disabled-confirm-button="!checkbox1"
      @close="isShowAgreeModal = false"
      @confirm="clickNext"
    >
      <template #content>
        <div class="wrap-agree">
          <div class="wrap-company">
            <div class="agree-tit">
              AI분석 숨은 보상금을 찾아보고<br />
              전문가 무료상담을 위해 동의가 필요해요
              <p>숨은 보상금이 얼마인지 알아보고 내 보험의 부족한 보장 내용과 적정 보험료도 확인할 수 있어요.</p>
            </div>
          </div>
          <div class="wrap-agree-check">
            <Checkbox
              id="checkBox1"
              v-model="checkbox1"
              custom-style="button agree-all"
              aria-label="전체동의"
              @update:model-value="handleAgreeAllChange"
            />
            <ul class="agree-list">
              <li class="item" @click="showDetailTerm1">
                <Checkbox
                  id="checkBox2"
                  v-model="checkbox2"
                  custom-style="small non-border"
                  aria-label="[필수] 민감정보(진료정보) 제3자 제공 동의"
                />
                <i class="icon-arrow-right"></i>
              </li>
              <li class="item" @click="showDetailTerm2">
                <Checkbox
                  id="checkBox3"
                  v-model="checkbox3"
                  custom-style="small non-border"
                  aria-label="[필수] 개인정보 제3자 제공 동의"
                />
                <i class="icon-arrow-right"></i>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </BottomModal>

    <FullModal
      :is-visible="isShowDetailTerm1"
      title="[필수] 민감정보(진료정보) 제3자 제공 동의"
      :is-show-cancel-button="false"
      confirm-button-text="동의하기"
      @close="isShowDetailTerm1 = false"
      @confirm="clickAgreeTerm1"
    >
      <template #content>
        <div class="wrap-agree-detail flex flex-col gap-10 pb-48">
          <p class="agree-txt-box fz-14 flex flex-col gap-2">
            주식회사 레몬헬스케어는 개인정보보호법, 정보통신망법 및 신용 정보법에 따라 귀하의 민감정보(진료정보)를
            제3자에게 제공하고자 합니다. 귀하는 “민감정보(진료정보) 제3자 제공 동의(AI분석 신청)” 약관에 동의하지 않을
            경우 권리가 있습니다. 그러나 동의하지 않으실 경우 “서비스”를 이용할 수 없습니다.
          </p>
          <dl>
            <dt>민감정보(진료정보)를 제공받는 자</dt>
            <dd>(주)에이엘아이</dd>
          </dl>
          <dl>
            <dt>민감정보(진료정보) 제공 목적</dt>
            <dd>청구의신 AI 추천 숨은 보상금 찾기 서비스 이용</dd>
            <dd>가명, 익명화를 통한 통계정보 등의 기록보존을 위한 공익 목적</dd>
          </dl>
        </div>
      </template>
    </FullModal>

    <FullModal
      :is-visible="isShowDetailTerm2"
      title="개인정보 제3자 제공 동의"
      :is-show-cancel-button="false"
      confirm-button-text="동의하기"
      @close="isShowDetailTerm2 = false"
      @confirm="clickAgreeTerm2"
    >
      <template #content>
        <div class="wrap-agree-detail flex flex-col gap-10 pb-48">
          <dl>
            <dt>제공받는 자</dt>
            <dd>청구의신과 제휴된 법인 보험 대리점</dd>
          </dl>
          <dl>
            <dt>제공 목적</dt>
            <dd>AI 분석 숨은 보상금 수령 전화/대면 상담을 위한 정보 제공</dd>
          </dl>
          <dl>
            <dt>제공 항목</dt>
            <dd>
              이름, 연락처, 생년월일, 주거지역, 개인정보이용기간, 정보제공동의일, 보험계약정보, 보장정보, 실손보험청구
              통계정보
            </dd>
          </dl>
          <dl>
            <dt>보관기간</dt>
            <dd>정보제공 동의일로부터 2년까지</dd>
          </dl>
        </div>
      </template>
    </FullModal>
  </BaseBody>
</template>

<script setup lang="ts">
import FullModal from '~/components/common/modal/FullModal.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import Checkbox from '~/components/publishing/input/check.vue'

const checkbox1 = ref(false)
const checkbox2 = ref(false)
const checkbox3 = ref(false)

const handleAgreeAllChange = (newValue: boolean) => {
  checkbox2.value = newValue
  checkbox3.value = newValue
}
watch([checkbox2, checkbox3], ([newCheckbox2, newCheckbox3]) => {
  if (newCheckbox2 && newCheckbox3) {
    checkbox1.value = true
  } else {
    checkbox1.value = false
  }
})
const isTooltipOpen = ref(false)
const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value
}
const closeTooltip = () => {
  isTooltipOpen.value = false
}
const isShowFullModal = ref(false)
const fullModalProps = ref({
  title: '',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const toggleFullModal = () => {
  isShowFullModal.value = !isShowFullModal.value
}
const clickFullConfirm = () => {
  toggleFullModal()
}

const isShowAgreeModal = ref(false)
const isShowDetailTerm1 = ref(false)
const isShowDetailTerm2 = ref(false)

const clickAgree = () => {
  isShowAgreeModal.value = !isShowAgreeModal.value
  checkbox1.value = false
  checkbox2.value = false
  checkbox3.value = false
}

const showDetailTerm1 = () => {
  isShowDetailTerm1.value = !isShowDetailTerm1.value
}

const showDetailTerm2 = () => {
  isShowDetailTerm2.value = !isShowDetailTerm2.value
}

const clickAgreeTerm1 = () => {
  isShowDetailTerm1.value = !isShowDetailTerm1.value
  checkbox2.value = true
}
const clickAgreeTerm2 = () => {
  isShowDetailTerm2.value = !isShowDetailTerm2.value
  checkbox3.value = true
}
const clickNext = () => {
  // 무료 상담신청으로 이동
  return navigateTo('/insu/claim/subrogation/AI/freeConsultingRequest')
}
</script>

<style scoped lang="scss">
.wrap-recent-searches {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4rem -2rem 2rem;
  padding: 1.4rem 2rem;
  background-color: #fff;
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
}
.btn-reload {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.6rem;
  background: #fff;
  border-radius: 1.8rem;
  border: 0.1rem solid #e2e2e2;
  .ico-reload {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M14.5666 6.01042C13.5241 4.21079 11.5757 3 9.34409 3C6.81385 3 4.64765 4.55651 3.75325 6.76302M12.7355 6.76302H15.75V3.7526M4.1834 12.0313C5.22586 13.8309 7.1743 15.0417 9.40591 15.0417C11.9362 15.0417 14.1024 13.4852 14.9968 11.2786M6.01455 11.2786H3V14.2891' stroke='%23555555' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      no-repeat center center;
    background-size: contain;
    width: 1.8rem;
    height: 1.8rem;
    display: block;
  }
  .date {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    color: #555;
  }
}
.wrap-result-lists {
  background-color: #f4f4f4;
  .item {
    border-radius: 1.2rem;
    background-color: #fff;
    padding: 2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item-header {
      @include mixin.flex-container(justify-between items-center);
      .wrap-hospital {
        width: 100%;
        @include mixin.flex-container(items-center);
        gap: 1.6rem;
        img {
          width: 4.8rem;
          height: 4.8rem;
          flex-shrink: 0;
        }
        .wrap-hospital-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          .name {
            font-weight: 700;
          }
          .wrap-info {
            @include mixin.flex-container(items-center);
            gap: 1.2rem;
            .item-info {
              font-size: 1.4rem;
              color: #555555;
              position: relative;
              &:not(:first-child)::before {
                content: '';
                display: inline-block;
                width: 0.1rem;
                height: 1.2rem;
                background-color: #e2e2e2;
                position: absolute;
                top: 50%;
                left: -0.6rem;
                transform: translateY(-50%);
              }
            }
          }
        }
      }
    }
    .detail-lists {
      margin-top: 1.6rem;
      .detail-item {
        &.has-link {
          .tit {
            font-size: 1.4rem;
            font-weight: 700;
            line-height: 2rem;
            color: #2b2b2b;
          }
          & + .detail-item {
            margin-top: 1.6rem;
          }
        }
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        & + .has-link {
          margin-top: 2.4rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .price {
          font-size: 1.4rem;
          font-weight: 600;
          strong {
            font-size: 1.6rem;
            font-weight: 700;
          }
        }
      }
    }
  }
}
.icon-arrow-right {
  position: relative;
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
  background-size: 100%;
  @include mixin.rippleEffectPrimary;
}
.wrap-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 18.4rem 0;
  text-align: center;
  color: #555;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.5rem;
    p {
      margin-top: 0.8rem;
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.2rem;
    }
  }
}
.medical-info {
  width: 100%;
  margin-top: -2rem;
  padding: 1.2rem 2rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  .medical-info-head {
    display: flex;
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
        text-align: left;
        flex: 1;
        min-width: 0;
        font-weight: 700;
        @include mixin.ellipsis;
      }
    }
  }
}
.medical-history-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.2rem;
  margin: 0 -2rem -2rem -2rem;
  padding: 2rem;
  background: #f4f4f4;
  .history-item {
    padding: 1.6rem 2rem;
    background: #fff;
    border-radius: 1.2rem;
    .badge-box {
      display: flex;
      margin-bottom: 1.6rem;
      gap: 0.4rem;
    }
    dl {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.8rem;
      &:first-child {
        margin-top: 0;
      }
    }
    dt {
      font-size: 13px;
      font-weight: 500;
      line-height: 1.8rem;
      color: var(--Semantic-Text-Body-03, #959595);
    }
    dd {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
    }
  }
}
.wrap-agree-detail {
  text-align: left;
  dl {
    margin-top: 0.8rem;
    font-size: 1.4rem;
    dt {
      position: relative;
      font-weight: 600;
      padding-left: 0.8rem;
      &::before {
        content: '';
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        background-color: #959595;
        position: absolute;
        top: 50%;
        left: 0rem;
        transform: translateY(-50%);
        border-radius: 50%;
      }
    }
    dd {
      position: relative;
      margin-left: 0.8rem;
      padding-left: 0.8rem;
      &::before {
        content: '-';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 0rem;
        transform: translateY(-50%);
      }
    }
  }
}
.wrap-agree {
  .wrap-company {
    padding: 0 0.4rem;
    display: flex;
    gap: 1.6rem;
    text-align: left;
    .agree-tit {
      font-size: 1.8rem;
      font-weight: 700;
      p {
        margin-top: 0.8rem;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 2.2rem;
        color: #555;
      }
    }
  }
  .wrap-agree-check {
    margin-top: 1.2rem;
    .agree-all {
      width: 100%;
    }
    .agree-list {
      padding: 1.2rem 1.6rem;
      .item {
        padding: 0.8rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-arrow-right {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
          background-size: 100%;
        }
      }
    }
  }
}
</style>
