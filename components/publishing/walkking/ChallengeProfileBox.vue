<template>
  <div class="profile-box">
    <span class="profile-photo">
      <img src="../../../assets/images/img-community-01.png" alt="" />
    </span>
    <div class="profile-info">
      <strong class="name">{{ profileData.name }}</strong>
      <div class="detail-info">
        <span class="location">{{ profileData.location }}</span>
        <span class="reward">{{ profileData.reward }}</span>
      </div>
    </div>
    <div class="ranking-box">
      <div class="rank-txt">
        <div
          :class="{
            unchange: true,
            up: profileData.rankUp === true,
            down: profileData.rankUp === false
          }"
        >
          {{ profileData.rank }}
        </div>
        <p class="current-rank">{{ profileData.currentRank }}위</p>
      </div>
      <div class="rank-progress">
        <div class="current-bar" :style="progressBarWidthStyle"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// Profile 데이터 인터페이스
interface ProfileData {
  rankUp?: boolean
  rank?: string
  currentRank: string
  name: string
  location: string
  reward: number
}

// Props 정의
const props = withDefaults(
  defineProps<{
    profileData: ProfileData
  }>(),
  {}
)

// 우리팀 & 1위팀 걸음 수 초기 값
const ourTeamSteps = ref(0)
const topTeamSteps = ref(0)

// onMounted 시 우리팀 & 1위팀 걸음 수
const targetOurTeamSteps = 50000
const targetTopTeamSteps = 100000

const calculatedPercentage = computed(() => {
  if (topTeamSteps.value <= 0) {
    return 0 // 0으로 나누는 것을 방지
  }
  let percentage = (ourTeamSteps.value / topTeamSteps.value) * 100
  // 백분율이 0% 미만 또는 100% 초과하는 경우를 방지
  if (percentage < 0) {
    percentage = 0
  } else if (percentage > 100) {
    percentage = 100
  }
  return percentage
})

// 프로그레스 바 너비에 적용할 스타일 객체
const progressBarWidthStyle = computed(() => {
  return {
    width: `${calculatedPercentage.value}%`
  }
})

onMounted(() => {
  setTimeout(() => {
    ourTeamSteps.value = targetOurTeamSteps
    topTeamSteps.value = targetTopTeamSteps
  }, 100)
})
</script>

<style lang="scss" scoped>
.profile-box {
  padding-top: 3.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 0.8rem;
  .profile-photo {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .profile-info {
    font-size: 1.4rem;
    font-weight: 500;
    .name {
      display: inline-block;
      margin-bottom: 0.2rem;
      font-weight: 600;
      line-height: 2rem;
    }
    .detail-info {
      display: flex;
      flex-direction: row;
    }
    .location {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      line-height: 2.4rem;
      color: #959595;
    }
    .reward {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      margin-left: 0.6rem;
      padding: 0.2rem 1rem;
      background: #f4f4f4;
      border-radius: 1.4rem;
      line-height: 2rem;
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
  }
}
.ranking-box {
  display: flex;
  flex-direction: column;
  margin-left: auto;
}
.unchange {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6rem;
  &::before {
    content: '';
    width: 1.6rem;
    height: 1.6rem;
    background-position: center;
    background-size: 1.3rem 9.1rem;
    background-repeat: no-repeat;
  }
  &.up {
    color: #f14960;
    &::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M6.65507 4.7619C7.25294 3.74603 8.74762 3.74603 9.34549 4.7619L12.9327 10.8571C13.5306 11.873 12.7832 13.1429 11.5875 13.1429H4.41305C3.21731 13.1429 2.46997 11.873 3.06784 10.8571L6.65507 4.7619Z' fill='%23F14960'/%3E%3C/svg%3E");
    }
  }
  &.down {
    color: var(--blue-primary);
    &::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M6.65507 4.7619C7.25294 3.74603 8.74762 3.74603 9.34549 4.7619L12.9327 10.8571C13.5306 11.873 12.7832 13.1429 11.5875 13.1429H4.41305C3.21731 13.1429 2.46997 11.873 3.06784 10.8571L6.65507 4.7619Z' fill='%234c7ff7'/%3E%3C/svg%3E");
      transform: rotate(180deg);
    }
  }
}
.current-rank {
  margin-left: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
}
.rank-txt {
  display: flex;
  align-items: center;
  justify-content: end;
}
.rank-progress {
  width: 10rem;
  height: 0.6rem;
  margin-top: 1.2rem;
  background-color: #eee;
  border-radius: 3rem;
}
.current-bar {
  position: relative;
  width: 0;
  height: 100%;
  background-color: var(--blue-primary);
  border-radius: 3rem;
  transition: width 0.75s ease-in-out;
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
    width: 2.4rem;
    height: 2.4rem;
    background: url(~/assets/images/walkingking/ico-current-rank.png) center / 2.4rem no-repeat;
  }
}
</style>
