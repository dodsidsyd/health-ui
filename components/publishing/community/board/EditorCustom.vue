<!-- NOTICE: 해시태그 삭제 기획이 없어서 임의로 추가 -->

<!-- TODO: 건강 데이터 기획 나오면 추가 해야함! -->
<template>
  <!-- 07-17 editor-wrap class 추가 -->
  <div class="editor-wrap">
    <!-- 07-17 description 추가 및 주석처리 -->
    <!-- 
    <h1>TipTap 에디터</h1>
    <p class="description">해시태그 : 최대 10자, #과 공백 제외 모든 문자 허용 <br />엔터또는 스페이스바로 생성</p>
    <p class="description">별점 : 최대 5점(0.5점 단위)</p>
    <p class="description">이미지 : 최대 5개 스와이프 기능 제공</p>
    <p class="description">건강 데이터 : 추후 추가 예정 (기획 안나옴)</p>
    <p class="description">
      해당 파일은 원본 Editor / EditorToolbar 에서 가져와 수정 <br />수정사항은 주석으로 표기(ex] 07-17
      description 추가 및 주석처리)
    </p>
    -->

    <div class="editor-container">
      <EditorToolbarCustom
        v-if="editor"
        :editor="editor as any"
        :hashtag="hashtags"
        :star="star"
        :health-data="healthData"
        :image-count="uploadedImages.length"
        @image-upload="triggerImageUpload"
        @hashtag="triggerHashtag"
        @star="triggerStar"
        @health-data="triggerHealthData"
      />

      <!-- 건강데이터 섹션 -->
      <div v-if="isHealthDataActive" class="health-section">
        <div class="health-header">
          <h3 class="health-title">건강 데이터</h3>
          <!-- 건강데이터 섹션 닫기 버튼 -->
          <button class="health-close" @click="closeHealthData">×</button>
        </div>
        <div class="health-container">
          <p class="health-placeholder">건강 데이터 요소들</p>
        </div>
      </div>

      <!-- TipTap 에디터 텍스트 영역 (TipTap 제공 컴포넌트 사용) -->
      <div class="editor-content-wrapper">
        <div class="editor-main">
          <EditorContent :editor="editor as any" />
          <!-- 숨겨진 파일 입력: 이미지 업로드용 -->
          <input ref="fileInputRef" type="file" accept="image/*" multiple class="hidden" @change="handleImageUpload" />
        </div>
      </div>
    </div>

    <!-- 해시태그 섹션 -->
    <div v-if="isHashtagActive" class="hashtag-section" @click="focusHashtagSection">
      <div class="hashtag-container">
        <span v-for="(tag, index) in hashtags" :key="index" class="hashtag-item">
          #{{ tag }}
          <!-- 07-17 hashtag-delete에 클래스 추가, x 텍스트 제거 -->
          <button class="hashtag-delete icon close" @click.stop="deleteHashtag(index)"></button>
        </span>

        <!-- 새 해시태그 입력 영역 -->
        <div v-if="showHashtagInput" class="hashtag-input-container">
          <span class="hashtag-hash">#</span>
          <input
            ref="hashtagInputRef"
            v-model="currentHashtagInput"
            type="text"
            class="hashtag-input"
            maxlength="9"
            @keydown.enter="addHashtagAndContinue"
            @keydown.space="addHashtagAndContinue"
            @input="handleHashtagInput"
            @keydown.backspace="handleBackspace"
            @keydown.esc="cancelHashtagInput"
            @blur="addHashtag"
          />
        </div>
      </div>
    </div>
    <!-- 별점 섹션 -->
    <div v-if="isStarActive" class="star-section">
      <div class="star-header">
        <h3 class="star-title">별점</h3>
        <!-- 07-17 star-close에 클래스 추가, x 텍스트 제거 -->
        <button class="star-close icon close" @click="closeStarRating"></button>
      </div>
      <div class="star-container">
        <div class="star-rating">
          <div
            v-for="starIndex in 5"
            :key="starIndex"
            class="star-wrapper"
            @mousemove="handleStarMove($event, starIndex)"
            @mouseleave="handleStarLeave"
            @touchmove="handleStarTouch($event, starIndex)"
            @touchend="handleTouchEnd"
            @click="setStarRating(starIndex)"
          >
            <!-- 07-17 별 이모지 제거 -->
            <div class="star-bg"></div>
            <div class="star-fill" :style="{ width: getStarFillWidth(starIndex) }"></div>
          </div>
        </div>
        <div class="star-score">{{ star.toFixed(1) }}</div>
      </div>
    </div>

    <!-- 이미지 섹션 -->
    <div v-if="uploadedImages.length > 0" class="image-sidebar">
      <div class="image-container">
        <div class="image-container">
          <div v-for="(img, index) in uploadedImages" :key="index" class="image-item">
            <div class="image-wrapper">
              <img :src="img" :alt="`업로드된 이미지 ${index + 1}`" class="uploaded-image" />
              <button class="image-delete-btn" @click="deleteImage(index)">
                <i class="ri-close-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { watch } from 'vue'
import EditorToolbarCustom from '~/components/publishing/community/board/EditorToolbarCustom.vue'
import { EditorContent } from '@tiptap/vue-3'
import { useEditor } from '~/composables/common/editor/useEditor'
const { editor, jsonContent } = useEditor()

// 이미지 업로드
const fileInputRef = ref<HTMLInputElement | null>(null) // 숨겨진 파일 입력 참조
const uploadedImages = ref<string[]>([]) // 업로드된 이미지 URL 배열 (최대 5개)

// 해시태그
const hashtagInputRef = ref<HTMLInputElement | null>(null) // 해시태그 입력 필드 참조
const hashtags = ref<string[]>([]) // 생성된 해시태그 배열
const showHashtagInput = ref<boolean>(false) // 해시태그 입력 모드 상태
const currentHashtagInput = ref<string>('') // 현재 입력 중인 해시태그
const isHashtagActive = ref<boolean>(false) // 해시태그 섹션 활성화 상태 (토글용)

// 별점
const star = ref<number>(0) // 최종 별점 (0-5, 0.5 단위)
const showStarRating = ref<boolean>(false) // 별점 입력 모드 상태
const hoverStar = ref<number>(0) // 마우스 호버 시 임시 별점
const isStarActive = ref<boolean>(false) // 별점 섹션 활성화 상태 (토글용)

// 건강 데이터
const healthData = ref<any>({})
const isHealthDataActive = ref<boolean>(false) // 건강데이터 섹션 활성화 상태 (토글용)

//* 이미지 관련 함수들

/**
 * 이미지 업로드 트리거
 * 최대 5개 제한, 초과 시 경고 표시
 */
const triggerImageUpload = () => {
  if (uploadedImages.value.length >= 5) {
    alert('최대 5개의 이미지까지 업로드할 수 있습니다.')
    return
  }
  fileInputRef.value?.click() // 숨겨진 파일 입력 클릭
}

// TODO: 추후 이미지 삭제, 이미지 ID값으로 삭제할 예정
const deleteImage = (index: number) => {
  uploadedImages.value.splice(index, 1)
}

/**
 * 파일 입력 변경 이벤트 핸들러
 * 선택된 이미지들을 Base64로 변환하여 배열에 추가
 */
const handleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  const currentCount = uploadedImages.value.length
  const remainingSlots = 5 - currentCount

  if (remainingSlots <= 0) {
    alert('최대 5개의 이미지까지 업로드할 수 있습니다.')
    return
  }

  // 선택된 파일 수가 남은 슬롯보다 많으면 제한
  const filesToProcess = Array.from(files).slice(0, remainingSlots)

  if (files.length > filesToProcess.length) {
    alert(`${filesToProcess.length}개의 이미지만 업로드됩니다. (최대 5개 제한)`)
  }

  // 각 파일을 Base64로 변환하여 배열에 추가
  filesToProcess.forEach(file => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      uploadedImages.value.push(result)
    }
    reader.readAsDataURL(file)
  })

  // input 값 초기화 (같은 파일 재선택 가능하도록)
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

//* 해시태그 관련 함수들

/**
 * 해시태그 토글 (활성화/비활성화)
 * 비활성화 시 데이터 초기화
 */
const triggerHashtag = () => {
  isHashtagActive.value = !isHashtagActive.value

  if (isHashtagActive.value) {
    // 활성화 시 입력 모드로 진입
    showHashtagInput.value = true
    nextTick(() => {
      hashtagInputRef.value?.focus()
      currentHashtagInput.value = ''
      adjustInputWidth() // 초기 너비 설정
    })
  } else {
    // 비활성화 시 데이터 초기화
    hashtags.value = []
    showHashtagInput.value = false
    currentHashtagInput.value = ''
  }
}

/**
 * 해시태그 섹션 클릭 시 입력 모드 활성화
 */
const focusHashtagSection = () => {
  if (!showHashtagInput.value) {
    showHashtagInput.value = true
    nextTick(() => {
      hashtagInputRef.value?.focus()
      adjustInputWidth()
    })
  }
}

/**
 * 해시태그 추가 (blur 이벤트용)
 * 입력창에서 포커스가 벗어날 때 호출
 */
const addHashtag = () => {
  if (currentHashtagInput.value.trim()) {
    const tag = currentHashtagInput.value.trim().replace(/^#/, '') // # 제거
    if (tag && tag.length <= 10 && !hashtags.value.includes(tag)) {
      hashtags.value.push(tag)
    }
  }
  currentHashtagInput.value = ''
  showHashtagInput.value = false
}

/**
 * 해시태그 추가 후 계속 입력 모드 유지
 * 엔터/스페이스바 입력 시 호출
 */
const addHashtagAndContinue = () => {
  if (currentHashtagInput.value.trim()) {
    const tag = currentHashtagInput.value.trim().replace(/^#/, '') // # 제거
    if (tag && tag.length <= 10 && !hashtags.value.includes(tag)) {
      hashtags.value.push(tag)
    }
  }
  currentHashtagInput.value = ''
  // 다음 해시태그 입력을 위해 입력 상태 유지
  nextTick(() => {
    hashtagInputRef.value?.focus()
    adjustInputWidth() // 입력 완료 후 너비 초기화
  })
}

/**
 * 해시태그 입력 취소 (ESC 키)
 */
const cancelHashtagInput = () => {
  currentHashtagInput.value = ''
  showHashtagInput.value = false
}

/**
 * 해시태그 입력 중 처리
 * 모바일에서 스페이스바 입력 감지 + 동적 너비 조절
 */
const handleHashtagInput = () => {
  // 모바일에서 스페이스바 입력 감지
  if (currentHashtagInput.value.endsWith(' ')) {
    // 스페이스바가 입력되면 해시태그 생성
    currentHashtagInput.value = currentHashtagInput.value.trim()
    addHashtagAndContinue()
    return
  }

  // 입력값에 따라 동적으로 너비 조절
  adjustInputWidth()
}

/**
 * input 필드의 너비를 입력값 길이에 맞게 동적으로 조절
 */
const adjustInputWidth = () => {
  if (hashtagInputRef.value) {
    const input = hashtagInputRef.value
    const value = currentHashtagInput.value || ''

    if (value.length === 0) {
      // 빈 값일 때는 기본 크기
      input.style.width = '10px'
    } else {
      // 임시 span 요소를 생성해서 정확한 텍스트 너비 측정
      const tempSpan = document.createElement('span')

      // input과 동일한 스타일 적용
      const computedStyle = getComputedStyle(input)
      tempSpan.style.visibility = 'hidden'
      tempSpan.style.position = 'absolute'
      tempSpan.style.fontSize = computedStyle.fontSize
      tempSpan.style.fontWeight = computedStyle.fontWeight
      tempSpan.style.fontFamily = computedStyle.fontFamily
      tempSpan.style.whiteSpace = 'pre'

      // 측정할 텍스트 설정
      tempSpan.textContent = value

      // DOM에 추가하여 크기 측정
      document.body.appendChild(tempSpan)
      const textWidth = tempSpan.offsetWidth
      document.body.removeChild(tempSpan)

      // 여유분 8px 추가
      input.style.width = `${textWidth + 8}px`
    }
  }
}

/**
 * 백스페이스 키 처리
 * 입력창이 비어있을 때 마지막 해시태그 삭제
 */
const handleBackspace = () => {
  // 입력 필드가 비어있을 때 백스페이스를 누르면 마지막 해시태그 삭제
  if (currentHashtagInput.value === '' && hashtags.value.length > 0) {
    hashtags.value.pop()
  }
  // 입력 필드에 내용이 있으면 일반적인 백스페이스 동작 (기본 동작)
}

/**
 * 특정 인덱스의 해시태그 삭제
 */
const deleteHashtag = (index: number) => {
  hashtags.value.splice(index, 1)
}

//* 별점 관련 함수들

/**
 * 별점 토글 (활성화/비활성화)
 * 비활성화 시 데이터 초기화
 */
const triggerStar = () => {
  isStarActive.value = !isStarActive.value

  if (isStarActive.value) {
    // 활성화 시 별점 입력 모드 진입
    showStarRating.value = true
  } else {
    // 비활성화 시 데이터 초기화
    star.value = 0
    showStarRating.value = false
    hoverStar.value = 0
  }
}

/**
 * 별점 입력 모드 종료 (X 버튼용)
 */
const closeStarRating = () => {
  isStarActive.value = false
  star.value = 0
  showStarRating.value = false
  hoverStar.value = 0
}

/**
 * 마우스 이동 시 별점 미리보기
 * 별의 왼쪽/오른쪽 절반에 따라 0.5점 단위 계산
 */
const handleStarMove = (event: MouseEvent, starIndex: number) => {
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  const x = event.clientX - rect.left
  const width = rect.width
  const isHalfStar = x < width / 2
  hoverStar.value = isHalfStar ? starIndex - 0.5 : starIndex
}

/**
 * 마우스가 별점 영역을 벗어날 때
 */
const handleStarLeave = () => {
  hoverStar.value = 0
}

/**
 * 터치 이동 시 별점 미리보기 (모바일)
 */
const handleStarTouch = (event: TouchEvent, starIndex: number) => {
  event.preventDefault()
  const touch = event.touches[0]
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  const x = touch.clientX - rect.left
  const width = rect.width
  const isHalfStar = x < width / 2
  hoverStar.value = isHalfStar ? starIndex - 0.5 : starIndex
}

/**
 * 터치 종료 시 별점 확정 (모바일)
 */
const handleTouchEnd = () => {
  if (hoverStar.value > 0) {
    star.value = hoverStar.value
  }
}

/**
 * 별점 클릭 시 별점 설정
 */
const setStarRating = (starIndex: number) => {
  star.value = hoverStar.value > 0 ? hoverStar.value : starIndex
}

/**
 * 별의 채움 너비 계산 (0.5점 단위 표현)
 * @param starIndex 별의 인덱스 (1-5)
 * @returns CSS width 값 (0%, 50%, 100%)
 */
const getStarFillWidth = (starIndex: number): string => {
  const currentRating = hoverStar.value > 0 ? hoverStar.value : star.value
  if (starIndex <= currentRating) {
    return '100%' // 완전히 채움
  } else if (starIndex - 0.5 <= currentRating) {
    return '50%' // 절반 채움
  }
  return '0%' // 비어있음
}

//* 건강 데이터 관련 (미구현)

/**
 * 건강데이터 토글 (활성화/비활성화)
 * 비활성화 시 데이터 초기화
 */
const triggerHealthData = () => {
  isHealthDataActive.value = !isHealthDataActive.value

  if (!isHealthDataActive.value) {
    // 비활성화 시 데이터 초기화
    healthData.value = {}
  }
}

/**
 * 건강데이터 입력 모드 종료 (X 버튼용)
 */
const closeHealthData = () => {
  isHealthDataActive.value = false
  healthData.value = {}
}

// 파일 입력 변화 감지
// watch(fileInputRef, () => {
//   console.log('fileInputRef', fileInputRef.value)
// })

// 에디터 JSON 콘텐츠 변화 감지
// watch(
//   jsonContent,
//   newValue => {
//     console.log('📝 에디터 JSON 변화 감지:')
//     console.log(newValue)
//     console.log('---')
//   },
//   { deep: true }
// )
</script>

<style scoped lang="scss">
.editor-wrap {
  margin: 0 -2rem;
  padding-bottom: 5.6rem;
}
/* TipTap 에디터 텍스트 스타일 */
:deep(.ProseMirror) {
  width: 100%;
  outline: none;
  font-size: 1.8rem;
  line-height: 2.9rem;
  color: #555;
}
:deep(.ProseMirror img) {
  width: 100%;
  object-fit: cover;
}
:deep(.hashtag:hover) {
  transform: translateY(-1px);
}
.description {
  color: #6b7280;
  font-size: 14px;
}
.editor-content-wrapper {
  padding: 0 2rem;
  display: flex;
}

.editor-main {
  width: 100%;
  height: 100%;
}

/* 해시태그 섹션 */
.hashtag-section {
  margin-top: 2.4rem;
  .hashtag-container {
    display: flex;
    flex-wrap: wrap;
    row-gap: 0.4rem;
    column-gap: 0.8rem;
    align-items: flex-start;
    margin: 0 2rem;
    font-size: 14px;
    color: #374151;
  }
  .hashtag-item {
    display: inline-flex;
    align-items: center;
    color: var(--blue-primary);
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.2rem;
  }
  .hashtag-delete {
    width: 1.6rem;
    height: 1.6rem;
    background-size: 1.6rem;
    background-position: center top -0.1rem;
    background-repeat: no-repeat;
  }

  /* 중요! */
  /* 해시태그 입력 컨테이너 (width값에 따라서 해시태그 사용자 경험 달라짐 )*/
  /* 이 width값이 크면, 사용자 입장에서는 몇글자 입력 안했는데, 해시태그가 아래 라인에 생김 */
  .hashtag-input-container {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }
  .hashtag-hash,
  .hashtag-input {
    color: var(--blue-primary);
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.2rem;
    flex-shrink: 0; /* # 기호는 고정 크기 */
  }
  .hashtag-input {
    width: 1rem;
    min-width: 1rem;
  }
  .hashtag-input::placeholder {
    color: #9ca3af;
  }
  .hashtag-placeholder {
    color: #9ca3af;
    font-size: 14px;
    cursor: pointer;
    padding: 2px 4px;
  }
  .hashtag-placeholder:hover {
    color: #6b7280;
  }
}

/* 별점 섹션 */
.star-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 2.4rem 2rem 0;
  padding: 1.5rem;
  border-radius: 0.8rem;
  border: 0.1rem solid #eee;
}
.star-header {
  position: relative;
  .star-title {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.2rem;
    color: #555;
    text-align: center;
  }
  .star-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 1.6rem;
    height: 1.6rem;
    background-size: 1.6rem;
    background-repeat: no-repeat;
  }
}
.star-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}
.star-rating {
  display: flex;
  gap: 0.8rem;
}
.star-wrapper {
  position: relative;
  cursor: pointer;
  user-select: none;
}
.star-bg {
  width: 3.2rem;
  height: 3.2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cpath d='M15.8268 3.6185C16.1022 3.06044 16.898 3.06044 17.1734 3.6185L20.7387 10.8427C20.8481 11.0643 21.0595 11.2179 21.3041 11.2534L29.2764 12.4119C29.8923 12.5013 30.1382 13.2582 29.6926 13.6926L23.9237 19.3158C23.7467 19.4883 23.666 19.7368 23.7078 19.9804L25.0696 27.9205C25.1748 28.5339 24.531 29.0016 23.9802 28.712L16.8495 24.9632C16.6308 24.8482 16.3694 24.8482 16.1507 24.9632L9.02002 28.712C8.46918 29.0016 7.82538 28.5339 7.93059 27.9205L9.29242 19.9804C9.3342 19.7368 9.25345 19.4883 9.07648 19.3158L3.30764 13.6926C2.86201 13.2582 3.10792 12.5013 3.72377 12.4119L11.6961 11.2534C11.9407 11.2179 12.1521 11.0643 12.2615 10.8427L15.8268 3.6185Z' fill='%23F4F4F4' stroke='%23E2E2E2' stroke-linejoin='round'/%3E%3C/svg%3E");
}
.star-fill {
  width: 3.2rem;
  height: 3.2rem;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cpath d='M15.8268 3.6185C16.1022 3.06044 16.898 3.06044 17.1734 3.6185L20.7387 10.8427C20.8481 11.0643 21.0595 11.2179 21.3041 11.2534L29.2764 12.4119C29.8923 12.5013 30.1382 13.2582 29.6926 13.6926L23.9237 19.3158C23.7467 19.4883 23.666 19.7368 23.7078 19.9804L25.0696 27.9205C25.1748 28.5339 24.531 29.0016 23.9802 28.712L16.8495 24.9632C16.6308 24.8482 16.3694 24.8482 16.1507 24.9632L9.02002 28.712C8.46918 29.0016 7.82538 28.5339 7.93059 27.9205L9.29242 19.9804C9.3342 19.7368 9.25345 19.4883 9.07648 19.3158L3.30764 13.6926C2.86201 13.2582 3.10792 12.5013 3.72377 12.4119L11.6961 11.2534C11.9407 11.2179 12.1521 11.0643 12.2615 10.8427L15.8268 3.6185Z' fill='%23FCD233' stroke='%23FBC700' stroke-linejoin='round'/%3E%3C/svg%3E");
  overflow: hidden;
  transition: width 0.1s ease;
}
.star-score {
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.6rem;
}

/* 건강 데이터 섹션 */
.health-section {
  margin: 2rem;
  margin-bottom: 0;
  padding: 16px;
  background: #f0f9ff;
  border-radius: 8px;
  border: 1px solid #e0f2fe;
}

.health-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.health-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0 auto;
}

.health-close {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.health-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.health-placeholder {
  color: #6b7280;
  font-size: 14px;
  text-align: center;
  margin: 0;
  padding: 20px;
}

.hidden {
  display: none;
}

/* 이미지 섹션 */
.image-sidebar {
  margin-top: 1.8rem;
  overflow: visible;
  width: 100%;
  height: fit-content;
}

.image-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
}

.image-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.image-wrapper {
  position: relative;
  overflow: visible;
  background: #fff;
  width: 100%;
  border: 0.1rem solid #eee;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-delete-btn {
  position: absolute;
  top: -0.6rem;
  right: -0.6rem;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #4f5561
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M12 6L6 12M12 12L6 6' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")
    center / 1.8rem no-repeat;
  border-radius: 50%;
}

.image-container {
  display: flex;
  gap: 1.2rem;
  width: 100%;
  padding-top: 0.6rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: none;
  }
}

.image-item {
  flex: 1;
  flex-shrink: 0;
  max-width: 8rem;
  height: 8rem;
  aspect-ratio: 1;
  &:first-child {
    margin-left: 2rem;
  }
  &:last-child {
    margin-right: 2rem;
  }
}

.image-item .image-wrapper {
  height: 100%;
  border-radius: 0.8rem;
}
.image-item .uploaded-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 0.8rem;
}

.image-limit-notice {
  margin-top: 8px;
  padding: 6px 8px;
  background: #fef3cd;
  border: 1px solid #fde68a;
  border-radius: 4px;
  text-align: center;
}

.limit-text {
  color: #92400e;
  font-size: 12px;
  margin: 0;
  font-weight: 500;
}

/* Swiper 가로 스크롤 커스텀 스타일 */
:deep(.swiper-pagination) {
  bottom: 5px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: auto !important;
  text-align: center;
}

:deep(.swiper-pagination-bullet) {
  background: #6b7280;
  opacity: 0.5;
  margin: 0 4px !important;
  width: 8px;
  height: 8px;
}

:deep(.swiper-pagination-bullet-active) {
  background: #3b82f6;
  opacity: 1;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #3b82f6 !important;
  width: 24px !important;
  height: 24px !important;
  margin-top: 0 !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  background: rgba(255, 255, 255, 0.9) !important;
  border-radius: 50% !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 14px !important;
  font-weight: bold !important;
}

:deep(.swiper-button-next) {
  right: 8px !important;
}

:deep(.swiper-button-prev) {
  left: 8px !important;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(255, 255, 255, 1) !important;
  transform: translateY(-50%) scale(1.1) !important;
}

/* 스크롤바 스타일 */
:deep(.swiper-scrollbar) {
  background: rgba(0, 0, 0, 0.1) !important;
  border-radius: 10px !important;
  bottom: 25px !important;
  height: 4px !important;
}

:deep(.swiper-scrollbar-drag) {
  background: #3b82f6 !important;
  border-radius: 10px !important;
}

/* ================================ */
/* 📱 모바일 반응형 스타일 */
/* ================================ */

/* 태블릿 크기 (768px 이하) */
// @media (max-width: 768px) {
//   /* 에디터 콘텐츠를 세로 배치 */
//   .editor-content-wrapper {
//     flex-direction: column;
//   }

//   /* 이미지 사이드바 조정 */
//   .image-sidebar {
//     margin-top: 16px;
//     max-height: 220px;
//   }

//   /* 업로드된 이미지 크기 조정 */
//   .uploaded-image {
//     height: 80px;
//   }

//   /* 정적 이미지 아이템 크기 조정 */
//   .static-image-item {
//     flex: 0 0 45%; /* 모바일에서는 45% 너비 */
//     min-width: 80px;
//     max-width: 120px;
//   }

//   /* 이미지 간격 줄이기 */
//   .static-image-container {
//     gap: 8px;
//   }

//   :deep(.swiper-button-next),
//   :deep(.swiper-button-prev) {
//     width: 20px !important;
//     height: 20px !important;
//   }

//   :deep(.swiper-button-next:after),
//   :deep(.swiper-button-prev:after) {
//     font-size: 12px !important;
//   }
// }

// /* 모바일 크기 (640px 이하) */
// @media (max-width: 640px) {
//   /* 이미지 사이드바 더 작게 조정 */
//   .image-sidebar {
//     padding: 12px;
//     max-height: 180px;
//   }

//   /* 이미지 제목 더 작게 */
//   .image-title {
//     font-size: 12px;
//   }

//   /* 업로드된 이미지 더 작게 */
//   .uploaded-image {
//     height: 60px;
//   }

//   /* 정적 이미지 아이템 더 작게 */
//   .static-image-item {
//     flex: 0 0 40%; /* 작은 모바일에서는 40% 너비 */
//     min-width: 60px;
//     max-width: 90px;
//   }

//   /* 이미지 간격 더 줄이기 */
//   .static-image-container {
//     gap: 6px;
//   }
// }
</style>
