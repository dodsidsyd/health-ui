<template>
  <BaseBody logo-type="image" :has-notification="true" :has-reward="true" custom-title="건강의신">
    <p>Radio</p>
    <Radio id="rdo1" name="rdo1" />
    <Radio id="rdo2" name="rdo1" checked />
    <Radio id="rdo3" name="rdo2" disabled />
    <Radio id="rdo4" name="rdo2" disabled checked />
    <Radio id="rdo5" name="rdo3" custom-style="small" />
    <Radio id="rdo6" name="rdo3" checked custom-style="small" />
    <Radio id="rdo7" name="rdo4" disabled custom-style="small" />
    <Radio id="rdo8" name="rdo4" disabled checked custom-style="small" />
    <Radio id="rdo9" name="rdo6" custom-style="button" aria-label="옵션 값" />
    <Radio id="rdo10" name="rdo6" checked custom-style="button" aria-label="옵션 값" />
    <Radio id="rdo11" name="rdo7" custom-style="button small" aria-label="옵션 값" />
    <Radio id="rdo12" name="rdo7" checked custom-style="button small" aria-label="옵션 값" />
    <div class="wrap-radio-btn">
      <RadioImg id="rdo13" name="rdo5" custom-style="button has-icon" text="옵션 값" icon="ico-empty" />
      <RadioImg id="rdo14" name="rdo5" checked custom-style="button has-icon" text="옵션 값" icon="ico-empty" />
    </div>
    <p>check</p>
    <Checkbox id="checkBox13" v-model="checkbox13" />
    <Checkbox id="checkBox14" v-model="checkbox14" />
    <Checkbox id="checkBox15" v-model="checkbox15" disabled />
    <Checkbox id="checkBox16" v-model="checkbox16" disabled />
    <Checkbox id="checkBox17" v-model="checkbox17" custom-style="small" />
    <Checkbox id="checkBox18" v-model="checkbox18" custom-style="small" />
    <Checkbox id="checkBox19" v-model="checkbox19" custom-style="small" disabled />
    <Checkbox id="checkBox20" v-model="checkbox20" custom-style="small" disabled />
    <Checkbox id="checkBox21" v-model="checkbox21" custom-style="small non-border" />
    <Checkbox id="checkBox22" v-model="checkbox22" custom-style="small non-border" />
    <Checkbox id="checkBox23" v-model="checkbox23" custom-style="button" aria-label="옵션 값" />
    <Checkbox id="checkBox24" v-model="checkbox24" custom-style="button" aria-label="옵션 값" />
    <Checkbox id="checkBox27" v-model="checkbox27" custom-style="button agree-all" aria-label="약관전체 동의" />
    <Checkbox id="checkBox25" v-model="checkbox25" custom-style="switch" aria-label="" />
    <Checkbox id="checkBox26" v-model="checkbox26" custom-style="switch tiny" aria-label="" />
    <hr style="margin: 40px 0" />

    <p>input</p>

    <hr style="margin-top: 40px" />
    <div style="margin-top: 40px; margin-bottom: 40px">
      <FieldSet />
      <FieldSet is-valid />
      <FieldSet disabled />
      <InputText placeholder="플레이스홀더" />
      <InputText placeholder="0" unit-r="Kcal" />
      <InputText unit-l="총 기간" placeholder="5" unit-r="년" />
      <InputNum />
      <InputPhone
        :custom-opts="[
          { value: 'KT', label: 'KT' },
          { value: 'SKT', label: 'SKT' },
          { value: 'LG U+', label: 'LG U+' }
        ]"
      />
      <InputMail
        label=""
        :is-valid="false"
        class="require"
        valid-text="올바른 이메일 주소를 입력해주세요."
        placeholder="이메일을 입력해주세요"
        :custom-domains="[
          { value: 'gmail.com', label: 'gmail.com' },
          { value: 'naver.com', label: 'naver.com' },
          { value: 'daum.net', label: 'daum.net' },
          { value: 'kakao.com', label: 'kakao.com' }
        ]"
      />
      
      <div class="resident-id-form-group">
        <label for="resident-id-front" class="resident-id-label">주민등록번호</label>
        <div class="resident-id-inputs">
          <input
            id="resident-id-front"
            v-model="residentIdFront"
            type="tel"
            class="resident-id-input"
            maxlength="6"
            placeholder="생년월일 6자리"
            inputmode="numeric"
            aria-label="주민등록번호 앞 6자리"
          />
          <span class="resident-id-hyphen">-</span>
          <input
            id="resident-id-back"
            v-model="residentIdBack"
            type="tel"
            class="resident-id-input"
            maxlength="7"
            placeholder="뒷자리 입력"
            inputmode="numeric"
            aria-label="주민등록번호 뒤 7자리"
          />
        </div>
      </div>
      <Select
        :custom-opts="[
          { value: 'gmail.com', label: 'gmail.com' },
          { value: 'naver.com', label: 'naver.com' }
        ]"
      />
      <DatePicker />

      <InputCalendar />

      <InputCalendarFromTo />
      <InputTimer />
      <InputText inp-type="search" />
      <Select
        inp-type="search"
        :custom-opts="[
          { value: 'gmail.com', label: 'gmail.com' },
          { value: 'naver.com', label: 'naver.com' }
        ]"
      />
      <InputSearch />
      <InputAddress label="지역선택" :is-valid="false" class="require" placeholder="주소를 검색해주세요" />
    </div>
    <div>
      <p>Sticky</p>
      <Button btn-type="primary" element-type="button" aria-label="버튼명" class="lg btn-sticky" />
      <Button btn-type="primary" element-type="div" aria-label="버튼명" class="lg btn-sticky" disabled />
      <Button btn-type="secondary" element-type="button" aria-label="버튼명" class="lg btn-sticky" />
      <Button btn-type="secondary" element-type="div" aria-label="버튼명" disabled class="lg btn-sticky" />
    </div>
    <div style="margin-top: 20px">
      <p>Button Group</p>
      <ButtonGroup>
        <Button btn-type="secondary" element-type="button" aria-label="버튼명" class="lg btn-sticky" />
        <Button btn-type="primary" element-type="button" aria-label="버튼명" class="lg btn-sticky" />
      </ButtonGroup>
      <ButtonGroup gap="8">
        <Button btn-type="secondary" element-type="button" aria-label="버튼명" />
        <Button btn-type="primary" element-type="button" aria-label="버튼명" />
      </ButtonGroup>
    </div>
    <div style="margin-top: 20px">
      <p>Button Solid</p>
      <Button btn-type="primary" element-type="button" aria-label="버튼명" />
      <Button btn-type="primary" element-type="button" aria-label="버튼명" disabled />
      <Button btn-type="secondary" element-type="button" aria-label="버튼명" />
      <Button btn-type="secondary" element-type="button" aria-label="버튼명" disabled />
    </div>
    <div style="margin-top: 20px">
      <p>Button Solid Small</p>
      <Button btn-type="primary" element-type="button" aria-label="버튼명" class="sm" />
      <Button btn-type="primary" element-type="button" aria-label="버튼명" class="sm" disabled />
      <Button btn-type="secondary" element-type="button" aria-label="버튼명" class="sm" />
      <Button btn-type="secondary" element-type="button" aria-label="버튼명" class="sm" disabled />
    </div>
    <div style="margin-top: 20px">
      <p>Button Solid xSmall has icon</p>
      <Button btn-type="primary" element-type="button" aria-label="버튼명" class="xs" icon="save-line" :width="7.8" />
      <Button btn-type="primary" element-type="button" aria-label="버튼명" class="xs" icon="ico-empty" :width="7.8" />
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="버튼명"
        class="xs"
        icon="ico-empty"
        disabled
        :width="7.8"
      />
      <Button btn-type="secondary" element-type="button" aria-label="버튼명" class="xs" icon="ico-empty" :width="7.8" />
      <Button
        btn-type="secondary"
        element-type="button"
        aria-label="버튼명"
        class="xs"
        disabled
        icon="ico-empty"
        :width="7.8"
      />
    </div>
    <div style="margin-top: 20px">
      <p>Button outline</p>
      <Button btn-type="line" element-type="button" aria-label="버튼명" />
      <Button btn-type="line" element-type="button" aria-label="버튼명" disabled />
      <Button btn-type="line" element-type="button" aria-label="버튼명" class="sm" />
      <Button btn-type="line" element-type="button" aria-label="버튼명" class="sm" disabled />
      <Button btn-type="line" element-type="button" aria-label="버튼명" class="xs" icon="ico-empty" :width="8.6" />
      <Button
        btn-type="line"
        element-type="button"
        aria-label="버튼명"
        class="xs"
        disabled
        icon="ico-empty"
        :width="8.6"
      />
      <Button
        btn-type="line"
        element-type="button"
        aria-label="버튼명"
        class="xs"
        icon="ico-empty"
        :width="8.3"
        :border-radius="18"
      />
      <Button
        btn-type="line"
        element-type="button"
        aria-label="버튼명"
        class="xs"
        disabled
        icon="ico-empty"
        :width="8.3"
        :border-radius="18"
      />
      <Button
        btn-type="line"
        element-type="button"
        aria-label="버튼명"
        class="xxs"
        icon="ico-empty"
        :width="7.5"
        :border-radius="14"
      />
      <Button
        btn-type="line"
        element-type="button"
        aria-label="버튼명"
        class="xxs"
        disabled
        icon="ico-empty"
        :width="7.5"
        :border-radius="14"
      />
    </div>
    <div style="margin-top: 20px">
      <p>Text Button</p>
      <div>
        <Button
          btn-type="text"
          element-type="button"
          aria-label="텍스트버튼명"
          icon="ico-greater-than"
          icon-position="right"
          :icon-size="20"
        />
        <Button btn-type="text" element-type="button" aria-label="텍스트버튼명" icon="ico-empty" />
        <Button btn-type="text" element-type="button" aria-label="텍스트버튼명" disabled />
        <Button btn-type="text" element-type="button" aria-label="텍스트버튼명" class="hasLine" />
      </div>
      <div>
        <Button
          btn-type="text"
          element-type="button"
          aria-label="텍스트버튼명"
          icon="ico-greater-than"
          icon-position="right"
          class="xs"
          :icon-size="16"
        />
        <Button btn-type="text" element-type="button" aria-label="텍스트버튼명" icon="ico-empty" class="xs" />
        <Button btn-type="text" element-type="button" aria-label="텍스트버튼명" class="xs" disabled />
        <Button btn-type="text" element-type="button" aria-label="텍스트버튼명" class="hasLine xs" />
      </div>
      <div>
        <Button
          btn-type="text"
          element-type="button"
          aria-label="텍스트버튼명"
          icon="ico-greater-than"
          icon-position="right"
          class="xxs"
          :icon-size="16"
        />
        <Button btn-type="text" element-type="button" aria-label="텍스트버튼명" icon="ico-empty" class="xxs" />
        <Button btn-type="text" element-type="button" aria-label="텍스트버튼명" class="xxs" disabled />
        <Button btn-type="text" element-type="button" aria-label="텍스트버튼명" class="hasLine xxs" />
      </div>
    </div>
    <div style="margin-top: 20px; margin-bottom: 20px">
      <p>Icon Button</p>
      <Button btn-type="primary" element-type="button" :border-radius="20" :width="4" :height="4" class="ico-set-w">
        <span></span>
      </Button>
      <Button
        btn-type="Button"
        element-type="button"
        :border-radius="20"
        :width="4"
        :height="4"
        disabled
        class="ico-set"
      >
        <span></span>
      </Button>
      <Button btn-type="line" element-type="button" :border-radius="20" :width="4" :height="4" class="ico-set">
        <span></span>
      </Button>
      <Button btn-type="primary" element-type="button" :border-radius="48" :width="5.6" :height="5.6" class="ico-write">
        <span></span>
      </Button>
      <Button btn-type="text" element-type="button" :border-radius="20" :width="4" :height="4" class="ico-set-w">
        <span></span>
      </Button>
      <!-- 서류첨부 -->
      <label class="btn-attach" for="file-upload">
        <input id="file-upload" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
        <img src="/assets/images/insu/icon-attach.svg" alt="첨부파일" />
        <span class="text">첨부서류</span>
      </label>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import InputPhone from '~/components/publishing/input/InputPhone.vue'
import InputMail from '~/components/publishing/input/InputMail.vue'

import Select from '~/components/publishing/input/Select.vue'
import InputCalendar from '~/components/publishing/input/InputCalendar.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'
import InputTimer from '~/components/publishing/input/InputTimer.vue'
import InputNum from '~/components/publishing/input/InputNum.vue'
import InputSearch from '~/components/publishing/input/InputSearch.vue'
import FieldSet from '~/components/publishing/input/FieldSet.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import Radio from '~/components/publishing/input/radio.vue'
import RadioImg from '~/components/publishing/input/radioImg.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'

import DatePicker from '~/components/publishing/input/DatePicker.vue'

// 체크박스 상태 관리
const checkbox13 = ref(false)
const checkbox14 = ref(true)
const checkbox15 = ref(false)
const checkbox16 = ref(true)
const checkbox17 = ref(false)
const checkbox18 = ref(true)
const checkbox19 = ref(false)
const checkbox20 = ref(true)
const checkbox21 = ref(false)
const checkbox22 = ref(true)
const checkbox23 = ref(false)
const checkbox24 = ref(true)
const checkbox25 = ref(true)
const checkbox26 = ref(true)
const checkbox27 = ref(false)

// 주민등록번호 입력 필드
const residentIdFront = ref('')
const residentIdBack = ref('')
</script>

<style lang="scss" scoped>
// 기본적인 스타일만 유지
.btn-attach {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding: 1.8rem;
  border-radius: 0.8rem;
  background-color: #f9f9f9;
  border: 0.1rem dashed var(--Semantic-Border-BRD-01, #e2e2e2);
  [type='file'] {
    display: none;
  }
}
.resident-id-form-group {
  // margin: 1rem;
  width: 100%; /* Ensures it takes full width of its parent */
  // max-width: 400px; /* Optional: Sets a max width for desktop for better aesthetics */
  .resident-id-label {
    display: block; /* Makes the label take its own line */
    margin-bottom: 0.6rem;
    font-weight: 400;
    color: #555;
    font-size: 12px;
    position: relative;
    &.required {
      &::after {
        content: "*";
        font-size: 1.2rem;
        display: inline-block;
        margin-left: 0.3rem;
        color: #f14960;
      }
    }
  }
  .resident-id-inputs {
    display: flex; /* Uses flexbox for horizontal alignment */
    align-items: center; /* Vertically aligns items */
    gap: 10px; /* Space between inputs and hyphen */
    .resident-id-input {
      flex: 1; /* Allows inputs to grow and shrink */
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box; /* Includes padding and border in the element's total width and height */
      min-width: 0; /* Allows shrinking below content size */
      &::placeholder {
        color: #bbb;
      }
    }
    .resident-id-hyphen {
      font-size: 18px;
      color: #555;
      font-weight: bold;
    }
  }
}
</style>
