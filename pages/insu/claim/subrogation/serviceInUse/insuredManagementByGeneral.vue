<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구/피보험자 관리"
    logo-type="text"
    :has-search="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span class='icon ico-edit'></span>"
  >
    <!-- ToDo: 편집 버튼 다른 곳에 넣으시고 삭제 -->
    <!-- <div @click="clickFullModal">피보험자 편집(버튼)</div> -->
    <h1 class="c-tit mt-24 mb-32">
      <span class="text"> 청구할 피보험자를 선택해 주세요 </span>
    </h1>
    <LineTabs :tabs="tabs" />
    <!-- ToDo: 고객정보가 없을때 -->
    <!-- <div class="wrap-empty">
      <img class="icon-empty" src="/assets/images/insu/subrogation/icon-empty-customer.png" alt="고객정보가 없습니다." />
      <div class="text-empty">고객 정보가 없어요.</div>
      <button class="btn-add-insure" @click="movePage">
        <i class="icon ico-plus"></i>
        나의 가족 / 제 3자 추가</button>
    </div> -->
    <div class="total-claim">
      <div class="total">총 <strong>3</strong>명</div>
      <div class="sort-insurance">
        <button class="item">전체</button>
        <button class="item" @click="isShowFilterModal = true">DB손해 <i class="icon-arrow-down"></i></button>
      </div>
    </div>

    <div class="wrap-customer-list">
      <div class="item">
        <div class="item-header">
          <div class="customer-info">
            <div class="name">김레몬</div>
            <div class="phone">010****5555</div>
          </div>
          <Button
            btn-type="primary"
            element-type="button"
            aria-label="청구하기"
            class="xs"
            icon="save-line"
            :width="6.8"
            @click="clickClaim"
          />
        </div>
        <div class="wrap-label">
          <label class="label-name" for="KB손해보험">KB손해보험</label>
          <label class="label-name" for="삼성화재">삼성화재</label>
        </div>
        <div class="memo">
          <span class="text"
            >메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모
            영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모
            영역입니다.</span
          >
        </div>
      </div>
      <div class="item">
        <div class="item-header">
          <div class="customer-info">
            <div class="name">
              <img class="icon-nagative" src="/assets/images/insu/subrogation/icon-nagative.png" alt="선택금지" />
              김레몬
            </div>
            <div class="phone">010****5555</div>
          </div>
          <Button
            btn-type="secondary"
            element-type="button"
            aria-label="서명요청"
            class="xs"
            icon="save-line"
            :width="6.8"
            @click="requestSign"
          />
        </div>
        <div class="wrap-label">
          <label class="label-name" for="KB손해보험">KB손해보험</label>
          <label class="label-name" for="삼성화재">삼성화재</label>
        </div>
        <div class="memo">
          <span class="text"
            >메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모
            영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모
            영역입니다.</span
          >
        </div>
      </div>
      <div class="item">
        <div class="item-header">
          <div class="customer-info">
            <div class="name">
              <img class="icon-nagative" src="/assets/images/insu/subrogation/icon-nagative.png" alt="선택금지" />
              김레몬
            </div>
            <div class="phone">010****5555</div>
          </div>
          <Button
            btn-type="primary"
            element-type="button"
            aria-label="서명대기"
            class="xs"
            icon="save-line"
            :width="6.8"
            disabled
          />
        </div>
        <div class="wrap-label">
          <label class="label-name" for="KB손해보험">KB손해보험</label>
          <label class="label-name" for="삼성화재">삼성화재</label>
        </div>
        <div class="memo">
          <span class="text"
            >메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모
            영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모
            영역입니다.</span
          >
        </div>
      </div>
      <button class="add-item" @click="movePage">
        <i class="icon ico-plus"></i>
        {{ selectedTab === 'customer' ? '고객 추가' : '나의 가족/제3자 추가' }}
      </button>
    </div>
  </BaseBody>

  <!-- 설계사 선택 모달 -->
  <BottomModal
    title="설계사를 선택해 주세요"
    :is-visible="isShowAgentModal"
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    @close="isShowAgentModal = false"
  >
    <template #content>
      <template style="display: flex; flex-direction: column; gap: 0.75rem">
        <button v-for="item in agentList" :key="item.id" class="c-btn outline" @click="selectAgent(item)">
          {{ item.label }}
        </button>
      </template>
    </template>
  </BottomModal>

  <!-- 조회 조건 검색 모달 -->
  <BottomModal
    title="조회조건을 설정해 주세요"
    :is-visible="isShowFilterModal"
    :is-show-cancel-button="false"
    @close="isShowFilterModal = false"
  >
    <template #content>
      <div class="wrap-inquiry-condition">
        <div class="tit">대리청구 상태</div>
        <SegmentedTabsStyle
          :tabs="segmentedTabs"
          :active-index="segmentedActiveIndex"
          @tab-click="handleSegmentedTabClick"
        />
        <div class="tit">보험사 선택</div>
        <div class="wrap-insurance-list">
          <button class="item active">
            <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
            <div class="name-insurance" @click="clickInsurance">DB손해</div>
          </button>
          <button class="item">
            <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
            <div class="name-insurance" @click="clickInsurance">DB손해</div>
          </button>
          <button class="item">
            <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
            <div class="name-insurance" @click="clickInsurance">DB손해</div>
          </button>
          <button class="item">
            <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
            <div class="name-insurance" @click="clickInsurance">DB손해</div>
          </button>
          <button class="item">
            <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
            <div class="name-insurance" @click="clickInsurance">DB손해</div>
          </button>
          <button class="item">
            <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
            <div class="name-insurance" @click="clickInsurance">DB손해</div>
          </button>
          <button class="item">
            <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
            <div class="name-insurance" @click="clickInsurance">DB손해</div>
          </button>
          <button class="item">
            <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
            <div class="name-insurance" @click="clickInsurance">DB손해</div>
          </button>
          <button class="item">
            <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
            <div class="name-insurance" @click="clickInsurance">DB손해</div>
          </button>
        </div>
      </div>
    </template>
  </BottomModal>

  <BottomModal
    :is-visible="isShowRequestModal"
    title="알림"
    cancel-button-text="나중에 보내기"
    confirm-button-text="알림톡 보내기"
    @confirm="sendNoti"
    @close="isShowRequestModal = false"
    @cancel="isShowRequestModal = false"
  >
    <template #content>
      <div class="wrap-pop-alert">
        <div class="tit">김레몬님께 청구에 필요한 개인정보 활용동의 알림톡을 발송합니다.</div>
        <div class="user-info">
          <span class="name">김레몬</span>
          <span class="phone">010-2555-45646</span>
        </div>
        <div class="text-warn">반드시 고객 동의 및 서명이 이루어져야 대리청구를 진행할 수 있습니다.</div>
      </div>
    </template>
  </BottomModal>

  <FullModal
    title="피보험자 편집"
    confirm-button-text="1개 삭제하기"
    :is-show-close-button="true"
    :is-visible="isShowEditFullModal"
    :is-show-cancel-button="false"
    :is-show-confirm-button="true"
    @close="closeEditFullModal"
  >
    <template #content>
      <div class="wrap-edit">
        <div class="wrap-check">
          <Checkbox
            id="checkBox1"
            aria-label="전체 선택"
            :model-value="isAllSelected"
            @update:model-value="toggleAllSelection"
          />
        </div>
        <div class="wrap-insured-list">
          <div class="item">
            <div class="item-header">
              <label for="check1" class="c-checktype-btn">
                <input
                  id="check1"
                  name="check1"
                  type="checkbox"
                  class="c-checktype-check"
                  v-model="insuredPersonSelections[0]"
                  @change="updateAllSelection"
                />
                <i class="icon"></i>
                <div class="wrap-user">
                  <div class="name">김레몬</div>
                  <div class="phone">010****5555</div>
                </div>
              </label>
              <button class="btn-edit" @click="editInsuredData">편집하기</button>
            </div>
            <div class="wrap-label">
              <div class="label">KB손해보험</div>
              <div class="label">삼성화재</div>
            </div>
            <div class="wrap-memo">
              <div class="text">
                메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모
                영역입니다.
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-header">
              <label for="check2" class="c-checktype-btn">
                <input
                  id="check2"
                  name="check2"
                  type="checkbox"
                  class="c-checktype-check"
                  v-model="insuredPersonSelections[1]"
                  @change="updateAllSelection"
                />
                <i class="icon"></i>
                <div class="wrap-user">
                  <div class="name">김레몬</div>
                  <div class="phone">010****5555</div>
                </div>
              </label>
              <button class="btn-edit" @click="editInsuredData">편집하기</button>
            </div>
            <div class="wrap-label">
              <div class="label">KB손해보험</div>
              <div class="label">삼성화재</div>
            </div>
            <div class="wrap-memo">
              <div class="text">
                메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모
                영역입니다.
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item-header">
              <label for="check3" class="c-checktype-btn">
                <input
                  id="check3"
                  name="check3"
                  type="checkbox"
                  class="c-checktype-check"
                  v-model="insuredPersonSelections[2]"
                  @change="updateAllSelection"
                />
                <i class="icon"></i>
                <div class="wrap-user">
                  <div class="name">김레몬</div>
                  <div class="phone">010****5555</div>
                </div>
              </label>
              <button class="btn-edit" @click="editInsuredData">편집하기</button>
            </div>
            <div class="wrap-label">
              <div class="label">KB손해보험</div>
              <div class="label">삼성화재</div>
            </div>
            <div class="wrap-memo">
              <div class="text">
                메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모
                영역입니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </FullModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import { HEADER_UTILS_BUTTON } from '~/constants/header.constants'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import Button from '~/components/publishing/button/Button.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import FullModal from '~/components/common/modal/FullModal.vue'
import SegmentedTabsStyle, { type SegmentTab } from '~/components/common/tab/SegmentedTabs.vue'
import Checkbox from '~/components/publishing/input/check.vue'

// 레이아웃에서 addTextClick 핸들러 등록 기능 가져오기
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')
// 컴포넌트 마운트 시 addTextClick 핸들러 등록
onMounted(() => {
  if (setAddTextClickHandler) {
    setAddTextClickHandler(clickFullModal)
  }
})

// 피보험자 선택 상태 관리
const insuredPersonSelections = ref([false, false, false])

// 전체 선택 상태 계산
const isAllSelected = computed(() => {
  return insuredPersonSelections.value.every((selected: boolean) => selected)
})

// 선택된 피보험자이 있는지 확인
const hasSelectedHospitals = computed(() => {
  return insuredPersonSelections.value.some((selected: boolean) => selected)
})

// 전체 선택 토글 함수
const toggleAllSelection = () => {
  const newValue = !isAllSelected.value
  insuredPersonSelections.value = insuredPersonSelections.value.map(() => newValue)
}

// 개별 체크박스 변경 시 전체 선택 상태 업데이트
const updateAllSelection = () => {
  // 개별 체크박스 변경 시에는 전체 선택 상태가 자동으로 계산됨
  // computed 속성 isAllSelected가 자동으로 업데이트됨
}

// SegmentedTabs 데이터
const segmentedTabs: SegmentTab[] = [
  { name: '전체', code: 'all' },
  { name: '청구 가능', code: 'possible' },
  { name: '서명 요청', code: 'request' },
  { name: '서명 대기', code: 'waiting' }
]
const segmentedActiveIndex = ref(0)
const handleSegmentedTabClick = (index: number) => {
  segmentedActiveIndex.value = index
  console.log('Segmented 탭 클릭:', segmentedTabs[index])
}

const activeLineTab = ref('accountInfo')
const tabs = ref<Tab[]>([
  { title: '고객', to: '/insu/claim/subrogation/serviceInUse/insuredManagement' },
  { title: '나의 가족 / 제3자', to: '/insu/claim/subrogation/serviceInUse/insuredManagementByGeneral' }
])
const selectedTab = ref('etc')
const clickTab = (type: 'customer' | 'etc') => {
  selectedTab.value = type
}
definePageMeta({
  title: '대리청구/피보험자 관리',
  utils: [HEADER_UTILS_BUTTON.SEARCH, HEADER_UTILS_BUTTON.EDIT]
})

const agentList = ref([
  { id: 'all', label: '전체', value: 'all' },
  { id: '1', label: '설계사1', value: 1 },
  { id: '2', label: '설계사2', value: 2 },
  { id: '3', label: '설계사3', value: 3 },
  { id: '4', label: 'agent4', value: 4 }
])

// const selectedTab = ref<'customer' | 'etc'>('customer')
const isShowAgentModal = ref(false)
const isShowFilterModal = ref(false)
const selectedAgent = ref<any>(agentList.value[0])
const isShowRequestModal = ref(false)

// 커스텀 Select 컴포넌트용 상태
const selectedAgentValue = ref('전체보기')
const selectedAgentLabel = ref('전체보기')
const isShowCustomSelect = ref(false)

const selectAgent = (selectValue: any) => {
  selectedAgent.value = selectValue
  isShowAgentModal.value = false
}

const clickClaim = () => {
  // 청구하기
  navigateTo('/insu/claim/subrogation/serviceInUse/selectInsurance01')
}
const movePage = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/addInsuredData')
}
const editInsuredData = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/EditInsuredData')
}

const requestSign = () => {
  isShowRequestModal.value = true
}

const sendNoti = () => {
  console.log('알림톡을 보냅니다.')
}
const isShowEditFullModal = ref(false)
const closeEditFullModal = () => {
  isShowEditFullModal.value = false
}
const toggleFullModal = () => {
  isShowEditFullModal.value = !isShowEditFullModal.value
}

const clickFullModal = () => {
  toggleFullModal()
}
</script>

<style scoped lang="scss">
.wrap-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 20rem 0;
  .icon-empty {
    width: 8rem;
    height: 8rem;
  }
  .text-empty {
    font-size: 1.8rem;
    font-weight: 500;
    color: #555555;
  }
  .btn-add-insure {
    padding: 0.8rem 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: #555555;
    border-radius: 0.4rem;
    border: 0.1rem solid #e2e2e2;

    i.icon {
      margin-right: 0.4rem;
      width: 1.8rem;
      height: 1.8rem;
      background-image: url('/assets/images/insu/icon-plus.svg') center center no-repeat;
      background-size: contain;
    }
  }
}
// 커스텀 Select 스타일
.custom-select-container {
  margin-top: 2rem;
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
  margin: -2rem;

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
.total-claim {
  width: 100%;
  padding: 2.1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 140%;
    color: #2b2b2b;
    strong {
      font-weight: 700;
    }
  }
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
.wrap-customer-list {
  position: relative;
  margin: 0 -2rem;
  padding: 2rem 2rem 4.8rem;
  background-color: #f4f4f4;
  .item {
    padding: 2.4rem 2rem;
    background-color: #fff;
    border-radius: 1.2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .customer-info {
        .name {
          font-weight: 700;
          .icon-nagative {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            margin-right: 0.4rem;
          }
        }
        .phone {
          margin-top: 0.2rem;
          font-size: 1.4rem;
          color: #555555;
        }
      }
    }
    .wrap-label {
      margin-top: 0.4rem;
      display: flex;
      gap: 0.4rem;
      .label-name {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        background-color: #eeeeee;
        font-size: 1.2rem;
        font-weight: 500;
        color: #555555;
      }
    }
    .memo {
      margin-top: 1.2rem;
      padding: 1.2rem;
      border: 0.1rem solid #e2e2e2;
      background-color: #f9f8f7;
      border-radius: 0.8rem;
      .text {
        font-size: 1.4rem;
        font-weight: 500;
        color: #555555;
        @include mixin.multi-ellipsis(2);
      }
    }
  }
  .add-item {
    padding: 1.3rem 2rem;
    border-radius: 10rem;
    font-weight: 500;
    text-align: center;
    background-color: #fff;
    border: 0.1rem solid #e2e2e2;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    position: absolute;
    bottom: 1.6rem;
    left: 50%;
    transform: translateX(-50%);
    white-space: pre;
    cursor: pointer;
    .icon {
      width: 2rem;
      height: 2rem;
      display: inline-block;
    }
  }
}
.wrap-pop-alert {
  text-align: left;
  .tit {
    font-weight: 700;
    color: #000000;
  }
  .user-info {
    margin-top: 1.6rem;
    padding: 1.3rem 1.6rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #e2e2e2;
    .name,
    .phone {
      font-weight: 500;
    }
    .phone {
      margin-left: 0.4rem;
    }
  }
  .text-warn {
    margin-top: 0.6rem;
    font-size: 1.3rem;
    color: #f14960;
  }
}
// 조회조건 팝업
.wrap-inquiry-condition {
  .tit {
    margin-top: 1.6rem;
    margin-bottom: 0.6rem;
    text-align: left;
    font-size: 1.2rem;
    color: #555555;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
  }
}
.wrap-insurance-list {
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-columns: auto;
  gap: 0.8rem;
  .item {
    padding: 1.8rem 1.6rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    border-radius: 0.8rem;
    background-color: #f9f9f9;
    border: 0.1rem solid #f9f9f9;
    &:focus,
    &.hover,
    &.active {
      border: 0.1rem solid #555555;
    }
    .logo-insurance {
      width: 4rem;
      height: 4rem;
    }
    .name-insurance {
      font-size: 1.4rem;
      font-weight: 500;
      color: #2b2b2b;
    }
  }
}
.wrap-check {
  margin: 0 -2rem;
  padding: 0 2rem 2rem;
  display: flex;
  border-bottom: 0.1rem solid #eeeeee;
}
.wrap-insured-list {
  .item {
    padding: 2.2rem 0;
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      .c-checktype-btn {
        display: flex;
        align-items: flex-start;
        gap: 1.2rem;
        flex: 1;
        &:has(.c-checktype-check:checked) {
          .icon {
            border-color: #4c7ff7;
            background-color: #4c7ff7;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          }
        }
        .c-checktype-check {
          display: none;
        }
        .icon {
          display: block;
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
        .wrap-user {
          text-align: left;
          .name {
            display: line-block;
            font-weight: 700;
          }
          .phone {
            margin-top: 0.2rem;
            font-size: 1.4rem;
            color: #555555;
          }
        }
      }
      .btn-edit {
        font-size: 1.4rem;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .wrap-label {
      margin-top: 0.4rem;
      margin-left: 3.6rem;
      display: flex;
      gap: 0.4rem;
      .label {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        background-color: #eeeeee;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        color: #555555;
      }
    }
    .wrap-memo {
      margin-top: 1.2rem;
      margin-left: 3.6rem;
      padding: 1.2rem;
      border: 0.1rem solid #e2e2e2;
      background-color: #f9f8f7;
      border-radius: 0.8rem;
      .text {
        text-align: left;
        font-size: 1.4rem;
        font-weight: 500;
        color: #555555;
        @include mixin.multi-ellipsis(2);
      }
    }
  }
}
</style>
