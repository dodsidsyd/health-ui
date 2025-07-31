<template>
  <BaseBody :show-back-button="true" page-title="그룹 관리">
    <ManageFamilyGroup />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

import ManageFamilyGroup from '~/components/publishing/community/familyCare/ManageFamilyGroup.vue'
</script>
<style scoped lang="scss">
.cbody {
  margin-bottom: -2rem;
  background-image: url(~/assets/images/community/img-add-groupBanner.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: linear-gradient(to bottom, #fff 20%, rgba(255, 255, 255, 0.3));
  }
}
</style>
