<template>
  <div class="walking-profile-card">
    <div class="profile-section">
      <div class="profile-info">
        <div class="profile-main">
          <img class="profile-image" src="https://placehold.co/60x60" alt="프로필 이미지" />
          <div class="profile-details">
            <div class="profile-header">
              <div class="profile-name">동해번쩍</div>
              <div class="profile-level">
                <div class="level-icon">
                  <div class="icon-bottom"></div>
                  <div class="icon-top"></div>
                </div>
                <div class="level-number">14</div>
              </div>
            </div>
            <div class="profile-location">
              <div class="location-text">서울 금천</div>
              <div class="location-icon">
                <div class="icon-marker"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ranking-section">
        <div class="rank-display">
          <div class="rank-number">
            <span class="number">138</span>
            <span class="unit">위</span>
          </div>
          <div class="rank-change">
            <div class="change-indicator"></div>
            <div class="change-value">11</div>
          </div>
        </div>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" style="width: 38%"></div>
          </div>
          <div class="progress-icon">
            <div class="icon-walking"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-label">건강걸음</div>
        <div class="stat-value">318,544</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">플러스걸음</div>
        <div class="stat-value">26,300</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">
          총 걸음
          <div class="info-icon">
            <div class="icon-info"></div>
          </div>
        </div>
        <div class="stat-value">344,844</div>
      </div>
    </div>

    <div class="today-rank">
      <div class="rank-text">
        <span class="label">TODAY </span>
        <span class="value">42</span>
        <span class="unit">위</span>
      </div>
      <div class="rank-arrow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props 정의가 필요한 경우 추가할 수 있습니다.
</script>

<style scoped lang="scss">
.walking-profile-card {
  width: 100%;
  height: 100%;
  padding: 15px;
  position: relative;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  display: inline-flex;
  flex-direction: column;
  gap: 15px;

  .profile-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .profile-info {
      flex: 1;

      .profile-main {
        display: flex;
        gap: 12px;

        .profile-image {
          width: 60px;
          height: 60px;
          background: #d9d9d9;
          border-radius: 9999px;
        }

        .profile-details {
          height: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .profile-header {
            height: 24px;
            display: flex;
            align-items: center;
            gap: 15px;

            .profile-name {
              color: #111111;
              font-size: 16px;
              font-family: 'Noto Sans KR';
              font-weight: 700;
              line-height: 20px;
            }

            .profile-level {
              display: flex;
              align-items: center;
              gap: 2px;

              .level-icon {
                width: 18px;
                height: 18px;
                position: relative;
                overflow: hidden;

                .icon-bottom {
                  width: 7.5px;
                  height: 6.84px;
                  position: absolute;
                  left: 5.25px;
                  top: 10.41px;
                  background: #ffa323;
                  outline: 1px solid black;
                  outline-offset: -0.5px;
                }

                .icon-top {
                  width: 10.5px;
                  height: 10.5px;
                  position: absolute;
                  left: 3.75px;
                  top: 0.75px;
                  background: #ff6337;
                  outline: 1px solid black;
                  outline-offset: -0.5px;
                }
              }

              .level-number {
                color: #111111;
                font-size: 13px;
                font-family: 'Noto Sans';
                font-weight: 400;
                line-height: 20px;
              }
            }
          }

          .profile-location {
            display: flex;
            align-items: center;
            gap: 3px;

            .location-text {
              color: #666666;
              font-size: 13px;
              font-family: 'Noto Sans';
              font-weight: 400;
              line-height: 20px;
            }

            .location-icon {
              width: 16px;
              height: 16px;
              position: relative;
              overflow: hidden;

              .icon-marker {
                width: 12px;
                height: 15px;
                position: absolute;
                left: 2px;
                top: 1px;
                background: var(--MainColor, #2f6af2);
              }
            }
          }
        }
      }
    }

    .ranking-section {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;

      .rank-display {
        display: flex;
        align-items: center;
        gap: 10px;

        .rank-number {
          display: flex;
          align-items: flex-end;

          .number {
            color: #111111;
            font-size: 31px;
            font-family: 'Noto Sans';
            font-weight: 700;
            line-height: 15px;
          }

          .unit {
            color: #111111;
            font-size: 11px;
            font-family: 'Noto Sans KR';
            font-weight: 700;
            line-height: 20px;
            width: 11px;
            height: 10px;
          }
        }

        .rank-change {
          width: 40px;
          height: 30px;
          border-left: 1px solid #eeeeee;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 3px;

          .change-indicator {
            width: 12px;
            height: 7.2px;
            background: var(--BasicColor_R, #ec171e);
          }

          .change-value {
            color: var(--BasicColor_R, #ec171e);
            font-size: 12px;
            font-family: 'Noto Sans';
            font-weight: 700;
            line-height: 20px;
          }
        }
      }

      .progress-container {
        position: relative;

        .progress-bar {
          width: 130px;
          height: 8px;
          background: #dddddd;
          box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25) inset;
          border-radius: 2px;

          .progress-fill {
            height: 8px;
            background: #1c8d6f;
            border-radius: 2px 0 0 2px;
          }
        }

        .progress-icon {
          width: 30px;
          height: 30px;
          position: absolute;
          left: -10px;
          top: -10.5px;
          background: #1c8d6f;
          box-shadow: -4px -4px 8px rgba(0, 0, 0, 0.3) inset;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;

          .icon-walking {
            width: 16.5px;
            height: 15px;
            outline: 2px solid white;
            outline-offset: -1px;
          }
        }
      }
    }
  }

  .stats-section {
    display: flex;
    gap: 4px;
    width: 100%;

    .stat-card {
      flex: 1;
      padding: 12px 8px;
      background: #eeeeee;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 15px;

      .stat-label {
        color: #999999;
        font-size: 11px;
        font-family: 'Noto Sans';
        font-weight: 400;
        line-height: 20px;
        display: flex;
        align-items: center;
        gap: 8px;

        .info-icon {
          width: 12px;
          height: 12px;
          position: relative;
          overflow: hidden;

          .icon-info {
            width: 3px;
            height: 6px;
            position: absolute;
            left: 4.5px;
            top: 3px;
            outline: 2px solid #999999;
            outline-offset: -1px;
          }
        }
      }

      .stat-value {
        color: #111111;
        font-size: 15px;
        font-family: 'Noto Sans';
        font-weight: 700;
        text-align: right;
      }
    }
  }

  .today-rank {
    position: absolute;
    height: 26px;
    padding: 8px 12px;
    right: 15px;
    top: -10px;
    background: #ff6337;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    .rank-text {
      color: white;
      text-align: center;

      .label {
        font-size: 10px;
        font-family: 'Noto Sans KR';
        font-weight: 400;
      }

      .value {
        font-size: 12px;
        font-family: 'Noto Sans KR';
        font-weight: 700;
      }

      .unit {
        font-size: 10px;
        font-family: 'Noto Sans KR';
        font-weight: 400;
      }
    }

    .rank-arrow {
      width: 6px;
      height: 4px;
      position: absolute;
      left: 59px;
      top: 26.25px;
      transform: rotate(-45deg);
      transform-origin: top left;
      background: #ff6337;
    }
  }
}
</style>
