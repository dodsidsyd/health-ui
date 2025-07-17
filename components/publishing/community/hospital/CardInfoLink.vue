<template>
  <NuxtLink :to="href" :class="['card-info-link', cardLinkClass]" :title="altTitle">
    <i class="icon"></i>
    <strong v-html="text" class="text"></strong>
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
.card-info-link {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: hidden;
  padding: 2.4rem;
  border-radius: 1.2rem;
  .icon {
    display: block;
    width: 4.8rem;
    height: 4.8rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
  .text {
    line-height: 2.2rem;
  }
  &.reservation {
    background: #e8eefa;
    .icon {
      background: url('~/assets/images/community/ico-info-reservation.svg') no-repeat;
    }
  }
  &.tip {
    background: #ffe2e6;
    .icon {
      background: url('~/assets/images/community/ico-info-tip.svg') no-repeat;
    }
  }
  &.claim {
    background: #fef4cc;
    .icon {
      background: url('~/assets/images/community/ico-info-claim.svg') no-repeat;
    }
  }
  &.news {
    background: #e0fcdb;
    .icon {
      background: url('~/assets/images/community/ico-info-news.svg') no-repeat;
    }
  }
}
</style>
