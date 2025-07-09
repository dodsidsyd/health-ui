<template>
  <BaseBody logo-type="text" :has-notification="true" :has-reward="true" custom-title="퍼블가이드">
    <FlexColDiv class="gap-20 mt-20"> <TotalCountTextType /> <TotalCountSelectType /> </FlexColDiv>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import TotalCountTextType from '~/components/publishing/common/temp/TotalCountTextType.vue'
import TotalCountSelectType from '~/components/publishing/common/temp/TotalCountSelectType.vue'
</script>

<style lang="scss" scoped>
// 기본적인 스타일만 유지
</style>
