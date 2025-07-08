<template>
  <BaseBody page-title="1:1문의" :show-back-button="true">
    <TotalCountBtnType :count="6" :btnText="'문의하기'" class="mg-14y" />
    <hr />
    <!-- 스크롤 가능한 알림 목록 영역 -->
    <div class="scrollable-content">
      <FlexSection>
        <InquiryIndexItem></InquiryIndexItem>
        <InquiryIndexItem></InquiryIndexItem>
        <InquiryIndexItem></InquiryIndexItem>
      </FlexSection>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InquiryIndexItem from '~/components/publishing/common/customerCenter/InquiryIndexItem.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import TotalCountBtnType from '~/components/publishing/common/temp/TotalCountBtnType.vue'
</script>

<style scoped lang="scss">
hr {
  width: auto;
  height: 0.1rem;
  margin: 0 -2rem;
  background-color: var(--gray-light);
  border: none;
}
</style>
