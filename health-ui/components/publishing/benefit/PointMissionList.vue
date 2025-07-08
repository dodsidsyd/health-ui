<template>
  <ul>
    <li v-for="mission in missionList" :key="mission.id">
      <PointMissionItem :mission="mission" @action="handleMissionClick" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import PointMissionItem from './PointMissionItem.vue'
const missionList = [
  {
    id: 1,
    image: '/_nuxt/assets/images/benefit/img-mission1.svg',
    text: '알콜을 참아보아요!',
    title: '하루 2잔 이하 절주 하기',
    type: 'point',
    status: 'primary',
    point: 10
  },
  {
    id: 2,
    image: '/_nuxt/assets/images/benefit/img-mission2.svg',
    text: '모두를 위한 금연!',
    title: '하루 금연 프로그램 참여',
    type: 'complete',
    status: 'primary'
  },
  {
    id: 3,
    image: '/_nuxt/assets/images/benefit/img-mission3.svg',
    text: '잠깐 머리 식혀요',
    title: '2,000걸음 걷기',
    type: 'complete',
    status: 'disabled'
  },
  {
    id: 4,
    image: '/_nuxt/assets/images/benefit/img-mission4.svg',
    text: '점심먹고 걸어볼까요?',
    title: '5,000걸음 걷기',
    type: 'lock',
    status: 'disabled'
  },
  {
    id: 5,
    image: '/_nuxt/assets/images/benefit/img-mission5.svg',
    text: '저녁식사는 간단하게',
    title: '가볍게 저녁식사하기',
    type: 'lock',
    status: 'disabled'
  },
  {
    id: 6,
    image: '/_nuxt/assets/images/benefit/img-mission6.svg',
    text: '저녁먹고 러닝해요',
    title: '10,000걸음 걷기',
    type: 'lock',
    status: 'disabled'
  },
  {
    id: 7,
    image: '/_nuxt/assets/images/benefit/img-mission7.svg',
    text: '오늘 하루도 수고했어요.',
    title: '7~9시간 깊은 잠자기',
    type: 'lock',
    status: 'disabled'
  },
  {
    id: 8,
    image: '/_nuxt/assets/images/benefit/img-mission8.svg',
    text: '앱 최초 사용시 연동해요',
    title: '레몬링과 건강의신 연동',
    type: 'point',
    status: 'primary',
    point: 3000
  },
  {
    id: 9,
    image: '/_nuxt/assets/images/benefit/img-mission9.svg',
    text: '매일 건강 챙겨요',
    title: '레몬링으로 심박수 측정',
    type: 'point',
    status: 'primary',
    point: 500
  },
  {
    id: 10,
    image: '/_nuxt/assets/images/benefit/img-mission10.svg',
    text: '건강한 수면, 활기찬 하루',
    title: '레몬링으로 수면시간 분석',
    type: 'point',
    status: 'primary',
    point: 1000
  }
]

const handleMissionClick = (id: number) => {
  console.log('미션 클릭됨:', id)
}
</script>
<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
</style>
