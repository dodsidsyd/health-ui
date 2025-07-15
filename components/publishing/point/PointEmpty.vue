<template>
  <div class="point-history-empty">
    <p>포인트 내역이 없습니다.</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.point-history-empty {
  &::before {
    content: '';
    width: 8rem;
    height: 8rem;
    display: block;
    margin: 0 auto 1.6rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='81' height='80' viewBox='0 0 81 80' fill='none'%3E%3Cpath d='M11.5 24C11.5 19.5817 15.0817 16 19.5 16H60.6428C65.0611 16 68.6429 19.5817 68.6429 24V63.1429C68.6429 67.5611 65.0611 71.1429 60.6429 71.1429H19.5C15.0817 71.1429 11.5 67.5611 11.5 63.1429V24Z' fill='%23BAC5DF'/%3E%3Crect x='20.6431' y='9' width='38.8571' height='40' rx='4' fill='%23F2F2F2'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M34.5208 20.0208C35.0615 19.4801 35.9382 19.4801 36.4789 20.0208L40.4999 24.0417L44.5208 20.0208C45.0615 19.4801 45.9382 19.4801 46.4789 20.0208C47.0196 20.5615 47.0196 21.4382 46.4789 21.9789L42.458 25.9998L46.4789 30.0208C47.0196 30.5615 47.0196 31.4382 46.4789 31.9789C45.9382 32.5196 45.0615 32.5196 44.5208 31.9789L40.4999 27.958L36.4789 31.9789C35.9382 32.5196 35.0615 32.5196 34.5208 31.9789C33.9801 31.4382 33.9801 30.5615 34.5208 30.0208L38.5417 25.9998L34.5208 21.9789C33.9801 21.4382 33.9801 20.5615 34.5208 20.0208Z' fill='%23D5D5D5'/%3E%3Cpath d='M11.5 42.9997C11.5 40.7906 13.2909 38.9997 15.5 38.9997H45.1884C46.9101 38.9997 48.4387 37.898 48.9831 36.2646L49.4454 34.8777C49.9899 33.2443 51.5185 32.1426 53.2402 32.1426L64.6429 32.1426C66.852 32.1426 68.6429 33.9334 68.6429 36.1426V62.9997C68.6429 67.418 65.0611 70.9997 60.6429 70.9997H19.5C15.0817 70.9997 11.5 67.418 11.5 62.9997L11.5 42.9997Z' fill='%23C6D4F3'/%3E%3C/svg%3E");
  }
  margin-top: 10rem;
  text-align: center;
  margin-bottom: 10rem;
  color: #555;
  font-size: 1.8rem;
  font-weight: 500;
}
</style>
