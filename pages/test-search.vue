<template>
  <BaseBody 
    page-title="검색 테스트"
    :show-back-button="true"
    :show-search="true"
    @search="handleSearch"
  >
    <div style="padding: 20px;">
      <h1>검색 기능 테스트 페이지</h1>
      <p>헤더에 검색창이 표시되고, 타이틀은 숨겨져야 합니다.</p>
      
      <div v-if="searchResults.length > 0" style="margin-top: 30px;">
        <h2>검색 결과:</h2>
        <ul>
          <li v-for="(result, index) in searchResults" :key="index">
            {{ result }}
          </li>
        </ul>
      </div>
      
      <div style="margin-top: 30px;">
        <h3>검색 기능 확인 사항:</h3>
        <ul>
          <li>✅ 헤더에 검색창이 표시됨</li>
          <li>✅ 페이지 타이틀이 숨겨짐 (font-size: 0)</li>
          <li>✅ 검색어 입력 후 엔터키로 검색</li>
          <li>✅ 검색 버튼 클릭으로 검색</li>
        </ul>
      </div>
    </div>
  </BaseBody>
</template>

<script setup>
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'

const searchResults = ref([])

const handleSearch = (query) => {
  console.log('검색어:', query)
  
  // 더미 검색 결과
  searchResults.value = [
    `"${query}"에 대한 검색 결과 1`,
    `"${query}"에 대한 검색 결과 2`,
    `"${query}"에 대한 검색 결과 3`,
    `"${query}" 관련 콘텐츠`,
  ]
}
</script>
