<template>
  <FlexColDiv class="gap-16">
    <!-- 카드 리스트 -->
    <LinkCard
      title="출석체크 미션"
      text="매일 출석하면 3일차에<br /> 포인트 2배 적립"
      class="attendance-card"
      :buttons="[
        {
          label: '출석체크하기',
          btnType: 'primary',
          elementType: 'a',
          isLink: true,
          linkHref: '/common/benefit/attendance',
          width: 14,
          height: 4.8
        }
      ]"
    />

    <LinkCard
      title="친구 초대 미션"
      text="초대한 친구가 가입 시<br />1000P 적립"
      class="invite-card"
      :buttons="[
        {
          label: '친구초대하기',
          btnType: 'primary',
          elementType: 'button',
          isLink: false,
          onClick: clickBottomModal,
          width: 14,
          height: 4.8
        }
      ]"
    />

    <BottomModal
      :is-visible="isShowBottomModal"
      v-bind="bottomModalProps"
      @cancel="clickCancel"
      @confirm="clickConfirm"
      @close="toggleBottomModal"
    >
      <template #content>
        <div>모달 내용은 Slot</div>
      </template>
    </BottomModal>

    <FlexRowDiv class="gap-16">
      <LinkShadowCard
        title="병원서류 발급시 <br/> 400P 적립"
        class="paper-card"
        :buttons="[{ linkHref: '#', btnType: 'primary', elementType: 'a', isLink: true }]"
      />
      <LinkShadowCard
        title="MY병원 연결 시 <br/> 500P 적립"
        class="hospital-card"
        :buttons="[{ linkHref: '#', btnType: 'primary', elementType: 'a', isLink: true }]"
      />
    </FlexRowDiv>

    <LinkCard
      text="보험설계사 전용!<br/>가입만 해도 500P"
      class="acc-card"
      :buttons="[
        {
          label: '설계사 가입하기',
          btnType: 'primary',
          elementType: 'a',
          isLink: true,
          linkHref: '#',
          width: 14,
          height: 4.8
        }
      ]"
    />
  </FlexColDiv>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import LinkCard from '~/components/publishing/benefit/LinkCard.vue'
import LinkShadowCard from '~/components/publishing/benefit/LinkShadowCard.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowBottomModal = ref(false)

const bottomModalProps = ref({
  title: '하단 모달 제목',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const clickBottomModal = () => {
  isShowBottomModal.value = true
}
const clickCancel = () => {
  isShowBottomModal.value = false
}
const clickConfirm = () => {
  isShowBottomModal.value = false
}
const toggleBottomModal = () => {
  isShowBottomModal.value = false
}
</script>
