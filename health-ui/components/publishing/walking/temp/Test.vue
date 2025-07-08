<template>
  <div class="calorie-card">
    <div class="calorie-card__main">
      <div class="calorie-card__intake">
        <div class="calorie-card__intake-wrapper">
          <div class="calorie-card__label">섭취칼로리</div>
          <div class="calorie-card__value-wrapper">
            <div class="calorie-card__value calorie-card__value--large">{{ intakeCalorie }}</div>
            <div class="calorie-card__unit">kcal</div>
          </div>
        </div>
      </div>
      <div class="calorie-card__details">
        <div class="calorie-card__detail-item">
          <div class="calorie-card__label">기초대사량</div>
          <div class="calorie-card__value-group">
            <div class="calorie-card__value">{{ basalMetabolicRate }}</div>
            <div class="calorie-card__unit">kcal</div>
          </div>
        </div>
        <div class="calorie-card__detail-item">
          <div class="calorie-card__label">소모칼로리</div>
          <div class="calorie-card__value-group">
            <div class="calorie-card__value">{{ burnedCalorie }}</div>
            <div class="calorie-card__unit">kcal</div>
          </div>
        </div>
        <div class="calorie-card__detail-item">
          <div class="calorie-card__label">목표칼로리</div>
          <div class="calorie-card__value-group">
            <div class="calorie-card__value">{{ targetCalorie }}</div>
            <div class="calorie-card__unit">kcal</div>
          </div>
        </div>
      </div>
    </div>
    <div class="calorie-card__footer">
      <div class="calorie-card__time-info">
        <div class="calorie-card__time">{{ currentTime }} 기준</div>
        <div class="calorie-card__target-range">목표범위 {{ targetRangeMin }} ~ {{ targetRangeMax }}kcal</div>
      </div>
      <div class="calorie-card__progress">
        <div class="calorie-card__progress-bar">
          <div class="calorie-card__progress-background"></div>
          <div class="calorie-card__progress-current" :style="{ width: `${(intakeCalorie / targetCalorie) * 100}%` }">
            <span class="calorie-card__progress-text">{{ intakeCalorie }}</span>
          </div>
        </div>
        <div class="calorie-card__progress-labels">
          <div class="calorie-card__progress-label">0</div>
          <div class="calorie-card__progress-label calorie-card__progress-label--bold">{{ targetRangeMin }}</div>
          <div class="calorie-card__progress-label">{{ burnedCalorie }}</div>
          <div class="calorie-card__progress-label calorie-card__progress-label--bold">{{ targetRangeMax }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  intakeCalorie: number
  basalMetabolicRate: number
  burnedCalorie: number
  targetCalorie: number
  currentTime: string
  targetRangeMin: number
  targetRangeMax: number
}

defineProps<Props>()
</script>

<style scoped>
.calorie-card {
  width: 100%;
  height: 100%;
  padding: 30px 25px;
  background: #eeeeee;
  border-radius: 10px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.calorie-card__main {
  align-self: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 35px;
}

.calorie-card__intake {
  width: 120px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.calorie-card__intake-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.calorie-card__details {
  flex: 1 1 0;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
}

.calorie-card__detail-item {
  align-self: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}

.calorie-card__label {
  width: 70px;
  height: 8px;
  color: #999999;
  font-size: 11px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.calorie-card__value-group {
  flex: 1 1 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
}

.calorie-card__value {
  color: #111111;
  font-size: 15px;
  font-family: 'Noto Sans', sans-serif;
  font-weight: 700;
  line-height: 20px;
}

.calorie-card__value--large {
  font-size: 32px;
}

.calorie-card__unit {
  color: #111111;
  font-size: 11px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  line-height: 20px;
}

.calorie-card__footer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 5px;
}

.calorie-card__time-info {
  align-self: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
}

.calorie-card__time,
.calorie-card__target-range {
  flex: 1 1 0;
  color: #999999;
  font-size: 11px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  line-height: 20px;
}

.calorie-card__target-range {
  text-align: right;
}

.calorie-card__progress {
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
}

.calorie-card__progress-bar {
  width: 360px;
  height: 18px;
  padding: 5px 7px;
  background: #dddddd;
  position: relative;
}

.calorie-card__progress-background {
  width: 100%;
  height: 100%;
  background: #dddddd;
}

.calorie-card__progress-current {
  height: 18px;
  padding: 5px 7px;
  background: var(--MainColor, #2f6af2);
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 0;
  top: 0;
}

.calorie-card__progress-text {
  color: white;
  font-size: 10px;
  font-family: 'Noto Sans', sans-serif;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
}

.calorie-card__progress-labels {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.calorie-card__progress-label {
  color: #999999;
  font-size: 10px;
  font-family: 'Noto Sans', sans-serif;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
}

.calorie-card__progress-label--bold {
  color: #111111;
  font-weight: 700;
}
</style>
