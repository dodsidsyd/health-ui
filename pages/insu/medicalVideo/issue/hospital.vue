<template>
  <BaseBody page-title="의료영상발급" :show-back-button="true" :has-notification="true" class="pb-36">
    <!-- 타이틀 영역 -->
    <template v-if="hospitalCount > 0">
      <section class="hospital-search">
        <TitleSection
          :title="`제휴병원 찾기로 <br />총 ${hospitalCount}개의 병원을 찾았어요.`"
          description="아래 병원을 연결하면 의료영상을<br />공유할 수 있어요."
        />

        <div class="wrap-select-doc">
          <div class="wrap-check">
            <Checkbox id="checkAll" v-model="selectAll" aria-label="전체선택" @change="handleSelectAll" />
          </div>
          <div class="wrap-list">
            <HospitalSelector
              v-for="(hospital, index) in hospitals"
              :key="hospital.id"
              :hospital="hospital"
              v-model="hospitalChecks[index]"
              @update:model-value="handleIndividualCheck"
            />
          </div>
        </div>
      </section>
    </template>
    <template v-else>
      <InsuEmpty
        title="조회된 제휴병원이 없어요."
        subTitle="병원에 등록된 환자인지 확인 후 <br />다시 조회해주세요."
        button
        @click="router.push('/insu/medicalVideo/issue/search')"
      />
    </template>
    <ButtonGroup class="is-fixed">
      <Button
        v-if="hospitalCount > 0"
        btn-type="primary"
        element-type="button"
        aria-label="제휴병원 연결"
        class="lg w-full medium btn-sticky"
        @click="router.push('/insu/medicalVideo/issue/selectedHospitals')"
      />
      <Button
        v-else
        btn-type="primary"
        element-type="button"
        aria-label="청구의 신 홈으로"
        class="lg w-full medium btn-sticky"
        @click="router.push('/insu')"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import HospitalSelector from '~/components/insu/HospitalSelector.vue'
import InsuEmpty from '~/components/insu/InsuEmpty.vue'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.push('/insu/medicalVideo/issue/search')
  } else {
    // 히스토리가 없으면 홈으로 이동
    router.push('/insu/medicalVideo/issue')
  }
}

// 병원 데이터
const hospitals = ref([
  {
    id: 1,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
  },
  {
    id: 2,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
  },
  {
    id: 3,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
  },
  {
    id: 4,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
  },
  {
    id: 5,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
  },
  {
    id: 6,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
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
.hospital-search {
  padding: 2rem 0 0;
}

.wrap-select-doc {
  .wrap-check {
    margin: 0 -2rem;
    padding: 2rem;
    @include mixin.flex-container(items-center);
    justify-content: flex-end;
  }

  .wrap-list {
    margin: 0 -2rem;
    padding: 2rem 2rem 4.8rem;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    gap: 1.1rem;
    flex-wrap: wrap;
  }
}
</style>
