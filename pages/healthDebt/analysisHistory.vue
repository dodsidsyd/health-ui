<template>
  <BaseBody page-title="레몬건강지수 분석이력" :show-back-button="true">
    <!-- <div>UI_HI_HS_01_레몬건강지수-분석이력</div> -->
    <p class="history-count">
      총&nbsp;<strong>{{ history.length }}</strong
      >건
    </p>
    <div v-if="history.length" class="history-wrap">
      <div v-for="(item, index) in history" :key="index" class="history-item">
        <div class="summary-box">
          <div class="history-date">{{ item.date }}</div>
          <div class="history-details">
            <div class="score-box">
              <p>건강지수&nbsp;{{ item.score }}점</p>
              <CommonBadge v-if="item.precise === true" color="yellow" class="badge-round">정밀</CommonBadge>
            </div>
            <p class="debt-score">건강부채&nbsp;{{ formatNumber(item.debt) }}원</p>
          </div>
          <button class="item-btn" @click="toggleHistory(index)">
            <img
              src="/assets/images/insu/icon-arrow-down.svg"
              alt="내역보기"
              :class="{ rotated: historyVisibleStates[index] }"
            />
          </button>
        </div>
        <div class="result-box" :class="{ show: historyVisibleStates[index] }">
          <h4>레몬지수 분석결과</h4>
          <div v-for="(resultItem, resultIndex) in item.result" :key="resultIndex" class="result-item">
            <dl>
              <dt>내 레몬지수</dt>
              <dd class="point">{{ resultItem.score }}점</dd>
            </dl>
            <dl>
              <dt>분석일시</dt>
              <dd>{{ resultItem.date }}</dd>
            </dl>
            <dl>
              <dt>기대수명</dt>
              <dd>{{ resultItem.age }}세({{ formatNumber(17882) }}일)</dd>
            </dl>
            <dl>
              <dt>예상 연간 의료비</dt>
              <dd>{{ formatNumber(resultItem.fee) }}원(연평균)</dd>
            </dl>
            <dl>
              <dt>내 건강부채</dt>
              <dd>{{ formatNumber(resultItem.debt) }}원</dd>
            </dl>
          </div>
          <h4>건강프로필</h4>
          <div v-for="(profileItem, profileIndex) in item.profile" :key="profileIndex" class="result-item">
            <dl>
              <dt>만성질환</dt>
              <dd>{{ profileItem.disease }}</dd>
            </dl>
            <dl>
              <dt>흡연</dt>
              <dd>{{ profileItem.smoking }}</dd>
            </dl>
            <dl>
              <dt>음주</dt>
              <dd>{{ profileItem.drink }}</dd>
            </dl>
            <dl>
              <dt>운동</dt>
              <dd>{{ profileItem.health }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="wrap-empty">
      <img src="/assets/images/healthDebt/icon-search.png" alt="병원 없음" class="img" />
      <div class="tit">회원님의 건강프로필정보를 참조하여 <br />AI분석을 통해 레몬지수가 산정됩니다.</div>
      <Button btn-type="line" element-type="button" aria-label="레몬건강지수 확인하기" class="xs" :width="15" />
    </div>
    <pagination v-if="history.length" v-model:current-page="page" :total-items="5" />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import pagination from '~/components/publishing/input/pagination.vue'
// pagination 현재 page
const page = ref(1)

const history = ref([
  {
    date: '2023.10.01\n11:05',
    score: 85,
    debt: 500000,
    precise: true,
    result: [
      {
        score: 85,
        date: '2023.10.01',
        age: 80,
        fee: 2000000,
        debt: 500000
      }
    ],
    profile: [
      {
        disease: '고혈압',
        smoking: '비흡연',
        drink: '가끔',
        health: '주 3회 운동'
      }
    ]
  },
  {
    date: '2023.09.15\n11:05',
    score: 90,
    debt: 300000,
    result: [
      {
        score: 90,
        date: '2023.09.15',
        age: 82,
        fee: 1800000,
        debt: 300000
      }
    ],
    profile: [
      {
        disease: '당뇨병',
        smoking: '비흡연',
        drink: '가끔',
        health: '주 5회 운동'
      }
    ]
  },
  {
    date: '2023.09.15\n11:05',
    score: 90,
    debt: 300000,
    precise: true,
    result: [
      {
        score: 90,
        date: '2023.09.15',
        age: 82,
        fee: 1800000,
        debt: 300000
      }
    ],
    profile: [
      {
        disease: '당뇨병',
        smoking: '비흡연',
        drink: '가끔',
        health: '주 5회 운동'
      }
    ]
  }
])

const formatNumber = (number: number) => {
  return number.toLocaleString('ko-KR')
}
const historyVisibleStates = ref(history.value.map(() => false))
const toggleHistory = (index: number) => {
  historyVisibleStates.value[index] = !historyVisibleStates.value[index]
}
</script>

<style scoped lang="scss">
.history-count {
  margin: 0 -2rem;
  padding: 2.1rem 2rem;
  border-bottom: 0.1rem solid #eee;
  line-height: 2.2rem;
}
.history-item {
  border-bottom: 0.1rem solid #eee;
  &:has(.result-box.show) {
    margin: 0 -2rem;
    padding: 0 2rem;
  }
}
.summary-box {
  display: flex;
  padding: 1.6rem 0.4rem;
  gap: 1.6rem;
  .history-date {
    white-space: pre;
    font-size: 1.3rem;
    line-height: 2.3rem;
    color: #959595;
  }
  .history-details {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    .score-box {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      p {
        font-weight: 700;
        line-height: 2.2rem;
      }
    }
    .debt-score {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2rem;
      color: #555;
    }
  }
}
.item-btn {
  margin-left: auto;
  img {
    transition: transform 0.3s ease-in-out;
    &.rotated {
      transform: rotate(180deg);
    }
  }
}
.result-box {
  opacity: 0;
  visibility: hidden;
  max-height: 0;
  margin: 0 -2rem;
  padding: 0 2rem;
  background-color: #f4f4f4;
  overflow: hidden;
  transition: all 0.45s ease-in-out;
  &.show {
    opacity: 1;
    visibility: visible;
    max-height: 100rem;
    padding: 3.2rem 2rem;
  }
  h4 {
    margin-bottom: 1.2rem;
  }
  .result-item {
    padding: 0.4rem 2rem;
    border-radius: 1.2rem;
    background: #fff;
    dl {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem 0;
      border-bottom: 0.1rem solid #eee;
      &:last-child {
        border-bottom: none;
      }
      dt {
        font-size: 1.3rem;
        font-weight: 500;
        line-height: 1.8rem;
      }
      dd {
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 2rem;
        &.point {
          color: #4c7ff7;
        }
      }
    }
    & + h4 {
      margin-top: 2rem;
    }
  }
}
.wrap-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: -6.5rem;
  flex-grow: 1;
  img {
    width: 8rem;
    height: 8rem;
  }
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.5rem;
  color: #555;
}
</style>
