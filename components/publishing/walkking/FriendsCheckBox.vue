<template>
  <div class="friends-checkbox-wrap button">
    <input
      :id="id"
      type="checkbox"
      :name="name"
      :checked="modelValue"
      :disabled="disabled"
      class="c-check"
      @change="onChange"
    />
    <label :for="id" class="c-label">
      <div class="profile-box">
        <img src="~/assets/images/img-profile.svg" alt="프로필 이미지" />
        <div class="detail-profile">
          <p><strong class="nickname">곰탱이</strong>강동현</p>
          <span class="address">충북제천</span>
        </div>
      </div>
      <div class="steps-box">
        <div class="steps">
          <p><strong>12,844</strong>걸음/일</p>
          <div class="rank-progress">
            <div class="current-bar" :style="progressBarWidthStyle"></div>
          </div>
        </div>
        <i class="icon" aria-hidden="true"></i>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    id: string
    name?: string
    disabled?: boolean
    modelValue: boolean
    friendsSteps?: number
    targetSteps?: number
  }>(),
  {
    name: 'chkBox',
    disabled: false,
    friendsSteps: 3000,
    targetSteps: 10000
  }
)
const emit = defineEmits(['update:modelValue'])

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
// 실제로 화면에 표시되고 애니메이션될 걸음 수
const animatedFriendsSteps = ref(0)

// onMounted 시 애니메이션 적용
onMounted(() => {
  setTimeout(() => {
    animatedFriendsSteps.value = props.friendsSteps
  }, 100)
})

const calculatedPercentage = computed(() => {
  if (props.targetSteps <= 0) {
    return 0 // 0으로 나누는 것을 방지
  }
  let percentage = (animatedFriendsSteps.value / props.targetSteps) * 100
  // 백분율이 0% 미만 또는 100% 초과하는 경우를 방지
  if (percentage < 0) {
    percentage = 0
  } else if (percentage > 100) {
    percentage = 100
  }
  return percentage
})

// 프로그레스 바 너비에 적용할 스타일 객체
const progressBarWidthStyle = computed(() => {
  return {
    width: `${calculatedPercentage.value}%`
  }
})
</script>

<style lang="scss" scoped>
.friends-checkbox-wrap {
  display: inline-flex;
  align-items: center;
  position: relative;
  margin: 0 2rem;
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
    border: 1px solid #fff;
    background: #fff;
    width: 100%;
    padding: 2rem;
    cursor: pointer;
    &::after {
      color: #959595;
      content: attr(aria-label);
      margin-left: 0.8rem;
      min-width: 0;
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
.profile-box {
  display: flex;
  align-items: center;
  img {
    width: 4.8rem;
    height: 4.8rem;
    margin-right: 1.2rem;
  }
  .detail-profile {
    font-size: 1.4rem;
    line-height: 2rem;
    p {
      font-weight: 500;
    }
    .nickname {
      margin-right: 0.2rem;
      font-weight: 600;
    }
    .address {
      color: #959595;
      font-weight: 500;
    }
  }
}
.steps-box {
  display: flex;
  align-items: center;
  margin-left: auto;
  .steps {
    margin-right: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 2.2rem;
    p {
      display: flex;
      align-items: center;
      font-size: 1.3rem;
      strong {
        margin-right: 0.2rem;
        font-size: 1.6rem;
        font-weight: 700;
      }
    }
  }
  .rank-progress {
    width: 10rem;
    height: 0.6rem;
    margin-top: 0.8rem;
    background-color: #eee;
    border-radius: 3rem;
  }
  .current-bar {
    position: relative;
    width: 0;
    height: 100%;
    background-color: var(--blue-primary);
    border-radius: 3rem;
    transition: width 0.75s ease-in-out;
  }
}
</style>
