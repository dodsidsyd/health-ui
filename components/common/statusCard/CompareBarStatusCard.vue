<template>
  <div class="bar-status-card">
    <div class="flex flex-row">
      <div>
        <p class="tit">{{ title }}</p>
      </div>
      <i :class="['icon', `ico-${cardType}`]" aria-label="hidden"></i>
    </div>
    <div class="flex flex-col gap-14 mt-23">
      <div class="flex align-center" v-for="(item, index) in keywordData" :key="index">
        <div class="bar-box">
          <div class="bar" :style="{ width: item.barWidth + '%' }"></div>
        </div>
        <p class="keyword-num">{{ numFormat(item.keywordNum) }}</p>
        <strong class="keyword">{{ item.keyword }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props 타입 정의
interface Props {
  title?: string
  cardType?: string
  keywordData?: {
    barWidth: number
    keywordNum: number | string
    keyword: string
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '인기 키워드',
  cardType: '',
  keywordData: () => [] // 기본값 추가
})

const numFormat = (keywordNum: number | string) => {
  const num = Number(keywordNum)
  return isNaN(num) ? '0' : num.toLocaleString()
}
</script>

<style lang="scss" scoped>
.bar-status-card {
  overflow: hidden;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  padding-bottom: 3.2rem;
  justify-content: space-between;

  .flex-row {
    justify-content: space-between;
  }

  .tit {
    font-weight: 500;
    color: #555;
  }

  .icon {
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .bar-box {
    flex: 3;
    position: relative;
    overflow: hidden;
    width: auto;
    height: 1.2rem;
    border-radius: 1.2rem;
    background: #ececec;
    .bar {
      overflow: hidden;
      width: 0%;
      height: 100%;
      border-radius: 1.2rem;
      background: #4c7ff7;
      transition: width 0.5s ease;
    }
  }

  .keyword-num {
    flex: 1;
    margin-left: 0.8rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #2b2b2b;
  }
  .keyword {
    flex: 1;
    display: block;
    text-align: right;
    font-size: 1.4rem;
    line-height: 2rem;
  }
}
</style>
