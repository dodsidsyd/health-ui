<template>
  <div class="c-card">
    <div class="c-card-body">
      <div class="challenge-header">
        <div class="challenge-info">
          <div class="challenge-date">2025. 05. 15 ~ 2025. 05. 31</div>
          <div class="challenge-title">프리썸머 챌린지</div>
          <div class="challenge-tags">
            <div class="tag tag-gray">팀전</div>
            <div class="tag tag-dark">FREE</div>
          </div>
        </div>
        <div class="challenge-status status-ongoing">
          <div class="status-text">챌린지<br />진행중</div>
        </div>
      </div>

      <div class="challenge-content">
        <div class="challenge-stats">
          <div class="prize-info">
            <div class="label">총 상금</div>
            <div class="prize-amount">
              <span class="amount">5,324,000</span>
              <span class="unit">P</span>
              <div class="bonus">
                <div class="bonus-dot"></div>
                <div class="bonus-amount">123,000</div>
              </div>
            </div>
          </div>
          <div class="participants">
            <div class="count">284,541</div>
            <div class="label">참가자</div>
          </div>
        </div>
      </div>
    </div>

    <div class="c-card-footer">
      <div class="challenge-progress">
        <div class="record-info">
          <div class="label">기록</div>
          <div class="record-amount">
            <span class="amount">45,549</span>
            <span class="unit">걸음</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 73%"></div>
          </div>
        </div>
        <div class="ranking-info">
          <div class="current-rank">
            <div class="label">현재순위</div>
            <div class="rank">482</div>
          </div>
          <div class="rank-change">
            <div class="change-indicator"></div>
            <div class="change-value">10</div>
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

.challenge-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  .challenge-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 7px;

    .challenge-date {
      color: #999999;
      font-size: 11px;
      font-family: 'Noto Sans KR';
      font-weight: 400;
      line-height: 15px;
    }

    .challenge-title {
      color: #111111;
      font-size: 16px;
      font-family: 'Noto Sans KR';
      font-weight: 700;
      line-height: 20px;
    }

    .challenge-tags {
      display: flex;
      gap: 2px;

      .tag {
        height: 17px;
        padding: 0 5px;
        border-radius: 3px;
        color: white;
        font-size: 9px;
        font-family: 'Noto Sans KR';
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;

        &-gray {
          background: #999999;
        }

        &-dark {
          background: #111111;
        }
      }
    }
  }

  .challenge-status {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    &.status-ongoing {
      background: #1c8d6f;

      .status-text {
        color: white;
        font-size: 9px;
        font-family: 'Noto Sans KR';
        font-weight: 700;
        text-align: center;
      }
    }
  }
}

.challenge-content {
  .challenge-stats {
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

.c-card-footer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #dddddd;

  .challenge-progress {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .record-info {
      width: 90px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .label {
        color: #111111;
        font-size: 11px;
        font-family: 'Noto Sans KR';
        font-weight: 400;
        line-height: 15px;
      }

      .record-amount {
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
          font-size: 10px;
          font-family: 'Noto Sans';
          font-weight: 400;
          line-height: 20px;
        }
      }

      .progress-bar {
        width: 100px;
        height: 8px;
        background: #dddddd;
        border-radius: 2px;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25) inset;
        overflow: hidden;

        .progress-fill {
          height: 100%;
          background: #1c8d6f;
          border-radius: 2px 0 0 2px;
        }
      }
    }

    .ranking-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;

      .current-rank {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 5px;

        .label {
          color: #999999;
          font-size: 11px;
          font-family: 'Noto Sans KR';
          font-weight: 400;
          line-height: 20px;
        }

        .rank {
          color: #111111;
          font-size: 26px;
          font-family: 'Noto Sans';
          font-weight: 700;
          line-height: 15px;
        }
      }

      .rank-change {
        display: flex;
        align-items: center;
        gap: 3px;
        width: 40px;
        justify-content: flex-end;

        .change-indicator {
          width: 12px;
          height: 7.2px;
          background: #1b80e4;
        }

        .change-value {
          color: #1b80e4;
          font-size: 12px;
          font-family: 'Noto Sans';
          font-weight: 700;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
