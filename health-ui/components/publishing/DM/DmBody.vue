<template>
  <div class="dm-talk-body">
    <!-- 날짜 구분 뱃지 -->
    <div class="date-line">
      <p class="date-text">2024년 12월 12일 월요일</p>
    </div>

    <!-- 본인 : mine 클래스 추가 -->
    <article class="chat-message mine">
      <div class="message-content">
        <div class="sender-wrap">
          <span class="profile-img"><img src="~/assets/images/img-community-01.png" alt="" /></span>
          <strong class="sender-name">장두시기</strong>
        </div>
        <!-- 메세지 그룹 -->
        <div class="message-text">
          <p class="text">안녕하세요!</p>
          <time class="time">2024.12.13</time>
        </div>
        <!-- 메세지 그룹 -->
        <div class="message-text">
          <p class="text"><i class="highlight">안녕</i>하세요 2!</p>
          <time class="time">2024.12.13</time>
        </div>
      </div>
    </article>

    <!-- 발송인  -->
    <article class="chat-message">
      <!-- 메세지 박스 -->
      <div class="message-content">
        <!-- 메세지 그룹 -->
        <div class="message-text">
          <p class="text">안녕하세요!</p>
          <time class="time">2024.12.13</time>
        </div>
        <!-- 메세지 그룹 -->
        <div class="message-text">
          <!-- prettier-ignore -->
          <p class="text">두줄 이상일 
경우</p>
          <time class="time">방금전</time>
        </div>
      </div>

      <!-- 메세지 박스 -->
      <div class="message-content">
        <!-- 메세지 그룹 -->
        <div class="message-text">
          <p class="text"><i class="highlight">안녕</i>하세요!</p>
          <time class="time">2024.12.13</time>
        </div>
        <!-- 메세지 그룹 -->
        <div class="message-text">
          <!-- prettier-ignore -->
          <p class="text">두줄 이상일 

경우</p>
          <time class="time">방금전</time>
        </div>
      </div>
    </article>

    <!-- 본인 : mine 클래스 추가 -->
    <article class="chat-message mine">
      <div class="message-content">
        <div class="sender-wrap">
          <span class="profile-img"><img src="~/assets/images/img-community-01.png" alt="" /></span>
          <strong class="sender-name">장두시기</strong>
        </div>
        <!-- 메세지 그룹 -->
        <div class="message-text">
          <p class="text">답변 텍스트</p>
          <time class="time">24분전</time>
        </div>
      </div>
    </article>

    <!-- 발송인  -->
    <article class="chat-message">
      <!-- 메세지 박스 -->
      <div class="message-content">
        <!-- 메세지 그룹 -->
        <div class="message-text">
          <p class="text">
            <!-- 검색된 텍스트 hightlight -->
            <i class="highlight">안녕</i>하세요!
          </p>
          <time class="time">2024.12.13</time>
        </div>
        <!-- 메세지 그룹 -->
        <div class="message-text">
          <!-- prettier-ignore -->
          <p class="text">두줄 이상일 
경우</p>
          <time class="time">방금전</time>
        </div>
      </div>

      <!-- 메세지 박스 -->
      <div class="message-content">
        <!-- 메세지 그룹 -->
        <div class="message-text">
          <p class="text">안녕하세요!</p>
          <time class="time">2024.12.13</time>
        </div>
        <!-- 메세지 그룹 -->
        <div class="message-text">
          <!-- prettier-ignore -->
          <p class="text">두줄 이상일 
            경우 두줄 이상일 
            경우 두줄 이상일 
            경우 두줄 이상일 
            경우 경우 두줄 이상일 
            경우 두줄 이상일 
            경우 두줄 이상일 
            경우 경우 두줄 이상일 
            경우 두줄 이상일 
            경우 두줄 이상일 
            경우 경우 두줄 이상일 
            경우 두줄 이상일 
            경우 두줄 이상일 
            경우</p>
          <time class="time">방금전</time>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dm-talk-body {
  height: 100%; /* 명시적 높이 설정 */
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
    margin: 2.4rem 0 1.2rem;
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
        max-width: 70%;
      }
      .time {
        font-size: 1.1rem;
        font-weight: 400;
        color: #959595;
      }
    }
    &.mine {
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

  // 검색어 하이라이트
  .highlight {
    display: inline-block;
    padding: 0 0.2rem;
    position: relative;
    top: -0.1rem;
    background: #fbc700;
    color: #555;
  }
}
</style>
