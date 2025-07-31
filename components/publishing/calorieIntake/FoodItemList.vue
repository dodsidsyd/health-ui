<template>
  <div class="food-item-list">
    <div v-for="(food, index) in foods" :key="food.id || index" class="food-item">
      <div class="food-info">
        <Checkbox :id="`foodItem${food.id || index}`" v-model="food.selected" :aria-label="food.name" />
        <span class="amount">{{ food.calories }}kcal, {{ food.serving }} / {{ food.weight }}</span>
      </div>
      <InputNum
        v-model="food.quantity"
        :no-line="true"
        placeholder="0"
        :unit-r="food.unit || '개'"
        @update:modelValue="onQuantityChange(index, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputNum from '~/components/publishing/input/InputNum.vue'
import Checkbox from '~/components/publishing/input/check.vue'

// 음식 아이템 타입 정의
interface FoodItem {
  id?: string | number
  name: string
  calories: number
  serving: string
  weight: string
  unit?: string
  selected: boolean
  quantity: string
}

// Props 정의
const props = defineProps<{
  foods: FoodItem[]
}>()

// Events 정의
const emit = defineEmits<{
  'update:foods': [foods: FoodItem[]]
  'food-change': [food: FoodItem, index: number]
}>()

// 수량 변경 핸들러
function onQuantityChange(index: number, newQuantity: string) {
  const updatedFoods = [...props.foods]
  updatedFoods[index].quantity = newQuantity

  emit('update:foods', updatedFoods)
  emit('food-change', updatedFoods[index], index)
}
</script>

<style lang="scss" scoped>
.food-item-list {
  border-top: 0.1rem solid #eee;
  margin: 1.6rem -2rem 0;
  padding: 0 2rem;
}
.food-item {
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 2rem 0;
  gap: 0 0.4rem;
  & + .food-item {
    border-top: 0.1rem solid #eee;
  }

  .food-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    :deep(.c-checktype .c-label[data-v-fe5e2946]) {
      &:after {
        font-weight: 700;
      }
    }
    .amount {
      display: inline-block;
      padding-left: 3.2rem;
      color: #959595;
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
  .c-input {
    flex: 0 0 auto;
    width: 12rem;
  }
}

@media (max-width: 400px) {
  .food-item {
    .c-input {
      width: 10.4rem;
    }
  }
}
</style>
