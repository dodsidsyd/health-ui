<template>
  <div class="status-card">
    <div class="flex flex-row">
      <div class="flex flex-col gap-8">
        <p class="tit">{{ title }}</p>
        <strong class="data-text">{{ mainData }}</strong>
      </div>
      <i :class="['icon', cardType]" aria-label="hidden"></i>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// Props 타입 정의
interface Props {
  title: string
  mainData: string // kebab-case main-data를 camelCase로 받음
  cardType: string // kebab-case card-type을 camelCase로 받음
}

// Props 기본값 설정
const props = withDefaults(defineProps<Props>(), {
  title: '',
  mainData: '',
  cardType: ''
})
</script>

<style lang="scss" scoped>
.status-card {
  overflow: hidden;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  padding-bottom: 3.2rem;
  height: 18.8rem;
  justify-content: space-between;
  position: relative; // 자식 요소 위치 기준점

  .flex-row {
    justify-content: space-between;
    flex-shrink: 0; // 위쪽 영역을 고정
  }

  .tit {
    font-weight: 500;
    color: #555;
  }

  .data-text {
    font-size: 2rem;
    line-height: 2.6rem;
    color: #2b2b2b;
  }

  .icon {
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    background-repeat: no-repeat;
    flex-shrink: 0; // 아이콘 크기 고정

    &.heart-beep {
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5824 3.96724C19.3462 2.69861 17.7027 2 15.9544 2C14.5181 2 13.133 2.48082 12 3.36359C10.8669 2.48078 9.48183 2 8.0455 2C6.29729 2 4.65367 2.69865 3.41741 3.96724C0.960535 6.48875 0.850982 10.5427 3.16824 13.1968C3.25421 13.2951 3.33571 13.3836 3.41754 13.4677C6.43449 16.5619 11.508 21.764 11.5899 21.8392C11.7067 21.9464 11.8534 22 12 22C12.1467 22 12.2934 21.9464 12.4101 21.8392C12.4921 21.7641 17.5654 16.5619 20.5821 13.468C20.664 13.3841 20.7457 13.2953 20.8319 13.1965C23.149 10.5427 23.0394 6.48875 20.5824 3.96724Z' fill='%23FE3C28'/%3E%3Cpath d='M13.4883 15C13.2952 15 13.1132 14.8952 12.996 14.7166L9.18444 8.90951L7.52484 11.4381C7.40762 11.6167 7.22558 11.7215 7.03256 11.7215L2.61955 11.7214C2.27737 11.7214 2 11.3983 2 10.9999C2 10.6015 2.27745 10.2785 2.61955 10.2785L6.72628 10.2786L8.69207 7.2834C8.8093 7.10481 8.99129 7 9.18435 7C9.37738 7 9.55941 7.10476 9.67664 7.2834L13.4882 13.0905L15.1479 10.562C15.2651 10.3834 15.4472 10.2786 15.6402 10.2786H21.3805C21.7226 10.2786 22 10.6017 22 11.0001C22 11.3985 21.7226 11.7215 21.3805 11.7215H15.9465L13.9806 14.7167C13.8633 14.8952 13.6813 15 13.4883 15Z' fill='%23B31105'/%3E%3C/svg%3E%0A");
    }
  }

  // 차트 영역 제한
  > :last-child {
    flex: 1;
    min-height: 0; // flex 자식이 축소될 수 있도록
    overflow: hidden;
    margin-top: 1rem;
    margin-bottom: -3.2rem;
  }
}
</style>
