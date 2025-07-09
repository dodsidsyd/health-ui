<template>
  <div style="width: 100%; max-width: 260px">
    <div>
      <SkeletonAvatar v-show="loading" effect="wave" height="120px" />
      {{ user }}
    </div>
    <div style="margin-bottom: 1rem">
      <div class="text-center">로그인</div>
      <form style="display: flex; flex-direction: column" @submit.prevent="loginTest">
        <input v-model="form.uid" placeholder="아이디" style="border: solid 1px" />
        <input
          v-model="form.password"
          placeholder="비밀번호"
          type="password"
          autocomplete="off"
          style="border: solid 1px"
        />
        <div v-if="error" style="color: red; font-size: small; text-align: center">{{ error.message }}</div>
        <button
          type="submit"
          style="
            border: solid 1px;
            background-color: #2f69f0;
            color: white;
            padding: 8px;
            border-radius: 4px;
            width: 100%;
          "
        >
          Login
        </button>
      </form>
    </div>
    <div style="width: 100%; display: flex; justify-content: center; flex-direction: column; gap: 0.25rem">
      <button style="background-color: orangered; color: white; padding: 8px; border-radius: 4px" @click="logoutTest">
        Logout
      </button>
      <button
        style="background-color: orange; color: white; padding: 8px; border-radius: 4px"
        @click="refreshTokenTest"
      >
        RefreshToken
      </button>
      <button style="background-color: darkgreen; color: white; padding: 8px; border-radius: 4px" @click="fetchSamples">
        Sample Test
      </button>
      <button style="background-color: dimgray; color: white; padding: 8px; border-radius: 4px">SOME TEST</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/common/auth.store'
import { useSampleApi } from '~/composables/api/common/sample.api'
import { useUserApi } from '~/composables/api/common/user.api'
import { SkeletonAvatar } from 'skeleton-elements/vue'
import { useUserStore } from '~/store/common/user.store'

const { signIn, signOut, refreshAuthToken } = useAuthStore()
const { user } = storeToRefs(useUserStore())
const { myUsersAccounts } = useUserApi()

const form = reactive({
  uid: '',
  password: ''
})
const error = ref<Error | null>(null)
const loading = ref(false)

const loginTest = async () => {
  try {
    loading.value = true
    await signIn({
      uid: form.uid,
      password: form.password
    })
    await myUsersAccounts()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err
    } else {
      throw Error
    }
  } finally {
    loading.value = false
  }
}

const logoutTest = async () => {
  await signOut()
}
const refreshTokenTest = async () => {
  await refreshAuthToken()
}

const fetchSamples = async () => {
  const { getSampleApi, postSampleApi, postSample2Api, putSampleApi, deleteSampleApi } = useSampleApi()
  await getSampleApi({ page: 1, size: 10 })
  await postSampleApi({ title: 'foo', body: 'bar', userId: 1 })
  await postSample2Api({ title: 'foo', body: 'bar', userId: 1 })
  await putSampleApi({ id: 1, title: 'foo' })
  await deleteSampleApi(1)
}
</script>
