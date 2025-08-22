<template>
  <BaseBody
    :show-back-button="false"
    page-title=""
    logo-type="text"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="wrap-completed-main">
      <img src="/assets/images/insu/docIssuance/img-checked.png" alt="이미지:결재완료" />
      <div class="price">11,000원</div>
      <div class="text">결제를 완료했어요.</div>
    </div>
    <div class="wrap-claim-lists">
      <div class="item-claim">
        <div class="item">
          <div class="wrap-tit">
            <div class="tit-sub">결제수단</div>
          </div>
          <div class="desc">국민카드</div>
        </div>
        <div class="item">
          <div class="wrap-tit">
            <div class="tit-sub">카드번호</div>
          </div>
          <div class="desc">5570-42**-****-4021</div>
        </div>
        <div class="item">
          <div class="wrap-tit">
            <div class="tit-sub">결제구분</div>
          </div>
          <div class="desc">일시불</div>
        </div>
        <div class="item">
          <div class="wrap-tit">
            <div class="tit-sub">승인일시</div>
          </div>
          <div class="desc">2025.06.12 12:58</div>
        </div>
        <div class="item">
          <div class="wrap-tit">
            <div class="tit-sub">승인번호</div>
          </div>
          <div class="desc">13246578648</div>
        </div>
      </div>
      <div class="item-claim">
        <div class="item">
          <div class="wrap-tit">
            <div class="tit">충북대학교병원</div>
            <!-- ToDo: .tit-sub가 2개로 표기 될때는 안쪽에 span으로 나눠서 표기 -->
            <div class="tit-sub">
              <span>진료비영수증 1매</span>
              <span>통원(외래)확인서 2매</span>
            </div>
          </div>
          <div class="desc">8,000원</div>
        </div>
        <div class="item">
          <div class="wrap-tit">
            <div class="tit">서울대학교병원</div>
            <div class="tit-sub">외래진료확인서 1매</div>
          </div>
          <div class="desc">4,000원</div>
        </div>
      </div>
      <div class="item-claim">
        <div class="item">
          <div class="wrap-tit">
            <div class="tit">총 발급비용</div>
          </div>
          <div class="desc">12,000원</div>
        </div>
        <div class="item price">
          <div class="wrap-tit">
            <div class="tit-sub">포인트 사용</div>
          </div>
          <div class="desc">(-) 1,000원</div>
        </div>
      </div>
      <div class="item-claim">
        <div class="item total">
          <div class="wrap-tit">
            <div class="tit">결제금액</div>
          </div>
          <div class="desc">11,000원</div>
        </div>
      </div>
    </div>

    <div class="wrap-alert-text">
      <i class="icon-alert" alt="alert"></i>
      <div class="text">발급한 서류는 보관함에서 확인 가능해요.</div>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="보관함 바로가기" class="lg w-full medium btn-sticky" @click="clickNext" />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
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
.wrap-completed-main {
  @include mixin.flex-container(column justify-center items-center);
  img {
    width: 12.8rem;
    height: 12.8rem;
  }
  .price,
  .text {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 130%;
    text-align: center;
  }
  .price {
    margin-top: 0.8rem;
    color: #4C7FF7;
  }
}
.wrap-claim-lists {
  margin-top: 3.2rem;
  padding: 2rem;
  border: 0.1rem solid #E2E2E2;
  border-radius: 1.2rem;
  .item-claim {
    &:not(:first-child) {
      margin-top: 1.2rem;
      padding-top: 2rem;
      border-top: 0.1rem solid #EEEEEE;
    }
    .item {
      @include mixin.flex-container(justify-between items-center);
      &:not(:first-child) {
        margin-top: 1.2rem;
      }
      &.price {
        &:not(:first-child) {
          margin-top: 0.4rem;
        }
        .desc {
          color: #4C7FF7;
        }
      }
      &.total {
        .wrap-tit .tit,
        .desc {
          font-size: 1.6rem;
          font-weight: 700;
          color: #2B2B2B;
        }
      }
      .wrap-tit {
        .tit {
          font-size: 1.4rem;
          font-weight: 500;
          color: #000;
          & + .tit-sub {
            margin-top: 0.2rem;
          }
        }
        .tit-sub {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
          span {
            position: relative;
            &:not(:first-child) {
              margin-left: 1.5rem;
              display: inline-block;
              &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: -0.8rem;
                transform: translateY(-50%);
                width: 0.3rem;
                height: 0.3rem;
                background: #959595;
                border-radius: 50%;
              }
            }
          }
        }
      }
      .desc {
        font-size: 1.4rem;
        font-weight: 600;
        text-align: right;
      }
    }
  }
}
.wrap-alert-text {
  margin-top: 4.8rem;
  @include mixin.flex-container(justify-center items-center);
  gap: 0.4rem;
  .icon-alert {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
  .text {
    font-size: 1.4rem;
    color: #555555;
  }
}
</style>
