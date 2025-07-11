<template>
  <BaseBody page-title="건강의신" logo-type="image" :has-notification="true" :has-reward="true">
    <HomeMainSector />
    <!-- 걷기왕 챌린지 -->
    <MainSectionTitle title-text="걷기왕 챌린지" />
    <MainWalkingChallenge />
    <!-- 친환경 캠페인 -->
    <MainSectionTitle title-text="친환경 캠페인" />
    <MainEcoCampaign />
    <!-- 청구의신 -->
    <MainSectionTitle title-text="청구의신" />
    <MainInsu />
    <!-- 커뮤니티 -->
    <MainSectionTitle title-text="요즘 핫한 커뮤니티" custom-class="communityTit" />
    <MainCommunity />
    <MainCommunityReply />
    <!-- 하단 배너 -->
    <MainBottomBanner />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import HomeMainSector from '~/components/publishing/home/HomeMainSector.vue'

import MainSectionTitle from '~/components/publishing/home/MainSectionTitle.vue'

import MainWalkingChallenge from '~/components/publishing/home/MainWalkingChallenge.vue'

import MainEcoCampaign from '~/components/publishing/home/MainEcoCampaign.vue'

import MainInsu from '~/components/publishing/home/MainInsu.vue'

import MainCommunity from '~/components/publishing/home/MainCommunity.vue'
import MainCommunityReply from '~/components/publishing/home/MainCommunityReply.vue'

import MainBottomBanner from '~/components/publishing/home/MainBottomBanner.vue'
</script>

<style scoped lang="scss"></style>
