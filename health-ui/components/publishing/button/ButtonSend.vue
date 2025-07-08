<template>
  <component :is="'button'" class="btn-send" @click="btnevtClick"> 메시지 전송 버튼 </component>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.btn-send {
  font-size: 0;
  width: 4rem;
  height: 4rem;
  align-self: center;
  flex: 0 0 auto;
  border-radius: 50%;
  background-color: #d2d2d2;
  background-size: 2.4rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M18.3847 4.06941L2.81665 9.47056C1.75014 9.84058 1.7209 11.3382 2.77216 11.7496L9.08971 14.2217C9.40524 14.3451 9.65486 14.5948 9.77833 14.9103L12.2504 21.2278C12.6618 22.2791 14.1594 22.2499 14.5294 21.1833L19.9306 5.61532C20.2632 4.6566 19.3434 3.73679 18.3847 4.06941Z' fill='white'/%3E%3Cpath d='M9.2002 15.0691L14.1502 10.1191' stroke='%23D2D2D2' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.3s all cubic-bezier(0.075, 0.82, 0.165, 1);
  &:active {
    @include mixin.rippleEffectWhite;
    transform: scale(0.95);
    background-color: vars.$blue-primary;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M18.3847 4.06941L2.81665 9.47056C1.75014 9.84058 1.7209 11.3382 2.77216 11.7496L9.08971 14.2217C9.40524 14.3451 9.65486 14.5948 9.77833 14.9103L12.2504 21.2278C12.6618 22.2791 14.1594 22.2499 14.5294 21.1833L19.9306 5.61532C20.2632 4.6566 19.3434 3.73679 18.3847 4.06941Z' fill='white'/%3E%3Cpath d='M9.2002 15.0691L14.1502 10.1191' stroke='%234C7FF7' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  }
}
</style>
