<template>
  <div class="no-posts-state">
    <div class="description">아직 올라온 게시글이 없어요<br />게시글을 작성해보는 건 어떠세요?</div>
  </div>
</template>

<style scoped lang="scss">
.no-posts-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.2rem 4rem;
  text-align: center;
  min-height: 30rem;

  .description {
    padding-top: 9.6rem;
    background-image: url("data:image/svg+xml,%3Csvg width='81' height='80' viewBox='0 0 81 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40.5' cy='40' r='30' fill='%23F1F1F1'/%3E%3Cpath d='M40.5192 53.75C39.9518 53.75 39.4585 53.5403 39.0392 53.121C38.6198 52.7017 38.4102 52.2083 38.4102 51.641V36.619C38.4102 36.0517 38.6198 35.5583 39.0392 35.139C39.4585 34.7197 39.9518 34.51 40.5192 34.51H41.4812C42.0485 34.51 42.5418 34.7197 42.9612 35.139C43.3805 35.5583 43.5902 36.0517 43.5902 36.619V51.641C43.5902 52.2083 43.3805 52.7017 42.9612 53.121C42.5418 53.5403 42.0485 53.75 41.4812 53.75H40.5192ZM40.5192 30.44C39.9518 30.44 39.4585 30.2303 39.0392 29.811C38.6198 29.3917 38.4102 28.8983 38.4102 28.331V28.109C38.4102 27.5417 38.6198 27.0483 39.0392 26.629C39.4585 26.2097 39.9518 26 40.5192 26H41.4812C42.0485 26 42.5418 26.2097 42.9612 26.629C43.3805 27.0483 43.5902 27.5417 43.5902 28.109V28.331C43.5902 28.8983 43.3805 29.3917 42.9612 29.811C42.5418 30.2303 42.0485 30.44 41.4812 30.44H40.5192Z' fill='%23AABEE9'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: top center;
    font-size: 1.8rem;
    font-weight: 500;
    color: #555;
    line-height: 1.4;
  }
}
</style>
