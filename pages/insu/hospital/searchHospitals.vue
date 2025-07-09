<template>
  <BaseBody>
    <section>
      <h1 class="search-my-hospital-guide">다녀온 병원을</h1>
      <h1 class="search-my-hospital-guide">자동으로 찾아드려요</h1>
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
    </section>
    <section>
      <div class="action-buttons-container">
        <button class="action-button" @click="goToInfoPage('paperless')">
          <span class="action-button-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span class="action-button-text">서류없이 청구<br />가능 병원 확인</span>
        </button>

        <button class="action-button" @click="goToInfoPage('document')">
          <span class="action-button-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span class="action-button-text">병원 서류 발급<br />가능 병원 확인</span>
        </button>
      </div>
      <div class="single-action-section">
        <button class="full-width-action-button" :disabled="!isResidentIdValid" @click="findMyHospital">
          MY 병원 찾기
        </button>
      </div>
    </section>
  </BaseBody>

<!--  <SecurityKeypad-->
<!--    v-if="isShowKeypad"-->
<!--    :is-visible="isShowKeypad"-->
<!--    :front-number="residentIdFront"-->
<!--    @close="isShowKeypad = false"-->
<!--    @confirm="validResidentNumber"-->
<!--  />-->
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import { HEADER_UTILS_BUTTON } from '~/constants/header.constants'
// import SecurityKeypad from '~/components/common/modal/SecurityKeypad.vue'

definePageMeta({
  title: 'MY병원 찾기'
})

const isShowKeypad = ref(false)
const residentIdFront = ref('')
const residentIdBack = ref('')

const isResidentIdValid = computed(() => {
  return /^\d{7}$/.test(residentIdBack.value)
})

// TODO:: 화면이 기획에 없음
const goToInfoPage = (type: 'paperless' | 'document') => {
  if (type === 'paperless') {
    console.log('서류없이 청구 가능 병원 확인 클릭')
  } else {
    console.log('병원 서류 발급 가능 병원 확인 클릭')
  }
}

const findMyHospital = async () => {
  navigateTo('/insu/hospital/searchResultHospitals')
}

// 주민번호 입력 및 유효성 검사 완료
const validResidentNumber = (backNumber: string) => {
  residentIdBack.value = backNumber
  isShowKeypad.value = false
}

onMounted(() => {
  // TODO:: 로그인 사용자 주민번호 앞자리 가져오기
  residentIdFront.value = '990101'
})
</script>

<style scoped>
.single-action-section {
  margin-top: 30px; /* Space above this new section */
  width: 100%; /* Take full width of parent */
  max-width: 400px; /* Align with the max-width of the resident ID form */
  padding: 0 15px; /* Consistent padding with other sections */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Space between input group and the button */
}

.form-group {
  width: 100%;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
  font-size: 16px;
}

.general-text-input {
  width: 100%; /* Make input take full width of its container */
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box; /* Include padding and border in width */
}

.general-text-input::placeholder {
  color: #bbb;
}

.full-width-action-button {
  width: 100%; /* Make the button span full width */
  padding: 15px 20px;
  background-color: #007bff; /* Primary button color */
  color: #fff; /* White text */
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-sizing: border-box; /* Include padding in width */
}

.full-width-action-button:hover {
  background-color: #0056b3; /* Darker blue on hover */
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

.full-width-action-button:active {
  background-color: #004085;
}
.search-my-hospital-guide {
  margin-bottom: 0;
  font-weight: bold;
  color: #333;
}

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
.action-buttons-container {
  display: flex; /* Arranges buttons horizontally */
  justify-content: flex-start; /* Centers the buttons in the container */
  gap: 20px; /* Space between buttons */
  margin-top: 30px; /* Space above the buttons */
  width: 100%; /* Take full width of parent */
  padding: 0 15px; /* Add some padding on sides for smaller screens */
  box-sizing: border-box; /* Include padding in width calculation */
}

.action-button {
  display: flex;
  flex-direction: column; /* Stacks icon and text vertically */
  align-items: center; /* Centers icon and text horizontally within the button */
  justify-content: center; /* Centers content vertically within the button */
  flex: 1; /* Allows buttons to grow and shrink */
  max-width: 150px; /* Max width for each button on larger screens */
  padding: 15px 10px; /* Padding inside the button */
  background-color: #f8f9fa; /* Light background */
  border: 1px solid #e9ecef;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit; /* Inherit font from body/global styles */
  text-align: center;
  text-decoration: none; /* Remove underline if it's an <a> tag */
  color: #343a40; /* Darker text color */
  transition:
    background-color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
  -webkit-appearance: none; /* Remove default button styles for cross-browser consistency */
  -moz-appearance: none;
  appearance: none;
}

.action-button:hover {
  background-color: #e2e6ea;
  border-color: #dae0e5;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.action-button:active {
  background-color: #d1d6db;
  border-color: #c8ced3;
}

.action-button-icon {
  margin-bottom: 8px; /* Space between icon and text */
  display: flex; /* Ensure icon itself is centered if it's an SVG */
  justify-content: center;
  align-items: center;
  width: 40px; /* Fixed width for icon container */
  height: 40px; /* Fixed height for icon container */
  color: #007bff; /* Primary color for icons */
}

.action-button-icon svg {
  width: 100%; /* Make SVG fill its container */
  height: 100%;
}

.action-button-text {
  font-size: 14px;
  font-weight: 600; /* Slightly bolder text */
  line-height: 1.4; /* Improve text readability */
  white-space: nowrap; /* Prevent text from wrapping prematurely */
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis if text is too long */
}

/* --- Responsive Adjustments --- */
@media (max-width: 600px) {
  .single-action-section {
    padding: 0 15px; /* Maintain consistent padding */
    gap: 15px; /* Slightly reduced gap */
  }

  .input-label {
    font-size: 15px;
  }

  .general-text-input {
    padding: 10px;
    font-size: 15px;
  }

  .full-width-action-button {
    padding: 12px 15px;
    font-size: 16px;
  }

  .action-buttons-container {
    flex-direction: column; /* Stack buttons vertically on small screens */
    align-items: center; /* Center stacked buttons */
    gap: 15px; /* Adjust gap for vertical stacking */
  }

  .action-button {
    width: 100%; /* Take full width when stacked */
    max-width: 250px; /* Max width for stacked buttons */
    padding: 12px 10px; /* Adjust padding */
  }

  .action-button-icon {
    width: 36px; /* Slightly smaller icon on small screens */
    height: 36px;
  }

  .action-button-text {
    font-size: 13px; /* Slightly smaller text on small screens */
  }
}

/* --- Responsive Adjustments --- */
@media (max-width: 600px) {
  .action-button {
    max-width: 90%; /* Adjust max-width for very small screens */
  }
  .action-button-text {
    font-size: 12px; /* Even smaller text for very small screens */
  }
  .resident-id-label {
    font-size: 15px; /* Slightly smaller label on small screens */
  }

  .resident-id-input {
    padding: 10px; /* Slightly less padding on smaller screens */
    font-size: 15px;
  }

  .resident-id-inputs {
    gap: 8px; /* Reduce gap on smaller screens */
  }

  .resident-id-form-group {
    padding: 0 15px; /* Add some horizontal padding for smaller screens if needed */
  }
}

@media (max-width: 400px) {
  .resident-id-input {
    padding: 8px; /* Further reduce padding on very small screens */
    font-size: 14px;
  }

  .resident-id-hyphen {
    font-size: 16px;
  }
}
</style>
