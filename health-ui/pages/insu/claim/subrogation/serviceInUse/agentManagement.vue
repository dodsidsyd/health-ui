<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 2rem">
      <div style="display: flex; flex-direction: column">
        <input
          v-model="search"
          style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
          placeholder="설계사 이름"
          @input="searchAgent"
        />
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.75rem">
        <div
          v-for="user in filteredList"
          :key="user.id"
          style="
            display: flex;
            justify-content: space-between;
            padding: 1rem;
            border-radius: 10px;
            border: 1px solid #b0b0b0;
          "
        >
          <div>
            <div>{{ user.name }}</div>
            <div>{{ user.phoneNum }}</div>
          </div>
          <button
            style="padding: 2px 12px; border-radius: 20px; background-color: red; color: white"
            @click="deleteUser"
          >
            삭제
          </button>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: center; margin-top: 2rem">
      <button
        style="background-color: #b0b0b0; padding: 0.75rem 1rem; border-radius: 10px; width: 150px"
        @click="clickAddUser"
      >
        설계사 추가등록
      </button>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import BaseBody from '~/components/layout/BaseBody.vue'
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'

interface ManagedUsers {
  id: number
  name: string
  phoneNum: string
}

const search = ref('')
const userList = ref<ManagedUsers[]>([])

const searchAgent = (event: Event) => {
  const target = event.target as HTMLInputElement
  search.value = target.value
}

const deleteUser = () => {
  const res = ConfirmModal.open({
    isVisible: true,
    confirmButtonText: '삭제',
    content: '해당 설계사를 삭제하시겠어요?'
  })

  if (res) {
    // 삭제 API 호출
    console.log(res)
  }
}

const { data, error, pending } = await useAsyncData<any>('managed-users', () => getManagedUsers())

const filteredList = computed(() => {
  if (search.value) {
    return userList.value.filter(user => user.name.includes(search.value))
  }
  return userList.value
})
const clickAddUser = () => {
  // 다 입력후 로그인 화면으로 이동하게되는데, 이게 맞는건가?
  return navigateTo('/insu/claim/subrogation/inputAgentInfo')
}

onMounted(() => {
  userList.value = data.value
})
</script>

<style scoped lang="scss"></style>
