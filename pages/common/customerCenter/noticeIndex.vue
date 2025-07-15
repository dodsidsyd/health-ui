<template>
  <BaseBody page-title="공지사항" :show-back-button="true">
    <InputText inp-type="search" placeholder="키워드를 입력해주세요."></InputText>
    <TotalCountBtnType :count="6" class="mg-21y" />

    <!-- 스크롤 가능한 알림 목록 영역 -->
    <hr />
    <div class="scrollable-content">
      <NoticeIndexItem type="일반공지" color="blue" @click="goToNotice" />
      <NoticeIndexItem type="이벤트" color="brown" @click="goToNotice" />
      <NoticeIndexItem type="점검/장애" color="gray" @click="goToNotice" />
      <NoticeIndexItem type="정책변경" color="purple" @click="goToNotice" />
      <NoticeIndexItem type="중요공지" color="deepRed" @click="goToNotice" />
      <NoticeIndexItem type="일반공지" color="blue" @click="goToNotice" />
      <NoticeIndexItem type="일반공지" color="blue" @click="goToNotice" />
      <NoticeIndexItem type="일반공지" color="blue" @click="goToNotice" />
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import TotalCountBtnType from '~/components/publishing/common/temp/TotalCountBtnType.vue'
import NoticeIndexItem from '~/components/publishing/common/customerCenter/NoticeIndexItem.vue'

const router = useRouter()

function goToNotice() {
  router.push('./noticeDetail')
}
</script>

<style scoped lang="scss">
.scrollable-content {
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  position: relative;
}

hr {
  width: auto;
  height: 0.1rem;
  margin: 0 -2rem;
  background-color: var(--gray-light);
  border: none;
}
</style>
