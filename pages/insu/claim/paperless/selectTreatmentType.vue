<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <h2>다녀온 병원을 선택해주세요.</h2>
      <div style="display: flex; justify-content: space-between">
        <div>
          <span>최근 3년간 MY병원 진료내역이에요.</span>
          <span class="info-icon" @click="clickInfo"></span>
        </div>
        <button
          style="font-size: 12px; background-color: gainsboro; padding: 5px 10px; border-radius: 7px"
          @click="moveFindMyHospital"
        >
          + MY병원 연결
        </button>
      </div>

      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid gray">
        <button
          style="width: 50%; padding: 1rem"
          :style="selectedTab === 'outpatient' ? 'border-bottom: 4px solid blue' : ''"
          @click="clickTab('outpatient')"
        >
          통원
        </button>
        <button
          style="width: 50%; padding: 1rem"
          :style="selectedTab === 'inpatient' ? 'border-bottom: 4px solid blue' : ''"
          @click="clickTab('inpatient')"
        >
          입원
        </button>
      </div>

      <!-- 통원 탭 -->
      <div v-if="selectedTab === 'outpatient'">
        <div style="margin-bottom: 1rem">총 {{ visitOutData.length }}건의 병원을 찾았어요.</div>
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 3rem;
            border: 1px solid #d2d2d2;
            border-radius: 10px;
          "
        >
          <div>고려대학교 안암병원</div>
          <button
            style="padding: 1rem; background-color: #d2d2d2; border-radius: 10px"
            @click="clickClaim('outpatient')"
          >
            청구하기
          </button>
        </div>
      </div>

      <!-- 입원 탭 -->
      <div v-else>
        <div style="display: flex; justify-content: space-between">
          <div style="margin-bottom: 1rem">총 {{ visitInData.length }}건의 병원을 찾았어요.</div>
          <button
            style="
              display: flex;
              gap: 0.25rem;
              font-size: 14px;
              background-color: gainsboro;
              margin-bottom: 13px;
              align-items: center;
              padding: 3px 8px;
              border-radius: 10px;
            "
            @click="movePatientClaimInfoPage"
          >
            <span class="inPatient-icon"></span>
            <span>입원비 청구 안내</span>
          </button>
        </div>
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 3rem;
            border: 1px solid #d2d2d2;
            border-radius: 10px;
          "
        >
          <div>일산병원</div>
          <button
            style="padding: 1rem; background-color: #d2d2d2; border-radius: 10px"
            @click="clickClaim('inpatient')"
          >
            청구하기
          </button>
        </div>
      </div>

      <div style="position: absolute; bottom: 0; width: 89%; text-align: center">
        <div style="margin-bottom: 1rem">찾고있는 병원이 없나요?</div>
        <button
          style="background-color: gainsboro; padding: 1rem 2rem; border-radius: 7px"
          @click="clickFindSelfHospitals"
        >
          직접 병원 찾기
        </button>
      </div>
    </div>
  </BaseBody>
<!--  <ConfirmModal-->
<!--    v-bind="impossibleClaimPaperlessModal"-->
<!--    @close="impossibleClaimPaperlessModal.isVisible = false"-->
<!--    @confirm="clickClaimPicture"-->
<!--  />-->
<!--  <ChooseVisitorModal :is-visible="isShowChooseVisitorModal" @confirm="goAheadClaimPicture" />-->
<!--  &lt;!&ndash; 입원비 청구 안내 모달 &ndash;&gt;-->
<!--  <InpatientClaimGuideFullModal :is-visible="isShowInpatientGuideFullModal" />-->
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

type TREATMENT_TYPE = 'outpatient' | 'inpatient'

const selectedTab = ref<TREATMENT_TYPE>('outpatient')
const info = ref({
  isShow: false,
  text: 'MY병원을 연결해 최근 진료 내역을 업데이트할 수 있어요.'
})
const visitOutData = ref<any[]>([])
const visitInData = ref<any[]>([])

const impossibleClaimPaperlessModal = ref({
  isVisible: false,
  title: '안내',
  content: '',
  isShowCancelButton: false,
  confirmButtonText: '사진찍어 청구'
})
const isShowChooseVisitorModal = ref(false)
const isShowInpatientGuideFullModal = ref(false)

const clickClaim = (type: string)  => {
  // 서류없이 청구 불가능한 경우
  // impossibleClaimPaperlessModal.value = {
  //   ...impossibleClaimPaperlessModal.value,
  //   isVisible: true,
  //   content: `{병원}은 입원비 서류없이 청구 서비스가 오픈 중비 중이에요 <br /> 서류를 준비하셨으면 사진찍어 청구 서비스를 이용할 수 있어요`
  // }

  navigateTo('/insu/claim/inputResidentRegistrationNumber')
}

const clickFindSelfHospitals = () => {
  navigateTo('/insu/hospital/selfSearchHospitals')
}

const clickInfo = () => {
  // TODO:: 툴팁 연결
  info.value.isShow = !info.value.isShow
}

const moveFindMyHospital = () => {
  navigateTo('/insu/hospital/searchHospitals')
}

// 통원 병원 가져오기
const getOutPatient = async () => {
  // await getVisitOutList()
}

// 입원 병원 가져오기
const getInPatient = async () => {
  // await getVisitInList()
}

// 탭 클릭시 통원/입원 스토어에 저장
const clickTab = (type: TREATMENT_TYPE) => {
  selectedTab.value = type

  if (type === 'outpatient') {
    getOutPatient()
  } else {
    getInPatient()
  }
}

const clickClaimPicture = () => {
  isShowChooseVisitorModal.value = true
  impossibleClaimPaperlessModal.value.isVisible = false
}

const goAheadClaimPicture = () => {
  navigateTo('/insu/claim/inputResidentRegistrationNumber')
}

const movePatientClaimInfoPage = () => {
  isShowInpatientGuideFullModal.value = true
}

onMounted(() => {
  // 통원 병원 가져오기
  getOutPatient()
})
</script>

<style scoped lang="scss">
.info-icon {
  display: inline-block;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z'%3E%3C/path%3E%3C/svg%3E");
  width: 20px;
  height: 20px;
}

.inPatient-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z'%3E%3C/path%3E%3C/svg%3E");
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
}
</style>
