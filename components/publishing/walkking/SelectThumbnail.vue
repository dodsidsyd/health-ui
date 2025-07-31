<template>
  <div class="profile-photo">
    <img :src="profileImageSrc" alt="프로필 사진" />
    <label>
      <input type="file" accept="image/*" @change="handleImageUpload" />
    </label>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import defaultProfileImage from '~/assets/images/walkingking/img-select-thumbnail.png'
// 프로필 이미지 관련 상태
const profileImageSrc = ref(defaultProfileImage)

// 이미지 업로드 핸들러
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      profileImageSrc.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
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
</style>
