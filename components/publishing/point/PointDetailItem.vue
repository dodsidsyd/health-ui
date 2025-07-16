<template>
  <dl class="detail-item" :class="typeClass">
    <dt class="title">
      {{ title }}
      <!-- 링크가 있을 때만 표시 -->
      <nuxt-link v-if="linkText && linkUrl" :to="linkUrl" class="account-change">{{ linkText }}</nuxt-link>
    </dt>
    <dd class="text">
      <!-- 상태가 있으면 상태만 표시, 없으면 메인 텍스트 표시 -->
      <template v-if="status">
        <span class="badge" :class="statusClass">{{ statusText }}</span>
      </template>
      <template v-else>
        {{ mainText }}
        <!-- 서브 텍스트가 있을 때만 표시 -->
        <strong v-if="subText">{{ subText }}</strong>
      </template>
    </dd>
  </dl>
</template>

<script setup lang="ts">
interface Props {
  title: string
  mainText: string
  subText?: string
  linkText?: string
  linkUrl?: string
  status?: string
  statusType?: 'standby' | 'complete'
  type?: 'default' | 'account' | 'process'
}

const props = withDefaults(defineProps<Props>(), {
  title: '정보',
  mainText: '',
  subText: '',
  linkText: '',
  linkUrl: '',
  status: '',
  statusType: 'standby',
  type: 'default'
})

// 타입에 따른 CSS 클래스
const typeClass = computed(() => {
  return props.type !== 'default' ? props.type : ''
})

// 상태 배지 CSS 클래스
const statusClass = computed(() => {
  return props.statusType === 'standby' ? 'standby' : 'complete'
})

// 상태 텍스트
const statusText = computed(() => {
  return props.statusType === 'standby' ? '접수대기' : '접수완료'
})
</script>

<style scoped lang="scss">
.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 1.2rem 0;
  flex-direction: row;
  gap: 0 0.8rem;
  border-top: 0.1rem solid #f0f0f0;

  &:first-child {
    border-top: none;
  }

  .title {
    font-size: 1.6rem;
    color: #555;
    font-weight: 400;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem 0;
    .account-change {
      font-size: 1.4rem;
      color: #555;
      text-decoration: underline;
    }
  }

  .text {
    font-size: 1.6rem;
    color: #2b2b2b;
    margin: 0;
    text-align: right;
    font-weight: 500;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.2rem 0;

    .badge {
      display: inline-block;
      width: auto;
      max-width: fit-content;
      padding: 0.3rem 0.6rem;
      border-radius: 0.4rem;
      font-size: 1.2rem;
      font-weight: 500;
      white-space: nowrap;

      &.standby {
        background-color: #eaf2cc;
        color: #506a1d;
      }

      &.complete {
        background-color: #eee;
        color: #555;
      }
    }

    .payment-method {
      position: relative;
      display: inline-block;
    }
  }
}
</style>
