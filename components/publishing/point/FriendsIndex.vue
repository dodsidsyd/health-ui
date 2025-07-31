<template>
  <div class="friends-index-wrap">
    <FriendsRadioBox
      v-for="friend in friendsData"
      :id="friend.id"
      :key="friend.id"
      v-model="selectedFriendId"
      :friends-steps="friend.friendsSteps"
      :target-steps="friend.targetSteps"
      :nickname="friend.nickname"
      :user-name="friend.userName"
      :address="friend.address"
      :profile-image="friend.profileImage"
      @change="handleFriendRadioChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FriendsRadioBox from '~/components/publishing/point/FriendsRadioBox.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  actionType: {
    type: String,
    validator: (value: string) => ['beg', 'gift'].includes(value),
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'selected-image-path'])

const selectedFriendId = ref(props.modelValue)
const selectedFriendImagePath = ref('')
watch(selectedFriendId, newId => {
  emit('update:modelValue', newId)
})

// FriendsRadioBox에서 'change' 이벤트가 발생했을 때 호출될 함수
const handleFriendRadioChange = (data: { id: string; fullImagePath: string }) => {
  selectedFriendId.value = data.id // 선택된 ID
  selectedFriendImagePath.value = data.fullImagePath // 선택된 이미지 경로
  emit('selected-image-path', data.fullImagePath)
}

const friendsData = ref([
  {
    id: 'checkBox1',
    friendsSteps: 250000,
    targetSteps: 500000,
    nickname: '곰탱이',
    userName: '강동현',
    address: '충북제천',
    profileImage: 'community/img-rank-profile.png'
  },
  { id: 'checkBox2', nickname: '닉네임2', userName: '김대용', address: '충북제천' },
  {
    id: 'checkBox3',
    friendsSteps: 450000,
    targetSteps: 500000,
    nickname: '닉네임3',
    userName: '김은혜',
    address: '충북제천'
  },
  { id: 'checkBox4', nickname: '닉네임4', userName: '최경섭', address: '충북제천' },
  {
    id: 'checkBox5',
    friendsSteps: 550000,
    targetSteps: 500000,
    nickname: '닉네임5',
    address: '충북제천'
  },
  { id: 'checkBox6', nickname: '닉네임6', address: '충북제천' },
  {
    id: 'checkBox7',
    friendsSteps: 0,
    targetSteps: 500000,
    nickname: '닉네임7',
    address: '충북제천'
  },
  { id: 'checkBox8', userName: '윤시우', address: '충북제천' }
])

// modelValue prop이 변경될 때 내부 값 동기화
watch(
  () => props.modelValue,
  newVal => {
    if (newVal !== selectedFriendId.value) {
      selectedFriendId.value = newVal
    }
    const initialFriend = friendsData.value.find(f => f.id === newVal)
    if (initialFriend && initialFriend.profileImage) {
      // FriendsRadioBox와 동일한 로직으로 이미지 경로 생성
      const initialImagePath = `/_nuxt/assets/images/${initialFriend.profileImage}`
      selectedFriendImagePath.value = initialImagePath
      emit('selected-image-path', initialImagePath)
    } else {
      const defaultImagePath = `/_nuxt/assets/images/img-profile.svg` //
      selectedFriendImagePath.value = defaultImagePath
      emit('selected-image-path', defaultImagePath)
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.friends-index-wrap {
  margin: 0 -2rem;
  padding: 0 2rem;
}
</style>
