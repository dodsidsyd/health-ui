<template>
  <BaseBody :show-back-button="true" page-title="캐시 데이터 관리  " logo-type="text" class="pb-36">
    <section class="cacheSection">
      <div class="flex space-between align-center">
        <strong>기기 저장공간 1GB 이하일 때 알림 받기</strong>
        <Checkbox id="checkBox1" custom-style="switch" aria-label="" checked />
      </div>
      <P class="mt-5"
        >건강의 신의 원활한 사용을 위하서는<br />최소 1GB이상의 저장공간이 필요합니다.<br />(저장공간이 350MB 미만인
        경우에는 알림해제 불가)
      </P>
    </section>
    <section class="cacheSection">
      <div class="flex space-between align-center">
        <strong>캐시 데이터 삭제</strong>
        <span class="data gray">4.04MB</span>
      </div>
      <p class="mt-8">임시 저장된 캐시 파일을 삭제하여 저장공간을 확보합니다. 캐시 데이터 삭제를 진행하시겠습니까?</p>
      <Button btn-type="secondary" element-type="button" class="sm mt-20" aria-label="캐시 데이터 삭제" />
    </section>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import Button from '~/components/publishing/button/Button.vue'
</script>

<style scoped lang="scss">
.cacheSection {
  padding: 2rem 0;
  & + .cacheSection {
    border-top: 1px solid #e2e2e2;
  }
}
strong {
  display: inline-block;
}
span {
  display: inline-block;
  &.gray {
    font-size: var(--num-14);
    color: #959595;
  }
}

p {
  width: calc(100% - 6.5rem);
  font-size: var(--num-14);
  color: #555;
}
</style>
