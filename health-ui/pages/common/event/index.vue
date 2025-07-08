<template>
  <BaseBody page-title="이벤트" :show-back-button="true">
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />
    <TotalCountBtnType :count="4" class="mg-21y" v-if="activeLineTab === '1'" />
    <TotalCountBtnType :count="0" class="mg-21y" v-else />
    <div class="event-banner-wrap" v-if="activeLineTab === '1'">
      <NuxtLink to="javascript:void(0)" @click="goToDetail" class="event-banner-box">
        <img :src="imgBanner" alt="이벤트 배너" />
      </NuxtLink>
      <NuxtLink to="javascript:void(0)" @click="goToDetail" class="event-banner-box">
        <img :src="imgBanner" alt="이벤트 배너" />
      </NuxtLink>
      <NuxtLink to="javascript:void(0)" @click="goToDetail" class="event-banner-box">
        <img :src="imgBanner" alt="이벤트 배너" />
      </NuxtLink>
      <NuxtLink to="javascript:void(0)" @click="goToDetail" class="event-banner-box">
        <img :src="imgBanner" alt="이벤트 배너" />
      </NuxtLink>
    </div>
    <div class="event-banner-wrap empty" v-else>진행중인 이벤트가 없습니다.</div>
  </BaseBody>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import TotalCountBtnType from '~/components/publishing/common/temp/TotalCountBtnType.vue'
import imgBanner from '~/assets/images/img-banner.png'

const activeLineTab = ref('1')
const router = useRouter()
function goToDetail() {
  router.push('./event/detail')
}
// LineTabs 데이터 (라우팅 테스트용)
const lineTabs = ref<Tab[]>([
  { title: '진행중인 이벤트', key: '1' },
  { title: '종료된 이벤트', key: '2' }
])
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
  console.log('Category tab changed to:', key)
}
</script>

<style scoped lang="scss">
.event-banner-wrap {
  .event-banner-box {
    display: block;
    width: 100%;
    margin-bottom: 1.2rem;
    &:last-child {
      margin-bottom: 0;
    }
    img {
      height: 100%;
      margin: 0 auto;
    }
  }
  &.empty {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    color: var(--gray-11);
    font-size: 1.8rem;
    font-weight: 500;
    &::before {
      content: '';
      display: block;
      width: 8rem;
      height: 8rem;
      margin-bottom: 1.6rem;
      background: url(../../../assets/images/insu/icon-empty.svg) center / 5.8rem 6.3rem no-repeat;
    }
  }
}
</style>
