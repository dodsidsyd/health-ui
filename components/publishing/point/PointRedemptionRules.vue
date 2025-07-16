<template>
  <div class="point-redemption-rules">
    <div class="tit">
      <strong>포인트 환전규정</strong>
      <nuxt-link to="javascript:void(0)" class="btn-point-rules">포인트 규정 자세히 보기</nuxt-link>
    </div>
    <ul>
      <li>
        미사용 포인트의 환전은 충전일로부터 7일 이내의 사용 이력이 없는 포인트에 한해 결제 취소가 가능하며, 현금성
        포인트의 잔액이 1,000P 이상일 경우에 환전가능한 포인트 내에서 전액 또는 일부 환전신청이 가능합니다.
      </li>
      <li>
        현금성 포인트의 환전신청시 10% 수수료를 부과하며, 환전대상 포인트가 10,000P 미만인 경우에는 1,000원의
        환전수수료를 부과합니다
      </li>
      <li>회원 탈퇴 시 포인트 잔액은 환전 신청하거나 탈퇴 신청 전에 소진하여야 합니다</li>
      <li>
        회원이 서비스 약관에 의거하여 자발적으로 탈퇴하거나 회원자격을 상실한 경우, 회원의 포인트 에 관한 정보를
        삭제하며 복구 등에 대한 책임을 지지않습니다.
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.point-redemption-rules {
  background: #f9f9f9;
  padding: 2rem;
  margin: 0 -2rem;
  .tit {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    strong {
      font-size: 1.4rem;
      font-weight: 600;
      color: #2b2b2b;
    }
    .btn-point-rules {
      font-size: 1.2rem;
      line-height: 2rem;
      color: #2b2b2b;
      text-decoration: underline;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.8rem 0;
    margin-top: 1.6rem;
    li {
      color: #555;
      font-size: 1.2rem;
      font-weight: 400;
      position: relative;
      padding-left: 0.9rem;
      &::before {
        content: '';
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0.5rem;
        background: #959595;
      }
    }
  }
}
</style>
