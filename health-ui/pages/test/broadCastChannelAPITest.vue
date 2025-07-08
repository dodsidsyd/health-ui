<template>
  <div>
    <h1>Counter</h1>
    <div>
      <div>Current count: {{ count }}</div>
      <div>
        <button style="background-color: #95a5a6" @click="handleClick">
          Count
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBroadcastChannel } from '~/composables/common/useBroadCastChannel'
const { postMessage } = useBroadcastChannel<number>('test-app', message => {
  // 메시지를 전달받으면 setCount 함수 호출
  count.value = message
})
const count = ref(0)

const handleClick = () => {
  count.value++
  postMessage(count.value)
}
</script>
<style scoped></style>
