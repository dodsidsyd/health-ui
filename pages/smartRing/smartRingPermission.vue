<template>
  <BaseBody page-title="스마트링 권한" :show-back-button="true">
    <div class="mt-24">
      <h2 class="bold" style="line-height: 3.1rem">
        스마트링의 원활한 사용을 위한<br />
        접근 권한 안내
      </h2>
      <FlexColDiv class="gap-24 mt-32">
        <permissionGuide
          v-for="(permission, index) in permissions"
          :key="index"
          :icon-class="permission.iconClass"
          :item-title="permission.itemTitle"
          :item-detail="permission.itemDetail"
        />
      </FlexColDiv>
    </div>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="권한 수락하기" class="lg w-full medium btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import permissionGuide from '~/components/smartRing/permissionGuide.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import { ref } from 'vue'

const permissions = ref([
  {
    itemTitle: '신체 활동 및 건강 데이터 수집',
    itemDetail: '스마트링에서 측정한 심박수, 심박 변이도, 혈중 산소, 스트레스, 산소 포화도, 수면정보를 건강의신에 제공',
    iconClass: 'ico-data'
  },
  {
    itemTitle: '블루투스 연결',
    itemDetail:
      '건강의신 앱이 주변 블루투스 기기로 송신하거나 이에 대한 정보를 수집하는 동의 방식으로 블루투스를 제어할 수 있도록 이용',
    iconClass: 'ico-bluetooth '
  },
  {
    itemTitle: '위치정보',
    itemDetail:
      '기기 탐색 및 원활한 데이터 수집을 위해 위치 정보가 필요합니다. 해당 정보는 스마트링 연결 외 다른 용도로 사용되지 않습니다. 위치 정보',
    iconClass: 'ico-loaction'
  }
])
</script>

<style scoped lang="scss"></style>
