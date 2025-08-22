<template>
  <BaseBody page-title="의료영상발급" :show-back-button="true" :has-notification="true">
    <section class="category-selection">
      <TitleSection
        title="검사기간 및 진료과 <br/> 검사종류를 선택해 주세요."
        description="진료기간 및 진료과, 검사종류를 선택한 후 <br/>영상을 발급 받을 수 있어요."
      />

      <div class="wrap-input mt-32">
        <div class="c-input">
          <label for="calendar" class="c-label">발급병원</label>
          <div class="c-input-content">
            <img src="/_nuxt/assets/images/insu/logo_KUMedicine.svg" alt="" />
            <strong>{{ hospitalName }}</strong>
          </div>
        </div>
        <InputCalendarFromTo label="검사기간" v-model="selectedDates" @change="handleDateSelection" />
      </div>
    </section>
    <hr class="hr-section ml-n20 mr-n20 mt-0 mb-0" />
    <section class="pt-32">
      <div>
        <InsuCategorySelector v-if="hasSelectedDate" :model-value="selectedCategory" />
        <InsuEmpty v-else title="검색 결과가 없어요." sub-title="검사기간을 확인하여 다시 선택해주세요." />
      </div>
    </section>
    <ButtonGroup class="is-fixed">
      <Button
        v-if="hasSelectedDate"
        aria-label="의료영상 발급"
        btn-type="primary"
        element-type="button"
        class="w-full lg"
      />
      <Button v-else aria-label="의료영상 조회" btn-type="primary" element-type="button" class="w-full lg" disabled />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import InsuEmpty from '~/components/insu/InsuEmpty.vue'
import InsuCategorySelector from '~/components/insu/CategorySelector.vue'

// 상태 관리
const hospitalName = ref('경북대학교병원')
const selectedDates = ref([])
const hasSelectedDate = ref(false)

// 달력 선택 이벤트 핸들러
const handleDateSelection = (dates: any) => {
  hasSelectedDate.value = dates && dates.length > 0
}
</script>

<style lang="scss" scoped>
.category-selection {
  padding: 2.4rem 0 3.2rem;
}

.wrap-input {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  .c-label {
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.6rem;
    color: #555;
  }
  .c-input-content {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    overflow: hidden;
    padding: 1.2rem 2rem;
    border: 1px solid #e2e2e2;
    border-radius: 1.2rem;
    background: #fff;

    img {
      width: 4.8rem;
      height: 4.8rem;
    }
    strong {
      line-height: 2.2rem;
    }
  }
}
</style>
