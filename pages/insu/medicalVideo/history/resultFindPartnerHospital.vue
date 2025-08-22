<template>
  <BaseBody page-title="의료영상공유" :has-notification="true" :show-back-button="true">
    <section class="issue-history">
      <TitleSection
        title="제휴병원 찾기로<br/>총 3개의 병원을 찾았어요."
        description="아래 병원을 연결하면 의료영상을<br/>공유할 수 있어요."
      />
    </section>
    <div class="wrap-select-doc">
      <div class="wrap-check">
        <Checkbox id="checkAll" v-model="selectAll" aria-label="전체선택" @change="handleSelectAll" />
      </div>
      <FlexColDiv class="gap-12">
        <HospitalSelectorLarge
          v-for="(hospital, index) in hospitals"
          :key="hospital.id"
          v-model="hospitalChecks[index]"
          :hospital="hospital"
          @update:model-value="handleIndividualCheck"
        />
      </FlexColDiv>
    </div>
    <ButtonGroup class="is-fixed">
      <Button aria-label="제휴병원 연결" btn-type="primary" class="lg w-full" />
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import Checkbox from '~/components/publishing/input/check.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import HospitalSelectorLarge from '~/components/insu/HospitalSelectorLarge.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
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
