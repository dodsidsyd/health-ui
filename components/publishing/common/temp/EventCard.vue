<template>
  <div class="c-card">
    <div class="c-card-body">
      <div class="event-header">
        <div class="event-info">
          <div class="event-date">2025. 06. 15 ~ 2025. 06. 30</div>
          <div class="event-title">봄의 끝자락을 잡자!!</div>
          <div class="event-tags">
            <div class="tag">개인전</div>
            <div class="tag">2,000P / FREE</div>
          </div>
        </div>
        <div class="event-status">
          <div class="status-text">참가예정</div>
          <div class="d-day">D-8</div>
        </div>
      </div>

      <div class="event-content">
        <div class="event-stats">
          <div class="prize-info">
            <div class="label">총 상금</div>
            <div class="prize-amount">
              <span class="amount">1,588,000</span>
              <span class="unit">P</span>
              <div class="bonus">
                <div class="bonus-dot"></div>
                <div class="bonus-amount">45,000</div>
              </div>
            </div>
          </div>
          <div class="participants">
            <div class="count">26,348</div>
            <div class="label">참가자</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props 정의가 필요한 경우 추가할 수 있습니다.
</script>

<style scoped lang="scss">
.c-card {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: white;
  border-radius: 5px;

  .c-card-body {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  .event-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 7px;

    .event-date {
      color: #999999;
      font-size: 11px;
      font-family: 'Noto Sans KR';
      font-weight: 400;
      line-height: 15px;
    }

    .event-title {
      color: #111111;
      font-size: 16px;
      font-family: 'Noto Sans KR';
      font-weight: 700;
      line-height: 20px;
    }

    .event-tags {
      display: flex;
      gap: 2px;

      .tag {
        height: 17px;
        padding: 0 5px;
        background: #999999;
        border-radius: 3px;
        color: white;
        font-size: 9px;
        font-family: 'Noto Sans KR';
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .event-status {
    width: 40px;
    height: 40px;
    background: #ffa323;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    .status-text {
      color: white;
      font-size: 9px;
      font-family: 'Noto Sans KR';
      font-weight: 700;
    }

    .d-day {
      color: white;
      font-size: 12px;
      font-family: 'Noto Sans';
      font-weight: 700;
    }
  }
}

.event-content {
  .event-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .prize-info {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 90px;

      .label {
        color: #111111;
        font-size: 11px;
        font-family: 'Noto Sans KR';
        font-weight: 400;
        line-height: 15px;
      }

      .prize-amount {
        display: flex;
        align-items: flex-end;

        .amount {
          color: #111111;
          font-size: 21px;
          font-family: 'Noto Sans';
          font-weight: 700;
          line-height: 20px;
        }

        .unit {
          color: #111111;
          font-size: 13px;
          font-family: 'Noto Sans';
          font-weight: 400;
          line-height: 20px;
          width: 18px;
          height: 9px;
        }

        .bonus {
          display: flex;
          align-items: center;
          gap: 3px;

          .bonus-dot {
            width: 6.62px;
            height: 6.62px;
            background: var(--BasicColor_R, #ec171e);
          }

          .bonus-amount {
            color: var(--BasicColor_R, #ec171e);
            font-size: 13px;
            font-family: 'Noto Sans';
            font-weight: 400;
            line-height: 20px;
          }
        }
      }
    }

    .participants {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
      width: 52px;

      .count {
        color: #111111;
        font-size: 15px;
        font-family: 'Noto Sans';
        font-weight: 700;
        line-height: 15px;
        text-align: right;
        width: 100%;
      }

      .label {
        color: #111111;
        font-size: 11px;
        font-family: 'Noto Sans KR';
        font-weight: 400;
        line-height: 15px;
        text-align: right;
        width: 100%;
      }
    }
  }
}
</style>
