<template>
  <div class="medical-history-accordion">
    <div v-if="labelTitle" class="accordion-header">
      <span>{{ labelTitle }}</span>
    </div>
    <div class="accordion-item" :class="{ selected: props.modelValue }">
      <div class="item-header">
        <div class="item-logo">
          <img :src="medicalHistory.logo" :alt="medicalHistory.hospitalName" />
        </div>
        <div class="item-info">
          <div class="item-tit">
            {{ medicalHistory.hospitalName }}
          </div>
          <div class="item-video-count">
            영상보유 <span>{{ videoCount }}</span
            >건
          </div>
        </div>
        <div class="item-checkbox">
          <Checkbox
            :id="`checkbox-${medicalHistory.hospitalName}`"
            :model-value="props.modelValue"
            custom-style="small non-border"
            :aria-label="`${medicalHistory.hospitalName} 선택`"
            @update:model-value="handleCheckboxChange"
          />
        </div>
      </div>
      <div class="item-content" :class="{ 'is-expanded': isDetailVisible }">
        <div class="department-list">
          <div v-for="department in medicalHistory.departments" :key="department.id" class="department-item">
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
      <div class="item-toggle" @click="toggleDetail">
        <div class="toggle-text">{{ isDetailVisible ? '내역접기' : '내역보기' }}</div>
        <i class="icon-arrow" :class="{ 'is-rotated': isDetailVisible }"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Checkbox from '~/components/publishing/input/check.vue'

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
  hospitalName: string
  logo: string
  departments: Department[]
}

interface Props {
  medicalHistory: MedicalHistory
  labelTitle?: string
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelTitle: '의료영상 공유내역',
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

// 영상 개수를 departments의 examinations 개수로 계산
const videoCount = computed(() => {
  return props.medicalHistory.departments.reduce((total, department) => {
    return total + department.examinations.length
  }, 0)
})

// 아코디언 상태 (초기: 닫힘)
const isDetailVisible = ref(false)

// 체크박스 변경 핸들러
const handleCheckboxChange = (value: boolean) => {
  emit('update:modelValue', value)
  emit('change', value)
}

// 아코디언 토글 함수
const toggleDetail = () => {
  isDetailVisible.value = !isDetailVisible.value
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
      border-color: #4c7ff7;
      box-shadow: 0 0 10px rgba(76, 127, 247, 0.2);
    }

    .item-header {
      display: flex;
      padding: 2rem;
      gap: 1.6rem;
      align-items: center;

      .item-logo {
        width: 4.8rem;
        height: 4.8rem;
        flex-shrink: 0;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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

      .item-video-count {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 2rem;
        color: #4c7ff7;
      }

      .item-checkbox {
        flex-shrink: 0;
        margin-left: auto;
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
}
</style>
