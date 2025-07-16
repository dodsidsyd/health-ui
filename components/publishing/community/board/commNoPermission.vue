<template>
  <div class="comm-no-permission">
    <!-- Dim 배경 -->
    <div class="dim-overlay"></div>

    <!-- 권한 없음 메시지 -->
    <div class="permission-modal">
      <div class="icon"><img src="~/assets/images/community/ico-permission.svg" alt="" /></div>
      <div class="title"><strong>커뮤니티 글이</strong> 궁금하다면<br />지금 바로 가입해보세요.</div>
      <p>가입하면 유용한 정보의 글을 볼 수 있어요.</p>
      <Button btn-type="primary" element-type="button" aria-label="커뮤니티 가입하기" class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
const contactAdmin = () => {
  console.log('관리자 문의하기')
  // 실제 구현: 문의 페이지로 이동 또는 모달 열기
}
</script>

<style scoped lang="scss">
.comm-no-permission {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  .dim-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 25%, #fff 75%);
  }

  .permission-modal {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 100%;
    padding: 0 2rem;
    .icon {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .title {
      margin: 2rem 0 1.6rem;
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.3;
      strong {
        color: var(--blue-primary);
      }
    }
    p {
      margin-bottom: 4rem;
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2rem;
      color: #959595;
    }
  }
}
</style>
