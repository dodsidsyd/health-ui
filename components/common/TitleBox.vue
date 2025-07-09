<template>
  <div :class="['title-box', titleBoxClass]">
    <strong :class="['title', titleClass]">{{ title }}</strong>
    <Button
      v-if="isShowLink"
      btn-type="text"
      :element-type="elementType"
      :aria-label="ariaLabel"
      icon="ico-greater-than"
      icon-position="right"
      :class="['xs', linkClass]"
      :icon-size="16"
      :link-href="linkHref"
      :is-link="true"
    />
    <div v-else-if="isShowStar" class="star-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M7.66339 1.80937C7.8011 1.53034 8.19899 1.53034 8.3367 1.80937L10.1194 5.42145C10.1741 5.53226 10.2798 5.60906 10.402 5.62682L14.3882 6.20605C14.6961 6.25079 14.8191 6.62921 14.5963 6.8464L11.7119 9.65802C11.6234 9.74427 11.583 9.86853 11.6039 9.99032L12.2848 13.9604C12.3374 14.2671 12.0155 14.5009 11.7401 14.3561L8.17475 12.4817C8.06538 12.4242 7.93472 12.4242 7.82535 12.4817L4.26001 14.3561C3.98459 14.5009 3.66269 14.2671 3.71529 13.9604L4.39621 9.99032C4.4171 9.86853 4.37672 9.74427 4.28824 9.65802L1.40382 6.8464C1.181 6.62921 1.30396 6.25079 1.61189 6.20605L5.59806 5.62682C5.72033 5.60906 5.82604 5.53226 5.88073 5.42145L7.66339 1.80937Z"
          fill="#FCD233"
          stroke="#FBC700"
          stroke-linejoin="round"
        />
      </svg>
      <div class="score-box">
        <span class="score">{{ rating ?? '0.0' }}</span>
        <span class="total-score">{{ totalRating ?? '5' }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
const props = withDefaults(
  defineProps<{
    title: string
    titleClass: string
    titleBoxClass?: string
    linkHref?: string
    ariaLabel: string
    linkClass?: string
    isShowLink?: boolean
    isShowStar?: boolean
    elementType?: 'button' | 'a'
    isLink?: boolean
    rating?: string
    totalRating?: string
  }>(),
  {
    titleBoxClass: '',
    isShowLink: false,
    isShowStar: false,
    elementType: 'button',
    linkHref: '#',
    isLink: true,
    linkClass: '',
    rating: '',
    totalRating: '5'
  }
)
</script>
<style scoped lang="scss">
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  .title {
    display: inline-block;
    font-size: 2rem;
    line-height: 2.6rem;
  }
  .star-box {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .score-box {
    .score {
      font-weight: 700;
      line-height: 2.2rem;
      color: #555;
    }
    .total-score {
      font-weight: 700;
      color: #959595;
      &:before {
        display: inline-block;
        content: '/';
      }
    }
  }
}
</style>
