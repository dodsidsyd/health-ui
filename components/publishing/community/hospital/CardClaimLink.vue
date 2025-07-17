<template>
  <NuxtLink :to="href" :class="['card-claim-link', cardLinkClass]" :title="altTitle">
    <strong v-html="text" class="text"></strong>
    <i class="icon"></i>
  </NuxtLink>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    cardLinkClass?: string
    text: string
    href?: string
    altTitle?: string
  }>(),
  {
    cardLinkClass: '',
    href: '#',
    altTitle: '화면이동'
  }
)
</script>
<style scoped lang="scss">
.card-claim-link {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  height: 16rem;
  padding: 2.4rem 1.2rem 1.2rem 2rem;
  background: #f4f4f4;
  border-radius: 1.2rem;
  &:has(.sub-text) {
    gap: 0.6rem;
  }
  .text {
    display: block;
    line-height: 2.2rem;
    color: #fff;
    width: 13.8rem;
  }

  .icon {
    display: block;
    width: 6rem;
    height: 6rem;
    margin-left: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
  &.claim-step-link {
    background-color: #4c7ff7;
    .icon {
      background-image: url('~/assets/images/community/ico-claim-step.svg');
    }
  }
  &.deductible-link {
    background: #3e68cb;
    .icon {
      background-image: url('~/assets/images/community/ico-deductible.svg');
    }
  }
  &.hospital-info-link {
    background: #4f5561;
    .icon {
      background-image: url('~/assets/images/community/ico-hospital-info.svg');
    }
  }
  &.document-link {
    background: #31519e;
    .icon {
      background-image: url('~/assets/images/community/ico-document.svg');
    }
  }
}
</style>
