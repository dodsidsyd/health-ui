<template>
  <BaseBody
    :show-back-button="true"
    page-title="내 보험 정보"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <h2 class="tit">내 보험</h2>
    <div class="wrap-main-insurance-status">
      <div class="wrap-info" @click="toggleMoreInfo">
        <div class="text">월 납입 보험료</div>
        <i class="icon ico-info"></i>
        <div class="wrap-more" :class="{ active: isMoreInfoActive }">
          <div class="text">
            정상 유지 중인 계약 보험 중 내가 보험 계약자로 매월 납입하는 보험료예요.(연납/3개월납/6회납 등의 상품,
            외화상품, 실효/만기/소멸/만료 등의 상품은 제외)
          </div>
          <i class="icon ico-cancel-white" @click.stop="closeMoreInfo"></i>
        </div>
      </div>
      <div class="wrap-status">
        <div class="price"><strong>300,398</strong>원</div>
        <button class="btn-reload">
          <i class="icon ico-reload"></i>
          <span class="date">2025.04.11 12:12</span>
        </button>
      </div>
      <button class="btn-c-insurance-count">
        <div class="wrap-insurance-text">
          <img src="/assets/images/insu/icon-insurance.svg" alt="아이콘 보험계약" />
          <span class="text"
            >총 보험계약 <strong>5건</strong> 중 정상계약 <strong>4건</strong
            ><i class="icon ico-info" @click.stop="toggleMoreInfo2"></i
          ></span>
          <div class="wrap-more-info" :class="{ active: isMoreInfo2Active }">
            <div class="text">
              조회가 안되는 보험이 있나요?<br />➀ 보험 가입자가 계약자 본인이 아닌 경우<br />➁ 계약 상태가 만기이며
              5년이 경과한 경우 보험 조회가 어려워요.
            </div>
            <i class="icon ico-cancel-white" @click.stop="closeMoreInfo2"></i>
          </div>
        </div>
        <img src="/assets/images/insu/icon-arrow-right-white.svg" alt="화살표" />
      </button>
    </div>
    <div class="total-claim">
      <div class="sort-insurance">
        <button class="item" @click="clickSort">전체<i class="icon-arrow-down"></i></button>
      </div>
    </div>
    <!-- ToDo: 조회할 보험 정보 없을때 활성화 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="아이콘:검색없음" />
      <div class="text">조회할 수 있는 보험 정보가 없어요</div>
      <Button btn-type="line" element-type="button" aria-label="버튼명" class="xs mt-16" :width="6.4" />
    </div> -->
    <div class="wrap-grey">
      <div class="wrap-insurance-list">
        <div class="wrap-insurance-item">
          <div class="item">
            <div class="item-desc">
              <img src="/assets/images/insu/logo_kbbank.svg" alt="KB은행" />
              <div class="wrap-desc">
                <div class="tit">KB손해보험</div>
                <div class="tit-sub">무배당 카테이션 하나로보험</div>
                <div class="wrap-label">
                  <label for="status" class="label blue">정상</label>
                  <label for="status" class="label">질병(건강)보험</label>
                </div>
              </div>
            </div>
            <i class="icon icon-arrow-right"></i>
          </div>
          <div class="wrap-price">
            <div class="text">매월</div>
            <div class="price">956,789원</div>
          </div>
        </div>
        <div class="wrap-insurance-item">
          <div class="item">
            <div class="item-desc">
              <img src="/assets/images/insu/logo-alert-db.png" alt="DB손해보험" />
              <div class="wrap-desc">
                <div class="tit">DB손해보험</div>
                <div class="tit-sub">무배당 카테이션 하나로보험</div>
                <div class="wrap-label">
                  <label for="status" class="label gray">만기</label>
                  <label for="status" class="label">종합보험</label>
                </div>
              </div>
            </div>
            <i class="icon icon-arrow-right"></i>
          </div>
          <div class="wrap-price">
            <div class="text">매월</div>
            <div class="price">956,789원</div>
          </div>
        </div>
        <div class="wrap-insurance-item">
          <div class="item">
            <div class="item-desc">
              <img src="/assets/images/insu/logo_kbbank.svg" alt="KB은행" />
              <div class="wrap-desc">
                <div class="tit">KB손해보험</div>
                <div class="tit-sub">무배당 카테이션 하나로보험</div>
                <div class="wrap-label">
                  <label for="status" class="label blue">정상</label>
                  <label for="status" class="label">질병(건강)보험</label>
                </div>
              </div>
            </div>
            <i class="icon icon-arrow-right"></i>
          </div>
          <div class="wrap-price">
            <div class="text">매월</div>
            <div class="price">956,789원</div>
          </div>
        </div>
      </div>
      <div class="wrap-alert-info">내 보험 정보 업데이트가 필요해요.</div>
    </div>
  </BaseBody>
  <BottomModal
    :is-visible="isShowSortModal"
    title="조회조건 설정"
    :is-show-cancel-button="false"
    confirm-button-text="확인"
    @close="isShowSortModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <div class="wrap-bottom-sort">
        <div class="text">복수 선택이 가능해요.</div>
        <div class="wrap-sort-check">
          <label class="checkbox-label" for="all">
            <input
              id="all"
              class="checkbox"
              type="checkbox"
              v-model="selectedFilters.all"
              @change="handleFilterChange"
            />
            <span class="text">전체</span>
          </label>
          <label class="checkbox-label" for="normal">
            <input
              id="normal"
              class="checkbox"
              type="checkbox"
              v-model="selectedFilters.normal"
              @change="() => handleIndividualFilterChange('normal')"
            />
            <span class="text">정상</span>
          </label>
          <label class="checkbox-label" for="expired">
            <input
              id="expired"
              class="checkbox"
              type="checkbox"
              v-model="selectedFilters.expired"
              @change="() => handleIndividualFilterChange('expired')"
            />
            <span class="text">실효</span>
          </label>
          <label class="checkbox-label" for="maturity">
            <input
              id="maturity"
              class="checkbox"
              type="checkbox"
              v-model="selectedFilters.maturity"
              @change="() => handleIndividualFilterChange('maturity')"
            />
            <span class="text">만기</span>
          </label>
          <label class="checkbox-label" for="extinct">
            <input
              id="extinct"
              class="checkbox"
              type="checkbox"
              v-model="selectedFilters.extinct"
              @change="() => handleIndividualFilterChange('extinct')"
            />
            <span class="text">소멸</span>
          </label>
          <label class="checkbox-label" for="cancel">
            <input
              id="cancel"
              class="checkbox"
              type="checkbox"
              v-model="selectedFilters.cancel"
              @change="() => handleIndividualFilterChange('cancel')"
            />
            <span class="text">해지</span>
          </label>
        </div>
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isMoreInfoActive = ref(false)
const isMoreInfo2Active = ref(false)
const isShowSortModal = ref(false)

// 필터 상태 관리
const selectedFilters = ref({
  all: false,
  normal: false,
  expired: false,
  maturity: false,
  extinct: false,
  cancel: false
})

// 필터 변경 핸들러
const handleFilterChange = () => {
  // 전체 선택 로직
  if (selectedFilters.value.all) {
    // 전체가 선택되면 다른 모든 옵션들도 선택
    selectedFilters.value.normal = true
    selectedFilters.value.expired = true
    selectedFilters.value.maturity = true
    selectedFilters.value.extinct = true
    selectedFilters.value.cancel = true
  } else {
    // 전체가 해제되면 다른 모든 옵션들도 해제
    selectedFilters.value.normal = false
    selectedFilters.value.expired = false
    selectedFilters.value.maturity = false
    selectedFilters.value.extinct = false
    selectedFilters.value.cancel = false
  }

  // 개별 옵션들이 모두 선택되면 전체도 선택
  if (
    selectedFilters.value.normal &&
    selectedFilters.value.expired &&
    selectedFilters.value.maturity &&
    selectedFilters.value.extinct &&
    selectedFilters.value.cancel
  ) {
    selectedFilters.value.all = true
  }

  // 개별 옵션 중 하나라도 해제되면 전체도 해제
  if (
    !selectedFilters.value.normal ||
    !selectedFilters.value.expired ||
    !selectedFilters.value.maturity ||
    !selectedFilters.value.extinct ||
    !selectedFilters.value.cancel
  ) {
    selectedFilters.value.all = false
  }
}

// 개별 필터 변경 핸들러
const handleIndividualFilterChange = (filterName: string) => {
  // 개별 옵션 변경 시 전체 상태 업데이트
  if (filterName !== 'all') {
    // 개별 옵션들이 모두 선택되면 전체도 선택
    if (
      selectedFilters.value.normal &&
      selectedFilters.value.expired &&
      selectedFilters.value.maturity &&
      selectedFilters.value.extinct &&
      selectedFilters.value.cancel
    ) {
      selectedFilters.value.all = true
    } else {
      selectedFilters.value.all = false
    }
  }
}

const clickSort = () => {
  isShowSortModal.value = !isShowSortModal.value
}
const clickNext = () => {
  // return navigateTo('/insu/')
}

// Toggle function
const toggleMoreInfo = () => {
  isMoreInfoActive.value = !isMoreInfoActive.value
}

// Close more info function
const closeMoreInfo = () => {
  isMoreInfoActive.value = false
}

// Toggle function for second info
const toggleMoreInfo2 = () => {
  isMoreInfo2Active.value = !isMoreInfo2Active.value
}

// Close more info function for second info
const closeMoreInfo2 = () => {
  isMoreInfo2Active.value = false
}
</script>
<style scoped lang="scss">
.wrap-bottom-sort {
  .text {
    font-size: 1.6rem;
    text-align: left;
  }
  .wrap-sort-check {
    margin-top: 1.6rem;
    background-color: #f4f4f4;
    border: 0.1rem solid #e2e2e2;
    border-radius: 0.8rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    position: relative;
    .checkbox-label {
      padding: 1.2rem;
      position: relative;
      border: 0.1rem solid transparent;
      margin: -0.05rem;
      &:has(.checkbox:checked) {
        border: 0.1rem solid #555555;
        background-color: #ffffff;
        z-index: 1;
      }
      // 모서리 border-radius 적용
      &:nth-child(1) {
        border-top-left-radius: 0.8rem;
      }
      &:nth-child(3) {
        border-top-right-radius: 0.8rem;
      }
      &:nth-child(4) {
        border-bottom-left-radius: 0.8rem;
      }
      &:nth-child(6) {
        border-bottom-right-radius: 0.8rem;
      }
      .text {
        font-size: 1.4rem;
        font-weight: 500;
      }
    }
  }
}
h2.tit {
  margin-top: 2.4rem;
  font-size: 1.8rem;
  font-weight: 700;
}
.wrap-main-insurance-status {
  position: relative;
  margin-top: 1.6rem;
  padding: 2.4rem 2rem 2rem;
  border-radius: 1.2rem;
  background-color: #4c7ff7;
  .wrap-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    .text {
      font-weight: 600;
      color: #ffffff;
    }
    .ico-info {
      background: url('/assets/images/insu/icon-info-white.svg') no-repeat center center;
      background-size: contain;
      width: 2rem;
      height: 2rem;
      display: block;
    }
    .wrap-more {
      width: 100%;
      border-radius: 0.8rem;
      background-color: #4f5561;
      padding: 2rem;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
      display: none;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.8rem;
      z-index: 1;
      &.active {
        display: flex;
      }
      .text {
        font-size: 1.4rem;
        color: #ffffff;
        word-break: keep-all;
        flex: 1 1;
      }
      .ico-cancel-white {
        background: url('/assets/images/insu/icon-cancel-white.svg') no-repeat center center;
        background-size: contain;
        width: 2rem;
        height: 2rem;
        display: block;
      }
    }
  }
  .wrap-status {
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price {
      font-size: 2.6rem;
      font-weight: 600;
      margin-left: 0.2rem;
      color: #ffffff;
      line-height: 130%;
      strong {
        font-weight: 700;
      }
    }
    .btn-reload {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background-color: #7099f9;
      border-radius: 1.4rem;
      padding: 0.6rem 1.2rem;
      .ico-reload {
        background: url('/assets/images/insu/icon-reloading-white.svg') no-repeat center center;
        background-size: contain;
        width: 1.6rem;
        height: 1.6rem;
        display: block;
      }
      .date {
        font-size: 1.2rem;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
  .btn-c-insurance-count {
    width: 100%;
    padding: 1.2rem 1.6rem;
    margin-top: 2rem;
    border-radius: 0.8rem;
    background-color: #4776e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .wrap-insurance-text {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        font-size: 1.4rem;
        color: #c9d9fd;
        strong {
          font-weight: 600;
          color: #ffffff;
        }
        .ico-info {
          margin-left: 0.6rem;
          background: url('/assets/images/insu/icon-info-white.svg') no-repeat center center;
          background-size: contain;
          width: 2rem;
          height: 2rem;
          display: inline-block;
        }
      }
      .wrap-more-info {
        position: absolute;
        z-index: 1;
        top: 80%;
        left: 50%;
        transform: translate(-50%, 0);
        width: 100%;
        background-color: #4f5561;
        padding: 2rem;
        border-radius: 0.8rem;
        display: none;
        &.active {
          display: flex;
        }
        .text {
          font-size: 1.4rem;
          color: #ffffff;
          word-break: keep-all;
          text-align: left;
          flex: 1 1;
        }
        .ico-cancel-white {
          background: url('/assets/images/insu/icon-cancel-white.svg') no-repeat center center;
          background-size: contain;
          width: 2rem;
          height: 2rem;
          display: block;
          cursor: pointer;
        }
      }
      img {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
}
// 전체(sort)
.total-claim {
  width: 100%;
  padding: 2.1rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .sort-insurance {
    .item {
      position: relative;
      padding: 0 1.2rem;
      font-weight: 500;
      color: #555555;
      i.icon-arrow-down {
        margin-left: 0.4rem;
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
        background-size: 100%;
        transition: transform 0.3s ease;
        transform-origin: center center;

        &.rotated {
          transform: rotate(180deg);
        }
      }
      &:not(:first-child) {
        &::before {
          content: '';
          width: 0.1rem;
          height: 1.2rem;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background-color: #e2e2e2;
        }
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
}

.wrap-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 20rem);
  img {
    width: 8rem;
    height: 8rem;
  }
  .text {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    color: #555555;
    text-align: center;
  }
}

.wrap-grey {
  position: relative;
  margin: 0 -2rem 0;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
}
.wrap-insurance-list {
  .wrap-insurance-item {
    border-radius: 1.2rem;
    background-color: #ffffff;
    padding: 2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.6rem;
      .item-desc {
        display: flex;
        align-items: center;
        gap: 1.6rem;
        .wrap-desc {
          .tit {
            font-size: 1.6rem;
            font-weight: 700;
            color: #555555;
          }
          .tit-sub {
            margin-top: 0.1rem;
            font-size: 1.4rem;
            font-weight: 400;
            color: #777777;
          }
          .wrap-label {
            margin-top: 0.4rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            label {
              padding: 0.3rem 0.6rem;
              font-size: 1.2rem;
              font-weight: 500;
              line-height: 130%;
              background-color: #eeeeee;
              color: #555555;
              border-radius: 0.4rem;
              &.blue {
                background-color: #5782e7;
                color: #ffffff;
              }
              &.gray {
                background-color: #919191;
                color: #ffffff;
              }
            }
          }
        }
      }
      .icon-arrow-right {
        display: inline-block;
        width: 2.4rem;
        height: 2.4rem;
        background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
        background-size: 100%;
      }
    }
    .wrap-price {
      margin-top: 1.6rem;
      background-color: #f4f4f4;
      border-radius: 1.2rem;
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.4rem;
      .text {
        font-size: 1.4rem;
        font-weight: 500;
        color: #555555;
      }
      .price {
        font-weight: 700;
      }
    }
  }
}
.wrap-alert-info {
  width: calc(100% - 4rem);
  position: absolute;
  bottom: 0;
  left: 2rem;
  padding: 1.5rem 2rem;
  background: var(--Semantic-Background-BG-Dimmed, #000000b2);
  border-radius: 1.2rem;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
}
</style>
