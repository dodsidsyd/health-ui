<template>
  <div class="status-item-wrap">
    <div class="contents-box">
      <div class="time">{{ listItems.time }}</div>
      <div v-if="listItems.subTime" class="sub-time">{{ listItems.subTime }}</div>
      <div v-if="hasGauge" class="gauge-box">
        <div class="current-gauge" :style="{ width: gaugeWidth + '%' }"></div>
      </div>
    </div>
    <div class="contents-box right">
      <div v-if="listItems.division" class="sleep-division">{{ listItems.division }}</div>
      <CommonBadge v-if="hasBadge" :color="props.color" variant="round">{{ props.badgeText }}</CommonBadge>
      <div class="point">{{ listItems.point }}{{ unit }}</div>
      <div
        v-if="listItems.division"
        class="sleep-division-box"
        :class="{
          lightSleep: listItems.division === '얕은 수면',
          deepSleep: listItems.division === '깊은 수면',
          REM: listItems.division === '렘 수면'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonBadge, { type BadgeColorType } from '~/components/common/badge/CommonBadge.vue'
import { defineProps } from 'vue'

export interface ListItemsProps {
  time: string
  point: number
  division?: string
  subTime?: string
  // badgeText: string
  // color: 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'brown' | 'gray' | 'deepRed'
}

const props = defineProps({
  unit: {
    type: String,
    default: ''
  },
  listItems: {
    type: Object as () => ListItemsProps,
    required: true
  },
  hasGauge: {
    type: Boolean,
    default: true
  },
  hasBadge: {
    type: Boolean,
    default: true
  },
  badgeText: {
    type: String,
    required: true
  },
  color: {
    type: String as () => BadgeColorType,
    required: true
  }
})

const gaugeWidth = ref('0')
// 게이지 애니메이션
onMounted(() => {
  const limitedPoint = Math.min(props.listItems.point, 100)
  setTimeout(() => {
    gaugeWidth.value = `${limitedPoint}`
  }, 0)
})
</script>

<style scoped lang="scss">
.status-item-wrap {
  display: grid;
  grid-template-columns: 7fr 3fr;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem 0;
  border-bottom: 0.1rem solid #eee;
  &:last-child {
    border-bottom: none;
  }
  .contents-box {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 1.6rem;
    line-height: 2.2rem;
    &.right {
      justify-content: flex-end;
      gap: 1.2rem;
    }
    .time {
      flex-shrink: 0;
      color: #555;
    }
    .sub-time {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2rem;
      color: #555;
    }
    .point {
      flex-shrink: 0;
      text-align: right;
      font-weight: 500;
    }
  }
  .gauge-box {
    width: 100%;
    padding-right: 3.2rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    .current-gauge {
      height: 100%;
      background-color: #9eaac2;
      border-radius: 0.2rem;
      transition: width 1.5s ease-out;
    }
  }
  @media (max-width: 375px) {
    .contents-box {
      gap: 0.8rem;
      &.right {
        justify-content: flex-end;
        gap: 0.6rem;
      }
    }
    .gauge-box {
      width: 60%;
    }
  }
}

.sleep-division {
  flex-shrink: 0;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
  color: #959595;
}
.sleep-division-box {
  flex-shrink: 0;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.2rem;
  &.lightSleep {
    background-color: #41bcf5;
  }
  &.deepSleep {
    background-color: #243e8e;
  }
  &.REM {
    background-color: #9b48ff;
  }
}
</style>
