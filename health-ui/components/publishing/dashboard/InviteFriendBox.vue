<template>
  <div class="invite-friend-box">
    <div class="text-wrap">
      <strong class="tit">7명의 친구들과 함께 걷고 있어요!</strong>
      <span class="sub-tit">더 많은 친구들과 함께 건강해지세요.</span>
    </div>

    <div class="btn-wrap">
      <button type="button" class="c-btn btn-dark">친구초대</button>
      <button type="button" class="c-btn btn-primary">친구와 걷기게임하기</button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.invite-friend-box {
  background: #e7f4ff;
  border-radius: 1.2rem;
  padding: 0 2rem 2.4rem;
  &::before {
    content: '';
    display: block;
    position: relative;
    margin: auto;
    width: 16.2rem;
    height: 12.2rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('~/assets/images/dashboard/img-handShake.svg');
  }
  .text-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 500;
    .tit {
      font-weight: 700;
      color: #2b2b2b;
    }
  }
  .btn-wrap {
    display: flex;
    flex-direction: row;
    gap: 0 0.8rem;
    margin-top: 1.6rem;
    .btn-dark {
      flex: 0 0 40%;
      border-radius: 0.6rem;
      max-width: 12rem;
      font-size: 1.6rem;
      font-weight: 500;
      height: 4.8rem;
      align-items: center;
      color: vars.$white;
      @include mixin.rippleEffectWhite;
      background-color: #4f5561;
    }
    .btn-primary {
      flex: 1 1 100%;
      border-radius: 0.6rem;
      font-size: 1.6rem;
      font-weight: 500;
      height: 4.8rem;
      align-items: center;
      color: vars.$white;
      @include mixin.rippleEffectWhite;
      background-color: vars.$blue-primary;
    }
  }
}
</style>
