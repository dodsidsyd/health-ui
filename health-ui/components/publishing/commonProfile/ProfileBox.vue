<template>
  <div class="profile-box">
    <span class="profile-photo">
      <img src="../../../assets/images/img-community-01.png" alt="" />
    </span>
    <div class="profile-info">
      <strong class="name">{{ profileData.name }}</strong>

      <!-- Normal 타입일 때 정보 -->
      <template v-if="profileType === 'normal'">
        <div class="detail-info">
          <span class="location">{{ profileData.location }}</span>
          <span class="reward">{{ profileData.reward }}</span>
        </div>
      </template>

      <!-- Expert 타입일 때 정보 -->
      <template v-if="profileType === 'expert'">
        <div class="detail-info">
          <span class="company">{{ profileData.company }}</span>
          <span class="service_years">{{ profileData.serviceYears }}년차</span>
        </div>
      </template>
    </div>

    <!-- Normal 타입일 때 버튼 -->
    <button v-if="profileType === 'expert'" type="button" class="btn-member">
      <i class="icon ico-member" aria-label="hidden"></i>회원 프로필
    </button>

    <!-- Expert 타입일 때 버튼 -->
    <button v-if="profileType === 'normal'" type="button" class="btn-member expert">
      <i class="icon ico-ribbon" aria-label="hidden"></i>전문가 프로필
    </button>
  </div>
</template>
<script setup lang="ts">
// Profile 타입 정의
type ProfileType = 'normal' | 'expert'

// Profile 데이터 인터페이스
interface ProfileData {
  name: string
  location: string
  reward: number
  company?: string // expert 타입에서만 필요
  serviceYears?: number // expert 타입에서만 필요
}

// Props 정의
const props = withDefaults(
  defineProps<{
    profileType: ProfileType
    profileData: ProfileData
  }>(),
  {
    profileType: 'normal'
  }
)
</script>

<style lang="scss" scoped>
.profile-box {
  padding-top: 2.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 1.2rem;
  .profile-photo {
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .profile-info {
    .name {
      font-size: 1.8rem;
      font-weight: 700;
    }
    .detail-info {
      display: flex;
      flex-direction: row;
    }
    .location {
      font-size: 1.6rem;
      font-weight: 500;
      color: #555;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      &::after {
        content: '';
        width: 0.3rem;
        height: 0.3rem;
        margin: 0 0.6rem;
        border-radius: 50%;
        background: #959595;
      }
    }
    .reward {
      font-size: 1.6rem;
      color: #2b2b2b;
      font-weight: 500;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: inline-block;
        margin-right: 0.2rem;
        position: relative;
        top: 0rem;
        left: 0;
        width: 1.8rem;
        height: 1.8rem;
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 1.8rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cg clip-path='url(%23clip0_7370_24223)'%3E%3Cpath d='M7.99651 0.996003C8.58268 0.52477 9.41774 0.52477 10.0039 0.996003L11.373 2.09665C11.6114 2.28826 11.8996 2.40765 12.2036 2.44069L13.95 2.63051C14.6977 2.71179 15.2881 3.30227 15.3694 4.04996L15.5592 5.79633C15.5923 6.10036 15.7117 6.38858 15.9033 6.62693L17.0039 7.99602C17.4752 8.58219 17.4752 9.41725 17.0039 10.0034L15.9033 11.3725C15.7117 11.6109 15.5923 11.8991 15.5592 12.2031L15.3694 13.9495C15.2881 14.6972 14.6977 15.2877 13.95 15.3689L12.2036 15.5588C11.8996 15.5918 11.6114 15.7112 11.373 15.9028L10.0039 17.0034C9.41774 17.4747 8.58268 17.4747 7.99651 17.0034L6.62742 15.9028C6.38907 15.7112 6.10085 15.5918 5.79682 15.5588L4.05045 15.3689C3.30275 15.2877 2.71227 14.6972 2.631 13.9495L2.44118 12.2031C2.40813 11.8991 2.28875 11.6109 2.09714 11.3725L0.996491 10.0034C0.525258 9.41725 0.525258 8.58219 0.996492 7.99602L2.09714 6.62693C2.28875 6.38858 2.40813 6.10036 2.44118 5.79633L2.631 4.04996C2.71227 3.30227 3.30275 2.71179 4.05045 2.63051L5.79682 2.44069C6.10085 2.40765 6.38907 2.28826 6.62742 2.09665L7.99651 0.996003Z' fill='%23C4D6FF'/%3E%3Ccircle cx='9.11457' cy='8.99933' r='5.60675' fill='%234C7FF7'/%3E%3Cpath d='M11.5724 8.63841L10.143 7.85665L9.36124 6.42722C9.28961 6.29463 9.15094 6.21387 9.00007 6.21387C8.8492 6.21387 8.71205 6.29616 8.6389 6.42722L7.85713 7.85665L6.4277 8.63841C6.29512 8.71004 6.21436 8.84871 6.21436 8.99958C6.21436 9.15045 6.29665 9.2876 6.4277 9.36075L7.85713 10.1425L8.6389 11.5719C8.71053 11.7045 8.8492 11.7853 9.00007 11.7853C9.15094 11.7853 9.28809 11.703 9.36124 11.5719L10.143 10.1425L11.5724 9.36075C11.705 9.28912 11.7858 9.15045 11.7858 8.99958C11.7858 8.84871 11.705 8.71004 11.5724 8.63841Z' fill='%23C4D6FF'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_7370_24223'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
      }
    }
    .company {
      font-size: 1.6rem;
      font-weight: 500;
      color: #555;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      &::after {
        content: '';
        width: 0.3rem;
        height: 0.3rem;
        margin: 0 0.6rem;
        border-radius: 50%;
        background: #959595;
      }
    }
    .service_years {
      font-size: 1.6rem;
      color: #2b2b2b;
      font-weight: 500;
      display: flex;
      align-items: center;
    }
  }
  .btn-member {
    border: 0.1rem solid #e2e2e2;
    background: vars.$white;
    color: #555;
    font-size: 1.2rem;
    font-weight: 500;
    border-radius: 2rem;
    padding: 0.7rem 1.2rem;
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
    margin-left: auto;
    gap: 0 0.2rem;

    .icon {
      width: 1.8rem;
      display: inline-block;
      height: 1.8rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}
</style>
