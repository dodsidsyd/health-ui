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
  </div>
</template>
<script setup lang="ts">
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
    elementType?: 'button' | 'a'
    isLink?: boolean
  }>(),
  {
    titleBoxClass: '',
    isShowLink: false,
    elementType: 'button',
    linkHref: '#',
    isLink: true,
    linkClass: ''
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
}
</style>
