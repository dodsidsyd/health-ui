<template>
  <div class="food-intake-info">
    <h5 class="info-tit mb-13">오늘의 식단</h5>

    <FlexColDiv class="gap-12">
      <MealPlanItem
        v-for="meal in mealPlans"
        :key="meal.type"
        :meal-type="meal.type"
        :meal-title="meal.title"
        :foods="meal.foods"
        :icon-class="meal.iconClass"
        @add-food="handleAddFood"
        @delete-food="handleDeleteFood"
      />
    </FlexColDiv>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import MealPlanItem from '~/components/publishing/calorieIntake/MealPlanItem.vue'
import type { FoodItem, MealType, MealPlan } from '~/types/meal'

// 식단 데이터
const mealPlans = ref<MealPlan[]>([
  {
    type: 'breakfast',
    title: '아침식사',
    iconClass: 'ico-sun',
    foods: [
      { id: 1, name: '우유', quantity: 1.0, weight: 200, calories: 130 },
      { id: 2, name: '우유', quantity: 1.0, weight: 200, calories: 130 },
      { id: 3, name: '바나나', quantity: 1.0, weight: 200, calories: 130 }
    ]
  },
  {
    type: 'morning-snack',
    title: '오전 간식',
    iconClass: 'ico-apple',
    foods: [{ id: 4, name: '우유', quantity: 1.0, weight: 200, calories: 130 }]
  },
  {
    type: 'lunch',
    title: '점심식사',
    iconClass: 'ico-sunSet',
    foods: [{ id: 5, name: '우유', quantity: 1.0, weight: 200, calories: 130 }]
  },
  {
    type: 'afternoon-snack',
    title: '오후 간식',
    iconClass: 'ico-coffee',
    foods: [{ id: 6, name: '우유', quantity: 1.0, weight: 200, calories: 130 }]
  },
  {
    type: 'dinner',
    title: '저녁식사',
    iconClass: 'ico-crescent',
    foods: [{ id: 7, name: '우유', quantity: 1.0, weight: 200, calories: 130 }]
  },
  {
    type: 'night-snack',
    title: '야간 간식',
    iconClass: 'ico-bat',
    foods: [] // 빈 배열 - 아무것도 먹지 않음
  }
])

// Emits 정의 (부모 컴포넌트와 통신)
const emit = defineEmits<{
  addFood: [mealType: MealType]
  deleteFood: [food: FoodItem, mealType: MealType]
  updateMealPlans: [mealPlans: MealPlan[]]
}>()

const handleDeleteFood = (food: FoodItem, index: number, mealType: MealType) => {
  // 해당 식사 시간의 음식 목록에서 제거
  const mealIndex = mealPlans.value.findIndex(meal => meal.type === mealType)
  if (mealIndex !== -1) {
    mealPlans.value[mealIndex].foods.splice(index, 1)
    emit('deleteFood', food, mealType)
    emit('updateMealPlans', mealPlans.value)
  }
}

// 외부에서 접근 가능한 메서드들
const addFoodToMeal = (mealType: MealType, newFood: FoodItem) => {
  const mealIndex = mealPlans.value.findIndex(meal => meal.type === mealType)
  if (mealIndex !== -1) {
    mealPlans.value[mealIndex].foods.push(newFood)
    emit('updateMealPlans', mealPlans.value)
  }
}

const updateMealFoods = (mealType: MealType, foods: FoodItem[]) => {
  const mealIndex = mealPlans.value.findIndex(meal => meal.type === mealType)
  if (mealIndex !== -1) {
    mealPlans.value[mealIndex].foods = foods
    emit('updateMealPlans', mealPlans.value)
  }
}

const getTotalDailyCalories = () => {
  return mealPlans.value.reduce((total, meal) => {
    const mealCalories = meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0)
    return total + mealCalories
  }, 0)
}

// 외부에서 접근 가능하도록 expose
defineExpose({
  addFoodToMeal,
  updateMealFoods,
  getTotalDailyCalories,
  mealPlans
})
</script>

<style lang="scss" scoped>
.food-intake-info {
  border-radius: 2rem 2rem 0 0;
  padding: 5.6rem 2rem 4.8rem;
  margin: -2rem -2rem 0;
  background: vars.$white;
  position: relative;
  z-index: 2;
  box-shadow: 0 -8px 10px 0 rgba(0, 0, 0, 0.02);

  &::before {
    content: '';
    width: 16.1rem;
    height: 16.1rem;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -10.5rem;
    background-image: url('~/assets/images/calorieIntake/img-char-lemon.png');
  }

  .info-tit {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.4;
    color: #2b2b2b;
  }
}
@media (max-width: 345px) {
  .food-intake-info {
    &::before {
      width: 14rem;
      height: 14rem;
      top: -8.5rem;
    }
  }
}
</style>
