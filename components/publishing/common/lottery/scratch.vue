<template>
  <div class="scratch-wrap">
    <h3>
      행운복권을<br />
      확인해주세요
    </h3>
    <ScratchArea v-if="!isScratched" />
    <ScratchedArea v-if="isScratched" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import ScratchArea from '~/components/publishing/common/lottery/ScratchArea.vue'
import ScratchedArea from '~/components/publishing/common/lottery/ScratchedArea.vue'
const props = defineProps({
  isScratched: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
h3 {
  margin-top: 7.2rem;
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 3.4rem;
  text-align: center;
}
</style>
