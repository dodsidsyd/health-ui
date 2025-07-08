<template>
  <div>
    <h3>서명 컴포넌트 테스트 페이지</h3>
    <Signature :is-loading="isLoading" :src="signatureSrc" />
  </div>
</template>

<script setup lang="ts">
import Signature from '~/components/test/Signature.vue'

// 테스트 데이터
const signatureSrc = ref('')
const isLoading = ref(false)

const getDummyData = async () => {
  const randomNum = Math.floor(Math.random() * 10) + 1

  try {
    isLoading.value = true
    const res = await fetch(`https://picsum.photos/v2/list?page=${randomNum}&limit=${randomNum}`)
    const data = await res.json()

    // 서명이 있을 경우
    signatureSrc.value = data[0].download_url
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getDummyData()
})
</script>

<style scoped lang="scss"></style>
