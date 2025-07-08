<template>
  <div class="accordion-item">
    <div class="accordion-header" @click="toggleAccordion">
      <div class="qna-mark">Q</div>
      <div>
        <span class="question-category"> 회원</span>
        <h3>장기미이용 회원은 다시 서비스를 이용할 수 있나요?</h3>
      </div>
      <span class="toggle-icon" :class="{ open: isOpen }"></span>
    </div>
    <div class="accordion-content" :class="{ 'is-open': isOpen }">
      <div class="qna-mark answer">A</div>
      <div class="contents">
        회원탈퇴는 “전체메뉴 > 설정 화면”의 하단에 회원탈퇴 메뉴를 이용해주세요. 회원탈퇴를 하시기 전에 포인트 잔액은
        환전 신청하거나 소진해주시 바라며, 행운복권도 탈퇴 즉시 소멸됩니다. 환전 신청하거나 소진해주시 바라며,
        행운복권도 탈퇴 즉시 소멸됩니다.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: this.initialOpen
    }
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion-item {
  overflow: hidden;
  &:last-child {
    .accordion-header {
      border-bottom: 0;
    }
  }
}
.accordion-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 2rem;
  padding: 2rem 0;
  font-size: 1.4rem;
  border-bottom: 0.1rem solid var(--gray-light);
  cursor: pointer;

  h3 {
    padding-right: 1.2rem;
    line-height: 2rem;
    @include mixin.ellipsis;
  }
  .question-category {
    color: #555;
    line-height: 1.7rem;
  }
}
.accordion-content {
  display: flex;
  height: 0;
  padding: 0 2rem;
  overflow: hidden;
  font-size: 1.4rem;
  transition: all 0.3s ease-out;
  &.is-open {
    height: inherit;
    padding: 2rem;
    background-color: #f4f4f4;
    transition: all 0.3s ease-in;
  }
}
.qna-mark {
  flex-shrink: 0;
  width: 3.2rem;
  height: 3.2rem;
  margin-right: 1.2rem;
  border-radius: 50%;
  border: 0.1rem solid #e2e2e2;
  font-size: 1.6rem;
  color: #555;
  font-weight: 600;
  text-align: center;
  line-height: 3.2rem;
  &.answer {
    background-color: var(--blue-primary);
    color: #fff;
    border: none;
  }
}
.toggle-icon {
  width: 2.4rem;
  height: 2.4rem;
  margin-left: auto;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10L12.0008 14.58L17 10' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
    center / contain no-repeat;
  transition: transform 0.25s ease;
  &.open {
    transform: rotate(180deg);
  }
}
</style>
