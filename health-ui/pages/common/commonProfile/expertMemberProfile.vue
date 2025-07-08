<template>
  <BaseBody :show-back-button="true" page-title="회원 프로필" logo-type="text" :has-setting="true" class="pb-36">
    <ProfileBox
      profile-type="expert"
      :profile-data="{
        name: '양정환 설계사',
        company: '삼성생명',
        serviceYears: 7
      }"
    />
    <ExpertIntroduceText class="mt-16" />

    <!-- 방사형 차트 -->
    <ExpertChart class="mt-24" />

    <!-- 전문가 이력 -->
    <ExpertHistory />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'

import ProfileBox from '~/components/publishing/commonProfile/ProfileBox.vue'
import ExpertIntroduceText from '~/components/publishing/commonProfile/ExpertIntroduceText.vue'
import ExpertChart from '~/components/publishing/commonProfile/ExpertChart.vue'
import ExpertHistory from '~/components/publishing/commonProfile/ExpertHistory.vue'
</script>
<style scoped lang="scss"></style>
