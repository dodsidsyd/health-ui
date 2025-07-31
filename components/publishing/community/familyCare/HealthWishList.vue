<template>
  <div class="health-wishList">
    <div class="wishList-tit">
      <h4 class="tit">건강 위시리스트</h4>
    </div>
    <div class="wish-item-list">
      <div class="wish-item">
        <div class="gift-info">
          <div class="gift-txt">
            <p>
              아빠 요즘 오메가3 먹는데<br />
              패키지 선물해줄 사람~
            </p>
            <nuxt-link to="javascript:void(0)" class="gift-link">상품보기</nuxt-link>
          </div>
          <span class="img-wrap"><img src="~/assets/images/community/img-rank-profile.png" alt="" /></span>
        </div>

        <Button element-type="button" aria-label="선물하기" class="sm" />
      </div>

      <div class="wish-item">
        <div class="gift-info">
          <div class="gift-txt">
            <p>
              나 이거 갖고싶어!<br />
              사주꾸야?
            </p>
            <nuxt-link to="javascript:void(0)" class="gift-link">상품보기</nuxt-link>
          </div>
          <span class="img-wrap"><img src="~/assets/images/community/img-add-groupBanner.png" alt="" /></span>
        </div>

        <Button element-type="button" aria-label="큰 딸이 선물했어요!" class="sm" disabled />
      </div>
    </div>

    <button type="button" class="btn-add-wishList mb-12" @click="clickWishItemModal">
      <i class="icon ico-plus-lg"></i>위시리스트 추가하기
    </button>

    <Teleport to="body">
      <BottomModal
        :is-visible="isShowWishItemModal"
        title="갖고싶은 위시리스트를 공유해요!"
        :is-show-close-button="true"
        :is-show-cancel-button="true"
        :is-show-confirm-button="true"
        confirm-button-text="추가하기"
        cancel-button-text="취소하기"
        @close="toggleWishItemModal"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <template #content>
          <div class="wishList-form">
            <FieldSet :placeholder="'갖고 싶은 선물 메모를 작성해 주세요.'" />
            <InputText placeholder="선물 링크를 넣어주세요" />
            <InputFile />
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import Button from '~/components/publishing/button/Button.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import FieldSet from '~/components/publishing/input/FieldSet.vue'
import InputFile from '~/components/publishing/input/InputFile.vue'

// 모달 상태 관리
const isShowWishItemModal = ref(false)

const clickWishItemModal = () => {
  toggleWishItemModal()
}

const toggleWishItemModal = () => {
  isShowWishItemModal.value = !isShowWishItemModal.value
}
</script>

<style scoped lang="scss">
.health-wishList {
  margin-top: 3.2rem;
  .wishList-tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;

    .tit {
      font-size: 2rem;
      font-weight: 700;
      color: #2b2b2b;
    }
  }
  .wish-item-list {
    display: flex;
    flex-direction: column;
    gap: 2rem 0;
    .wish-item {
      display: flex;
      flex-direction: column;
      gap: 2rem 0;
      width: 100%;
      position: relative;
      padding: 2.4rem 2rem;
      border-radius: 2rem;
      border: 0.1rem solid #e2e2e2;
      background: vars.$white;
      box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
      .gift-info {
        display: flex;
        justify-content: space-between;
        .gift-txt {
          display: flex;
          flex-direction: column;
          gap: 1.2rem 0;

          p {
            font-size: 1.6rem;
            font-weight: 500;
            color: #2b2b2b;
          }
          .gift-link {
            display: flex;
            gap: 0 0.5rem;
            color: vars.$blue-primary;
            font-size: 1.6rem;
            font-weight: 400;
            &::before {
              content: '';
              width: 2rem;
              height: 2rem;
              background-size: 2rem;
              background-repeat: no-repeat;
              background-position: center;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M6.14851 8.49213L4.2873 10.3533C3.59219 11.0484 3.19246 11.9943 3.19976 12.9883C3.20707 13.9823 3.59805 14.9338 4.32615 15.6395C5.03172 16.3676 5.98349 16.7585 6.97734 16.7658C7.99386 16.7733 8.91728 16.3961 9.61243 15.701L11.4736 13.8398M13.851 11.5079L15.7122 9.64668C16.4073 8.95157 16.807 8.00577 16.7997 7.01176C16.7924 6.01774 16.4015 5.06617 15.6734 4.36056C14.968 3.65516 14.0163 3.26415 13.0223 3.25684C12.0283 3.24954 11.0824 3.62658 10.3872 4.32171L8.52603 6.18293M7.17734 12.7726L12.761 7.18901' stroke='%234C7FF7' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            }
          }
        }
        .img-wrap {
          width: 8rem;
          height: 8rem;
          background: #f4f4f4;
          border-radius: 1.2rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }
}

.btn-add-wishList {
  position: relative;
  border-radius: 3.2rem;
  padding: 0.7rem 1.6rem;
  border: 0.1rem solid #e2e2e2;
  background: vars.$white;
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 0.4rem;
  margin-top: 1.2rem;
  justify-self: center;
  @include mixin.rippleEffectPrimary;
  .icon {
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
  }
}

.wishList-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem 0;
  margin-bottom: 1.6rem;
}

.btn-attach {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  height: 5.6rem;
  padding: 0 1.8rem;
  border-radius: 0.8rem;
  background-color: #f9f9f9;
  color: #555;
  font-size: 1.4rem;
  font-weight: 500;
  border: 0.1rem dashed var(--Semantic-Border-BRD-01, #e2e2e2);
  [type='file'] {
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
