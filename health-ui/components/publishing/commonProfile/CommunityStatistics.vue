<template>
  <div class="community-statistics">
    <div class="community-dashboard">
      <div class="box">
        <strong class="box-tit">게시글</strong>
        <div class="box-figure">
          <span class="steps">1,000</span>
        </div>
      </div>
      <div class="box">
        <strong class="box-tit">댓글</strong>
        <div class="box-figure">
          <span class="steps">9,999</span>
        </div>
      </div>
      <div class="box">
        <strong class="box-tit">반응</strong>
        <div class="box-figure">
          <span class="steps">386</span>
        </div>
      </div>
      <div class="box">
        <strong class="box-tit">스크랩</strong>
        <div class="box-figure">
          <span class="steps">386</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.community-statistics {
  .community-dashboard {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    .box {
      flex: 1 1 auto;
      background: #f9f9f9;
      border-radius: 0.8rem;
      padding: 1.2rem 1.6rem;
      .box-tit {
        font-size: 1.2rem;
        font-weight: 500;
        color: #555;
      }
      .box-figure {
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
        color: #2b2b2b;
        text-align: right;
        line-height: 130%;
        .steps {
          font-size: 1.4rem;
          line-height: 140%;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
