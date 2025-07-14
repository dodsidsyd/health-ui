<template>
  <div class="comm-no-permission">
    <!-- Dim 배경 -->
    <div class="dim-overlay"></div>

    <!-- 권한 없음 메시지 -->
    <div class="permission-modal">
      <div class="icon"><img src="~/assets/images/community/ico-permission.svg" alt="" /></div>
      <div class="title">커뮤니티 멤버만<br />게시글을 확인할 수 있어요</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const contactAdmin = () => {
  console.log('관리자 문의하기')
  // 실제 구현: 문의 페이지로 이동 또는 모달 열기
}
</script>

<style scoped lang="scss">
.comm-no-permission {
  position: absolute;
  top: -6.3rem;
  left: -2rem;
  right: 0;
  bottom: 0;
  width: calc(100% + 4rem);
  height: calc(100% + 6.3rem);
  z-index: 100;

  .dim-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 51.98%);
    backdrop-filter: blur(1px);
  }

  .permission-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .icon {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .title {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.3;
    }

    .description {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.5;
      margin-bottom: 24px;
    }

    .contact-button {
      width: 100%;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 500;
      background-color: #ef4444;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #dc2626;
        transform: translateY(-1px);
      }
    }
  }
}
</style>
