<template>
  <BaseBody
    :has-scrap="true"
    :has-share="true"
    page-title="커뮤니티명"
    :show-back-button="true"
    :is-transparent="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span class='icon ico-menu'>메뉴 아이콘</span>"
  >
    <!-- 접근 권한이 있는 경우 -->
    <div v-if="hasAccess">
      <!-- 말머리 컴포넌트 -->
      <PostDetailTitleHeader
        :nickname="'당근먹는다람쥐'"
        :title="'러닝 후 간단히 먹을 수 있는 다이어트 를 위한 저녁식단 추천해요.'"
      />
      <!-- 이미지가 있는 경우 -->
      <PostDetailImageWrap>
        <CommonSwiper
          :slides="imageSlides"
          slide-type="image"
          :slides-per-view="1"
          :space-between="20"
          :navigation="false"
          :pagination="{ clickable: true }"
          :autoplay="false"
          :scrollbar="false"
          :show-slide-info="false"
          :show-play-pause-button="false"
          :show-slide-length="false"
          :loop="true"
        />
      </PostDetailImageWrap>
      <!-- 해시태그 컴포넌트 -->
      <PostDetailHashtagWrap :hashtags="['#저속화식단', '#저탄고지', '#고단백', '#식단공유', '#운동후식단병행']" />
      <!-- 본문 컴포넌트 -->
      <PostDetailTextWrap>
        본문 내용이 표기됩니다. 한강 뛰고 와서 먹기좋은 초간단샐러드 추천해요. 저만의 식단인데, 일단 닭가슴살이랑 바나나
        그리고 양배추있으면 한 끼 뚝딱이에요.
      </PostDetailTextWrap>
      <!-- 좋아요 + 조회수 표기 컴포넌트 -->
      <PostDetailSummaryBox
        v-model:like-count="myLikeCount"
        :view-count="104"
        :active-reaction-icon="selectedReactionIcon"
      />
      <hr class="hr-section mg-24y ml-n20 mr-n20" />
      <!-- 리액션 컴포넌트 -->
      <PostDetailReactionBox @reaction-selected="updateSelectedReaction" />
      <hr class="hr-section mg-24y ml-n20 mr-n20" />
      <CommentHeader />
      <!-- 댓글 컴포넌트 -->
      <PostDetailComment
        :nickname="'당근먹는다람쥐'"
        :author="true"
        @see-more-self="handleSeeMoreClick"
        @see-more-other="handleSeeMoreOtherClick"
      />
      <!-- 답글 컴포넌트 -->
      <PostDetailReply
        :nickname="'당근먹는다람쥐'"
        @see-more-self="handleSeeMoreClick"
        @see-more-other="handleSeeMoreOtherClick"
      />
      <!-- 댓글 컴포넌트 -->
      <PostDetailComment
        :nickname="'당근먹는다람쥐'"
        :author="true"
        @see-more-self="handleSeeMoreClick"
        @see-more-other="handleSeeMoreOtherClick"
      />
      <!-- 댓글 컴포넌트 -->
      <PostDetailComment
        :nickname="'당근먹는다람쥐'"
        @see-more-self="handleSeeMoreClick"
        @see-more-other="handleSeeMoreOtherClick"
      />
      <!-- 댓글이 없는 경우 케이스 -->
      <HasNoComment />
      <hr class="hr-section mg-24y ml-n20 mr-n20" />
      <!-- 다른 게시글 보기 컴포넌트 -->
      <PostDetailAnotherBoard :author="'슈블리맘'" />
      <!-- 댓글 입력 컴포넌트 -->
      <CommentBox />
      <!-- 작성자 본인 댓글 더보기 클릭 시 모달 -->
      <BottomModal
        :is-visible="isShowSeeMoreSelfModal"
        v-bind="SeeMoreSelfModalProps"
        @cancel="clickCancelSeeMoreSelfModal"
        @confirm="clickConfirmSeeMoreSelfModal"
        @close="toggleSeeMoreSelfModal"
      >
        <template #content>
          <div>한 번 삭제한 [게시글/댓글]은 다시 복구할 수 없어요.</div>
        </template>
      </BottomModal>
      <!-- 타인 댓글 더보기 클릭 시 모달 -->
      <BottomModal
        :is-visible="isShowSeeMoreOtherModal"
        v-bind="SeeMoreOtherModalProps"
        @cancel="clickCancelSeeMoreOtherModal"
        @confirm="clickConfirmSeeMoreOtherModal"
        @close="toggleSeeMoreOtherModal"
      >
        <template #content>
          <div>운영자가 검토 후 해당 [게시글/댓글]은 신고 처리됩니다.</div>
        </template>
      </BottomModal>
      <!-- 신고하기 버튼 클릭 시 모달 -->
      <BottomModal
        :is-visible="isShowReportModal"
        v-bind="ReportModalProps"
        @confirm="clickConfirmReportModal"
        @close="toggleReportModal"
      >
        <template #content>
          <ReportBox />
        </template>
      </BottomModal>
    </div>
    <!-- 접근 권한이 없는 경우 -->
    <AccessPermissions v-else>
      <!-- 말머리 컴포넌트 -->
      <PostDetailTitleHeader
        :nickname="'당근먹는다람쥐'"
        :title="'러닝 후 간단히 먹을 수 있는 다이어트 를 위한 저녁식단 추천해요.'"
      />
      <!-- 해시태그 컴포넌트 -->
      <PostDetailHashtagWrap :hashtags="['#저속화식단', '#저탄고지', '#고단백', '#식단공유', '#운동후식단병행']" />
      <!-- 본문 컴포넌트 -->
      <PostDetailTextWrap>
        본문 내용이 표기됩니다. 한강 뛰고 와서 먹기좋은 초간단샐러드 추천해요. 저만의 식단인데, 일단 닭가슴살이랑 바나나
        그리고 양배추있으면 한 끼 뚝딱이에요.
      </PostDetailTextWrap>
      <!-- 좋아요 + 조회수 표기 컴포넌트 -->
      <PostDetailSummaryBox
        v-model:like-count="myLikeCount"
        :view-count="104"
        :active-reaction-icon="selectedReactionIcon"
      />
      <hr class="hr-section mg-24y ml-n20 mr-n20" />
      <!-- 리액션 컴포넌트 -->
      <PostDetailReactionBox @reaction-selected="updateSelectedReaction" />
      <hr class="hr-section mg-24y ml-n20 mr-n20" />
      <CommentHeader />
      <!-- 댓글 컴포넌트 -->
      <PostDetailComment
        :nickname="'당근먹는다람쥐'"
        :author="true"
        @see-more-self="handleSeeMoreClick"
        @see-more-other="handleSeeMoreOtherClick"
      />
      <!-- 답글 컴포넌트 -->
      <PostDetailReply
        :nickname="'당근먹는다람쥐'"
        @see-more-self="handleSeeMoreClick"
        @see-more-other="handleSeeMoreOtherClick"
      />
      <!-- 댓글 컴포넌트 -->
      <PostDetailComment
        :nickname="'당근먹는다람쥐'"
        :author="true"
        @see-more-self="handleSeeMoreClick"
        @see-more-other="handleSeeMoreOtherClick"
      />
      <!-- 댓글 컴포넌트 -->
      <PostDetailComment
        :nickname="'당근먹는다람쥐'"
        @see-more-self="handleSeeMoreClick"
        @see-more-other="handleSeeMoreOtherClick"
      />
      <!-- 댓글이 없는 경우 케이스 -->
      <HasNoComment />
      <hr class="hr-section mg-24y ml-n20 mr-n20" />
      <!-- 다른 게시글 보기 컴포넌트 -->
      <PostDetailAnotherBoard :author="'슈블리맘'" />
      <!-- 댓글 입력 컴포넌트 -->
      <CommentBox />
      <!-- 커뮤니티 가입 인터랙트 -->
      <commNoPermission />
    </AccessPermissions>
  </BaseBody>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import PostDetailTitleHeader from '~/components/publishing/community/board/PostDetailTitleHeader.vue'
import PostDetailImageWrap from '~/components/publishing/community/board/PostDetailImageWrap.vue'
import PostDetailHashtagWrap from '~/components/publishing/community/board/PostDetailHashtagWrap.vue'
import PostDetailTextWrap from '~/components/publishing/community/board/PostDetailTextWrap.vue'
import PostDetailSummaryBox from '~/components/publishing/community/board/PostDetailSummaryBox.vue'
import PostDetailReactionBox from '~/components/publishing/community/board/PostDetailReactionBox.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import CommentHeader from '~/components/publishing/community/board/CommentHeader.vue'
import HasNoComment from '~/components/publishing/community/board/HasNoComment.vue'
import PostDetailComment from '~/components/publishing/community/board/PostDetailComment.vue'
import PostDetailReply from '~/components/publishing/community/board/PostDetailReply.vue'
import CommentBox from '~/components/publishing/community/board/CommentBox.vue'
import imgBanner from '@/assets/images/community/img-community-02.png'
import PostDetailAnotherBoard from '~/components/publishing/community/board/PostDetailAnotherBoard.vue'
import AccessPermissions from '~/components/publishing/community/board/AccessPermissionsWrap.vue'
import commNoPermission from '~/components/publishing/community/board/commNoPermission.vue'
import ReportBox from '~/components/publishing/community/board/ReportBox.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
// 접근권한 없는 케이스 상태
const hasAccess = ref(true)
// 이미지 슬라이드 데이터 (로컬 이미지 사용)
const imageSlides = [imgBanner, imgBanner, imgBanner, imgBanner]
// 좋아요 반응형 변수
const myLikeCount = ref(104)
// 선택된 리액션 아이콘 클래스를 저장할 상태
const selectedReactionIcon = ref('')
// 리액션 아이콘 클래스 변경 및 좋아요 수 카운트
const updateSelectedReaction = (iconClass: string, reactionCount: number) => {
  selectedReactionIcon.value = iconClass
  myLikeCount.value = reactionCount
}
// 작성자 본인 댓글 더보기 메뉴 클릭시
const handleSeeMoreClick = () => {
  isShowSeeMoreSelfModal.value = true
}
// 작성자 본인 댓글 더보기 모달 초기 상태값
const isShowSeeMoreSelfModal = ref(false)
// 작성자 본인 댓글 더보기 모달 props
const SeeMoreSelfModalProps = ref({
  title: '해당 [게시글/댓글]을 삭제하시나요?',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '삭제하기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 작성자 본인 댓글 더보기 모달 토글
const toggleSeeMoreSelfModal = () => {
  isShowSeeMoreSelfModal.value = false
}
// 작성자 본인 댓글 더보기 모달 취소 버튼 클릭시
const clickCancelSeeMoreSelfModal = () => {
  isShowSeeMoreSelfModal.value = false
}
// 작성자 본인 댓글 더보기 모달 삭제하기 버튼 클릭시
const clickConfirmSeeMoreSelfModal = () => {
  isShowSeeMoreSelfModal.value = false
}
// 타인 댓글 더보기 메뉴 클릭시
const handleSeeMoreOtherClick = () => {
  isShowSeeMoreOtherModal.value = true
}
// 타인 댓글 더보기 모달 초기 상태값
const isShowSeeMoreOtherModal = ref(false)
// 타인 댓글 더보기 모달 props
const SeeMoreOtherModalProps = ref({
  title: '해당 [게시글/댓글]을 신고하시나요?',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '신고하기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 타인 댓글 더보기 모달 토글
const toggleSeeMoreOtherModal = () => {
  isShowSeeMoreOtherModal.value = false
}
// 타인 댓글 더보기 모달 취소 버튼 클릭시
const clickCancelSeeMoreOtherModal = () => {
  isShowSeeMoreOtherModal.value = false
}
// 타인 댓글 더보기 모달 신고하기 버튼 클릭시
const clickConfirmSeeMoreOtherModal = () => {
  isShowSeeMoreOtherModal.value = false
  isShowReportModal.value = true
}

// 신고하기 모달 초기 상태값
const isShowReportModal = ref(true)
// 타인 댓글 더보기 모달 props
const ReportModalProps = ref({
  title: '신고하기',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '신고하기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 타인 댓글 더보기 모달 토글
const toggleReportModal = () => {
  isShowReportModal.value = false
}
// 타인 댓글 더보기 모달 신고하기 버튼 클릭시
const clickConfirmReportModal = () => {
  isShowReportModal.value = false
}
</script>
