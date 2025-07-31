<template>
  <div class="star-rating-box">
    <p class="scope">{{ formattedScope }}</p>
    <div class="star-box">
      <span v-for="n in maxStars" :key="n" class="star" :class="getStarClass(n)"></span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    scope: string
    maxStars?: number
  }>(),
  {
    maxStars: 5
  }
)

const numericScope = computed(() => {
  const num = Number(props.scope)
  return isNaN(num) ? 0 : num
})

const formattedScope = computed(() => {
  return numericScope.value.toFixed(1)
})

const getStarClass = (starIndex: number) => {
  const rating = numericScope.value

  if (starIndex <= Math.floor(rating)) {
    return 'filled'
  } else if (starIndex === Math.ceil(rating) && rating % 1 !== 0) {
    return 'half-filled'
  }
  return ''
}
</script>
<style lang="scss" scoped>
.star-rating-box {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  .scope {
    font-weight: 700;
    line-height: 2.2rem;
  }

  .star-box {
    display: flex;
    gap: 0.4rem;

    .star {
      width: 2rem;
      height: 2rem;
      transition: all 0.3s ease;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.57998 2.26159C9.75211 1.9128 10.2495 1.9128 10.4216 2.26159L12.6499 6.77669C12.7183 6.9152 12.8504 7.0112 13.0033 7.03341L17.986 7.75744C18.3709 7.81337 18.5246 8.28639 18.2461 8.55788L14.6406 12.0724C14.5299 12.1802 14.4795 12.3355 14.5056 12.4878L15.3567 17.4504C15.4225 17.8337 15.0201 18.126 14.6758 17.9451L10.2192 15.602C10.0825 15.5302 9.91913 15.5302 9.78242 15.602L5.32575 17.9451C4.98147 18.126 4.5791 17.8337 4.64485 17.4504L5.496 12.4878C5.52211 12.3355 5.47164 12.1802 5.36103 12.0724L1.75551 8.55788C1.47699 8.28639 1.63068 7.81337 2.01559 7.75744L6.9983 7.03341C7.15115 7.0112 7.28328 6.9152 7.35164 6.77669L9.57998 2.26159Z' fill='%23F4F4F4' stroke='%23E2E2E2' stroke-linejoin='round'/%3E%3C/svg%3E%0A");

      &.filled {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.57998 2.26159C9.75211 1.9128 10.2495 1.9128 10.4216 2.26159L12.6499 6.77669C12.7183 6.9152 12.8504 7.0112 13.0033 7.03341L17.986 7.75744C18.3709 7.81337 18.5246 8.28639 18.2461 8.55788L14.6406 12.0724C14.5299 12.1802 14.4795 12.3355 14.5056 12.4878L15.3567 17.4504C15.4225 17.8337 15.0201 18.126 14.6758 17.9451L10.2192 15.602C10.0825 15.5302 9.91913 15.5302 9.78242 15.602L5.32575 17.9451C4.98147 18.126 4.5791 17.8337 4.64485 17.4504L5.496 12.4878C5.52211 12.3355 5.47164 12.1802 5.36103 12.0724L1.75551 8.55788C1.47699 8.28639 1.63068 7.81337 2.01559 7.75744L6.9983 7.03341C7.15115 7.0112 7.28328 6.9152 7.35164 6.77669L9.57998 2.26159Z' fill='%23FCD233' stroke='%23FBC700' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      }

      &.half-filled {
        position: relative;
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.57998 2.26159C9.75211 1.9128 10.2495 1.9128 10.4216 2.26159L12.6499 6.77669C12.7183 6.9152 12.8504 7.0112 13.0033 7.03341L17.986 7.75744C18.3709 7.81337 18.5246 8.28639 18.2461 8.55788L14.6406 12.0724C14.5299 12.1802 14.4795 12.3355 14.5056 12.4878L15.3567 17.4504C15.4225 17.8337 15.0201 18.126 14.6758 17.9451L10.2192 15.602C10.0825 15.5302 9.91913 15.5302 9.78242 15.602L5.32575 17.9451C4.98147 18.126 4.5791 17.8337 4.64485 17.4504L5.496 12.4878C5.52211 12.3355 5.47164 12.1802 5.36103 12.0724L1.75551 8.55788C1.47699 8.28639 1.63068 7.81337 2.01559 7.75744L6.9983 7.03341C7.15115 7.0112 7.28328 6.9152 7.35164 6.77669L9.57998 2.26159Z' fill='%23F4F4F4' stroke='%23E2E2E2' stroke-linejoin='round'/%3E%3C/svg%3E%0A");

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          overflow: hidden;
          background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.57998 2.26159C9.75211 1.9128 10.2495 1.9128 10.4216 2.26159L12.6499 6.77669C12.7183 6.9152 12.8504 7.0112 13.0033 7.03341L17.986 7.75744C18.3709 7.81337 18.5246 8.28639 18.2461 8.55788L14.6406 12.0724C14.5299 12.1802 14.4795 12.3355 14.5056 12.4878L15.3567 17.4504C15.4225 17.8337 15.0201 18.126 14.6758 17.9451L10.2192 15.602C10.0825 15.5302 9.91913 15.5302 9.78242 15.602L5.32575 17.9451C4.98147 18.126 4.5791 17.8337 4.64485 17.4504L5.496 12.4878C5.52211 12.3355 5.47164 12.1802 5.36103 12.0724L1.75551 8.55788C1.47699 8.28639 1.63068 7.81337 2.01559 7.75744L6.9983 7.03341C7.15115 7.0112 7.28328 6.9152 7.35164 6.77669L9.57998 2.26159Z' fill='%23FCD233' stroke='%23FBC700' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
        }
      }

      &:not(.filled) {
        fill: #e0e0e0;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
