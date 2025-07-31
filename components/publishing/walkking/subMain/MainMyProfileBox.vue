<template>
  <div class="main-profile-box">
    <div class="profile-photo">
      <img :src="profileImageSrc" alt="" />
      <label
        ><input type="file" accept="image/*" @change="handleImageUpload" /><i
          class="icon ico-modify"
          aria-label="프로필 사진 선택"
        ></i
      ></label>
    </div>
    <div class="profile-txt">
      <strong class="name">고윤정이뻐<i class="badge">12</i></strong>
      <span class="location">서울 강남</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import defaultProfileImage from '~/assets/images/img-profile.svg'

// 이미지 업로드 핸들러
const profileImageSrc = ref(defaultProfileImage)
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

<style scoped lang="scss">
.main-profile-box {
  display: flex;
  flex-direction: row;
  gap: 0 2rem;
  .profile-photo {
    width: 5.6rem;
    height: 5.6rem;
    position: relative;
    flex: 0 0 auto;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
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
      .ico-modify {
        display: inline-block;
        position: absolute;
        right: -0.2rem;
        bottom: -0.2rem;
        width: 2.4rem;
        height: 2.4rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 2rem;
        background-color: vars.$white;
        border-radius: 50%;
        box-shadow: -0.3rem -0.3rem 0.5rem rgba(0, 0, 0, 0.2);
      }
    }
  }
  .profile-txt {
    display: flex;
    flex-direction: column;
    color: vars.$white;
    gap: 0.2rem 0;
    .name {
      font-weight: 700;
      font-size: 1.8rem;
      display: flex;
      gap: 0 1.2rem;
      min-width: 0;
      word-break: break-all;
      align-items: flex-start;
      .badge {
        display: inline-flex;
        margin-top: 0.4rem;
        gap: 0 0.2rem;
        font-size: 1.4rem;
        font-weight: 500;
        flex: 0 0 auto;
        min-width: 0;
        &::before {
          content: '';
          display: inline-block;
          width: 1.8rem;
          height: 1.8rem;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M7.99602 0.996491C8.58219 0.525258 9.41725 0.525258 10.0034 0.996492L11.3725 2.09714C11.6109 2.28875 11.8991 2.40813 12.2031 2.44118L13.9495 2.631C14.6972 2.71227 15.2877 3.30275 15.3689 4.05045L15.5588 5.79682C15.5918 6.10085 15.7112 6.38907 15.9028 6.62742L17.0034 7.99651C17.4747 8.58268 17.4747 9.41774 17.0034 10.0039L15.9028 11.373C15.7112 11.6114 15.5918 11.8996 15.5588 12.2036L15.3689 13.95C15.2877 14.6977 14.6972 15.2881 13.9495 15.3694L12.2031 15.5592C11.8991 15.5923 11.6109 15.7117 11.3725 15.9033L10.0034 17.0039C9.41725 17.4752 8.58219 17.4752 7.99602 17.0039L6.62693 15.9033C6.38858 15.7117 6.10036 15.5923 5.79633 15.5592L4.04996 15.3694C3.30227 15.2881 2.71179 14.6977 2.63051 13.95L2.44069 12.2036C2.40765 11.8996 2.28826 11.6114 2.09665 11.373L0.996003 10.0039C0.52477 9.41774 0.52477 8.58268 0.996003 7.99651L2.09665 6.62742C2.28826 6.38907 2.40765 6.10085 2.44069 5.79682L2.63051 4.05045C2.71179 3.30275 3.30227 2.71227 4.04996 2.631L5.79633 2.44118C6.10036 2.40813 6.38858 2.28875 6.62693 2.09714L7.99602 0.996491Z' fill='%23C4D6FF'/%3E%3Ccircle cx='9.11457' cy='8.99982' r='5.60675' fill='%234C7FF7'/%3E%3Cpath d='M11.5719 8.6389L10.1425 7.85713L9.36075 6.4277C9.28912 6.29512 9.15045 6.21436 8.99958 6.21436C8.84871 6.21436 8.71156 6.29665 8.63841 6.4277L7.85665 7.85713L6.42722 8.6389C6.29463 8.71053 6.21387 8.8492 6.21387 9.00007C6.21387 9.15094 6.29616 9.28809 6.42722 9.36124L7.85665 10.143L8.63841 11.5724C8.71004 11.705 8.84871 11.7858 8.99958 11.7858C9.15045 11.7858 9.2876 11.7035 9.36075 11.5724L10.1425 10.143L11.5719 9.36124C11.7045 9.28961 11.7853 9.15094 11.7853 9.00007C11.7853 8.8492 11.7045 8.71053 11.5719 8.6389Z' fill='%23C4D6FF'/%3E%3C/svg%3E");
        }
      }
    }
  }
}
</style>
