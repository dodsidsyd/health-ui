<template>
  <div class="talk-dm">
    <!-- 날짜 구분 뱃지 -->
    <div class="date-line">
      <p class="date-text">2024년 12월 12일 월요일</p>
    </div>

    <!-- 메시지 목록 영역 -->
    <div class="message-list">
      <article class="complete-message">
        <!-- 메세지 박스 -->
        <div class="complete-content">
          <!-- 메세지 그룹 -->
          <div class="complete-person-wrap">
            <span class="profile-img"><img src="~/assets/images/img-community-01.png" alt="" /></span>
            <strong class="complete-person-name">아빠</strong>
          </div>
          <div class="message-text">
            <!-- prettier-ignore -->
            <p class="text"><strong class="task-name">감기약 복용</strong>을 완료하셨습니다.</p>
          </div>
        </div>
      </article>
    </div>

    <!-- 날짜 구분 뱃지 -->
    <div class="date-line">
      <p class="date-text">2024년 12월 13일 월요일</p>
    </div>

    <!-- 메시지 목록 영역 -->
    <div class="message-list">
      <article class="complete-message">
        <!-- 메세지 박스 -->
        <div class="complete-content">
          <!-- 메세지 그룹 -->
          <div class="complete-person-wrap">
            <span class="profile-img"><img src="~/assets/images/img-community-01.png" alt="" /></span>
            <strong class="complete-person-name">엄마</strong>
          </div>
          <div class="message-text">
            <!-- prettier-ignore -->
            <p class="text"><strong class="task-name">건강검진 다녀오기</strong>을 완료하셨습니다.</p>
          </div>
        </div>
      </article>
    </div>

    <!-- 날짜 구분 뱃지 -->
    <div class="date-line">
      <p class="date-text">2024년 12월 14일 월요일</p>
    </div>

    <!-- 메시지 목록 영역 -->
    <div class="message-list">
      <article class="chat-message">
        <!-- 메세지 박스 -->
        <div class="message-content">
          <!-- 메세지 그룹 -->
          <div class="message-text">
            <p class="text"><i class="highlight">안녕</i>하세요!</p>
          </div>
          <!-- 메세지 그룹 -->
          <div class="message-text">
            <!-- prettier-ignore -->
            <p class="text">두줄 이상일 

경우</p>
          </div>
        </div>
      </article>

      <!-- 발신자 : sender 클래스 추가 -->
      <article class="chat-message sender">
        <div class="message-content">
          <div class="sender-wrap">
            <span class="profile-img"><img src="~/assets/images/img-community-01.png" alt="" /></span>
            <strong class="sender-name">사위</strong>
          </div>
          <!-- 메세지 그룹 -->
          <div class="message-text">
            <p class="text">
              <!-- prettier-ignore -->
              미션 완료안한사람들 얼른해요~ 
오늘하루도화이팅입니다~~~~ 
다같이 힘내보아요 아자아자 화이팅팅팅
            </p>
          </div>
        </div>
      </article>
    </div>

    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed talk-btns">
      <InputImage />
      <BtnEmoji />
      <InputMessage v-model="messageText" placeholder="하고싶은 말을 자유롭게 남겨주세요" />
      <ButtonSend />
    </ButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import ButtonSend from '~/components/publishing/button/ButtonSend.vue'
import InputMessage from '~/components/publishing/input/InputMessage.vue'
import InputImage from '~/components/publishing/input/InputImage.vue'
import BtnEmoji from '~/components/publishing/input/BtnEmoji.vue'

// Props 정의 개선
interface Props {
  conversationId?: string
  userId?: string
}

// Lifecycle
onMounted(() => {
  // 필요한 초기화 로직
})
</script>

<style scoped lang="scss">
.talk-dm {
  height: 100%;
  flex: 1;
  margin: 0 -2rem;
  padding: 2.4rem 2rem 0;
  background: #e7f4ff;
  overflow-y: auto;
  overflow-x: hidden;

  /* Webkit 브라우저 (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  &::-webkit-scrollbar {
    display: none !important;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  /* Firefox */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
  /* IE/Edge legacy */
  -ms-overflow-style: none; /* IE/Edge에서 스크롤바 숨김 */

  .date-line {
    display: flex;
    justify-content: center;

    .date-text {
      padding: 0.5rem 1.2rem;
      border-radius: 1.3rem;
      color: vars.$white;
      background: #4f5561;
      font-size: 1.2rem;
      line-height: 1.6rem;
      font-weight: 400;
    }
  }

  .chat-message {
    padding: 0;
    margin-bottom: 1.2rem;
    text-align: left;

    .sender-wrap {
      margin-left: -3.8rem;
      position: relative;
      padding-left: 3.8rem;
      height: 2.6rem;
      .profile-img {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        left: 0;
        top: 0;
        overflow: hidden;
        display: block;
        position: absolute;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .sender-name {
        font-size: 1.4rem;
        font-weight: 500;
        color: #2b2b2b;
        line-height: 2rem;
        display: inline-block;
      }
    }
    .message-content {
      & + .message-content {
        margin-top: 2rem;
      }
    }
    .message-text {
      display: flex;
      flex-direction: row-reverse;
      gap: 0.8rem;
      align-items: flex-end;

      justify-content: flex-start;
      & + .message-text {
        margin-top: 0.8rem;
      }
      .text {
        background: vars.$blue-primary;
        padding: 1.2rem 1.6rem;
        border-radius: 2.3rem;
        border-top-right-radius: 0;
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 140%;
        white-space: pre-line;
        word-break: break-word;
        overflow-wrap: break-word;
        color: vars.$white;
        position: relative;
      }
      .time {
        font-size: 1.1rem;
        font-weight: 400;
        color: #959595;
      }
    }
    &.sender {
      padding-left: 3.8rem;
      .message-text {
        justify-content: flex-start;
        flex-direction: row;
        .text {
          border-top-left-radius: 0;
          border-top-right-radius: 2.3rem;
          background: vars.$white;
          color: #555;
        }
      }
    }
  }

  .complete-message {
    border-radius: 1.2rem;
    padding: 1.2rem;
    background: vars.$white;
    .complete-content {
      display: flex;
      align-items: center;
      justify-items: center;
      gap: 0 0.6rem;
    }
    .complete-person-wrap {
      display: flex;
      gap: 0 0.8rem;
      align-items: center;
      justify-items: center;
      flex: 0;
      .profile-img {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .message-text {
      .task-name {
        color: vars.$blue-primary;
        font-weight: 500;
      }
    }
  }
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 0;
}

.is-fixed {
  height: 5.6rem;
  padding: 0.9rem 1.6rem;
  background: vars.$white;
  display: flex;
  align-items: center;
  gap: 0 1.2rem;
  .c-inpType .c-inp-el .c-inp {
    line-height: 3.8rem;
    height: 3.8rem;
  }
}
</style>
