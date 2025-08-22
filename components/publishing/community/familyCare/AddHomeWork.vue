<template>
  <section>
    <FlexColDiv class="gap-12 mt-20">
      <div class="input-box">
        <InputText
          label="숙제명*"
          placeholder="건강 숙제를 적어주세요"
          v-model="homeworkName"
          :is-invalid="showNameError"
          :valid-text="showNameError ? '숙제명을 입력하세요' : ''"
        />
      </div>
      <div class="input-box">
        <InputCalendarFromTo
          label="숙제 기간*"
          placeholder="시작일"
          placeholder2="마감일"
          v-model="homeworkPeriod"
          :is-invalid="showPeriodError"
          :valid-text="showPeriodError ? '기간을 선택해주세요' : ''"
        />
      </div>
      <div class="check-box">
        <label class="c-label">
          <span>숙제 인증 요일</span>
          <span class="required-mark">*</span>
        </label>
        <FlexRowDiv class="gap-8 mt-6">
          <Checkbox
            id="mon"
            name="mon"
            aria-label="월"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.mon"
          />
          <Checkbox
            id="tue"
            name="tue"
            aria-label="화"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.tue"
          />
          <Checkbox
            id="wed"
            name="wed"
            aria-label="수"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.wed"
          />
          <Checkbox
            id="thu"
            name="thu"
            aria-label="목"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.thu"
          />
          <Checkbox
            id="fri"
            name="fri"
            aria-label="금"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.fri"
          />
          <Checkbox
            id="sat"
            name="sat"
            aria-label="토"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.sat"
          />
          <Checkbox
            id="sun"
            name="sun"
            aria-label="일"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.sun"
          />
        </FlexRowDiv>
        <p v-if="showDaysError" class="feedback error">
          <span class="text">숙제 인증 요일을 선택하세요</span>
        </p>
      </div>
      <div class="check-box">
        <label class="c-label">
          <span>숙제 대상 </span>
          <span class="required-mark">*</span>
        </label>
        <FlexRowDiv class="gap-8 mt-6">
          <Checkbox
            id="all"
            name="all"
            aria-label="전체"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.all"
            @change="handleAllChange"
          />
          <Checkbox
            id="me"
            name="me"
            aria-label="나"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.me"
            @change="updateAllCheckbox"
          />
          <Checkbox
            id="mother"
            name="mother"
            aria-label="엄마"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.mother"
            @change="updateAllCheckbox"
          />
          <Checkbox
            id="oldDaughter"
            name="oldDaughter"
            aria-label="큰 딸"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.oldDaughter"
            @change="updateAllCheckbox"
          />
          <Checkbox
            id="youngDaughter"
            name="youngDaughter"
            aria-label="작은 딸"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.youngDaughter"
            @change="updateAllCheckbox"
          />
          <Checkbox
            id="sonInLaw"
            name="sonInLaw"
            aria-label="사위"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.sonInLaw"
            @change="updateAllCheckbox"
          />
          <Checkbox
            id="nephew"
            name="nephew"
            aria-label="조카"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.nephew"
            @change="updateAllCheckbox"
          />
          <Checkbox
            id="son"
            name="son"
            aria-label="아들"
            :button-type="true"
            class="buttonType3"
            v-model="selectedDays.son"
            @change="updateAllCheckbox"
          />
        </FlexRowDiv>
        <p v-if="showTargetsError" class="feedback error">
          <span class="text">숙제 대상을 선택하세요</span>
        </p>
      </div>
      <InputText label="요청 메세지" placeholder="숙제를 하는 멤버들에게 응원의 메시지를 보내주세요" />
    </FlexColDiv>
  </section>
</template>

<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import { ref, computed, watch } from 'vue'

interface SelectedDays {
  // 요일
  mon: boolean
  tue: boolean
  wed: boolean
  thu: boolean
  fri: boolean
  sat: boolean
  sun: boolean
  // 대상
  all: boolean
  me: boolean
  mother: boolean
  oldDaughter: boolean
  youngDaughter: boolean
  sonInLaw: boolean
  nephew: boolean
  son: boolean
}

interface Props {
  showRequiredError?: {
    name?: boolean
    period?: boolean
    days?: boolean
    targets?: boolean
  }
}

const props = withDefaults(defineProps<Props>(), {
  showRequiredError: () => ({
    name: false,
    period: false,
    days: false,
    targets: false
  })
})

const emit = defineEmits<{
  'update:selectedDays': [selectedDays: SelectedDays]
  'update:homeworkName': [name: string]
  'update:homeworkPeriod': [period: any]
  validate: [isValid: boolean]
}>()

const homeworkName = ref('')
const homeworkPeriod = ref(null)
const selectedDays = ref<SelectedDays>({
  // 요일
  mon: false,
  tue: false,
  wed: false,
  thu: false,
  fri: false,
  sat: false,
  sun: false,
  // 대상
  all: false,
  me: false,
  mother: false,
  oldDaughter: false,
  youngDaughter: false,
  sonInLaw: false,
  nephew: false,
  son: false
})

const handleAllChange = () => {
  if (selectedDays.value.all) {
    selectedDays.value.me = true
    selectedDays.value.mother = true
    selectedDays.value.oldDaughter = true
    selectedDays.value.youngDaughter = true
    selectedDays.value.sonInLaw = true
    selectedDays.value.nephew = true
    selectedDays.value.son = true
  } else {
    selectedDays.value.me = false
    selectedDays.value.mother = false
    selectedDays.value.oldDaughter = false
    selectedDays.value.youngDaughter = false
    selectedDays.value.sonInLaw = false
    selectedDays.value.nephew = false
    selectedDays.value.son = false
  }
}

// 개별 대상들이 모두 선택되었을 때 전체 체크박스 자동 체크
const updateAllCheckbox = () => {
  const individualTargets = [
    selectedDays.value.me,
    selectedDays.value.mother,
    selectedDays.value.oldDaughter,
    selectedDays.value.youngDaughter,
    selectedDays.value.sonInLaw,
    selectedDays.value.nephew,
    selectedDays.value.son
  ]

  // 개별 대상들이 모두 선택되었으면 전체도 true
  if (individualTargets.every(target => target)) {
    selectedDays.value.all = true
  } else {
    selectedDays.value.all = false
  }
}

// 모든 필수 항목이 입력되었는지 확인
const isFormValid = computed(() => {
  const hasName = homeworkName.value.trim().length > 0
  const hasPeriod = homeworkPeriod.value !== null
  const hasDays = Object.values({
    mon: selectedDays.value.mon,
    tue: selectedDays.value.tue,
    wed: selectedDays.value.wed,
    thu: selectedDays.value.thu,
    fri: selectedDays.value.fri,
    sat: selectedDays.value.sat,
    sun: selectedDays.value.sun
  }).some(day => day)
  const hasTargets = Object.values({
    me: selectedDays.value.me,
    mother: selectedDays.value.mother,
    oldDaughter: selectedDays.value.oldDaughter,
    youngDaughter: selectedDays.value.youngDaughter,
    sonInLaw: selectedDays.value.sonInLaw,
    nephew: selectedDays.value.nephew,
    son: selectedDays.value.son
  }).some(target => target)

  return hasName && hasPeriod && hasDays && hasTargets
})

// 데이터가 변경될 때마다 부모에게 알림
const updateFormData = () => {
  emit('update:selectedDays', selectedDays.value)
  emit('update:homeworkName', homeworkName.value)
  emit('update:homeworkPeriod', homeworkPeriod.value)
  emit('validate', isFormValid.value)
}

// 데이터 변경 감지
watch([homeworkName, homeworkPeriod, selectedDays], updateFormData, { deep: true })

// 부모에서 validation 상태를 받아서 표시
const showRequiredError = computed(() => props.showRequiredError)
const showNameError = computed(() => props.showRequiredError?.name || false)
const showPeriodError = computed(() => props.showRequiredError?.period || false)
const showDaysError = computed(() => props.showRequiredError?.days || false)
const showTargetsError = computed(() => props.showRequiredError?.targets || false)
</script>

<style scoped lang="scss">
.input-box,
.check-box {
  display: flex;
  flex-direction: column;
  .c-label {
    span:not(.required-mark) {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.6rem;
      color: #555;
    }
    .required-mark {
      color: #f14960;
      font-weight: 400;
      display: inline-block;
      margin-left: 0.4rem;
    }
  }
  .feedback.error {
    margin-top: 0.4rem;
    font-size: 1.2rem;
    color: #e74c3c;

    .text {
      display: block;
    }
  }
  .flex {
    flex-wrap: wrap;
  }
}
</style>
