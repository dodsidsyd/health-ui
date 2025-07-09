<template>
  <BaseBody
    :show-back-button="false"
    page-title="약관보기"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-close-btn="true"
    class="pb-36"
  >
    <div class="agree-wrap flex flex-col gap-10 pb-48">
      <div class="fz-14 semibold">서비스 이용약관</div>
      <div class="agree-txt-box fz-14 flex flex-col gap-2">
        <div class="semibold">제1조(목적)</div>

        본 약관은 주식회사 레몬헬스케어(이하 “회사”라 함)가 제공하는 청구의신 서비스(이하 "서비스"라 함)의 이용과
        관련하여 회사와 회원 사이의 권리, 의무 및 책임사항, 기타 필요한 제반 사항을 규정함을 목적으로 합니다.
      </div>
      <div class="agree-txt-box fz-14 flex flex-col gap-2">
        <div class="semibold">제2조(목적)</div>
        제2조(용어의 정의) 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
        <ol class="num-type">
          <li>
            "회원"은 본 약관에 따라 가입신청에 대하여 "회사"의 승낙을 받아 "회사"가 제공하는 서비스를 이용할 수 있는
            사용자를 말합니다.
          </li>
          <li>
            “청구의신”이란 스마트폰, 태블릿 등 모바일 정보통신기기를 이용하여 진료내역 조회 기반의 서류 필요 없는
            실손보험 청구서비스, 병원 방문 필요 없는 병원서류 발급서비스, 종합병원 예약서비스, 보험청구 이력 데이터
            기반의 처방전/진료비세부내역서/진료비영수증 사본 저장/활용 및 개인 맞춤형 건강 컨텐츠 등 의료마이데이터 관련
            서비스를 제공할 수 있도록 “회사”가 개발 및 구축한 가상의 서비스 공간을 말하며, 앱 또는 웹 응용프로그램 등을
            포함합니다.
          </li>
          <li>
            "서비스"는 사용 가능한 정보통신설비(PC, 스마트폰, 태블릿, 모바일 정보통신기기 등의 정보통신기기 포함)와
            상관없이 "회원"이 이용할 수 있는 “청구의신”에서 제공되는 모든 서비스를 말합니다.
          </li>
          <li>
            “채널”은 "서비스"를 이용할 수 있는 “청구의신” 응용 프로그램을 호출할 수 있는 앱, 웹 또는 무인 KIOSK 등의
            정보통신설비를 말합니다.
          </li>
          <li>
            “포인트”는 "서비스" 가입을 장려하기 위하여 “회사”가 임의로 책정하여 “회원”에게 지급하는 재산적 가치가 없는
            "서비스" 상의 가상 점수로서 “회사”가 지정하는 특정 서비스나 콘텐츠 또는 이벤트 이용 혜택을 누릴 수 있는
            점수를 말합니다.
          </li>
          <li>"탈퇴"라 함은 "회사" 또는 "회원"이 "이용계약"을 해약하는 것을 말합니다.</li>
          <li>"잠금번호"라 함은 앱 로그인 시 본인 인증을 위하여 설정하는 6자리 숫자를 말합니다.</li>
          <li>
            본 약관에서 사용하는 용어의 정의는 본 조에서 정의하지 않은 용어에 대해서는 관련 법령에서 정한 바에 따르며,
            관련 법령에서 정하지 않은 것은 일반 상관례에 따릅니다.
          </li>
        </ol>
      </div>
      <div class="agree-txt-box fz-14 flex flex-col gap-2">
        <div class="semibold">제3조(약관의 효력 및 변경)</div>
        <ol class="num-type">
          <li>
            본 약관은 “서비스” 이용을 희망하는 사용자가 본 약관에 동의하고 “서비스”에 가입하여 “회원”이 됨과 동시에
            효력이 즉시 발생합니다.
          </li>
          <li>
            "회사"는 "약관의 규제에 관한 법률", "정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 "정보통신망법")" 등
            관련 법을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다. 합니다.
          </li>
        </ol>
      </div>
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 동의안함 </Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky"> 동의함 </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup>
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
</script>

<style lang="scss" scoped>
.agree-txt-box {
  ol.num-type {
    list-style: none;
    counter-reset: list-counter;
    padding-left: 0;
    margin: 0;

    li {
      counter-increment: list-counter;
      position: relative;
      padding-left: 2.4rem;
      margin-bottom: 0.8rem;
      line-height: 1.6;

      &::before {
        content: '(' counter(list-counter) ')';
        position: absolute;
        left: 0;
        top: 0;
        font-weight: 500;
        color: #333;
      }
    }
  }
}
</style>
