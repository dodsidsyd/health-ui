<template>
  <BaseBody
    :show-back-button="true"
    page-title="내 보험 정보 및 보장내용"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="medical-info">
      <div class="medical-info-head">
        <img src="/assets/images/insu/logo_kbbank.svg" alt="로고" class="logo" />
        <div class="wrap-insurance-info">
          <div class="wrap-text">
            <div class="tit">KB손해보험</div>
            <div class="insurance-desc">무배당 카테이션 하나로보험</div>
          </div>
        </div>
        <div class="status">정상</div>
      </div>
      <div class="car-info">
        <img src="/assets/images/insu/ai/icon-car.svg" alt="아이콘:자동차" />
        <div class="car-desc">[21라 1234] SONATA 2.5 Hybrid</div>
      </div>
    </div>
    <hr class="hr-section ml-n20 mr-n20 mb-10" />
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" class="" />
    <div class="wrap-grey">
      <div class="wrap-insurance-info-list">
        <div class="item">
          <div class="wrap-item-header">
            <div class="text">기본 정보</div>
            <button type="button" class="btn-round-outline">보험 약관보기</button>
          </div>
          <div class="wrap-item-lists">
            <div class="list-item">
              <div class="tit">진료일</div>
              <div class="wrap-desc">
                <div class="desc">2025. 01. 20 ~ 2025. 05. 30</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">보험종류</div>
              <div class="wrap-desc">
                <div class="desc">개인용 자동차보험</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">보험시작일</div>
              <div class="wrap-desc">
                <div class="desc">2048.05.05</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">만기일</div>
              <div class="wrap-desc">
                <div class="desc">2048.05.05</div>
              </div>
            </div>

          </div>
        </div>
        <div class="item">
          <div class="wrap-item-header">
            <div class="text">보험료</div>
            <button type="button" class="btn-round-outline">보험 약관보기</button>
          </div>
          <div class="wrap-item-lists">
            <div class="list-item">
              <div class="tit">진료일</div>
              <div class="wrap-desc">
                <div class="desc">2025. 01. 20 ~ 2025. 05. 30</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">납입회차</div>
              <div class="wrap-desc">
                <div class="desc">190/240회 중</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">납입예정 보험료</div>
              <div class="wrap-desc">
                <div class="desc">1,234,567원</div>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="wrap-item-header">
            <div class="text">보장 내용</div>
          </div>
          <div class="wrap-item-lists">
            <div class="list-item">
              <div class="tit">질병사망</div>
              <div class="wrap-desc">
                <div class="desc">456,789원</div>
                <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[0] }" @click="toggleDetail(0)"></i>
              </div>
              <div class="wrap-detail" v-show="expandedItems[0]">
                <div class="detail-item">
                  <div class="detail-tit">담보상태</div>
                  <div class="detail-desc">정상</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">담보기간</div>
                  <div class="detail-desc">2024.02.27~2056.03.22</div>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">상해사망</div>
              <div class="wrap-desc">
                <div class="desc">10,000,000원</div>
                <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[1] }" @click="toggleDetail(1)"></i>
              </div>
              <div class="wrap-detail" v-show="expandedItems[1]">
                <div class="detail-item">
                  <div class="detail-tit">담보상태</div>
                  <div class="detail-desc">정상</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">담보기간</div>
                  <div class="detail-desc">2024.02.27~2056.03.22</div>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">질병사망</div>
              <div class="wrap-desc">
                <div class="desc">456,789원</div>
                <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[2] }" @click="toggleDetail(2)"></i>
              </div>
              <div class="wrap-detail" v-show="expandedItems[2]">
                <div class="detail-item">
                  <div class="detail-tit">담보상태</div>
                  <div class="detail-desc">정상</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">담보기간</div>
                  <div class="detail-desc">2024.02.27~2056.03.22</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="wrap-item-header">
            <div class="text">특약 <strong>3건</strong></div>
          </div>
          <div class="wrap-item-lists">
            <div class="list-item">
              <div class="tit">사망의료비</div>
              <div class="wrap-desc">
                <div class="desc">567,890원</div>
                <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[3] }" @click="toggleDetail(3)"></i>
              </div>
              <div class="wrap-detail" v-show="expandedItems[3]">
                <div class="detail-item">
                  <div class="detail-tit">만기일</div>
                  <div class="detail-desc">2056.03.22</div>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">재해치료비 특약</div>
              <div class="wrap-desc">
                <div class="desc">10,000,000원</div>
                <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[4] }" @click="toggleDetail(4)"></i>
              </div>
              <div class="wrap-detail" v-show="expandedItems[4]">
                <div class="detail-item">
                  <div class="detail-tit">만기일</div>
                  <div class="detail-desc">2056.03.22</div>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">골절 통원치료 특약</div>
              <div class="wrap-desc">
                <div class="desc">456,789원</div>
                <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[5] }" @click="toggleDetail(5)"></i>
              </div>
              <div class="wrap-detail" v-show="expandedItems[5]">
                <div class="detail-item">
                  <div class="detail-tit">만기일</div>
                  <div class="detail-desc">2056.03.22</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'

// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '보험 정보', code: 'insurance' },
  { name: '보장 내용', code: 'detail' }
]
// 이벤트 핸들러들
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
  console.log('Line 탭 클릭:', lineTabs[index])
}
const lineActiveIndex = ref(0)

// 확장된 상세 항목 상태
const expandedItems = ref([false, false, false, false, false, false])

// 상세 항목 토글 함수
const toggleDetail = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}
</script>
<style scoped lang="scss">
.medical-info {
  margin-top: 1.6rem;
  border: 0.1rem solid #E2E2E2;
  border-radius: 1.2rem;
  padding: 2rem;
  .medical-info-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-insurance-info {
      flex: 1 0 auto;
      max-width: calc(100% - 10rem);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .wrap-text {
        .tit {
          flex: 1;
          min-width: 0;
          font-weight: 700;
          @include mixin.ellipsis;
        }
        .insurance-desc {
          margin-top: 0.1rem;
          font-size: 1.4rem;
          color: #555555;
        }
      }
    }
    .status {
      background-color: #E0E9FF;
      border-radius: 1.1rem;
      padding: 0.3rem 0.8rem;
      flex: 0 0;
      font-size: 1.2rem;
      font-weight: 500;
      color: #002988;
    }
  }
  .car-info {
    border-top: 0.1rem solid #EEEEEE;
    margin-top: 1.6rem;
    padding-top: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    .car-desc {
      font-size: 1.4rem;
      font-weight: 500;
      color: #555555;
    }
  }
}
.wrap-grey {
  position: relative;
  margin: 0 -2rem 0;
  padding: 2.4rem 2rem 4rem;
  background-color: #F4F4F4;
}
.wrap-insurance-info-list {
  .item {
    padding: 2rem;
    border-radius: 1.2rem;
    background-color: #fff;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .wrap-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        font-weight: 700;
        strong {
          color: #4C7FF7;
        }
      }
      .btn-round-outline {
        padding: 1rem 1.6rem;
        border: 0.1rem solid #E2E2E2;
        border-radius: 1.8rem;
        color: #555555;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        cursor: pointer;
      }
    }
    .wrap-item-lists {
      margin-top: 1.6rem;
      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          margin-left: 0.4rem;
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .wrap-desc {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          .desc {
            font-weight: 1.4rem;
            font-weight: 600;
          }
          .icon-arrow-down {
            display: inline-block;
            width: 1.6rem;
            height: 1.6rem;
            background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
            background-size: 100%;
            transition: transform 0.3s ease;
            cursor: pointer;
            &.rotated {
              transform: rotate(180deg);
            }
          }
        }
        .wrap-detail {
          margin-top: 1.2rem;
          width: 100%;
          padding: 1.6rem 2rem;
          border-radius: 1.2rem;
          background-color: #F4F4F4;
          .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:not(:first-child) {
              margin-top: 1.2rem;
            }
            .detail-tit {
              font-size: 1.3rem;
              font-weight: 500;
              color: #959595;
            }
            .detail-desc {
              font-size: 1.3rem;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}
</style>