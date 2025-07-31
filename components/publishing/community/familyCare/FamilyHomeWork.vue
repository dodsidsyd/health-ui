<template>
  <div class="family-homework">
    <div class="homework-tit">
      <h4 class="tit">패밀리 숙제</h4>
      <nuxt-link to="javascript:void(0)" title="패밀리 숙제 페이지로 이동">
        <i class="icon arrow-type-black" aria-hidden="true"></i>
      </nuxt-link>
    </div>

    <!-- 새로운 숙제 도착 -->
    <div class="new-updated-homework" :class="{ updated: showNewHomework }">
      <button type="button" class="btn-new-homework" @click="clickHomeWorkModal">
        <i class="icon ico-bell-color"></i>새로운 숙제 도착했어요!
      </button>
    </div>

    <div class="homework-list">
      <div class="homework-item">
        <nuxt-link to="javascript:void(0)" class="item-link">
          <div class="tit">수영가기 <CommonBadge variant="round" color="blue">참여중</CommonBadge></div>
          <span class="homework-duration">4월16일 ~ 5월 17일 / 월, 수, 금</span>
          <p class="homework-target">
            <span>개설자 <strong>김엄마</strong></span>
            <span>숙제대상 <strong>2명</strong></span>
            <span class="duration-date"> <strong>1일째</strong> / 12일 </span>
          </p>
        </nuxt-link>
      </div>
      <div class="homework-item">
        <nuxt-link to="javascript:void(0)" class="item-link">
          <div class="tit">수영가기 <CommonBadge variant="round" color="blue">참여중</CommonBadge></div>
          <span class="homework-duration">4월16일 ~ 5월 17일 / 월, 수, 금</span>
          <p class="homework-target">
            <span>개설자 <strong>김엄마</strong></span>
            <span>숙제대상 <strong>2명</strong></span>
            <span class="duration-date"> <strong>1일째</strong> / 12일 </span>
          </p>
        </nuxt-link>
      </div>
    </div>
    <button type="button" class="btn-add-homework mb-12"><i class="icon ico-plus-lg"></i>숙제 추가하기</button>

    <!-- 숙제하기 바텀 모달 -->
    <Teleport to="body">
      <BottomModal
        :is-visible="isShowHomeWorkModal"
        :title="modalTitle"
        :is-show-close-button="true"
        :is-show-cancel-button="true"
        :is-show-confirm-button="true"
        :confirm-button-text="confirmButtonText"
        :cancel-button-text="cancelButtonText"
        @close="toggleHomeWorkModal"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <template #content>
          <!-- 새로운 숙제 상세 정보 (기본 상태) -->
          <div v-if="!isRejectMode">
            <div class="new-homework-item">
              <div class="tit">비타민C 영양제 먹기</div>
              <span class="homework-duration">4월16일 ~ 5월 17일 / 월, 수, 금</span>
              <p class="homework-target">
                <span>개설자 <strong>김엄마</strong></span>
                <span>숙제대상 <strong>2명</strong></span>
              </p>
            </div>

            <div class="homework-creator">
              <img src="~/assets/images/community/img-rank-profile.png" alt="" />
              <div class="txt-box">
                <strong>엄마</strong>
                <p>
                  요즘 우리 가족들 너무 피곤해하는것<br />
                  같아서 추가했어 같이 해보면 어때?
                </p>
              </div>
            </div>
          </div>

          <!-- 거절 사유 입력 (거절 모드) -->
          <div v-else>
            <InputText v-model="rejectReason" placeholder="거절사유를 간단히 남겨주세요. (선택)" />
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import CommonBadge from '~/components/common/badge/CommonBadge.vue'

import InputText from '~/components/publishing/input/InputText.vue'

interface Props {
  color?: 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'brown' | 'gray' | 'deepRed'
  variant?: 'solid' | 'outline' | 'soft'
  badgeText: string
  titleText: string
}
const props = withDefaults(defineProps<Props>(), {
  color: 'default',
  variant: 'soft'
})

// 새로운 숙제 알림 상태 관리
const showNewHomework = ref(false)

// 모달 상태 관리
const isShowHomeWorkModal = ref(false)
const isRejectMode = ref(false)
const rejectReason = ref('')

// 모달 제목과 버튼 텍스트를 동적으로 변경
const modalTitle = computed(() => {
  return isRejectMode.value ? '숙제를 거절하시겠어요?' : '새로운 숙제'
})

const confirmButtonText = computed(() => {
  return isRejectMode.value ? '거절하기' : '수락하기'
})

const cancelButtonText = computed(() => {
  return isRejectMode.value ? '취소' : '거절하기'
})

// 컴포넌트 마운트 후 10초 뒤에 새로운 숙제 알림 표시
onMounted(() => {
  // 새로운 숙제 도착했어요 테스트용
  setTimeout(() => {
    showNewHomework.value = true
  }, 3000) // 3초
})

const clickHomeWorkModal = () => {
  //showNewHomework.value = false
  resetModalState() // 모달 상태 초기화
  toggleHomeWorkModal()
}

const toggleHomeWorkModal = () => {
  isShowHomeWorkModal.value = !isShowHomeWorkModal.value
  if (!isShowHomeWorkModal.value) {
    resetModalState() // 모달 닫을 때 상태 초기화
  }
}

// 모달 상태 초기화
const resetModalState = () => {
  isRejectMode.value = false
  rejectReason.value = ''
}

// 확인 버튼 클릭 처리
const handleConfirm = () => {
  if (isRejectMode.value) {
    // 거절 처리 로직
    console.log('숙제 거절:', rejectReason.value)
    toggleHomeWorkModal()
  } else {
    // 수락 처리 로직
    console.log('숙제 수락')
    toggleHomeWorkModal()
  }
}

// 취소/거절 버튼 클릭 처리
const handleCancel = () => {
  if (isRejectMode.value) {
    // 거절 모드에서 취소 → 기본 모드로 돌아가기
    resetModalState()
  } else {
    // 기본 모드에서 거절 → 거절 모드로 전환
    isRejectMode.value = true
  }
}

// 동적 클래스 계산
const badgeClasses = computed(() => {
  const classes = ['badge']

  // 컬러 클래스 추가
  if (props.color !== 'default') {
    classes.push(`badge-${props.color}`)
  }

  // 변형 클래스 추가
  if (props.variant !== 'soft') {
    classes.push(`badge-${props.variant}`)
  }

  return classes
})
</script>

<style scoped lang="scss">
.family-homework {
  margin-top: 3.2rem;
  .homework-tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;

    .tit {
      font-size: 2rem;
      font-weight: 700;
      color: #2b2b2b;
    }
    .icon {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .new-updated-homework {
    overflow: hidden;
    height: 0;
    &.updated {
      height: auto;
      .btn-new-homework {
        opacity: 1;
        right: 0;
      }
    }
    .btn-new-homework {
      border-radius: 1.2rem;
      width: 100%;
      background-color: #f4f4f4;
      padding: 1.6rem 2rem;
      font-size: 1.6rem;
      font-weight: 500;
      display: flex;
      justify-items: center;
      align-items: center;
      gap: 0 0.8rem;
      position: relative;
      opacity: 0.5;
      right: -50%;
      @include mixin.rippleEffectPrimary;
      transition: 0.5s all cubic-bezier(0.075, 0.82, 0.165, 1);
      .icon {
        width: 2.8rem;
        height: 2.8rem;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 2rem 2.4rem;
        background-position: center;
      }
    }
  }

  .homework-list {
    display: flex;
    flex-direction: column;
    margin-top: 1.2rem;
    gap: 1.2rem 0;
    .homework-item {
      .item-link {
        width: 100%;
        position: relative;
        padding: 2rem;
        font-size: 1.4rem;
        border-radius: 2rem;
        border: 0.1rem solid #e2e2e2;
        background: vars.$white;
        box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
        display: flex;
        flex-direction: column;
        text-align: left;
        gap: 0.7rem 0;
        color: #959595;
        font-weight: 500;
      }

      .tit {
        font-size: 1.6rem;
        font-weight: 700;
        color: #2b2b2b;
        display: flex;
        justify-content: space-between;
      }
      .homework-target {
        display: flex;
        gap: 0 1.2rem;
        strong {
          color: #2b2b2b;
          font-weight: 500;
        }
        .duration-date {
          margin-left: auto;
          flex: 0 0 auto;
          strong {
            color: vars.$blue-primary;
          }
        }
      }
    }
  }
}

.btn-add-homework {
  position: relative;
  border-radius: 3.2rem;
  padding: 0.7rem 1.6rem;
  border: 0.1rem solid #e2e2e2;
  background: vars.$white;
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 0.4rem;
  margin-top: 1.2rem;
  justify-self: center;
  @include mixin.rippleEffectPrimary;
  .icon {
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
  }
}

.new-homework-item {
  width: 100%;
  position: relative;
  font-size: 1.4rem;
  background: vars.$white;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: #959595;
  font-weight: 500;
  .tit {
    font-size: 1.6rem;
    font-weight: 700;
    color: #2b2b2b;
    display: flex;
    justify-content: space-between;
  }
  .homework-target {
    display: flex;
    gap: 0 1.2rem;
    margin-top: 1.2rem;
    strong {
      color: #2b2b2b;
      font-weight: 500;
    }
    .duration-date {
      margin-left: auto;
      flex: 0 0 auto;
      strong {
        color: vars.$blue-primary;
      }
    }
  }
}

.homework-creator {
  margin: 2rem 0 1.6rem;
  background-color: #e7f4ff;
  border-radius: 0 2rem 2rem 2rem;
  display: flex;
  padding: 1.6rem;
  gap: 0 0.8rem;
  text-align: left;

  img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    object-fit: cover;
  }
  .txt-box {
    display: flex;
    flex-direction: column;
    font-size: 1.6rem;
    text-align: left;
    color: #555;
    gap: 0.7rem 0;
    strong {
      font-weight: 500;
      line-height: 2.2rem;
      margin-top: 0.5rem;
    }
    p {
      font-weight: 400;
    }
  }
}
</style>
