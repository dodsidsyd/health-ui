<template>
  <!-- 
    :notification-count="" 공지사항 갯수 
    :chat-count="" 챗팅 갯수
  -->
  <BaseBody
    page-title="전체메뉴"
    logo-type="text"
    :has-notification="true"
    :has-setting="true"
    :has-search="true"
    :has-chat="true"
    :notification-count="5"
    :chat-count="12"
    @search="handleSearch"
  >
    <div class="flex flex-col mt-12">
      <section class="profile-box flex flex-row align-center">
        <div class="flex flex-col gap-10">
          <div class="flex gap-12 flex-row align-center">
            <strong class="fz-22 bold">장동건</strong>
            <span class="fz-16 medium location">서울 금천</span>
            <span class="reward medium">12</span>
          </div>
          <div class="fz-16 medium flex flex-row gap-24">
            <div class="flowing-txt">팔로잉 <strong>152</strong></div>
            <div class="flowing-txt">팔로워 <strong>10</strong></div>
          </div>
        </div>
        <div class="profile-photo ml-auto">
          <img src="~/assets/images/img-profile.svg" alt="프로필 사진" />
        </div>
      </section>
      <section class="flex flex-row gap-12 profile-info pb-12">
        <div class="box-info flex flex-col">
          <span class="tit">바우처</span>
          <div class="text">3개</div>
        </div>
        <div class="box-info flex flex-col">
          <span class="tit">보유 P</span>
          <div class="text">98,400 P</div>
        </div>
      </section>
      <hr class="hr-section ml-n20 mr-n20" />

      <section class="menu-section">
        <div class="flex flex-row align-center">
          <div class="fz-16 medium">건강</div>
          <Button btn-type="line" element-type="button" class="xs pl-14 pr-14 w-auto ml-auto regular">
            걸음수 통계
          </Button>
        </div>
        <div class="menu-list">
          <div class="list-item">
            <NuxtLink to="#">걷기왕 챌린지</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">LeMON 건강지수</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">식단관리</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">건강노트</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">마음건강</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">건강 Tip</NuxtLink>
          </div>
        </div>
      </section>

      <section class="menu-section">
        <div class="flex flex-row align-center">
          <div class="fz-16 medium">청구의신</div>
          <div class="flex flex-row gap-8 ml-auto">
            <Button btn-type="line" element-type="button" class="xs pl-14 pr-14 w-auto regular">
              MY 병원 <strong class="semibold">3</strong>
            </Button>
            <Button btn-type="line" element-type="button" class="xs pl-14 pr-14 w-auto regular">
              실손보험사 <strong class="semibold">12</strong>
            </Button>
          </div>
        </div>
        <div class="menu-list">
          <div class="list-item">
            <NuxtLink to="#">보상금찾기</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">실손청구</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">실손청구 이력</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">진료예약</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">진료예약 이력</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">병원서류발급</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">자동청구가입</NuxtLink>
          </div>
        </div>
      </section>

      <section class="menu-section">
        <div class="flex flex-row align-center">
          <div class="fz-16 medium">커뮤니티</div>
          <Button btn-type="line" element-type="button" class="xs pl-14 pr-14 w-auto ml-auto regular">
            MY 커뮤니티
          </Button>
        </div>
        <div class="menu-list">
          <div class="list-item">
            <NuxtLink to="#">걷기왕</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">건강/질병</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">운동</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">일상/유머</NuxtLink>
          </div>
        </div>
      </section>

      <section class="menu-section">
        <div class="flex flex-row align-center">
          <div class="fz-16 medium">레몬포인트 / 결제</div>
          <Button btn-type="line" element-type="button" class="xs pl-14 pr-14 w-auto ml-auto regular">
            레몬포인트 존
          </Button>
        </div>
        <div class="menu-list">
          <div class="list-item">
            <NuxtLink to="#">레몬스토어 내역</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">레몬포인트 스토어</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">레몬포인트 충전</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">결제 내역</NuxtLink>
          </div>
        </div>
      </section>

      <section class="menu-section">
        <div class="flex flex-row align-center">
          <div class="fz-16 medium">고객센터</div>
        </div>
        <div class="menu-list">
          <div class="list-item">
            <NuxtLink to="#">공지사항</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">FAQ</NuxtLink>
          </div>
          <div class="list-item">
            <NuxtLink to="#">1 : 1 문의</NuxtLink>
          </div>
        </div>
      </section>

      <section class="menu-section">
        <div class="flex flex-row align-center mb-20">
          <div class="fz-16 medium">이벤트</div>
          <Button btn-type="line" element-type="button" class="xs pl-14 pr-14 w-auto ml-auto regular">
            전체보기
          </Button>
        </div>
        <CommonSwiper
          :slides="imageSlides"
          slide-type="image"
          :slides-per-view="1"
          :space-between="20"
          :navigation="false"
          :pagination="{ clickable: true }"
          :autoplay="true"
          :scrollbar="false"
          :show-play-pause-button="false"
          :show-slide-length="false"
        />
      </section>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'

import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import imgBanner from '@/assets/images/img-banner.png'

// 이미지 슬라이드 데이터 (로컬 이미지 사용)
const imageSlides = [imgBanner, imgBanner, imgBanner, imgBanner]
</script>
<style scoped lang="scss">
.profile-box {
  color: rgb(var(--gray-16)) !important;
  .location {
    position: relative;
    padding-right: 1.2rem;
    color: rgb(var(--gray-11)) !important;
    &::after {
      content: '';
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;
      right: 0rem;
      top: 50%;
      margin-top: -0.3rem;
      border-radius: 50%;
      background: #959595;
    }
  }
  .reward {
    display: inline-flex;
    align-items: center;
    &::before {
      content: '';
      display: inline-block;
      margin-right: 0.2rem;
      width: 1.8rem;
      height: 1.8rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1.8rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cg clip-path='url(%23clip0_7370_24223)'%3E%3Cpath d='M7.99651 0.996003C8.58268 0.52477 9.41774 0.52477 10.0039 0.996003L11.373 2.09665C11.6114 2.28826 11.8996 2.40765 12.2036 2.44069L13.95 2.63051C14.6977 2.71179 15.2881 3.30227 15.3694 4.04996L15.5592 5.79633C15.5923 6.10036 15.7117 6.38858 15.9033 6.62693L17.0039 7.99602C17.4752 8.58219 17.4752 9.41725 17.0039 10.0034L15.9033 11.3725C15.7117 11.6109 15.5923 11.8991 15.5592 12.2031L15.3694 13.9495C15.2881 14.6972 14.6977 15.2877 13.95 15.3689L12.2036 15.5588C11.8996 15.5918 11.6114 15.7112 11.373 15.9028L10.0039 17.0034C9.41774 17.4747 8.58268 17.4747 7.99651 17.0034L6.62742 15.9028C6.38907 15.7112 6.10085 15.5918 5.79682 15.5588L4.05045 15.3689C3.30275 15.2877 2.71227 14.6972 2.631 13.9495L2.44118 12.2031C2.40813 11.8991 2.28875 11.6109 2.09714 11.3725L0.996491 10.0034C0.525258 9.41725 0.525258 8.58219 0.996492 7.99602L2.09714 6.62693C2.28875 6.38858 2.40813 6.10036 2.44118 5.79633L2.631 4.04996C2.71227 3.30227 3.30275 2.71179 4.05045 2.63051L5.79682 2.44069C6.10085 2.40765 6.38907 2.28826 6.62742 2.09665L7.99651 0.996003Z' fill='%23C4D6FF'/%3E%3Ccircle cx='9.11457' cy='8.99933' r='5.60675' fill='%234C7FF7'/%3E%3Cpath d='M11.5724 8.63841L10.143 7.85665L9.36124 6.42722C9.28961 6.29463 9.15094 6.21387 9.00007 6.21387C8.8492 6.21387 8.71205 6.29616 8.6389 6.42722L7.85713 7.85665L6.4277 8.63841C6.29512 8.71004 6.21436 8.84871 6.21436 8.99958C6.21436 9.15045 6.29665 9.2876 6.4277 9.36075L7.85713 10.1425L8.6389 11.5719C8.71053 11.7045 8.8492 11.7853 9.00007 11.7853C9.15094 11.7853 9.28809 11.703 9.36124 11.5719L10.143 10.1425L11.5724 9.36075C11.705 9.28912 11.7858 9.15045 11.7858 8.99958C11.7858 8.84871 11.705 8.71004 11.5724 8.63841Z' fill='%23C4D6FF'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_7370_24223'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
    }
  }
  .flowing-txt {
    & + .flowing-txt {
      position: relative;
      &::before {
        content: '';
        width: 0.1rem;
        height: 1.4rem;
        position: absolute;
        left: -1.2rem;
        top: 50%;
        margin-top: -0.7rem;
        background: #e2e2e2;
      }
    }
  }
}
.profile-info {
  width: 100%;
  margin-top: 2rem;
  .box-info {
    background: #f4f4f4;
    border-radius: 0.8rem;
    padding: 1.6rem;
    width: 100%;
    .tit {
      font-weight: 500;
    }
    .text {
      font-weight: 700;
      text-align: right;
    }
  }
}

.menu-section {
  margin: 0 -2rem;
  padding: 2.4rem 2rem 2rem;
  & + .menu-section {
    border-top: 0.1rem solid #eee;
  }
  .menu-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.7rem;
    .list-item {
      flex: 0 0 50%;
      a {
        display: block;
        padding: 1.7rem 0;
        font-size: 1.6rem;
        font-weight: 700;
        color: rgb(var(--gray-16)) !important;
      }
    }
  }
}
</style>
