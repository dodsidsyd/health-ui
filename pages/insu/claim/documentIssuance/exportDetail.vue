<template>
  <BaseBody
    page-title="내보내기 상세 내역"
    logo-type="text"
    :has-close-btn="true"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <div class="medical-info">
      <div class="medical-info-head">
        <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
        <div class="wrap-insurance-info">
          <div class="wrap-text">
            <div class="tit">서울대학교병원 진료비영수증</div>
          </div>
        </div>
      </div>
    </div>
    <hr class="hr-section ml-n20 mr-n20" />
    <div class="wrap-search-status">
      <div class="text">총 <strong>3</strong>건</div>
    </div>
    <div class="wrap-grey">
      <div class="wrap-detail-list">
        <div class="item">
          <div class="item-header">
            <label class="h-label">SNS 공유</label>
            <div class="wrap-password">
              <div class="text">비밀번호 확인</div>
              <Checkbox id="checkBox01" v-model="checkbox01" custom-style="switch tiny" aria-label="" />
            </div>
          </div>
          <div class="wrap-detail-list">
            <div class="detail-item">
              <div class="tit">내보낸 일시</div>
              <div class="desc">2025.04.20 17:18:26</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-header">
            <label class="h-label">다운로드</label>
            <div class="wrap-password">
              <div class="text active">비밀번호 44866845</div>
              <Checkbox id="checkBox02" v-model="checkbox02" custom-style="switch tiny" aria-label="" />
            </div>
          </div>
          <div class="wrap-detail-list">
            <div class="detail-item">
              <div class="tit">내보낸 일시</div>
              <div class="desc">2025.04.20 17:18:26</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-header">
            <label class="h-label">이메일</label>
            <div class="wrap-password">
              <div class="text">비밀번호 확인</div>
              <Checkbox id="checkBox03" v-model="checkbox03" custom-style="switch tiny" aria-label="" />
            </div>
          </div>
          <div class="wrap-detail-list">
            <div class="detail-item">
              <div class="tit">내보낸 일시</div>
              <div class="desc">2025.04.20 17:18:26</div>
            </div>
            <div class="detail-item">
              <div class="tit">이메일 주소</div>
              <div class="desc">Hospital@naver.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Checkbox from '~/components/publishing/input/check.vue'

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})

const checkbox01 = ref(false)
const checkbox02 = ref(true)
const checkbox03 = ref(false)
</script>

<style scoped lang="scss">
.medical-info {
  margin-top: 2.4rem;
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
.wrap-search-status {
  padding: 2.1rem 0;
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
}
.wrap-grey {
  flex: 1;
  position: relative;
  margin: 0 -2rem 0;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
}
.wrap-detail-list {
  .item {
    background-color: #fff;
    border-radius: 1.2rem;
    padding: 1.6rem 2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item-header {
      @include mixin.flex-container(justify-between items-center);
      .h-label {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        background-color: #5782e7;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        color: #fff;
      }
      .wrap-password {
        @include mixin.flex-container(items-center);
        gap: 0.6rem;
        .text {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
          &.active {
            color: #2b2b2b;
          }
        }
      }
    }
    .wrap-detail-list {
      margin-top: 1.6rem;
      .detail-item {
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child) {
          border-top: 0.1rem solid #eeeeee;
          padding-top: 1.2rem;
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .desc {
          font-size: 1.4rem;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
