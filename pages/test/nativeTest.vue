<template>
  <div class="native-test-div">
    <h1>웹/앱 인터페이스</h1>

    <!-- <section class="native-test-section">
      <h2>toNative</h2>

      <CommonCard>
        <h3>요청 형식</h3>
        <code v-pre>
          { type: 'command', functionType: NativeFunctionType.NATIVE_BROWSING_WITH_URL, version: 1, requestId: '', //
          toNative에서 설정 callbackFn: '', // toNative에서 설정 value: { url: url } }
        </code>
      </CommonCard>
    </section> -->

    <section class="native-test-section">
      <h2>toNative</h2>
      <p>웹에서 네이티브 앱으로 요청합니다.</p>
      <CommonCard>
        <h3>nativeBrowsingWithUrl</h3>
        <p>
          시스템에 설치된 웹 브라우저로 로딩합니다.
          <br />
          예시: https://www.naver.com
        </p>
        <div class="button-group">
          <input v-model="url_nativeBrowsingWithUrl" type="text" class="native-test-input" placeholder="URL" />
        </div>
        <div class="button-group">
          <button class="native-test-button" @click="reqToNative('nativeBrowsingWithUrl')">
            nativeBrowsingWithUrl
          </button>
        </div>
      </CommonCard>
      <CommonCard>
        <h3>popUpBrowsing</h3>
        <p>
          앱내에서 팝업으로 로딩합니다.
          <br />
          예시: https://www.naver.com
        </p>
        <div class="button-group">
          <input v-model="url_popUpBrowsing" type="text" class="native-test-input" placeholder="URL" />
        </div>
        <div class="button-group">
          <button class="native-test-button" @click="reqToNative('popUpBrowsing')">popUpBrowsing</button>
        </div>
      </CommonCard>
    </section>

    <hr class="native-test-hr" />

    <section class="native-test-section">
      <h2>toWeb</h2>
      <p>네이티브 앱에서 웹으로 요청합니다.</p>
      <CommonCard>
        <h3>appForeground</h3>
        <p>앱이 백그라운드에서 포그라운드로 전환될 때 호출됩니다.</p>
        <p>window.toWeb.appForeground(any?)</p>
        <div class="button-group">
          <div class="input-button-group">
            <button class="native-test-button" @click="reqToWeb('appForeground')">appForeground</button>
          </div>
        </div>
      </CommonCard>
      <CommonCard>
        <h3>appBackground</h3>
        <p>앱이 포그라운드에서 백그라운드로 전환될 때 호출됩니다.</p>
        <p>window.toWeb.appBackground(any?)</p>
        <div class="button-group">
          <div class="input-button-group">
            <button class="native-test-button" @click="reqToWeb('appBackground')">appBackground</button>
          </div>
        </div>
      </CommonCard>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommonCard from '~/components/test/card/CommonCard.vue'
import { nativeBrowsingWithUrl, popUpBrowsing } from '~/utils/native/toNativeHelper.util'

const webInput = ref('')
const url_nativeBrowsingWithUrl = ref('https://www.naver.com')
const url_popUpBrowsing = ref('https://www.naver.com')

const reqToNative = async (actionType: string, payload = {}) => {
  try {
    switch (actionType) {
      case 'nativeBrowsingWithUrl': {
        const res = await nativeBrowsingWithUrl(url_nativeBrowsingWithUrl.value)
        console.log(`nativeBrowsingWithUrl callback: ${JSON.stringify(res)}`)
        break
      }
      case 'popUpBrowsing': {
        const res = await popUpBrowsing(url_popUpBrowsing.value, true, '팝업 웹 브라우징', 'GET')
        console.log(`popUpBrowsing callback: ${JSON.stringify(res)}`)
        break
      }
      // case 'test': {
      //   // window.toWeb.triggerBackBtn(payload)
      //   break
      // }
      default:
        break
    }
  } catch (error) {
    console.error(`reqToNative error: ${error}`)
  }
}

const reqToWeb = (type: string) => {
  const payload = webInput.value

  if (!window.toWeb) {
    alert('window.toWeb undefined')
    return
  }
  if (!window.toWeb.appForeground || !window.toWeb.appBackground || !window.toWeb.triggerBackBtn) {
    alert('window.toWeb.[function] undefined')
    return
  }

  switch (type) {
    case 'appForeground':
      window.toWeb.appForeground(payload)
      break
    case 'appBackground':
      window.toWeb.appBackground(payload)
      break
    case 'triggerBackBtn':
      window.toWeb.triggerBackBtn(payload)
      break
    default:
      break
  }
}
</script>

<style>
/* 기본 스타일 */
.native-test-div {
  width: 100%;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 15px; /* 전체적으로 패딩 추가 */
  box-sizing: border-box; /* 패딩이 너비에 포함되도록 설정 */
}

/* 섹션 스타일 */
.native-test-section {
  border: 1px solid #eee;
  padding: 20px;
  margin: 20px auto; /* 중앙 정렬 */
  max-width: 800px; /* 최대 너비 설정 */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: lightgray;
}

.native-test-section::before {
  /* display: none !important; */
  content: none !important;
}

/* 입력 필드 및 버튼 그룹 */
.input-button-group {
  display: flex; /* flexbox 사용 */
  flex-direction: column; /* 세로로 정렬 */
  align-items: center; /* 가운데 정렬 */
  gap: 10px; /* 요소 간 간격 */
  margin-bottom: 15px;
}

.native-test-input {
  padding: 10px; /* 패딩 증가 */
  margin-right: 0; /* flexbox 사용으로 기존 margin-right 제거 */
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* 부모 너비에 꽉 차도록 */
  max-width: 300px; /* 입력 필드 최대 너비 */
  box-sizing: border-box;
}

.native-test-button {
  padding: 12px 20px; /* 패딩 증가 */
  margin: 0; /* flexbox 사용으로 기존 margin 제거 */
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%; /* 부모 너비에 꽉 차도록 */
  max-width: 300px; /* 버튼 최대 너비 */
  box-sizing: border-box;
}

.native-test-button:hover {
  background-color: #368e6e;
}

/* 버튼 그룹 (여러 버튼 포함) */
.button-group {
  display: flex;
  flex-wrap: wrap; /* 공간이 부족하면 다음 줄로 넘어가도록 */
  justify-content: center; /* 버튼들을 가운데 정렬 */
  gap: 10px; /* 버튼 간 간격 */
  margin-top: 15px;
}

.button-group .native-test-button {
  flex-grow: 1; /* 가능한 공간을 채우도록 */
  min-width: 300px;
}

/* 수평선 스타일 */
.native-test-hr {
  border: 0;
  height: 1px;
  background: #eee;
  margin: 40px auto;
  max-width: 800px;
}

code {
  display: block;
  background: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  color: #333;
  margin: 8px 0;
  border: 1px solid #ddd;
  user-select: text;
}
</style>
