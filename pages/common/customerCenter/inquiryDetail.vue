<template>
  <BaseBody page-title="1:1문의" :show-back-button="true">
    <CustomerCenterTit
      color="purple"
      badge-text="답변완료"
      title-text="행운복권에서 루이비똥가방이 당첨되었습니다. 어떻게 받나요?"
    />
    <CustomerCenterContents>
      <template v-slot:intro>
        건강의 신 서비스가 오픈하였습니다. 건강의 신은 회원기반의 건강관리와 의료마이데이터 서비스를 제공합니다.
      </template>
      <template v-slot:media>
        <img src="../../../assets/images/char-center-lemon.svg" alt="레몬 캐릭터" />
      </template>
      <AttachedWrap>
        <CustomerCenterAttached file-name="문의사항 정리본.pdf" file-size="33.5MB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.png" file-size="1.8MB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.png.pdf" file-size="1.8MB" />
      </AttachedWrap>
    </CustomerCenterContents>
    <hr class="hr-section ml-n20 mr-n20" />
    <InquiryAnswer>
      <template v-slot:answer>
        축하드립니다. 루이비똥가방이 당첨되셨군요. 상품은 행운복권 상세화면에서 배송지 정보를 입력후 받아보실 수
        있습니다. 저희 건강의신 서비스를 이용해주셔서 감사드립니다. 앞으로도 많은 성원과 격려 부탁드립니다.
        감사합니다.</template
      >
    </InquiryAnswer>
    <ButtonGroup asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" aria-label="삭제" class="lg btn-sticky" />
      <Button btn-type="primary" element-type="button" aria-label="수정하기" class="lg btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import CustomerCenterTit from '~/components/publishing/common/customerCenter/CustomerCenterTit.vue'
import CustomerCenterContents from '~/components/publishing/common/customerCenter/CustomerCenterContents.vue'
import CustomerCenterAttached from '~/components/publishing/common/customerCenter/CustomerCenterAttached.vue'
import AttachedWrap from '~/components/publishing/common/customerCenter/AttachedWrap.vue'
import InquiryAnswer from '~/components/publishing/common/customerCenter/InquiryAnswer.vue'
</script>
