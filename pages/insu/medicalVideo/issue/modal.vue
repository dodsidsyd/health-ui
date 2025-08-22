<template>
  <BaseBody page-title="결제확인" :show-back-button="true" :has-notification="true">
    <div class="payment-confirmation">
      <span @click="clickAgree">약관동의 팝업 열림</span>
    </div>
    <BottomModal
      :is-visible="isShowAgreeModal"
      title="의료영상 발급 및 전송동의"
      :is-show-cancel-button="false"
      :is-show-close-button="true"
      confirm-button-text="다음"
      @close="isShowAgreeModal = false"
      @confirm="clickNext"
      :disabled-confirm-button="!isAllChecked"
    >
      <template #content>
        <div class="wrap-agree">
          <div class="wrap-agree-check">
            <Checkbox
              id="checkAll"
              v-model="checkAll"
              custom-style="button agree-all"
              aria-label="전체동의"
              @change="handleCheckAll"
            />
            <ul class="agree-list">
              <li class="item" @click="showDetailTerm">
                <Checkbox
                  id="checkBox1"
                  v-model="checkbox1"
                  custom-style="small non-border"
                  aria-label="수집 및 이용에 관한 사항"
                />
                <i class="icon-arrow-right"></i>
              </li>
              <li class="item" @click="showDetailTerm">
                <Checkbox
                  id="checkBox2"
                  v-model="checkbox2"
                  custom-style="small non-border"
                  aria-label="국내 제공에 관한 사항"
                />
                <i class="icon-arrow-right"></i>
              </li>
              <li class="item" @click="showDetailTerm">
                <Checkbox
                  id="checkBox3"
                  v-model="checkbox3"
                  custom-style="small non-border"
                  aria-label="조회에 관한 사항"
                />
                <i class="icon-arrow-right"></i>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </BottomModal>
    <FullModal
      :is-visible="isShowDetailTerm"
      title="동의서 약관명 입력"
      :is-show-cancel-button="false"
      :is-show-close-button="true"
      confirm-button-text="동의하기"
      @close="isShowDetailTerm = false"
      @confirm="clickAgreeTerm"
    >
      <template #content>
        <div class="wrap-agree-detail flex flex-col gap-10 pb-48">
          <div class="fz-14 semibold">1. 수집 · 이용에 관한 사항</div>
          <div class="agree-txt-box fz-14 flex flex-col gap-2">
            <div class="semibold">제1조(목적)</div>
            보험약관내용을 입력해주세요.
          </div>
          <div class="agree-txt-box fz-14 flex flex-col gap-2">
            <div class="semibold">제2조(용어의 정의)</div>
            본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            <ol class="num-type">
              <li>보험약관내용을 입력해주세요.</li>
              <li>보험약관내용을 입력해주세요.</li>
              <li>보험약관내용을 입력해주세요.</li>
            </ol>
          </div>
        </div>
      </template>
    </FullModal>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import BaseBody from '~/components/layout/BaseBody.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import FullModal from '~/components/common/modal/FullModal.vue'
import Checkbox from '~/components/publishing/input/check.vue'

const router = useRouter()
const isShowAgreeModal = ref(false)
const isShowDetailTerm = ref(false)

// checkbox 변수들 추가
const checkAll = ref(false)
const checkbox1 = ref(false)
const checkbox2 = ref(false)
const checkbox3 = ref(false)

const isAllChecked = computed(() => {
  return checkbox1.value && checkbox2.value && checkbox3.value
})

// 모든 체크박스가 체크되었을 때만 전체 선택 체크
watch([checkbox1, checkbox2, checkbox3], () => {
  checkAll.value = isAllChecked.value
})

const handleCheckAll = () => {
  checkbox1.value = checkAll.value
  checkbox2.value = checkAll.value
  checkbox3.value = checkAll.value
}

const clickAgree = () => {
  isShowAgreeModal.value = !isShowAgreeModal.value
}

const showDetailTerm = () => {
  isShowDetailTerm.value = !isShowDetailTerm.value
}

const clickAgreeTerm = () => {
  isShowDetailTerm.value = !isShowDetailTerm.value
}
const clickNext = () => {
  router.push('/insu/medicalVideo/issue/payment/success')
}
</script>

<style lang="scss" scoped>
.payment-confirmation {
  padding: 2rem 0;
}

.wrap-agree {
  .wrap-company {
    padding: 0 0.4rem;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    .logo {
      width: 5.6rem;
      height: auto;
    }
    .company {
      font-size: 1.6rem;
      font-weight: 700;
    }
    .agree-tit {
      text-align: left;
      font-size: 1.8rem;
      font-weight: 700;
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
// 약관 상세
.wrap-agree-detail {
  text-align: left;
  .agree-txt-box {
    ol.num-type {
      list-style: none;
      counter-reset: list-counter;
      padding-left: 0;
      margin: 0;

      li {
        counter-increment: list-counter;
        position: relative;
        padding-left: 2.4rem;
        margin-bottom: 0.8rem;
        line-height: 1.6;

        &::before {
          content: '(' counter(list-counter) ')';
          position: absolute;
          left: 0;
          top: 0;
          font-weight: 500;
          color: #333;
        }
      }
    }
  }
}
</style>
