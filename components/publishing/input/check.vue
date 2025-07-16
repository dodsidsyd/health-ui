<template>
  <div :class="['c-checktype', customStyle]">
    <input
      type="checkbox"
      :name="name"
      :id="id"
      :checked="modelValue"
      :disabled="disabled"
      class="c-check"
      @change="onChange"
    />
    <label :for="id" class="c-label" :aria-label="ariaLabel">
      <i v-if="!customStyle.includes('switch')" class="icon" aria-hidden="true" />
      <span v-if="customStyle.includes('switch')" class="c-switch-rail">
        <span class="c-switch-button"></span>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, default: 'chkBox' },
  ariaLabel: { type: String, default: '레이블명' },
  disabled: { type: Boolean, default: false },
  customStyle: { type: String, default: '' },
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script>

<style lang="scss" scoped>
.c-checktype {
  display: inline-flex;
  align-items: center;
  position: relative;
  // switch
  --cchk-bezier: cubic-bezier(0.4, 0, 0.2, 1);
  --cchk-switch-button-color: #fff;
  --cchk-switch-opacity-disabled: 0.5;
  --cchk-switch-rail-color: #e8e8e8;
  --cchk-switch-rail-color-active: #4f5561;

  // switch size
  --cchk-switch-button-width: var(--switch-wh);
  --cchk-switch-button-width-pressed: var(--switch-w-pressed);
  --cchk-switch-button-height: var(--switch-wh);
  --cchk-switch-height: max(var(--switch-h), var(--switch-wh));
  --cchk-switch-offset: calc((var(--switch-h) - var(--switch-wh)) / 2);
  --cchk-switch-width: max(4.8rem, calc(var(--switch-rail-size) + var(--switch-wh) - var(--switch-h)));
  &.small {
    .c-label {
      &::after {
        color: #555;
        font-size: 1.4rem;
        font-weight: 400;
      }
    }
    .icon {
      width: 2rem;
      height: 2rem;
    }
  }
  &.non-border {
    .icon {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M14 7L8.03374 13L6 10.9548' stroke='%23E2E2E2' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      border: none;
    }
    .c-check {
      &:checked {
        ~ .c-label {
          .icon {
            background-color: transparent;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M14 7L8.03374 13L6 10.9548' stroke='%234C7FF7' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          }
        }
      }
    }
  }
  &.switch {
    --switch-wh: 2.2rem;
    --switch-h: 2.8rem;
    --switch-w-pressed: 2.4rem;
    --switch-rail-size: 4rem;
    .c-label {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-width: var(--cchk-switch-width);
      height: var(--cchk-switch-height);
      vertical-align: middle;
      &::after {
        content: none;
      }
    }
    .c-switch-rail {
      overflow: hidden;
      display: inline-block;
      position: relative;
      min-width: var(--cchk-switch-width);
      height: var(--cchk-switch-height);
      border-radius: calc(var(--cchk-switch-height) / 2);
      background-color: var(--cchk-switch-rail-color);
      transition:
        opacity 0.3s var(--cchk-bezier),
        background 0.3s var(--cchk-bezier),
        box-shadow 0.3s var(--cchk-bezier);
    }
    .c-switch-button {
      content: '';
      display: inline-block;
      position: absolute;
      top: var(--cchk-switch-offset);
      left: var(--cchk-switch-offset);
      width: var(--cchk-switch-button-width-pressed);
      height: var(--cchk-switch-button-height);
      max-width: var(--cchk-switch-button-width);
      border-radius: calc(var(--cchk-switch-height) / 2);
      background-color: var(--cchk-switch-button-color);
      transition:
        background-color 0.3s var(--cchk-bezier),
        left 0.3s var(--cchk-bezier),
        opacity 0.3s var(--cchk-bezier),
        max-width 0.3s var(--cchk-bezier),
        box-shadow 0.3s var(--cchk-bezier);
    }
    .c-check {
      &:checked {
        ~ .c-label {
          .c-switch-rail {
            background-color: var(--cchk-switch-rail-color-active);
          }
          .c-switch-button {
            left: calc(100% - var(--cchk-switch-button-width) - var(--cchk-switch-offset));
          }
        }
      }
      &:disabled {
        ~ .c-label {
          .c-switch-rail {
            opacity: 0.5;
          }
        }
      }
    }
    &.tiny {
      --switch-wh: 2.2rem;
      --switch-h: 1.4rem;
      --switch-w-pressed: 2.2rem;
      --switch-rail-size: 3rem;
      --cchk-switch-width: max(4rem, calc(var(--switch-rail-size) + var(--switch-wh) - var(--switch-h)));
      --cchk-switch-offset-y: calc((var(--switch-h) - var(--switch-wh)) / 2);
      --cchk-switch-offset-x: 0;
      .c-switch-rail {
        overflow: visible;
        height: var(--switch-h);
        border-radius: calc(var(--switch-h) / 2);
      }
      .c-switch-button {
        content: '';

        top: var(--cchk-switch-offset-y);
        left: var(--cchk-switch-offset-x);
        border: 1px solid #d2d2d2;
      }
      .c-check {
        &:checked {
          ~ .c-label {
            .c-switch-rail {
              background-color: #b7ccfc;
            }
            .c-switch-button {
              left: calc(var(--switch-rail-size) - var(--switch-wh) + 10px);
              background-color: #4c7ff7;
              border-color: #4c7ff7;
            }
          }
        }
        &:disabled {
          ~ .c-label {
            .c-switch-rail {
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
  .c-label {
    min-width: auto;
    &::after {
      content: attr(aria-label);
      margin-left: 0.8rem;
      min-width: 0;
      color: #555;
      font-size: 1.6rem;
      font-weight: 500;
    }
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    border: 1.5px solid #eee;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23E2E2E2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: 1.9rem;
    background-repeat: no-repeat;
    background-position: center;
    transition:
      background-color 0.2s ease-in,
      border-color 0.2s ease-in;
  }
  // 버튼 타입
  &.button {
    .c-check {
      &:checked {
        ~ .c-label {
          border: 1px solid #4c7ff7;
          background: #f6f9ff;
          &::after {
            color: #4c7ff7;
          }
        }
      }
    }
    .c-label {
      border-radius: 1.2rem;
      border: 1px solid #e2e2e2;
      background: #fff;
      width: 100%;
      height: 6.4rem;
      padding: 1.6rem 2rem;
      cursor: pointer;
      &::after {
        color: #959595;
      }
    }
  }
  // 버튼 타입 2
  &.buttonType2 {
    padding: 0;
    background-color: transparent;
    &.small {
      .c-label {
        height: 4.8rem;
        font-size: 1.4rem;
      }
    }

    .c-check {
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
          &::before {
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
      &::before {
        content: attr(aria-label);
        text-align: center;
        flex: 1;
        min-width: 0;
        color: #959595;
        text-align: center;
        order: 2;
      }
      &::after {
        display: none;
      }
    }
    .icon {
      display: none;
    }
    &.flex-11 {
      width: 100%;
    }
  }
  &.agree-all {
    .c-check {
      &:checked {
        ~ .c-label {
          border: none;
          background: #f6f9ff;
          &::after {
            color: #4c7ff7;
          }
        }
      }
    }
    .c-label {
      background: #eee;
      border: none;
      height: 5.6rem;
      &::after {
        color: #555;
        font-size: 1.6rem;
        font-weight: 700;
      }
    }
  }
}
.c-check {
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
        border-color: #e2e2e2;
        background-color: #f4f4f4;
      }
    }
  }
  &:checked {
    ~ .c-label {
      .icon {
        border-color: #4c7ff7;
        background-color: #4c7ff7;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
    }
    &:disabled {
      ~ .c-label {
        .icon {
          border-color: #eee;
          background-color: #eee;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23D2D2D2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          &::before {
            background-color: var(--white);
          }
        }
      }
    }
  }
}
</style>
