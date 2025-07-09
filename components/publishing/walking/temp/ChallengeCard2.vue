<template>
  <div class="challenge-card">
    <!-- 모집 상태 표시 -->
    <div v-if="recruitmentDays" class="challenge-card__recruitment">
      <div class="challenge-card__recruitment-box">
        <div class="challenge-card__days">D-{{ recruitmentDays }}</div>
        <div class="challenge-card__days-label">모집중</div>
      </div>
      <div class="challenge-card__recruitment-triangle"></div>
    </div>

    <!-- 챌린지 정보 -->
    <div class="challenge-card__content">
      <!-- 태그 영역 -->
      <div class="challenge-card__tags">
        <div
          v-for="(tag, index) in tags"
          :key="index"
          class="challenge-card__tag"
          :class="`challenge-card__tag--${tag.color}`"
        >
          {{ tag.text }}
        </div>
      </div>

      <!-- 제목과 기간 -->
      <div class="challenge-card__header">
        <div class="challenge-card__title">{{ title }}</div>
        <div class="challenge-card__period">{{ period }}</div>
      </div>

      <!-- 상금과 참가자 정보 -->
      <div class="challenge-card__info">
        <div class="challenge-card__info-item">
          <div class="challenge-card__info-label">총 상금</div>
          <div class="challenge-card__info-value">{{ totalPrize }}P</div>
          <div v-if="prizeChange" class="challenge-card__info-change">+{{ prizeChange }}</div>
        </div>
        <div class="challenge-card__info-item">
          <div class="challenge-card__info-label">참가자</div>
          <div class="challenge-card__info-value">{{ participants }}명</div>
        </div>
      </div>
    </div>

    <!-- 챌린지 이미지 -->
    <div class="challenge-card__image">
      <div class="challenge-card__image-glow"></div>
      <img :src="imageUrl" :alt="title" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tag {
  text: string
  color: 'blue' | 'yellow' | 'orange'
}

interface Props {
  title: string
  period: string
  recruitmentDays?: number
  tags: Tag[]
  totalPrize: number
  prizeChange?: number
  participants: number
  imageUrl: string
}

defineProps<Props>()
</script>

<style scoped>
.challenge-card {
  width: 100%;
  height: 100%;
  padding: 28px 20px;
  position: relative;
  background: white;
  box-shadow: 0px 0px 23px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  outline: 1px #eeeeee solid;
  outline-offset: -1px;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
}

.challenge-card__recruitment {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
}

.challenge-card__recruitment-box {
  width: 48px;
  padding: 8px 12px;
  background: var(--Scheme-Blue-200, #b7ccfc);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.challenge-card__days {
  color: var(--Semantic-Text-Body-01, #2b2b2b);
  font-size: 13px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 18.2px;
  text-align: center;
}

.challenge-card__days-label {
  color: var(--Semantic-Text-Body-01, #2b2b2b);
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 15.6px;
  text-align: center;
}

.challenge-card__recruitment-triangle {
  width: 48px;
  height: 18px;
  transform: rotate(-180deg);
  transform-origin: top left;
  background: var(--Scheme-Blue-200, #b7ccfc);
}

.challenge-card__content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.challenge-card__tags {
  display: flex;
  gap: 4px;
}

.challenge-card__tag {
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

.challenge-card__tag--blue {
  background: #e5edff;
  color: var(--Semantic-Text-Positive-01, #4c7ff7);
}

.challenge-card__tag--yellow {
  background: var(--Scheme-Yellow-100, #fef4cc);
  color: #8d7000;
}

.challenge-card__tag--orange {
  background: #ffecdb;
  color: #e75126;
}

.challenge-card__header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.challenge-card__title {
  color: var(--Semantic-Text-Headline, #2b2b2b);
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 26px;
}

.challenge-card__period {
  color: var(--Semantic-Text-Body-02, #555555);
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 19.6px;
}

.challenge-card__info {
  display: flex;
  gap: 20px;
}

.challenge-card__info-item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.challenge-card__info-label {
  color: var(--Semantic-Text-Body-02, #555555);
  font-size: 13px;
  font-family: Pretendard;
  font-weight: 400;
  line-height: 18.2px;
}

.challenge-card__info-value {
  color: var(--Semantic-Text-Headline, #2b2b2b);
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 19.6px;
}

.challenge-card__info-change {
  position: absolute;
  right: -1px;
  top: 42px;
  color: var(--Semantic-Text-Negative, #f14960);
  font-size: 11px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 15.4px;
  text-align: right;
}

.challenge-card__image {
  width: 180px;
  height: 220px;
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
}

.challenge-card__image-glow {
  width: 162.88px;
  height: 83.29px;
  position: absolute;
  left: 34px;
  top: 126.74px;
  transform: rotate(-26deg);
  transform-origin: top left;
  opacity: 0.2;
  background: #ffc249;
  box-shadow: 70px 70px 70px;
  border-radius: 9999px;
  filter: blur(35px);
}

.challenge-card__image img {
  width: 160px;
  height: 160px;
  position: absolute;
  left: 20px;
  top: 40px;
}
</style>
