<template>
  <BaseBody :page-title="'패밀리 대화'" :show-back-button="true">
    <TalkDmBody />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TalkDmBody from '~/components/publishing/community/familyCare/TalkDmBody.vue'
</script>
