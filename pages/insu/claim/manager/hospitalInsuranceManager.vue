<template>
  <BaseBody>
    <section>
      <nav class="tab-menu">
        <button :class="{ active: activeTab === 'myHospital' }" class="tab-button" @click="activeTab = 'myHospital'">
          My병원
        </button>
        <button :class="{ active: activeTab === 'myInsurance' }" class="tab-button" @click="activeTab = 'myInsurance'">
          My보험사
        </button>
      </nav>
      <main class="content-area">
        <div v-if="activeTab === 'myHospital'">
          <div class="search-hospital-guide">
            찾으시는 병원이 없으신가요?
            <button type="button" class="my-hospital-search-button" @click="searchMyHospital">MY병원 찾기 &gt;</button>
          </div>
          <ul id="chat-list" class="chat-list">
            <li
              v-for="myHospitalItem in myHospitalList"
              :key="myHospitalItem.id"
              class="chat-list-item"
              @click="openMyHospitalItem(myHospitalItem.id)"
            >
              <div class="profile-thumbnail">
                <img :src="myHospitalItem.iconImageUrl" :alt="myHospitalItem.name + ' 병원 사진'" />
              </div>
              <div class="chat-info">
                <span class="nickname">{{ myHospitalItem.name }}</span>
                <p class="latest-message">{{ formatHospitalCareType(myHospitalItem) }}</p>
              </div>
              <div class="chat-meta">
                <button type="button" @click.stop.prevent="connectMyHospital(myHospitalItem)">
                  {{ myHospitalItem.myHospitalConnected ? '연결하기' : '연결끊기' }}
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="activeTab === 'myInsurance'">
          <ul v-if="myInsuranceList" id="chat-list" class="chat-list">
            <li
              v-for="myInsuranceItem in myInsuranceList"
              :key="myInsuranceItem.id"
              class="chat-list-item"
              @click="openInsuranceItem(myInsuranceItem.id)"
            >
              <div class="profile-thumbnail">
                <img :src="myInsuranceItem.iconImageUrl" :alt="myInsuranceItem.name + ' 보험사 사진'" />
              </div>
              <div class="chat-info">
                <span class="nickname">{{ myInsuranceItem.name }}</span>
              </div>
              <div class="chat-meta">
                <button type="button" @click.stop.prevent="deleteMyInsurance(myInsuranceItem)">삭제</button>
              </div>
            </li>
          </ul>
          <div v-else>
            <div>My보험으로 저장된 보험사가 없어요</div>
            <div>보험금 청구를 완료하시면 보험사가 표시되어요</div>
          </div>
        </div>
      </main>
    </section>
    <section>
      <!-- My병원 연결 모달 -->
      <ConfirmModal
        :is-visible="showConnectMyHospitalModal"
        :title="connectMyHospitalModalTitle"
        :contents="connectMyHospitalModalContents"
        :is-show-cancel-button="true"
        :is-show-confirm-button="true"
        :confirm-button-text="connectMyHospitalModalConfirmButtonText"
        @cancel="cancelConnectMyHospitalModal"
        @confirm="confirmConnectMyHospitalModal"
      />
      <!-- My보험사 삭제 모달-->
      <ConfirmModal
        :is-visible="showDeleteMyInsuranceModal"
        :title="deleteMyInsuranceModalTitle"
        :contents="deleteMyInsuranceModalContents"
        :is-show-cancel-button="true"
        :is-show-confirm-button="true"
        :confirm-button-text="deleteMyInsuranceModalConfirmButtonText"
        @cancel="cancelDeleteMyInsuranceModal"
        @confirm="confirmDeleteMyInsuranceModal"
      />
    </section>
  </BaseBody>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import BaseBody from '@/components/layout/BaseBody.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'

const searchMyHospital = () => {
  console.log('searchMyHospital')
}

const showConnectMyHospitalModal = ref(false)
const openConnectMyHospitalModal = (item: MyHospitalItem) => {
  console.log('openConnectMyHospitalModal', item)
  showConnectMyHospitalModal.value = true
}
const cancelConnectMyHospitalModal = () => {
  showConnectMyHospitalModal.value = false
}
const confirmConnectMyHospitalModal = () => {
  showConnectMyHospitalModal.value = false
}

interface MyHospitalItem {
  id: number
  iconImageUrl: string
  name: string
  inpatient: boolean
  outPatient: boolean
  myHospitalConnected: boolean
}

// --- My HospitalList ---
const myHospitalList: Ref<MyHospitalItem[]> = ref([
  {
    id: 1,
    iconImageUrl: 'https://picsum.photos/200/300',
    name: '가톨릭관동대국제성모병원',
    inpatient: true,
    outPatient: true,
    myHospitalConnected: true
  },
  {
    id: 2,
    iconImageUrl: 'https://picsum.photos/200/300',
    name: '강동성심병원',
    inpatient: true,
    outPatient: true,
    myHospitalConnected: false
  }
])
const connectMyHospitalModalTitle = ref('')
const connectMyHospitalModalContents = ref('')
const connectMyHospitalModalConfirmButtonText = ref('')

// --- My HospitalList Clicked---
const openMyHospitalItem = (id: number) => {
  console.log(`openMyHospitalItem: ${id}`)
}
// --- Connect My Hospital Button Clicked---
const connectMyHospital = (item: MyHospitalItem) => {
  const { name, myHospitalConnected } = item

  connectMyHospitalModalTitle.value = `${name} 연결을 ${myHospitalConnected ? '끊을까요?' : '할까요?'}`
  connectMyHospitalModalContents.value = myHospitalConnected ? 'MY병원관리에서 언제든지 다시 연결할 수 있어요.' : ''
  connectMyHospitalModalConfirmButtonText.value = myHospitalConnected ? '연결끊기' : '연결하기'

  openConnectMyHospitalModal(item)
}

// --- Function to format inpatient/outpatient status ---
const formatHospitalCareType = (item: MyHospitalItem): string => {
  const types: string[] = []
  if (item.inpatient) {
    types.push('입원')
  }
  if (item.outPatient) {
    types.push('외래')
  }
  return types.join(', ')
}

interface MyInsuranceItem {
  id: number
  iconImageUrl: string
  name: string
}

const showDeleteMyInsuranceModal = ref(false)
const openDeleteMyInsuranceModal = (item: MyInsuranceItem) => {
  console.log('openDeleteMyInsuranceModal', item)
  showDeleteMyInsuranceModal.value = true
}
const cancelDeleteMyInsuranceModal = () => {
  showDeleteMyInsuranceModal.value = false
}
const confirmDeleteMyInsuranceModal = () => {
  showDeleteMyInsuranceModal.value = false
}

// --- My InsuranceList ---
const myInsuranceList: Ref<MyInsuranceItem[]> = ref([
  {
    id: 1,
    iconImageUrl: 'https://picsum.photos/200/300',
    name: '삼성화재'
  }
])
const deleteMyInsuranceModalTitle = ref('')
const deleteMyInsuranceModalContents = ref('')
const deleteMyInsuranceModalConfirmButtonText = ref('')

// --- My InsuranceList Clicked---
const openInsuranceItem = (id: number) => {
  console.log(`openInsuranceItem: ${id}`)
}

// --- Delete My Insurance Button Clicked---
const deleteMyInsurance = (item: MyInsuranceItem) => {
  console.log('deleteMyInsurance', item)
  const { name } = item
  deleteMyInsuranceModalContents.value = `${name}을 MY보험사에서 삭제할까요?`
  deleteMyInsuranceModalConfirmButtonText.value = `삭제`
  openDeleteMyInsuranceModal(item)
}

// --- Tab Menu Logic ---
const activeTab = ref<'myHospital' | 'myInsurance'>('myHospital')
</script>
<style scoped>
.my-hospital-search-button {
  border: 1px solid black;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
}

.search-hospital-guide {
  font-size: 0.9rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.2rem;
}

.tab-menu {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.tab-button {
  flex-grow: 1;
  padding: 15px;
  border: none;
  background: none;
  font-size: 16px;
  color: #555;
  cursor: pointer;
  position: relative;
}

.tab-button.active {
  color: #007bff;
  font-weight: bold;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #007bff;
}
.content-area {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
}
.chat-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chat-list-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background-color: #fff;
}

.chat-list-item:hover {
  background-color: #f9f9f9;
}

.profile-thumbnail {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.8rem;
  flex-shrink: 0;
}

.profile-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chat-info {
  flex-grow: 1;
  overflow: hidden;
}

.chat-info .nickname {
  font-weight: bold;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.chat-info .latest-message {
  font-size: 0.9rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.2rem;
}

.chat-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 0.8rem;
  flex-shrink: 0;
}
</style>
