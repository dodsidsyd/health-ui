<template>
  <BaseBody page-title="의료영상발급" :show-back-button="true" :has-notification="true" class="pb-46">
    <section class="medical-issue-search">
      <!-- 환자 정보 입력 폼 -->
      <TitleSection
        title="제휴병원 연결을 위해 <br/>주민등록번호를 입력해 주세요."
        description="신청 완료 후 설정/관리는 청구의신<br/>앱에서 가능해요."
      />

      <div class="resident-id-form-group mt-32">
        <InputRRN
          required
          label="주민등록번호"
          v-model="residentIdFront"
          :back-value="residentIdBack"
          @update:back-value="residentIdBack = $event"
          :readonly="true"
          :readonly-back="false"
        />
      </div>

      <MedicalGuide />

      <ButtonGroup class="is-fixed">
        <Button
          aria-label="제휴병원 찾기"
          btn-type="primary"
          element-type="button"
          class="w-full lg"
          @click="router.push('/insu/medicalVideo/issue/hospital')"
          :disabled="!residentIdFront || !residentIdBack"
        />
      </ButtonGroup>
    </section>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import InputRRN from '~/components/publishing/input/InputRRN.vue'
import MedicalGuide from '~/components/insu/MedicalGuide.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
const router = useRouter()

// 주민등록번호 입력 필드
const residentIdFront = ref('000101')
const residentIdBack = ref('')
</script>

<style lang="scss" scoped>
.medical-issue-search {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 0 0;
}

.resident-id-form-group {
}
</style>
