<template>
  <BaseBody
    :show-back-button="false"
    page-title=""
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-close-btn="true"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="medical-info">
      <div class="medical-info-head">
        <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
        <div class="wrap-insurance-info">
          <div class="wrap-text">
            <div class="tit">강동성심병원</div>
          </div>
        </div>
      </div>
    </div>
    <hr class="hr-section ml-n20 mr-n20" />
    <div class="wrap-recent-searches">
      <div class="text">총 <strong>4</strong>건을 찾았어요.</div>
    </div>
    
    <div class="wrap-grey">
      <div class="wrap-insurance-info-list">
        <div class="item">
          <div class="wrap-item-header">
            <label for="" class="h-label visit">통원</label>
          </div>
          <div class="wrap-item-lists">
            <div class="list-item">
              <div class="tit">진료일</div>
              <div class="wrap-desc">
                <div class="desc">2025. 01. 20 ~ 2025. 05. 30</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="wrap-desc">
                <div class="desc">영상의학과</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">입원비</div>
              <div class="wrap-desc">
                <div class="desc">123,456원</div>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="wrap-item-header">
            <label for="" class="h-label able">AI분석 신청가능</label>
            <label for="" class="h-label visit">통원</label>
          </div>
          <div class="wrap-item-lists">
            <div class="list-item">
              <div class="tit">진료일</div>
              <div class="wrap-desc">
                <div class="desc">2025. 01. 20 ~ 2025. 05. 30</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="wrap-desc">
                <div class="desc">영상의학과</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">입원비</div>
              <div class="wrap-desc">
                <div class="desc">123,456원</div>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="wrap-item-header">
            <label for="" class="h-label able">AI분석 신청가능</label>
            <label for="" class="h-label admission">입원</label>
          </div>
          <div class="wrap-item-lists">
            <div class="list-item">
              <div class="tit">진료일</div>
              <div class="wrap-desc">
                <div class="desc">2025. 01. 20 ~ 2025. 05. 30</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="wrap-desc">
                <div class="desc">내과</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">입원비</div>
              <div class="wrap-desc">
                <div class="desc">123,456원</div>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="wrap-item-header">
            <label for="" class="h-label able">AI분석 신청가능</label>
            <label for="" class="h-label admission">입원</label>
          </div>
          <div class="wrap-item-lists">
            <div class="list-item">
              <div class="tit">진료일</div>
              <div class="wrap-desc">
                <div class="desc">2025. 01. 20 ~ 2025. 05. 30</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="wrap-desc">
                <div class="desc">영상의학과</div>
              </div>
            </div>
            <div class="list-item">
              <div class="tit">입원비</div>
              <div class="wrap-desc">
                <div class="desc">123,456원</div>
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
  border: 0.1rem solid #E2E2E2;
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
      }
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
      align-items: center;
      gap: 0.4rem;
      .h-label {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        color: #555555;
        background-color: #EEEEEE;
        &.able {
          background-color: #E5EDFF;
          color: #4C7FF7;
        }
        &.visit {
          background-color: #FEF4CC;
          color: #8D7000;
        }
        &.admission {
          background-color: #EAF2CC;
          color: #506A1D;
        }
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
.wrap-recent-searches {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.1rem 0;
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
}
</style>