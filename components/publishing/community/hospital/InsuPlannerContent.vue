<template>
  <section class="insu-planner-section">
    <p class="planner-box">
      <strong class="planner">{{ planner }}</strong
      >님 <br />고객을 추천해드려요
    </p>
    <div class="multi-select-container">
      <Select
        :modal-title="'게시글 카테고리'"
        :select-placeholder="'커뮤니티를 선택해주세요'"
        :cancel-button-text="'선택'"
        :is-show-cancel-btn="false"
        :custom-opts="area"
      />
      <Select
        :modal-title="'게시글 카테고리'"
        :select-placeholder="'커뮤니티를 선택해주세요'"
        :cancel-button-text="'선택'"
        :is-show-cancel-btn="false"
        :custom-opts="age"
      />
      <Select
        :modal-title="'게시글 카테고리'"
        :select-placeholder="'커뮤니티를 선택해주세요'"
        :cancel-button-text="'선택'"
        :is-show-cancel-btn="false"
        :custom-opts="gender"
      />
    </div>
  </section>
  <section>
    <PlannerItem name="설계사" :is-talking="false" data="서울/30대/여성" :flow="1111" />
  </section>
</template>
<script setup lang="ts">
import TitleBox from '~/components/common/TitleBox.vue'
import Select from '~/components/publishing/input/Select.vue'
import PlannerItem from '~/components/publishing/community/hospital/PlannerItem.vue'
const props = withDefaults(
  defineProps<{
    planner?: string
  }>(),
  {
    planner: '전문 설계사'
  }
)

const area = [
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '대구', label: '대구' },
  { value: '인천', label: '인천' },
  { value: '광주', label: '광주' },
  { value: '대전', label: '대전' },
  { value: '울산', label: '울산' },
  { value: '세종', label: '세종' },
  { value: '경기도', label: '경기도' },
  { value: '강원도', label: '강원도' },
  { value: '충청북도', label: '충청북도' },
  { value: '충청남도', label: '충청남도' },
  { value: '전라북도', label: '전라북도' },
  { value: '전라남도', label: '전라남도' },
  { value: '경상북도', label: '경상북도' },
  { value: '경상남도', label: '경상남도' },
  { value: '제주도', label: '제주도' }
]
const age = [
  { value: '10대', label: '10대' },
  { value: '20대', label: '20대' },
  { value: '30대', label: '30대' },
  { value: '40대', label: '40대' },
  { value: '50대', label: '50대' },
  { value: '60대', label: '60대' },
  { value: '70대 이상', label: '70대 이상' }
]
const gender = [
  { value: '여성', label: '여성' },
  { value: '님상', label: '님상' }
]
</script>
<style scoped lang="scss">
.planner-box {
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.6rem;
  .planner {
    color: #4c7ff7;
  }
  .multi-select-container {
    display: flex;
  }
}

::v-deep(.c-modal-body) {
  max-height: 40rem;
  overflow-y: auto;
}
::v-deep(.c-input) {
  background: #000;
  .c-inp-el {
    background: #000;
  }
}
</style>
