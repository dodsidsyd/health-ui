<template>
  <BaseBody
    :show-back-button="true"
    page-title="MY병원 / 보험사 관리"
    logo-type="text"
    :has-notification="false"
    :has-close-btn="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <LineTabs :tabs="tabs" />
    <div class="wrap-result" v-if="totalHospitalCount > 0">
      <div class="wrap-hospital-list">
        <div class="item" v-for="(hospital, index) in hospitals" :key="index">
          <img src="/assets/images/insu/logo_KUMedicine.svg" alt="병원로고" class="logo" />
          <div class="wrap-info">
            <div class="tit">{{ hospital.name }}</div>
          </div>
          <button class="btn-close">
            <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          </button>
        </div>
      </div>
    </div>
    <!-- ToDo: 저장된 보험사 없을때 활성화 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
      <div class="tit">MY보험으로 저장된 보험사가 없어요.</div>
      <div class="sut-tit">보험금 청구를 완료하시면<br />보험사가 표시되어요.</div>
    </div> -->
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

const activeLineTab = ref('accountInfo')
const tabs = ref<Tab[]>([
  { title: 'MY병원', to: '/insu/claim/auto/manageHospital' },
  { title: 'MY보험사', to: '/insu/claim/auto/manageInsurance' },
])
const isTooltipOpen = ref(false)

// 병원 데이터
const hospitals = ref([
  {
    name: '삼성화재',
    count: 1,
  },
  {
    name: '삼성화재',
    count: 1,
  },
  {
    name: '삼성화재',
    count: 1,
  },
  {
    name: '삼성화재',
    count: 1,
  }
])


const clickFindSelfHospitals = () => {
  // navigateTo('/insu/claim/findSelfHospitals')
}

const totalHospitalCount = computed(() => hospitals.value.reduce((total: number, hospital: any) => total + hospital.count, 0))


</script>

<style scoped lang="scss">
.wrap-result {
  .wrap-hospital-list {
    .item {
      padding: 1.6rem 0.4rem;
      display: flex;
      align-items: center;
      gap: 1.6rem;
      min-width: 0;
      &:not(:first-child) {
        border-top: 0.1rem solid #EEEEEE;
      }
      .logo {
        width: 4.8rem;
        height: 4.8rem;
        flex-shrink: 0;
      }
      .wrap-info {
        flex: 1 1 auto;
        min-width: 0;
        .tit {
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 150%;
          color: #2B2B2B;
          width: 100%;
          @include mixin.ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .btn-close {
        flex-shrink: 0;
      }
    }
  }
}
.wrap-empty {
  margin-top: 2rem;
  padding: 24rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%;
    color: #555555;
  }
  .sut-tit {
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 140%;
    color: #555;
    text-align: center;
  }
}
.wrap-radio-btn {
  margin-top: 1.6rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
}
</style>
