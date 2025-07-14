<template>
  <div class="participant-profile-wrap">
    <button class="img-box"></button>
    <p class="user-name">추가</p>
  </div>
</template>
<style lang="scss" scoped>
.participant-profile-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  .img-box {
    width: 5.6rem;
    height: 5.6rem;
    flex-shrink: 0;
    background: #f4f4f4
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'%3E%3Cpath d='M12.7283 4.7998L12.7283 19.1998M19.9283 11.9998L5.52832 11.9998' stroke='%234C7FF7' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")
      center / 2.5rem 2.4rem no-repeat;
    border-radius: 50%;
  }
  .user-name {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #555;
  }
}
</style>
