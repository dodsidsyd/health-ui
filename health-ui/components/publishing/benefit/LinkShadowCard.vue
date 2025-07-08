<template>
  <div
    :class="['link-shadow-card', ...(Array.isArray(props.class) ? props.class : [props.class]).filter(Boolean)]"
    v-bind="filteredAttrs"
  >
    <Button v-for="(btn, idx) in buttons" :key="idx" v-bind="btn">
      <strong v-if="title" class="card-title" v-html="title" />
    </Button>
  </div>
</template>
<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps<{
  title: string
  btnType?: string
  buttons: ButtonProps[]
}>()

const attrs = useAttrs()

const filteredAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})
</script>
<style scoped lang="scss">
.link-shadow-card {
  flex: 1;
  .btn-primary {
    display: block;
    position: relative;
    overflow: hidden;
    height: auto;
    padding: 2rem 2rem 7.6rem;
    border-radius: 1.2rem;
    box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
    text-align: left;
    background: #fff;
    &:after {
      display: block;
      content: '';
      position: absolute;
      top: auto;
      left: auto;
      bottom: 0.8rem;
      right: 0.8rem;
      width: 7.2rem;
      height: 7.2rem;
      opacity: 1;
      transform: none;
      transition: none;
    }
    ::v-deep(.text) {
      color: var(--gray-16);
    }
    strong {
      display: block;
    }
  }
  &.paper-card {
    .btn-primary {
      &:after {
        background: url('~/assets/images/benefit/ico-benefit-paper.svg') no-repeat;
      }
    }
  }

  &.hospital-card {
    .btn-primary {
      &:after {
        background: url('~/assets/images/benefit/ico-benefit-hospital.svg') no-repeat;
      }
    }
  }
}
</style>
