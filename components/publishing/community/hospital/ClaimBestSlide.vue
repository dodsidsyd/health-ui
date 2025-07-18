<template>
  <FlexColDiv class="best-info gap-12">
    <FlexRowDiv class="space-between align-center pt-7 pb-7">
      <p class="nickname">{{ nickname }}</p>
      <div class="scope-box">
        <p class="scope">{{ scope }}</p>
        <div class="star-box">
          <span v-for="n in maxStars" :key="n" class="star" :class="{ filled: n <= scope }"></span>
        </div>
      </div>
    </FlexRowDiv>
    <p class="title">
      청구의 신 <strong>{{ title }}</strong>
    </p>
    <p class="text">{{ text }}</p>
  </FlexColDiv>
</template>
<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'

const props = withDefaults(
  defineProps<{
    nickname?: string
    title?: string
    text?: string
    scope: string
    maxStars?: number
  }>(),
  {
    nickname: '',
    title: '',
    text: '',
    maxStars: 5
  }
)
</script>
<style scoped lang="scss">
.best-info {
  display: flex;
  gap: 0.4rem;
  width: 100%;
  margin: 2.4rem 0;
  padding: 2.4rem 2rem;
  border-radius: 2rem;
  background: #fff;
  box-shadow: 0.4rem 0.4rem 1.2rem 0px rgba(0, 0, 0, 0.04);
  .nickname {
    line-height: 2.2rem;
    color: #4c7ff7;
  }
  .title {
    display: inline-block;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.2rem;
    color: #555;
    strong {
      font-weight: 700;
    }
  }
  .text {
    font-weight: 400;
    line-height: 2.2rem;
    @include mixin.multi-ellipsis($clamp: 3);
  }

  ::v-deep(.link-item) {
    .btn-link {
      padding: 2.1rem 0.4rem;
      background-position: right 0.4rem center;
      .text {
        font-size: 1.6rem;
        line-height: 2.2rem;
        color: #2b2b2b;
      }
    }
    & + .link-item {
      border-top: 1px solid #eee;
    }
  }
  .scope-box {
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

        &:not(.filled) {
          fill: #e0e0e0;
        }

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
