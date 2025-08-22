<template>
  <div class="profile-photo">
    <img :src="profileImageSrc" alt="프로필 사진" />
    <label>
      <input type="file" accept="image/*" @change="handleImageUpload" />
      <button v-if="showDeleteButton" class="del-image" @click.prevent="deleteImage"></button>
    </label>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import defaultProfileImage from '~/assets/images/walkingking/img-select-thumbnail.png'
// 프로필 이미지 관련 상태
const profileImageSrc = ref(defaultProfileImage)
// 삭제 버튼 표시 여부 상태
const showDeleteButton = ref(false)
// 이미지 업로드 핸들러
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      profileImageSrc.value = e.target?.result as string
      showDeleteButton.value = true
    }
    reader.readAsDataURL(file)
  }
}

// 이미지 삭제 핸들러
const deleteImage = () => {
  profileImageSrc.value = defaultProfileImage // 이미지를 기본 이미지로 되돌립니다.
  showDeleteButton.value = false
  const fileInput = document.querySelector('.profile-photo input[type="file"]') as HTMLInputElement
  if (fileInput) {
    fileInput.value = ''
  }
}
</script>

<style lang="scss" scoped>
.profile-photo {
  width: 8rem;
  height: 8rem;
  position: relative;
  background: #f9f9f9;
  label {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    input {
      opacity: 0;
      width: 100%;
      height: 100%;
    }
    .ico-photo {
      display: inline-block;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 2.8rem;
      height: 2.8rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.8rem;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.del-image {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z' fill='%232B2B2B'/%3E%3Cpath d='M15.5265 7.41809C15.8211 7.17778 16.2558 7.19524 16.5304 7.46984C16.805 7.74445 16.8225 8.17917 16.5821 8.47375L16.5304 8.53039L13.0607 12.0001L16.5304 15.4698L16.5821 15.5265C16.8225 15.8211 16.805 16.2558 16.5304 16.5304C16.2558 16.805 15.8211 16.8225 15.5265 16.5821L15.4698 16.5304L12.0001 13.0607L8.53039 16.5304C8.2375 16.8233 7.76274 16.8233 7.46984 16.5304C7.17695 16.2375 7.17695 15.7627 7.46984 15.4698L10.9396 12.0001L7.46984 8.53039L7.41809 8.47375C7.17778 8.17917 7.19524 7.74445 7.46984 7.46984C7.74445 7.19524 8.17917 7.17778 8.47375 7.41809L8.53039 7.46984L12.0001 10.9396L15.4698 7.46984L15.5265 7.41809Z' fill='white'/%3E%3C/svg%3E");
}
</style>
