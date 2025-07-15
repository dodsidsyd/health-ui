<template>
  <BaseBody page-title="공지사항" :show-back-button="true">
    <InputText inp-type="search" placeholder="키워드를 입력해주세요."></InputText>
    <TotalCountBtnType :count="0" class="mg-21y" />
    <EmptyNoticeIndexItem />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import TotalCountBtnType from '~/components/publishing/common/temp/TotalCountBtnType.vue'
import EmptyNoticeIndexItem from '~/components/publishing/common/customerCenter/EmptyNoticeIndexItem.vue'
</script>

<style scoped lang="scss"></style>
