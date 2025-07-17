<template>
  <FlexColDiv class="object-section gap-12">
    <!-- <AverageStatusCard title="심박수" main-data="85bpm" card-type="heart-beep">
      <AverageCurve :heart-rate-data="heartRateData" />
    </AverageStatusCard> -->
    <FlexRowDiv class="status-list">
      <CommonStatusCard title="심박수" main-data="85bpm" card-type="heart-beep" :chart="true"
        ><!-- chart있으면 true -->
        <AverageCurve :heart-rate-data="heartRateData" />
      </CommonStatusCard>

      <CommonStatusCard
        title="산소포화도"
        sub-title="또래 평균"
        main-data="92%"
        card-type="oxygen"
        emoji-type="bad"
        sub-data="95.3%"
      />

      <CommonStatusCard
        title="심박변이도"
        sub-title="또래 평균"
        main-data="73ms"
        card-type="variability"
        emoji-type="good"
        sub-data="70ms"
      />

      <CommonStatusCard title="스트레스" main-data="73.2" card-type="stress" :chart="true">
        <div class="bar-wrap">
          <div class="box my-box">
            <div class="bar-area">
              <div class="bar" style="height: 73.2%"></div>
            </div>
            <span>나</span>
          </div>
          <div class="box average-box">
            <div class="bar-area">
              <div class="bar" style="height: 62.5%">
                <div class="tooltip">
                  <p>62.5%</p>
                </div>
              </div>
            </div>
            <span>또래평균</span>
          </div>
        </div>
      </CommonStatusCard>

      <CommonStatusCard title="이번 달 응원 수" text="매달 1일~오늘" card-type="cheer-up" sub-num="2280" />
      <CommonStatusCard title="이번 달 응원 수" text="자정~현재" card-type="today-post" sub-num="45" />
    </FlexRowDiv>
    <CompareBarStatusCard
      title="인기 키워드"
      card-type="fire"
      :keyword-data="[
        { keyword: '위고비', keywordNum: '13212', barWidth: 80 },
        { keyword: '단백질', keywordNum: '10480', barWidth: 60 },
        { keyword: '위고비', keywordNum: '8752', barWidth: 90 }
      ]"
    />
  </FlexColDiv>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import AverageStatusCard from '~/components/common/statusCard/AverageStatusCard.vue'
import CommonStatusCard from '~/components/common/statusCard/CommonStatusCard.vue'
import CompareBarStatusCard from '~/components/common/statusCard/CompareBarStatusCard.vue'
import AverageCurve from '~/components/publishing/community/competitive/AverageCurve.vue'

const heartRateData = ref([
  { value: 50, timestamp: new Date('2024-01-01 09:00') },
  { value: 40, timestamp: new Date('2024-01-01 10:00') },
  { value: 10, timestamp: new Date('2024-01-01 11:00') },
  { value: 16, timestamp: new Date('2024-01-01 12:00') },
  { value: 10, timestamp: new Date('2024-01-01 15:00') }
])

// 심박수 범위 설정
const maxHeartRate = ref(100)
const minHeartRate = ref(60)

// 평균 심박수 계산
const averageHeartRate = computed(() => {
  if (!heartRateData.value || heartRateData.value.length === 0) return 0
  const sum = heartRateData.value.reduce((acc, data) => acc + data.value, 0)
  return Math.round(sum / heartRateData.value.length)
})

// 실시간 데이터 업데이트 함수 (필요시 사용)
function updateHeartRateData(newData) {
  heartRateData.value = newData
}

// 외부에서 사용할 수 있도록 expose
defineExpose({
  updateHeartRateData,
  heartRateData,
  averageHeartRate
})
</script>
<style scoped lang="scss">
.status-list {
  gap: 1.2rem;
  flex-wrap: wrap;
  .status-card {
    flex: 0 0 calc(50% - 0.6rem);
  }

  .bar-wrap {
    display: flex;
    justify-content: center;
    gap: 1.6rem;
    .bar-area {
      display: flex;
      align-items: flex-end;
      height: 5.6rem;
    }
    .box {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: flex-end;
      gap: 0.6rem;
    }
    span {
      display: block;
      font-size: 1.1rem;
      font-weight: 400;
      line-height: 1.5rem;
      color: #959595;
    }
    .bar {
      width: 4rem;
      height: 0%;
      border-radius: 0.8rem;
      height: 0.6rem;
    }
  }
  .my-box {
    .bar {
      background: #4c7ff7;
    }
  }
  .average-box {
    position: relative;
    .bar {
      position: relative;
      background: #ececec;
      .tooltip {
        position: absolute;
        bottom: 100%; // bar 상단 바로 위
        left: 50%;
        transform: translateX(-50%) translateY(-0.8rem); // 위로 띄우기
        background: #4f5561;
        border-radius: 1.2rem;
        padding: 0.4rem 0.8rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: #fff;
        white-space: nowrap;
        z-index: 10;

        &::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0.7rem;
          height: 0.4rem;
          background-image: url("data:image/svg+xml,%3Csvg width='7' height='4' viewBox='0 0 7 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.23228 3C4.46248 4.33333 2.53798 4.33333 1.76818 3L0.0361328 0H6.96433L5.23228 3Z' fill='%234F5561'/%3E%3C/svg%3E%0A");
        }
      }
    }
  }
}
</style>
