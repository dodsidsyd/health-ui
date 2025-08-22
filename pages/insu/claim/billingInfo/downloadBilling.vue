<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구 첨부서류 다운로드"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <h1 class="c-tit mt-24">
      <span class="text">
        다운로드 하실<br />첨부서류를 선택해 주세요
      </span>
    </h1>
    <div class="wrap-select-doc">
      <div class="wrap-check">
        <Checkbox 
          id="checkBox1" 
          aria-label="전체선택"
          v-model="selectAll"
        />
      </div>
      <div class="wrap-list">
        <div class="item">
          <label for="checkBox2">
            <Checkbox 
              id="checkBox2" 
              aria-label=""
              v-model="checkBox2"
            />
            <img src="/assets/images/insu/img-attached-file.png" alt="서류1" />
          </label>
        </div>
        <div class="item">
          <label for="checkBox3">
            <Checkbox 
              id="checkBox3" 
              aria-label=""
              v-model="checkBox3"
            />
            <img src="/assets/images/insu/img-attached-file.png" alt="서류1" />
          </label>
        </div>
        <div class="item">
          <label for="checkBox4">
            <Checkbox 
              id="checkBox4" 
              aria-label=""
              v-model="checkBox4"
            />
            <img src="/assets/images/insu/img-attached-file.png" alt="서류1" />
          </label>
        </div>
        <div class="item">
          <label for="checkBox5">
            <Checkbox 
              id="checkBox5" 
              aria-label=""
              v-model="checkBox5"
            />
            <img src="/assets/images/insu/img-attached-file.png" alt="서류1" />
          </label>
        </div>
        <div class="item">
          <label for="checkBox6">
            <Checkbox 
              id="checkBox6" 
              aria-label=""
              v-model="checkBox6"
            />
            <img src="/assets/images/insu/img-attached-file.png" alt="서류1" />
          </label>
        </div>
        <div class="item">
          <label for="checkBox7">
            <Checkbox 
              id="checkBox7" 
              aria-label=""
              v-model="checkBox7"
            />
            <img src="/assets/images/insu/img-attached-file.png" alt="서류1" />
          </label>
        </div>
      </div>
    </div>
  </BaseBody>
      <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" :aria-label="`${selectedCount}개 다운로드`" class="lg w-full medium btn-sticky" @click="clickNext" />
    </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Checkbox from '~/components/publishing/input/check.vue'


const selectAll = ref(false)
const checkBox2 = ref(false)
const checkBox3 = ref(false)
const checkBox4 = ref(false)
const checkBox5 = ref(false)
const checkBox6 = ref(false)
const checkBox7 = ref(false)

// 전체 선택 상태 변경 감지하여 개별 체크박스들 동기화
watch(selectAll, (newValue: boolean) => {
  // 무한 루프 방지: 현재 개별 체크박스들의 상태와 다를 때만 업데이트
  const currentAllChecked = checkBox2.value && checkBox3.value && checkBox4.value && 
                           checkBox5.value && checkBox6.value && checkBox7.value
  
  if (newValue !== currentAllChecked) {
    checkBox2.value = newValue
    checkBox3.value = newValue
    checkBox4.value = newValue
    checkBox5.value = newValue
    checkBox6.value = newValue
    checkBox7.value = newValue
  }
})

// 개별 체크박스 변경 감지하여 전체 선택 상태 업데이트
watch([checkBox2, checkBox3, checkBox4, checkBox5, checkBox6, checkBox7], (newValues: boolean[]) => {
  const allChecked = newValues.every((value: boolean) => value === true)
  selectAll.value = allChecked
}, { deep: true })

// 선택된 체크박스 개수 계산
const selectedCount = computed(() => {
  return [checkBox2, checkBox3, checkBox4, checkBox5, checkBox6, checkBox7]
    .filter(checkbox => checkbox.value).length
})

// 다음 버튼 클릭 처리
const clickNext = () => {
  // 다음 단계로 진행하는 로직
  console.log('다음 단계로 진행')
}
definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})

</script>

<style scoped lang="scss">
.wrap-select-doc {
  margin-top: 1.6rem;
  .wrap-check {
    margin: 0 -2rem;
    padding: 2rem;
  }
  .wrap-list {
    margin: 0 -2rem;
    padding: 2rem;
    background-color: #F4F4F4;
    display: flex;
    align-items: center;
    gap: 1.1rem;
    flex-wrap: wrap;
    .item {
      position: relative;
      width: 11rem;
      height: 11rem;
      border-radius: 0.8rem;
      border: 0.1rem solid #E2E2E2;
      overflow: hidden;
      &:has(.c-checktype .c-check:checked) {
        border: 0.2rem solid #4C7FF7;
        position: relative;
        &::before {
          display: block;
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--Semantic-Background-BG-Dimmed, #000000B2);
          box-shadow: 0px 4px 10px 0px #0000000A;
          pointer-events: none;
          z-index: 1;
        }
      }
      .c-checktype {
        position: absolute;
        top: 0.8rem;
        right: 0.8rem;
        z-index: 2;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
