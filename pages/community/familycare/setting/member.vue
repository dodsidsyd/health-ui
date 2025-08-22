<template>
  <BaseBody
    :show-back-button="true"
    page-title="멤버 리스트"
    :has-add-text="true"
    :add-text-click-enabled="true"
    :add-text="'저장하기'"
  >
    <ManageMemberList />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import ManageMemberList from '~/components/publishing/community/familyCare/ManageMemberList.vue'
</script>

<style scoped lang="scss"></style>
