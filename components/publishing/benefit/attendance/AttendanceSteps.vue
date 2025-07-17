<template>
  <div ref="attendanceContainer" class="attendance-wrap">
    <div>
      <div class="step-wrap">
        <!-- SVG 연결선 레이어 -->
        <ConnectionLines
          ref="connectionLines"
          :completed-days="completedDays"
          container-selector=".step-wrap"
          @paths-calculated="onPathsCalculated"
        />

        <div ref="lineWrap" class="line-wrap">
          <div>
            <span class="item-wrap" data-connect="horizontal" data-item="1">
              <span class="item" @click="onItemCompleted(1)">1</span>
            </span>
            <span class="item-wrap" data-connect="horizontal" data-item="2">
              <span class="item" @click="onItemCompleted(2)">2</span>
            </span>
            <span class="item-wrap" data-connect="vertical-down" data-item="3">
              <span class="item" @click="onItemCompleted(3)">3</span>
            </span>
          </div>

          <div class="ml-auto corner">
            <span class="item-wrap ml-auto" data-connect="vertical-down" data-item="4">
              <span class="item" @click="onItemCompleted(4)">4</span>
              <!-- 포인트 있을경우 -->
              <span class="step-point">50P</span>
            </span>
          </div>

          <div class="reverse">
            <span class="item-wrap" data-connect="horizontal-reverse" data-item="5">
              <span class="item" @click="onItemCompleted(5)">5</span>
            </span>
            <span class="item-wrap" data-connect="vertical-down" data-item="6">
              <span class="item" @click="onItemCompleted(6)">6</span>
            </span>
          </div>

          <div class="corner">
            <span class="item-wrap" data-connect="vertical-down" data-item="7">
              <span class="item" @click="onItemCompleted(7)">7</span>
              <!-- 케릭터 요소 -->
              <i class="img-char char-1" aria-hidden="true"></i>
            </span>
          </div>

          <div class="ml-auto">
            <span class="item-wrap" data-connect="horizontal" data-item="8">
              <span class="item" @click="onItemCompleted(8)">8</span>
            </span>
            <span class="item-wrap" data-connect="vertical-down" data-item="9">
              <span class="item" @click="onItemCompleted(9)">9</span>
              <!-- 포인트 있을경우 -->
              <span class="step-point">50P</span>
            </span>
          </div>

          <div class="ml-auto corner">
            <span class="item-wrap ml-auto" data-connect="vertical-down" data-item="10">
              <span class="item" @click="onItemCompleted(10)">10</span>
            </span>
          </div>

          <div class="reverse">
            <span class="item-wrap" data-connect="horizontal-reverse" data-item="11">
              <span class="item" @click="onItemCompleted(11)">11</span>
            </span>
            <span class="item-wrap" data-connect="vertical-down" data-item="12">
              <span class="item" @click="onItemCompleted(12)">12</span>
            </span>
          </div>

          <div class="corner">
            <span class="item-wrap" data-connect="vertical-down" data-item="13">
              <span class="item" @click="onItemCompleted(13)">13</span>
            </span>
          </div>

          <div class="ml-auto">
            <span class="item-wrap" data-connect="horizontal" data-item="14">
              <span class="item" @click="onItemCompleted(14)">14</span>
            </span>
            <span class="item-wrap" data-connect="vertical-down" data-item="15">
              <span class="item" @click="onItemCompleted(15)">15</span>
              <!-- 케릭터 요소 -->
              <i class="img-char char-2" aria-hidden="true"></i>
            </span>
          </div>

          <div class="ml-auto corner">
            <span class="item-wrap ml-auto" data-connect="vertical-down" data-item="16">
              <span class="item" @click="onItemCompleted(16)">16</span>
            </span>
          </div>

          <div class="reverse">
            <span class="item-wrap" data-connect="horizontal-reverse" data-item="17">
              <span class="item" @click="onItemCompleted(17)">17</span>
            </span>
            <span class="item-wrap" data-connect="vertical-down" data-item="18">
              <span class="item" @click="onItemCompleted(18)">18</span>
            </span>
          </div>

          <div class="corner">
            <span class="item-wrap" data-connect="horizontal" data-item="19">
              <span class="item" @click="onItemCompleted(19)">19</span>
            </span>
          </div>

          <div class="">
            <span class="item-wrap" data-item="20">
              <span class="item" @click="onItemCompleted(20)">20</span>
              <!-- 케릭터 요소 -->
              <i class="img-char char-3" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import ConnectionLines from './ConnectionLines.vue'

const attendanceContainer = ref<HTMLElement>()
const lineWrap = ref<HTMLElement>()
const connectionLines = ref<InstanceType<typeof ConnectionLines>>()
const completedDays = ref<Set<number>>(new Set())

// 연결선 계산 완료 콜백
const onPathsCalculated = () => {
  // 필요시 추가
}

// 아이템 체크 (클릭)
const onItemCompleted = (day: number) => {
  if (completedDays.value.has(day)) {
    // 현재 날짜를 취소하는 경우: 이 날짜 이후의 모든 날짜도 자동 취소
    const daysToRemove = Array.from(completedDays.value).filter(d => d >= day)
    daysToRemove.forEach(d => completedDays.value.delete(d))
  } else {
    // 새로운 날짜를 완료하는 경우: 이전 날짜들이 모두 완료되어야 함
    const shouldAutoComplete = []

    // 1부터 클릭한 날짜까지 모든 날짜를 자동 완료
    for (let i = 1; i <= day; i++) {
      if (!completedDays.value.has(i)) {
        completedDays.value.add(i)
        shouldAutoComplete.push(i)
      }
    }
  }

  updateItemAppearance(day)

  // 모든 아이템의 외관을 업데이트 (자동으로 변경된 날짜들 반영)
  for (let i = 1; i <= 20; i++) {
    updateItemAppearance(i)
  }
}

// 완료된 아이템 add class
const updateItemAppearance = (day: number) => {
  const item = document.querySelector(`[data-item="${day}"] .item`)
  if (item) {
    if (completedDays.value.has(day)) {
      item.classList.add('completed')
    } else {
      item.classList.remove('completed')
    }
  }
}
</script>

<style scoped lang="scss">
.attendance-wrap {
  background: #94cf7b;
  margin: 0 -2rem;
  padding-bottom: 5.3rem;
  position: relative;
  .step-wrap {
    padding: 1rem 2.4rem 0;
    max-width: 74rem;
    margin: auto;
    position: relative;

    .line-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 0;
      align-items: flex-start;
      position: relative;
      z-index: 2;
      margin-top: 1rem;
    }

    .line-wrap .item-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 25%;
      position: relative;
      height: 4.4rem;
      @media (max-width: 375px) {
        height: 3.4rem;
      }
      .item {
        background: #aae292;
        width: 6.4rem;
        height: 6.4rem;
        border-radius: 50%;
        font-weight: bold;
        font-size: 2rem;
        line-height: 6.4rem;
        font-family: 'Jalnan2', sans-serif;
        text-align: center;
        color: #4db023;
        position: relative;
        z-index: 3;
        transition: all 0.3s ease;
        cursor: pointer;

        &.completed {
          background: #7abd5e;
          box-shadow: 0 0 0.8rem 0 rgba(0, 0, 0, 0.11) inset;
          color: white;
          font-size: 0;
          position: relative;
          &::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' fill='none'%3E%3Cpath d='M31.3383 39.5062L43.3383 27.5062C44.5383 26.3664 44.5383 24.4461 43.3383 23.3063C42.7683 22.7062 42.0031 22.4062 41.238 22.4063C40.4729 22.4062 39.7078 22.7062 39.1378 23.3062L32.2378 30.1461L29.2383 33.1461L25.3383 29.3063C24.1977 28.1063 22.2781 28.1063 21.1383 29.3063C19.9383 30.4461 19.9383 32.3664 21.1383 33.5063L27.1383 39.5062C28.2781 40.7062 30.1984 40.7062 31.3383 39.5062Z' fill='white'/%3E%3C/svg%3E");
          }
        }
      }
      .img-char {
        position: absolute;
        width: 10.4rem;
        height: 10.4rem;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        z-index: 100;
        transform: translateX(-50%);
        pointer-events: none;
        @media (max-width: 393px) {
          width: 8rem;
          height: 8rem;
        }
        &.char-1 {
          left: 90%;
          bottom: 130%;
          background-image: url('~/assets/images/benefit/char-lemon-1.svg');
        }
        &.char-2 {
          left: 110%;
          bottom: 30%;
          background-image: url('~/assets/images/benefit/char-lemon-2.svg');
        }
        &.char-3 {
          left: 47%;
          bottom: -20%;
          transform: none;
          background-image: url('~/assets/images/benefit/char-lemon-3.svg');
        }
      }
    }

    .line-wrap > div {
      display: flex;
      width: 100%;
      justify-content: center;

      &.corner {
        justify-content: initial;
        position: relative;
      }

      &:first-child {
        justify-content: flex-start;
      }

      &:last-child {
        width: 50%;
        margin: auto;
        justify-content: flex-start;
        .item-wrap {
          width: 50%;
        }
      }
    }
  }

  .step-point {
    width: 9.2rem;
    height: 9.2rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    line-height: 8.5rem;
    z-index: 10;
    pointer-events: none;
    font-size: 1.8rem;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
    text-indent: -0.4rem;
    font-family: 'Jalnan2', sans-serif;
    text-align: center;
    font-weight: bold;
    position: absolute;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 10rem;
    background-image: url('~/assets/images/benefit/img-point-coin.png');
    /* 동전 회전 애니메이션 추가 */
    backface-visibility: hidden;
    @media (max-width: 375px) {
      font-size: 1.6rem;
      background-size: 8.5rem;
    }
  }
  .completed + .step-point {
    animation: coin-spin-dynamic 1s ease-in-out;
    opacity: 0;
  }
  @keyframes coin-spin-dynamic {
    0% {
      transform: translate(-50%, -50%) rotateY(-3600deg) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) rotateY(-1800deg) scale(1.5);
    }
    100% {
      transform: translate(-50%, -50%) rotateY(0deg) scale(1);
      opacity: 0;
    }
  }

  .line-wrap > div.reverse {
    flex-direction: row-reverse;
  }
}

// 반응형 대응
@media (max-width: 375px) {
  .attendance-wrap .step-wrap {
    padding: 0 1.5rem;

    .line-wrap .item-wrap .item {
      width: 5rem;
      height: 5rem;
      font-size: 1.6rem;
      line-height: 5rem;
    }
  }
}
</style>
