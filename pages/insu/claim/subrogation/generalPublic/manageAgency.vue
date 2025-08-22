<template>
  <BaseBody
    :show-back-button="true"
    page-title="설계사 대리인 관리"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <!-- ToDo: 나를 등록한 대리인이 없을때 활성화 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/subrogation/icon-empty-customer.png" alt="아이콘:검색없음" />
      <div class="text">나를 등록한<br />대리인(총무/비서)이 없어요.</div>
    </div> -->
    <div class="info-list">
      <div class="item">등록된 대리인을 삭제하시면 고객정보 공유가 해제됩니다.</div>
      <div class="item">대리인에게 대리 청구 접수 이력은 공유되지 않습니다.</div>
    </div>
    <div class="wrap-manage-list">
      <div class="wrap-manage-header">
        <div class="text">총 <strong>4</strong>명</div>
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

</script>

<style scoped lang="scss">
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
.info-list {
  padding: 2rem 0;
  .item {
    position: relative;
    margin-left: 1rem;
    font-size: 1.4rem;
    color: #555555;
    &:not(:first-child) {
      margin-top: 0.8rem;
    }
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -0.7rem;
      transform: translateY(-50%);
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      border-radius: 50%;
    }
  }
}
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
