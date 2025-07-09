<template>
  <BaseBody :show-back-button="false" :has-close-btn="true" page-title="동의 영수증" logo-type="text">
    <div class="receipt-info">
      <dl v-for="(item, index) in items" :key="index">
        <dt>{{ item.term }}</dt>
        <dd v-html="item.description.replace(/\n/g, '<br>')"></dd>
      </dl>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

const items = ref([
  { term: '식별번호', description: ' 8858817 ' },
  { term: '구분', description: '구분진료기록 및 건강기록 열람지원 \n 개인정보 수집 및 이용동의(필수)' },
  { term: '일시', description: '2025. 02. 20 15:24' },
  { term: '동의자', description: '김규식' },
  { term: '서비스', description: '건강부채서비스' },
  { term: '개인데이터 항목', description: '환자정보' },
  { term: '개인데이터 활용목적', description: '의료기관 진료세부기록 확인' },
  {
    term: '보유 및 이용기간',
    description: '수집 및 이용목적 달성시까지 \n (단, 다른 법령의 정함이 있을때에는 그에 따름)'
  },
  { term: '발행기관', description: '건강의신' }
])
</script>

<style scoped lang="scss">
.receipt-info {
  text-align: left;
  dl {
    display: flex;
    gap: 1.2rem;
    padding: 1.6rem 0;
    & + dl {
      border-top: 1px solid #eee;
    }
  }
  dt {
    color: #555;
  }
  dd {
    flex: 1;
    font-weight: vars.$medium;
    text-align: right;
  }
}
</style>
