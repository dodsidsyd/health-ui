<template>
  <div class="health-Info-text">
    <div class="info-item">
      <h5 class="tit">레몬지수</h5>
      <ul class="info-list">
        <li>
          사용자의 생활습관, 의료마이데이터 연동 등으로 분석된 건강부채와 동일 연령대의 건강부채 기준점수를 활용하여
          점수로 환산한 건강의신에서 제공하는 건강 점수입니다.
        </li>
        <li>레몬지수는 건강의신에서 제시하는 건강 미션 및 걷기, 걷기왕 대회 참여 등을 통해 높일 수 있습니다.</li>
      </ul>
    </div>
    <div class="info-item">
      <h5 class="tit">건강부채</h5>
      <ul class="info-list">
        <li>
          나의 만성질환 정보와 생활습관 정보를 바탕으로 AI가 현재 나이에서 100세까지 건강한 삶을 유지하기 위해 필요한
          금전적 비용을 분석한 값입니다.
        </li>
        <li>건강프로필 설정에서 입력한 데이터를 AI 분석을 통해 결과를 제공합니다.</li>
        <li>진료받은 병원과 연동된 경우 AI정밀분석을 통해 보다 더 정밀한 분석 데이터를 제공합니다.</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.health-Info-text {
  padding-top: 0.4rem;
  padding-bottom: 2rem;
  .info-item {
    padding-top: 1.6rem;
    .tit {
      font-size: 1.4rem;
      font-weight: 600;
      color: #2b2b2b;
      margin-bottom: 0.8rem;
    }
    .info-list {
      li {
        box-sizing: border-box;
        padding-left: 0.8rem;
        position: relative;
        font-size: 1.2rem;
        font-weight: 400;
        & + li {
          margin-top: 0.8rem;
        }
        &::before {
          content: '';
          display: block;
          width: 0.3rem;
          height: 0.3rem;
          background-color: #959595;
          position: absolute;
          left: 0;
          top: 0.8rem;
        }
      }
    }
  }
}
</style>
