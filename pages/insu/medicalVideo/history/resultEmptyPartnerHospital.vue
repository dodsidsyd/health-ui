<template>
  <BaseBody page-title="의료영상공유" :has-notification="true" :show-back-button="true">
    <section class="issue-history">
      <TitleSection title="조회된 제휴병원이 없어요." description="제휴병원 다시 찾기를 진행해보세요." />
    </section>
    <EmptyResult :is-absolute="true" :title="'조회된 제휴병원이 없어요.'">
      <div class="text-center">
        <p style="color: #555">
          병원에 등록된 환자인지 확인 후<br />
          다시 조회해주세요.
        </p>
        <Button btn-type="line" element-type="button" aria-label="제휴병원 다시 찾기" class="xs mt-16" :width="13" />
      </div>
    </EmptyResult>
    <ButtonGroup class="is-fixed half">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky">의료영상 내역으로</Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky">이메일로 전달하기</Button>
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'

import EmptyResult from '~/components/publishing/wholeMenu/EmptyResult.vue'
// 병원 데이터
const hospitals = ref([
  {
    id: 1,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg',
    address: '부산광역시 서구 대신공원로 26'
  },
  {
    id: 2,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg',
    address: '대구광역시 달서구 달구벌대로 1035'
  },
  {
    id: 3,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg',
    address: '부산광역시 서구 대신공원로 26'
  },
  {
    id: 4,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg',
    address: '부산광역시 서구 대신공원로 26'
  },
  {
    id: 5,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg',
    address: '부산광역시 서구 대신공원로 26'
  },
  {
    id: 6,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg',
    address: '부산광역시 서구 대신공원로 26'
  }
])

const hospitalCount = computed(() => hospitals.value.length)

// 개별 병원 체크박스 상태 배열 (6개 병원)
const hospitalChecks = ref<boolean[]>([false, false, false, false, false, false])

// 전체선택 상태
const selectAll = computed({
  get: () => hospitalChecks.value.every(check => check),
  set: (value: boolean) => {
    hospitalChecks.value = hospitalChecks.value.map(() => value)
  }
})

// 전체선택/해제 처리
const handleSelectAll = (): void => {
  console.log('전체 선택 변경:', selectAll.value)
}

// 개별 체크박스 변경 시 처리
const handleIndividualCheck = (): void => {
  console.log('개별 선택 변경:', hospitalChecks.value)
  // 전체선택 상태 업데이트
  const allChecked = hospitalChecks.value.every(check => check)
  const allUnchecked = hospitalChecks.value.every(check => !check)

  if (allChecked) {
    selectAll.value = true
  } else if (allUnchecked) {
    selectAll.value = false
  }
}
</script>
<style lang="scss" scoped>
.wrap-select-doc {
  .wrap-check {
    margin: 0 -2rem;
    padding: 2rem;
    @include mixin.flex-container(items-center);
    justify-content: flex-end;
  }
}
.issue-history {
  padding-top: 2.4rem;
}
</style>
