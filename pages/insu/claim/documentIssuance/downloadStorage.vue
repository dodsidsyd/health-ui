<template>
  <BaseBody
    :show-back-button="true"
    page-title="다운로드 서류함"
    logo-type="text"
    :has-close-btn="true"
    :has-add-text-left="true"
  >
    <div class="wrap-info-lists">
      <div class="item">다운로드 유효기간이 만료된 서류는 자동 삭제됩니다.</div>
    </div>
    <div class="total-count">
      <div class="total">총 <strong>3</strong>건</div>
      <div class="btn-reload">
        <div class="text">서류함 새로고침</div>
        <i class="icon-reload"></i>
      </div>
    </div>
    <div class="wrap-grey">
      <div class="wrap-doc-list">
        <div class="item">
          <div class="medical-info-head">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
            <div class="wrap-insurance-info">
              <div class="wrap-text">
                <div class="tit">서울대학교병원 진료비영수증</div>
              </div>
            </div>
          </div>
          <div class="tit-item">진료비영수증</div>
          <div class="item-detail-list">
            <div class="detail-item">
              <div class="tit">발급일자</div>
              <div class="desc">2024.02.20</div>
            </div>
            <div class="detail-item">
              <div class="tit">다운로드 유효기간</div>
              <label class="h-label">유효기간 D-45</label>
            </div>
          </div>
          <Button btn-type="primary" element-type="button" aria-label="다운로드" />
        </div>
        <div class="item">
          <div class="medical-info-head">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
            <div class="wrap-insurance-info">
              <div class="wrap-text">
                <div class="tit">서울대학교병원 진료비영수증</div>
              </div>
            </div>
          </div>
          <div class="tit-item">진료비영수증</div>
          <div class="item-detail-list">
            <div class="detail-item">
              <div class="tit">발급일자</div>
              <div class="desc">2024.02.20</div>
            </div>
            <div class="detail-item">
              <div class="tit">다운로드 유효기간</div>
              <label class="h-label">유효기간 D-45</label>
            </div>
          </div>
          <Button btn-type="secondary" element-type="button" aria-label="서류 생성중" />
        </div>
        <div class="item">
          <div class="medical-info-head">
            <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
            <div class="wrap-insurance-info">
              <div class="wrap-text">
                <div class="tit">서울대학교병원 진료비영수증</div>
              </div>
            </div>
          </div>
          <div class="tit-item">진료비영수증</div>
          <div class="item-detail-list">
            <div class="detail-item">
              <div class="tit">발급일자</div>
              <div class="desc">2024.02.20</div>
            </div>
            <div class="detail-item">
              <div class="tit">다운로드 유효기간</div>
              <label class="h-label">유효기간 D-45</label>
            </div>
          </div>
          <Button btn-type="primary" element-type="button" aria-label="다운로드" />
        </div>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'

import { BottomModal } from '@lemonhc/fo-ui/components/modal'

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})
</script>

<style scoped lang="scss">
.wrap-info-lists {
  padding: 2rem 0;
  .item {
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    &:not(:first-child) {
      margin-top: 0.8rem;
    }
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
.total-count {
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
  .btn-reload {
    @include mixin.flex-container(items-center);
    gap: 0.2rem;
    .text {
      font-size: 1.4rem;
    }
    .icon-reload {
      display: inline-block;
      background: url('/assets/images/insu/icon-reload.svg') center center no-repeat;
      background-size: 100%;
      width: 1.6rem;
      height: 1.6rem;
    }
  }
}
.wrap-grey {
  flex: 1;
  position: relative;
  margin: 0 -2rem 0;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
  .tit-sub {
    font-size: 1.8rem;
    font-weight: 700;
  }
}
.wrap-doc-list {
  .item {
    padding: 2rem;
    border-radius: 1.2rem;
    background-color: #fff;
    box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.04);
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
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
    .tit-item {
      margin-top: 2rem;
      font-size: 1.4rem;
      font-weight: 700;
    }
    .item-detail-list {
      margin: 1.6rem 0;
      .detail-item {
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .desc {
          font-weight: 600;
        }
        .h-label {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          background-color: #e5edff;
          color: #4c7ff7;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 130%;
        }
      }
    }
    .c-btn.btn-secondary :deep(.text) {
      color: #959595;
    }
  }
}
</style>
