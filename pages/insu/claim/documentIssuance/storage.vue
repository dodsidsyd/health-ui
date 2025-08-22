<template>
  <BaseBody :show-back-button="true" page-title="서류 보관함" logo-type="text" :has-cart="true" :cart-count="2">
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" />
    <div class="wrap-medical-info">
      <div class="medical-info-head">
        <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
        <div class="wrap-hospital">
          <div class="text">충북대학교병원 <strong>2</strong>건</div>
        </div>
      </div>
      <i class="icon-arrow-down" :class="{ rotated: expandedItems[0] }" @click.stop.prevent="toggleDetail(0)"></i>
    </div>
    <div class="wrap-grey">
      <div :class="{ expanded: expandedItems[0] }" class="wrap-check-icon">
        <label for="check1" class="c-checktype-btn">
          <div class="c-checktype-label">
            <div class="text">진료비영수증</div>
            <button class="btn-text" @click="clickNext">
              <div class="text">발급상세</div>
              <i class="icon-arrow-right-grey"></i>
            </button>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">발급일자</div>
              <div class="desc">2024.02.20</div>
            </div>
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="desc">신경내과</div>
            </div>
            <div class="list-item">
              <div class="tit">진료의</div>
              <div class="desc">이현정</div>
            </div>
            <div class="list-item">
              <div class="tit">
                <label class="h-label">유효기간 D-45</label>
                <div class="text">남은수량 1매</div>
              </div>
              <div class="desc">
                <div
                  class="ico icon-minus"
                  :class="{ active: count[0] > 1 }"
                  @click.stop.prevent="count[0] > 1 ? count[0]-- : (count[0] = 1)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                    <path d="M13.2 10L6.8 10" stroke="#D2D2D2" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </div>
                <div class="text">{{ count[0] }}매</div>
                <div class="ico icon-plus active" @click.stop.prevent="count[0]++">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                    <path
                      d="M10 6.80078L10 13.2008M13.2 10.0008L6.8 10.0008"
                      stroke="#D2D2D2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="wrap-btn-group">
            <Button btn-type="line" element-type="button" aria-label="미리보기" />
            <Button btn-type="primary" element-type="button" aria-label="내보내기" @click="clickExportMethod" />
          </div>
        </label>
        <label for="check2" class="c-checktype-btn">
          <div class="c-checktype-label">
            <div class="text">외래진료확인서</div>
            <button class="btn-text" @click="clickNext">
              <div class="text">발급상세</div>
              <i class="icon-arrow-right-grey"></i>
            </button>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">발급일자</div>
              <div class="desc">2024.02.20</div>
            </div>
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="desc">신경내과</div>
            </div>
            <div class="list-item">
              <div class="tit">진료의</div>
              <div class="desc">이현정</div>
            </div>
            <div class="list-item">
              <div class="tit expired">
                <label class="h-label">유효기간 만료</label>
                <div class="text">남은수량 0매</div>
              </div>
              <div class="desc">
                <div
                  class="ico icon-minus"
                  :class="{ active: count[1] > 1 }"
                  @click.stop.prevent="count[1] > 1 ? count[1]-- : (count[1] = 1)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                    <path d="M13.2 10L6.8 10" stroke="#D2D2D2" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </div>
                <div class="text">{{ count[1] }}매</div>
                <div class="ico icon-plus active" @click.stop.prevent="count[1]++">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                    <path
                      d="M10 6.80078L10 13.2008M13.2 10.0008L6.8 10.0008"
                      stroke="#D2D2D2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="wrap-btn-group">
            <Button btn-type="line" element-type="button" aria-label="미리보기" />
            <Button btn-type="primary" element-type="button" aria-label="재발급" />
          </div>
        </label>
      </div>
    </div>
  </BaseBody>
  <BottomModal
    :is-visible="isShowExportMethodModal"
    title="내보낼 방법을 선택해 주세요."
    :is-show-cancel-button="false"
    confirm-button-text="내보내기"
    @close="isShowExportMethodModal = false"
    @confirm="clickConfirmModal"
  >
    <template #content>
      <div class="flex gap-8">
        <Radio
          id="rdo1"
          v-model="selectedMethod"
          name="rdo1"
          custom-style="button small"
          value="이메일"
          aria-label="이메일"
          class="w-full"
        />
        <Radio
          id="rdo2"
          v-model="selectedMethod"
          name="rdo1"
          custom-style="button small"
          value="SNS 공유"
          aria-label="SNS 공유"
          class="w-full"
        />
        <Radio
          id="rdo3"
          v-model="selectedMethod"
          name="rdo1"
          custom-style="button small"
          value="다운로드"
          aria-label="다운로드"
          class="w-full"
        />
      </div>

      <div v-if="selectedMethod === '이메일'" class="mt-16 text-left">
        <InputMail
          label="이메일 주소 입력"
          :is-valid="false"
          valid-text="올바른 이메일 주소를 입력해주세요."
          placeholder="이메일을 입력해주세요"
          :custom-domains="[
            { value: 'gmail.com', label: 'gmail.com' },
            { value: 'naver.com', label: 'naver.com' },
            { value: 'daum.net', label: 'daum.net' },
            { value: 'kakao.com', label: 'kakao.com' }
          ]"
        />
      </div>
      <div class="mt-16 text-left">
        <InputText
          label="비밀번호"
          type="password"
          :is-valid="false"
          valid-text="비밀번호 벨리데이터 메시지"
          placeholder="비밀번호를 입력해 주세요."
        />
      </div>
    </template>
  </BottomModal>

  <ConfirmModal
    :is-visible="isShowConfirmModal"
    :html="confirmModalContent"
    :is-show-cancel-button="false"
    :is-show-confirm-button="true"
    @confirm="isShowConfirmModal = false"
    @close="isShowConfirmModal = false"
  />
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import { ref } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import InputMail from '~/components/publishing/input/InputMail.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Radio from '~/components/publishing/input/radio.vue'
const count = ref([1, 1])
// 확장된 상세 항목 상태
const expandedItems = ref([true])
const toggleDetail = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}
// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '보관함', code: 'document' },
  { name: '내보내기 영역', code: 'export' }
]
const lineActiveIndex = ref(0)
// 이벤트 핸들러들
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
  console.log('Line 탭 클릭:', lineTabs[index])
}

const selectedMethod = ref('이메일')
const isShowExportMethodModal = ref(false)
const clickExportMethod = () => {
  isShowExportMethodModal.value = !isShowExportMethodModal.value
}

const clickNext = () => {
  return navigateTo('/insu/claim/documentIssuance/documentDetail')
}

const isShowConfirmModal = ref(false)
const confirmModalContent = ref('')

const clickConfirmModal = async () => {
  confirmModalContent.value = `      
      <div style="font-weight: bold;font-size: var(--num-16);text-align: left;">진료비납입확인서 내보내기 요청을 완료했어요.</div>
      <div style="font-weight: 400;font-size: var(--num-16);text-align: left;color: #555555;margin-top:0.8rem;">제증명 서류묶음 생성에 다소 시간이 소요될 수 있어요</div>     
  `
  isShowConfirmModal.value = true
}
</script>

<style scoped lang="scss">
.wrap-check {
  display: flex;
  justify-content: flex-end;
}
.wrap-check-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  background-color: #f4f4f4;
  padding: 2rem;
  margin-right: -2rem;
  margin-left: -2rem;
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.3s ease-out,
    padding 0.3s ease;
  visibility: hidden;
  &.expanded {
    padding: 2rem;
    max-height: 100rem;
    visibility: visible;
  }
  .c-checktype-btn {
    width: 100%;
    padding: 2rem;
    border: 0.2rem solid #fff;
    background-color: #fff;
    border-radius: 1.2rem;
    &:has(.c-checktype-check:checked) {
      border: 0.2rem solid #4c7ff7;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
      .icon {
        border-color: #4c7ff7;
        background-color: #4c7ff7;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
    }
    .c-checktype-check {
      display: none;
    }
    .c-checktype-label {
      @include mixin.flex-container(justify-between items-center);
      width: 100%;
      .text {
        font-size: 1.4rem;
        font-weight: 700;
      }
      .icon {
        width: 2.4rem;
        height: 2.4rem;
        flex-shrink: 0;
        border-radius: 50%;
        border: 1.5px solid #eee;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23E2E2E2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-size: 1.9rem;
        background-repeat: no-repeat;
        background-position: center;
        transition:
          background-color 0.2s ease-in,
          border-color 0.2s ease-in;
      }
      .btn-text {
        @include mixin.flex-container(items-center);

        .text {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .icon-arrow-right-grey {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          background: url('/assets/images/insu/icon-arrow-right-gray.svg') center center no-repeat;
          background-size: contain;
          transition: transform 0.3s ease-in-out;
        }
      }
    }
    .wrap-desc-lists {
      margin-top: 2rem;
      .list-item {
        @include mixin.flex-container(justify-between items-start);
        flex-wrap: wrap;
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
          @include mixin.flex-container(items-center);
          gap: 0.8rem;
          .h-label {
            padding: 0.3rem 0.6rem;
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 130%;
            color: #4c7ff7;
            border-radius: 0.4rem;
            background-color: #e5edff;
          }
          .text {
            display: inline-block;
            font-size: 1.3rem;
            font-weight: 500;
            color: #4c7ff7;
          }
          &.expired {
            .h-label {
              color: #ca2828;
              background-color: #ffe7e7;
            }
            .text {
              color: #f14960;
            }
          }
        }
        .desc {
          text-align: right;
          font-size: 1.4rem;
          font-weight: 600;
          @include mixin.flex-container(items-center);
          gap: 0.8rem;
          .text {
            font-size: 1.4rem;
            font-weight: 600;
            &.disabled {
              color: #959595;
            }
          }
          .ico {
            &.active {
              rect {
                stroke: #4f5561;
              }
              path {
                stroke: #2b2b2b;
              }
            }
          }

          .icon-arrow-up {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
            background-size: 100%;
            transition: transform 0.3s ease;
            transform-origin: center center;

            &.rotated {
              transform: rotate(180deg);
            }
            .text {
              font-size: 1.4rem;
              font-weight: 600;
            }
          }
        }
        .item-sub {
          @include mixin.flex-container(justify-between items-center);
          width: 100%;
          .tit {
            font-size: 1.4rem;
            font-weight: 600;
            color: #2b2b2b;
            .tit-sub {
              display: inline-block;
              margin-left: 0.6rem;
            }
          }
          .icon-arrow-up {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
            background-size: 100%;
            transition: transform 0.3s ease;
            transform-origin: center center;

            &.rotated {
              transform: rotate(180deg);
            }
          }
        }
      }
    }
  }
}
.wrap-medical-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  .medical-info-head {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    .logo {
      width: 4.8rem;
      height: 4.8rem;
    }
    .wrap-hospital {
      .text {
        font-weight: 700;
        strong {
          color: #4c7ff7;
        }
      }
    }
  }
  i.icon-arrow-down {
    width: 2.4rem;
    height: 2.4rem;
    background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
    background-size: contain;
    transition: transform 0.3s ease-in-out;
    &.rotated {
      transform: rotate(180deg);
    }
  }
}
.wrap-bottom-sort {
  .tit-sort {
    margin: 1.2rem 0 0.8rem;
    font-size: 1.2rem;
    line-height: 130%;
    color: #555555;
    text-align: left;
  }
}
.wrap-pay-info {
  padding: 0.8rem 0;
  .pay-text {
    font-size: 1.8rem;
    font-weight: 500;
  }
  .pay-amount {
    margin-top: 0.4rem;
    font-size: 2.6rem;
    font-weight: 700;
    color: #4c7ff7;
  }
}
.wrap-btn-pay {
  margin: 1.6rem 0 2.4rem;
  @include mixin.flex-container(justify-between items-center);
  gap: 0.8rem;
}
.wrap-btn-group {
  margin-top: 2rem;
  @include mixin.flex-container(justify-between items-center);
  gap: 1.2rem;
}
.wrap-grey {
  flex: 1;
  margin: 0 -2rem;
  padding: 0 2rem;
  background-color: #f4f4f4;
}
</style>
