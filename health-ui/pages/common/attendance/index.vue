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
    <Radio id="rdo9" name="rdo5" custom-style="button has-icon" aria-label="옵션 값" icon="ico-empty" />
    <Radio id="rdo10" name="rdo5" checked custom-style="button has-icon" aria-label="옵션 값" icon="ico-empty" />
    <Radio id="rdo11" name="rdo6" custom-style="button" aria-label="옵션 값" />
    <Radio id="rdo12" name="rdo6" checked custom-style="button" aria-label="옵션 값" />
    <Radio id="rdo13" name="rdo7" custom-style="button small" aria-label="옵션 값" />
    <Radio id="rdo114" name="rdo7" checked custom-style="button small" aria-label="옵션 값" />
    <p>check</p>
    <Checkbox id="checkBox13" />
    <Checkbox id="checkBox14" checked />
    <Checkbox id="checkBox15" disabled />
    <Checkbox id="checkBox16" disabled checked />
    <Checkbox id="checkBox17" custom-style="small" />
    <Checkbox id="checkBox18" custom-style="small" checked />
    <Checkbox id="checkBox19" custom-style="small" disabled />
    <Checkbox id="checkBox20" custom-style="small" checked disabled />
    <Checkbox id="checkBox21" custom-style="small non-border" />
    <Checkbox id="checkBox22" custom-style="small non-border" checked />
    <Checkbox id="checkBox23" custom-style="button" aria-label="옵션 값" />
    <Checkbox id="checkBox24" custom-style="button" aria-label="옵션 값" checked />
    <Checkbox id="checkBox27" custom-style="button agree-all" aria-label="약관전체 동의" />
    <Checkbox id="checkBox25" custom-style="switch" aria-label="" checked />
    <Checkbox id="checkBox26" custom-style="switch tiny" aria-label="" checked />
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
      <InputID />
      <Select
        :custom-opts="[
          { value: 'gmail.com', label: 'gmail.com' },
          { value: 'naver.com', label: 'naver.com' }
        ]"
      />
      <InputCalendar />
      <InputCalendars />
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
      <!-- 서류첨부 -->
      <div style="margin-top: 1rem">
        <label for="file-upload">
          서류첨부
          <input id="file-upload" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
        </label>
      </div>
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
import InputID from '~/components/publishing/input/InputID.vue'
import Select from '~/components/publishing/input/Select.vue'
import InputCalendar from '~/components/publishing/input/InputCalendar.vue'
import InputCalendars from '~/components/publishing/input/InputCalendars.vue'
import InputTimer from '~/components/publishing/input/InputTimer.vue'
import InputNum from '~/components/publishing/input/InputNum.vue'
import InputSearch from '~/components/publishing/input/InputSearch.vue'
import FieldSet from '~/components/publishing/input/FieldSet.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import Radio from '~/components/publishing/input/radio.vue'
</script>

<style lang="scss" scoped>
// 기본적인 스타일만 유지
</style>
