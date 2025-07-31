<template>
  <div class="meal-plan-item">
    <div class="meal-calories">
      <strong class="eat-time">
        <i :class="['icon', iconClass]"></i>
        {{ mealTitle }}
      </strong>
      <div :class="['total-calories', { 'none-eat': totalCalories === 0 }]">
        <strong class="calories-num">{{ totalCalories }}</strong> Kcal
        <button type="button" class="btn-add" :aria-label="`${mealTitle} 메뉴 추가`" @click="handleAddFood"></button>
      </div>
    </div>

    <!-- 음식 목록 -->
    <div v-for="(food, index) in foods" :key="food.id || index" class="detail-menu">
      <span class="menu-name">{{ food.name }}</span>
      <div class="detail-info">
        <span class="amount">{{ food.quantity }} / {{ food.weight }}g</span>
        <strong class="calories">{{ food.calories }}kcal</strong>
        <button
          type="button"
          class="btn-del"
          :aria-label="`${food.name} 삭제`"
          @click="handleDeleteFood(food, index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FoodItem, MealType } from '~/types/meal'
import { DEFAULT_ICON_MAP, DEFAULT_TITLE_MAP } from '~/types/meal'

// Props 정의
const props = defineProps<{
  mealType: MealType
  mealTitle?: string
  foods?: FoodItem[]
  iconClass?: string
}>()

// Emits 정의
const emit = defineEmits<{
  addFood: [mealType: MealType]
  deleteFood: [food: FoodItem, index: number, mealType: MealType]
}>()

// Computed properties
const iconClass = computed(() => {
  return props.iconClass || DEFAULT_ICON_MAP[props.mealType]
})

const mealTitle = computed(() => {
  return props.mealTitle || DEFAULT_TITLE_MAP[props.mealType]
})

const totalCalories = computed(() => {
  if (!props.foods || props.foods.length === 0) return 0
  return props.foods.reduce((total, food) => total + food.calories, 0)
})

const handleDeleteFood = (food: FoodItem, index: number) => {
  emit('deleteFood', food, index, props.mealType)
}
</script>

<style lang="scss" scoped>
.meal-plan-item {
  background: #f4f4f4;
  border-radius: 2rem;

  .meal-calories {
    display: flex;
    justify-content: space-between;
    gap: 0 0.8rem;
    padding: 2rem;
  }

  .total-calories {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    font-weight: 500;
    color: #2b2b2b;
    text-align: right;

    .calories-num {
      display: inline-block;
      margin-right: 0.4rem;
      font-weight: 500;
    }

    &.none-eat {
      .calories-num {
        color: #959595;
      }
    }

    .btn-add {
      margin-left: 1.6rem;
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      background: #4f5561;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12.0002 7.19922L12.0002 16.7992M16.8002 11.9992L7.2002 11.9992' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      @include mixin.rippleEffectWhite;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.05);
        background-color: #3a4049;
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }

  .eat-time {
    display: inline-flex;
    gap: 0 0.6rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: #2b2b2b;
    align-items: center;

    .icon {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .detail-menu {
    padding: 1.4rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0.1rem solid #e2e2e2;

    .menu-name {
      font-size: 1.4rem;
      color: #555;
      font-weight: 500;
      flex: 1;
    }

    .detail-info {
      display: inline-flex;
      gap: 0 0.6rem;
      font-weight: 500;
      align-items: center;

      .amount {
        color: #959595;
        font-size: 1.4rem;
      }

      .calories {
        color: #2b2b2b;
        font-weight: 600;
        font-size: 1.4rem;
      }
    }

    .btn-del {
      width: 2.4rem;
      height: 2.4rem;
      margin-left: 0.6rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M16 8L8 16M16 16L8 8' stroke='%23555555' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.2s ease;

      &:hover {
        background-color: #f0f0f0;
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }
}
</style>
