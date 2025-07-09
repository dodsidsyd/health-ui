<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <h2>진료내역을 선택해 주세요.(단건 선택)</h2>

      <div>
        <div style="border: 1px solid gray; padding: 1rem">강동성심병원 12건</div>
      </div>

      <div>
        <div>입원 진료내역은 1건씩 청구 가능해요.</div>
        <div>
          <div style="border: 1px solid gray">
            <div>미청구</div>
            <div>진료일 2024.01.20 ~ 2025.05.20</div>
            <div>진료과</div>
            <div>입원비</div>
          </div>
        </div>
      </div>
    </div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="clickCharge">다음</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

const clickCharge = () => {
  navigateTo('/insu/claim/paperless/retrieveCharge')
}
</script>

<style scoped lang="scss"></style>
