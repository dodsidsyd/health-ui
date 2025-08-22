<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    :has-tel-btn="true"
    class="pb-36"
  >
    <h1 class="c-tit mt-24">
      <span class="text"> 자동청구를 희망하는<br />병원을 선택해 주세요. </span>
    </h1>
    <div class="wrap-info-text">
      <i class="info" alt="info"></i>
      <div class="text">신청 완료 후 설정/관리는 청구의신 앱에서 가능해요</div>
    </div>
    <div class="wrap-select-doc">
      <div class="wrap-check">
        <Checkbox id="checkBox1" v-model="selectAll" aria-label="전체선택" @change="handleSelectAll" />
      </div>
      <div class="wrap-list">
        <div class="item">
          <label for="checkBox2">
            <Checkbox id="checkBox2" v-model="hospitalChecks[0]" aria-label="" @change="handleIndividualCheck" />
            <div class="wrap-hospital">
              <img class="logo" src="/assets/images/insu/logo_KUMedicine.svg" alt="병원" />
              <div class="text">고려대학교 안암병원</div>
            </div>
          </label>
        </div>
        <div class="item">
          <label for="checkBox3">
            <Checkbox id="checkBox3" v-model="hospitalChecks[1]" aria-label="" @change="handleIndividualCheck" />
            <div class="wrap-hospital">
              <img class="logo" src="/assets/images/insu/logo_KUMedicine.svg" alt="병원" />
              <div class="text">고려대학교 안암병원</div>
            </div>
          </label>
        </div>
        <div class="item">
          <label for="checkBox4">
            <Checkbox id="checkBox4" v-model="hospitalChecks[2]" aria-label="" @change="handleIndividualCheck" />
            <div class="wrap-hospital">
              <img class="logo" src="/assets/images/insu/logo_KUMedicine.svg" alt="병원" />
              <div class="text">고려대학교 안암병원</div>
            </div>
          </label>
        </div>
        <div class="item">
          <label for="checkBox5">
            <Checkbox id="checkBox5" v-model="hospitalChecks[3]" aria-label="" @change="handleIndividualCheck" />
            <div class="wrap-hospital">
              <img class="logo" src="/assets/images/insu/logo_KUMedicine.svg" alt="병원" />
              <div class="text">고려대학교 안암병원</div>
            </div>
          </label>
        </div>
        <!-- <div class="item">
          <label for="checkBox6">
            <Checkbox id="checkBox6" v-model="hospitalChecks[4]" aria-label="" @change="handleIndividualCheck" />
            <div class="wrap-hospital">
              <img class="logo" src="/assets/images/insu/logo_KUMedicine.svg" alt="병원" />
              <div class="text">고려대학교 안암병원</div>
            </div>
          </label>
        </div>
        <div class="item">
          <label for="checkBox7">
            <Checkbox id="checkBox7" v-model="hospitalChecks[5]" aria-label="" @change="handleIndividualCheck" />
            <div class="wrap-hospital">
              <img class="logo" src="/assets/images/insu/logo_KUMedicine.svg" alt="병원" />
              <div class="text">고려대학교 안암병원</div>
            </div>
          </label>
        </div> -->
      </div>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="다음"
      class="lg w-full medium btn-sticky"
      @click="clickNext"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Checkbox from '~/components/publishing/input/check.vue'

// 전체선택 상태
const selectAll = ref<boolean>(false)

// 개별 병원 체크박스 상태 배열 (6개 병원)
const hospitalChecks = ref<boolean[]>([false, false, false, false, false, false])

// 전체선택/해제 처리
const handleSelectAll = (): void => {
  if (selectAll.value) {
    // 전체선택이 체크된 경우: 모든 병원을 체크
    hospitalChecks.value = hospitalChecks.value.map(() => true)
  } else {
    // 전체선택이 해제된 경우: 모든 병원을 해제
    hospitalChecks.value = hospitalChecks.value.map(() => false)
  }
}

// 개별 체크박스 변경 시 전체선택 상태 업데이트
const handleIndividualCheck = (): void => {
  // 모든 병원이 체크되었는지 확인
  const allChecked = hospitalChecks.value.every((check: boolean) => check === true)
  // 모든 병원이 체크되지 않았는지 확인
  const allUnchecked = hospitalChecks.value.every((check: boolean) => check === false)

  if (allChecked) {
    // 모든 병원이 체크된 경우: 전체선택도 체크
    selectAll.value = true
  } else if (allUnchecked) {
    // 모든 병원이 해제된 경우: 전체선택도 해제
    selectAll.value = false
  } else {
    // 일부만 체크된 경우: 전체선택 해제 (indeterminate 상태)
    selectAll.value = false
  }
}

// 다음 버튼 클릭 처리
const clickNext = (): void => {
  // 선택된 병원들 처리 로직
  const selectedHospitals = hospitalChecks.value
    .map((checked: boolean, index: number) => (checked ? index + 1 : null))
    .filter((index: number | null) => index !== null)

  console.log('선택된 병원:', selectedHospitals)
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
.wrap-info-text {
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  .info {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
  .text {
    font-size: 1.4rem;
    font-weight: 500;
    color: #959595;
  }
}
.wrap-select-doc {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 1.6rem;
  .wrap-check {
    margin: 0 -2rem;
    padding: 2rem;
    @include mixin.flex-container(items-center);
    justify-content: flex-end;
  }
  .wrap-list {
    height: 100%;
    margin: 0 -2rem;
    padding: 2rem;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.1rem;
    flex-grow: 1;
    flex-wrap: wrap;
    .item {
      padding: 1.2rem 2rem;
      position: relative;
      width: 100%;
      border-radius: 0.8rem;
      border: 0.1rem solid #e2e2e2;
      overflow: hidden;
      border: 0.2rem solid #fff;
      background-color: #fff;
      &:has(.c-checktype .c-check:checked) {
        border: 0.2rem solid #4c7ff7;
      }
      .c-checktype {
        position: absolute;
        top: 50%;
        right: 1.2rem;
        transform: translateY(-50%);
      }
      .wrap-hospital {
        @include mixin.flex-container(items-center);
        gap: 1.2rem;
        .logo {
          width: 4.8rem;
          height: 4.8rem;
        }
        .text {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
