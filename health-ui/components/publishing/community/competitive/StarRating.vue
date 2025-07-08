<template>
  <div class="star-rating-wrap">
    <p class="average">
      평균별점 <strong>{{ averageRating.toFixed(1) }}</strong>
    </p>
    <div class="bar-box">
      <div v-for="score in 5" :key="score" class="bar-row">
        <p>
          <strong class="bar-label">{{ 6 - score }}</strong
          >점
        </p>
        <div class="bar">
          <div class="fill" :style="{ width: ratingPercentages[5 - score] + '%' }"></div>
        </div>
        <span class="percent">{{ ratingPercentages[5 - score] }}%</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

const ratings = ref([4, 4, 4, 4, 4, 3, 3, 3, 3, 3])

const ratingCounts = computed(() => {
  const counts = [0, 0, 0, 0, 0]
  for (const r of ratings.value) {
    if (r >= 1 && r <= 5) counts[r - 1]++
  }
  return counts
})

const total = computed(() => ratings.value.length)

const ratingPercentages = computed(() => {
  return ratingCounts.value.map(count => Math.round((count / total.value) * 100))
})

const averageRating = computed(() => {
  const totalScore = ratings.value.reduce((sum, r) => sum + r, 0)
  return totalScore / total.value
})
</script>
<style scoped lang="scss">
.star-rating-wrap {
  display: flex;
  gap: 4rem;
  .average {
    display: flex;
    gap: 0.4rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.2rem;
    color: #555;
    strong {
      display: block;
      font-size: 2.4rem;
      line-height: 3.1rem;
      padding-left: 2.8rem;
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.4946 2.71381C11.7012 2.29527 12.298 2.29527 12.5046 2.71381L15.1786 8.13194C15.2606 8.29814 15.4192 8.41334 15.6026 8.43999L21.5818 9.30883C22.0437 9.37595 22.2282 9.94357 21.8939 10.2694L17.5673 14.4868C17.4346 14.6162 17.374 14.8026 17.4053 14.9852L18.4267 20.9403C18.5056 21.4004 18.0228 21.7512 17.6096 21.534L12.2616 18.7224C12.0976 18.6361 11.9016 18.6361 11.7375 18.7224L6.38953 21.534C5.9764 21.7512 5.49355 21.4004 5.57245 20.9403L6.59383 14.9852C6.62516 14.8026 6.5646 14.6162 6.43187 14.4868L2.10525 10.2694C1.77102 9.94357 1.95545 9.37595 2.41734 9.30883L8.3966 8.43999C8.58001 8.41334 8.73857 8.29814 8.8206 8.13194L11.4946 2.71381Z' fill='%23FCD233' stroke='%23FBC700' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;
      background-size: 2.4rem;
      background-position: left center;
    }
  }
  .bar-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .bar-row {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 0.6rem;
    p:has(> .bar-label) {
      font-weight: 500;
      line-height: 2rem;
      color: #2b2b2b;
    }

    .bar {
      flex: 1;
      position: relative;
      overflow: hidden;
      height: 0.4rem;
      background: #f4f4f4;
      border-radius: 10rem;
      .fill {
        background: #fbc700;
        height: 100%;
        transition: width 0.4s ease;
      }
    }

    .percent {
      margin-right: 0.4rem;
      font-size: 1.4rem;
      font-weight: 500;
      text-align: right;
      line-height: 2rem;
      color: #555;
    }
  }
}
</style>
