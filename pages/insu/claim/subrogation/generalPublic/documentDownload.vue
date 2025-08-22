<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구 첨부서류 다운로드"
    logo-type="text"
    :has-close-btn="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <h1 class="c-tit mt-40">
      <span class="text">
        다운로드 하실<br />첨부서류를 선택해 주세요
      </span>
    </h1>
    <div class="wrap-select-doc">
      <div class="wrap-check">
        <Checkbox 
          id="checkBox1" 
          aria-label="전체 선택"
          checked
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
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="1개 다운로드"
      class="lg w-full medium btn-sticky"
    >
      1개 다운로드
    </Button>
  </ButtonGroup>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
const checkBox2 = ref(true)
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
        
      }
      .c-checktype {
        position: absolute;
        top: 0.8rem;
        right: 0.8rem;
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