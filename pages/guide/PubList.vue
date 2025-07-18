<template>
  <div class="pub-list-container">
    <div class="list-header">
      <h2>퍼블리싱 화면 목록</h2>
      <div class="list-stats">
        <span class="total-count">총 {{ filteredBySection.length }}개 화면</span>
        <span class="completed-count">완료: {{ completedPagesInSection.length }}개</span>
      </div>
    </div>

    <div class="filter-section">
      <!-- 섹션 탭을 BoxedTabs로 교체 -->
      <div class="section-tabs-wrapper">
        <h3 class="filter-title">섹션 필터</h3>
        <BoxedTabs
          :tabs="sectionTabs"
          :active-key="currentSection"
          variant="fill-type"
          @tab-change="handleSectionChange"
        />
      </div>

      <!-- 상태 필터를 BoxedTabs로 교체 -->
      <div class="status-tabs-wrapper">
        <h3 class="filter-title">상태 필터</h3>
        <BoxedTabs
          :tabs="statusTabs"
          :active-key="currentFilter"
          variant="line-type"
          @tab-change="handleStatusChange"
        />
      </div>
    </div>

    <div class="page-list">
      <div
        v-for="page in filteredPages"
        :key="page.id"
        class="page-item"
        :class="`status-${getStatusForClass(page.status)}`"
      >
        <div class="page-info">
          <div class="page-header">
            <h3 class="page-title">{{ page.title }}</h3>
            <span class="status-badge" :class="`badge-${getStatusForClass(page.status)}`">
              {{ getStatusText(page.status) }}
            </span>
          </div>
          <p class="page-description">{{ page.description }}</p>
          <div class="page-meta">
            <span class="page-path">경로: {{ page.path }}</span>
            <span class="page-category">카테고리: {{ page.category }}</span>
            <span class="page-section">섹션: {{ getSectionText(page.section) }}</span>
          </div>
        </div>
        <div class="page-actions">
          <NuxtLink
            v-if="
              (page.path && (page.status === 'completed' || !page.status || page.status === '')) ||
              page.status === 'ing'
            "
            :to="page.path"
            class="view-btn"
          >
            보기
          </NuxtLink>
          <button v-else class="view-btn disabled" disabled>준비중</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import BoxedTabs from '~/components/tabbar/BoxedTabs.vue'

interface PageItemData {
  title: string
  description: string
  path: string
  category: string
  section:
    | 'insu'
    | 'walkingKing'
    | 'login'
    | 'signup'
    | 'findId'
    | 'findPassword'
    | 'setProfile'
    | 'wholeMenu'
    | 'commonProfile'
    | 'DirectMessage'
    | 'pointStore'
    | 'setting'
    | 'community'
    | 'common'
    | 'dashboard'
    | 'payment'
    | 'guide'
    | 'lottery'
    | 'smartRing'
  status?: 'completed' | 'ing' | 'pending' | '' | undefined // status를 optional로 만들고 빈 문자열 및 undefined 허용
}

interface PageItem extends PageItemData {
  id: number
}

const currentFilter = ref<string>('all')
const currentSection = ref<string>('all')

// BoxedTabs를 위한 섹션 탭 데이터
const sectionTabs = [
  { title: '전체', key: 'all' },
  { title: '보험 (청구의신)', key: 'insu' },
  { title: '걷기왕', key: 'walkingKing' },
  { title: '로그인', key: 'login' },
  { title: '회원가입', key: 'signup' },
  { title: '아이디찾기', key: 'findId' },
  { title: '비밀번호찾기', key: 'findPassword' },
  { title: '프로필설정', key: 'setProfile' },
  { title: '전체메뉴', key: 'wholeMenu' },
  { title: '회원프로필 ', key: 'commonProfile' },
  { title: '설정', key: 'setting' },
  { title: '설정', key: 'setting' },
  { title: 'DM', key: 'DirectMessage' },
  { title: '커뮤니티', key: 'community' },
  { title: '공통', key: 'common' },
  { title: '대시보드', key: 'dashboard' },
  { title: '결제', key: 'payment' },
  { title: '포인트스토어', key: 'pointStore' },
  { title: '가이드', key: 'guide' },
  { title: '리워드보관함', key: 'lottery' },
  { title: '스마트링', key: 'smartRing' }
]

// BoxedTabs를 위한 상태 탭 데이터
const statusTabs = [
  { title: '전체', key: 'all' },
  { title: '완료', key: 'completed' },
  { title: '진행중', key: 'ing' },
  { title: '대기', key: 'pending' }
]

// 섹션 탭 변경 핸들러
const handleSectionChange = (key: string) => {
  currentSection.value = key
  // 섹션이 변경되면 필터를 전체로 리셋
  currentFilter.value = 'all'
}

// 상태 탭 변경 핸들러
const handleStatusChange = (key: string) => {
  currentFilter.value = key
}

// ID 없이 페이지 데이터 정의
const pageListData: PageItemData[] = [
  // 공통 페이지
  {
    title: '메인 홈',
    description: '건강의신 메인 홈 화면',
    path: '/common/home',
    category: '메인',
    section: 'common',
    status: ''
  },
  {
    title: '공지사항 목록',
    description: '공지사항 목록 화면',
    path: '/common/customerCenter/noticeIndex',
    category: '고객센터',
    section: 'common',
    status: ''
  },
  {
    title: '공지사항 목록 없음',
    description: '공지사항 없는 목록 화면',
    path: '/common/customerCenter/emptyNoticeIndex',
    category: '고객센터',
    section: 'common',
    status: ''
  },
  {
    title: '공지사항 상세',
    description: '공지사항 상세 화면',
    path: '/common/customerCenter/noticeDetail',
    category: '고객센터',
    section: 'common',
    status: ''
  },
  {
    title: '자주 묻는 질문 목록',
    description: '자주 묻는 질문 목록 화면',
    path: '/common/customerCenter/customerFaq',
    category: '고객센터',
    section: 'common',
    status: ''
  },
  {
    title: '1:1문의 목록',
    description: '1:1문의 목록 화면',
    path: '/common/customerCenter/inquiryIndex',
    category: '고객센터',
    section: 'common',
    status: ''
  },
  {
    title: '1:1문의 상세',
    description: '1:1문의 상세 화면',
    path: '/common/customerCenter/inquiryDetail',
    category: '고객센터',
    section: 'common',
    status: ''
  },
  {
    title: '1:1문의 작성',
    description: '1:1문의 작성 화면',
    path: '/common/customerCenter/inquiryRegister',
    category: '고객센터',
    section: 'common',
    status: ''
  },
  {
    title: '이벤트 목록',
    description: '이벤트 목록 화면',
    path: '/common/event',
    category: '이벤트',
    section: 'common',
    status: ''
  },
  {
    title: '이벤트 상세',
    description: '이벤트 상세 화면',
    path: '/common/event/detail',
    category: '이벤트',
    section: 'common',
    status: ''
  },

  // 대시보드
  {
    title: '걷기 통계',
    description: '걷기 통계 대시보드',
    path: '/common/dashboard/walkingStatistics',
    category: '대시보드',
    section: 'dashboard',
    status: ''
  },

  {
    title: '친구 랭킹/초대',
    description: '친구랭킹/초대 대시보드',
    path: '/common/dashboard/friendsRank',
    category: '대시보드',
    section: 'dashboard',
    status: ''
  },

  // 결제내역
  {
    title: '결제내역',
    description: '결제내역 리스트',
    path: '/common/payment',
    category: '결제내역',
    section: 'payment',
    status: ''
  },
  {
    title: '결제 상세내역',
    description: '결제 상세내역 페이지',
    path: '/common/payment/[id]',
    category: '결제내역',
    section: 'payment',
    status: ''
  },

  // 친환경 캠페인
  {
    title: '친환경 캠페인',
    description: '친환경 캠페인 화면',
    path: '/common/campaign',
    category: '친환경 캠페인',
    section: 'common',
    status: ''
  },
  {
    title: '혜택',
    description: '혜택 - 레몬포인트 존',
    path: '/common/benefit',
    category: '혜택',
    section: 'common',
    status: ''
  },
  {
    title: '혜택',
    description: '혜택 - 출석체크',
    path: '/common/benefit/attendance',
    category: '혜택',
    section: 'common',
    status: ''
  },
  // 보험(청구의신) 섹션
  {
    title: '청구의신 홈',
    description: '보험청구 메인 화면',
    path: '/insu',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '입원비 청구안내',
    description: '입원비 청구안내',
    path: '/insu/claim/paymentInstructions',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: 'MY병원 등록',
    description: 'MY병원 등록',
    path: '/insu/claim/paperless/findHospitals',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: 'MY병원찾기 결과',
    description: 'MY병원찾기 결과',
    path: '/insu/claim/paperless/successFindHospitals',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '병원선택 통원',
    description: '통원',
    path: '/insu/claim/paperless/selectTreatmentHospital',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '병원선택 입원',
    description: '입원',
    path: '/insu/claim/paperless/selectHospitalization',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '병원선택(직접 병원 찾기)',
    description: '직접 병원 찾기',
    path: '/insu/claim/paperless/findSelfHospitals',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '주민등록번호 입력',
    description: '주민등록번호 입력',
    path: '/insu/claim/paperless/inputIdentification',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '보험사 선택',
    description: '보험사 선택',
    path: '/insu/claim/paperless/selectInsuranceCompany',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '최초청구 기본정보',
    description: '서류없이 찾기 - 주소 찾기',
    path: '/insu/claim/paperless/inputDefaultInfoData',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '주소검색',
    description: '주소찾기 공통',
    path: '/insu/claim/paperless/searchAddress',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사고내용(질병)',
    description: '사고(질병) 내용 입력',
    path: '/insu/claim/accidentDetailsDisease',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사고내용(상해)',
    description: '사고(내원) 내용 입력',
    path: '/insu/claim/paperless/accidentDetailsInjured1',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사고(상해)가 일어난 주소',
    description: '사고(상해)가 일어난 주소입력',
    path: '/insu/claim/paperless/accidentDetailsInjured2',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '진료내역 선택',
    description: '진료내역 선택(통원/입원)',
    path: '/insu/claim/medicalHistory',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '서류첨부',
    description: '서류첨부',
    path: '/insu/claim/paperless/attachClaimFiles',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '서류 발급 안내',
    description: '서류 발급 안내',
    path: '/insu/claim/paperless/guideCopyCertificateDoc',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '수익자 정보입력',
    description: '수익자 정보입력',
    path: '/insu/claim/paperless/beneficiaryInfo',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '청구내용',
    description: '청구내용',
    path: '/insu/claim/paperless/claimDetails',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '청구완료',
    description: '청구완료',
    path: '/insu/claim/paperless/claimCompleted',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 병원검색(직접 병원 찾기)',
    description: '사진찍어청구 - 병원검색(직접 병원 찾기)',
    path: '/insu/claim/picture/findSelfHospitals',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 주민등록번호 입력',
    description: '사진찍어청구 - 주민등록번호 입력',
    path: '/insu/claim/picture/inputIdentification',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 보험사 선택',
    description: '사진찍어청구 - 보험사 선택',
    path: '/insu/claim/picture/selectInsuranceCompany',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 최초청구 기본정보',
    description: '사진찍어청구 - 최초청구 기본정보',
    path: '/insu/claim/picture/inputDefaultInfoData',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 주소검색',
    description: '사진찍어청구 - 주소찾기 공통',
    path: '/insu/claim/picture/searchAddress',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 사고내용(상해)',
    description: '사진찍어청구 - 사고(내원) 내용 입력',
    path: '/insu/claim/picture/accidentDetailsInjured1',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 사고(상해)가 일어난 주소',
    description: '사진찍어청구 - 사고(상해)가 일어난 주소입력',
    path: '/insu/claim/picture/accidentDetailsInjured2',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 수익자 정보입력',
    description: '사진찍어청구 - 수익자 정보입력',
    path: '/insu/claim/picture/beneficiaryInfo',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 서류첨부',
    description: '사진찍어청구 - 서류첨부',
    path: '/insu/claim/picture/attachClaimFiles',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 청구내용',
    description: '사진찍어청구 - 청구내용',
    path: '/insu/claim/picture/claimDetails',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 팩스번호',
    description: '사진찍어청구 - 팩스번호',
    path: '/insu/claim/picture/claimFax',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '사진찍어청구 - 청구완료',
    description: '사진찍어청구 - 청구완료',
    path: '/insu/claim/picture/claimCompleted',
    category: '보험청구',
    section: 'insu',
    status: ''
  },
  {
    title: '서비스 안내',
    description: '서비스 안내',
    path: '/insu/claim/subrogation/serviceNotInUse/signupInfo',
    category: '보험금 대리청구 가입(설계사, 설계사 대리인)',
    section: 'insu',
    status: ''
  },
  {
    title: '약관보기',
    description: '약관보기',
    path: '/insu/claim/subrogation/serviceNotInUse/term',
    category: '보험금 대리청구 가입(설계사, 설계사 대리인)',
    section: 'insu',
    status: ''
  },
  {
    title: '서비스 가입(설계사)',
    description: '서비스 가입(설계사)',
    path: '/insu/claim/subrogation/serviceNotInUse/selectInsuranceCompany',
    category: '보험금 대리청구 가입(설계사, 설계사 대리인)',
    section: 'insu',
    status: ''
  },
  {
    title: '가입완료',
    description: '가입완료',
    path: '/insu/claim/subrogation/serviceNotInUse/successSubrogation',
    category: '보험금 대리청구 가입(설계사, 설계사 대리인)',
    section: 'insu',
    status: 'ing'
  },
  // 걷기왕 섹션
  {
    title: '걷기왕 홈',
    description: '걷기왕 메인 화면',
    path: '/walkingKing',
    category: '건강관리',
    section: 'walkingKing',
    status: 'ing'
  },
  {
    title: '챌린지 전체 - 개인',
    description: '챌린지 전체 화면',
    path: '/walkingKing/individualChallengeHomeType1',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: 'MY 챌린지 - 개인',
    description: '챌린지 MY 화면',
    path: '/walkingKing/individualChallengeHomeType1',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '챌린지 모집(참가전) - 개인',
    description: '챌린지 상세정보',
    path: '/walkingKing/individualChallengeRecruitmentType1',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '챌린지 모집(참가전) - 개인',
    description: '리워드 상품',
    path: '/walkingKing/individualChallengeRecruitmentType2',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '걷기왕챌린지_BS참가하기',
    description: '챌린지 참가하기',
    path: '/walkingKing/individualChallengeBSJoin',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '걷기왕챌린지_참가신청완료_Toast',
    description: '참가신청 완료',
    path: '/walkingKing/individualChallengeParticipantCompletion',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '챌린지 자세히보기 - 개인',
    description: '챌린지 자세히보기',
    path: '/walkingKing/individualChallengeDetail',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '챌린지 진행중(TOP30) - 개인',
    description: 'TOP30',
    path: '/walkingKing/individualChallengeInProgressType1',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '챌린지 진행중(MY랭킹) - 개인',
    description: 'MY랭킹',
    path: '/walkingKing/individualChallengeInProgressType2',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '챌린지 진행중(친구) - 개인',
    description: '친구',
    path: '/walkingKing/individualChallengeInProgressType3',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '챌린지 진행중(게임배너) - 개인',
    description: '게임배너',
    path: '/walkingKing/individualChallengeInProgressType4',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '챌린지 진행중(친구X) - 개인',
    description: '친구없음',
    path: '/walkingKing/individualChallengeInProgressType5',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '챌린지 종료 - 개인',
    description: '챌린지 종료',
    path: '/walkingKing/individualChallengeEnded',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '걷기왕챌린지_진행중_미션',
    description: '챌린지 미션',
    path: '/walkingKing/individualChallengeInProgressMission',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '걷기왕챌린지_진행중_일일걸음수내역',
    description: '일일걸음수내역',
    path: '/walkingKing/individualChallengeInProgressDailyWalkingCountList',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '걷기왕-챌린지-참가자프로필',
    description: '참가자프로필',
    path: '/walkingKing/individualChallengeParticipantProfile',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  // 걷기왕 챌린지 - 팀전
  {
    title: '걷기왕-챌린지-참가전-팀전',
    description: '챌린지 팀전',
    path: '/walkingKing/teamChallengeRecruitment',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '걷기왕-챌린지(팀전)-대회개요-친구초대하기',
    description: '친구 초대하기',
    path: '/walkingKing/teamChallengeInviteFriends',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '걷기왕-챌린지-참가전-팀전-초대랜딩',
    description: '초대랜딩',
    path: '/walkingKing/teamChallengeInviteLanding',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '걷기왕-챌린지-팀정보등록',
    description: '팀정보등록',
    path: '/walkingKing/teamChallengeTeamRegistration',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '걷기왕-챌린지-팀정보변경',
    description: '팀정보변경',
    path: '/walkingKing/teamChallengeTeamModification',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '걷기왕-챌린지-팀프로필',
    description: '팀정보변경',
    path: '/walkingKing/teamChallengeTeamProfile',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  {
    title: '걷기왕-챌린지-참가자프로필',
    description: '팀정보변경',
    path: '/walkingKing/teamChallengeParticipantProfile',
    category: '건강관리',
    section: 'walkingKing',
    status: ''
  },
  // login
  {
    title: '랜딩 페이지',
    description: '앱 소개 랜딩 페이지',
    path: '/common/login/appLanding',
    category: '로그인',
    section: 'login',
    status: '' // 빈 문자열로 변경 (completed로 표시됨)
  },
  {
    title: '로그인',
    description: '사용자 로그인 화면',
    path: '/common/login/',
    category: '로그인',
    section: 'login',
    status: ''
  },
  {
    title: '간편 가입 1단계',
    description: '간편 회원가입 1단계 화면',
    path: '/common/login/signupAccountinput',
    category: '로그인',
    section: 'login',
    status: ''
  },
  {
    title: '간편 가입 2단계',
    description: '간편 회원가입 2단계 화면',
    path: '/common/login/signupPhysicalInput',
    category: '로그인',
    section: 'login',
    status: ''
  },

  //회원가입
  {
    title: '서비스 제공 동의',
    description: '서비스 제공을위한 이용 동의 화면',
    path: '/common/signup/serviceAgree',
    category: '회원가입',
    section: 'signup',
    status: '' // 빈 문자열로 변경 (completed로 표시됨)
  },
  {
    title: '회원가입 약관화면',
    description: '약관 상세 모달창',
    path: '/common/signup/termsDetailModal',
    category: '회원가입',
    section: 'signup',
    status: '' // 빈 문자열로 변경 (completed로 표시됨)
  },
  {
    title: '본인인증 ',
    description: '회원가입 본인인증 작성화면',
    path: '/common/signup/signupAccountInput',
    category: '회원가입',
    section: 'signup',
    status: '' // 빈 문자열로 변경 (completed로 표시됨)
  },
  {
    title: '청구의 신 데이터 이관',
    description: '청구의 신 데이터 이관 동의',
    path: '/common/signup/dataFetchingAgree',
    category: '회원가입',
    section: 'signup',
    status: '' // 빈 문자열로 변경 (completed로 표시됨)
  },
  {
    title: '회원가입 계정정보',
    description: '회원가입 계정정보 작성화면',
    path: '/common/signup/signupAccountInput',
    category: '회원가입',
    section: 'signup',
    status: '' // 빈 문자열로 변경 (completed로 표시됨)
  },
  {
    title: '회원가입 신체정보',
    description: '회원가입 신체정보 입력화면',
    path: '/common/signup/signupPhysicalInput',
    category: '회원가입',
    section: 'signup',
    status: '' // 빈 문자열로 변경 (completed로 표시됨)
  },
  {
    title: '회원가입 생체인증 설정',
    description: '생체인증 설정 화면',
    path: '/common/signup/bioRegist',
    category: '회원가입',
    section: 'signup',
    status: '' // 빈 문자열로 변경 (completed로 표시됨)
  },
  {
    title: '회원가입 완료',
    description: '회원가입 완료',
    path: '/common/signup/signupSuccess',
    category: '회원가입',
    section: 'signup',
    status: '' // 빈 문자열로 변경 (completed로 표시됨)
  },

  // 아이디 비번 찾기
  {
    title: '아이디찾기 본인인증',
    description: '아이디찾기 본인인증',
    path: '/common/findId/selfCertiInfoInput',
    category: '아이디찾기',
    section: 'findId',
    status: ''
  },
  {
    title: '아이디찾기 완료',
    description: '아이디찾기 본인인증',
    path: '/common/findId/success',
    category: '아이디찾기 완료',
    section: 'findId',
    status: ''
  },
  {
    title: '아이디찾기 완료',
    description: '아이디찾기 본인인증 소셜로그인',
    path: '/common/findId/successSocial',
    category: '아이디찾기 소셜아이디 찾기 완료',
    section: 'findId',
    status: ''
  },
  {
    title: '비밀번호 본인인증',
    description: '비밀번호 본인인증 화면',
    path: '/common/findPassword/selfCertiInfoInput',
    category: '비밀번호 찾기',
    section: 'findPassword',
    status: ''
  },
  {
    title: '비밀번호 재설정',
    description: '비밀번호 재설정 화면',
    path: '/common/findPassword/reset',
    category: '비밀번호 리셋',
    section: 'findPassword',
    status: ''
  },
  {
    title: '비밀번호 완료',
    description: '비밀번호 찾기 완료 화면',
    path: '/common/findPassword/success',
    category: '비밀번호찾기 완료',
    section: 'findPassword',
    status: ''
  },

  // 프로필 설정
  {
    title: '프로필 설정 - 계정정보',
    description: '프로필설정 화면',
    path: '/common/setProfile/accountInfoInput',
    category: '프로필설정',
    section: 'setProfile',
    status: ''
  },
  {
    title: '프로필 설정 - 건강프로필',
    description: '건강프로필 화면',
    path: '/common/setProfile/healthInput',
    category: '프로필설정',
    section: 'setProfile',
    status: ''
  },
  {
    title: '프로필 설정 - 본인인증 정보 변경',
    description: '본인인증 정보 화면',
    path: '/common/setProfile/changeMyCertiInfo',
    category: '프로필설정',
    section: 'setProfile',
    status: ''
  },
  {
    title: '프로필 설정 - 비즈 프로필',
    description: '비즈 프로필 화면',
    path: '/common/setProfile/bizProfileInput',
    category: '프로필설정',
    section: 'setProfile',
    status: ''
  },

  // 전체 메뉴
  {
    title: '전체메뉴',
    description: '전체메뉴 화면',
    path: '/common/wholeMenu/',
    category: '전체메뉴',
    section: 'wholeMenu',
    status: ''
  },
  {
    title: '전체메뉴 검색화면',
    description: '검색 화면',
    path: '/common/wholeMenu/searchWholeMenu',
    category: '전체메뉴 검색',
    section: 'wholeMenu',
    status: ''
  },
  {
    title: '전체메뉴 알림리스트',
    description: '알림리스트 화면',
    path: '/common/wholeMenu/alarmList',
    category: '전체메뉴',
    section: 'wholeMenu',
    status: ''
  },
  //회원프로필
  {
    title: '회원프로필 ',
    description: '일반 회원프로필 화면',
    path: '/common/commonProfile/memberProfile',
    category: '회원프로필',
    section: 'commonProfile',
    status: ''
  },
  {
    title: '전문가 프로필 ',
    description: '전문가 회원프로필 화면',
    path: '/common/commonProfile/expertMemberProfile',
    category: '회원프로필',
    section: 'commonProfile',
    status: ''
  },
  {
    title: '프로필 팝업 리스트',
    description: '회원프로필 바텀모달 리스트',
    path: '/common/commonProfile/profilePopList',
    category: '회원프로필',
    section: 'commonProfile',
    status: ''
  },

  //DM
  {
    title: 'DM',
    description: 'DM 페이지',
    path: '/common/DM/DmList',
    category: 'DM',
    section: 'DirectMessage',
    status: ''
  },

  // 설정
  {
    title: '설정',
    description: '설정 화면',
    path: '/common/setting/settingMain',
    category: '설정',
    section: 'setting',
    status: ''
  },
  {
    title: '설정 - 캐시 데이터 관리',
    description: '캐시 데이터 관리 화면',
    path: '/common/setting/cacheDataManagement',
    category: '설정',
    section: 'setting',
    status: ''
  },
  {
    title: '설정 - 버전정보(최신버전)',
    description: '버전정보 - 업데이트',
    path: '/common/setting/updateAvailable',
    category: '설정',
    section: 'setting',
    status: ''
  },
  {
    title: '설정 - 버전정보(최신버전)',
    description: '버전정보 - 최신버전',
    path: '/common/setting/updateNoNeed',
    category: '설정',
    section: 'setting',
    status: ''
  },
  {
    title: '설정 - 개인데이터 이용내역',
    description: '개인데이터 이용내역',
    path: '/common/setting/individualDataUseList',
    category: '설정',
    section: 'setting',
    status: ''
  },
  {
    title: '설정 - 개인데이터 이용내역 - 동의영수증',
    description: '개인데이터 이용내역(동의영수증)',
    path: '/common/setting/individualDataDetail',
    category: '설정',
    section: 'setting',
    status: ''
  },
  {
    title: '설정 - 약관보기',
    description: '약관보기',
    path: '/common/setting/terms',
    category: '설정',
    section: 'setting',
    status: ''
  },
  {
    title: '설정 - 약관보기(상세보기)',
    description: '약관보기(상세보기)',
    path: '/common/setting/termsDetail',
    category: '설정',
    section: 'setting',
    status: ''
  },
  {
    title: '설정 - 회원탈퇴',
    description: '회원탈퇴',
    path: '/common/setting/leaveMember',
    category: '설정',
    section: 'setting',
    status: ''
  },
  // MY 배지
  {
    title: 'MY배지',
    description: 'MY배지 목록 화면',
    path: '/common/badge',
    category: 'MY배지',
    section: 'common',
    status: ''
  },
  {
    title: 'MY배지 모아보기',
    description: 'MY배지 모아보기 화면',
    path: '/common/badge/collection',
    category: 'MY배지',
    section: 'common',
    status: ''
  },
  // 리워드보관함
  {
    title: '리워드보관함',
    description: '리워드 보관함 화면',
    path: '/common/lottery',
    category: '리워드보관함',
    section: 'lottery',
    status: ''
  },
  {
    title: '리워드보관함 - 없음',
    description: '리워드 없는 보관함 화면',
    path: '/common/lottery/[id]/noLottery',
    category: '리워드보관함',
    section: 'lottery',
    status: ''
  },
  {
    title: '행운복권 확인',
    description: '행운복권 확인 화면',
    path: '/common/lottery/[id]/check',
    category: '리워드보관함',
    section: 'lottery',
    status: ''
  },
  {
    title: '행운복권 확인 - 긁기',
    description: '행운복권 긁기 화면',
    path: '/common/lottery/[id]/scratch',
    category: '리워드보관함',
    section: 'lottery',
    status: ''
  },
  {
    title: '당첨 - 포인트',
    description: '포인트 당첨 화면',
    path: '/common/lottery/[id]/resultPoint',
    category: '리워드보관함',
    section: 'lottery',
    status: ''
  },
  {
    title: '당첨 - 아이템',
    description: '아이템 당첨 화면',
    path: '/common/lottery/[id]/resultItem',
    category: '리워드보관함',
    section: 'lottery',
    status: ''
  },
  {
    title: '당첨 - 상품교환권',
    description: '상품교환권 당첨 화면',
    path: '/common/lottery/[id]/resultGift',
    category: '리워드보관함',
    section: 'lottery',
    status: ''
  },
  {
    title: '꽝',
    description: '꽝 화면',
    path: '/common/lottery/[id]/resultLose',
    category: '리워드보관함',
    section: 'lottery',
    status: ''
  },
  // 포인트 스토어
  {
    title: '레몬포인트 메인',
    description: '환전신청내역',
    path: '/common/point/exchangeRequestList',
    category: '포인트 스토어',
    section: 'pointStore',
    status: ''
  },
  {
    title: '포인트 환전신청내역',
    description: '환전신청내역',
    path: '/common/point/exchangeRequestList',
    category: '포인트 스토어',
    section: 'pointStore',
    status: ''
  },
  {
    title: '포인트 환전 상세내역',
    description: '환전 상세내역',
    path: '/common/point/exchangeRequestDetail',
    category: '포인트 스토어',
    section: 'pointStore',
    status: ''
  },
  {
    title: '포인트 스토어',
    description: '레몬포인트 환전 신청',
    path: '/common/point/exchangeRequest',
    category: '포인트 스토어',
    section: 'pointStore',
    status: ''
  },

  // 커뮤니티 섹션
  {
    title: '마음일기',
    description: '마음일기 목록 및 상세 화면',
    path: '/community/diary',
    category: '커뮤니티',
    section: 'community',
    status: 'ing'
  },
  {
    title: '커뮤니티 상세',
    description: '커뮤니티 상세 - 경쟁형',
    path: '/community/[community]/type/competition',
    category: '커뮤니티',
    section: 'community',
    status: 'ing'
  },
  {
    title: '커뮤니티 상세',
    description: '커뮤니티 상세 - 병원형',
    path: '/community/[community]/type/hospital',
    category: '커뮤니티',
    section: 'community',
    status: 'ing'
  },
  {
    title: '커뮤니티 상세',
    description: '커뮤니티 상세 - 청구의신',
    path: '/community/[community]/type/insu',
    category: '커뮤니티',
    section: 'community',
    status: 'ing'
  },
  {
    title: '게시글 상세',
    description: '커뮤니티 공통-게시글 상세/글쓰기',
    path: '/community/[community]/board/[boardID]/[postId]',
    category: '커뮤니티',
    section: 'community',
    status: ''
  },
  {
    title: '게시글 글쓰기',
    description: '커뮤니티 공통-게시글 상세/글쓰기',
    path: '/community/[community]/board/[boardID]/create',
    category: '커뮤니티',
    section: 'community',
    status: ''
  },
  // 가이드 페이지
  {
    title: '레이아웃 가이드',
    description: 'BaseHeader 컴포넌트 사용 가이드',
    path: '/guide/layouts',
    category: '가이드',
    section: 'guide',
    status: 'ing'
  },
  {
    title: '컴포넌트 가이드',
    description: '공통 컴포넌트 사용 가이드',
    path: '/guide/components',
    category: '가이드',
    section: 'guide',
    status: 'ing'
  },
  {
    title: '모달 가이드',
    description: '모달 컴포넌트 사용 가이드',
    path: '/guide/modal',
    category: '가이드',
    section: 'guide',
    status: 'ing'
  },
  {
    title: '탭 가이드',
    description: '탭 컴포넌트 사용 가이드',
    path: '/guide/tabs',
    category: '가이드',
    section: 'guide',
    status: 'ing'
  },
  // 스마트링
  {
    title: '스마트링 소개',
    description: '스마트링 소개/최초',
    path: '/smartRing/introSmartRing',
    category: '스마트링',
    section: 'smartRing',
    status: ''
  },
  {
    title: '스마트링 권한',
    description: '스마트링 소개/최초',
    path: '/smartRing/smartRingPermission',
    category: '스마트링',
    section: 'smartRing',
    status: ''
  },
  {
    title: '신체 정보 입력',
    description: '스마트링 소개/최초',
    path: '/smartRing/smartRingBodyInfo',
    category: '스마트링',
    section: 'smartRing',
    status: ''
  }
]

// ID를 자동으로 부여하여 PageItem[] 생성
const pageList = computed<PageItem[]>(() => {
  return pageListData.map((page, index) => ({
    ...page,
    id: index + 1
  }))
})

const filteredBySection = computed(() => {
  if (currentSection.value === 'all') {
    return pageList.value
  }
  return pageList.value.filter(page => page.section === currentSection.value)
})

const completedPagesInSection = computed(() =>
  filteredBySection.value.filter(page => page.status === 'completed' || !page.status || page.status === '')
)

const filteredPages = computed(() => {
  let pages = filteredBySection.value

  if (currentFilter.value !== 'all') {
    if (currentFilter.value === 'completed') {
      // completed 필터의 경우 status가 'completed', 빈문자열, undefined인 경우 모두 포함
      pages = pages.filter(page => page.status === 'completed' || !page.status || page.status === '')
    } else {
      pages = pages.filter(page => page.status === currentFilter.value)
    }
  }

  return pages
})

const getStatusText = (status: string | undefined) => {
  const statusMap = {
    completed: '완료',
    ing: '진행중',
    pending: '대기'
  }
  // status가 비어있거나 undefined면 '완료'로 표시
  if (!status || status === '') {
    return '완료'
  }
  return statusMap[status] || status
}

// CSS 클래스를 위한 상태 리턴 (빈 값이면 completed로 처리)
const getStatusForClass = (status: string | undefined) => {
  if (!status || status === '') {
    return 'completed'
  }
  return status
}

const getSectionText = (section: string) => {
  const sectionMap = {
    insu: '보험(청구의신)',
    walkingKing: '걷기왕',
    login: '로그인 섹션',
    community: '커뮤니티',
    common: '공통',
    guide: '가이드',
    smartRing: '스마트링'
  }
  return sectionMap[section] || section
}
</script>

<style scoped lang="scss">
.pub-list-container {
  padding: 2rem 0;
  margin: 0 auto;
  width: 100%;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 0.2rem solid #e2e2e2;

  h2 {
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
    width: 100%;
  }

  .list-stats {
    display: flex;
    gap: 1rem;

    span {
      padding: 0.5rem 1rem;
      background: #f8f9fa;
      border-radius: 0.4rem;
      font-size: 1.4rem;
      font-weight: 500;

      &.total-count {
        color: #495057;
      }

      &.completed-count {
        color: #28a745;
        background: #d4edda;
      }
    }
  }
}

.filter-section {
  margin-bottom: 2rem;

  .section-tabs-wrapper,
  .status-tabs-wrapper {
    margin-bottom: 2rem;

    .filter-title {
      font-size: 1.4rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1rem;
    }
  }

  .status-tabs-wrapper {
    margin-bottom: 0;
  }
}

.page-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-item {
  background: white;
  border: 0.1rem solid #dee2e6;
  border-radius: 0.8rem;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
    transform: translateY(-0.2rem);
  }

  &.status-completed {
    border-left: 0.4rem solid #28a745;
  }

  &.status-ing {
    border-left: 0.4rem solid #ffc107;
  }

  &.status-pending {
    border-left: 0.4rem solid #6c757d;
  }
}

.page-info {
  flex: 1;

  .page-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.8rem;

    .page-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .status-badge {
      padding: 0.3rem 0.8rem;
      border-radius: 1.2rem;
      font-size: 1.2rem;
      font-weight: 500;

      &.badge-completed {
        background: #d4edda;
        color: #155724;
      }

      &.badge-ing {
        background: #fff3cd;
        color: #856404;
      }

      &.badge-pending {
        background: #f8f9fa;
        color: #6c757d;
      }
    }
  }

  .page-description {
    color: #6c757d;
    font-size: 1.4rem;
    margin: 0 0 1rem 0;
    line-height: 1.5;
  }

  .page-meta {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;

    span {
      font-size: 1.3rem;
      color: #868e96;

      &.page-path {
        font-family: 'Courier New', monospace;
        background: #f8f9fa;
        padding: 0.2rem 0.5rem;
        border-radius: 0.3rem;
        word-break: break-all;
      }

      &.page-section {
        background: #e9ecef;
        padding: 0.2rem 0.5rem;
        border-radius: 0.3rem;
        font-weight: 500;
      }
    }
  }
}

.page-actions {
  .view-btn {
    padding: 1rem 2rem;
    background: #4c7ff7;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.4rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(.disabled) {
      background: #3461d9;
      transform: translateY(-0.1rem);
    }

    &.disabled {
      background: #6c757d;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}
</style>
