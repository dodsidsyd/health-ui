<template>
  <div class="my-badge-wrap">
    <div class="title-box" v-if="showTitleBox">
      <p>{{ title }}</p>
      <p>
        <span>{{ filledBadgeCount }}&nbsp;</span>개
      </p>
    </div>
    <div class="badges-grid">
      <MyBadge
        v-for="badge in badgesData"
        :key="badge.id"
        :type="badge.type"
        :variant="badge.variant"
        :title="badge.title"
        :date="badge.date"
        :image-name="badge.imageName"
        @click="onBadgeClick(badge)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MyBadge from '~/components/publishing/common/myBadge/myBadge.vue'

interface Badge {
  id: number
  type: 'walked' | 'streak' | 'health' | 'community'
  title: string
  date?: string
  imageName?: string
  variant?: 'empty'
}
interface Props {
  badgesData: Badge[]
  title: string
  showTitleBox?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  showTitleBox: true,
  date: '도전'
})

const emit = defineEmits<{
  (e: 'badge-click', badge: Badge): void
}>()
const onBadgeClick = (badge: Badge) => {
  if (badge.variant == 'empty') {
    emit('badge-click', badge)
  }
}

const filledBadgeCount = computed(() => {
  return props.badgesData.filter(badge => badge.variant !== 'empty').length
})
</script>

<style scoped>
.my-badge-wrap {
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
    color: var(--gray-16);
    font-size: 1.6rem;
    font-weight: 700;
    span {
      color: var(--blue-primary);
    }
  }
}
.badges-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(11rem, 1fr));
  gap: 1rem;
  justify-items: center;
  margin-bottom: 2.4rem;
}
</style>
