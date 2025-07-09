<template>
  <div class="receipt-item">
    <div class="flex space-between align-center">
      <div class="receipt">
        <div>
          <p>{{ props.title }}</p>
          <em v-if="showType" class="badge">건강부채</em>
        </div>
        <span>{{ props.dateText }}</span>
      </div>
      <button style="" @click="clickFullModal"><i class="receipt-img"></i></button>
    </div>
    <FullModal :is-visible="isShowFullModal" v-bind="fullModalProps" @close="toggleFullModal">
      <template #content>
        <div class="receipt-info">
          <dl v-for="(item, index) in items" :key="index">
            <dt>{{ item.term }}</dt>
            <dd v-html="item.description.replace(/\n/g, '<br>')"></dd>
          </dl>
        </div>
      </template>
    </FullModal>
  </div>
</template>
<script setup lang="ts">
import FullModal from '~/components/common/modal/FullModal.vue'

const isShowFullModal = ref(false)

const showType = computed(() => props.title === '동의 영수증')

const props = withDefaults(
  defineProps<{
    title?: string
    dateText?: string
  }>(),
  {
    dateText: '',
    title: ''
  }
)

// defineProps<{
//   type: string // 'type1', 'type2' 등
//   receiptDate: string
// }>()

const fullModalProps = ref({
  title: props.title,
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const toggleFullModal = () => {
  isShowFullModal.value = !isShowFullModal.value
}

const clickFullModal = () => {
  toggleFullModal()
}

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

<style lang="scss" scoped>
.receipt-item {
  padding: 2rem 0;
  & + .receipt-item {
    border-top: 1px solid #eee;
  }
  .receipt {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    & > div {
      display: flex;
      justify-content: center;
      align-content: center;
    }
    p {
      font-weight: vars.$medium;
      line-height: 2.3rem;
    }

    span {
      color: #959595;
    }
    .badge {
      display: inline-block;
      margin-left: 0.6rem;
      text-align: center;
      padding: 0 0.8rem;
      background: #faeaa9;
      border-radius: 0.8rem;
      font-weight: vars.$medium;
      line-height: 2.3rem;
      color: #5d4a00;
    }
  }
}
.receipt-img {
  display: block;
  width: 4rem;
  height: 4rem;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='41' viewBox='0 0 40 41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect y='0.5' width='40' height='40' rx='20' fill='%23F4F4F4'/%3E%3Cpath d='M16.5 17H23.5M16.5 21H23.5M14.8 13H25.2C25.918 13 26.5 13.6716 26.5 14.5V28L24.3333 26.5L22.1667 28L20 26.5L17.8333 28L15.6667 26.5L13.5 28V14.5C13.5 13.6716 14.082 13 14.8 13Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
}
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
