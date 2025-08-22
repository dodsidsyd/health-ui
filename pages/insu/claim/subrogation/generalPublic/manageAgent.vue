<template>
  <BaseBody
    :show-back-button="true"
    page-title="설계사 관리"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="mt-8">
      <InputText inp-type="search" placeholder="설계사 이름" />
    </div>
    <div class="wrap-manage-list">
      <div class="wrap-manage-header">
        <div class="text">총 <strong>4</strong>명</div>
        <Button btn-type="line" element-type="button" aria-label="설계사 추가등록" class="xs" icon="ico-plus" :width="13.7" />
      </div>
      <div class="manage-list">
        <div class="item">
          <div class="wrap-text">
            <div class="name">김레몬</div>
            <div class="phone">010-1234-5678</div>
          </div>
          <button class="icon-cancel">
            <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          </button>
        </div>
        <div class="item">
          <div class="wrap-text">
            <div class="name">김레몬</div>
            <div class="phone">010-1234-5678</div>
          </div>
          <button class="icon-cancel">
            <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          </button>
        </div>
        <div class="item">
          <div class="wrap-text">
            <div class="name">김레몬</div>
            <div class="phone">010-1234-5678</div>
          </div>
          <button class="icon-cancel">
            <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          </button>
        </div>
        <div class="item">
          <div class="wrap-text">
            <div class="name">김레몬</div>
            <div class="phone">010-1234-5678</div>
          </div>
          <button class="icon-cancel">
            <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          </button>
        </div>
        <div class="item">
          <div class="wrap-text">
            <div class="name">김레몬</div>
            <div class="phone">010-1234-5678</div>
          </div>
          <button class="icon-cancel">
            <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
          </button>
        </div>
      </div>
    </div>
    
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'

</script>

<style scoped lang="scss">
.wrap-manage-list {
  .wrap-manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.4rem 0;
    .text {
      font-weight: 500;
      strong {
        font-weight: 700;
      }
    }
  }
  .manage-list {
    margin: 0 -2rem;
    padding: 0 2rem;
    border-top: 0.1rem solid #EEEEEE;
    .item {
      padding: 1.6rem 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:not(:first-child) {
        border-top: 0.1rem solid #EEEEEE;}
      .wrap-text {
        .name {
          font-weight: 700;
        }
        .phone {
          margin-top: 0.1rem;
          font-size: 1.4rem;
          color: #555555;
        }
      }
      .icon-cancel {
        padding: 0.4rem;
        flex-shrink: 0;
        background-color: transparent;
        border: none;
        cursor: pointer;
        img {
          width: 2.4rem;
          height: 2.4rem;
        }
      }
    }
  }
}
</style>
