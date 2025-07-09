<template>
  <div class="challenge-main-card">
    <!-- 모집 상태 표시 -->
    <div v-if="recruitmentDays" class="challenge-main-card__recruitment">
      <div class="challenge-main-card__recruitment-box">
        <div class="challenge-main-card__days">D-{{ recruitmentDays }}</div>
        <div class="challenge-main-card__days-label">모집중</div>
      </div>
      <div class="challenge-main-card__recruitment-triangle"></div>
    </div>

    <!-- 태그 영역 -->
    <div class="challenge-main-card__tags">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="challenge-main-card__tag"
        :class="`challenge-main-card__tag--${tag.color}`"
      >
        {{ tag.text }}
      </div>
    </div>

    <!-- 제목과 기간 -->
    <div class="challenge-main-card__header">
      <div class="challenge-main-card__title">{{ title }}</div>
      <div class="challenge-main-card__period">{{ period }}</div>
    </div>

    <!-- 상금과 참가자 정보 -->
    <div class="challenge-main-card__info">
      <div class="challenge-main-card__info-card">
        <div class="challenge-main-card__info-label">총 상금</div>
        <div class="challenge-main-card__info-value">{{ totalPrize }}P</div>
        <div v-if="prizeChange" class="challenge-main-card__info-change">+{{ prizeChange }}</div>
      </div>
      <div class="challenge-main-card__info-card">
        <div class="challenge-main-card__info-label">참가자</div>
        <div class="challenge-main-card__info-value">{{ participants }}명</div>
        <div v-if="participantsChange" class="challenge-main-card__info-change">+{{ participantsChange }}</div>
      </div>
    </div>

    <!-- 챌린지 이미지 -->
    <div class="challenge-main-card__image">
      <div class="challenge-main-card__image-glow"></div>
      <img :src="imageUrl" :alt="title" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tag {
  text: string
  color: 'blue' | 'yellow' | 'purple'
}

interface Props {
  title: string
  period: string
  recruitmentDays?: number
  tags: Tag[]
  totalPrize: number
  prizeChange?: number
  participants: number
  participantsChange?: number
  imageUrl: string
}

defineProps<Props>()
</script>

<style scoped>
.challenge-main-card {
  width: 100%;
  height: 100%;
  position: relative;
  background: #dae7f1;
  overflow: hidden;
  border-radius: 20px;
}

.challenge-main-card__recruitment {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
}

.challenge-main-card__recruitment-box {
  width: 48px;
  padding: 8px 12px;
  background: var(--Scheme-Blue-200, #b7ccfc);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.challenge-main-card__days {
  color: var(--Semantic-Text-Body-01, #2b2b2b);
  font-size: 13px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 18.2px;
  text-align: center;
}

.challenge-main-card__days-label {
  color: var(--Semantic-Text-Body-01, #2b2b2b);
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 15.6px;
  text-align: center;
}

.challenge-main-card__recruitment-triangle {
  width: 48px;
  height: 18px;
  transform: rotate(-180deg);
  transform-origin: top left;
  background: var(--Scheme-Blue-200, #b7ccfc);
}

.challenge-main-card__tags {
  position: absolute;
  left: 20px;
  top: 32px;
  display: flex;
  gap: 4px;
}

.challenge-main-card__tag {
  height: 22px;
  padding: 3px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 15.6px;
}

.challenge-main-card__tag--blue {
  background: #e5edff;
  color: var(--Semantic-Text-Positive-01, #4c7ff7);
}

.challenge-main-card__tag--yellow {
  background: var(--Scheme-Yellow-100, #fef4cc);
  color: #8d7000;
}

.challenge-main-card__tag--purple {
  background: #e7e3ff;
  color: #6449fc;
}

.challenge-main-card__header {
  position: absolute;
  left: 20px;
  top: 70px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.challenge-main-card__title {
  color: var(--Semantic-Text-Headline, #2b2b2b);
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 28.6px;
}

.challenge-main-card__period {
  color: var(--Semantic-Text-Body-02, #555555);
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 19.6px;
}

.challenge-main-card__info {
  position: absolute;
  left: 20px;
  top: 168px;
  width: 313px;
  display: flex;
  gap: 12px;
}

.challenge-main-card__info-card {
  flex: 1;
  padding: 16px 20px 12px;
  background: white;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.challenge-main-card__info-label {
  color: var(--Semantic-Text-Body-02, #555555);
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 15.6px;
}

.challenge-main-card__info-value {
  color: var(--Semantic-Text-Body-01, #2b2b2b);
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 22.4px;
}

.challenge-main-card__info-change {
  color: var(--Semantic-Text-Negative, #f14960);
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 15.6px;
}

.challenge-main-card__image {
  width: 180px;
  height: 220px;
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
}

.challenge-main-card__image-glow {
  width: 162.88px;
  height: 83.29px;
  position: absolute;
  left: 34px;
  top: 126.74px;
  transform: rotate(-26deg);
  transform-origin: top left;
  opacity: 0.2;
  background: #4c7ff7;
  box-shadow: 70px 70px 70px;
  border-radius: 9999px;
  filter: blur(35px);
}

.challenge-main-card__image img {
  width: 160px;
  height: 160px;
  position: absolute;
  left: 20px;
  top: 40px;
}
</style>
