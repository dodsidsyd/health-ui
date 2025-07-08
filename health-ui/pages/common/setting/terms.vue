<template>
  <BaseBody :show-back-button="true" page-title="약관보기" logo-type="text">
    <section class="agreement">
      <strong>건강의신 회원 약관</strong>
      <ul>
        <li><TermsItem title="공공실손청구 서비스 이용 약관" /></li>
        <li><TermsItem title="개인(신용)정보 수집 및 이용 동의" /></li>
        <li><TermsItem title="민감정보(진료정보) 수집 및 이용 동의" /></li>
        <li>
          <TermsItem
            title="마케팅 활용 및 광고성 정보 수신 동의"
            :is-required="false"
            :show-date="true"
            date-text="2025.06.01"
          />
        </li>
        <li>
          <TermsItem
            title="마케팅 활용을 위한 개인정보의 제3자 제공 동의"
            :is-required="false"
            :show-date="true"
            date-text="2025.06.01"
          />
        </li>
      </ul>
    </section>
    <section class="agreement">
      <strong>건강의신 회원 약관</strong>
      <ul>
        <li><TermsItem title="고유식별정보 수집 및 이용 동의(의료기관용)" /></li>
        <li><TermsItem title="고유식별정보 수집 및 이용 동의(보험사용)" /></li>
        <li><TermsItem title="민감정보(진료정보) 제3자 제공 동의" /></li>
        <li><TermsItem title="개인(신용)정보 수집 및 이용 동의(AI분석)" /></li>
        <li><TermsItem title="민감정보(진료정보) 수집 및 이용 동의(AI분석)" /></li>
      </ul>
    </section>
    <section class="agreement">
      <strong>대리접수 서비스 약관</strong>
      <ul>
        <li><TermsItem title="대리접수 서비스 가입 개인(신용)정보 수집 및 이용 동의" /></li>
      </ul>
    </section>
    <section class="agreement">
      <strong>건강관리 서비스 약관</strong>
      <ul>
        <li><TermsItem title="맞춤형 건강관리서비스 제공을 위한 개인정보 수집 및 이용동의" /></li>
        <li><TermsItem title="맞춤형 건강관리서비스 제공을 위한 민감정보(진료정보) 수집 및 이용 동의" /></li>
        <li><TermsItem title="개인정보 및 민감정보(진료정보)의 제3자 제공동의" /></li>
      </ul>
    </section>
    <section class="agreement">
      <strong>건강부채 서비스 약관</strong>
      <ul>
        <li>
          <TermsItem
            title="건강부채 관리 서비스 제공을 위한 개인(신용)정보 처리 동의"
            :show-date="true"
            date-text="2025.06.01"
          />
        </li>
        <li>
          <TermsItem
            title="건강부채 관리 서비스 제공을 위한 민감정보(진료정보)의 수집 및 이용에 대한 동의"
            :show-date="true"
            date-text="2025.06.01"
          />
        </li>
      </ul>
    </section>
    <section class="agreement">
      <strong>청구의신 AI 분석 이용 약관</strong>
      <ul>
        <li>
          <TermsItem
            title="민감정보(진료정보) 제3자 제공 동의"
            :is-required="false"
            :show-date="true"
            date-text="2025.06.01"
          />
        </li>
        <li>
          <TermsItem
            title="민감정보(진료정보) 제3자 제공 동의"
            :is-required="false"
            :show-date="true"
            date-text="2025.06.01"
          />
        </li>
      </ul>
    </section>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TermsItem from '~/components/publishing/setting/TermsItem.vue'
</script>
<style lang="scss" scoped>
.agreement {
  margin: 0 -2rem;
  strong {
    display: block;
    padding: 1.7rem 2rem;
    line-height: 2.2rem;
  }
  ul {
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
  }
  li {
    margin: 0 2rem;
    & + li {
      border-top: 1px solid #eeeeee;
    }
  }
  & + .agreement {
    padding-top: 0;
    margin-top: 2.4rem;
  }
}
</style>
