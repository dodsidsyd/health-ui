<template>
  <div class="dm-profile">
    <span class="profile-img">
      <img src="~/assets/images/img-community-01.png" alt="" />
    </span>
    <div class="profile">
      <strong class="user-name">장두시기</strong>
      <span class="location-info">서울 강남</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dm-profile {
  display: flex;
  flex-direction: row;
  .profile-img {
    overflow: hidden;
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .profile {
    align-self: center;
    display: flex;
    flex-direction: column;
    margin-left: 0.8rem;
    .user-name {
      font-size: 1.8rem;
      font-weight: 700;
      color: #2b2b2b;
      line-height: 140%;
    }
    .location-info {
      font-size: 1.4rem;
      color: #555;
      font-weight: 500;
      line-height: 140%;
    }
  }
}
</style>
