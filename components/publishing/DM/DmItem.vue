<template>
  <div class="dm-item-wrap">
    <span class="profile-img">
      <img src="../../../assets/images/img-community-01.png" alt="" />
    </span>
    <div class="message-info">
      <strong class="name">장두시기</strong>
      <p class="message-text">
        안녕하세요. 함께 걸어서 좋아요 앞으로 함께 걸어서 좋아요 앞으로 함께 걸어서 좋아요 앞으로 함께 걸어서 좋아요
        앞으로
      </p>
    </div>
    <div class="message-status">
      <span class="received-time">5분전</span>
      <strong class="message-length">999</strong>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dm-item-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1.6rem 0;
  border-bottom: 0.1rem solid #eee;
  cursor: pointer;
  .profile-img {
    flex: 0 0 auto;
    width: 6.4rem;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 1.2rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .message-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    margin-right: 1.2rem;
    align-self: center;
    .name {
      font-size: 1.8rem;
      font-weight: 700;
      color: #2b2b2b;
      @include mixin.textClip;
    }
    .message-text {
      font-size: 1.4rem;
      font-weight: 500;
      color: #555;
      word-break: break-all;
      @include mixin.textClip;
    }
  }
  .message-status {
    margin-left: auto;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    align-items: flex-end;
    align-self: center;
    font-size: 0;
    .received-time {
      font-size: 1.4rem;
      color: #555;
      font-weight: 400;
      line-height: 2rem;
      margin-bottom: 0.4rem;
    }
    .message-length {
      font-size: 1.2rem;
      font-weight: 600;
      color: vars.$white;
      line-height: 2rem;
      padding: 0 0.8rem;
      border-radius: 1.2rem;
      background: #f14960;
    }
  }
}
</style>
