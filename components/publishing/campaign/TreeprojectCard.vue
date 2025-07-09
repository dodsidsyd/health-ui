<template>
  <div class="project-box">
    <div class="project-info">
      <strong class="project-tit">나무기기 프로젝트</strong>
      <p class="project-txt">
        건강의신은 CO2 배출을 방지하는 것에 많은 관심을 가지고 있으며, 나무심기 프로젝트를 통해 산림생태계를 지원하기
        위해 회원님들과 함께 참여하고 있습니다.
      </p>
      <p class="project-subtxt">
        건강미션을 통해 받은 포인트로 나무심기 프로젝트에 동참해주세요. <br />운동해서 받은 포인트로 나무를 심을수
        있습니다.
      </p>
    </div>
    <div class="project-result">
      <p>
        <span class="name">동해번쩍</span> 님의 참여로 <br /><strong class="point"><span>0.5</span>그루</strong> 나무를
        심었습니다.
      </p>
      <span class="info">나무 1그루 100,000P</span>
    </div>
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="나무심기 프로젝트 참여하기"
      @click="clickBottomModal"
    />
    <BottomModal
      :is-visible="isShowBottomModal"
      v-bind="bottomModalProps"
      @confirm="clickConfirm"
      @close="toggleBottomModal"
    >
      <template #content>
        <div class="flex flex-col text-left gap-8">
          <CampaignLinkBox />
          <PointCard />
          <InputText v-model="participationPoint" placeholder="참여포인트를 입력하세요" unit-r="P" type="number" />
        </div>
      </template>
    </BottomModal>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import { ConfirmModal, BottomModal } from '@lemonhc/fo-ui/components/modal'

import CampaignLinkBox from '~/components/publishing/campaign/CampaignLinkBox.vue'
import PointCard from '~/components/publishing/campaign/PointCard.vue'

const isShowBottomModal = ref(false)

const bottomModalProps = ref({
  title: '나무심기 프로젝트',
  isShowCloseButton: true,
  isShowConfirmButton: true,
  isShowCancelButton: false,
  confirmButtonText: '참여하기'
})

const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}
const clickConfirm = () => {
  console.log('모달 확인 클릭')
  clickConfirmModal()
}

const participationPoint = ref('')
// watch(participationPoint, newVal => {
//   console.log(newVal)
// })

const clickConfirmModal = async () => {
  const modalContent = `
    <div class="mb-n24" style="display: flex; flex-direction: column; gap: 1rem; min-width:280px;">
      <div class="text-left" style="color:#555;"><strong>${Number(participationPoint.value).toLocaleString()}P</strong>로 나무심기 프로젝트에<br/>
      하시겠습니까?</div>
    </div>`

  const confirmRes = await ConfirmModal.open({
    isVisible: false,
    html: modalContent,
    isShowCloseButton: false,
    confirmButtonText: '확인'
  })
}
</script>
<style scoped lang="scss">
.project-box {
  padding: 2.6rem 2.4rem;
  width: calc(100% - 4rem);
  margin: -10rem auto 0;
  position: relative;
  z-index: 10;
  border-radius: 1.2rem;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
  background: #fff url('~/assets/images/campaign/img-campaign2.svg') no-repeat bottom center / 100%;
  .project-info {
    & + .project-result {
      margin: 3.2rem 0 8.1rem;
    }
  }
  .project-tit {
    display: block;
    margin-bottom: 0.8rem;
    font-size: var(--num-18);
    line-height: 2.5rem;
  }
  .project-txt {
    margin-bottom: 1.6rem;
    font-size: var(--num-18);
    font-weight: vars.$medium;
    color: #2b2b2b;
  }
  .project-subtxt {
    font-weight: vars.$medium;
    font-size: var(--num-16);
    color: #555;
  }

  .project-result {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    gap: 0.8rem;
    p {
      font-size: var(--num-20);
      font-weight: vars.$bold;
      text-align: center;
    }
    strong {
      color: #4c7ff7;
    }
    .info {
      display: block;
      font-size: var(--num-14);
      line-height: 2rem;
      text-align: center;
      color: #555;
    }

    & + .c-btn {
      font-weight: vars.$medium;
    }
  }
}
::v-deep(.c-inp) {
  &.t-right::placeholder {
    text-align: left !important;
  }
}
</style>
