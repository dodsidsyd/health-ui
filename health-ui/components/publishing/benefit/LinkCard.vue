<template>
  <FlexColDiv
    :class="['link-card', ...(Array.isArray(props.class) ? props.class : [props.class]).filter(Boolean)]"
    v-bind="filteredAttrs"
  >
    <div class="card-content">
      <span v-if="title" class="card-title">{{ title }}</span>
      <strong v-if="text" class="card-text" v-html="text" />
    </div>

    <!-- 버튼들 -->
    <div class="card-buttons" v-if="buttons?.length">
      <Button v-for="(btn, idx) in buttons" :key="idx" v-bind="btn" @click="handleClick(btn, $event)">
        {{ btn.label }}
      </Button>
    </div>
  </FlexColDiv>
</template>
<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
const props = defineProps<{
  title: string
  text: string
  buttons?: (ButtonProps & { onClick?: (e: MouseEvent) => void })[]
  class?: string | string[]
}>()

const attrs = useAttrs()

const filteredAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const handleClick = (btn: any, event: MouseEvent) => {
  if (typeof btn.onClick === 'function') {
    btn.onClick(event)
  }
}
</script>
<style scoped lang="scss">
.link-card {
  position: relative;
  overflow: hidden;
  padding: 2.4rem;
  border-radius: 1.2rem;
  gap: 2.4rem;
  &:after {
    display: block;
    content: '';
    position: absolute;
    bottom: 2.4rem;
    right: 2.4rem;
    width: 12rem;
    height: 12rem;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    .card-title {
      font-weight: vars.$bold;
    }
    .card-text {
      font-size: var(--num-22);
    }
  }
  .card-buttons {
    .btn-primary {
      ::v-deep(.text) {
        font-weight: 500;
      }
    }
  }

  &.attendance-card {
    background: #e8eefa;
    .card-content {
      .card-title {
        color: #4c7ff7;
      }
    }
    &:after {
      background: url('~/assets/images/benefit/ico-benefit-calendar.svg') no-repeat;
    }
  }
  &.invite-card {
    background: #e5f5cf;
    .card-content {
      .card-title {
        color: #519430;
      }
    }
    .card-buttons {
      .btn-primary {
        background-color: #519430;
      }
    }
    &:after {
      background: url('~/assets/images/benefit/ico-benefit-friend.svg') no-repeat;
    }
  }
  &.acc-card {
    background: #ffe9ec;
    .card-content {
      .card-text {
        font-size: var(--num-18);
      }
    }
    .card-buttons {
      .btn-primary {
        background-color: #df3e4f;
      }
    }
    &:after {
      width: 9.6rem;
      height: 9.6rem;
      background: url('~/assets/images/benefit/ico-benefit-paper2.svg') no-repeat;
    }
  }
}
</style>
