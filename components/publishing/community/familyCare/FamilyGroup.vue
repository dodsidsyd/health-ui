<template>
  <div class="family-group-care">
    <div class="group-item-list">
      <div class="box-tab-wrap">
        <BoxedTabs :tabs="boxTabs" :active-key="activeBoxTab" variant="line-type" @tab-change="onBoxTabChange" />
      </div>
      <button type="button" class="btn-add-group" title="그룹 추가" @click="clickBottomModal">
        <i class="icon ico-plus"></i>
      </button>
    </div>

    <div class="member-list">
      <!-- 멤버 추가 전 -->
      <!-- <div class="add-member-tit">
        <div class="tit"><strong>맴버</strong>를 추가해 주세요</div>
        <button type="button" class="btn-add-member" title="그룹 추가" @click="clickBottomModal">
          <i class="icon ico-plus"></i>
        </button>
      </div> -->

      <!-- 멤버 추가 후  -->
      <div class="joined-member-tit">
        <nuxt-link to="javascript:void(0)" class="goto-list" title="멤버 리스트로 이동">
          <span class="member-profiles">
            <!-- 최대 3개까지 -->
            <img src="~/assets/images/community/img-rank-profile.png" alt="" />
            <img src="~/assets/images/community/img-rank-profile.png" alt="" />
            <img src="~/assets/images/community/img-rank-profile.png" alt="" />
          </span>
          <div class="tit">총<strong>10명</strong>이 참여중이에요</div>

          <i class="icon arrow-type-black"></i>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'

const activeBoxTab = ref('group1')
const boxTabs = ref<BoxTab[]>([
  { title: '우리집', key: 'group1' },
  { title: '동네친구들', key: 'group2' },
  { title: '베프', key: 'group3' },
  { title: '디자인팀', key: 'group4' }
])
const onBoxTabChange = (key: string) => {
  activeBoxTab.value = key
}
</script>

<style scoped lang="scss">
.group-item-list {
  position: relative;
  margin-top: 2rem;
  &:after {
    content: '';
    display: block;
    width: 0.1rem;
    position: absolute;
    right: 5rem;
    height: 2.4rem;
    background: #d2d2d2;
    top: 50%;
    transform: translateY(-50%);
  }
}
.box-tab-wrap {
  width: calc(100% - 8.2rem);
  position: relative;
  :deep(.boxed-tabs .tabs-container .tab-link.line-type) {
    border-width: 0.1rem;
  }
  :deep(.boxed-tabs .tabs-container .tab-link.line-type.active) {
    background-color: vars.$blue-primary;
    color: vars.$white;
  }
}
.btn-add-group {
  position: absolute;
  right: 0;
  top: 0;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: vars.$white;
  border: 0.1rem solid #e2e2e2;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M10 4L10 16M16 10L4 10' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  @include mixin.rippleEffectPrimary;
}
.add-member-tit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.8rem;
  .tit {
    font-size: 1.6rem;
    font-weight: 500;
    color: #2b2b2b;
    strong {
      font-size: 1.6rem;
      font-weight: 700;
      color: vars.$blue-primary;
      display: inline-flex;
      align-items: center;
      gap: 0 0.6rem;
      &::before {
        content: '';
        display: block;
        width: 2.4rem;
        height: 2.4rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url(~/assets/images/community/ico-member.svg);
      }
    }
  }
  .btn-add-member {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background-color: #4f5561;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 2rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M9.00039 5.3999L9.00039 12.5999M12.6004 8.9999L5.40039 8.9999' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    @include mixin.rippleEffectWhite;
  }
}
.member-list {
  margin-top: 2rem;
  padding-bottom: 2rem;
  border-bottom: 0.1rem solid #e2e2e2;
}

.joined-member-tit {
  .goto-list {
    display: flex;
    align-content: center;
    gap: 1.2rem;
    .tit {
      line-height: 2.5rem;
      font-size: 1.6rem;
      font-weight: 500;
      strong {
        font-size: 1.6rem;
        font-weight: 700;
        color: vars.$blue-primary;
      }
    }
    .icon {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      margin-left: auto;
    }
  }
}
.member-profiles {
  display: inline-flex;
  img {
    width: 2.4rem;
    height: 2.4rem;
    object-fit: cover;
    border: 0.1rem solid vars.$white;
    position: relative;
    border-radius: 50%;
    + img {
      margin-left: -1.2rem;
    }
  }
}
</style>
