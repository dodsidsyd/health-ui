<template>
  <div>
    <h3>보안키패드 컴포넌트 테스트 페이지</h3>

    <div class="resident-id-form-group">
      <label for="resident-id-front" class="resident-id-label">주민등록번호</label>
      <div class="resident-id-inputs">
        <input
          id="resident-id-front"
          v-model="residentIdFront"
          type="text"
          class="resident-id-input"
          maxlength="6"
          placeholder="생년월일 6자리"
          inputmode="numeric"
          aria-label="주민등록번호 앞 6자리"
          disabled
        />
        <span class="resident-id-hyphen">-</span>
        <input
          id="resident-id-back"
          v-model="residentIdBack"
          type="password"
          class="resident-id-input"
          maxlength="7"
          placeholder="뒷자리 입력"
          inputmode="numeric"
          readonly
          aria-label="주민등록번호 뒤 7자리"
          @click="isShowKeypad = true"
        />
      </div>
      <div>주민등록번호 뒷자리를 입력해주세요.</div>
    </div>

    <SecurityKeypad
      v-if="isShowKeypad"
      :is-visible="isShowKeypad"
      :front-number="residentIdFront"
      @close="isShowKeypad = false"
      @confirm="validResidentNumber"
    />
  </div>
</template>

<script setup lang="ts">
import SecurityKeypad from '~/components/test/SecurityKeypad.vue'

const isShowKeypad = ref(false)
const residentIdFront = ref('990101')
const residentIdBack = ref('')

const validResidentNumber = (backNumber: string) => {
  residentIdBack.value = backNumber
  isShowKeypad.value = false
}
</script>

<style scoped lang="scss">
.resident-id-form-group {
  margin: 1rem;
  width: 100%; /* Ensures it takes full width of its parent */
  max-width: 400px; /* Optional: Sets a max width for desktop for better aesthetics */
}
.resident-id-label {
  display: block; /* Makes the label take its own line */
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
  font-size: 16px;
}
.resident-id-inputs {
  display: flex; /* Uses flexbox for horizontal alignment */
  align-items: center; /* Vertically aligns items */
  gap: 10px; /* Space between inputs and hyphen */
}

.resident-id-input {
  flex: 1; /* Allows inputs to grow and shrink */
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box; /* Includes padding and border in the element's total width and height */
  min-width: 0; /* Allows shrinking below content size */
}

.resident-id-input::placeholder {
  color: #bbb;
}

.resident-id-hyphen {
  font-size: 18px;
  color: #555;
  font-weight: bold;
}
</style>