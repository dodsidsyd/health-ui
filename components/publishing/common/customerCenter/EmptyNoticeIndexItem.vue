<template>
  <div class="empty-notice-wrap">
    <div class="empty-notice-box">
      <div class="empty-image"></div>
      <p>No Data 메시지 영역입니다.</p>
      <span>No Data 메시지 영역입니다.</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.empty-notice-wrap {
  position: relative;
  flex: 1;
  .empty-notice-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  .empty-image {
    width: 8rem;
    height: 8rem;
    background: url('~/assets/images/insu/icon-empty.svg') no-repeat center center;
  }
  p {
    margin: 1.6rem 0 0.8rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.5rem;
    color: #555;
  }
  span {
    line-height: 2.2rem;
    color: #555;
  }
}
</style>
