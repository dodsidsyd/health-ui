<template>
  <BaseBody>
    <h1>건강의신 포인트 정책</h1>
    <FullModal
      :is-visible="isShowModal"
      title="건강의신 포인트 정책"
      :is-show-cancel-button="false"
      :is-show-confirm-button="false"
      :is-show-close-button="true"
      @close="showFullmodal"
    >
      <template #content>
        <div class="point-detail-rules">
          <ul>
            <li>건강의 신에서 사용되는 포인트는 현금성 포인트과 비현금성 포인트로 구분됩니다.</li>
            <li>
              미사용 포인트의 환전은 충전일로부터 7일 이내의 사용 이력이 없는 포인트에 한해 결제 취소가 가능하며, 현금성
              포인트의 잔액이 1,000P 이상일 경우에 환전가능한 포인트 내에서 전액 또는 일부 환전신청이 가능합니다.
            </li>
            <li>
              현금성 포인트의 환전신청시 수수료를 부과하며, 자세한 사항은 건강의신 환전(환전)규정을 참고하시기 바랍니다.
            </li>
            <li>
              현금성 포인트는 충전일 기준으로 5년, 유효기간이 지난 잔액은 상사채권의 소멸시효가 완성되어 자동으로
              소멸됩니다.
            </li>
            <li>회원 탈퇴 시 포인트 잔액은 환전 신청하거나 탈퇴 신청 전에 소진하여야 합니다.</li>
            <li>
              회원이 서비스 약관에 의거하여 자발적으로 탈퇴하거나 회원자격을 상실한 경우, 회원의 포인트에 관한 정보를
              삭제하며 복구 등에 대한 책임을 지지않습니다.
            </li>
          </ul>
        </div>
      </template>
    </FullModal>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FullModal from '~/components/common/modal/FullModal.vue'
const isShowModal = ref(true)
const showFullmodal = () => {
  isShowModal.value = !isShowModal.value
}
</script>
<style scoped lang="scss">
.point-detail-rules {
  ul {
    li {
      padding-left: 0.9rem;
      position: relative;
      margin-bottom: 1rem;
      text-align: left;
      font-size: 1.4rem;
      line-height: 2rem;
      &:last-child {
        margin-bottom: 0;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.9rem;
        width: 0.3rem;
        height: 0.3rem;
        background: #959595;
        border-radius: 50%;
      }
    }
  }
}
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
