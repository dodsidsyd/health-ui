<template>
  <BaseBody :show-back-button="true" page-title="설정  " logo-type="text" class="pb-36">
    <div>
      <section class="no_gap pt-0 pb-0 ml-n20 mr-n20">
        <div class="flex space-between profile-box">
          <div class="flex">
            <div class="profile-photo flex flex-center">
              <img src="~/assets/images/img-profile.svg" alt="프로필 사진" />
            </div>
            <div class="profile-info flex flex-col left">
              <strong class="nickname">닉네임88닉네임88</strong>
              <span class="name">김건강</span>
            </div>
          </div>
          <div class="flex-00"><NuxtLink to="#">내 정보 수정하기</NuxtLink></div>
        </div>
        <div class="">
          <div class="flex space-between align-center">
            <strong>걸음수 측정</strong>
            <Checkbox id="checkBox1" custom-style="switch" aria-label="" checked />
          </div>
        </div>
      </section>
      <hr class="hr-section ml-n20 mr-n20" />
      <section class="no_gap pt-20 pb-0">
        <div>
          <div class="alarm-box list-box">
            <ul class="list link">
              <li class="notFlex">
                <div class="alarm-set">
                  <strong>알림설정</strong>
                  <div class="flex align-center space-between">
                    <p class="alarm-status">
                      <i :class="isAlarmOn ? 'icon ico-bell-on' : 'icon ico-bell-off'"></i>
                      {{ isAlarmOn ? '휴대폰 앱 알림이 켜져있습니다.' : '휴대폰 앱 알림이 꺼져있습니다.' }}
                    </p>
                    <Button
                      btn-type="secondary"
                      element-type="button"
                      class="xs pl-14 pr-14 w-auto ml-auto regular"
                      @click="toggleAlarm"
                    >
                      {{ isAlarmOn ? '알림끄기' : '알림켜기' }}
                    </Button>
                  </div>
                </div>

                <div class="alarm-list">
                  <ul class="list">
                    <li>
                      <div>
                        <p>건강</p>
                        <span>걷기왕, 식단관리, 건강미션, 건강부채 등</span>
                      </div>
                      <Checkbox id="checkBox2" custom-style="switch" aria-label="" checked />
                    </li>
                    <li>
                      <div>
                        <p>청구의 신</p>
                        <span>실손청구, 진료예약, 병원서류발급 등</span>
                      </div>
                      <Checkbox id="checkBox3" custom-style="switch" aria-label="" />
                    </li>
                    <li>
                      <div>
                        <p>커뮤니티</p>
                        <span>추천글, 내글 댓글 등</span>
                      </div>
                      <Checkbox id="checkBox4" custom-style="switch" aria-label="" />
                    </li>
                    <li>
                      <div>
                        <p>포인트</p>
                        <span>포인트 적립, 포인트 사용, 유효기간만료 등</span>
                      </div>
                      <Checkbox id="checkBox5" custom-style="switch" aria-label="" />
                    </li>
                    <li>
                      <div>
                        <p>행운복권</p>
                        <span>복권수령, 당첨안내, 유효기간만료 등</span>
                      </div>
                      <Checkbox id="checkBox6" custom-style="switch" aria-label="" />
                    </li>
                    <li>
                      <div>
                        <p>고객센터</p>
                        <span>공지사항, 문의답변 등</span>
                      </div>
                      <Checkbox id="checkBox7" custom-style="switch" aria-label="" />
                    </li>
                    <li>
                      <div>
                        <p>서비스관리</p>
                        <span>캐시데이터 알림, 앱 업데이트 알림 등</span>
                      </div>
                      <Checkbox id="checkBox8" custom-style="switch" aria-label="" />
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <NuxtLink>
                  <strong>캐시 데이터 관리</strong>
                  <span class="data gray">4.04MB</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink>
                  <strong>캐시 데이터 관리</strong>
                  <div>
                    <span class="version gray">ver 1.1.001</span>
                    <em class="ml-10">최신버전</em>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <hr class="hr-section ml-n20 mr-n20" />
      <section class="no_gap pt-0 pb-0">
        <div class="list-box">
          <ul class="list link">
            <li>
              <NuxtLink>
                <strong>개인데이터 이용내역</strong>
                <span class="use gray">4.04MB</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink>
                <strong>약관보기</strong>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink>
                <strong>개인정보처리방침</strong>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </section>
      <hr class="hr-section ml-n20 mr-n20" />
      <section class="no_gap pt-0 pb-0">
        <div class="list-box">
          <ul class="list link">
            <li>
              <NuxtLink>
                <strong>로그아웃</strong>
                <span class="gray id">hong4878</span>
                <!-- <span class="gray id kakao">간편계정-카카오</span>
                <span class="gray id naver">간편계정-네이버</span>
                <span class="gray id google">간편계정-구글</span> -->
              </NuxtLink>
            </li>
            <li>
              <NuxtLink>
                <strong>회원탈퇴</strong>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import Button from '~/components/publishing/button/Button.vue'

// 알림 상태
const isAlarmOn = ref(false)

// 토글 함수
function toggleAlarm() {
  isAlarmOn.value = !isAlarmOn.value
}
</script>

<style scoped lang="scss">
hr ~ hr {
  margin-top: 0;
}
.profile-box {
  padding: 0.8rem 2rem 1rem 2rem;
  border-bottom: 1px solid #eee;
  .profile-info {
    span {
      &:before {
        display: none;
      }
    }
  }
  & + div {
    padding: 1.8rem 2rem 0;
  }
  a {
    display: inline-block;
    margin-top: 1.3rem;
    padding-right: 2.2rem;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7.49984 5.83398L11.6665 10.0007L7.49984 14.1673' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      no-repeat center right / 2rem;
  }
}
.profile-photo {
  width: 8.3rem;
  height: 8.3rem;
  margin-right: 1rem;
  @media (max-width: 375px) {
    width: 7rem;
    height: 7rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
  }
}
.profile-info {
  margin-top: 1.3rem;
  strong,
  span {
    display: inline-block;
    word-break: break-all;
  }

  .nickname {
    font-size: var(--num-18);
    font-weight: vars.$bold;
  }
  .name {
    font-size: var(--num-14);
    font-weight: vars.$medium;
    color: #959595;
  }
}

.list-box {
  margin: 0 -2rem 0;
}
.list {
  li {
    display: flex;
    &:not(:has(li)) {
      padding: 2rem;
    }

    &:not(:has(a)) {
      justify-content: space-between;
    }

    &:has(a) {
      padding: 0;

      a {
        padding: 2rem 3.2rem 2rem 2rem;
      }
    }

    &.notFlex {
      display: list-item;
    }

    & + li {
      border-top: 1px solid #eee;
    }
  }

  p {
    font-weight: vars.$semibold;
    line-height: 2rem;
  }
  strong {
    display: block;
    line-height: 2.2rem;
  }
  span {
    display: inline-block;
    font-size: var(--num-14);
    line-height: 2rem;
    &.id {
      position: relative;
      &:before {
        display: block;
        content: '';
        position: absolute;
        top: 50%;
        left: -3.2rem;
        width: 2.6rem;
        height: 2.6rem;
        transform: translateY(-50%);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Crect x='0.5' y='0.5' width='27' height='27' rx='13.5' fill='url(%23pattern0_2209_69629)' stroke='%23EEEEEE'/%3E%3Cdefs%3E%3Cpattern id='pattern0_2209_69629' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0_2209_69629' transform='scale(0.00416667)'/%3E%3C/pattern%3E%3Cimage id='image0_2209_69629' width='240' height='240' preserveAspectRatio='none' xlink:href='data:image/png;base64,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'/%3E%3C/defs%3E%3C/svg%3E%0A");
      }
      &.kakao {
        &:before {
          background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='28' height='28' rx='14' fill='%23FAE300'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14 6.99951C9.85766 6.99951 6.5 9.59364 6.5 12.7931C6.5 14.7829 7.79868 16.537 9.77628 17.5803L8.9442 20.6199C8.87068 20.8885 9.17786 21.1026 9.41373 20.9469L13.0611 18.5397C13.3689 18.5694 13.6818 18.5867 14 18.5867C18.1421 18.5867 21.5 15.9927 21.5 12.7931C21.5 9.59364 18.1421 6.99951 14 6.99951Z' fill='black'/%3E%3C/svg%3E%0A");
        }
      }
      &.naver {
        &:before {
          background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='28' height='28' rx='14' fill='%2303C75A'/%3E%3Cpath d='M16.1368 14.422L11.6877 8H8V20H11.8632V13.577L16.3123 20H20V8H16.1368V14.422Z' fill='white'/%3E%3C/svg%3E%0A");
        }
      }
      &.google {
        &:before {
          background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='27' height='27' rx='13.5' fill='white'/%3E%3Crect x='0.5' y='0.5' width='27' height='27' rx='13.5' stroke='%23EEEEEE'/%3E%3Cg clip-path='url(%23clip0_2209_69627)'%3E%3Cpath d='M14 12.5454V15.6436H18.3054C18.1164 16.64 17.549 17.4836 16.6981 18.0509L19.2945 20.0655C20.8072 18.6691 21.68 16.6182 21.68 14.1819C21.68 13.6146 21.6291 13.0691 21.5345 12.5455L14 12.5454Z' fill='%234285F4'/%3E%3Cpath d='M9.51674 15.5225L8.93116 15.9707L6.8584 17.5852C8.17476 20.1961 10.8727 21.9998 14 21.9998C16.1599 21.9998 17.9708 21.287 19.2945 20.0653L16.6981 18.0507C15.9854 18.5307 15.0763 18.8216 14 18.8216C11.92 18.8216 10.1528 17.418 9.52001 15.5271L9.51674 15.5225Z' fill='%2334A853'/%3E%3Cpath d='M6.85812 10.4141C6.31269 11.4904 6 12.7049 6 13.9995C6 15.294 6.31269 16.5086 6.85812 17.5849C6.85812 17.5921 9.51998 15.5194 9.51998 15.5194C9.35998 15.0394 9.26541 14.5304 9.26541 13.9994C9.26541 13.4684 9.35998 12.9593 9.51998 12.4793L6.85812 10.4141Z' fill='%23FBBC05'/%3E%3Cpath d='M14.0002 9.18545C15.1784 9.18545 16.2256 9.59271 17.062 10.3782L19.3529 8.0873C17.9638 6.79278 16.1602 6 14.0002 6C10.8729 6 8.17476 7.79636 6.8584 10.4146L9.52018 12.48C10.1529 10.5891 11.9202 9.18545 14.0002 9.18545Z' fill='%23EA4335'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_2209_69627'%3E%3Crect width='16' height='16' fill='white' transform='translate(6 6)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
        }
      }
    }
  }
  em {
    display: inline-block;
    font-size: var(--num-14);
    line-height: 2rem;
  }

  .gray {
    color: #959595;
  }

  .list {
    border-top: 1px solid #eee;
    padding: 0 2rem;

    li {
      padding: 1.2rem 0;
    }
  }

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }

  &.link {
    a {
      padding-right: 5.2rem;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7.50033 5.83301L11.667 9.99967L7.50033 14.1663' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
        no-repeat center right 2rem;
      cursor: pointer;
    }
  }
}

.alarm-box {
  .alarm-status {
    position: relative;
    padding-left: 3rem;
    line-height: 2.4rem;
    @media (max-width: 375px) {
      font-size: 1.4rem;
    }
    .icon {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 2.4rem;
      height: 2.4rem;
    }
  }
}

.alarm-set {
  padding: 0 2rem 2rem;
}
</style>
