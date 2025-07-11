<template>
  <BaseBody page-title="1:1문의" :show-back-button="true">
    <Select
      label="문의카테고리*"
      :select-placeholder="'카테고리를 선택해주세요.'"
      :custom-opts="[
        { value: 'gmail.com', label: 'gmail.com' },
        { value: 'naver.com', label: 'naver.com' }
      ]"
    />
    <div class="mt-12">
      <InputText label="문의제목*" placeholder="제목을 입력해주세요." />
    </div>
    <div class="mt-12">
      <FieldSet label="문의내용*" placeholder="문의 내용을 입력해주세요." :countArea="false"></FieldSet>
    </div>
    <div class="mt-12">
      <AttachedFile />
    </div>
    <!-- 25-07-11 pb-48 추가 -->
    <div class="mt-8 pb-48">
      <AttachedWrap>
        <CustomerCenterAttached file-name="문의사항 정리본.pdf" file-size="33.5MB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="54564.8MB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
        <CustomerCenterAttached file-name="screenshot_202501051248.gif" file-size="132.8KB" />
      </AttachedWrap>
    </div>
  </BaseBody>
  <ButtonGroup asymmetric class="is-fixed">
    <Button btn-type="secondary" element-type="button" aria-label="취소" class="lg btn-sticky" />
    <Button btn-type="primary" element-type="button" aria-label="작성하기" class="lg btn-sticky" />
  </ButtonGroup>
</template>

<script setup lang="ts">
import Select from '~/components/publishing/input/Select.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import FieldSet from '~/components/publishing/input/FieldSet.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import CustomerCenterAttached from '~/components/publishing/common/customerCenter/CustomerCenterAttached.vue'
import AttachedWrap from '~/components/publishing/common/customerCenter/AttachedWrap.vue'
import AttachedFile from '~/components/publishing/common/customerCenter/AttachedFile.vue'
</script>
