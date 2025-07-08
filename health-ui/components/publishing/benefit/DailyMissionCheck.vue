<template>
  <div class="dailyMission-check">
    <ul>
      <li v-for="day in days" :key="day.id">
        <button
          :ref="day.status === 'active' ? setActiveRef : null"
          :class="getButtonClass(day.status)"
          :disabled="day.status === 'locked'"
          @click="handleClick(day)"
        >
          <span v-if="day.status === 'checked'"><i></i>{{ day.label }}</span>
          <span v-else-if="day.status === 'active'"><i></i>{{ day.label }}</span>
          <span v-else><i></i>{{ day.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick, reactive } from 'vue'
interface DayItem {
  id: number
  label: string
  status: 'checked' | 'active' | 'locked'
}

const days = ref<DayItem[]>(
  Array.from({ length: 20 }, (_, i) => {
    const dayNumber = i + 1
    let status: DayItem['status'] = 'locked'

    // ex
    if (dayNumber < 4) status = 'checked'
    else if (dayNumber === 4) status = 'active'

    return {
      id: dayNumber,
      label: `${dayNumber}일차`,
      status
    }
  })
)

const handleClick = (day: DayItem) => {
  if (day.status === 'active') {
    day.status = 'checked'
  }
}

const getButtonClass = (status: DayItem['status']) => {
  return {
    'mission-button': true,
    'is-checked': status === 'checked',
    'is-active': status === 'active',
    'is-locked': status === 'locked'
  }
}

const activeButtonRef = ref<HTMLElement | null>(null)

const setActiveRef = (el: HTMLElement | null) => {
  if (el) activeButtonRef.value = el
}

onMounted(() => {
  nextTick(() => {
    if (activeButtonRef.value) {
      activeButtonRef.value.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  })
})
</script>

<style scoped lang="scss">
.dailyMission-check {
  background: #4776e5;
  ul {
    display: flex;
    gap: 1.6rem;
    overflow-x: auto;
    padding: 1.6rem;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      flex: 1;
    }
  }
  .mission-button {
    width: 100%;
    white-space: nowrap;
    &:after {
      display: none;
    }
    &.is-checked {
      i {
        background: url('~/assets/images/benefit/ico-is-checked.svg') no-repeat;
      }
    }
    &.is-active {
      i {
        background: url('~/assets/images/benefit/ico-is-active.svg') no-repeat;
      }
    }
    &.is-locked {
      i {
        background: url('~/assets/images/benefit/ico-is-locked.svg') no-repeat;
      }
    }
    i {
      display: block;
      width: 5.6rem;
      height: 5.6rem;
      margin-bottom: 0.6rem;
    }
    span {
      color: #fff;
    }
  }
}
</style>
