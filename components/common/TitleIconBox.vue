<template>
  <div :class="['title-box', titleBoxClass, { center: center }]">
    <div class="flex align-center">
      <p :class="['title', titleClass]">
        {{ title }} <strong :class="['point-text', pointClass]"> {{ pointText }}</strong>
      </p>
      <i :class="['icon', iconClass]">
        <img v-if="isImg" :src="fullImagePath" alt="아이콘" />
      </i>
    </div>
    <Button
      v-if="isShowLink"
      btn-type="text"
      :element-type="elementType"
      :aria-label="ariaLabel"
      :icon="icon"
      icon-position="right"
      :class="['xs', linkClass]"
      :icon-size="24"
      :link-href="linkHref"
      :is-link="true"
    />
    <p v-if="text" v-html="text" class="text"></p>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
const props = withDefaults(
  defineProps<{
    title: string
    htmlTitle: string
    titleClass: string
    titleBoxClass?: string
    linkHref?: string
    ariaLabel?: string
    icon?: string
    linkClass?: string
    isTitle?: boolean
    isShowLink?: boolean
    isShowStar?: boolean
    elementType?: 'button' | 'a'
    isLink?: boolean
    center?: boolean
    text: string
    pointText: string
    pointClass: string
    iconClass: string
    isImg: boolean
    src: string
  }>(),
  {
    titleBoxClass: '',
    isTitle: false,
    ariaLabel: '',
    icon: 'ico-greater-than',
    isShowLink: false,
    isShowStar: false,
    elementType: 'button',
    linkHref: '#',
    isLink: true,
    linkClass: '',
    center: false
  }
)

const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})
</script>
<style scoped lang="scss">
.title-box {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  .title {
    display: inline-block;
    font-size: 2rem;
    line-height: 2.6rem;
    font-weight: 700;
  }
  .text {
    font-weight: 500;
    color: #555;
    line-height: 2.2rem;
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
  //센터모드
  &.center {
    justify-content: center;
  }
  .point-text {
    display: inline-block;
    line-height: 2.6rem;
    &.blue {
      color: #4c7ff7;
    }
  }
  .icon {
    display: inline-block;
    width: 3.2rem;
    height: 3.2rem;
    background-repeat: no-repeat;
    background-position: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
