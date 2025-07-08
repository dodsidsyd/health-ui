<template>
  <div class="rank-item">
    <div class="rank-item__icon">
      <div class="rank-item__icon-wrapper">
        <div class="rank-item__icon-part part-1"></div>
        <div class="rank-item__icon-part part-2"></div>
        <div class="rank-item__icon-part part-3"></div>
        <div class="rank-item__icon-part part-4"></div>
      </div>
    </div>
    <div class="rank-item__content">
      <div class="rank-item__user-info">
        <div class="rank-item__profile">
          <img :src="profileImage" :alt="nickname" class="rank-item__profile-image" />
          <div class="rank-item__user-details">
            <div class="rank-item__name">
              <span class="rank-item__nickname">{{ nickname }}</span>
              <span class="rank-item__real-name">{{ realName }}</span>
            </div>
            <div class="rank-item__location">{{ location }}</div>
          </div>
          <div class="rank-item__stats">
            <div class="rank-item__steps">
              <span class="rank-item__steps-count">{{ steps.toLocaleString() }}</span>
              <span class="rank-item__steps-label">걸음</span>
            </div>
            <div class="rank-item__distance">{{ distance }}km</div>
          </div>
        </div>
      </div>
    </div>
    <div class="rank-item__rank">
      <div class="rank-item__rank-icon"></div>
      <div class="rank-item__rank-number">{{ rank }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  nickname: string
  realName: string
  location: string
  steps: number
  distance: number
  rank: number
  profileImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  profileImage: 'https://placehold.co/46x46'
})
</script>

<style scoped>
.rank-item {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  background-color: white;
}

.rank-item__icon {
  padding: 11px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.rank-item__icon-wrapper {
  width: 24px;
  height: 24px;
  position: relative;
  overflow: hidden;
}

.rank-item__icon-part {
  position: absolute;
}

.rank-item__icon-part.part-1 {
  width: 17.01px;
  height: 11.33px;
  left: 0;
  top: 0;
  background: #55acee;
}

.rank-item__icon-part.part-2 {
  width: 12px;
  height: 10.21px;
  left: 12px;
  top: 0;
  background: #3b88c3;
}

.rank-item__icon-part.part-3 {
  width: 14.22px;
  height: 15.11px;
  left: 4.89px;
  top: 8.89px;
  background: #ffac33;
}

.rank-item__icon-part.part-4 {
  width: 3.27px;
  height: 8.48px;
  left: 9.89px;
  top: 12.4px;
  background: #9e5200;
}

.rank-item__content {
  flex: 1 1 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
}

.rank-item__user-info {
  flex: 1 1 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.rank-item__profile {
  flex: 1 1 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
}

.rank-item__profile-image {
  width: 46px;
  height: 46px;
  background: #d9d9d9;
  border-radius: 9999px;
}

.rank-item__user-details {
  flex: 1 1 0;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.rank-item__name {
  align-self: stretch;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rank-item__nickname {
  color: #111111;
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  line-height: 20px;
}

.rank-item__real-name {
  color: #999999;
  font-size: 13px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  line-height: 20px;
}

.rank-item__location {
  align-self: stretch;
  height: 18px;
  color: #666666;
  font-size: 12px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rank-item__stats {
  flex: 1 1 0;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 8px;
}

.rank-item__steps {
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
}

.rank-item__steps-count {
  color: #111111;
  font-size: 20px;
  font-family: 'Noto Sans', sans-serif;
  font-weight: 700;
}

.rank-item__steps-label {
  color: #111111;
  font-size: 11px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}

.rank-item__distance {
  color: #666666;
  font-size: 13px;
  font-family: 'Noto Sans', sans-serif;
  font-weight: 400;
  line-height: 20px;
}

.rank-item__rank {
  width: 40px;
  height: 30px;
  border-left: 1px solid #eeeeee;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3px;
}

.rank-item__rank-icon {
  width: 12px;
  height: 7.2px;
  background: var(--BasicColor_R, #ec171e);
}

.rank-item__rank-number {
  color: var(--BasicColor_R, #ec171e);
  font-size: 12px;
  font-family: 'Noto Sans', sans-serif;
  font-weight: 700;
  line-height: 20px;
  text-align: right;
}
</style>
