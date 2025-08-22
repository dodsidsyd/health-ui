<template>
  <BaseBody
    :show-back-button="false"
    page-title="인증 문자 확인 안내"
    logo-type="text"
    :has-close-btn="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <h3 class="tit-info">스팸 메시지 차단된 경우</h3>
    <div class="wrap-info-lists">
      <div class="item">KCB본인확인서비스(02-708-1007) 번호가 문자 앱에 서 차단되었을 수 있습니다.</div>
      <div class="item">아래와 같이 메시지가 차단되어 있는지 확인하시고 차단되었다면 해제 후 다시 이용해 주세요.<br />문자 앱 - 설정 - 메시지 차단</div>
    </div>
    <h3 class="tit-info">휴대폰 요금이 미납(연체)되었을 경우</h3>
    <div class="wrap-info-lists">
      <div class="item">휴대폰 요금이 미납된 경우에도 SMS가 발송 불가능할 수 있습니다.</div>
      <div class="item">휴대폰에서 114+ 통화 버튼을 눌러서 통신사 고객센터 에 문의 바랍니다.</div>
    </div>
    <h3 class="tit-info">이용 통신사의 스팸 필터링 서비스에 가입 한 경우</h3>
    <div class="wrap-info-lists">
      <div class="item">각 이동 통신 3사에서는 스팸 필터링 서비스를 제공하 고 있습니다.</div>
      <div class="item">통신사 고객센터에 가입 여부를 문의하시거나 통신사 앱에서도 부가서비스 확인 및 해지 가능합니다.</div>
      <div class="item">휴대폰에서 114+ 통화 버튼을 눌러 통신사 고객센터에 문의 바랍니다.</div>
    </div>
    
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'


definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})

</script>

<style scoped lang="scss">
.tit-info {
  margin-top: 1.6rem;
}
.wrap-info-lists {
  padding: 1rem 0;
  + .tit-info {
    margin-top: 1.2rem;
  }
  .item {
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    &:not(:first-child) {
      margin-top: 0.8rem;
    }
    & > span {
      color: #4C7FF7;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
}
</style>
