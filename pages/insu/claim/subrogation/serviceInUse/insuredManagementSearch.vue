<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구/피보험자 관리 검색"
    logo-type="text"
    :show-search="true"
    :search-with-select="true"
    :search-select-options="searchOptions"
  >
    <div class="wrap-customer-list">
      <div class="item">
        <div class="item-header">
          <div class="customer-info">
            <div class="name">김레몬</div>
            <div class="phone">010****5555</div>
          </div>
          <Button
            btn-type="primary"
            element-type="button"
            aria-label="청구하기"
            class="xs"
            icon="save-line"
            :width="6.8"
            @click="clickClaim"
          />
        </div>
        <div class="wrap-label">
          <label class="label-name" for="KB손해보험">KB손해보험</label>
          <label class="label-name" for="삼성화재">삼성화재</label>
        </div>
        <div class="memo">
          <span class="text"
            >메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모
            영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모
            영역입니다.</span
          >
        </div>
      </div>

      <div class="item">
        <div class="item-header">
          <div class="customer-info">
            <div class="name">
              <img class="icon-nagative" src="/assets/images/insu/subrogation/icon-nagative.png" alt="선택금지" />
              김레몬
            </div>
            <div class="phone">010****5555</div>
          </div>
          <Button
            btn-type="secondary"
            element-type="button"
            aria-label="서명요청"
            class="xs"
            icon="save-line"
            :width="6.8"
            @click="requestSign"
          />
        </div>
        <div class="wrap-label">
          <label class="label-name" for="KB손해보험">KB손해보험</label>
          <label class="label-name" for="삼성화재">삼성화재</label>
        </div>
        <div class="memo">
          <span class="text"
            >메모 영역입니다. 메모가 없으면 숨기고, 많으면 2줄까지 표시됩니다. 메모 영역입니다. 메모 영역입니다. 메모
            영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모 영역입니다. 메모
            영역입니다.</span
          >
        </div>
      </div>
    </div>

    <!-- 검색결과가 없을 때 -->
    <!-- <div class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
      <div class="tit">검색 결과가 없어요.</div>
    </div> -->
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import { inject, onMounted, ref } from 'vue'

// 검색 옵션 정의
const searchOptions = [
  { value: 'all', label: '전체' },
  { value: 'name', label: '고객' },
  { value: 'phone', label: '전화번호' },
  { value: 'insurance', label: '보험사' }
]

// 검색 상태 관리
const searchResults = ref([])
const isLoading = ref(false)

// search 핸들러 등록 함수 inject
const setSearchHandler = inject<(handler: (query?: string, type?: string) => void) => void>('setSearchHandler')

const handleSearchClick = () => {
  console.log('검색어:')
}
</script>

<style scoped lang="scss">
.wrap-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 20rem 0;
  .icon-empty {
    width: 8rem;
    height: 8rem;
  }
  .text-empty {
    font-size: 1.8rem;
    font-weight: 500;
    color: #555555;
  }
  .btn-add-insure {
    padding: 0.8rem 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: #555555;
    border-radius: 0.4rem;
    border: 0.1rem solid #e2e2e2;

    i.icon {
      margin-right: 0.4rem;
      width: 1.8rem;
      height: 1.8rem;
      background-image: url('/assets/images/insu/icon-plus.svg') center center no-repeat;
      background-size: contain;
    }
  }
}

.wrap-customer-list {
  position: relative;
  margin: 0 -2rem;
  padding: 2rem 2rem 4.8rem;
  background-color: #f4f4f4;
  .item {
    padding: 2.4rem 2rem;
    background-color: #fff;
    border-radius: 1.2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .customer-info {
        .name {
          font-weight: 700;
          .icon-nagative {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            margin-right: 0.4rem;
          }
        }
        .phone {
          margin-top: 0.2rem;
          font-size: 1.4rem;
          color: #555555;
        }
      }
    }
    .wrap-label {
      margin-top: 0.4rem;
      display: flex;
      gap: 0.4rem;
      .label-name {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        background-color: #eeeeee;
        font-size: 1.2rem;
        font-weight: 500;
        color: #555555;
      }
    }
    .memo {
      margin-top: 1.2rem;
      padding: 1.2rem;
      border: 0.1rem solid #e2e2e2;
      background-color: #f9f8f7;
      border-radius: 0.8rem;
      .text {
        font-size: 1.4rem;
        font-weight: 500;
        color: #555555;
        @include mixin.multi-ellipsis(2);
      }
    }
  }
}
</style>
