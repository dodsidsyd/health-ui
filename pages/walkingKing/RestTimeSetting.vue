<template>
  <BaseBody page-title="걷기왕 챌린지" :show-back-button="true">
    <div class="rest-time-setting">
      <h2 class="tit">휴식시간 설정하기</h2>
      <div class="sub-tit">
        <strong class="bold-txt"
          >챌리지에 참가하려면<br />
          휴식시간을 설정해야 합니다.</strong
        >
        <span
          >휴식 시작 시간을 자유롭게 선택할 수 있습니다. <br />
          단, 시작 시간 이후 8시간을 휴식 시간으로 지정합니다.
        </span>
      </div>

      <div class="info-blue-txt">
        <p>챌린지가 시작되면 휴식 시간 변경은 불가능합니다.</p>
        휴식시간 동안 챌린지 내 걸음수는 인정하지 않으며 부스터 아이템 적용에도 제외됩니다.
      </div>
    </div>

    <InputClockFromTo label="휴식시간*" :hour-only="true" />
    <ButtonGroup class="is-fixed">
      <Button btn-type="secondary" element-type="a" href="/community/diary/list" aria-label="취소" class="lg" />
      <Button btn-type="primary" element-type="a" href="/community/diary/list" aria-label="확인" class="lg" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import MainProfile from '~/components/publishing/walkking/subMain/MainProfile.vue'

import InputClockFromTo from '~/components/publishing/input/InputClockFromTo.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
</script>

<style scoped lang="scss">
.rest-time-setting {
  .tit {
    font-size: 2.4rem;
    font-weight: 700;
    color: #2b2b2b;
    margin-top: 2.4rem;
  }
  .sub-tit {
    margin-top: 1.6rem;
    font-size: 1.6rem;
    color: #555;
    font-weight: 400;
    .bold-txt {
      display: block;
      margin-bottom: 0.8rem;
    }
  }
  .info-blue-txt {
    margin-top: 2rem;
    margin-bottom: 3.2rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: vars.$blue-primary;
    display: flex;
    flex-direction: column;
    gap: 1.2rem 0;
  }
}
</style>
