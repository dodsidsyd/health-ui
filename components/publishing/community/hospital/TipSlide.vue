<template>
  <FlexColDiv class="tip-info gap-12 mt-16">
    <HashtagWrap :hashtags="hashtags" />
    <FlexColDiv class="gap-8">
      <strong v-html="title" class="title"></strong>
      <FlexColDiv>
        <LinkItemText v-for="(link, index) in displayedLinks" :key="index" :text="link.text" :to="link.href || '#'" />
      </FlexColDiv>
    </FlexColDiv>
  </FlexColDiv>
</template>
<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import HashtagWrap from '~/components/publishing/community/common/HashtagWrap.vue'
import LinkItemText from '~/components/publishing/community/common/LinkItemText.vue'
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
.tip-info {
  width: 100%;
  padding: 2rem 2rem 0.4rem;
  margin: 2rem 2rem 4rem;
  border: 1px solid #eee;
  border-radius: 2rem;
  background: #fff;
  .title {
    display: inline-block;
    font-size: 2rem;
    line-height: 2.6rem;
  }

  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.06);
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
}
</style>
