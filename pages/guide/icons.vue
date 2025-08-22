<template>
  <div class="icons-guide">
    <div class="guide-header">
      <h1>아이콘 가이드</h1>
      <p>프로젝트에서 사용 가능한 모든 아이콘들을 확인할 수 있습니다.</p>
    </div>

    <!-- 기본 아이콘 -->
    <section class="icon-section">
      <h2>기본 아이콘</h2>
      <div class="icon-list">
        <div v-for="icon in basicIcons" :key="icon.class" class="icon-item">
          <div class="icon-display">
            <i :class="icon.class" aria-hidden="true"></i>
          </div>
          <div class="icon-label">
            <div class="icon-name">{{ icon.name }}</div>
            <div class="icon-class" @click="copyToClipboard(icon.class)" :title="'클릭하여 복사: ' + icon.class">
              {{ icon.class }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 의료 관련 아이콘 -->
    <section class="icon-section">
      <h2>의료 관련 아이콘</h2>
      <div class="icon-list">
        <div v-for="icon in medicalIcons" :key="icon.class" class="icon-item">
          <div class="icon-display">
            <i :class="icon.class" aria-hidden="true"></i>
          </div>
          <div class="icon-label">
            <div class="icon-name">{{ icon.name }}</div>
            <div class="icon-class" @click="copyToClipboard(icon.class)" :title="'클릭하여 복사: ' + icon.class">
              {{ icon.class }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 검사 관련 아이콘 -->
    <section class="icon-section">
      <h2>검사 관련 아이콘</h2>
      <div class="icon-list">
        <div v-for="icon in testIcons" :key="icon.class" class="icon-item">
          <div class="icon-display">
            <i :class="icon.class" aria-hidden="true"></i>
          </div>
          <div class="icon-label">
            <div class="icon-name">{{ icon.name }}</div>
            <div class="icon-class" @click="copyToClipboard(icon.class)" :title="'클릭하여 복사: ' + icon.class">
              {{ icon.class }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- UI 관련 아이콘 -->
    <section class="icon-section">
      <h2>UI 관련 아이콘</h2>
      <div class="icon-list">
        <div v-for="icon in uiIcons" :key="icon.class" class="icon-item">
          <div class="icon-display">
            <i :class="icon.class" aria-hidden="true"></i>
          </div>
          <div class="icon-label">
            <div class="icon-name">{{ icon.name }}</div>
            <div class="icon-class" @click="copyToClipboard(icon.class)" :title="'클릭하여 복사: ' + icon.class">
              {{ icon.class }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 결제 관련 아이콘 -->
    <section class="icon-section">
      <h2>결제 관련 아이콘</h2>
      <div class="icon-list">
        <div v-for="icon in paymentIcons" :key="icon.class" class="icon-item">
          <div class="icon-display">
            <i :class="icon.class" aria-hidden="true"></i>
          </div>
          <div class="icon-label">
            <div class="icon-name">{{ icon.name }}</div>
            <div class="icon-class" @click="copyToClipboard(icon.class)" :title="'클릭하여 복사: ' + icon.class">
              {{ icon.class }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 하단 네비게이션 아이콘 -->
    <section class="icon-section">
      <h2>하단 네비게이션 아이콘</h2>
      <div class="icon-list">
        <div v-for="icon in bottomNavIcons" :key="icon.class" class="icon-item">
          <div class="icon-display">
            <div :class="icon.class" aria-hidden="true"></div>
          </div>
          <div class="icon-label">
            <div class="icon-name">{{ icon.name }}</div>
            <div class="icon-class" @click="copyToClipboard(icon.class)" :title="'클릭하여 복사: ' + icon.class">
              {{ icon.class }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 이모지 아이콘 -->
    <section class="icon-section">
      <h2>이모지 아이콘</h2>
      <div class="icon-list">
        <div v-for="icon in emojiIcons" :key="icon.class" class="icon-item">
          <div class="icon-display">
            <div :class="icon.class" aria-hidden="true"></div>
          </div>
          <div class="icon-label">
            <div class="icon-name">{{ icon.name }}</div>
            <div class="icon-class" @click="copyToClipboard(icon.class)" :title="'클릭하여 복사: ' + icon.class">
              {{ icon.class }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 복사 기능
const copyToClipboard = async text => {
  try {
    await navigator.clipboard.writeText(text)
    // 복사 성공 피드백
    showCopyFeedback(text)
  } catch (err) {
    console.error('클립보드 복사 실패:', err)
    // 폴백: 구식 복사 방법
    fallbackCopyTextToClipboard(text)
  }
}

// 폴백 복사 방법
const fallbackCopyTextToClipboard = text => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand('copy')
    showCopyFeedback(text)
  } catch (err) {
    console.error('폴백 복사 실패:', err)
  }

  document.body.removeChild(textArea)
}

// 복사 피드백 표시
const showCopyFeedback = text => {
  // 간단한 토스트 메시지 생성
  const toast = document.createElement('div')
  toast.textContent = `복사됨: ${text}`
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4caf50;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease;
  `

  // 애니메이션 CSS 추가
  const style = document.createElement('style')
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `
  document.head.appendChild(style)

  document.body.appendChild(toast)

  // 3초 후 제거
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease'
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}

const basicIcons = [
  { class: 'icon back', name: '뒤로가기' },
  { class: 'icon ico-notice', name: '공지사항' },
  { class: 'icon ico-reward', name: '리워드' },
  { class: 'icon check-icon', name: '체크' },
  { class: 'icon arrow-down-type', name: '화살표 아래' },
  { class: 'icon arrow-type', name: '화살표' },
  { class: 'icon arrow-type-black', name: '화살표 검정' },
  { class: 'icon close', name: '닫기' },
  { class: 'icon app-data-transfer', name: '앱 데이터 전송' },
  { class: 'icon ico-magnifying-glass', name: '돋보기' },
  { class: 'icon ico-info', name: '정보' },
  { class: 'icon ico-info2', name: '정보2' },
  { class: 'icon ico-info3', name: '정보3' },
  { class: 'icon ico-refresh', name: '새로고침' },
  { class: 'icon ico-photo', name: '사진' },
  { class: 'icon ico-image', name: '이미지' },
  { class: 'icon ico-modify', name: '수정' },
  { class: 'icon ico-edit', name: '편집' },
  { class: 'icon ico-plus', name: '플러스' },
  { class: 'icon ico-plus-lg', name: '플러스 큰' },
  { class: 'icon ico-decline', name: '거절' },
  { class: 'icon ico-access', name: '접근' },
  { class: 'icon ico-complement', name: '보완' },
  { class: 'icon ico-chat', name: '채팅' },
  { class: 'icon ico-scrap', name: '스크랩' },
  { class: 'icon ico-share', name: '공유' },
  { class: 'icon ico-menu', name: '메뉴' },
  { class: 'icon ico-search', name: '검색' },
  { class: 'icon ico-setting', name: '설정' },
  { class: 'icon ico-ribbon', name: '리본' },
  { class: 'icon ico-bell-color', name: '벨 컬러' },
  { class: 'icon ico-bell-on', name: '벨 켜짐' },
  { class: 'icon ico-bell-off', name: '벨 꺼짐' },
  { class: 'icon ico-shoe', name: '신발' },
  { class: 'icon ico-shoe-green', name: '신발 초록' },
  { class: 'icon ico-member', name: '멤버' },
  { class: 'icon ico-question', name: '질문' },
  { class: 'icon ico-write', name: '글쓰기' },
  { class: 'icon ico-head-write', name: '헤더 글쓰기' },
  { class: 'icon ico-profile', name: '프로필' },
  { class: 'icon ico-float-write', name: '플로팅 글쓰기' },
  { class: 'icon ico-gift', name: '선물' },
  { class: 'icon ico-message', name: '메시지' },
  { class: 'icon ico-group', name: '그룹' },
  { class: 'icon ico-cheer', name: '응원' },
  { class: 'icon ico-congrats', name: '축하' },
  { class: 'icon ico-thanks', name: '감사' },
  { class: 'icon ico-sadness', name: '슬픔' },
  { class: 'icon ico-comfort', name: '위로' },
  { class: 'icon ico-coffee', name: '커피' },
  { class: 'icon ico-team', name: '팀' },
  { class: 'icon ico-tel', name: '전화' },
  { class: 'icon ico-rating', name: '평점' },
  { class: 'icon ico-heart-beep', name: '하트 비프' },
  { class: 'icon ico-oxygen', name: '산소' },
  { class: 'icon ico-stress', name: '스트레스' },
  { class: 'icon ico-variability', name: '가변성' },
  { class: 'icon ico-cheer-up', name: '응원' },
  { class: 'icon ico-today-post', name: '오늘 게시글' },
  { class: 'icon ico-fire', name: '불' },
  { class: 'icon ico-video', name: '비디오' },
  { class: 'icon ico-ai-search', name: 'AI 검색' },
  { class: 'icon ico-ai', name: 'AI' },
  { class: 'icon ico-sleep', name: '수면' },
  { class: 'icon ico-temperature', name: '온도' },
  { class: 'icon ico-data', name: '데이터' },
  { class: 'icon ico-bluetooth', name: '블루투스' },
  { class: 'icon ico-loaction', name: '위치' },
  { class: 'icon icon-more-general', name: '더보기 일반' },
  { class: 'icon ico-right', name: '오른쪽' },
  { class: 'icon ico-document', name: '문서' },
  { class: 'icon ico-sun', name: '태양' },
  { class: 'icon ico-apple', name: '사과' },
  { class: 'icon ico-sunset', name: '일몰' },
  { class: 'icon ico-crescent', name: '초승달' },
  { class: 'icon ico-bat', name: '박쥐' },
  { class: 'icon ico-kakao', name: '카카오' },
  { class: 'icon ico-link', name: '링크' },
  { class: 'icon ico-arrow-right', name: '오른쪽 화살표' },
  { class: 'icon ico-greater-than', name: '더 큰 기호' },
  { class: 'icon ico-attach', name: '첨부' },
  { class: 'icon ico-empty', name: '빈 상태' },
  { class: 'icon ico-card', name: '카드' },
  { class: 'icon ico-naver', name: '네이버' },
  { class: 'icon ico-clear-btn', name: '지우기 버튼' },
  { class: 'icon ico-modal-close-btn', name: '모달 닫기 버튼' },
  { class: 'icon ico-health-god-icon', name: '건강의신 로고' }
]

const medicalIcons = [
  { class: 'icon ico-xray', name: 'X-ray (방사선)' },
  { class: 'icon ico-ct', name: 'CT (컴퓨터단층촬영)' },
  { class: 'icon ico-mri', name: 'MRI (자기공명영상)' },
  { class: 'icon ico-ultrasound', name: '초음파' },
  { class: 'icon ico-internal', name: '내과' },
  { class: 'icon ico-surgery', name: '외과' },
  { class: 'icon ico-radiology', name: '영상의학과' },
  { class: 'icon ico-orthopedics', name: '정형외과' },
  { class: 'icon ico-cardiology', name: '심장내과' },
  { class: 'icon ico-neurology', name: '신경과' },
  { class: 'icon ico-hospital', name: '병원' }
]

const testIcons = [
  { class: 'icon ico-blood-test', name: '혈액검사' },
  { class: 'icon ico-urine-test', name: '소변검사' },
  { class: 'icon ico-oxygen', name: '산소' },
  { class: 'icon ico-stress', name: '스트레스' },
  { class: 'icon ico-variability', name: '가변성' },
  { class: 'icon ico-sleep', name: '수면' },
  { class: 'icon ico-temperature', name: '온도' }
]

const uiIcons = [
  { class: 'icon ico-arrow-right', name: '오른쪽 화살표' },
  { class: 'icon ico-greater-than', name: '더 큰 기호' },
  { class: 'icon ico-check-circle', name: '체크 원형' },
  { class: 'icon ico-download', name: '다운로드' },
  { class: 'icon ico-report', name: '리포트' },
  { class: 'icon ico-search-empty', name: '검색 없음' },
  { class: 'icon ico-back', name: '뒤로가기' },
  { class: 'icon ico-close', name: '닫기' },
  { class: 'icon ico-plus', name: '플러스' },
  { class: 'icon ico-edit', name: '편집' },
  { class: 'icon ico-setting', name: '설정' },
  { class: 'icon ico-search', name: '검색' },
  { class: 'icon ico-menu', name: '메뉴' },
  { class: 'icon ico-info', name: '정보' },
  { class: 'icon ico-question', name: '질문' },
  { class: 'icon ico-notice', name: '공지사항' },
  { class: 'icon ico-refresh', name: '새로고침' },
  { class: 'icon ico-photo', name: '사진' },
  { class: 'icon ico-image', name: '이미지' },
  { class: 'icon ico-chat', name: '채팅' },
  { class: 'icon ico-scrap', name: '스크랩' },
  { class: 'icon ico-share', name: '공유' },
  { class: 'icon ico-bell-color', name: '벨 컬러' },
  { class: 'icon ico-bell-on', name: '벨 켜짐' },
  { class: 'icon ico-bell-off', name: '벨 꺼짐' },
  { class: 'icon ico-ribbon', name: '리본' },
  { class: 'icon ico-gift', name: '선물' },
  { class: 'icon ico-message', name: '메시지' },
  { class: 'icon ico-group', name: '그룹' },
  { class: 'icon ico-team', name: '팀' },
  { class: 'icon ico-member', name: '멤버' },
  { class: 'icon ico-shoe', name: '신발' },
  { class: 'icon ico-shoe-green', name: '신발 초록' },
  { class: 'icon ico-arrow-down-type', name: '화살표 아래' },
  { class: 'icon ico-arrow-type', name: '화살표' },
  { class: 'icon ico-arrow-type-black', name: '화살표 검정' },
  { class: 'icon ico-right', name: '오른쪽' },
  { class: 'icon ico-link', name: '링크' },
  { class: 'icon ico-magnifying-glass', name: '돋보기' },
  { class: 'icon ico-modify', name: '수정' },
  { class: 'icon ico-plus-lg', name: '플러스 큰' },
  { class: 'icon ico-decline', name: '거절' },
  { class: 'icon ico-access', name: '접근' },
  { class: 'icon ico-complement', name: '보완' },
  { class: 'icon ico-check-icon', name: '체크' },
  { class: 'icon ico-reward', name: '리워드' },
  { class: 'icon ico-app-data-transfer', name: '앱 데이터 전송' },
  { class: 'icon ico-info2', name: '정보2' },
  { class: 'icon ico-info3', name: '정보3' },
  { class: 'icon ico-write', name: '글쓰기' },
  { class: 'icon ico-head-write', name: '헤더 글쓰기' },
  { class: 'icon ico-profile', name: '프로필' },
  { class: 'icon ico-float-write', name: '플로팅 글쓰기' },
  { class: 'icon ico-cheer', name: '응원' },
  { class: 'icon ico-congrats', name: '축하' },
  { class: 'icon ico-thanks', name: '감사' },
  { class: 'icon ico-sadness', name: '슬픔' },
  { class: 'icon ico-comfort', name: '위로' },
  { class: 'icon ico-coffee', name: '커피' },
  { class: 'icon icon-photo', name: '사진' },
  { class: 'icon icon-hashtag', name: '해시태그' },
  { class: 'icon ico-tel', name: '전화' },
  { class: 'icon icon-rating', name: '평점' },
  { class: 'icon heart-beep-bw', name: '하트 비프 흑백' },
  { class: 'icon ico-heart-beep', name: '하트 비프' },
  { class: 'icon ico-cheer-up', name: '응원' },
  { class: 'icon ico-today-post', name: '오늘 게시글' },
  { class: 'icon ico-fire', name: '불' },
  { class: 'icon ico-video', name: '비디오' },
  { class: 'icon ico-ai-search', name: 'AI 검색' },
  { class: 'icon ico-ai', name: 'AI' },
  { class: 'icon ico-data', name: '데이터' },
  { class: 'icon ico-bluetooth', name: '블루투스' },
  { class: 'icon ico-loaction', name: '위치' },
  { class: 'icon icon-more-general', name: '더보기 일반' },
  { class: 'icon ico-document', name: '문서' },
  { class: 'icon ico-sun', name: '태양' },
  { class: 'icon ico-apple', name: '사과' },
  { class: 'icon ico-sunset', name: '일몰' },
  { class: 'icon ico-crescent', name: '초승달' },
  { class: 'icon ico-bat', name: '박쥐' },
  { class: 'icon ico-kakao', name: '카카오' },
  { class: 'icon ico-share', name: '공유' }
]

const paymentIcons = [
  { class: 'icon ico-credit-card', name: '신용카드' },
  { class: 'icon ico-bank-transfer', name: '계좌이체' },
  { class: 'icon ico-check-circle', name: '체크 원형' },
  { class: 'icon ico-download', name: '다운로드' },
  { class: 'icon ico-report', name: '리포트' }
]

const bottomNavIcons = [
  { class: 'bottom-navi c-home', name: '홈' },
  { class: 'bottom-navi c-walkiing-king', name: '걷기왕' },
  { class: 'bottom-navi c-community', name: '커뮤니티' },
  { class: 'bottom-navi c-claim-god', name: '청구의 신' },
  { class: 'bottom-navi c-whole-menu', name: '전체 메뉴' }
]

const emojiIcons = [
  { class: 'emoji excellent', name: '훌륭함' },
  { class: 'emoji good', name: '좋음' },
  { class: 'emoji bad', name: '나쁨' },
  { class: 'emoji normal', name: '보통' },
  { class: 'emoji dislike', name: '싫음' },
  { class: 'emoji sleep', name: '수면' },
  { class: 'emoji cheerup', name: '응원' },
  { class: 'emoji celebrate', name: '축하' },
  { class: 'emoji diary', name: '일기' },
  { class: 'emoji more', name: '더보기' },
  { class: 'emoji thrilled', name: '신남' },
  { class: 'emoji sad', name: '슬픔' },
  { class: 'emoji upset', name: '속상' },
  { class: 'emoji angry', name: '화남' },
  { class: 'emoji ruined', name: '망함' },
  { class: 'emoji annoyed', name: '짜증' },
  { class: 'emoji indifferent', name: '덤덤' },
  { class: 'emoji flustered', name: '당황' },
  { class: 'emoji frustrated', name: '답답' },
  { class: 'emoji excited', name: '설렘' },
  { class: 'emoji hurt', name: '아파' },
  { class: 'emoji embarrassed', name: '창피' },
  { class: 'emoji peaceful', name: '평온' },
  { class: 'emoji worry', name: '걱정' },
  { class: 'emoji surprise', name: '놀람' },
  { class: 'emoji fun', name: '재미' },
  { class: 'emoji shocked', name: '헐' },
  { class: 'emoji happy', name: '행복' },
  { class: 'emoji cheer', name: '응원' },
  { class: 'emoji congrats', name: '축하' },
  { class: 'emoji touched', name: '감동' },
  { class: 'emoji dizzy', name: '저혈압' },
  { class: 'emoji tired', name: '데이터없음' },
  { class: 'emoji blank', name: '미도래' }
]
</script>

<style scoped>
.icons-guide {
  padding: 32px 16px;
}

.guide-header {
  text-align: center;
  margin-bottom: 48px;
}

.guide-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2b2b2b;
  margin-bottom: 16px;
}

.guide-header p {
  color: #666;
  line-height: 1.6;
}

.icon-section {
  margin-bottom: 48px;
}

.icon-section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e5e5;
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  background: #fff;
  transition: all 0.2s ease;
}

.icon-item:hover {
  border-color: #4c7ff7;
  box-shadow: 0 4px 12px rgba(76, 127, 247, 0.1);
  transform: translateY(-2px);
}

.icon-display {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.icon-display i,
.icon-display div {
  width: 32px;
  height: 32px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-label {
  text-align: center;
  width: 100%;
}

.icon-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 8px;
  line-height: 1.4;
}

.icon-class {
  font-size: 1.4rem;
  color: #666;
  font-family: 'Courier New', monospace;
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 6px;
  word-break: break-all;
  line-height: 1.3;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.icon-class:hover {
  background-color: #e3f2fd;
  color: #1976d2;
  border-color: #2196f3;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
}

.icon-class:active {
  background-color: #bbdefb;
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(33, 150, 243, 0.3);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .icons-guide {
    padding: 24px 12px;
  }

  .guide-header h1 {
    font-size: 2rem;
  }

  .icon-section h2 {
    font-size: 1.5rem;
  }

  .icon-list {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }

  .icon-item {
    padding: 16px;
  }

  .icon-display {
    width: 48px;
    height: 48px;
  }

  .icon-display i,
  .icon-display div {
    width: 24px;
    height: 24px;
  }
}

@media (max-width: 480px) {
  .icon-list {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }

  .icon-item {
    padding: 12px;
  }
}
</style>
