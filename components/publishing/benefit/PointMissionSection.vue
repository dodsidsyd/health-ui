<template>
  <FlexColDiv class="pointmission-section">
    <div class="pointmission-title-box">
      <div>
        <strong>전체 포인트 모으기</strong>
        <Button btn-type="trans" element-type="button" :border-radius="20" :width="2" :height="2">
          <div class="icon ico-question"></div>
        </Button>
      </div>
      <Button btn-type="gray" element-type="button" :border-radius="20" :width="3.2" :height="3.2" class="ico-cate">
        <span></span>
      </Button>
    </div>
    <PointMissionList />
  </FlexColDiv>
</template>
<script setup lang="ts">
import PointMissionList from '~/components/publishing/benefit/PointMissionList.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import Button from '~/components/publishing/button/Button.vue'
</script>
<style scoped lang="scss">
.pointmission-section {
  gap: 2.4rem;
  overflow: hidden;
  padding: 2rem;
  border-radius: 1.2rem;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
  .pointmission-title-box {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    > div {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 0.4rem;
    }
    .btn-trans {
      ::v-deep(.text) {
        display: block;
        width: 100%;
        height: 100%;
      }
      .icon {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}
</style>
