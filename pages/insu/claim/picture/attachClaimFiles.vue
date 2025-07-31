<template>
  <BaseBody
    :show-back-button="true"
    page-title="사진찍어 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <!-- ToDo: 로딩중 -->
    <div class="mt-24">
      <h1 class="c-tit">
        <span class="text">
          청구 서류를 첨부해 주세요
        </span>
      </h1>
    </div>
    <FlexSection>
      <div class="wrap-attach-desc">
        <div class="attach-item">
          <img class="img-attach" src="/assets/images/insu/icon-attach01.svg" alt="서류 글씨가 잘 보이도록 촬영" />
          <span class="text">서류 글씨가<br />잘 보이도록 촬영</span>
        </div>
        <div class="attach-item">
          <img class="img-attach" src="/assets/images/insu/icon-attach02.svg" alt="최대 15장까지 서류첨부가 가능" />
          <span class="text">최대 15장까지<br />서류첨부가 가능</span>
        </div>
      </div>
      <!-- 서류첨부 버튼 -->
      <label class="btn-attach" for="file-upload">
        <input id="file-upload" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
        <img src="/assets/images/insu/icon-attach.svg" alt="첨부파일" />
        <span class="text">첨부서류</span>
      </label>
      <div class="wrap-attached-file">
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
        <button class="btn-delete-attached">
          <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
        </button>
      </div>
      <div class="wrap-attached-info">
        <img src="/assets/images/insu/icon-info.svg" alt="info" />
        <div class="text">가족청구는 <strong>피보험자와 수익자가 만 19세 미만 미성년자인 경우, 가족관계 증명서</strong>를 함께 첨부해 주세요.</div>
      </div>
      <div class="wrap-payment-instructions-info">
      <h2 class="tit2">필요한 청구 서류 안내</h2>
      <div class="wrap-spread">
        <div class="item">
          <div class="item-head" @click="toggleItem(0)">
            <div class="wrap-desc">
              <div class="text">청구 제한 금액 안내</div>
            </div>
            <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[0] }"></i>
          </div>
          <div class="item-body" :class="{ 'expanded': expandedItems[0] }">
            <div class="spread-tit2">청구 금액 100만원 이하인 경우에만 FAX 청구가 가능해요.</div>
            <div class="spread-tit2-sub">100만원 이상일 경우 보험사 앱 또는 우편 접수</div>
            <ul class="spread-list2">
              <li>300만원 이하 : 흥국생명, 하나생명, KB생명보험</li>
              <li>150만원 이하 : AIA생명</li>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="item-head" @click="toggleItem(1)">
            <div class="wrap-desc">
              <div class="text">병원방문 (통원)</div>
            </div>
            <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[1] }"></i>
          </div>
          <div class="item-body" :class="{ 'expanded': expandedItems[1] }">
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">진료비 영수증<span>(일자별 영수증)</span></div>
            </div>
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">진료비 세부내역서<span>(비급여 진료비 없는 경우 생략)</span></div>
            </div>
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">처방전/진단서/통원확인서 중 1<span>(질병분류코드, 통원일 포함)</span></div>
            </div>
            <div class="list-item">
              <label for="store">약국</label>
              <div class="text">약제비 영수증</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-head" @click="toggleItem(2)">
            <div class="wrap-desc">
              <div class="text">입원</div>
            </div>
            <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[2] }"></i>
          </div>
          <div class="item-body" :class="{ 'expanded': expandedItems[2] }">
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">입퇴원 확인서<span>(진단명, 입원기간 포함)</span></div>
            </div>
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">진료확인서</div>
            </div>
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">진단서</div>
            </div>
            <div class="list-item">
              <label for="store">약국</label>
              <div class="text">약제비 영수증</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-head" @click="toggleItem(3)">
            <div class="wrap-desc">
              <div class="text">수술</div>
            </div>
            <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[3] }"></i>
          </div>
          <div class="item-body" :class="{ 'expanded': expandedItems[3] }">
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">진단서</div>
            </div>
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">수술기록지<span>(수술일자 포함)</span></div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-head" @click="toggleItem(4)">
            <div class="wrap-desc">
              <div class="text">응급</div>
            </div>
            <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[4] }"></i>
          </div>
          <div class="item-body" :class="{ 'expanded': expandedItems[4] }">
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">처방전</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-head" @click="toggleItem(5)">
            <div class="wrap-desc">
              <div class="text">약제비</div>
            </div>
            <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[5] }"></i>
          </div>
          <div class="item-body" :class="{ 'expanded': expandedItems[5] }">
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">처방전</div>
            </div>
            <div class="list-item">
              <label for="store">약국</label>
              <div class="text">약제비 영수증</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-head" @click="toggleItem(6)">
            <div class="wrap-desc">
              <div class="text">진단금</div>
            </div>
            <i class="icon-arrow-down" :class="{ 'rotated': expandedItems[6] }"></i>
          </div>
          <div class="item-body" :class="{ 'expanded': expandedItems[6] }">
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">진료비 영수증</div>
            </div>
            <div class="list-item">
              <label for="hospital">병원</label>
              <div class="text">진단 사실 확인서류<span>(질병에 따라 다름)</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </FlexSection>
    
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="다음" class="lg w-full medium btn-sticky" :disabled="hasSelectedHospitals" @click="clickBottomModal" />
    </ButtonGroup>
  </BaseBody>
  <BottomModal
    :is-visible="isShowBottomModal"
    v-bind="bottomModalProps"
    @cancel="clickCancel"
    @confirm="clickConfirm"
    @close="toggleBottomModal"
  >
    <template #content>
      <div class="wrap-radio-btn">
        <RadioImg id="rdo1" name="rdo1" checked custom-style="button has-icon" text="카메라 촬영" :icon-src="iconCamera" icon-alt="아이콘:카메라 촬영" />
        <RadioImg id="rdo2" name="rdo1" custom-style="button has-icon" text="앨범에서 선택" :icon-src="iconAlbum" icon-alt="아이콘:앨범에서 선택" />
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { ref } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import RadioImg from '~/components/publishing/input/radioImg.vue'
import iconCamera from '~/assets/images/insu/icon-camera.svg'
import iconAlbum from '~/assets/images/insu/icon-album.svg'

// 각 item의 확장 상태를 관리하는 배열
const expandedItems = ref([false, false, false])

// item 토글 함수
const toggleItem = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}

const isShowBottomModal = ref(false)
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}
const clickCancel = () => {
  console.log('모달 취소')
}
const bottomModalProps = ref({
  title: '서류 첨부 방식을 선택해 주세요.',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
</script>

<style scoped lang="scss">
.wrap-attach-desc {
  margin: 3.2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .attach-item {
    // border: 1px solid red;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    &:first-child {
      padding-right: 1.6rem;
    }
    &:not(:first-child) {
      border-left: 0.1rem solid #EEEEEE;
      padding-left: 1.6rem;
    }
    .img-attach {
      width: 3.6rem;
      height: auto;
    }
    .text {
      font-size: 1.4rem;
      font-weight: 500;
      text-align: center;
    }
  }
}
.btn-attach {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding: 1.8rem;
  border-radius: 0.8rem;
  background-color:#F9F9F9;
  border: 0.1rem dashed var(--Semantic-Border-BRD-01, #E2E2E2);
  [type='file'] {
    display: none;
  }
}
.wrap-attached-file {
  margin-top: 0.8rem;
  padding: 2rem;
  background-color: #F4F4F4;
  border-radius: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.1rem;
  .btn-delete-attached {
    flex: 0 0 9.7rem;
    position: relative;
    border-radius: 0.8rem;
    border: 0.1rem solid #E2E2E2;
    width: 9.7rem;
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &::after {
      content: '';
      width: 1.8rem;
      height: 1.8rem;
      position: absolute;
      top: 0.9rem;
      right: 0.9rem;
      background: url('/assets/images/insu/icon-delete-circle.svg') center center no-repeat;
      background-size: 100%;
    }
  }
}
.wrap-radio-btn {
  margin-top: 1.6rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
}
.wrap-attached-info {
  margin-top: 1.6rem;
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  img {
    width: 2rem;
  }
  .text {
    font-size: 1.4rem;
    font-weight: 500;
    color: #959595;
    strong {
      color: #4C7FF7;
    }
  }
}
.wrap-payment-instructions-info {
  margin: 5.3rem -2rem 0;
  h2 {
    padding: 0 2rem;
  }
  .wrap-spread {
    margin-top: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .item {
      width: 100%;
      &:not(:first-child) {
        border-top: 0.1rem solid #EEEEEE;
      }
      &:last-child .item-body {
        border-bottom: 0.1rem solid #EEEEEE;
      }
      .item-head {
        padding: 1.2rem 2.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.2rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
        
        .ico-payment-method {
          flex: 0 0;
          width: 4.8rem;
          height: auto;
        }
        .wrap-desc {
          flex: 1 0 auto;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          .text {
            font-size: 1.6rem;
            font-weight: 700;
            color: #2B2B2B;
          }
          .label {
            flex: 0 0;
            padding: 0.3rem 0.6rem;
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 130%;
            color: #4C7FF7;
            background-color: #E5EDFF;
            border-radius: 0.4rem;
          }
        }
        i.icon-arrow-down {
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
      .item-body {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease, padding 0.3s ease, border-top 0.3s ease;
        padding: 0 2rem;
        border-top: 0.1rem solid transparent;
        background-color: #F9F9F9;
        
        &.expanded {
          max-height: 50rem; // 충분한 높이로 설정
          padding: 2.4rem 2rem;
          border-top: 0.1rem solid #EEEEEE;
        }
        
        .spread-tit2 {
          font-size: 1.6rem;
          font-weight: 500;
          color: #2B2B2B;
        }
        .spread-tit2-sub {
          margin-top: 1.6rem;
          font-size: 1.6rem;
          font-weight: 500;
          color: #555555;
        }
        .spread-list2 {
          margin-top: 0.8rem;
          li {
            position: relative;
            padding-left: 0.6rem;
            font-size: 1.4rem;
            font-weight: 500;
            color: #555555;
            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 0.3rem;
              height: 0.3rem;
              border-radius: 50%;
              background: #959595;
            }
            &:not(:first-child) {
              margin-top: 0.4rem;
            }
          }
        }
        .list-item {
          display: flex;
          align-items: center;
          &:not(:first-child) {
            margin-top: 1.2rem;
          }
          label {
            padding: 0.3rem 0.6rem;
            border-radius: 0.4rem;
            border: 0.1rem solid #4C7FF7;
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 130%;
            color: #4C7FF7;
            &[for="store"] {
              color: #FF6A00;
              border-color: #FF6A00;              
            }
          }
          .text {
            margin-left: 0.4rem;
            font-size: 1.4rem;
            font-weight: 500;
            line-height: 130%;;
            color: #555555;
            span {
              color:#959595;
              margin-left: 0.2rem;
            }
          }
        }
      }
    }
  }
}
</style>
