<template>
  <div class="schedule-item" :class="{ 'is-expanded': isExpanded }">
    <button type="button" class="btn-schedule-collapse" @click="toggleSchedule">
      <div class="tit">{{ schedule.title }}</div>
      <div class="schdule-time">{{ formatScheduleTime(schedule.scheduleDate) }}</div>
      <div v-if="!isExpanded" class="representative-info">
        <span class="member-box">
          <img :src="getFirstMemberImage" :alt="getFirstMemberName" />
          <strong>{{ getRepresentativeText }}</strong>
        </span>
      </div>
    </button>
    <div class="schedule-member-box">
      <div class="schedule-member">
        <span v-for="member in schedule.members" :key="member.id" class="member-box">
          <img :src="getMemberImage(member.profileImage)" :alt="member.name" />
          <strong>{{ member.name }}</strong>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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

interface Props {
  schedule: Schedule
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'view-detail': [scheduleId: string]
  'edit-schedule': [scheduleId: string]
  'delete-schedule': [scheduleId: string]
}>()

// 확장 상태 관리
const isExpanded = ref(false)

// 토글 함수
const toggleSchedule = () => {
  isExpanded.value = !isExpanded.value
}

// 날짜 포맷팅
const formatScheduleTime = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: undefined
  }
  
  const formatted = date.toLocaleDateString('ko-KR', options)
  
  // 오전/오후 처리
  const hours = date.getHours()
  const period = hours < 12 ? '오전' : '오후'
  const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  
  return formatted.replace(/\s(\d+)시/, ` ${period} ${displayHour}시`)
}

// 기본 프로필 이미지 경로
const defaultProfileImage = '~/assets/images/img-community-01.png'

// 멤버 이미지 가져오기
const getMemberImage = (profileImage?: string) => {
  return profileImage || defaultProfileImage
}

// 첫 번째 멤버 정보
const getFirstMemberName = computed(() => {
  return props.schedule.members[0]?.name || '참여자'
})

const getFirstMemberImage = computed(() => {
  return getMemberImage(props.schedule.members[0]?.profileImage)
})

// 대표 텍스트 (예: "아빠 외 5명")
const getRepresentativeText = computed(() => {
  const memberCount = props.schedule.members.length
  if (memberCount === 1) {
    return props.schedule.members[0].name
  }
  return `${props.schedule.members[0].name} 외 ${memberCount - 1}명`
})

// 상세보기
const viewDetail = () => {
  emit('view-detail', props.schedule.id)
}

// 일정 수정
const editSchedule = () => {
  emit('edit-schedule', props.schedule.id)
}

// 일정 삭제
const deleteSchedule = () => {
  emit('delete-schedule', props.schedule.id)
}
</script>

<style scoped lang="scss">
.schedule-item {
  border-bottom: 0.1rem solid #eee;
  padding: 2rem 0;

  &.is-expanded {
    .btn-schedule-collapse {
      &:after {
        transform: rotate(0deg);
      }
    }

    .schedule-member {
      max-height: 200px;
      opacity: 1;
      padding-top: 1.2rem;
      transform: translateY(0);
    }
  }
}
.btn-schedule-collapse {
  display: flex;
  flex-direction: column;
  gap: 0.8rem 0;
  justify-content: flex-start;
  padding-right: 5.6rem;
  width: 100%;
  text-align: left;
  position: relative;
  .tit {
    font-size: 1.8rem;
    font-weight: 500;
    color: #2b2b2b;
  }
  .schdule-time {
    font-size: 1.4rem;
    font-weight: 500;
    color: #959595;
  }
  &:after {
    content: '';
    position: absolute;
    width: 2.4rem;
    height: 2.4rem;
    top: 0.2rem;
    right: 0;
    transform: rotate(180deg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='none'%3E%3Cpath d='M7 14.5L12 9.5L17 14.5' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .representative-info {
    position: absolute;
    right: 3.2rem;
    top: 0.3rem;

    .member-box {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.8rem 0;
    }
    img {
      width: 2.4rem;
      height: 2.4rem;
      object-fit: contain;
      border-radius: 50%;
    }
    strong {
      font-size: 1.4rem;
      font-weight: 500;
      color: #555;
    }
  }
}
.schedule-member {
  padding-top: 0;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  transform: translateY(-10px);
  transition:
    max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.35s ease 0.1s,
    padding-top 0.3s ease 0.05s,
    transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s;
  .member-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
    gap: 0.4rem 0;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
    strong {
      font-size: 1.4rem;
      font-weight: 500;
      color: #555;
    }
  }
}
</style>
