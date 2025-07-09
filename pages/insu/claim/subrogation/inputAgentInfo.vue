<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <span style="font-size: 20px; font-weight: bold" v-html="setTitle"></span>
      <div v-if="data.authCode.isShow" style="display: flex; flex-direction: column">
        <label for="name">인증번호 입력</label>
        <input
          id="authCode"
          ref="data.authCode.element"
          v-model="data.authCode.value"
          type="numeric"
          style="padding: 0.25rem; border: 1px solid gainsboro"
          placeholder="인증법호 입력"
          @input="inputPhoneNumber($event, 'authCode')"
          @focus="focusField"
        />
      </div>

      <div v-if="data.phoneNumber.isShow" style="display: flex; gap: 0.75rem; align-items: end">
        <div style="display: flex; flex-direction: column">
          <label for="phoneNumber">담당 설계사 휴대폰번호</label>
          <input
            id="phoneNumber"
            ref="phoneNumber"
            v-model="data.phoneNumber.value"
            type="numeric"
            style="padding: 0.25rem; border: 1px solid gainsboro"
            placeholder="- 없이 숫자만 입력"
            @input="inputPhoneNumber($event, 'phoneNumber')"
            @focus="focusField"
          />
        </div>
        <button style="border: 1px solid #b0b0b0; padding: 0.25rem 1rem; font-size: 12px" @click="getAuthCode">
          인증요청
        </button>
      </div>

      <div v-if="data.agentCode.isShow" style="display: flex; flex-direction: column">
        <label for="agentCode">담당 설계사 코드</label>
        <input
          id="agentCode"
          ref="agentCode"
          v-model="data.agentCode.value"
          style="padding: 0.25rem; border: 1px solid gainsboro"
          placeholder="담당 설계사 코드"
          @input="inputField('agentCode')"
          @focus="focusField"
        />
      </div>

      <div v-if="data.name.isShow" style="display: flex; flex-direction: column">
        <label for="name">담당 설계사 이름</label>
        <input
          id="name"
          ref="refName"
          v-model="data.name.value"
          style="padding: 0.25rem; border: 1px solid gainsboro"
          placeholder="이름을 입력해주세요"
          @input="inputField('name')"
          @focus="focusField"
        />
      </div>
    </div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="clickNext">확인</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import { AlertModal, ConfirmModal } from '@lemonhc/fo-ui/components/modal'
import type { Ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

interface Field<T> {
  value: T
  isShow: boolean
  isFocus: boolean
}

definePageMeta({
  title: '설계사 대리인 가입',
  utils: ['phone', 'noti']
})

const data = reactive<{
  authCode: Field<string | null>
  phoneNumber: Field<string | null>
  agentCode: Field<string | null>
  name: Field<string | null>
}>({
  authCode: {
    value: null,
    isShow: false,
    isFocus: false
  },
  phoneNumber: {
    value: null,
    isShow: false,
    isFocus: false
  },
  agentCode: {
    value: null,
    isShow: false,
    isFocus: false
  },
  name: {
    value: null,
    isShow: true,
    isFocus: true
  }
})

const refName = ref()

const inputField = (field: 'name' | 'agentCode' | 'phoneNumber') => {
  // 이름이 입력되었다면, 다음 필드는 계속 유지되도록 함
  if (field === 'name') {
    if (data.name.value && data.agentCode.value === null) {
      data.agentCode.value = ''
      data.agentCode.isShow = true
    }
  } else if (data.agentCode.value && field === 'agentCode') {
    data.phoneNumber.isShow = true
  }
}

const inputPhoneNumber = (event: Event, inputType: 'authCode' | 'phoneNumber') => {
  const target = event.target as HTMLInputElement
  // target.value = toOnlyNumbers(target.value)

  data[inputType].value = target.value
}

const getAuthCode = () => {
  data.authCode.isShow = true
  console.log('인증요청')
}

const clickNext = async () => {
  console.log('넥스트')
  // 입력한 정보의 보험설계사가 있는지 확인 여부 API 호출

  let confirmRes

  // == 있을 경우 ==
  // eslint-disable-next-line prefer-const
  confirmRes = await ConfirmModal.open({
    isVisible: true,
    html: `<div style="display: flex; flex-direction: column; 1rem">
      <div style="font-weight: bold; font-size: 20px">담당 설계사</div>
      <div style="font-weight: bold; font-size: 20px">${data.name.value} (${data.phoneNumber.value})</div>
      <div>보험설계사용 서비스에 가입하시겠어요?</div>
    </div>`,
    confirmButtonText: '가입하기'
  })

  if (confirmRes) {
    // 대리청구 서비스 가입 완료 화면으로 이동
    navigateTo('/insu/claim/subrogation/serviceNotInUse/successSubrogation')
  }
  // ===========

  // == 입력한 정보의 보험설계사와 내 정보가 동일한 경우
  // await AlertModal.open({
  //   isVisible: true,
  //   content: '담당 설계사와 대리인 정보가 동일해요.<br /> 입력하신 정보를 다시 확인해 주세요.'
  // })
  // ===========

  // == 입력한 정보의 보험설계사 정보가 없는 경우
  // await AlertModal.open({
  //   isVisible: true,
  //   html: '가입한 보험설계사 정보를 확인할 수 없어요.<br /> 가입하지 않은 보험설계사를 지정하려면 해당 설계사의 휴대폰 알림톡 인증 후 가입할 수 있어요.'
  // })
  // ===========
}

const setTitle = computed(() => {
  // 최초 입력일 경우만 뜨도록
  if (data.authCode.isFocus) {
    return `담당 보험설계사 휴대폰으로 발송한<br />인증번호를 입력해주세요.`
  } else if (data.phoneNumber.isFocus) {
    return `담당 보험설계사 휴대폰 번호를<br />입력해주세요.`
  } else if (data.agentCode.isFocus) {
    return `담당 보험설계사 코드를<br />입력해주세요.`
  } else if (data.name.isFocus) {
    return `담당 보험설계사 이름을 <br /> 입력해주세요.`
  }
  return ''
})

const focusField = (event: FocusEvent) => {
  const targetInputId = (event.target as HTMLInputElement).id

  for (const key of Object.keys(data) as (keyof typeof data)[]) {
    data[key].isFocus = key === targetInputId
  }
}

onMounted(() => {
  // 포커스 안됨. 확인 필요
  refName.value.focus()
})
</script>

<style scoped lang="scss"></style>
