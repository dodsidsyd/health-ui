<template>
  <BaseBody page-title="프라이빗 걷기게임" :show-back-button="true" :is-transparent="true">
    <PrivateGameHomeBanner @btn-click="createGame" />
    <FlexRowDiv class="mg-20y">
      <p class="medium">
        총 <strong>{{ filteredGameItems.length }}</strong
        >건
      </p>
      <Checkbox id="checkBox1" aria-label="종료된 게임 보기" class="ml-auto" @change="seeEndedGame" />
    </FlexRowDiv>
    <FlexColDiv ref="gameComponents" class="gap-20 pb-40">
      <template v-for="item in filteredGameItems" :key="item.id">
        <PrivateGameProcessing
          v-if="item.type === 'processing'"
          :state="item.state"
          :label="item.label"
          :day="item.day"
        />
        <PrivateGameEnd v-else-if="item.type === 'end'" />
      </template>
    </FlexColDiv>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import PrivateGameProcessing from '~/components/publishing/walkking/PrivateGameProcessing.vue'
import PrivateGameEnd from '~/components/publishing/walkking/PrivateGameEnd.vue'
import PrivateGameHomeBanner from '~/components/publishing/walkking/PrivateGameHomeBanner.vue'
const gameItems = ref([
  { id: 1, type: 'processing', state: 'before', label: '모집중', day: 'D-8' },
  { id: 2, type: 'processing', state: 'ing', label: '남음', day: '34일' },
  { id: 3, type: 'end' },
  { id: 4, type: 'end' },
  { id: 5, type: 'end' }
])

const isChecked = ref(false)
const filteredGameItems = computed(() => {
  if (isChecked.value) {
    // 종료된 게임 보기
    return gameItems.value.filter(item => item.type === 'end')
  } else {
    return gameItems.value
  }
})
const seeEndedGame = (event: Event) => {
  isChecked.value = (event.target as HTMLInputElement).checked
}
const createGame = () => {
  navigateTo('/walkingKing/privateGameCreate')
}
</script>

<style scoped lang="scss"></style>
