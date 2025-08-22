<template>
  <BaseBody page-title="의료영상발급" :show-back-button="true" :has-notification="true" class="pb-36">
    <section class="hospital-search">
      <TitleSection title="다녀온 병원을 선택해 주세요." description="">
        <template #content>
          <div class="service-help">
            <span>
              제휴병원을 선택하여 의료영상을<br />
              확인해주세요.
              <div class="tooltip-wrapper">
                <i class="icon ico-info4" aria-hidden="true" @click="toggleTooltip"></i>
                <div v-if="showTooltip" class="tooltip-content">
                  <div class="tooltip-arrow"></div>
                  <div class="tooltip-header">
                    <span class="tooltip-text">
                      제휴병원을 연결해<br />
                      의료영상을 제공 받을 수 있어요.
                    </span>
                    <button class="tooltip-close" @click="toggleTooltip" aria-label="툴팁 닫기">
                      <i class="icon close" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </template>
      </TitleSection>
      <Button btn-type="line" element-type="button" aria-label="제휴병원 연결하기" class="w-full xm mt-16" />
      <hr class="hr-section ml-n20 mr-n20" />
      <TotalCountSelectType :count="count" :select="false" />
      <div class="wrap-list">
        <HospitalItem v-for="hospital in hospitals" :key="hospital.id" :hospital="hospital" />
      </div>
    </section>
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="제휴병원 연결"
        class="lg w-full medium btn-sticky"
        @click="completeSelection"
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
import TotalCountSelectType from '~/components/publishing/common/temp/TotalCountSelectType.vue'
import HospitalItem from '~/components/insu/HospitalItem.vue'

const router = useRouter()

// 툴팁 상태
const showTooltip = ref(false)

// 툴팁 토글 함수
const toggleTooltip = () => {
  showTooltip.value = !showTooltip.value
}

// 병원 데이터
const hospitals = ref([
  {
    id: 1,
    href: '#',
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  },
  {
    id: 2,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  },
  {
    id: 3,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  },
  {
    id: 4,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  },
  {
    id: 5,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  },
  {
    id: 6,
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 안암로 100'
  }
])

const hospitalCount = computed(() => hospitals.value.length)

const count = computed(() => hospitalCount.value)

// 개별 병원 체크박스 상태 배열
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

// 선택 완료 후 선택된 병원 목록 화면으로 이동
const completeSelection = () => {
  const selectedHospitals = hospitals.value.filter((_, index) => hospitalChecks.value[index])
  if (selectedHospitals.length > 0) {
    // 선택된 병원들을 localStorage에 저장
    localStorage.setItem('selectedHospitals', JSON.stringify(selectedHospitals))
    router.push('/insu/medicalVideo/issue/selected-hospitals')
  } else {
    alert('병원을 하나 이상 선택해주세요.')
  }
}
</script>

<style lang="scss" scoped>
.hospital-search {
  padding: 2rem 0 0;
}

.service-help {
  & > span {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.5rem;
    color: #555;
    display: inline;
    position: relative;

    .tooltip-wrapper {
      display: inline-block;
      position: relative;
      height: 2rem;
      .icon {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        transition: color 0.2s ease;
        vertical-align: middle;
      }

      .tooltip-content {
        position: absolute;
        width: max-content;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 0.8rem;
        background-color: #fff;
        padding: 1.2rem;
        border-radius: 0.8rem;
        font-size: 1.4rem;
        line-height: 1.6;
        white-space: nowrap;
        z-index: 1000;
        box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.3);

        .tooltip-arrow {
          position: absolute;
          top: -0.6rem;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 0.6rem solid transparent;
          border-right: 0.6rem solid transparent;
          border-bottom: 0.6rem solid #fff;
        }

        .tooltip-header {
          display: flex;
          align-items: flex-start;
          gap: 1.2rem;

          .tooltip-text {
            white-space: normal;
            flex: 1;
          }

          .tooltip-close {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 50%;
            transition: background-color 0.2s ease;

            .icon {
              width: 1.8rem;
              height: 1.8rem;
              background-size: cover;
              transition: color 0.2s ease;
            }
          }
        }
      }
    }
  }
}

.wrap-list {
  margin: 0 -2rem;
  border-top: 1px solid #eee;
  padding: 0 2rem;
}
</style>
