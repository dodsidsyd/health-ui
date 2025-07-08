<template>
  <BaseBody>
    <section>
      <div>
        <h1>MY 병원 찾기로</h1>
        <h1>총 {{ hospitals.length }}개의 병원을 찾았어요</h1>
      </div>
      <div>
        <div>아래 병원을 연결하면 서류 없이</div>
        <div>간편하게 보험을 청구할 수 있어요</div>
      </div>
    </section>
    <section>
      <div>
        <div class="list-header">
          <h2></h2>
          <button class="select-all-button" @click="toggleSelectAll">
            {{ allSelected ? '전체 해제' : '전체 선택' }}
          </button>
        </div>
        <ul class="item-list">
          <li v-for="item in hospitals" :key="item.id" class="list-item">
            <div class="item-content">
              <div class="icon">
                <img :src="item.iconImageUrl" :alt="item.title" />
              </div>
              <div class="text-group">
                <h3 class="item-title">{{ item.title }}</h3>
                <p class="item-text-content">{{ item.content }}</p>
              </div>
            </div>
            <input v-model="item.checked" type="checkbox" class="item-checkbox" />
          </li>
        </ul>
        <button class="full-width-button" @click="connectMyHospitals">MY 병원 연결</button>
      </div>
    </section>
  </BaseBody>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'

const hospitals = ref<any[]>([])

const connectMyHospitals = async () => {
  navigateTo('/insu')
}

const allSelected = computed(() => {
  return hospitals.value.every(item => item.checked)
})

const toggleSelectAll = () => {
  const newState = !allSelected.value
  hospitals.value.forEach(item => {
    item.checked = newState
  })
}

onMounted(() => {
})
</script>

<style scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.list-header h2 {
  margin: 0;
  color: #333;
}

.select-all-button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;
}

.select-all-button:hover {
  background-color: #0056b3;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.list-item:last-child {
  border-bottom: none;
}

.item-content {
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-right: 15px; /* 체크박스와 간격 */
}

.icon {
  font-size: 1.8em;
  margin-right: 15px;
}

.text-group {
  display: flex;
  flex-direction: column;
}

.item-title {
  margin: 0;
  font-size: 1.1em;
  color: #444;
}

.item-text-content {
  margin: 5px 0 0;
  font-size: 0.9em;
  color: #666;
}

.item-checkbox {
  width: 20px !important; /* 너비 강제 */
  height: 20px !important; /* 높이 강제 */
  -webkit-appearance: checkbox !important; /* 웹킷 브라우저에서 기본 체크박스 모양 강제 */
}

.full-width-button {
  width: 100%;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  margin-top: 20px;
  transition: background-color 0.2s ease;
}

.full-width-button:hover {
  background-color: #0056b3;
}
</style>
