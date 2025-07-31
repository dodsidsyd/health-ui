<template>
  <div class="family-talk">
    <div class="family-talk-tit">
      <h4 class="tit">패밀리 대화</h4>
    </div>
    <div class="family-dm-list">
      <div class="list-item">
        <img src="~/assets/images/community/img-rank-profile.png" alt="" />
        <div class="item-text">
          <strong>동생님이</strong>
          <p><strong>감기약 복용</strong> 완료했어요</p>
        </div>
        <span class="date-txt">오늘</span>
      </div>
      <div class="list-item">
        <img src="~/assets/images/community/img-rank-profile.png" alt="" />
        <div class="item-text">
          <strong>동생님이</strong>
          <p><strong>감기약 복용</strong> 완료했어요</p>
        </div>
        <span class="date-txt">오늘</span>
      </div>
      <div class="list-item now-talking">
        <img src="~/assets/images/community/img-rank-profile.png" alt="" />
        <div class="item-text">
          <strong>사위</strong>
          <p>미션완료 안한 사람들 어서 해요</p>
        </div>
        <span class="date-txt">오늘</span>
      </div>
    </div>
    <button type="button" class="btn-message mb-12"><i class="icon ico-message"></i>대화 쓰기</button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.family-talk {
  margin-top: 3.2rem;
  .family-talk-tit {
    .tit {
      font-size: 2rem;
      font-weight: 700;
    }
  }
}
.family-dm-list {
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem 0;
  .list-item {
    position: relative;
    padding: 2rem;
    border-radius: 2rem;
    border: 0.1rem solid #e2e2e2;
    background: vars.$white;
    box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
    display: flex;
    gap: 0 1.2rem;
    &.now-talking {
      border-color: vars.$blue-primary;
    }
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      object-fit: cover;
    }
    .date-txt {
      position: absolute;
      right: 2rem;
      top: 2rem;
      color: #959595;
      font-size: 1.4rem;
      font-weight: 500;
    }
    .item-text {
      color: #555;
      p {
        strong {
          color: vars.$blue-primary;
        }
      }
    }
    &.now-talking {
      .item-text {
        strong {
          display: flex;
          align-items: center;
          gap: 0 0.4rem;
          &::after {
            content: '';
            display: block;
            width: 1.6rem;
            height: 1.6rem;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M13.4892 10.4237C13.8169 9.68253 13.9989 8.86252 13.9989 8C13.9989 4.68629 11.3128 2 7.99943 2C4.68604 2 2 4.68629 2 8C2 11.3137 4.68604 14 7.99943 14C9.06621 14 10.068 13.7215 10.936 13.2334L14 13.9994L13.4892 10.4237Z' fill='%239EAAC2'/%3E%3C/svg%3E");
          }
        }
      }
    }
  }
}
.btn-message {
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
</style>
