<template>
  <BaseBody
    page-title="글 쓰기"
    :show-back-button="true"
    :is-transparent="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="등록하기"
  >
    <FlexSection class="gap-12 mt-24">
      <Select
        :modal-title="'게시글 카테고리'"
        :label="'커뮤니티'"
        :select-placeholder="'커뮤니티를 선택해주세요'"
        :cancel-button-text="'선택'"
        :is-show-cancel-btn="false"
        :custom-opts="[
          { value: '자유주제', label: '자유주제' },
          { value: '후기/리뷰', label: '후기/리뷰' },
          { value: '활용법', label: '활용법' },
          { value: '질문', label: '질문' }
        ]"
      />
      <SelectTypeBtn
        :legend="'게시판'"
        :display-label="selectedCategoryCombinedLabel"
        placeholder="게시판을 선택해주세요"
        :is-modal-open="isShowCategoryModal"
        @click="openCategoryModal"
      />
      <InputText placeholder="제목을 입력해주세요" class="has-no-border" />
      <textarea
        placeholder="본문에는 사진과 건강데이터를 첨부할 수 있어요"
        maxlength="1000"
        rows="10"
        class="mt-8"
      ></textarea>
    </FlexSection>

    <BottomModal
      :is-visible="isShowCategoryModal"
      :title="'게시글 카테고리'"
      :is-show-cancel-button="false"
      :is-show-confirm-button="false"
      :is-show-close-button="true"
      @close="cancelCategorySelection"
    >
      <template #content>
        <SelectBoard
          v-model="selectedCategoryValue"
          :categories-data="boardCategories"
          @change="handleCategoryChange"
          @close-modal="isShowCategoryModal = false"
        />
      </template>
    </BottomModal>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="등록하기" class="lg w-full medium btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Select from '~/components/publishing/input/Select.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import SelectBoard from '~/components/publishing/community/board/SelectBoard.vue'
import SelectTypeBtn from '~/components/publishing/community/board/SelectTypeBtn.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import InputText from '~/components/publishing/input/InputText.vue'
// 최종 선택된 옵션의 value (v-model용)
const selectedCategoryValue = ref<string>('')
// '카테고리명 > 옵션명' 형식으로 표시될 텍스트
const selectedCategoryCombinedLabel = ref<string>('')
//  카테고리 선택 모달 상태
const isShowCategoryModal = ref(false)
// 게시판 카테고리 데이터
const boardCategories = ref([
  {
    id: 'communication',
    name: '소통하기',
    icon: 'ico-coffee',
    options: [
      { value: 'free_topic', label: '자유주제' },
      { value: 'review', label: '후기/리뷰' },
      { value: 'how_to_use', label: '활용법' },
      { value: 'question', label: '질문' }
    ]
  },
  {
    id: 'co_writing',
    name: '같이쓰기',
    icon: 'ico-team',
    options: [
      { value: 'contest', label: '공모전' },
      { value: 'study', label: '스터디' },
      { value: 'challenge', label: '챌린지' },
      { value: 'project', label: '프로젝트' }
    ]
  }
])
const openCategoryModal = () => {
  isShowCategoryModal.value = true
}
// CategorySelector에서 change 이벤트 발생 시 호출
const handleCategoryChange = (data: {
  categoryName: string
  optionLabel: string
  combinedLabel: string
  value: string
}) => {
  selectedCategoryCombinedLabel.value = data.combinedLabel
}

// 모달이 닫힐 때 이벤트
const cancelCategorySelection = () => {
  isShowCategoryModal.value = false
}
</script>
