<template>
  <BaseBody page-title="공지사항" :show-back-button="true">
    <CustomerCenterTit
      color="blue"
      variant="solid"
      badge-text="공지"
      title-text="건강의 신 서비스가 오픈하였습니다.건강의 신 서비스가 오픈하였습니다.건강의 신 서비스가 오픈하였습니다."
    />
    <CustomerCenterContents>
      <template v-slot:intro>
        건강의 신 서비스가 오픈하였습니다. 건강의 신은 회원기반의 건강관리와 의료마이데이터 서비스를 제공합니다.
      </template>
      <template v-slot:media>
        <img src="../../../assets/images/char-center-lemon.svg" alt="레몬 캐릭터" />
      </template>
      <template v-slot:outro> 많은 관심과 성원 부탁드립니다. 감사합니다. </template>
    </CustomerCenterContents>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import CustomerCenterTit from '~/components/publishing/common/customerCenter/CustomerCenterTit.vue'
import CustomerCenterContents from '~/components/publishing/common/customerCenter/CustomerCenterContents.vue'
</script>
