<template>
  <FlexColDiv class="test gap-12 mt-16">
    <HashtagWrap :hashtags="hashtags" />
    <FlexColDiv class="gap-8">
      <strong>{{ title }}</strong>
      <FlexColDiv>
        <NuxtLink v-for="(link, index) in displayedLinks" :key="index" :to="link.href || '#'" class="tip-link">
          {{ link.text }}
        </NuxtLink>
      </FlexColDiv>
    </FlexColDiv>
  </FlexColDiv>
</template>
<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import HashtagWrap from '~/components/publishing/community/common/HashtagWrap.vue'
interface TipLink {
  text: string
  href?: string
}
const props = defineProps({
  hashtags: {
    type: Array as () => string[],
    required: false,
    default: () => []
  },
  title: { type: String, default: '' },
  links: {
    type: Array as () => TipLink[],
    required: false,
    default: () => [
      { text: '', href: '#' },
      { text: '', href: '#' },
      { text: '', href: '#' }
    ]
  }
})

const displayedLinks = computed(() => {
  return props.links.slice(0, 3)
})
</script>
<style scoped lang="scss">
.test {
  width: 100%;
  padding: 2.4rem 2rem;
  margin: 2rem;
  border: 1px solid #eee;
  border-radius: 2rem;
  background: #fff;

  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.06);
}
</style>
