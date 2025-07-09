<template>
  <div class="kcal-card">
    <div class="kcal-info">
      <div class="intake-section">
        <div class="intake-content">
          <div class="label">섭취칼로리</div>
          <div class="value-container">
            <div class="value">224</div>
            <div class="unit">kcal</div>
          </div>
        </div>
      </div>

      <div class="details-section">
        <div class="detail-row">
          <div class="detail-label">기초대사량</div>
          <div class="detail-value">
            <span class="number">1,487</span>
            <span class="unit">kcal</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-label">소모칼로리</div>
          <div class="detail-value">
            <span class="number">780</span>
            <span class="unit">kcal</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-label">목표칼로리</div>
          <div class="detail-value">
            <span class="number">2,267</span>
            <span class="unit">kcal</span>
          </div>
        </div>
      </div>
    </div>

    <div class="progress-section">
      <div class="progress-info">
        <div class="time-info">오후 04시 30분 기준</div>
        <div class="target-range">목표범위 2,041 ~ 2,494kcal</div>
      </div>

      <div class="progress-container">
        <div class="progress-bar-bg"></div>
        <div class="current-value">224</div>
        <div class="marker"></div>
        <div class="indicator red"></div>
        <div class="indicator green"></div>
        <div class="indicator gray"></div>
        <div class="indicator yellow"></div>

        <div class="progress-labels">
          <div class="label-zero">0</div>
          <div class="label-target">2,041</div>
          <div class="label-current">1,134</div>
          <div class="label-max">2,494</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props 정의가 필요한 경우 추가할 수 있습니다.
</script>

<style scoped lang="scss">
.kcal-card {
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

  .kcal-info {
    align-self: stretch;
    display: flex;
    gap: 35px;

    .intake-section {
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      .intake-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;

        .label {
          color: #999999;
          font-size: 11px;
          font-family: 'Noto Sans KR';
          font-weight: 400;
          text-align: center;
        }

        .value-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;

          .value {
            color: #111111;
            font-size: 32px;
            font-family: 'Noto Sans';
            font-weight: 700;
          }

          .unit {
            color: #111111;
            font-size: 13px;
            font-family: 'Noto Sans KR';
            font-weight: 400;
          }
        }
      }
    }

    .details-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .detail-row {
        display: flex;
        align-items: center;
        gap: 8px;

        .detail-label {
          width: 70px;
          color: #999999;
          font-size: 11px;
          font-family: 'Noto Sans KR';
          font-weight: 400;
          line-height: 20px;
        }

        .detail-value {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 2px;

          .number {
            color: #111111;
            font-size: 15px;
            font-family: 'Noto Sans';
            font-weight: 700;
            line-height: 20px;
          }

          .unit {
            color: #111111;
            font-size: 11px;
            font-family: 'Noto Sans KR';
            font-weight: 400;
            line-height: 20px;
          }
        }
      }
    }
  }

  .progress-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    .progress-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .time-info,
      .target-range {
        color: #999999;
        font-size: 11px;
        font-family: 'Noto Sans KR';
        font-weight: 400;
        line-height: 20px;
      }

      .target-range {
        text-align: right;
      }
    }

    .progress-container {
      width: 360px;
      position: relative;

      .progress-bar-bg {
        width: 100%;
        height: 18px;
        background: #dddddd;
        margin-bottom: 5px;
      }

      .current-value {
        width: 37px;
        height: 18px;
        background: var(--MainColor, #2f6af2);
        color: white;
        font-size: 10px;
        font-family: 'Noto Sans';
        font-weight: 700;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
      }

      .marker {
        width: 74px;
        height: 18px;
        background: #cccccc;
        position: absolute;
        top: 0;
      }

      .indicator {
        width: 100%;
        height: 4px;
        margin-bottom: 5px;

        &.red {
          background: #ff6337;
          width: 62px;
        }
        &.green {
          background: #004a2f;
          width: 114px;
        }
        &.gray {
          background: #bbbbbb;
          width: 110px;
        }
        &.yellow {
          background: #ffa323;
          width: 74px;
        }
      }

      .progress-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;

        div {
          font-size: 10px;
          font-family: 'Noto Sans';
          line-height: 20px;
          text-align: center;

          &.label-zero,
          &.label-current {
            color: #999999;
            font-weight: 400;
          }

          &.label-target,
          &.label-max {
            color: #111111;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
