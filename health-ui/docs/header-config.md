# 헤더 설정 가이드

## 기본 사용법

```vue
<script setup>
import { onMounted } from 'vue'
import { useHeader } from '~/composables/useHeader'

const { setHeaderConfig } = useHeader()

onMounted(() => {
  setHeaderConfig({
    showBackButton: true,
    pageTitle: '내 페이지'
  })
})
</script>
```

## 전체 옵션 목록

### 기본 옵션

```typescript
{
  showBackButton: boolean,      // 뒤로가기 버튼 표시
  pageTitle: string,          // 커스텀 제목
  logoType: 'both' | 'text' | 'image',  // 로고 타입
  logoTypeWithBack: 'both' | 'text' | 'image' | '',  // 뒤로가기 버튼 있을 때 로고 타입
}
```

### 유틸 옵션

```typescript
{
  showUtil: boolean,           // 유틸 버튼 영역 표시
  showSearch: boolean,         // 검색 필드 표시
  showSearchBtn: boolean,      // 검색 버튼 표시
}
```

### 네비게이션 옵션

```typescript
{
  showChat: boolean,           // 쪽지함 버튼 (일반)
  showChatDot: boolean,        // 쪽지함 버튼 (알림 있음)
  showLucky: boolean,          // 행운복권 버튼 (일반)
  showLuckyDot: boolean,       // 행운복권 버튼 (알림 있음)
  showSet: boolean,            // 설정 버튼
  showAllMenu: boolean,        // 전체메뉴 버튼
  showShare: boolean,          // 공유하기 버튼
  showMore: boolean,           // 더보기 버튼
}
```

### 알림 옵션

```typescript
{
  hasNotification: boolean,     // 알림 버튼 (일반)
  hasNotificationDot: boolean,  // 알림 버튼 (알림 있음)
}
```

### 레이아웃 옵션

```typescript
{
  isCenterTitle: boolean,       // 제목 가운데 정렬
}
```

## 사용 예시

### 1. 기본 페이지

```vue
onMounted(() => { setHeaderConfig({ showBackButton: true, pageTitle: '상세 페이지' }) })
```

### 2. 검색 기능이 있는 페이지

```vue
onMounted(() => { setHeaderConfig({ pageTitle: '검색 페이지', showUtil: true, showSearchBtn: true, showSearch: true })
})
```

### 3. 커뮤니티 페이지

```vue
onMounted(() => { setHeaderConfig({ pageTitle: '커뮤니티', logoType: 'both', showUtil: true, showChat: true, showShare:
true, showMore: true }) })
```

### 4. 설정 페이지

```vue
onMounted(() => { setHeaderConfig({ showBackButton: true, pageTitle: '설정', logoType: 'text', logoTypeWithBack: 'text',
isCenterTitle: true }) })
```

### 5. 건강의신 메인 페이지

```vue
onMounted(() => { setHeaderConfig({ pageTitle: '건강의신', logoType: 'both', showUtil: true, hasNotification: true,
showSet: true }) })
```

## 개별 함수 사용

```vue
const { setShowBackButton, setpageTitle, setLogoType, setLogoTypeWithBack, setShowUtil } = useHeader() onMounted(() => {
// 개별 설정 setShowBackButton(true) setpageTitle('내 페이지') setLogoType('text') setShowUtil(true) })
```
