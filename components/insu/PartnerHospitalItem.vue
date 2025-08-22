<template>
  <div class="item-list">
    <hr v-if="hasLine" class="hr-lightGray ml-n20 mr-n20 w-auto" />
    <div v-for="(hospital, index) in hospitals" :key="hospital.id || index" class="item">
      <div v-if="hospital.badges" class="badge-wrap">
        <CommonBadge
          v-for="(badge, bIndex) in hospital.badges"
          :key="bIndex"
          :variant="badge.variant"
          :class="badge.class"
        >
          {{ badge.text }}
        </CommonBadge>
      </div>
      <FlexRowDiv class="gap-16">
        <img class="logo" :src="getImageUrl(hospital.logo)" :alt="hospital.name" />
        <div class="text-wrap">
          <strong class="text">{{ hospital.name }}</strong>
          <p class="address">{{ hospital.address }}</p>
          <p v-if="hospital.method" class="method">진단서 발급 : {{ hospital.method }}</p>
        </div>
        <Button v-if="hasBtn" btn-type="line" element-type="button" aria-label="청구" class="xs ml-auto" :width="5.2" />
      </FlexRowDiv>
    </div>
  </div>
</template>

<script setup lang="ts">
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import Button from '~/components/publishing/button/Button.vue'

export interface Hospital {
  id: string | number
  logo: string
  name: string
  address: string
  badges?: { text: string; variant?: 'solid' | 'outline' | 'soft' | 'round'; class?: string }[] // 선택적 속성으로 변경
  method?: string
}

// Props 정의: hospitals 배열을 외부에서 받도록 설정
defineProps({
  hospitals: {
    type: Array as PropType<Hospital[]>,
    required: true
    // 기본값을 설정할 수도 있습니다: default: () => []
  },
  hasBtn: {
    type: Boolean,
    default: true
  },
  hasLine: {
    type: Boolean,
    default: true
  }
})
const getImageUrl = (logo: string) => {
  return `/_nuxt/assets/images/${logo}`
}
</script>

<style scoped lang="scss">
.item {
  position: relative;
  padding: 1.6rem 0;
  & + .item {
    border-top: 1px solid #eee;
  }
  .logo {
    width: 5.6rem;
    height: 5.6rem;
  }
  .text-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
    justify-content: center;
  }
  .text {
    font-weight: 700;
    line-height: 2.2rem;
  }
  .address,
  .method {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2rem;
    color: #555;
  }
}
.badge-wrap {
  display: flex;
  margin-bottom: 1.2rem;
  gap: 0.4rem;
}
.item-list {
  margin: 0 -2rem;
  padding: 0 2rem;
}
.list-border {
  height: 0.1rem;
  width: 100%;
  margin: 0 -2rem;
  background-color: #555;
}
</style>
