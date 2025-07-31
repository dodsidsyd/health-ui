<template>
  <div class="family-schedule">
    <div class="schedule-tit">
      <h4 class="tit">패밀리 일정</h4>
      <nuxt-link to="javascript:void(0)" title="패밀리 스케쥴 페이지로 이동">
        <i class="icon arrow-type-black" aria-hidden="true"></i>
      </nuxt-link>
    </div>

    <div class="schedule-item-list">
      <div class="schedule-item" :class="{ 'is-expanded': expandedItems[0] }">
        <button type="button" class="btn-schedule-collapse" @click="toggleSchedule(0)">
          <div class="tit">치과 임플란트 예약</div>
          <div class="schdule-time">4월17일 금 오후 1시</div>
          <div class="representative-info" v-if="!expandedItems[0]">
            <span class="member-box">
              <img src="~/assets/images/img-community-01.png" alt="" />
              <strong>아빠 외 5명</strong>
            </span>
          </div>
        </button>
        <div class="schedule-member">
          <span class="member-box">
            <img src="~/assets/images/img-community-01.png" alt="" />
            <strong>김동건</strong>
          </span>
          <span class="member-box">
            <img src="~/assets/images/img-community-01.png" alt="" />
            <strong>김동건</strong>
          </span>
          <span class="member-box">
            <img src="~/assets/images/img-community-01.png" alt="" />
            <strong>김동건</strong>
          </span>
          <span class="member-box">
            <img src="~/assets/images/img-community-01.png" alt="" />
            <strong>김동건</strong>
          </span>
          <span class="member-box">
            <img src="~/assets/images/img-community-01.png" alt="" />
            <strong>아빠</strong>
          </span>
          <span class="member-box">
            <img src="~/assets/images/img-community-01.png" alt="" />
            <strong>엄마</strong>
          </span>
        </div>
      </div>

      <div class="schedule-item" :class="{ 'is-expanded': expandedItems[1] }">
        <button type="button" class="btn-schedule-collapse" @click="toggleSchedule(1)">
          <div class="tit">치과 임플란트 예약</div>
          <div class="schdule-time">4월17일 금 오후 1시</div>
          <div class="representative-info" v-if="!expandedItems[1]">
            <span class="member-box">
              <img src="~/assets/images/img-community-01.png" alt="" />
              <strong>엄마 외 2명</strong>
            </span>
          </div>
        </button>
        <div class="schedule-member">
          <span class="member-box">
            <img src="~/assets/images/img-community-01.png" alt="" />
            <strong>김동건</strong>
          </span>
          <span class="member-box">
            <img src="~/assets/images/img-community-01.png" alt="" />
            <strong>아빠</strong>
          </span>
          <span class="member-box">
            <img src="~/assets/images/img-community-01.png" alt="" />
            <strong>엄마</strong>
          </span>
        </div>
      </div>
    </div>

    <button type="button" class="btn-add-schedule mb-12"><i class="icon ico-plus-lg"></i>일정 추가하기</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 각 스케줄 아이템의 확장 상태를 관리
const expandedItems = ref<boolean[]>([false, false])

// 특정 스케줄 아이템의 토글 상태를 변경
const toggleSchedule = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}
</script>

<style scoped lang="scss">
.family-schedule {
  margin-top: 3.2rem;
  .schedule-tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3.2rem;

    .tit {
      font-size: 2rem;
      font-weight: 700;
      color: #2b2b2b;
    }
    .icon {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .schedule-item-list {
    .schedule-item {
      border-bottom: 0.1rem solid #eee;
      padding: 2rem 0;

      &.is-expanded {
        .btn-schedule-collapse {
          &:after {
            transform: rotate(0deg);
          }
        }

        .schedule-member {
          max-height: 200px;
          opacity: 1;
          padding-top: 1.2rem;
          transform: translateY(0);
        }
      }
    }
    .btn-schedule-collapse {
      display: flex;
      flex-direction: column;
      gap: 0.8rem 0;
      justify-content: flex-start;
      padding-right: 5.6rem;
      width: 100%;
      text-align: left;
      position: relative;
      .tit {
        font-size: 1.8rem;
        font-weight: 500;
        color: #2b2b2b;
      }
      .schdule-time {
        font-size: 1.4rem;
        font-weight: 500;
        color: #959595;
      }
      &:after {
        content: '';
        position: absolute;
        width: 2.4rem;
        height: 2.4rem;
        right: 0;
        transform: rotate(180deg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='none'%3E%3Cpath d='M7 14.5L12 9.5L17 14.5' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .representative-info {
        position: absolute;
        right: 3.2rem;
        top: 0.3rem;

        .member-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.8rem 0;
        }
        img {
          width: 2.4rem;
          height: 2.4rem;
          object-fit: contain;
          border-radius: 50%;
        }
        strong {
          font-size: 1.4rem;
          font-weight: 500;
          color: #555;
        }
      }
    }
    .schedule-member {
      padding-top: 0;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      gap: 1.6rem;
      transform: translateY(-10px);
      transition:
        max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        opacity 0.35s ease 0.1s,
        padding-top 0.3s ease 0.05s,
        transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s;
      .member-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0 0 auto;
        gap: 0.4rem 0;
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
        }
        strong {
          font-size: 1.4rem;
          font-weight: 500;
          color: #555;
        }
      }
    }
  }
}
.btn-add-schedule {
  position: relative;
  border-radius: 3.2rem;
  padding: 0.7rem 1.6rem;
  border: 0.1rem solid #e2e2e2;
  background: vars.$white;
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 0.4rem;
  margin-top: 1.2rem;
  justify-self: center;
  @include mixin.rippleEffectPrimary;
  .icon {
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
  }
}
</style>
