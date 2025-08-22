<template>
  <div class="personal-profile-wrap">
    <dl v-for="(item, index) in profiles" :key="index">
      <dt>{{ item.type }}</dt>
      <dd>{{ item.state }}</dd>
    </dl>
  </div>
</template>
<script setup lang="ts">
const profiles = ref([
  { type: '만성질환', state: '고지혈증, 고혈압' },
  { type: '흡연', state: '해당없음' },
  { type: '음주', state: '주 1회 이상' },
  { type: '운동', state: '현재 하지 않음' }
])
</script>
<style lang="scss" scoped>
.personal-profile-wrap {
  margin: 4rem 0 2rem;
  padding: 1.6rem 2rem;
  background: #f4f4f4;
  border-radius: 1.2rem;
  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 0;
    border-bottom: 0.1rem solid #e2e2e2;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
  }
  dt {
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 1.8rem;
  }
  dd {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
  }
}
</style>
