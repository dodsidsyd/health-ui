<template>
  <div class="food-intake-dashboard">
    <div class="intake-amount" :class="{ collapsed: !isExpanded }">
      <button type="button" class="amount-tit" @click="toggleAmount">섭취량 일일그래프</button>

      <div class="date-box">
        <div v-for="day in days" :key="day.date" class="date-item" :class="{ today: day.today }">
          <div class="bar">
            <i
              class="current-bar"
              :style="{
                height: isExpanded ? day.progress * 100 + '%' : '0%'
              }"
            ></i>
          </div>
          <span class="date-num">{{ day.date }}</span>
        </div>
      </div>
    </div>

    <div class="calories-status">
      <div class="status-item bmr">
        <strong class="info-value">1,487</strong>
        <span class="info-txt">기초대사량</span>
      </div>
      <div class="status-item burned-calories">
        <strong class="info-value">780</strong>
        <span class="info-txt">소모칼로리</span>
      </div>
      <div class="status-item calorie-goal">
        <strong class="info-value">2,267</strong>
        <span class="info-txt">목표칼로리</span>
      </div>
    </div>

    <div class="chart-container">
      <div class="chart-wrap">
        <CalorieChart :add-calories="500" />
      </div>
      <div class="chart-info">
        <div class="chart-txt">
          <span class="time">16:30 기준</span>
          <strong class="value">2000</strong>
          <span class="value-txt">현재 섭취칼로리</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CalorieChart from '~/components/publishing/calorieIntake/CalorieChart.vue'

const isExpanded = ref(false)
const toggleAmount = () => {
  isExpanded.value = !isExpanded.value
}

// 각 날짜별 progress 값(0~1 범위) 추가
const days = [
  { date: '10', today: false, progress: 0.3 },
  { date: '11', today: false, progress: 0.45 },
  { date: '12', today: false, progress: 0.6 },
  { date: '13', today: false, progress: 0.75 },
  { date: '14', today: false, progress: 0.2 },
  { date: '15', today: false, progress: 0.5 },
  { date: '16', today: true, progress: 0.9 }
]
</script>

<style lang="scss" scoped>
.food-intake-dashboard {
  height: 49.3rem;
  margin: 0 -2rem;
  background-color: #3fccc5;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 30%;
  background-image: url('~/assets/images/calorieIntake/bg-dashboard.png');
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 20rem;
    background: linear-gradient(180deg, #4987f7 0%, rgba(73, 135, 247, 0) 100%);
  }
}

.intake-amount {
  position: absolute;
  left: 3.6rem;
  right: 3.6rem;
  top: 2.4rem;
  z-index: 10;
  padding: 0 1.6rem 2.4rem;
  max-height: 25rem;
  transition: max-height 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
  overflow: hidden;

  &.collapsed {
    max-height: 5.2rem;
    padding: 0 1.6rem;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    border-radius: 2.6rem;
    border: 0.1rem solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.04);
    backdrop-filter: blur(1rem);
  }

  .amount-tit {
    color: #fff;
    position: relative;
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    font-weight: 600;
    width: 100%;
    line-height: 5.2rem;
    align-items: center;

    &::after {
      content: '';
      display: block;
      width: 2rem;
      height: 2rem;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5.83301 8.33398L10.0004 12.1507L14.1663 8.33398' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
  }

  .date-box {
    margin-top: 0.8rem;
    height: 15.2rem;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    position: relative;
    z-index: 2;

    .date-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem 0;

      .bar {
        width: 1.6rem;
        height: 12rem;
        border-radius: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.3);
        position: relative;

        .current-bar {
          background-color: #fff;
          position: absolute;
          left: -1px;
          bottom: -1px;
          right: -1px;
          height: 0%;
          border-radius: 2rem;
          transition: height 0.6s ease-out;
        }
      }

      .date-num {
        width: 2.4rem;
        height: 2.4rem;
        text-align: center;
        line-height: 2.5rem;
        background: #fff;
        font-size: 1.1rem;
        font-weight: 400;
        color: #555;
        border-radius: 50%;
      }

      &.today {
        .bar .current-bar {
          background-color: #4987f7;
        }

        .date-num {
          color: #fff;
          background-color: #4987f7;
        }
      }
    }
  }
}

.calories-status {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 10.4rem;
  left: 0;
  right: 0;
  justify-content: space-around;

  .status-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    color: #fff;
    align-items: center;
    justify-content: center;
    position: relative;

    &::before {
      content: '';
      display: block;
      width: 3.2rem;
      height: 3.2rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      margin-bottom: 0.4rem;
    }

    &::after {
      content: '';
      width: 0.1rem;
      height: 7.2rem;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background: #fff;
      opacity: 0.3;
    }

    &.bmr::before {
      background-image: url('~/assets/images/calorieIntake/ico-fire.svg');
    }

    &.burned-calories::before {
      background-image: url('~/assets/images/calorieIntake/ico-shoe.svg');
    }

    &.calorie-goal::before {
      background-image: url('~/assets/images/calorieIntake/ico-flag.svg');
    }

    .info-value {
      font-size: 1.6rem;
      font-weight: 700;
    }

    .info-txt {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
}

.chart-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.chart-wrap {
  position: absolute;
  width: 24rem;
  bottom: 2.7rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.chart-info {
  position: absolute;
  width: 24rem;
  height: 10rem;
  left: 50%;
  color: #fff;
  text-align: center;
  transform: translateX(-50%);
  bottom: 18rem;
  display: flex;
  justify-content: center;
  text-shadow: 0.1rem 0.1rem 0.2rem #354c569a;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 10rem;
    transform: translateX(-50%);
    width: 50%;
    height: 10rem;
    background: linear-gradient(180deg, #354c56 0%, rgba(59, 161, 209, 0) 79.42%);
    filter: blur(2rem);
    opacity: 0.2;
  }

  .chart-txt {
    position: relative;
    display: flex;
    flex-direction: column;
    top: 6rem;
    gap: 0.4rem 0;

    .time {
      font-size: 1.2rem;
      font-weight: 400;
    }

    .value {
      font-size: 3.6rem;
      line-height: 1;
      font-weight: 600;
    }

    .value-txt {
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
}

@media (max-width: 450px) {
  .food-intake-dashboard {
    background-position: center 11rem;

    &::before {
      bottom: 5rem;
    }
  }
}
</style>
