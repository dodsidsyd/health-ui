<template>
  <BaseBody>
    <div style="margin-bottom: 4rem">
      <h2 style="margin-bottom: 1rem">다녀온 병원을 검색해 주세요</h2>
      <div>서류 없이도 청구 가능한 병원인지 알 수 있어요.</div>
    </div>

    <div style="display: flex; margin-bottom: 2rem">
      <input
        v-model="searchText"
        style="padding: 0.75rem 1rem; border: 1px solid gainsboro; border-radius: 0.25rem"
        placeholder="병원 이름을 입렵해 주세요"
      />
      <button class="search-icon" @click="fetchSearchHospital"></button>
    </div>

    <!-- 최근 검색 영역 -->
    <div style="display: flex; justify-content: space-between; margin-bottom: 2rem">
      <div>최근검색</div>
      <button
        style="background-color: gainsboro; padding: 0.75rem 1rem; border-radius: 7px"
        @click="deleteAllRecentSearch"
      >
        전체삭제
      </button>
    </div>

    <!-- 최금 검색 내역 -->
    <!--    <div v-for="(item, index) in recentSearchData" :key="index">-->
    <div>
      <div style="width: 100%; padding: 1rem 0; border-top: 1px solid gainsboro; border-bottom: 1px solid gainsboro">
        <div style="display: flex">
          <div style="text-align: left" @click="clickHospital">
            <span style="display: inline-block">강남세브란스병원</span>
            <span style="display: inline-block">서울특별시 강남구 도곡1동 연주로211</span>
          </div>
          <button
            class="delete-icon"
            style="background-color: gainsboro; padding: 0.75rem; border-radius: 7px"
            @click="deleteRecentSearch"
          ></button>
        </div>
      </div>
      <div style="width: 100%; padding: 1rem 0; border-bottom: 1px solid gainsboro">
        <div style="display: flex">
          <div style="text-align: left" @click="clickHospital">
            <span style="display: inline-block">베스트산부인과의원</span>
            <span style="display: inline-block">서울특별시 강남구 도곡1동 연주로211</span>
          </div>
          <button
            class="delete-icon"
            style="background-color: gainsboro; padding: 0.75rem; border-radius: 7px"
            @click="deleteRecentSearch"
          ></button>
        </div>
      </div>
    </div>

    <!-- 검색한 병원 목록 -->
    <div>
      <div>검색 결과가 없어요</div>
    </div>
  </BaseBody>
<!--  <ConfirmModal-->
<!--    v-bind="infoModal"-->
<!--    @close="infoModal.isVisible = false"-->
<!--    @confirm="confirmInfoModal"-->
<!--    @cancel="cancelInfoModal"-->
<!--  />-->
<!--  <ChooseVisitorModal-->
<!--    :is-visible="isShowChooseVisitorModal"-->
<!--    @close="isShowChooseVisitorModal = false"-->
<!--    @confirm="chooseVisitor"-->
<!--  />-->
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
// import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'

const searchText = ref('')
const recentSearchList = ref<any[]>([]) // 최근 검색 리스트
const searchedHospitalList = ref<any[]>([]) // 검색한 병원 리스트
const selectedHospital = ref() // 선택한 병원

const infoModal = ref({
  isVisible: false,
  title: '안내',
  content: '',
  isShowCancelButton: false,
  confirmButtonText: '',
  cancelButtonText: ''
})
const isShowChooseVisitorModal = ref(false)

const clickHospital = (hospital: any) => {
  // selectedHospital.value = hospital

  // ===== 서류없이 청구 가능 ===============================================================
  // 통원, 입원 청구 가능 -> 주민등록번호 입력 화면으로
  // navigateTo('/insu/claim/inputResidentRegistrationNumber')

  // 통원 청구만 가능 (입원 청구는 사진찍어 청구로만 가능)
  infoModal.value = {
    ...infoModal.value,
    isVisible: true,
    content: `{병원}은 통원 진료비 청구만 가능해요. 입원비 청구는 사진찍어 청구로 가능해요.`,
    confirmButtonText: '서류없이 청구',
    isShowCancelButton: true,
    cancelButtonText: '사진찍어 청구'
  }

  // 서류없이 청구 이용가능 시간이 아닐 경우 (이용 가능한 여부를 back에서 알려주나?)
  // infoModal.value = {
  //   ...infoModal.value,
  //   isVisible: true,
  //   content: `{병원}은 서류없이 청구 이용 가능 시간이 아니에요. 서류를 준비 하셨으면 사진찍어 청구 서비스를 이용할 수 있어요.`,
  //   confirmButtonText: '사진찍어 청구'
  // }
  // =======================================================================================

  // 사진찍어 청구만 가능한 경우
  // infoModal.value = {
  //   ...infoModal.value,
  //   isVisible: true,
  //   content: `{병원}은 아직 서류없이 청구 이용이 어려워요. 서류를 준비 하셨으면 사진찍어 청구 서비스를 이용할 수 있어요.`,
  //   confirmButtonText: '사진찍어 청구'
  // }

  // 본인/가족 하단 모달 띄운 후, 주민등록번호 입력 페이지로 이동
  // navigateTo('/insu/claim/inputResidentRegistrationNumber')
}

const confirmInfoModal = () => {
  // 조건에 따른 페이지 이동 분기처리
  console.log('분기처리 필요')
}

const cancelInfoModal = () => {
  // 서류없이 청구 + 통원 청구만 가능할 경우 입원 청구는 사진찍어 청구
  isShowChooseVisitorModal.value = true
  infoModal.value.isVisible = false
}

const chooseVisitor = () => {
  // 본인 OR 가족 선택! 페이지 이동!
}

// 최근검색어 전체 삭제
const deleteAllRecentSearch = () => {
}

// 최근검색어 삭제
const deleteRecentSearch = () => {
}

// 병원 검색
const fetchSearchHospital = async () => {
}

onMounted(() => {
  recentSearchList.value = []
})
</script>

<style scoped lang="scss">
.delete-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  width: 2rem;
}

.search-icon {
  width: 2rem;
  margin-left: 1rem;
  margin-top: 1rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
}
</style>
