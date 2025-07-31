<template>
  <BaseBody :show-back-button="true" page-title="식사기록">
    <div class="food-search-wrap">
      <InputText inp-type="search" />
      <button type="button" class="btn-regist-food" @click="clickBottomModal">직접등록</button>
    </div>

    <FoodItemList :foods="foodList" @update:foods="handleFoodsUpdate" @food-change="handleFoodChange" />

    <!-- 직접등록하기 바텀시트 -->
    <BottomModal
      :is-visible="isShowBottomModal"
      v-bind="bottomModalProps"
      @confirm="clickConfirm"
      @close="toggleBottomModal"
    >
      <template #content>
        <FlexColDiv class="gap-8 mt-10">
          <InputText placeholder="음식명을 입력해 주세요." />
          <InputText placeholder="섭취칼로리를 입력해 주세요." unit-r="Kcal" type="number" class="t-left" />
        </FlexColDiv>
      </template>
    </BottomModal>
  </BaseBody>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'

import FoodItemList from '~/components/publishing/calorieIntake/FoodItemList.vue'

import FlexColDiv from '~/components/page/FlexColDiv.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'

const isShowBottomModal = ref(false)

const bottomModalProps = ref({
  title: '직접등록하기',
  isShowCloseButton: true,
  isShowConfirmButton: true,
  isShowCancelButton: true,
  confirmButtonText: '등록하기'
})

const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}
const clickConfirm = () => {
  console.log('모달 확인 클릭')
}

const foodList = ref([
  {
    id: 1,
    name: '우유',
    calories: 130,
    serving: '1인분',
    weight: '200g',
    unit: '개',
    selected: true,
    quantity: '0'
  },
  {
    id: 2,
    name: '모닝빵',
    calories: 240,
    serving: '1인분',
    weight: '88g',
    unit: '개',
    selected: false,
    quantity: '0'
  },
  {
    id: 3,
    name: '배추김치',
    calories: 64,
    serving: '1인분',
    weight: '30g',
    unit: '개',
    selected: true,
    quantity: '0'
  },
  {
    id: 4,
    name: '순대국',
    calories: 898,
    serving: '1인분',
    weight: '340g',
    unit: '개',
    selected: false,
    quantity: '0'
  }
])
</script>
<style lang="scss" scoped>
.food-search-wrap {
  display: flex;
  flex-direction: row;
  gap: 0 1.2rem;
}
.btn-regist-food {
  flex: 0 0 auto;
  width: 11.7rem;
  padding: 1.1rem 1.6rem;
  border-radius: 0.6rem;
  color: vars.$white;
  background: #4f5561;
  display: flex;
  font-size: 1.6rem;
  align-items: center;
  @include mixin.rippleEffectWhite;
  &::before {
    content: '';
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12.0002 7.19922L12.0002 16.7992M16.8002 11.9992L7.2002 11.9992' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  }
}

@media (max-width: 400px) {
  .btn-regist-food {
    width: 8rem;
    padding: 1rem 0;
    font-size: 1.4rem;
  }
}
</style>
