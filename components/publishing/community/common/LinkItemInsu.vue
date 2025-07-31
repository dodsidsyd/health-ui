<template>
  <div class="link-item">
    <NuxtLink :to="href" class="btn-link">
      <div class="icon-box">
        <img :src="fullImagePath" alt="" />
      </div>

      <FlexColDiv>
        <p class="text">{{ text }}</p>
        <strong class="insu">{{ insu }}</strong>
      </FlexColDiv>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
const props = withDefaults(
  defineProps<{
    href?: string
    text?: string
    src?: string
    insu?: string
    iconClass: string
  }>(),
  {
    href: '#',
    text: '',
    src: '',
    insu: '',
    iconClass: ''
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
.link-item {
  .btn-link {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    padding: 2rem;
    background: #fff;
    border-radius: 1.2rem;
    .icon-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4rem;
      height: 4rem;
      overflow: hidden;
      border-radius: 9.9rem;
      background: #f4f4f4;
    }
    .icon {
      width: 2.8rem;
      height: 2.8rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.8rem;
    }
    .text {
      flex: 1;
      padding-right: 3.2rem;
      @include mixin.ellipsis;
      font-weight: 700;
      line-height: 2.2rem;
    }
    .insu {
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: 400;
      color: #4c7ff7;
    }
  }
}
</style>
