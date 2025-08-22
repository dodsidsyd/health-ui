<template>
  <div class="health-wishList">
    <div class="wishList-tit">
      <h4 class="tit">건강 위시리스트</h4>
    </div>

    <!-- 위시리스트가 있을 때 -->
    <div v-if="wishList.length < 0" class="wish-item-list">
      <div v-for="wishItem in wishList" :key="wishItem.id" class="wish-item">
        <div class="gift-info">
          <div class="gift-txt">
            <p>{{ wishItem.message }}</p>
            <nuxt-link v-if="wishItem.productLink" :to="wishItem.productLink" class="gift-link">상품보기</nuxt-link>
          </div>
          <span v-if="wishItem.productImage" class="img-wrap">
            <img :src="getImageUrl(wishItem.productImage)" :alt="wishItem.productName || '상품 이미지'" />
          </span>
        </div>

        <Button
          v-if="!wishItem.isGifted"
          element-type="button"
          :aria-label="`${wishItem.requesterName}에게 선물하기`"
          class="sm"
          @click="giftItem(wishItem.id)"
        />
        <Button
          v-else
          element-type="button"
          :aria-label="`${wishItem.giftedBy}이(가) 선물했어요!`"
          class="sm"
          disabled
        />
      </div>
      <button type="button" class="btn-add-wishList mb-12" @click="clickWishItemModal">
        <i class="icon ico-plus-lg"></i>위시리스트 추가하기
      </button>
    </div>

    <!-- 위시리스트가 없을 때 -->
    <EmptyState
      v-else
      class="mt-12 mb-20"
      empty-title="아직 위시리스트가 없어요"
      href="/community"
      :button="true"
      button-aria-label="위시리스트 추가하기"
      button-icon="ico-plus-lg"
    />

    <Teleport to="body">
      <BottomModal
        :is-visible="isShowWishItemModal"
        title="갖고싶은 위시리스트를 공유해요!"
        :is-show-close-button="true"
        :is-show-cancel-button="true"
        :is-show-confirm-button="true"
        confirm-button-text="추가하기"
        cancel-button-text="취소하기"
        @close="toggleWishItemModal"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <template #content>
          <div class="wishList-form">
            <FieldSet v-model="newWishItem.message" :placeholder="'갖고 싶은 선물 메모를 작성해 주세요.'" />
            <InputText v-model="newWishItem.productLink" placeholder="선물 링크를 넣어주세요" />
            <InputFile @change="handleFileChange" />
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import Button from '~/components/publishing/button/Button.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import FieldSet from '~/components/publishing/input/FieldSet.vue'
import InputFile from '~/components/publishing/input/InputFile.vue'
import EmptyState from '~/components/publishing/community/common/EmptyState.vue'

interface WishItem {
  id: string
  requesterName: string
  requesterProfile?: string
  message: string
  productName?: string
  productLink?: string
  productImage?: string
  isGifted: boolean
  giftedBy?: string
  giftedDate?: string
  createdAt: string
}

// 위시리스트 데이터
const wishList = ref<WishItem[]>([
  {
    id: '1',
    requesterName: '아빠',
    requesterProfile: 'community/img-rank-profile.png',
    message: '아빠 요즘 오메가3 먹는데\n패키지 선물해줄 사람~',
    productName: '오메가3 패키지',
    productLink: 'javascript:void(0)',
    productImage: 'community/img-rank-profile.png',
    isGifted: false,
    createdAt: '2024-04-15T10:00:00'
  },
  {
    id: '2',
    requesterName: '큰 딸',
    requesterProfile: 'community/img-add-groupBanner.png',
    message: '나 이거 갖고싶어!\n사주꾸야?',
    productName: '건강 기능 식품',
    productLink: 'javascript:void(0)',
    productImage: 'community/img-add-groupBanner.png',
    isGifted: true,
    giftedBy: '큰 딸',
    giftedDate: '2024-04-14T15:30:00',
    createdAt: '2024-04-10T09:00:00'
  },
  {
    id: '3',
    requesterName: '엄마',
    message: '비타민D 영양제 사주실 분?\n요즘 햇빛을 못 봐서 필요해요',
    productName: '비타민D 3000IU',
    productLink: 'javascript:void(0)',
    productImage: 'community/img-rank-profile.png',
    isGifted: false,
    createdAt: '2024-04-12T14:00:00'
  }
])

// 빈 리스트 테스트용 (주석 해제하면 빈 상태 확인 가능)
// const wishList = ref<WishItem[]>([])

// 새 위시아이템 데이터
const newWishItem = ref({
  message: '',
  productLink: '',
  productImage: null as File | null
})

// 모달 상태 관리
const isShowWishItemModal = ref(false)

// 이미지 경로 처리
const basePath = '/_nuxt/assets/images/'

const getImageUrl = (imagePath?: string) => {
  if (!imagePath) return ''
  // 이미 전체 경로가 포함된 경우 그대로 반환
  if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
    return imagePath
  }
  return `${basePath}${imagePath}`
}

// 모달 열기/닫기
const clickWishItemModal = () => {
  resetNewWishItem()
  toggleWishItemModal()
}

const toggleWishItemModal = () => {
  isShowWishItemModal.value = !isShowWishItemModal.value
}

// 새 위시아이템 초기화
const resetNewWishItem = () => {
  newWishItem.value = {
    message: '',
    productLink: '',
    productImage: null
  }
}

// 파일 선택 처리
const handleFileChange = (file: File) => {
  newWishItem.value.productImage = file
  console.log('Selected file:', file)
}

// 위시아이템 추가 확인
const handleConfirm = () => {
  if (!newWishItem.value.message.trim()) {
    alert('메모를 작성해주세요.')
    return
  }

  // 새 위시아이템 추가
  const newItem: WishItem = {
    id: `wish-${Date.now()}`,
    requesterName: '나', // 현재 사용자
    message: newWishItem.value.message,
    productLink: newWishItem.value.productLink || undefined,
    productImage: newWishItem.value.productImage ? URL.createObjectURL(newWishItem.value.productImage) : undefined,
    isGifted: false,
    createdAt: new Date().toISOString()
  }

  wishList.value.unshift(newItem) // 최신 항목을 맨 위에 추가

  console.log('위시아이템 추가:', newItem)
  toggleWishItemModal()
  resetNewWishItem()
}

// 취소
const handleCancel = () => {
  toggleWishItemModal()
  resetNewWishItem()
}

// 선물하기
const giftItem = (itemId: string) => {
  const item = wishList.value.find(w => w.id === itemId)
  if (item) {
    // 선물하기 확인 모달이나 프로세스 실행
    console.log('선물하기:', item)

    // 예시: 선물 완료 처리
    item.isGifted = true
    item.giftedBy = '나' // 현재 사용자
    item.giftedDate = new Date().toISOString()
  }
}

// 위시아이템 삭제
const deleteWishItem = (itemId: string) => {
  const index = wishList.value.findIndex(w => w.id === itemId)
  if (index > -1) {
    wishList.value.splice(index, 1)
    console.log('위시아이템 삭제:', itemId)
  }
}

// 위시아이템 수정
const editWishItem = (itemId: string) => {
  const item = wishList.value.find(w => w.id === itemId)
  if (item) {
    // 수정 모달 열기 또는 수정 페이지로 이동
    console.log('위시아이템 수정:', item)
  }
}
</script>

<style scoped lang="scss">
.health-wishList {
  margin-top: 3.2rem;
  .wishList-tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;

    .tit {
      font-size: 2rem;
      font-weight: 700;
      color: #2b2b2b;
    }
  }
  .wish-item-list {
    display: flex;
    flex-direction: column;
    gap: 2rem 0;

    &.empty-wishlist {
      width: 100%;
      height: 14.2rem;
      background: #f4f4f4;
      border-radius: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .empty-text {
        font-size: 1.6rem;
        color: #959595;
        font-weight: 500;
      }
    }

    .wish-item {
      display: flex;
      flex-direction: column;
      gap: 2rem 0;
      width: 100%;
      position: relative;
      padding: 2.4rem 2rem;
      border-radius: 2rem;
      border: 0.1rem solid #e2e2e2;
      background: vars.$white;
      box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
      .gift-info {
        display: flex;
        justify-content: space-between;
        .gift-txt {
          display: flex;
          flex-direction: column;
          gap: 1.2rem 0;
          flex: 1;
          padding-right: 1.6rem;

          p {
            font-size: 1.6rem;
            font-weight: 500;
            color: #2b2b2b;
            white-space: pre-line;
          }
          .gift-link {
            display: flex;
            gap: 0 0.5rem;
            color: vars.$blue-primary;
            font-size: 1.6rem;
            font-weight: 400;
            align-self: flex-start;
            &::before {
              content: '';
              width: 2rem;
              height: 2rem;
              background-size: 2rem;
              background-repeat: no-repeat;
              background-position: center;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M6.14851 8.49213L4.2873 10.3533C3.59219 11.0484 3.19246 11.9943 3.19976 12.9883C3.20707 13.9823 3.59805 14.9338 4.32615 15.6395C5.03172 16.3676 5.98349 16.7585 6.97734 16.7658C7.99386 16.7733 8.91728 16.3961 9.61243 15.701L11.4736 13.8398M13.851 11.5079L15.7122 9.64668C16.4073 8.95157 16.807 8.00577 16.7997 7.01176C16.7924 6.01774 16.4015 5.06617 15.6734 4.36056C14.968 3.65516 14.0163 3.26415 13.0223 3.25684C12.0283 3.24954 11.0824 3.62658 10.3872 4.32171L8.52603 6.18293M7.17734 12.7726L12.761 7.18901' stroke='%234C7FF7' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            }
          }
        }
        .img-wrap {
          width: 8rem;
          height: 8rem;
          background: #f4f4f4;
          border-radius: 1.2rem;
          overflow: hidden;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }
}

.btn-add-wishList {
  position: relative;
  border-radius: 3.2rem;
  padding: 0.7rem 1.6rem;
  border: 0.1rem solid #e2e2e2;
  background: vars.$white;
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 0.4rem;
  margin: 1.2rem auto 0;
  @include mixin.rippleEffectPrimary;
  .icon {
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
  }
}

.wishList-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem 0;
  margin-bottom: 1.6rem;
}

.btn-attach {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  height: 5.6rem;
  padding: 0 1.8rem;
  border-radius: 0.8rem;
  background-color: #f9f9f9;
  color: #555;
  font-size: 1.4rem;
  font-weight: 500;
  border: 0.1rem dashed var(--Semantic-Border-BRD-01, #e2e2e2);
  [type='file'] {
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
