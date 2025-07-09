<template>
  <div class="walking-status">
    <div class="current-step-status">
      <ul>
        <li>
          <span class="tit">이동거리</span>
          <strong class="text">2.1Km</strong>
        </li>
        <li>
          <span class="tit">소모칼로리</span>
          <strong class="text">99Kcal</strong>
        </li>
        <li>
          <span class="tit">걸은시간</span>
          <strong class="text">55분</strong>
        </li>
      </ul>
    </div>
    <div class="step-goal-process">
      <ol>
        <li>
          <span class="reward completed">
            <i class="reward-icon">10P</i>
          </span>
          <span class="txt">2천걸음</span>
        </li>
        <li>
          <span class="reward completed">
            <i class="reward-icon">10P</i>
          </span>
          <span class="txt">4천걸음</span>
        </li>
        <li>
          <span class="reward current">
            <i class="reward-icon">10P</i>
          </span>
          <span class="txt">6천걸음</span>
        </li>
        <li>
          <span class="reward"></span>
          <span class="txt">8천걸음</span>
        </li>
        <li>
          <span class="reward"></span>
          <span class="txt">1만걸음</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.walking-status {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem 0;
  padding-bottom: 3.2rem;
  .current-step-status {
    ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-items: center;
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        position: relative;
        gap: 0.2rem 0;
        &::before {
          content: '';
          position: absolute;
          width: 0.1rem;
          height: 4.2rem;
          background: rgba(0, 0, 0, 0.1);
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        &:first-child {
          &::before {
            content: none;
          }
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 400;
          color: #2b2b2b;
        }
        .text {
          font-size: 1.6rem;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
  .step-goal-process {
    width: calc(100% - 4.8rem);
    margin: auto;
    ol {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      position: relative;
      &::before {
        content: '';
        width: calc(100% - 4.8rem);
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        top: 1.8rem;
        height: 1.2rem;
        background: rgba(0, 0, 0, 0.1);
      }
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem 0;
        position: relative;
        .reward {
          display: block;
          width: 4.8rem;
          height: 4.8rem;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50' fill='none'%3E%3Crect x='0.75' y='1' width='48' height='48' rx='24' fill='%239DCCC5'/%3E%3Cg filter='url(%23filter0_d_8072_40725)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.4994 15C21.8218 15 19.6512 17.1706 19.6512 19.8483V21.933C18.2318 22.4929 17.2275 23.8766 17.2275 25.4949V31.1724C17.2275 33.2863 18.9412 35 21.0551 35H27.9447C30.0586 35 31.7723 33.2863 31.7723 31.1724V25.4949C31.7723 23.8762 30.7675 22.4922 29.3477 21.9326V19.8483C29.3477 17.1706 27.177 15 24.4994 15ZM22.0748 19.8474V21.6673H26.9231V19.8474C26.9231 18.5086 25.8377 17.4233 24.4989 17.4233C23.1601 17.4233 22.0748 18.5086 22.0748 19.8474ZM25.7115 26.5132C25.7115 26.9621 25.4675 27.3539 25.105 27.5634V29.5443C25.105 29.879 24.8336 30.1503 24.4989 30.1503C24.1642 30.1503 23.8929 29.879 23.8929 29.5443V27.5629C23.5309 27.3532 23.2874 26.9617 23.2874 26.5132C23.2874 25.8438 23.83 25.3012 24.4994 25.3012C25.1688 25.3012 25.7115 25.8438 25.7115 26.5132Z' fill='%23E8EEFA'/%3E%3C/g%3E%3Crect x='1' y='1' width='48' height='48' rx='24' stroke='%23E8EEFA' stroke-width='2' stroke-linecap='round' stroke-dasharray='3 6'/%3E%3Cdefs%3E%3Cfilter id='filter0_d_8072_40725' x='14.2275' y='12' width='20.5449' height='26' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='1.5'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_8072_40725'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_8072_40725' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E");
          .reward-icon {
            font-family: 'Jalnan2', sans-serif;
            position: absolute;
            width: 4.8rem;
            height: 4.8rem;
            font-size: 1.4rem;
            line-height: 4.8rem;
            text-align: center;
            background-color: #386be1;
            color: vars.$white;
            border-radius: 50%;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1) inset;
          }
          &.current {
            .reward-icon {
              width: 6.6rem;
              height: 6.6rem;
              line-height: 5rem;
              text-indent: -0.1rem;
              color: #2b2b2b;
              box-shadow: none;
              background-color: transparent;
              background-image: url('~/assets/images/benefit/img-point-coin.png');
              background-size: 7.6rem;
              background-repeat: no-repeat;
              background-position: left -0.3rem top -1rem;
            }
          }
        }
        .txt {
          font-size: 1.3rem;
          font-weight: 500;
          font-weight: #2b2b2b;
        }
      }
    }
  }
}
</style>
