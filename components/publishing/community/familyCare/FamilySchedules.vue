<template>
  <div class="family-schedule">
    <div class="schedule-tit">
      <h4 class="tit">패밀리 일정</h4>
      <nuxt-link to="javascript:void(0)" title="패밀리 스케쥴 페이지로 이동">
        <i class="icon arrow-type-black" aria-hidden="true"></i>
      </nuxt-link>
    </div>

    <!-- 일정이 있을 때 -->
    <div v-if="familyScheduleList.length > 0" class="schedule-item-list">
      <FamilyScheduleItem v-for="schedule in familyScheduleList" :key="schedule.id" :schedule="schedule" />
      <button type="button" class="btn-add-schedule mb-12"><i class="icon ico-plus-lg"></i>일정 추가하기</button>
    </div>

    <!-- 일정이 없을 때 -->
    <EmptyState
      v-else
      class="mt-12"
      empty-title="아직 일정이 없어요"
      href="/community"
      :button="true"
      button-aria-label="일정 추가하기"
      button-icon="ico-plus-lg"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FamilyScheduleItem from '~/components/publishing/community/familyCare/FamilyScheduleItem.vue'
import EmptyState from '~/components/publishing/community/common/EmptyState.vue'

import communityImg01 from '~/assets/images/img-community-01.png'

interface Member {
  id: string
  name: string
  profileImage?: string
}

interface Schedule {
  id: string
  title: string
  scheduleDate: string
  members: Member[]
  location?: string
  description?: string
}

// 패밀리 일정 리스트 데이터
const familyScheduleList = ref<Schedule[]>([
  {
    id: '1',
    title: '치과 임플란트 예약',
    scheduleDate: '2024-04-17T13:00:00',
    location: '서울 강남구 치과',
    description: '정기 검진 및 임플란트 상담',
    members: [
      { id: 'm1', name: '아빠', profileImage: communityImg01 },
      { id: 'm2', name: '엄마', profileImage: communityImg01 },
      { id: 'm3', name: '김동건', profileImage: communityImg01 },
      { id: 'm4', name: '김서연', profileImage: communityImg01 },
      { id: 'm5', name: '김민준', profileImage: communityImg01 },
      { id: 'm6', name: '김지우', profileImage: communityImg01 }
    ]
  },
  {
    id: '2',
    title: '가족 저녁 식사',
    scheduleDate: '2024-04-20T18:30:00',
    location: '강남역 한식당',
    description: '할머니 생신 축하 저녁 식사',
    members: [
      { id: 'm1', name: '할머니', profileImage: communityImg01 },
      { id: 'm2', name: '아빠', profileImage: communityImg01 },
      { id: 'm3', name: '엄마', profileImage: communityImg01 },
      { id: 'm4', name: '나' }
    ]
  },
  {
    id: '3',
    title: '주말 캠핑',
    scheduleDate: '2024-05-01T10:00:00',
    location: '가평 캠핑장',
    description: '봄 가족 캠핑',
    members: [
      { id: 'm1', name: '아빠', profileImage: communityImg01 },
      { id: 'm2', name: '엄마', profileImage: communityImg01 },
      { id: 'm3', name: '큰아들', profileImage: communityImg01 },
      { id: 'm4', name: '작은딸', profileImage: communityImg01 }
    ]
  }
])
</script>

<style scoped lang="scss">
.family-schedule {
  margin-top: 3.2rem;
  position: relative;
  .schedule-tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;

    .tit {
      font-size: 2rem;
      font-weight: 700;
      color: #2b2b2b;
    }
    .icon {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .schedule-item-list {
    padding-top: 2rem;

    &.no-schedule {
      width: 100%;
      height: 14.2rem;
      background: #f4f4f4;
      border-radius: 1.2rem;
      padding-top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;

      &:after {
        content: '아직 일정이 없어요';
        text-align: center;
        display: block;
        font-size: 1.6rem;
        color: #959595;
        font-weight: 500;
        position: absolute;
        top: 3.4rem;
        left: 50%;
        transform: translateX(-50%);
      }

      .btn-add-schedule {
        position: absolute;
        bottom: 2rem;
        margin-top: 0;
      }
    }
  }
}
.btn-add-schedule {
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
  margin-left: auto;
  margin-right: auto;
  @include mixin.rippleEffectPrimary;
  .icon {
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
  }
}
</style>
