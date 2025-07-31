<template>
  <div class="add-family-before">
    <div class="add-group-tit">
      <div class="tit"><strong>그룹</strong>을 추가해 주세요</div>
      <button type="button" class="btn-add-group" title="그룹 추가" @click="clickBottomModal">
        <i class="icon ico-plus"></i>
      </button>
    </div>
    <div class="group-title">
      <div class="title-txt">
        <p>
          가족, 친구, 지인<br />
          누구라도 패밀리가 될수 있어요
        </p>
        <h2>함께 건강을 나누세요</h2>
      </div>
    </div>

    <Teleport to="body">
      <BottomModal
        :is-visible="isShowBottomModal"
        title="그룹명"
        :is-show-close-button="true"
        :is-show-cancel-button="false"
        :is-show-confirm-button="false"
        @close="toggleBottomModal"
      >
        <template #content>
          <div class="pb-32 mb-24">
            <InputText />
            <div class="regist-wrap">
              <button type="button" class="btn-regist">등록하기</button>
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
import InputText from '~/components/publishing/input/InputText.vue'

const isShowBottomModal = ref(false)
const clickBottomModal = () => {
  toggleBottomModal()
}
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}
</script>

<style scoped lang="scss">
.add-family-before {
  margin-top: 2rem;
}
.add-group-tit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
        background-image: url(~/assets/images/community/ico-group.svg);
      }
    }
  }
  .btn-add-group {
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 0.1rem solid #e2e2e2;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 2rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M10 4L10 16M16 10L4 10' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    @include mixin.rippleEffectPrimary;
  }
}
.group-title {
  margin: 0 -2rem -2rem;
  height: calc(100vh - 21.4rem);

  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.5) 26.08%, rgba(255, 255, 255, 0) 50%),
    linear-gradient(180deg, #fff 6.72%, rgba(255, 255, 255, 0) 50%),
    url(~/assets/images/community/img-add-groupBanner.png) lightgray center bottom / cover no-repeat;
  .title-txt {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-items: center;
    gap: 0.8rem 0;
    color: #2b2b2b;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%;
    position: relative;
    top: 5.4rem;
    h2 {
      font-weight: 700;
      font-size: 3rem;
      line-height: 130%;
    }
  }
}
.regist-wrap {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5.6rem;
  padding: 1.6rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-top: 0.1rem solid #e2e2e2;
  .btn-regist {
    position: relative;
    font-weight: 500;
    line-height: 2.2rem;
    color: var(--blue-primary);
    overflow: hidden;
    @include mixin.rippleEffectPrimary;
  }
}
</style>
