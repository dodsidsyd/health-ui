<template>
  <div class="no-posts-state">
    <div class="icon">📄</div>
    <div class="title">아직 게시글이 없어요</div>
    <div class="description">
      첫 번째 게시글을 작성해서<br />
      커뮤니티를 활성화해보세요!
    </div>
    <button class="create-button" @click="createPost">첫 게시글 작성하기</button>
  </div>
</template>

<script setup lang="ts">
const createPost = () => {
  console.log('게시글 작성하기')
  // 실제 구현: 게시글 작성 페이지로 이동
  // navigateTo('/community/write')
}
</script>

<style scoped lang="scss">
.no-posts-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;
  min-height: 400px;

  .icon {
    font-size: 64px;
    margin-bottom: 24px;
  }

  .title {
    font-size: 20px;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 12px;
  }

  .description {
    font-size: 16px;
    color: #6b7280;
    line-height: 1.5;
    margin-bottom: 32px;
  }

  .create-button {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #2563eb;
      transform: translateY(-1px);
    }
  }
}
</style>
