<template>
  <div class="accordion-item">
    <div class="accordion-header" @click="toggleAccordion">
      <div>
        <h3>레몬지수 산출을 위해 내려받을 의료마이데이터 안내</h3>
      </div>
      <span class="toggle-icon" :class="{ open: isOpen }"></span>
    </div>
    <div class="accordion-content" :class="{ 'is-open': isOpen }">
      <FlexColDiv class="gap-6">
        <dl class="flex flex-col">
          <dt>환자번호<span>&nbsp;[필수]</span></dt>
          <dd>MY병원에서 각 환자를 고유하게 식별하기 위한 환자번호 필요</dd>
        </dl>
        <dl class="flex flex-col">
          <dt>진단코드<span>&nbsp;[필수]</span></dt>
          <dd>진료받았던 질병의 고유코드</dd>
        </dl>
        <hr />
        <dl class="flex">
          <dt>데이터 형식</dt>
          <dd>JSON</dd>
        </dl>
        <dl class="flex">
          <dt>데이터 저장소</dt>
          <dd>건강의 신 클라우드 : 개인 데이터 저장소</dd>
        </dl>
      </FlexColDiv>
    </div>
  </div>
</template>

<script setup>
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import { ref } from 'vue'

const props = defineProps({
  initialOpen: {
    type: Boolean,
    default: false
  }
})

// `ref`를 사용하여 반응형 상태를 선언합니다.
const isOpen = ref(props.initialOpen)

// `toggleAccordion` 함수를 정의합니다.
const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
.accordion-item {
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid var(--Semantic-Border-BRD-01, #e2e2e2);
  background: var(--semantic-background-bg-03-white, #fff);
  &:has(.is-open) {
    h3 {
      -webkit-line-clamp: none;
      line-clamp: none;
    }
  }
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
  margin: 0 2.4rem 0 2rem;
  padding: 1.8rem 0;
  cursor: pointer;
  h3 {
    padding-right: 1.2rem;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.8rem;
  }
}
.accordion-content {
  height: 0;
  padding: 0 2rem;
  overflow: hidden;
  font-size: 1.4rem;
  transition: all 0.3s ease-out;
  &.is-open {
    height: inherit;
    padding: 0 2rem 2rem 2rem;
    transition: all 0.3s ease-in;
  }
  dl {
    gap: 0.4rem;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.6rem;
    dt {
      span {
        display: inline-block;
        color: #f14960;
      }
    }
    dd {
      font-weight: 400;
      color: #555;
    }
  }
  hr {
    height: 0.1rem;
    background-color: #e2e2e2;
    margin: 0.2rem 0;
    border: none;
  }
}
.toggle-icon {
  width: 2rem;
  height: 2rem;
  margin-left: auto;
  flex: 0 0 auto;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10L12.0008 14.58L17 10' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
    center / contain no-repeat;
  transition: transform 0.25s ease;
  &.open {
    transform: rotate(180deg);
  }
}
</style>
