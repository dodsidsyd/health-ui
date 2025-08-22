<template>
  <div class="medical-history-accordion">
    <div v-if="isLabelTitle" class="accordion-header">
      <span>{{ labelTitle }}</span>
    </div>
    <div
      v-for="(hospital, index) in medicalHistory"
      :key="hospital.id"
      class="accordion-item"
      :class="{ selected: showCheckbox && hospitalSelections[index] }"
    >
      <div class="item-header">
        <div class="item-header-top">
          <div class="item-logo">
            <img :src="hospital.logo" :alt="hospital.hospitalName" />
          </div>
          <div class="item-info">
            <div class="item-tit">
              {{ hospital.hospitalName }}
            </div>
            <div class="item-video-count">
              영상보유 <span>{{ getVideoCount(hospital) }}</span
              >건
            </div>
          </div>
          <div v-if="showStatus" class="item-status">
            <Button
              btn-type="text"
              class="sm"
              :aria-label="hospital.status || '상태'"
              :icon="hospital.arrowType ? 'arrow-type' : ''"
              icon-position="right"
              :disabled="!hospital.arrowType"
            />
          </div>
          <div v-if="showCheckbox" class="item-checkbox">
            <Checkbox
              :id="`checkbox-${hospital.hospitalName}`"
              :model-value="hospitalSelections[index]"
              custom-style="small"
              aria-label=""
              @update:model-value="value => handleCheckboxChange(index, value)"
            />
          </div>
        </div>

        <div class="item-header-bottom">
          <div v-if="isIssueDate" class="item-date">
            <strong>발급 일자</strong>
            <strong>{{ hospital.accessDate }}</strong>
          </div>
          <div v-if="isShareDate" class="item-date">
            <strong>공유 기간</strong>
            <strong v-if="!(hospital.shareFrom && hospital.shareTo)" class="expire">공유기간 만료</strong>
            <strong v-else class="date">{{ hospital.shareFrom }} ~ {{ hospital.shareTo }}</strong>
          </div>

          <ButtonGroup
            v-if="getVisibleButtons(hospital.buttonCount, hospital.buttonKeys).length > 0"
            :class="getButtonGroupClass(hospital.buttonCount, hospital.buttonKeys)"
            gap="6"
          >
            <Button
              v-for="btn in getVisibleButtons(hospital.buttonCount, hospital.buttonKeys)"
              :key="btn.key"
              :btn-type="btn.type"
              class="sm"
              :aria-label="btn.label"
            />
          </ButtonGroup>
        </div>
      </div>
      <div class="item-content" :class="{ 'is-expanded': isDetailVisible[index] }">
        <div class="department-list">
          <div v-for="department in hospital.departments" :key="department.id" class="department-item">
            <div class="department-item-label">
              <strong>진료과</strong>
              <strong>{{ department.department }}</strong>
            </div>
            <div v-for="examination in department.examinations" :key="examination.id" class="department-item-tit">
              <div class="department-item-tit-text">{{ examination.name }}</div>
              <div class="department-item-tit-text">{{ examination.date }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-toggle" @click="toggleDetail(index)">
        <div class="toggle-text">{{ isDetailVisible[index] ? '내역접기' : '내역보기' }}</div>
        <i class="icon-arrow" :class="{ 'is-rotated': isDetailVisible[index] }"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Checkbox from '~/components/publishing/input/check.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'

interface Examination {
  id: number
  name: string
  date: string
}

interface Department {
  id: number
  department: string
  examinations: Examination[]
}

interface MedicalHistory {
  id: number
  hospitalName: string
  logo: string
  // 항목별 확장 필드
  status?: string
  arrowType?: boolean
  accessDate?: string
  shareFrom?: string
  shareTo?: string
  buttonCount?: 0 | 1 | 2 | 3
  buttonKeys?: ('share' | 'cd' | 'history')[]
  departments: Department[]
}

interface Props {
  medicalHistory: MedicalHistory[]
  isLabelTitle?: boolean
  labelTitle?: string
  isIssueDate?: boolean
  isShareDate?: boolean
  showStatus?: boolean
  showCheckbox?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelTitle: '의료영상 공유내역',
  showStatus: false,
  showCheckbox: false,
  isIssueDate: false,
  isShareDate: false,
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const allButtons = [
  { key: 'share', label: '영상 공유', type: 'primary-line' },
  { key: 'cd', label: 'CD 배송', type: 'line' },
  { key: 'history', label: '영상 공유 내역', type: 'line' }
]

const getVisibleButtons = (count?: number, keys?: ('share' | 'cd' | 'history')[]) => {
  if (keys && keys.length) {
    return allButtons.filter(b => keys.includes(b.key))
  }
  const c = Math.max(0, Math.min(3, count ?? 0))
  return allButtons.slice(0, c)
}

const getButtonGroupClass = (count?: number, keys?: ('share' | 'cd' | 'history')[]) => {
  const length = keys?.length ?? Math.max(0, Math.min(3, count ?? 0))
  return {
    single: length === 1,
    half: length === 2,
    triple: length === 3
  }
}

// 아코디언 상태 (초기: 닫힘)
const isDetailVisible = ref<boolean[]>(props.medicalHistory.map(() => false))

// 각 병원의 체크박스 상태를 관리하는 배열
const hospitalSelections = ref<boolean[]>(props.medicalHistory.map(() => props.modelValue || false))

// 아코디언 토글 함수
const toggleDetail = (index: number) => {
  isDetailVisible.value[index] = !isDetailVisible.value[index]
}

// 체크박스 변경 핸들러
const handleCheckboxChange = (index: number, value: boolean) => {
  hospitalSelections.value[index] = value
  emit('update:modelValue', value)
  emit('change', value)
}

// 각 병원의 영상 개수를 계산하는 함수
const getVideoCount = (hospital: MedicalHistory) => {
  return hospital.departments.reduce((total, department) => {
    return total + department.examinations.length
  }, 0)
}
</script>

<style lang="scss" scoped>
.medical-history-accordion {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .accordion-header {
    line-height: 1.6rem;
    span {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.6rem;
      color: #555;
    }
  }

  .accordion-item {
    border: 1px solid #eee;
    border-radius: 1.2rem;
    background-color: #fff;

    &.selected {
      border-width: 0.2rem;
      border-color: #4c7ff7;
    }
  }

  .item-header {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1.6rem;

    .item-header-top {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 1.6rem;
    }

    .item-logo {
      width: 4.8rem;
      height: 4.8rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .item-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.1rem;
    }

    .item-tit {
      font-weight: 700;
      line-height: 2.2rem;
    }
    .item-date {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      overflow: hidden;
      strong {
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 2rem;
      }

      & + .item-date {
        margin-top: 0.8rem;
      }
    }

    .item-video-count {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 2rem;
      color: #4c7ff7;
    }
    .item-status {
      font-size: 1.4rem;
      font-weight: 700;
      :deep(.text) {
        font-size: 1.3rem;
        font-weight: 500;
        color: #959595;
      }
    }

    .item-checkbox {
      flex-shrink: 0;
      margin-left: auto;
    }

    .item-header-bottom {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    :deep(.btn-group) {
      flex: 1;
      margin-top: 1.2rem;
    }
    :deep(.btn-group.triple) .c-btn {
      width: auto;
      flex: auto;
    }
    .expire {
      color: #f1496b;
    }
  }

  // 버튼이 있고 아래 리스트 있는 경우
  // header-bottom 있는경우
  .item-header {
    &:has(.item-header-bottom) {
      & + .item-content {
        .department-list {
          padding: 2rem 0;
          border-top: 0.1rem solid #eee;
        }
      }
    }
  }

  .item-content {
    padding: 0 2rem;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    max-height: 0;

    &.is-expanded {
      max-height: 50rem;
      transition: max-height 0.3s ease-in-out;
    }

    .department-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding-bottom: 2rem;
    }

    .department-item {
      display: flex;
      gap: 0.8rem;
      flex-direction: column;
      justify-content: center;

      & + .department-item {
        border-top: 0.1rem solid #eee;
        padding-top: 2rem;
      }
    }

    .department-item-label,
    .department-item-tit {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .department-item-tit-text {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 2rem;
        color: #959595;
      }
    }
  }

  .item-toggle {
    border-top: 0.1rem solid #eeeeee;
    padding: 1.7rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    cursor: pointer;

    .toggle-text {
      font-size: 1.4rem;
      color: #555;
    }

    .icon-arrow {
      width: 2rem;
      height: 2rem;
      background-image: url('/assets/images/insu/icon-arrow-down.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: transform 0.3s ease;

      &.is-rotated {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
