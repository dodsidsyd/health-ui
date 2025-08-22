<template>
  <div class="item">
    <label :for="`checkBox${hospital.id}`">
      <div class="wrap-hospital">
        <img class="logo" :src="getImageUrl(hospital.logo)" :alt="hospital.name" />
        <div class="text">{{ hospital.name }}</div>
      </div>
      <Checkbox :id="`checkBox${hospital.id}`" v-model="isChecked" :aria-label="hospital.name" @change="handleChange" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Checkbox from '~/components/publishing/input/check.vue'

interface Hospital {
  id: string | number
  name: string
  logo: string
}

interface Props {
  hospital: Hospital
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const isChecked = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const getImageUrl = (logo: string) => {
  return `/_nuxt/assets/images/${logo}`
}

const handleChange = () => {
  emit('update:modelValue', isChecked.value)
}
</script>

<style scoped lang="scss">
.item {
  padding: 1.2rem 2rem;
  position: relative;
  width: 100%;
  border-radius: 0.8rem;
  border: 0.1rem solid #e2e2e2;
  overflow: hidden;
  border: 0.2rem solid #fff;
  background-color: #fff;
  transition:
    background-color 0.2s ease-in,
    border-color 0.2s ease-in;
  &:has(.c-checktype .c-check:checked) {
    border: 0.2rem solid #4c7ff7;
    background: #f6f9ff;
  }

  .c-checktype {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);

    :deep(.c-label) {
      &:after {
        display: none;
      }
    }
  }

  .wrap-hospital {
    @include mixin.flex-container(items-center);
    gap: 1.2rem;

    .logo {
      width: 4.8rem;
      height: 4.8rem;
    }

    .text {
      font-weight: 700;
    }
  }
}
</style>
