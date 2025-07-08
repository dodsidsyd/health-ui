<template>
  <BaseBody>
    피보험자(치료받은 분)
    <div>설계사 정지혜</div>
    <div>피보험자 이름</div>
    <div>피보험자 휴대폰번호</div>
    <div>피보험자 생년월일</div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl outline" @click="clickDelete">삭제</button>
    <button class="c-btn xl" @click="clickSave">저장</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

const clickDelete = () => {
  console.log('삭제')
}

const clickSave = () => {
  console.log('저장')
}
</script>

<style scoped lang="scss"></style>
