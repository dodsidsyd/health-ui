<template>
  <div class="challenge-attend-wrap">
    <div class="img-box">
      <img src="~/assets/images/walkingking/img-booster-item1.png" alt="선택된 아이템 이미지" />
    </div>
    <p>1시간 걸음수 2배 부스터를<br />사용하시겠어요?</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id: string
    name?: string
    disabled?: boolean
    modelValue: boolean
    friendsSteps?: number
    targetSteps?: number
  }>(),
  {
    name: 'chkBox',
    disabled: false,
    friendsSteps: 3000,
    targetSteps: 10000
  }
)
</script>

<style scoped lang="scss">
.challenge-attend-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 30.5rem;
  margin-bottom: -1.2rem;
  padding-top: 1.2rem;
}
.img-box {
  width: 10rem;
  height: 10rem;
}
p {
  margin-top: 3.1rem;
  font-weight: 500;
  line-height: 2.5rem;
}
</style>
