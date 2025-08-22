<template>
  <div :class="['invitation-section', { 'is-mobile': isMobile }]">
    <div class="invitation-tit">
      <h4 class="tit">{{ inviterName }}님의 초대!<br />지금 건강의신에서 함께해요</h4>
      <span v-if="!isMobile" class="family-name">패밀리케어명: {{ familyName }}</span>
    </div>
    <div class="invitation-content">
      <div class="invitation-img">
        <img src="~/assets/images/familycare/img-invitaion.png" alt="초대장 이미지" />
      </div>
    </div>
    <div class="invitation-btn" v-if="isMobile">
      <Button
        :border-radius="6"
        aria-label="참가하기"
        btn-type="primary"
        element-type="button"
        :class="['btn-join', { 'is-tooltip': isAppStore }]"
        @click="handleJoin"
      />
      <Button
        :border-radius="6"
        aria-label="APP Store 가입하기"
        btn-type="darkgray"
        class="btn-appstore"
        @click="handleAppStore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

interface Props {
  inviterName?: string
  familyName?: string
  isMobile?: boolean
  isAppStore?: boolean
}

type Emits = {
  join: []
  'app-store': []
}

const props = withDefaults(defineProps<Props>(), {
  inviterName: '김레몬',
  familyName: '동네사람들',
  isMobile: false,
  isAppStore: false
})

const emit = defineEmits<Emits>()

const handleJoin = () => {
  emit('join')
}

const handleAppStore = () => {
  emit('app-store')
}
</script>

<style lang="scss" scoped>
.invitation-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4rem 0;
  background: #fff;
  border-radius: 1.2rem;
  gap: 8rem;

  &.is-mobile {
    padding: 4.8rem 0 0;
    .invitation-tit {
      padding: 0 1.2rem;
    }
  }
}
.invitation-tit {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  .tit {
    font-size: 2.4rem;
    line-height: 3.1rem;
  }
  .family-name {
    padding-left: 3.2rem;
    background: url('~/assets/images/icon/ico-group.svg') no-repeat left center;
    line-height: 2.5rem;
    color: #555;
  }
}
.invitation-content {
  flex: 1;
  display: flex;
  justify-content: center;
  .invitation-img {
    width: 20rem;
    height: 20rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.invitation-btn {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  button {
    font-weight: 500;
  }
  .btn-join {
    &.is-tooltip {
      position: relative;
      overflow: visible;
      &::after {
        display: block;
        content: '';
        position: absolute;
        top: -0.8rem;
        left: 50%;
        width: 0.7rem;
        height: 0.4rem;
        transform: translateX(-50%);
        background-image: url("data:image/svg+xml,%3Csvg width='8' height='4' viewBox='0 0 8 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.73228 3C4.96248 4.33333 3.03798 4.33333 2.26818 3L0.536133 0H7.46433L5.73228 3Z' fill='%234F5561'/%3E%3C/svg%3E%0A");
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 1;
        animation: fadein 2s;
        -moz-animation: fadein 2s; /* Firefox */
        -webkit-animation: fadein 2s; /* Safari and Chrome */
        -o-animation: fadein 2s; /* Opera */
      }
      &::before {
        display: block;
        content: '이 버튼을 눌러도 반응이 없을 경우 APP을 설치해주시기 바랍니다.';
        position: absolute;
        top: -3.2rem;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 1.8rem);
        padding: 0.4rem 0.8rem;
        background: #4f5561;
        border-radius: 1.2rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.6rem;
        color: #fff;
        text-align: center;
        animation: fadein 2s;
        -moz-animation: fadein 2s; /* Firefox */
        -webkit-animation: fadein 2s; /* Safari and Chrome */
        -o-animation: fadein 2s; /* Opera */
      }
    }
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadein {
  /* Firefox */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadein {
  /* Safari and Chrome */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-o-keyframes fadein {
  /* Opera */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
