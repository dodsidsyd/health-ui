<template>
  <div :class="['c-radiotype', customStyle]">
    <input 
      :id="id" 
      type="radio" 
      :name="name" 
      :checked="isChecked" 
      :disabled="disabled" 
      class="c-radio" 
      @change="onChange"
    />

    <label :for="id" class="c-label">
      <i
        v-if="icon || iconSrc"
        :class="icon"
        :style="{
          width: `5.6rem`,
          height: `5.6rem`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '5.6rem',
          order: '0',
          backgroundImage: iconSrc ? `url(${iconSrc})` : undefined
        }"
        aria-hidden="true"
      ></i>
      <span v-if="text" class="radio-text" v-html="text"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, default: 'radioBox' },
  text: { type: String, default: '레이블명' },
  checked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  customStyle: { type: String, default: '' },
  modelValue: { type: [String, Boolean], default: false },
  value: { type: String, default: '' },
  icon: { type: String, default: '' },
  iconSrc: { type: String, default: '' },
  iconAlt: { type: String, default: '아이콘' }
})

const emit = defineEmits(['update:modelValue'])

// v-model 지원을 위한 computed
const isChecked = computed(() => {
  if (props.value) {
    // value가 있으면 modelValue와 비교
    return props.modelValue === props.value
  }
  // value가 없으면 checked prop 사용
  return props.checked
})

function onChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (props.value) {
    // value가 있으면 value를 emit
    emit('update:modelValue', props.value)
  } else {
    // value가 없으면 checked 상태를 emit
    emit('update:modelValue', target.checked)
  }
}
</script>

<style lang="scss">
.c-radiotype {
  display: inline-flex;
  align-items: center;
  position: relative;
  &.small {
    .c-label {
      &::after {
        color: #555;
        font-size: 1.4rem;
        font-weight: 400;
      }
    }
    .c-radio {
      &:checked {
        ~ .c-label {
          .icon {
            &::before {
              width: 1rem;
              height: 1rem;
            }
          }
        }
      }
    }
    .icon {
      width: 2rem;
      height: 2rem;
    }
  }
  .c-label {
    min-width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .text {
      text-align: center;
    }
    .radio-text {
      text-align: center;
      min-width: 0;
      color: #555;
      font-size: 1.6rem;
      font-weight: 500;
      word-break: keep-all;
      line-height: 1.4;
      // margin-top: 0.8rem;
    }
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    border: 1.5px solid #e8eefa;
    background-color: #fff;
    background-size: 1.9rem;
    background-repeat: no-repeat;
    background-position: center;
    transition:
      background-color 0.2s ease-in,
      border-color 0.2s ease-in;
  }
  // 버튼 타입
  &.button {
    padding: 0;
    background-color: transparent;
    &.small {
      .c-label {
        height: 4.8rem;
        font-size: 1.4rem;
      }
    }
    &.has-icon {
      .c-label {
        display: flex;
        flex-direction: column;
        width: 16.8rem;
        height: 16rem;
        padding: 2.6rem 0;
        font-size: 1.6rem;
        .radio-text {
          // margin-top: 0.8rem;
          color: #959595;
          text-align: center;
          order: 2;
          white-space: pre-line;
        }
      }
    }
    // 반응형 width 지원
    &.responsive {
      .c-label {
        width: 100% !important;
        min-width: 0;
        word-break: keep-all;
        line-height: 1.4;
        &::before {
          white-space: pre-line;
        }
      }
    }
    .c-radio {
      &:disabled {
        ~ .c-label {
          opacity: 0.4;
          .icon {
            background-color: transparent;
            &::before {
              background-color: transparent;
            }
          }
        }
      }
      &:checked {
        ~ .c-label {
          border: 1px solid #4c7ff7;
          background: #f6f9ff;
          font-weight: 500;
          .radio-text {
            color: #4c7ff7;
          }
        }
      }
    }
    .c-label {
      height: 5.6rem;
      margin: 0;
      padding: 1.7rem 1.6rem;
      border-radius: 0.8rem;
      border: 1px solid #e2e2e2;
      background: #fff;
      color: rgb(var(--black));
      font-size: 1.6rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      .radio-text {
        text-align: center;
        flex: 1;
        min-width: 0;
        color: #959595;
        text-align: center;
        order: 2;
        white-space: pre-line;
      }
    }
    .icon {
      display: none;
    }
    &.flex-11 {
      width: 100%;
    }
  }
}
.c-radio {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  &:disabled {
    ~ .c-label {
      .icon {
        border: 1.5px solid #e2e2e2;
        background: #f4f4f4;
      }
    }
  }
  &:checked {
    ~ .c-label {
      .icon {
        border-color: #4c7ff7;
        background-color: #4c7ff7;
        &::before {
          content: '';
          width: 1.2rem;
          height: 1.2rem;
          background-color: #fff;
          border-radius: 50%;
          box-shadow: 0.2rem 0.2rem 0.4rem 0 rgba(0, 0, 0, 0.1);
        }
      }
    }
    &:disabled {
      ~ .c-label {
        .icon {
          border-color: #eee;
          background: #eee;
          &::before {
            background-color: #fff;
          }
        }
      }
    }
  }
}
.ico-empty {
  background-image: url("data:image/svg+xml,%0A%3Csvg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.9268 17.0401L20.4 20.4001M8.39998 11.4001H14.4M19.28 11.4401C19.28 15.77 15.7699 19.2801 11.44 19.2801C7.11006 19.2801 3.59998 15.77 3.59998 11.4401C3.59998 7.11019 7.11006 3.6001 11.44 3.6001C15.7699 3.6001 19.28 7.11019 19.28 11.4401Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3Crect x='0.75' y='0.75' width='22.5' height='22.5' rx='1.25' fill='white' stroke='%23E2E2E2' stroke-width='1.5' stroke-dasharray='4 3'/%3E%3C/svg%3E%0A");
}
</style> 