<template>
  <div class="profile-wrap">
    <div class="profile-txt">
      <div class="flex align-center">
        <p class="user-name">{{ '장동건' }}</p>
        <span class="user-badge-total">{{ badgeCount }}</span>
      </div>
      <p class="user-address">{{ '서울 금천' }}</p>
    </div>
    <div class="profile-box">
      <img v-if="profileImage" :src="profileImage" alt="프로필 이미지" />
      <img v-else :src="defaultProfile" alt="기본 프로필 이미지" />
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultProfile from '~/assets/images/badge/icon-badge-profile.svg'

interface Props {
  badgeCount: number
  profileImage?: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.profile-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0 2rem;
  .profile-txt {
    display: flex;
    flex-direction: column;
  }
  .user-name {
    font-size: 2.2rem;
    font-weight: 700;
  }
  .user-badge-total {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    margin-left: 0.8rem;
    padding: 0 1rem;
    border-radius: 1.4rem;
    background-color: #f4f4f4;
    color: var(--Semantic-Text-Body-01, #2b2b2b);
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.4rem;
    &::before {
      content: '';
      display: block;
      width: 1.8rem;
      height: 1.8rem;
      background: url(~/assets/images/badge/icon-badge-total.svg);
    }
  }
  .user-address {
    margin-top: 0.8rem;
    padding-left: 2.4rem;
    font-size: 1.4rem;
    font-weight: 500;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M10.0001 18C10.0001 18 16.261 12.4348 16.261 8.26087C16.261 4.80309 13.4579 2 10.0001 2C6.54234 2 3.73926 4.80309 3.73926 8.26087C3.73926 12.4348 10.0001 18 10.0001 18Z' stroke='%232B2B2B' stroke-width='1.5'/%3E%3Cpath d='M12.0004 8.00013C12.0004 9.1047 11.105 10.0001 10.0004 10.0001C8.89581 10.0001 8.00038 9.1047 8.00038 8.00013C8.00038 6.89556 8.89581 6.00013 10.0004 6.00013C11.105 6.00013 12.0004 6.89556 12.0004 8.00013Z' stroke='%232B2B2B' stroke-width='1.5'/%3E%3C/svg%3E")
      left center / 2rem no-repeat;
  }
  .profile-box {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }
}
</style>
