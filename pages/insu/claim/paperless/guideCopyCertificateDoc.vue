<template>
  <BaseBody
    :show-back-button="false"
    page-title="진단서 서류 사본 발급 안내"
    logo-type="text"
    :has-add-text-left="true"
    :has-close-btn="true"
    class="pb-36"
  >
    <div class="flex flex-col gap-10 mt-24">
      <h1 class="c-tit">
        <span class="text">강동성심병원의 진단서 사본<br />발급 방법을 확인하세요</span>
      </h1>
    </div>
    <div class="wrap-payment-instructions-info">
      <div class="wrap-spread">
        <div class="item">
          <div class="item-head" @click="toggleItem(0)">
            <img class="ico-payment-method" src="/assets/images/insu/icon-payment-method1.svg" alt="진단서 발급 방법1" />
            <div class="wrap-desc">
              <div class="text">청구에신에서 발급하기</div>
              <div class="label">가능</div>
            </div>
            <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[0] }"></i>
          </div>
          <div class="item-body" :class="{ 'expanded': expandedItems[0] }">
            <div class="spread-tit">청구의신 병원 서류발급 서비스를 이용하여 진단서 사본을 발급해요.</div>
            <ul class="spread-list circle-num">
              <li>병원 서류 발급 > 병원 선택</li>
              <li>진단서 사본 발급 선택</li>
              <li>발급 수수료 결제</li>
            </ul>
            <div class="spread-desc">발급 수수료는 병원에 따라 달라질 수 있어요.</div>
            <Button btn-type="primary" element-type="button" aria-label="발급하기" class="sm" @click="clickConfirmModal" />
          </div>
        </div>
        <div class="item">
          <div class="item-head" @click="toggleItem(1)">
            <img class="ico-payment-method" src="/assets/images/insu/icon-payment-method2.svg" alt="진단서 발급 방법2" />
            <div class="wrap-desc">
              <div class="text">병원 홈페이지에서 발급하기</div>
              <div class="label">가능</div>
            </div>
            <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[1] }"></i>
          </div>
          <div class="item-body" :class="{ 'expanded': expandedItems[1] }">
            <div class="spread-tit">병원 홈페이지에서 진단서 사본을 발급해요.</div>
            <ul class="spread-list circle-num">
              <li>병원 홈페이지 접속</li>
              <li>진단서 조회 및 사본 신청</li>
              <li>발급 수수료 결제</li>
            </ul>
            <div class="spread-desc">발급 수수료는 병원에 따라 달라질 수 있어요.</div>
          </div>
        </div>
        <div class="item">
          <div class="item-head" @click="toggleItem(2)">
            <img class="ico-payment-method" src="/assets/images/insu/icon-payment-method3.svg" alt="진단서 발급 방법3" />
            <div class="wrap-desc">
              <div class="text">병원 방문 후 직접 발급하기</div>
              <div class="label">가능</div>
            </div>
            <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[2] }"></i>
          </div>
          <div class="item-body" :class="{ 'expanded': expandedItems[2] }">
            <div class="spread-tit">신분증을 지참하신 후 실손청구 하실 병원에<br />직접 방문하여 진단서 사본 발급을 신청해요.</div>
            <div class="spread-desc">각 병원의 운영 시간을 꼭 확인하신 후 방문해주세요.</div>
          </div>
        </div>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'

const clickConfirmModal = async () => {
  const modalContent = `
    <div class="modal-content-info">
      <div style="text-align:left;">작성중이던 정보는 저장되지않으며<br />실손청구는 처음부터 진행해야해요.<br /><br />서류 발급화면으로 이동할까요?</div>
    </div>`
  await ConfirmModal.open({
    title: '안내',
    isVisible: true,
    html: modalContent,
    confirmButtonText: '이동',
    isShowCancelButton: false
  })
}

// 각 item의 확장 상태를 관리하는 배열
const expandedItems = ref([false, false, false])

// item 토글 함수
const toggleItem = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}
</script>

<style scoped lang="scss">
.wrap-payment-instructions-info {
  margin: 0 -2rem;
  h2 {
    padding: 0 2rem;
  }
  .wrap-spread {
    margin-top: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .item {
      width: 100%;
      &:not(:first-child) {
        border-top: 0.1rem solid #EEEEEE;
      }
      &:last-child .item-body {
        border-bottom: 0.1rem solid #EEEEEE;
      }
      .item-head {
        padding: 1.2rem 2.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.2rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
        
        .ico-payment-method {
          flex: 0 0;
          width: 4.8rem;
          height: auto;
        }
        .wrap-desc {
          flex: 1 0 auto;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          .text {
            font-size: 1.6rem;
            font-weight: 700;
            color: #2B2B2B;
          }
          .label {
            flex: 0 0;
            padding: 0.3rem 0.6rem;
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 130%;
            color: #4C7FF7;
            background-color: #E5EDFF;
            border-radius: 0.4rem;
          }
        }
        i.icon-arrow-down {
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
      }
      .item-body {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease, padding 0.3s ease, border-top 0.3s ease;
        padding: 0 2rem;
        border-top: 0.1rem solid transparent;
        background-color: #F9F9F9;
        
        &.expanded {
          max-height: 50rem; // 충분한 높이로 설정
          padding: 2.4rem 2rem;
          border-top: 0.1rem solid #EEEEEE;
        }
        
        .spread-tit {
          font-size: 1.6rem;
          font-weight: 500;
          color: #2B2B2B;
        }
        .spread-list {
          margin-top: 1.6rem;
          counter-reset: num;
          li {
            position: relative;
            counter-increment: num;
            padding-left: 2.6rem;
            font-size: 1.6rem;
            font-weight: 500;
            color: #555555;
            &::before {
              content: counter(num);
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              background: #4F5561;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.2rem;
              font-weight: 500;
              line-height: 130%;
            }
            &:not(:first-child) {
              margin-top: 0.8rem;
            }
          }
          & + .spread-desc {
            margin-top: 0.2rem;
            margin-left: 3rem;
          }
        }
        .spread-desc {
          margin-top: 1.6rem;
          font-size: 1.4rem;
          font-weight: 500;
          color: #959595;
        }
        .c-btn {
          margin-top: 1.6rem;
        }
      }
    }
  }
}
</style>
