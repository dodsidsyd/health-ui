<template>
  <div class="member-list">
    <div class="member-tit">운영자</div>
    <div class="administrator-profile">
      <span class="profile-img"><img src="~/assets/images/community/img-rank-profile.png" alt="" /></span>
      <strong class="member-name">유재훈(나)</strong>
    </div>

    <div class="member-list-wrap">
      <div class="member-tit">멤버<strong>5</strong></div>
      <div class="add-group-tit">
        <button type="button" class="btn-add-member" @click="clickBottomModal">멤버 초대하기</button>
      </div>
      <div class="item-list">
        <div class="member-item">
          <div class="member-profile">
            <span class="profile-img"><img src="~/assets/images/community/img-rank-profile.png" alt="" /></span>
            <strong class="member-name">큰아들큰아들큰아들큰아들큰아들</strong>
          </div>
          <div class="modify-btns">
            <button type="button" class="btn-modify">이름바꾸기</button>
            <button type="button" class="btn-modify">삭제</button>
          </div>
        </div>

        <div class="member-item">
          <div class="member-profile">
            <span class="profile-img"><img src="~/assets/images/community/img-rank-profile.png" alt="" /></span>
            <strong class="member-name">큰아들</strong>
          </div>
          <div class="modify-btns">
            <button type="button" class="btn-modify">이름바꾸기</button>
            <button type="button" class="btn-modify">삭제</button>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <BottomModal
        :is-visible="isShowBottomModal"
        title="멤버 초대하기"
        :is-show-close-button="true"
        :is-show-cancel-button="false"
        :is-show-confirm-button="false"
        @close="toggleBottomModal"
      >
        <template #content>
          <div class="invitation-wrap">
            <p class="tit">상대방에게 초대장을 보낼 방법을 선택하세요.</p>

            <div class="invitation-send-list">
              <div class="invitation-item">
                <button type="button" class="btn-invitation">
                  <i class="icon ico-kakao" aria-hidden="true"></i>카카오톡으로 초대하기
                </button>
              </div>
              <div class="invitation-item">
                <button type="button" class="btn-invitation">
                  <i class="icon ico-link" aria-hidden="true"></i>초대링크를 복사
                </button>
              </div>
              <div class="invitation-item">
                <button type="button" class="btn-invitation">
                  <i class="icon ico-share" aria-hidden="true"></i>기타
                </button>
              </div>
            </div>
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'

const isShowBottomModal = ref(false)
const clickBottomModal = () => {
  toggleBottomModal()
}
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}
</script>

<style scoped lang="scss">
.member-list {
  padding-top: 2rem;
  .member-tit {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2b2b2b;
    strong {
      color: vars.$blue-primary;
      display: inline-block;
      margin-left: 0.2rem;
    }
  }
  .profile-img {
    border-radius: 50%;
    width: 4.8rem;
    height: 4.8rem;
    display: block;
    flex: 0 0 auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .administrator-profile {
    display: flex;
    align-items: center;
    gap: 0 1.2rem;
    padding: 1.2rem 0;
    margin-bottom: 3.2rem;
    .profile-img {
      position: relative;
      border: 0.3rem solid vars.$blue-primary;
      &:after {
        content: '';
        display: block;
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        right: -1rem;
        top: -0.6rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M22.2853 12.0001C22.2853 17.6807 17.6802 22.2858 11.9996 22.2858C6.31894 22.2858 1.71387 17.6807 1.71387 12.0001C1.71387 6.31943 6.31894 1.71436 11.9996 1.71436C17.6802 1.71436 22.2853 6.31943 22.2853 12.0001Z' fill='%234C7FF7'/%3E%3Cpath d='M21.2567 12.0001C21.2567 6.88749 17.1122 2.74293 11.9996 2.74293C6.887 2.74293 2.74244 6.88749 2.74244 12.0001C2.74244 17.1126 6.887 21.2572 11.9996 21.2572V22.2858C6.31894 22.2858 1.71387 17.6807 1.71387 12.0001C1.71387 6.31943 6.31894 1.71436 11.9996 1.71436C17.6802 1.71436 22.2853 6.31943 22.2853 12.0001C22.2853 17.6807 17.6802 22.2858 11.9996 22.2858V21.2572C17.1122 21.2572 21.2567 17.1126 21.2567 12.0001Z' fill='white'/%3E%3Cpath d='M16.1377 16.2857H7.86188C7.56935 16.2857 7.3193 16.0598 7.26961 15.7504L6.39844 10.3087C6.35997 10.0706 6.44973 9.82918 6.63005 9.68397C6.81118 9.53789 7.05082 9.51469 7.25438 9.62038L9.57378 10.8311L11.4748 7.16458C11.6864 6.75471 12.3139 6.75471 12.5255 7.16458L14.4266 10.8311L16.746 9.62038C16.9487 9.51469 17.1892 9.53789 17.3703 9.68397C17.5506 9.82918 17.6396 10.0698 17.6019 10.3087L16.7307 15.7504C16.6802 16.0598 16.4302 16.2857 16.1377 16.2857Z' fill='white'/%3E%3C/svg%3E");
      }
    }
  }
  .item-list {
    margin-top: 2.2rem;
    border-top: 0.1rem solid #eee;
  }
  .member-item {
    display: flex;
    align-content: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1.2rem 0;
    gap: 0 1.2rem;
    border-bottom: 0.1rem solid #eee;
    .member-profile {
      display: flex;
      min-width: 0;
      flex: 1;
      align-items: center;
      gap: 0 1.2rem;
    }
    .member-name {
      min-width: 0;
    }
  }
}

.btn-add-member {
  display: flex;
  gap: 0 1.2rem;
  margin-top: 3rem;
  &::before {
    content: '';
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background-color: #4f5561;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M9.00039 5.3999L9.00039 12.5999M12.6004 8.9999L5.40039 8.9999' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  }
  font-size: 1.6rem;
  font-weight: 700;
  color: #2b2b2b;
}
.modify-btns {
  flex: 0 0 auto;
  display: flex;
  gap: 0 2.4rem;
  pointer-events: auto; // 드래그 중에도 클릭 가능
  z-index: 10; // 드래그 중에도 상위에 위치
  position: relative;

  .btn-modify {
    font-size: 1.4rem;
    font-weight: 500;
    color: #555;
    position: relative;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
    touch-action: manipulation; // 터치 지연 방지
    -webkit-tap-highlight-color: transparent; // iOS에서 터치 하이라이트 제거
    user-select: none; // 텍스트 선택 방지

    &:active {
      color: #4f5561;
      background: rgba(79, 85, 97, 0.1);
    }

    & + .btn-modify {
      &::before {
        content: '';
        display: block;
        width: 0.1rem;
        height: 1.6rem;
        top: 50%;
        margin-top: -0.8rem;
        position: absolute;
        left: -1.2rem;
        background: #e2e2e2;
      }
    }
  }
}

.invitation-wrap {
  .tit {
    text-align: left;
    color: #555;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 1.6rem;
  }
}
.invitation-send-list {
  text-align: left;
  .invitation-item {
    & + .invitation-item {
      border-top: 0.1rem solid #eee;
    }
  }
  .btn-invitation {
    display: flex;
    align-items: center;
    gap: 0 1.2rem;
    font-weight: 700;
    color: #2b2b2b;
    padding: 1.6rem 0;
    width: 100%;
    position: relative;
    @include mixin.rippleEffectPrimary;
  }
  .icon {
    display: inline-block;
    width: 4rem;
    height: 4rem;
    background-size: 4rem;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
