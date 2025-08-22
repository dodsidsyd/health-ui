<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI분석 숨은 보상금 찾기 결과"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <div class="wrap-completed-main">
      <!-- ToDo: 상태에 따라 이미지 변경 -->
      <img src="/assets/images/insu/img-completed-02.png" alt="전송완료" />
      <!-- <img src="/assets/images/insu/img-completed-03.png" alt="전송실패" /> -->
      <h1 class="c-tit">
        <span class="text"> 축하드려요! </span>
        <!-- <span class="text">아쉬워요!</span> -->
      </h1>
      <div class="c-tit-sub">신청한 진료내역에서<br />숨은 보상금을 받을 <span>가능성이 매우 높아요.</span></div>
      <!-- <div class="c-tit-sub">신청한 고려대구로병원 진료내역에서<br />숨은 보상금을 받을 <span>가능성이 없어요.</span></div> -->
      <div class="medical-info">
        <div class="medical-info-head">
          <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
          <div class="wrap-hospital">
            <div class="text">경북대학교병원</div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap-count">
      <div class="text">신청 진료내역 <strong>2</strong>건</div>
    </div>
    <div class="wrap-medical-history-lists">
      <div v-for="(history, index) in medicalHistories" :key="index" class="item">
        <div class="item-body">
          <div class="item-tit">
            <div class="name">{{ history.department }}</div>
            <div class="date">{{ history.date }}</div>
          </div>
          <div class="wrap-label">
            <label
              for=""
              class="h-label"
              :class="{ admission: history.type === '입원', visit: history.type === '통원' }"
              >{{ history.type }}</label
            >
            <label for="" class="h-label" :class="{ able: history.status === '수령가능' }"
              >숨은 보상금 {{ history.status }}</label
            >
          </div>
        </div>
        <div class="wrap-detail-lists" :class="{ show: detailVisibleStates[index] }">
          <div v-for="(detail, detailIndex) in history.details" :key="detailIndex" class="detail-item">
            <div class="item-tit">
              <div class="name">{{ detail.name }}</div>
              <div class="desc">{{ detail.desc }}</div>
            </div>
            <label class="label" :class="{ able: detail.label === '보상금 수령가능' }">{{ detail.label }}</label>
          </div>
        </div>
        <div class="btn-detail" @click="toggleDetail(index)">
          <div class="text">{{ detailVisibleStates[index] ? '내역접기' : '내역보기' }}</div>
          <i class="icon-arrow-down" :class="{ rotated: detailVisibleStates[index] }"></i>
        </div>
      </div>
    </div>

    <div class="wrap-info-lists">
      <div class="item">숨은 보상금 수령을 위하여 보상관련 전문 상담사에게 무료로 상담받을 수 있어요.</div>
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="확인"
        class="lg w-full medium btn-sticky"
        @click="clickToResult"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

import { ref, computed } from 'vue'

// 진료 내역 데이터
const medicalHistories = ref([
  {
    department: '영상의학과',
    date: '2021.07.05',
    type: '입원',
    status: '수령가능',
    details: [
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령가능' },
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령불가' }
    ]
  },
  {
    department: '영상의학과',
    date: '2021.07.05',
    type: '통원',
    status: '수령가능',
    details: [
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령가능' },
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령불가' }
    ]
  },
  {
    department: '영상의학과',
    date: '2021.07.05',
    type: '입원',
    status: '수령불가',
    details: [
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령가능' },
      { name: 'DB손해보험', desc: '무배당카데이션하나로보험', label: '보상금 수령불가' }
    ]
  }
])

// 초기 아코디언 모두 닫힘 상태
const detailVisibleStates = ref(medicalHistories.value.map(() => false))

// 아코디언 토글 함수
const toggleDetail = (index: number) => {
  detailVisibleStates.value[index] = !detailVisibleStates.value[index]
}
const clickToResult = () => {
  // 결과 페이지로 이동
  return navigateTo('/insu/claim/subrogation/AI/findConpensationResult')
}
</script>

<style scoped lang="scss">
.c-tit-sub {
  display: block;
  text-align: center;
  span {
    color: var(--blue-primary);
  }
}
.wrap-completed-main {
  margin-top: 5.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img-status {
    width: 9.6rem;
  }
  .c-tit {
    margin-top: 0.8rem;
    .text {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 130%;
    }
  }
}
.wrap-count {
  margin: 4rem -2rem 0;
  padding: 2.1rem 2rem;
  border-top: 0.1rem solid #eeeeee;
  @include mixin.flex-container(justify-between items-center);
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
}

.wrap-medical-history-lists {
  background-color: #f4f4f4;
  margin: 0 -2rem;
  padding: 2rem;
  .item {
    border-radius: 1.2rem;
    background-color: #fff;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item-body {
      padding: 2rem 2rem 1.6rem;
      .item-tit {
        @include mixin.flex-container(justify-between items-center);
        .name {
          font-weight: 700;
        }
        .date {
          font-size: 1.4rem;
          color: #555555;
        }
      }
      .wrap-label {
        margin-top: 0.4rem;
        @include mixin.flex-container(items-center);
        gap: 0.4rem;
        .h-label {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 130%;
          color: #555555;
          background-color: #eeeeee;
          &.able {
            background-color: #e5edff;
            color: #4c7ff7;
          }
          &.visit {
            background-color: #fef4cc;
            color: #8d7000;
          }
          &.admission {
            background-color: #eaf2cc;
            color: #506a1d;
          }
        }
      }
    }
    .wrap-detail-lists {
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      max-height: 0;
      &.show {
        max-height: 50rem;
        transition: max-height 0.3s ease-in-out;
      }
      .detail-item {
        @include mixin.flex-container(justify-between items-center);
        border-radius: 1.2rem;
        background-color: #f4f4f4;
        padding: 2rem;
        margin: 0 2rem 1.6rem;
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .item-tit {
          .name {
            font-size: 1.4rem;
            font-weight: 600;
            color: #555555;
          }
          .desc {
            margin-top: 0.1rem;
            font-size: 1.3rem;
            color: #959595;
          }
        }
        .label {
          padding: 0.3rem 0.6rem;
          color: #fff;
          border-radius: 0.4rem;
          background-color: #919191;
          font-size: 1.2rem;
          font-weight: 500;
          color: #fff;
          &.able {
            background-color: #5782e7;
          }
        }
      }
    }
    .btn-detail {
      border-top: 0.1rem solid #eeeeee;
      padding: 1.7rem 0;
      @include mixin.flex-container(justify-center items-center);
      gap: 0.2rem;
      .icon-arrow-down {
        width: 2rem;
        height: 2rem;
        background-image: url('/assets/images/insu/icon-arrow-down.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        &.rotated {
          transform: rotate(180deg);
        }
      }
    }
  }
}

.wrap-info-lists {
  margin-top: 1.6rem;
  margin-bottom: 5rem;
  .item {
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    margin-top: 0.8rem;
    & > span {
      color: #4c7ff7;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
}

.medical-info {
  width: 100%;
  margin-top: 2.5rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  padding: 1.2rem 2rem;
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
        flex: 1;
        min-width: 0;
        font-weight: 700;
        @include mixin.ellipsis;
      }
      .label {
        display: inline-block;
        padding: 0.3rem 0.6rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        // 통원
        &.out {
          background-color: #fef4cc;
          color: #8d7000;
        }
        // 입원
        &.in {
          background-color: #ffe7e7;
          color: #ca2828;
        }
        &.price {
          background-color: #eeeeee;
          color: #555555;
        }
      }
    }
    .count {
      flex: 0 0;
      font-size: 1.4rem;
      font-weight: 600;
      strong {
        margin-right: 0.3rem;
        color: #4c7ff7;
      }
    }
  }
}
</style>
