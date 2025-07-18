<template>
  <div class="permission-item-box">
    <i :class="['icon', iconClass]"></i>
    <div>
      <p>{{ itemTitle }}</p>
      <span>{{ itemDetail }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  itemTitle: {
    type: String,
    required: true
  },
  itemDetail: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.permission-item-box {
  display: flex;
  i {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 0.8rem;
    flex-shrink: 0;
  }
  p {
    margin-bottom: 0.5rem;
    font-weight: 700;
    line-height: 2.2rem;
    color: #555;
  }
  span {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #959595;
  }
}
</style>
