<template>
  <BaseBody
    :show-back-button="true"
    page-title="프로필설정"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text="true"
    add-text="<span style='color:#555;font-size:1.4rem'>전문가회원으로 전환</span>"
    class="pb-36"
  >
    <LineTabs :tabs="tabs" />
    <div class="flex flex-col gap-12 mt-24 pb-48">
      <div class="input-container">
        <!-- 클래스 추가 및 텍스트 변경 -->
        <div class="fz-16 bold mb-12">신체정보</div>
        <section class="flex flex-row gap-4">
          <InputText
            type="number"
            label="키 (Height / cm)"
            :is-valid="false"
            max-length="4"
            unit-r="cm"
            valid-text="키를 입력해주세요"
            placeholder=""
            class="flex-1"
          />
          <InputText
            type="number"
            label="몸무게 (Weight / kg)"
            :is-valid="false"
            max-length="4"
            unit-r="kg"
            valid-text="몸무게를 입력해주세요."
            placeholder=""
            class="flex-1"
          />
        </section>
      </div>
      <!-- 기초대사량 정보창 -->
      <section class="flex flex-row metabolic-rate">
        <div class="info">
          <span class="info-tit">기초대사량</span>
          <strong class="info-txt">1,487 kal</strong>
        </div>
        <div class="info">
          <span class="info-tit">체질량지수</span>
          <strong class="info-txt">22.5 bmi</strong>
        </div>
      </section>

      <section class="contents-box">
        <div class="box-tit fz-14">건강프로필을 설정해주세요.</div>
        <ul class="box-txt fz-12">
          <li>
            건강프로필 설정에서 만성질환 정보와 생활습관 정보를 바탕으로 동일연령대 대비 건강상태를 AI 분석을 통해
            백분위로 제공합니다.
          </li>
          <li>신체정보 및 활동정보를 이용해서 권장걸음수를 산정, 최적의 운동목표를 제시합니다.</li>
          <li>진료받은 병원과 연동된 경우 AI 정밀분석 데이터를 제공합니다.</li>
        </ul>
      </section>

      <section>
        <div class="fz-16 bold">만성질환 선택</div>
        <div class="fz-16 regular fc-body-02 mt-8">만성질환 진단을 받으셨거나 정기적인 약물 치료중이신가요?</div>
        <div class="btn-radio-box mt-12">
          <div class="flex flex-row gap-8 flex-11">
            <Radio id="rdo1" name="rdo1" custom-style="button" aria-label="아니오" class="flex-11 small" />
            <Radio id="rdo2" name="rdo1" checked custom-style="button" aria-label="네" class="flex-11 small" />
          </div>
        </div>
        <div class="contents-box mt-8">
          <div class="badge-list-box">
            <div v-if="selectedDiseaseNames.length === 0" class="no-selection">선택한 만성질환이 없습니다.</div>
            <div v-else class="selected-diseases">
              <span v-for="diseaseName in selectedDiseaseNames" :key="diseaseName" class="disease-badge">
                {{ diseaseName }}
                <button
                  type="button"
                  class="badge-remove-btn"
                  aria-label="제거"
                  @click="removeDiseaseByName(diseaseName)"
                ></button>
              </span>
            </div>
          </div>
          <Button btn-type="line" element-type="button" class="xs w-auto" @click="openChronicDiseasePopup">
            <i class="icon ico-plus"></i>
            만성질환 선택
          </Button>
        </div>
      </section>
      <div class="mt-20">
        <div class="fz-16 bold">흡연정보 입력</div>
        <div class="fz-16 regular fc-body-02 mt-8">
          지금까지 평생 총 5갑(100개비) 이상의 일반담배(궐련)를 피운적이 있습니까?
        </div>
        <div class="btn-radio-box mt-12">
          <div class="flex flex-row gap-8 flex-11">
            <Radio id="rdo3" name="rdo2" custom-style="button" aria-label="아니오" class="flex-11 small" />
            <Radio id="rdo4" name="rdo2" checked custom-style="button" aria-label="네" class="flex-11 small" />
          </div>
        </div>
        <div class="contents-box mt-12">
          <div>현재 일반담배(궐련형 포함)을 피우십니까?</div>
          <div class="btn-radio-box mt-4">
            <div class="flex flex-col gap-8 flex-11">
              <Radio
                id="rdo5"
                name="rdo3"
                custom-style="button"
                aria-label="과거에는 피웠으나 현재는 끊었음"
                class="flex-11 small"
              />
              <Radio id="rdo6" name="rdo3" checked custom-style="button" aria-label="현재피움" class="flex-11 small" />
            </div>
            <div class="flex flex-row gap-8 mt-12">
              <InputText type="number" label="총 기간" :is-valid="false" unit-r="년" placeholder="0" class="flex-1" />
              <InputText
                type="number"
                label="하루평균"
                :is-valid="false"
                unit-r="개피"
                placeholder="0"
                class="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-20">
        <div class="fz-16 bold">음주정보 입력</div>
        <div class="fz-16 regular fc-body-02 mt-8 mb-12">지난 1년동안 술을 마신 횟수는 어느정도 입니까?</div>
        <Radio
          id="rdo7"
          v-model="drinkingFrequency"
          name="rdo4"
          custom-style="button"
          aria-label="술을 마시지 않음"
          class="flex-11 small"
          :value="'술을 마시지 않음'"
        />
        <div v-show="drinkingFrequency !== '술을 마시지 않음'" class="contents-box mt-8">
          <InputText
            type="number"
            :label="drinkingLabel"
            :is-valid="false"
            unit-r="회"
            placeholder="0"
            class="flex-1"
            :disabled="drinkingFrequency === '술을 마시지 않음'"
          />
        </div>
        <div class="flex flex-row gap-8 mt-12">
          <Radio
            id="rdo8"
            v-model="drinkingFrequency"
            name="rdo4"
            custom-style="button"
            aria-label="일주일에"
            class="flex-11 small"
            :value="'일주일에'"
            checked
          />
          <Radio
            id="rdo9"
            v-model="drinkingFrequency"
            name="rdo4"
            custom-style="button"
            aria-label="한달에"
            class="flex-11 small"
            :value="'한달에'"
          />
          <Radio
            id="rdo10"
            v-model="drinkingFrequency"
            name="rdo4"
            custom-style="button"
            aria-label="1년에"
            class="flex-11 small"
            :value="'1년에'"
          />
        </div>
      </div>
      <div class="mt-20">
        <div class="fz-16 bold">평소 활동정보 입력</div>
        <div class="fz-16 regular fc-body-02 mt-8">평소 활동량은 어느정도 입니까?</div>
        <div class="flex flex-col gap-8 mt-12">
          <Radio
            id="rdo11"
            name="rdo5"
            custom-style="button"
            aria-label="운동을 거의 또는 전혀하지 않음"
            class="flex-11 small"
          />
          <Radio
            id="rdo12"
            name="rdo5"
            custom-style="button"
            aria-label="가벼운 운동이나 스포츠 활동(1~3회/1주)"
            class="flex-11 small"
          />
          <Radio
            id="rdo13"
            name="rdo5"
            custom-style="button"
            aria-label="중간강도의 운동이나 스포츠 활동(3~5회/1주)"
            class="flex-11 small"
          />
          <Radio
            id="rdo14"
            name="rdo5"
            custom-style="button"
            aria-label="격렬한 운동이나 스포츠 활동(6~7회/1주)"
            class="flex-11 small"
          />
          <Radio
            id="rdo15"
            name="rdo5"
            custom-style="button"
            aria-label="매우 힘든 운동이나 스포츠 활동, 육체노동"
            class="flex-11 small"
          />
        </div>
      </div>
      <div class="mt-20">
        <div class="fz-16 bold">운동정보 입력</div>
        <div class="fz-16 regular fc-body-02 mt-8">최근 1주일동안 운동횟수는 어느정도입니까?</div>
        <div class="flex flex-col gap-8 mt-12">
          <Radio
            id="rdo16"
            v-model="exerciseFrequency"
            name="rdo6"
            custom-style="button"
            aria-label="과거에도 현재에도 하지 않음"
            class="flex-11 small"
            :value="'과거에도 현재에도 하지 않음'"
          />
          <Radio
            id="rdo17"
            v-model="exerciseFrequency"
            name="rdo6"
            custom-style="button"
            aria-label="가벼운 운동이나 스포츠 활동(1~3회/1주)"
            class="flex-11 small"
            :value="'가벼운 운동이나 스포츠 활동(1~3회/1주)'"
          />
        </div>
        <div class="flex flex-row gap-8 mt-8">
          <Radio
            id="rdo18"
            v-model="exerciseFrequency"
            name="rdo6"
            custom-style="button"
            aria-label="일주일에"
            class="flex-11 small"
            :value="'일주일에'"
            checked
          />
          <Radio
            id="rdo19"
            v-model="exerciseFrequency"
            name="rdo6"
            custom-style="button"
            aria-label="한달에"
            class="flex-11 small"
            :value="'한달에'"
          />
          <Radio
            id="rdo20"
            v-model="exerciseFrequency"
            name="rdo6"
            custom-style="button"
            aria-label="1년에"
            class="flex-11 small"
            :value="'1년에'"
          />
        </div>
        <div v-show="!isExerciseInputDisabled" class="contents-box mt-8">
          <InputText
            type="number"
            :label="exerciseLabel"
            :is-valid="false"
            unit-r="회"
            placeholder="0"
            class="flex-1"
            :disabled="isExerciseInputDisabled"
          />
        </div>
      </div>
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 취소 </Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky" @click="clickBottomModal"> 저장 </Button>
    </ButtonGroup>
    <!-- 만성질환 선택 모달 -->
    <ChronicDiseaseModal
      :show="showChronicDiseasePopup"
      :selected-diseases="selectedDiseases"
      @close="closeChronicDiseasePopup"
      @confirm="handleDiseaseSelection"
    />

    <!-- 전문가 회원 전환 확인 모달 -->
    <ConfirmModal
      :is-visible="showExpertMemberModal"
      title="전문가 회원 전환"
      content="전문가 회원으로 전환하시겠습니까?"
      confirm-button-text="전환하기"
      cancel-button-text="취소"
      @confirm="handleExpertMemberConfirm"
      @cancel="closeExpertMemberModal"
      @close="closeExpertMemberModal"
    />

    <!-- 레몬건강지수 서비스 이용동의 모달 -->
    <BottomServiceAgreeMoal
      :is-visible="showServiceAgreeModal"
      @close="closeServiceAgreeModal"
      @confirm="handleServiceAgreeConfirm"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, watch } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Radio from '~/components/publishing/input/radio.vue'
import InputText from '~/components/publishing/input/InputText.vue'

import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import ChronicDiseaseModal from '~/components/modal/ChronicDiseaseModal.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'

import BottomServiceAgreeMoal from '~/components/common/setProfile/BottomServiceAgreeModal.vue'

// 만성질환 데이터 타입 정의
interface ChronicDisease {
  id: string
  name: string
  category?: string
}

// 흡연 상태 관련 상태
const smokingStatus = ref('현재피움') // rdo6가 기본 선택값

// 음주 빈도 관련 상태
const drinkingFrequency = ref('일주일에') // 기본값

// 운동 빈도 관련 상태
const exerciseFrequency = ref('일주일에') // 기본값

const tabs = ref<Tab[]>([
  { title: '계정정보', to: '/common/setProfile/accountInfoInput' },
  { title: '건강프로필', to: '/common/setProfile/healthInput' },
  { title: '비즈프로필', to: '/common/setProfile/bizProfileInput' } // 비즈프로필 활성화 시
])

// 만성질환 선택 관련 상태
const showChronicDiseasePopup = ref(false)
const selectedDiseases = ref<string[]>([])

// 전문가 회원 전환 모달 관련 상태
const showExpertMemberModal = ref(false)

// 서비스 이용동의 모달 관련 상태
const showServiceAgreeModal = ref(false)

// 만성질환 목록 데이터 (배지 표시용)
const chronicDiseases = ref<ChronicDisease[]>([
  { id: 'diabetes', name: '당뇨병' },
  { id: 'hypertension', name: '고혈압' },
  { id: 'dyslipidemia', name: '이상지질혈증' },
  { id: 'heart_disease', name: '심장질환' },
  { id: 'stroke', name: '뇌졸중' },
  { id: 'kidney_disease', name: '만성신장질환' },
  { id: 'liver_disease', name: '만성간질환' },
  { id: 'thyroid', name: '갑상선질환' },
  { id: 'arthritis', name: '관절염' },
  { id: 'osteoporosis', name: '골다공증' },
  { id: 'copd', name: '만성폐쇄성폐질환' },
  { id: 'asthma', name: '천식' },
  { id: 'depression', name: '우울증' },
  { id: 'anxiety', name: '불안장애' },
  { id: 'cancer', name: '암' }
])

// 선택된 질환들의 이름 배열
const selectedDiseaseNames = computed(() => {
  return selectedDiseases.value
    .map(diseaseId => {
      const disease = chronicDiseases.value.find(d => d.id === diseaseId)
      return disease ? disease.name : ''
    })
    .filter(name => name !== '')
})

// 만성질환 팝업 열기
const openChronicDiseasePopup = () => {
  showChronicDiseasePopup.value = true
}

// 만성질환 팝업 닫기
const closeChronicDiseasePopup = () => {
  showChronicDiseasePopup.value = false
}

// 질환 선택 처리
const handleDiseaseSelection = (diseases: string[]) => {
  selectedDiseases.value = diseases
  showChronicDiseasePopup.value = false
  console.log('선택된 만성질환:', diseases)
}

// 질환명으로 개별 제거
const removeDiseaseByName = (diseaseName: string) => {
  const disease = chronicDiseases.value.find(d => d.name === diseaseName)
  if (disease) {
    const index = selectedDiseases.value.indexOf(disease.id)
    if (index > -1) {
      selectedDiseases.value.splice(index, 1)
    }
  }
}

// 흡연 상태에 따른 label 변경
const smokingPeriodLabel = computed(() => {
  if (smokingStatus.value === '현재피움') {
    return '총 기간 (현재 흡연 중)'
  } else if (smokingStatus.value === '과거에는 피웠으나 현재는 끊었음') {
    return '총 기간 (과거 흡연)'
  }
  return '총 기간'
})

const smokingAmountLabel = computed(() => {
  if (smokingStatus.value === '현재피움') {
    return '하루평균 (현재)'
  } else if (smokingStatus.value === '과거에는 피웠으나 현재는 끊었음') {
    return '하루평균 (과거)'
  }
  return '하루평균'
})

// 음주 빈도에 따른 label 변경
const drinkingLabel = computed(() => {
  if (drinkingFrequency.value === '술을 마시지 않음') {
    return '음주 안함'
  } else if (drinkingFrequency.value === '일주일에') {
    return '일주일에'
  } else if (drinkingFrequency.value === '한달에') {
    return '한달에'
  } else if (drinkingFrequency.value === '1년에') {
    return '1년에'
  }
  return '일주일에' // 기본값
})

// 운동 빈도에 따른 label 변경
const exerciseLabel = computed(() => {
  if (exerciseFrequency.value === '과거에도 현재에도 하지 않음') {
    return '운동 안함'
  } else if (exerciseFrequency.value === '가벼운 운동이나 스포츠 활동(1~3회/1주)') {
    return '가벼운 운동'
  } else if (exerciseFrequency.value === '일주일에') {
    return '일주일에'
  } else if (exerciseFrequency.value === '한달에') {
    return '한달에'
  } else if (exerciseFrequency.value === '1년에') {
    return '1년에'
  }
  return '일주일에' // 기본값
})

// 운동 입력 비활성화 여부
const isExerciseInputDisabled = computed(() => {
  return (
    exerciseFrequency.value === '과거에도 현재에도 하지 않음' ||
    exerciseFrequency.value === '가벼운 운동이나 스포츠 활동(1~3회/1주)'
  )
})

// 전문가 회원 전환 모달 열기
const openExpertMemberModal = () => {
  showExpertMemberModal.value = true
}

// 전문가 회원 전환 모달 닫기
const closeExpertMemberModal = () => {
  showExpertMemberModal.value = false
}

// 전문가 회원 전환 확인 처리
const handleExpertMemberConfirm = () => {
  closeExpertMemberModal()
}

// 저장 버튼 클릭 시 서비스 이용동의 모달 열기
const clickBottomModal = () => {
  showServiceAgreeModal.value = true
}

// 서비스 이용동의 모달 닫기
const closeServiceAgreeModal = () => {
  showServiceAgreeModal.value = false
}

// 레이아웃에서 addTextClick 핸들러 등록
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')

// 컴포넌트 마운트 시 addTextClick 핸들러 등록
onMounted(() => {
  if (setAddTextClickHandler) {
    setAddTextClickHandler(openExpertMemberModal)
  }
})
</script>
<style scoped lang="scss">
.metabolic-rate {
  background-color: #fff9df;
  border-radius: 0.8rem;
  padding: 1.6rem 2rem;
  gap: 0 3.2rem;
  @media (max-width: 375px) {
    padding: 1rem 1.6rem;
  }

  .info {
    flex: 1 1 auto;
    display: flex;
    position: relative;
    justify-content: space-between;
    .info-tit {
      flex: 0 0 auto;
      font-weight: vars.$regular;
      @media (max-width: 375px) {
        font-size: 1.2rem;
        align-self: center;
      }
    }
    .info-txt {
      font-weight: vars.$semibold;
      color: vars.$blue-primary;
      @media (max-width: 375px) {
        font-size: 1.4rem;
      }
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      margin-top: -0.8rem;
      left: -1.6rem;
      width: 0.1rem;
      height: 1.6rem;
      background: #e2e2e2;
    }
    &:first-child {
      &::before {
        content: none;
      }
    }
  }
}

.contents-box {
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 2rem;
  border-radius: 0.8rem;
  .box-tit {
    font-weight: vars.$semibold;
    color: #2b2b2b;
  }
  .box-txt {
    margin-top: 0.8rem;
    font-weight: vars.$regular;
    color: #555555;
    display: flex;
    flex-direction: column;
    li {
      position: relative;
      box-sizing: border-box;
      padding-left: 0.9rem;
      &::before {
        content: '';
        position: absolute;
        width: 0.3rem;
        height: 0.3rem;
        left: 0;
        top: 0.5rem;
        border-radius: 50%;
        background: #959595;
      }
    }
  }
  .btn-line {
    background: vars.$white;
    width: auto;
    flex: 0 0 auto;
    margin: auto;
    padding: 0 1.4rem;
  }
  .icon {
    width: 2rem;
    height: 2rem;
    display: inline-block;
  }
  // 배지 리스트 스타일
  .badge-list-box {
    margin-bottom: 1.2rem;

    .no-selection {
      color: #2b2b2b;
      font-size: 1.4rem;
      font-weight: vars.$semibold;
      padding: 0;
      text-align: center;
    }

    .selected-diseases {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;

      .disease-badge {
        display: inline-flex;
        align-items: center;
        background-color: #4f5561;
        color: vars.$white;
        padding: 0.7rem 0 0.5rem 1.4rem;
        padding-right: 0.8rem;
        border-radius: 2rem;
        font-size: 1.4rem;
        font-weight: vars.$medium;

        .badge-remove-btn {
          margin-left: 0.6rem;
          background: none;
          border: none;
          color: white;
          font-size: 1.6rem;
          font-weight: bold;
          cursor: pointer;
          padding: 0;
          width: 1.6rem;
          height: 1.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s ease;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.3334 6.66602L6.66675 13.3327M13.3334 13.3327L6.66675 6.66602' stroke='%23D2D2D2' stroke-width='1.25' stroke-linecap='round'/%3E%3C/svg%3E");
        }
      }
    }
  }
}
</style>
